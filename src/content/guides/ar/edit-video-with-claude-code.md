---
title: "تعديل الفيديو بالذكاء الاصطناعي باستخدام Claude Code خطوة بخطوة"
description: "ثبّت Claude Code، وأضف مهارات المونتاج، واصنع فيلمًا من مجلد مقاطع بمجرد الدردشة. مكتوب لمن لم يستخدم الطرفية (terminal) من قبل."
date: 2026-11-05
---

Claude Code مساعد من Anthropic يعمل داخل مجلد على جهازك. يقرأ الملفات، ويشغّل برامج مثل ffmpeg، ويكتب سكربتات. وهذا ما يحتاجه مونتاج الفيديو. هذه الصفحة هي جزء Claude Code من [الدليل الكامل](/ar/guides/edit-video-with-ai-agents/).

تحتاج خطة Claude مدفوعة أو حساب Anthropic API. يعمل Claude Code على macOS 13 أو أحدث، وWindows 10 أو أحدث، وLinux، مع ذاكرة 4 GB أو أكثر.

## 1. افتح الطرفية

- **Mac:** اضغط Cmd+Space، واكتب "Terminal"، ثم Enter.
- **Windows:** اضغط مفتاح Windows، واكتب "PowerShell"، ثم Enter.

لدى Anthropic أيضًا [دليل للطرفية](https://code.claude.com/docs/en/terminal-guide) للمبتدئين. لا تريد الطرفية؟ هناك [تطبيق Claude لسطح المكتب](https://code.claude.com/docs/en/desktop-quickstart.md) وفيه Claude Code. تبقى الخطوات أدناه صالحة للمهارات.

## 2. ثبّت Claude Code

Mac أو Linux أو WSL:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Windows PowerShell:

```powershell
irm https://claude.ai/install.ps1 | iex
```

أو بمدير حزم: `brew install --cask claude-code` على Mac، و`winget install Anthropic.ClaudeCode` على Windows.

لا يطبع المثبّت شيئًا أثناء التنزيل. عندما يتوقف، افتح نافذة طرفية جديدة وشغّل:

```bash
claude --version
```

ظهور رقم الإصدار يعني أنه نجح.

## 3. ثبّت ffmpeg والمهارتين

```bash
brew install ffmpeg
```

على Windows استخدم `winget install Gyan.FFmpeg`. ثم المهارتان، من [solo-factory](https://github.com/fortunto2/solo-factory):

```bash
npx skills add fortunto2/solo-factory --skill solo-transcribe --skill solo-video-edit --global
```

يحتاج هذا إلى [Node.js](https://nodejs.org). اختر Claude Code عندما يسألك أين يثبّت. إذا لم تحب استخدام Node، شغّل `claude` وقل: "ثبّت المهارتين solo-transcribe وsolo-video-edit من github.com/fortunto2/solo-factory". لا تنسخ ملفات المهارات يدويًا. النسخة اليدوية لا تصلها الإصلاحات.

## 4. ابدأ من مجلد مقاطعك

```bash
cd ~/Movies/lisbon-day1
claude
```

في أول مرة يطلب منك تسجيل الدخول. بعدها يسألك قبل تشغيل أي شيء. اقرأ ما يريد تشغيله. وافق على ما يبدو صحيحًا.

## 5. اطلب الفيلم

> في المجلد 40 مقطعًا من يوم واحد. فرّغ كلها إلى نص بمهارة التفريغ، ثم اقرأ النص واقترح قصة في خمسة أسطر. انتظر ردي قبل القص.

أجبه باختيارك، ثم:

> اقصّ تريلر مدته 3 دقائق في هذه القصة. استخدم ~/Music/score.mp3 واقصّ على الإيقاع. قبل الإخراج أرني السكربت ولوحة مصغرات اللقطات.

سيقوم Claude Code بما يلي:

1. يشغّل التفريغ، فيخرج ملف نصي واحد لليوم كله؛
2. يكتشف إيقاع مقطوعتك؛
3. يكتب القص كملف سكربت صغير؛
4. يخرج ملف mp4 بـ ffmpeg ويتحقق أن المدة والصوت يطابقان.

يمكن لـ Claude Code أيضًا الاتصال بتطبيق Life2Film Studio على Mac. هذا يعطيه تحليل اللقطات والجودة من التطبيق. الأمر موجود في [الشرح التقني](https://rustman.org/wiki/creative-video-with-claude/).

## عندما يحدث خطأ

- **`claude: command not found`.** أغلق الطرفية وافتح واحدة جديدة. إذا استمر الخطأ، شغّل `claude doctor` أو راجع [استكشاف أخطاء التثبيت](https://code.claude.com/docs/en/troubleshoot-install.md) عند Anthropic.
- **في النص أسماء غريبة.** أعطه قائمة كلمات: "Anna أختي، والمقهى اسمه Oficina". يصحح النص مرة واحدة، قبل أن تستخدمه الترجمة.
- **مقطع بلا كلام.** الحشود والموسيقى قد تنتج جملًا مختلقة. قل "اعتبر المقطع 17 بلا كلام".
- **القص يبدو باهتًا.** قل ما الخطأ بكلمات بسيطة. "لقطات واسعة كثيرة متتالية." "ابدأ بأفضل لحظة."

## التالي

- التسلسل العام والقواعد: [مونتاج فيديو بالذكاء الاصطناعي](/ar/guides/edit-video-with-ai-agents/).
- استخدام ChatGPT بدلًا منه: [ChatGPT وCodex](/ar/guides/edit-video-with-chatgpt-codex/).
