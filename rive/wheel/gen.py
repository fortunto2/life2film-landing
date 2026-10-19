#!/usr/bin/env python3
"""Write wheel.rml — the Life2Film calendar wheel as a Rive file.

The same fourteen rings as `src/components/CalendarWheel.astro` (radii, dash
patterns and the three brand gradients are copied from it, divided by ten: the
SVG viewBox is 4000, this artboard is 400), turning in a loop, with one view
model property the host sets:

    still  (boolean)  Reduce Motion — hold the rings where they are

Build with `../build.sh` (rive --verify, inspect problems == 0, --once, a
screenshot), never by hand. Edit this file, not the .rml. Stdlib only.

Why Rive and not the SVG: fourteen SMIL-rotated circles never stop, even
off-screen; a Rive canvas pauses when the host pauses it, honours `still`, and
the same .riv can be drawn by the iOS app through RiveRuntime.
"""
from __future__ import annotations

import math
from pathlib import Path

HERE = Path(__file__).resolve().parent
SIZE = 400                      # artboard, points
CENTRE = SIZE / 2
STROKE = 4                      # 40 on the 4000 viewBox
FPS = 60
LOOP_SECONDS = 200              # one loop; every ring makes a whole number of turns in it
DURATION = LOOP_SECONDS * FPS

# (radius, dash "on off" or None, dash offset) — CalendarWheel.astro's `rings`, /10.
RINGS = [
    (20.0, None, 0),
    (29.2, (50, 8), 0),
    (38.0, (40, 8), 0),
    (46.4, (40, 10), 0),
    (55.4, (40, 12), 10),
    (65.2, (60, 14), 20),
    (75.3, (70, 16), 0),
    (86.2, (80, 18), 40),
    (98.1, (100, 20), 50),
    (110.8, (150, 22), 60),
    (123.0, (150, 24), 70),
    (137.0, (200, 26), 0),
    (151.0, (300, 28), 30),
    (165.0, (150, 30), 0),
]
PAINT = ["p2", "p2", "p2", "p1", "p1", "p1", "p1", "p1", "p1", "p1", "p1", "p3", "p1", "p3"]

# The three gradients, as (position, AARRGGBB).
P1 = [(0.0, "FF00F2E0"), (0.2, "FF017AFF"), (0.5, "FFFA3FA5"), (0.9, "FFFFA61D"), (1.0, "FFFEFF00")]
P2 = [(0.0, "FF00F2E0"), (0.1, "FF017AFF"), (0.5, "FFFA3FA5"), (0.9, "FFFFA61D"), (1.0, "FFFEFF00")]
P3 = [
    (0.0566, "FF00F2E0"), (0.1288, "FF0076FE"), (0.1902, "FFF54AB2"), (0.2730, "FFFEED07"),
    (0.3503, "FFF340A8"), (0.4327, "FF0075FC"), (0.5337, "FF00F2E0"), (0.6448, "FF0077FF"),
    (0.7371, "FFFF3EA3"), (0.8072, "FFFEFF00"), (0.8907, "FFEC42AA"), (1.0, "FF00F2E0"),
]

# ids — one namespace for the whole document
ARTBOARD, MACHINE, LAYER = "0:2", "0:3", "0:4"
ST_SPIN, ST_STILL = "0:6", "0:7"
ANIM_SPIN, ANIM_STILL = "0:20", "0:21"
VM, VM_INSTANCE, VM_STILL = "0:100", "0:101", "0:102"
TRIANGLE = "0:50"
ring_id = [f"0:{30 + i}" for i in range(len(RINGS))]

BOOL_KEY = 634                  # BindablePropertyBoolean.propertyValue (state-machines.md)


def gradient(kind: str, r: float) -> str:
    if kind == "p1":
        a, b, stops = (0.8 * r, -0.8 * r), (-0.6 * r, 0.8 * r), P1
    elif kind == "p2":
        a, b, stops = (r, -r), (-r, r), P2
    else:
        a, b, stops = (-r, 0.0), (r, 0.0), P3
    inner = "".join(
        f'\n          <GradientStop colorValue="{c}" position="{p}"/>' for p, c in stops
    )
    return (
        f'<LinearGradient startX="{a[0]:.1f}" startY="{a[1]:.1f}" endX="{b[0]:.1f}" endY="{b[1]:.1f}" name="Gradient">'
        f"{inner}\n        </LinearGradient>"
    )


