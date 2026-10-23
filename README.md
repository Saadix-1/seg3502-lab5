# SEG 3502 — Lab 5: Firebase employee directory

Student: Saad Mehamdi (300422358)

Extends the provided Angular 18 employee starter with Firebase Authentication and Cloud Firestore. Users can register, sign in with email/password or Google, reset passwords, add employees, list their own saved employees, and delete records.

## Setup

1. Install Node.js 20+ and run `npm install` in this folder.
2. Create a Firebase project at https://console.firebase.google.com and register a Web app.
3. Enable **Authentication > Sign-in method > Email/Password** and **Google**.
4. Create **Firestore Database** and publish the rules from `firestore.rules` in **Firestore > Rules**. These rules restrict each user to their own records; do not leave test-mode rules enabled.
5. Copy your Firebase Web App configuration into `src/environments/environment.ts` (replace every `REPLACE_ME`). Firebase web configuration identifies your project; access is protected by authentication and Firestore rules.
6. Run `npm start` and open http://localhost:4200.
7. Register or sign in, add an employee, refresh the page and confirm the record persists. Sign out and sign in as another user to verify isolation.

## Notes

- Requires an actual Firebase project and internet connection. The provided environment contains placeholders and is not usable until configured.
- Firestore path: `users/{uid}/employees/{documentId}`.
- Firebase SDK version: ^10.14.1. Angular 18 starter preserved.
- Do not commit service account keys or admin credentials.
- Screenshots for the submission PDF must be captured after running the configured application.
