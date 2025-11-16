# ---- مرحله 1: ساختن پروژه (Builder Stage) ----
# استفاده از یک نسخه مشخص از Node.js برای تضمین سازگاری
FROM node:22-alpine AS builder

# تعیین پوشه کاری داخل کانتینر
WORKDIR /app

# کپی کردن فایل‌های مربوط به پکیج‌ها برای کش کردن بهینه
COPY package.json ./
COPY package-lock.json ./

# نصب تمام وابستگی‌ها، شامل ابزارهای بیلد
RUN npm install -f

# کپی کردن تمام کدهای پروژه
COPY . .

# اجرای دستور بیلد Nx برای اپلیکیشن SSR
# !!! توجه: "my-ssr-app" را با نام واقعی پروژه خود در Nx جایگزین کنید
RUN npm run build


# ---- مرحله 2: ساخت ایمیج نهایی (Production Stage) ----
# استفاده از همان نسخه Node.js برای اجرا
FROM node:22-alpine

WORKDIR /app

# کپی کردن فایل‌های پکیج
COPY package.json ./
COPY package-lock.json ./
# نصب فقط وابستگی‌های اجرایی (نه devDependencies) برای سبک‌سازی ایمیج
RUN npm install -f

# کپی کردن خروجی بیلد از مرحله قبل به ایمیج نهایی
# !!! توجه: "my-ssr-app" را با نام واقعی پروژه خود در Nx جایگزین کنید
COPY --from=builder /app/dist/hokm_counter ./dist/hokm_counter

# اعلام اینکه اپلیکیشن داخل کانتینر روی پورت 4000 کار می‌کند
EXPOSE 4000

# دستوری که هنگام اجرای کانتینر اجرا می‌شود تا سرور را روشن کند
# مسیر خروجی esbuild معمولا server.mjs است. این را در پوشه dist/apps/my-ssr-app/server خود چک کنید
CMD ["node", "dist/hokm_counter/server/server.mjs"]
