# LAZUZU Support — Fullscreen AI Chat + Firebase Functions

This repository contains a simple LAZUZU support chatbot that:
- Runs on Firebase Hosting (frontend in `public/`)
- Uses a Firebase Function as a secure backend to call OpenAI (`functions/`)
- Writes permission requests to Realtime Database under `/permissions` when users ask to remove days or add credits

## Quick start (local -> GitHub -> Firebase)

1. Clone or download this repo.
2. Install Firebase CLI:
   ```
   npm install -g firebase-tools
   firebase login
   ```
3. From repo root:
   ```
   cd functions
   npm install
   cd ..
   firebase init  # choose Hosting + Functions if you didn't already
   ```
4. Update `public/index.html`:
   - Replace the `firebaseConfig` object values with your Firebase project's config.
   - Replace `"exampleUser"` with your logged-in user variable if you have auth.
5. Set OpenAI key in Firebase Functions config:
   ```
   firebase functions:config:set openai.key="sk-..."
   ```
6. Deploy:
   ```
   firebase deploy
   ```

## Files
- public/index.html : Frontend UI + client logic that sends permission requests and calls `/api/ai`.
- functions/index.js : Firebase Function that proxies requests to OpenAI securely.
- functions/package.json : function dependencies.
- firebase.json, .firebaserc : Firebase hosting + function rewrites config.

## Note
You must secure your Realtime Database rules and restrict who can approve requests in production.