def ring(i: int) -> str:
    r, dash, offset = RINGS[i]
    d = 2 * r
    dashes = ""
    if dash:
        on, off = dash
        dashes = (
            f'\n        <DashPath offset="{offset}" name="Dashes">'
            f'\n          <Dash length="{on}" name="On"/>'
            f'\n          <Dash length="{off}" name="Off"/>'
            f"\n        </DashPath>"
        )
    return f"""    <Shape x="{CENTRE}" y="{CENTRE}" name="Ring {i + 1}" id="{ring_id[i]}">
      <Ellipse width="{d:.1f}" height="{d:.1f}" originX="0.5" originY="0.5" name="Path"/>
      <Stroke thickness="{STROKE}" cap="round" join="round" name="Stroke">
        {gradient(PAINT[i], r)}{dashes}
      </Stroke>
    </Shape>"""


def centre_mark() -> str:
    # The play triangle inside the innermost ring: 14 × 16 on this scale, pointing right.
    return f"""    <Shape x="{CENTRE + 1.5}" y="{CENTRE}" rotation="{math.pi / 2:.6f}" name="Play" id="{TRIANGLE}">
      <Triangle width="16" height="14" originX="0.5" originY="0.5" name="Path"/>
      <Fill name="Fill">
        {gradient("p2", 8)}
      </Fill>
    </Shape>"""


def spin_keys() -> str:
    out = []
    for i, rid in enumerate(ring_id):
        turns = 4 + (i % 5)                       # whole turns per loop: no jump at the seam
        direction = -1 if i % 3 == 2 else 1
        end = direction * 2 * math.pi * turns
        out.append(
            f"""      <KeyedObject objectId="{rid}">
        <KeyedProperty property="rotation">
          <KeyFrameDouble value="0" frame="0" interpolationType="linear"/>
          <KeyFrameDouble value="{end:.6f}" frame="{DURATION}" interpolationType="linear"/>
        </KeyedProperty>
      </KeyedObject>"""
        )
    return "\n".join(out)


def still_condition(value: str) -> str:
    return f"""          <TransitionViewModelCondition opValue="equal">
            <TransitionPropertyViewModelComparator>
              <BindablePropertyBoolean>
                <DataBindContext sourcePathIds="{VM}-{VM_STILL}" propertyKey="{BOOL_KEY}"/>
              </BindablePropertyBoolean>
            </TransitionPropertyViewModelComparator>
            <TransitionValueBooleanComparator value="{value}"/>
          </TransitionViewModelCondition>"""


def document() -> str:
    shapes = "\n".join([centre_mark()] + [ring(i) for i in range(len(RINGS))])
    return f"""<Rive version="1" kind="fragment">
  <Artboard defaultStateMachineId="{MACHINE}" viewModelId="{VM}" viewModelInstanceId="{VM_INSTANCE}" styleId="0:5" width="{SIZE}" height="{SIZE}" name="Wheel" id="{ARTBOARD}">
    <LayoutComponentStyle name="Artboard Style" id="0:5"/>
    <StateMachine name="Main" id="{MACHINE}">
      <StateMachineLayer name="Motion" id="{LAYER}">
        <AnyState x="320" y="-120"/>
        <ExitState x="480" y="-120"/>
        <EntryState x="0" y="0">
          <StateTransition stateToId="{ST_STILL}">
{still_condition("true")}
          </StateTransition>
          <StateTransition stateToId="{ST_SPIN}"/>
        </EntryState>
        <AnimationState x="160" y="0" animationId="{ANIM_SPIN}" id="{ST_SPIN}">
          <StateTransition stateToId="{ST_STILL}" duration="400">
{still_condition("true")}
          </StateTransition>
        </AnimationState>
        <AnimationState x="320" y="0" animationId="{ANIM_STILL}" id="{ST_STILL}">
          <StateTransition stateToId="{ST_SPIN}" duration="400">
{still_condition("false")}
          </StateTransition>
        </AnimationState>
      </StateMachineLayer>
    </StateMachine>

{shapes}

    <LinearAnimation loopValue="loop" fps="{FPS}" duration="{DURATION}" name="Spin" id="{ANIM_SPIN}">
{spin_keys()}
    </LinearAnimation>
    <LinearAnimation fps="{FPS}" duration="1" name="Still" id="{ANIM_STILL}"/>
  </Artboard>

  <ViewModel defaultInstanceId="{VM_INSTANCE}" name="Wheel" id="{VM}">
    <ViewModelPropertyBoolean name="still" id="{VM_STILL}"/>
    <ViewModelInstance exports="true" name="Default" id="{VM_INSTANCE}">
      <ViewModelInstanceBoolean propertyValue="false" viewModelPropertyId="{VM_STILL}"/>
    </ViewModelInstance>
  </ViewModel>
</Rive>
"""


if __name__ == "__main__":
    (HERE / "wheel.rml").write_text(document(), encoding="utf-8")
    (HERE / "rive.yaml").write_text("name: wheel\n", encoding="utf-8")
    print(f"wrote {HERE / 'wheel.rml'} ({len(RINGS)} rings, {LOOP_SECONDS}s loop)")
