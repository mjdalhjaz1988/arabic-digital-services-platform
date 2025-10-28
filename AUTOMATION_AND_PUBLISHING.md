# الأتمتة والنشر — منصة الخدمات الرقمية العربية

## الصلاحيات المطلوبة للنشر الآلي
- GitHub: أنشئ رمز وصول شخصي (PAT) من `https://github.com/settings/tokens/new` بصلاحيات `repo` و `workflow`.
  - أرسل هنا: `GITHUB_USERNAME` و `GITHUB_PAT`.
- Docker Hub (اختياري لنشر الصورة): أرسل `DOCKER_USERNAME` و `DOCKER_PAT`.
- Netlify/Vercel (بديل سريع):
  - Netlify: `NETLIFY_TOKEN`
  - Vercel: `VERCEL_TOKEN` واسم الفريق إن وجد.

## ماذا سنقوم به تلقائياً
- إنشاء مستودع ونشر عام/خاص.
- تفعيل GitHub Pages أو نشر على Netlify/Vercel.
- إعداد CI/CD للبناء والنشر والمراقبة.
- تشغيل الموقع وقاعدة بيانات MySQL عبر Docker Compose.

## تشغيل الخدمات محلياً
### Docker Compose
```bash
cd arabic_assistant/output
docker compose up -d
docker compose ps
```
- الوصول للموقع: `http://localhost:8080/`
- الوصول لقاعدة البيانات من تطبيق خارجي:
  - المضيف: `localhost`
  - المنفذ: `3306`
  - المستخدم: `appuser` (أو `root`)
  - كلمة المرور: من ملف `.env`

### ملاحظات الشبكات (Docker Desktop)
- من جهازك إلى الحاوية: استخدم `localhost:<المنفذ المنشور>`.
- من داخل الحاوية إلى خدمات الجهاز: استخدم `host.docker.internal`.

## تهيئة المتغيرات السرية
- عدّل ملف `.env` وخذ كلمة مرور أقوى.
- لا تشارك المتغيرات الحساسة علناً؛ أرسلها لي هنا لأستخدمها ونحذفها من السجلات.

## نشر سريع جداً (بدون حسابات)
- يمكن رفع حزمة الموقع إلى Netlify Drop للحصول على رابط عام فوري.
- إن أردت ذلك، أرسل موافقة وسأجهّز الحزمة المناسبة.

