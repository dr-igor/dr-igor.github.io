# Igor Lab Works - Development Commands

# Install dependencies
install:
    npm ci

install-update:
    npm install

# Start development server
dev:
    npm run dev

# Start development server with network access
dev-host:
    npm run dev -- --host

# Build for production
build:
    npm run build

# Preview production build
preview:
    npm run preview

# Run linter
lint:
    npm run lint

# Clean build artifacts
clean:
    rm -rf dist node_modules

# Full clean and reinstall
reset: clean install

# Build and preview
build-preview: build preview
