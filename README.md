# Goofind - Canada Turkish Business Directory & Social Hub

Goofind is a specialized platform designed for the Turkish diaspora in Canada. It serves as an elite business directory, community hub, and a marketplace for announcements and inquiries.

## Features

- **Business Directory**: List and search for Turkish businesses in Canada with categorization and filtering.
- **Real-time Chat**: Connect with business owners directly through the Goofind Secure Link.
- **Announcement Marketplace**: Post community news, items for sale, or services.
- **Internal Messaging**: Users can chat regarding announcements directly within the app.
- **Multi-language Support**: Fully localized in English and Turkish.
- **Firebase Backend**: Real-time data synchronization with Firestore and Authentication.
- **Mobile Ready**: Built with Capacitor for Android and iOS support.

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Framer Motion.
- **Backend**: Firebase Firestore, Firebase Authentication.
- **Mobile**: Ionic Capacitor.
- **AI**: Gemini API for intelligent features.

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file based on `.env.example` with your Firebase and Gemini credentials.

### Development

Run the development server:
```bash
npm run dev
```

### Mobile Development (Capacitor)

1. Build the web project and sync to native platforms:
   ```bash
   npm run app:sync
   ```

2. Open in Android Studio:
   ```bash
   npm run app:open:android
   ```

3. Open in Xcode (Mac only):
   ```bash
   npm run app:open:ios
   ```

## App Store (iOS)

Full step-by-step guide: **[docs/APP_STORE_RELEASE.md](docs/APP_STORE_RELEASE.md)**

Quick start on Mac:

```bash
npm run release:check   # pre-flight validation
npm run deploy          # publish web app to Firebase
npm run app:sync:ios    # sync Capacitor iOS shell
npm run app:open:ios    # open Xcode → Archive → Upload
```

Required public URLs for App Store Connect:
- Privacy: `https://gen-lang-client-0422005049.firebaseapp.com/?page=privacy`
- Support: `https://gen-lang-client-0422005049.firebaseapp.com/?page=support`
- Account deletion: `https://gen-lang-client-0422005049.firebaseapp.com/?page=delete-account`

## Deployment

Deploy to Cloud Run or Firebase:
```bash
npm run build
```

## License

© 2026 Goofind Canada. All Rights Reserved.
