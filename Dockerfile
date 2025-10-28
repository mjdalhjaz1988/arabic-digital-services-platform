# استخدام صورة Node.js الرسمية
FROM node:18-alpine

# تعيين مجلد العمل
WORKDIR /app

# نسخ جميع الملفات
COPY . .

# تثبيت serve لتشغيل الملفات الثابتة
RUN npm install -g serve

# كشف المنفذ 8000
EXPOSE 8000

# تشغيل الخدمة
CMD ["serve", "-s", ".", "-l", "8000"]