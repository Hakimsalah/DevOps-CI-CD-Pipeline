# Stage 1: Build React App 
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install 

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

# 1️⃣ Créer un utilisateur non-root
RUN addgroup -S nonroot && adduser -S nonroot -G nonroot

# 2️⃣ Copier l'application depuis le build
COPY --from=build /app/build /usr/share/nginx/html

# 3️⃣ Optional: overwrite default Nginx config (recommended for React routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 4️⃣ Changer l'utilisateur pour ne pas utiliser root
USER nonroot

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
