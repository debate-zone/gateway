.PHONY: install start

.DEFAULT_GOAL := start-flow

start-flow:\
	install\
	start

# Install dependencies
install:
	npm ci

# Start the application
start:
	npm run gateway
