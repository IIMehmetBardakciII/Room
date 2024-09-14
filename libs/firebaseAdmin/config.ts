require("dotenv").config();
import admin from "firebase-admin";

// const privateKey =
//   "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC7vgLNqRy6qh4D\nJ+eJywssBJPaQCiYHa87GPfwet9OuPNzuIxjsK2pIpZdECvDVkL8XNhaJyr+Zoz8\ntj5CrMdMcKmlrs3qHAxFVvvDjtdR1L841vDysPd5OBswhvMNDImKjKIf0nnlfYgz\nCxY9XCf3Rw0cwz93uRluexNprY9bmsZzzAwNcj4Pn8A1SCKtJ1RLXPvxk2mleiPJ\ntFhl7K7q8w17uEMzblIeS25uoXwsDJiviGJA9943MAbSXkvfNOtOouaYnZGnj33P\nJjC8hpRK/oIJMxEdSoRk1FMidKZW4baC3iqXibmY7djhN+9XoEEeeAFEcdm+ocBn\nWdA2lnhDAgMBAAECggEAEZCzNcdnGbaFklQEdL7w2lB0qOHXKnb0iHn15fkJCuuA\n/khmUi7F62IstqOnBI1TPRtOtA31bCdEykwewnbkkAFRI2BEgcKCtLtxA2304AIg\nq1Jo6WanRh8lZBfsMOywXax6FVzIQjF0McUNcqDnAwVnHlQiNwhexG3IINtijfZh\n02fH5lzSDt4KuFCOJ7v1yOdhItJEHh/BCK8AdR/4Itc9IBDaFOGsIR4QpA0o8Br9\n/qO7l64w4oismStVlPI8ot1hArEX7/BOiTyrt6/TNqRD0Y2GG3zN64JadHy3pmaJ\nw3uUEKUCGcRf8gCcT18I9aoL6F5QwkOJ6XNPPpVreQKBgQDeHu4LbieCHg+uw3Ld\nhX87Zsq18a3mUCNnNmFFaR8jdeQt53egIhvUCyKKNtpAMSkUJSjO4POKK1rcLLgp\ny9OIbwTDGCbg33SOnHsJRIGx7RW090CDN5mHr+jR/1RoytTLOECmjRMXZQJA+TJ6\ns7zNRfMVqNmu5KqaT546tJgVNwKBgQDYYLaB9Y9h2F5/7er9FN01wxSlA+pmfs1p\np5mOl2o5MFzoCq+FJMnJfCdwt6BklAhLtKZuMywJiHnsIBP9LzUtDYrpLGbTspfx\nfEQaG4+VX5ZWrGHRz5TJ3o/EJ0QVnWIKngvadH4eGYq+iaDLzVGBwuDYTT9Nmvq3\n1ITnVEp7VQKBgBh0EULi4qiZhKJ50/h9TO+ONnznWXzEj9E6FGVe2FXAEdnX5LyV\nZLjobOoIdeihQON938s+yrEIat1YcwHu9Z/MkRqlWwpgr2VP5t+zUg/ziPM+UTTg\n9x8QB7KuyG0s/1ZMIBn16AcoUKI0jREjHoL+028sAqMVe463ezT9UszrAoGAFMpO\nHvSSP0uD4PTiREjx7E1/OU/EAO8kG4fACGRiD3anJqCINtnPDa4BOCJcpe1XUrbb\n2vDNxWi4lkiKwyP7DwYjF75tbt/VG53eCUgmpqqVjmRnzboNSMw6shU3xH/nwK9o\n4ieZSpkXrLEaoxpqP3aTFhVuBK3kcy9XScbelTUCgYBh+VYaBNScLaqE3hhLI0oA\nwmjbTLJ4AFgYEvoh2WY+jqgRGs0ipdJV9NG4UE18BvLPPx/isxWmFXEnZyX8nDAf\n470uNCKws0b0+yHbR6nF2GfalT8lD96yqtmB/jyjNHPI41m6/MYogJxbpAvXMxnU\nVQ6yvG0BGzM9CZ4v0cTiVQ==\n-----END PRIVATE KEY-----\n";
// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert({
//       clientEmail: "firebase-adminsdk-kawk0@room-8facb.iam.gserviceaccount.com",
//       privateKey: privateKey.replace(/\\n/g, "\n"),
//       projectId: "room-8facb",
//     }),
//     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   });
// }

// export const adminAuth = admin.auth();
// export const adminDb = admin.firestore();
// export const adminStorage = admin.storage();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    }),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
}
