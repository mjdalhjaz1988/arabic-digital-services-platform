# نشر الموقع عبر GitHub Pages

يوضح هذا الدليل خطوات نشر الموقع الحالي (الموجود داخل مجلد `site/`) على GitHub Pages مع أتمتة النشر عبر GitHub Actions.

## المتطلبات
- حساب GitHub مفعّل.
- إمكانية إنشاء مستودع عام.
- إعداد Git محلي (`git`) مع بريدك الإلكتروني واسم المستخدم.

## الخطوات السريعة
1. أنشئ مستودعًا عامًا جديدًا على GitHub (مثل: `digital-services-platform-ar-site`).
2. من مجلد المشروع الجذري (حيث توجد هذه الملفات)، نفّذ:
   - `git init`
   - `git add .`
   - `git commit -m "init"`
   - `git branch -M main`
   - `git remote add origin https://github.com/<USERNAME>/<REPO>.git`
   - `git push -u origin main`

3. سيتولى GitHub Actions (الملف: `.github/workflows/pages.yml`) رفع الموقع تلقائيًا إلى GitHub Pages.

## ملاحظات مهمة
- يتوقع ووركفلو GitHub Pages وجود ملفات الموقع في جذر المستودع (مثل `index.html`, `styles.css`, `app.js`, إلخ). إن كانت ملفاتك داخل `site/`، انسخها إلى الجذر قبل الدفع (أو عدّل إعداد المسار داخل ووركفلو).
- رابط النشر سيظهر في إعدادات المستودع → Pages أو في سجل تنفيذ الـ Actions.

## بدائل النشر
- Netlify أو Vercel باستخدام ربط المستودع أو رفع يدوي. يتطلب توكن وصول لكل منصة.

## أمان
- لا تحفظ أي أسرار في ملفات عامة. استخدم سرّيّات المستودع (Repository Secrets) عند الحاجة.

