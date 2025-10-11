#stage 1: Build React App 
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install 

COPY . .
RUN npm run build

#stage 2: Serve with Nginx
FROM nginx:stable-alpine 
COPY --from=build /app/build /usr/share/nginx/html

# Optional: overwrite default Nginx config (recommended for React routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


