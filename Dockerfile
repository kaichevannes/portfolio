FROM oven/bun:1.2.8-slim

WORKDIR /app

# Install dependencies and cache them
# add --production for production install
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy remaining code
COPY . .

# Build
RUN bun run build

EXPOSE 3000
CMD ["bun", "run", "start"]
