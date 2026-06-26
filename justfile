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

# Type-check with svelte-check
check:
    npm run check

# Run the test suite
test:
    npm test

# Format with Prettier
format:
    npm run format

# Run all checks
check-all: format lint check test

# Clean build artifacts
clean:
    rm -rf build .svelte-kit node_modules

# Full clean and reinstall
reset: clean install

# Build and preview
build-preview: build preview
