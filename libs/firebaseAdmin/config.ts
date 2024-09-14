import admin from "firebase-admin";

if (!admin.apps.length) {
  if (
    // typeof process.env.FIREBASE_CLIENT_EMAIL === "string" &&
    // typeof process.env.FIREBASE_PRIVATE_KEY === "string" &&
    typeof process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID === "string"
  ) {
    admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
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

//*-----------------

// import { initializeApp } from "firebase-admin";
// import { cert } from "firebase-admin/app";
// import { getAuth } from "firebase-admin/auth";
// import { getFirestore } from "firebase-admin/firestore";
// import { getStorage } from "firebase-admin/storage";

// const app = initializeApp({
//   credential: cert({
//     projectId: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`,
//     clientEmail: `${process.env.FIREBASE_CLIENT_EMAIL}`,
//     privateKey: `${process.env.FIREBASE_PRIVATE_KEY}`,
//   }),
// });
// const adminDb = getFirestore(app);
// const adminAuth = getAuth(app);
// const adminStorage = getStorage(app);

// export { adminAuth, adminDb, adminStorage };

// const app = initializeApp({
//   credential: cert({
//     projectId: process.env.FIREBASE_PROJECT_ID_ADMIN,
//     clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//     privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//   }),
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET_ADMIN,
// });
// const adminDb = getFirestore(app);
// const adminAuth = getAuth(app);
// const adminStorage = getStorage(app);

// export { adminAuth, adminDb, adminStorage };
