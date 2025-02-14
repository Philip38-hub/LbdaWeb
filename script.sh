#!/bin/bash

# This is an initialization script

# Create a new Vite project
npm create vite@latest football-donation-website --template react || { echo "Failed to create Vite project"; }
# Navigate into the project directory
cd football-donation-website

# Install dependencies
npm install

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -prm -rf node_modules package-lock.json
npm install