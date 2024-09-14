import * as admin from "firebase-admin";

if (!admin.apps.length) {
  if (
    // typeof process.env.FIREBASE_CLIENT_EMAIL === "string" &&
    // typeof process.env.FIREBASE_PRIVATE_KEY === "string" &&
    typeof process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID === "string"
  ) {
    admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
        projectId: "room-8facb",
      }),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
  } else {
    throw new Error("Firebase çevresel değişkenleri eksik veya geçersiz.");
  }
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();
export const adminStorage = admin.storage();

// ?.replace(/\\n/g, "\n")
