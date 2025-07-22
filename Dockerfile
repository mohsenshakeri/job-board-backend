# 1. Image base
FROM node:20-alpine

# 2. Create working directory
WORKDIR /app

# 3. Install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy rest of app
COPY . .

# 5. Build
RUN npm run build

# 6. Start app
CMD ["node", "dist/main"]
