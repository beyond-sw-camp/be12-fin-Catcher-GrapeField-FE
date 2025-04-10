# 1단계: Node.js 환경에서 Vue 앱 빌드
FROM node:18 AS build-stage

WORKDIR /app

# package.json, package-lock.json 복사 및 의존성 설치
COPY package*.json ./
RUN npm install

# 소스 복사 및 빌드
COPY . .
RUN npm run build

# 2단계: Nginx로 빌드 결과물 서빙
FROM nginx:latest AS production-stage

# Nginx 설정 파일 복사
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# 빌드 결과물 복사
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]