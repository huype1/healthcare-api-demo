# Heroku Deployment Guide

## Prerequisites
1. Heroku CLI installed
2. Git repository initialized
3. MongoDB Atlas account

## Environment Variables Setup

### Required Environment Variables for Heroku:
```bash
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.zsoeluc.mongodb.net/<database_name>?retryWrites=true&w=majority
PORT=4000
NODE_ENV=production
```

### Setting Environment Variables in Heroku:
```bash
# Set MongoDB URI
heroku config:set MONGO_URI="your_mongodb_connection_string"

# Set Port (Heroku will set this automatically, but you can override)
heroku config:set PORT=4000

# Set Environment
heroku config:set NODE_ENV=production
```

## Deployment Steps

### 1. Initialize Git (if not already done)
```bash
git init
git add .
git commit -m "Initial commit"
```

### 2. Create Heroku App
```bash
heroku create your-app-name
```

### 3. Set Environment Variables
```bash
heroku config:set MONGO_URI="your_mongodb_connection_string"
heroku config:set NODE_ENV=production
```

### 4. Deploy to Heroku
```bash
git push heroku main
```

### 5. Check Build Logs
```bash
heroku logs --tail
```

## Build Process

Heroku will automatically:
1. Install dependencies (`npm install`)
2. Run build script (`npm run build`)
3. Start the application (`npm start`)

## Troubleshooting

### Common Issues:
1. **Build fails**: Check TypeScript compilation errors
2. **App crashes**: Check environment variables are set
3. **Database connection fails**: Verify MongoDB URI and network access

### Useful Commands:
```bash
# Check app status
heroku ps

# View logs
heroku logs --tail

# Open app in browser
heroku open

# Run commands in Heroku environment
heroku run node dist/server.js

# Check environment variables
heroku config
```

## Testing Locally with Heroku Environment

```bash
# Install Heroku CLI
# Then run:
heroku local web
```

This will use your .env file and simulate the Heroku environment locally.
