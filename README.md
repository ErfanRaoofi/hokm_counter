npx nx generate @nx/angular:library --directory=libs/auth/auth --name=auth --publishable=true --addTailwind=true --changeDetection=OnPush --flat=true --importPath=@site/auth --skipModule=true --skipTests=true --style=scss --unitTestRunner=none --viewEncapsulation=None --no-interactive


github-actions-token-eraoofi74
docker login -u eraoofi74

DOCKERHUB_TOKEN

DOCKERHUB_USERNAME
eraoofi74



sudo apt-get update && sudo apt-get upgrade && sudo apt-get dist-upgrade


# ducker build

# نصب داکر
sudo apt-get install docker.io -y

# فعال‌سازی و اجرای سرویس داکر
sudo systemctl start docker

## نصب Portainer (پنل مدیریت گرافیکی)
sudo docker volume create portainer_data

sudo docker run -d -p 8000:8000 -p 9443:9443 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:latest

# برای باز کردن
31.57.29.162:9443
https://31.57.29.162:9443/
admin
Erfan969696#@


## با SSH به سرور لینوکسی خود وصل شوید.
## دستور زیر را برای پیدا کردن پروسه‌ای که از پورت 80 استفاده می‌کند، اجرا کنید:
sudo lsof -i :80
sudo netstat -tulpn | grep :80

# متوقف کردن سرویس
sudo systemctl stop nginx
# غیرفعال کردن سرویس برای جلوگیری از اجرای مجدد پس از ریبوت
sudo systemctl disable nginx


# .yml in stack
version: '3.8'

services:
  app:
    image: myusername/my-ssr-app:1.0.0
    
    ports:
      # از این:
      # - "80:4000"
      # به این تغییر دهید:
      - "8080:4000"  # <-- پورت سرور را به 8080 تغییر دادیم
      
    restart: always


## نصب Nginx Proxy Manager با Portainer
# 1- وارد پنل Portainer خود شوید.
# 2- از منوی سمت چپ، به Stacks بروید و روی دکمه Add stack کلیک کنید.
# 3- یک نام برای استک بگذارید، مثلاً npm-stack.
# 4- در ویرایشگر Web editor، محتویات زیر را کپی و پیست کنید. این یک فایل docker-compose.yml برای Nginx Proxy Manager است.

version: '3.8'
services:
  app:
    image: 'jc21/nginx-proxy-manager:latest'
    restart: unless-stopped
    ports:
      # این پورت‌ها برای دریافت ترافیک وب عمومی هستند
      # مطمئن شوید که توسط سرویس دیگری اشغال نشده باشند
      - '80:80'
      - '443:443'
      # این پورت برای دسترسی به پنل ادمین است
      - '8181:81'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
    networks:
      - proxy-network

networks:
  proxy-network:
    name: proxy-network



## to Portainer
version: '3.8'
services:
  my-ssr-app:
    image: your-dockerhub-username/my-ssr-app:latest
    restart: unless-stopped
    # ports: # این خط را حذف یا کامنت کنید
    #  - "8080:4000"
    networks:
      - proxy-network

networks:
  proxy-network:
    external: true # به شبکه ای که قبلا ساخته شده متصل شو
    name: proxy-network


## open it 
http://<YOUR_SERVER_IP>:8181
http://31.57.29.162:8181/

admin@example.com
changeme


## npx create-nx-workspace@latest



# hokm_counter
