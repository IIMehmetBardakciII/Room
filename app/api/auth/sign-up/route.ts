// import { auth, db } from "@/libs/firebase/config";
// import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { NextResponse } from "next/server";
// import { SignJWT } from "jose";
// import { getJwtSecretKey } from "@/libs/actions/auth";

// export async function POST(request: Request) {
//   const formdata = await request.formData();
//   const email = formdata.get("email") || null;
//   const username = formdata.get("username") || null;
//   const password = formdata.get("password") || null;
//   const authMethod = formdata.get("authMethod");
//   const userUid = formdata.get("userUid") || null;
//   const profilePicture = formdata.get("profilePicture") || "";

//   //* For users collection
//   const collectionRef = collection(db, "users");
//   switch (authMethod) {
//     case "email":
//       if (
//         typeof email === "string" &&
//         typeof password === "string" &&
//         typeof username === "string"
//       ) {
//         try {
//           const userCredential = await createUserWithEmailAndPassword(
//             auth,
//             email,
//             password
//           );
//           const user = userCredential.user;
//           if (user) {
//             const userData = {
//               uid: user.uid,
//               email,
//               username,
//               userType: "Free",
//               profilePicture: "",
//               signUpDate: new Date(),
//             };
//             //* Dökümanı oluşturma
//             await addDoc(collectionRef, userData);
//             //* Tokenı oluşturma
//             const token = await new SignJWT({
//               email: userData.email,
//               userType: userData.userType,
//               username: userData.username,
//               profilePicture: userData.profilePicture,
//             })
//               .setProtectedHeader({ alg: "HS256" })
//               .setIssuedAt()
//               .setExpirationTime("7 days")
//               .sign(getJwtSecretKey());
//             //*Dönecek responseı oluşturma
//             const response = NextResponse.json({
//               success: true,
//             });
//             //*Responsea cookies set etmek token adında oluşturduğumuz tokenla.
//             response.cookies.set({
//               name: "token",
//               value: token,
//               path: "/",
//             });
//             return response;
//           }
//         } catch (error: any) {
//           console.log(
//             "Invalid Form data: email,password or username is missing or incorrect",
//             error
//           );
//           return NextResponse.json({ error: error.message }, { status: 400 });
//         }
//       } else {
//         console.error("Invalid Form Data Type");
//         return NextResponse.json(
//           { error: "Geçersiz e-posta ,şifre veya kullanıcı adı" },
//           { status: 400 }
//         );
//       }
//       break;
//     case "Google":
//       try {
//         if (typeof userUid === "string") {
//           //*User yok ise collectionda o zaman ekleme yapıcaz onun için query.
//           const userQuery = query(collectionRef, where("uid", "==", userUid));
//           const querySnapShots = await getDocs(userQuery);
//           if (querySnapShots.empty) {
//             const userData = {
//               uid: userUid,
//               email,
//               username,
//               userType: "Free",
//               profilePicture: profilePicture,
//               signUpDate: new Date(),
//             };
//             await addDoc(collectionRef, userData);
//           }
//           const docData = querySnapShots.docs[0];
//           const userData = docData.data();
//           const token = await new SignJWT({
//             email: userData.email,
//             userType: userData.userType,
//             username: userData.username,
//             profilePicture: userData.profilePicture,
//           })
//             .setProtectedHeader({ alg: "HS256" })
//             .setIssuedAt()
//             .setExpirationTime("7 days")
//             .sign(getJwtSecretKey());

//           const response = NextResponse.json({ success: true });
//           response.cookies.set({
//             name: "token",
//             value: token,
//             path: "/",
//           });
//           return response;
//         }
//       } catch (error: any) {
//         console.log("Something went wrong while Google authtentication", error);
//         return NextResponse.json({ error: error.message }, { status: 400 });
//       }
//       break;
//     case "Github":
//       try {
//         if (typeof userUid === "string") {
//           const userQuery = query(collectionRef, where("uid", "==", userUid));
//           const querySnapShots = await getDocs(userQuery);
//           if (querySnapShots.empty) {
//             const userData = {
//               uid: userUid,
//               email,
//               username,
//               userType: "Free",
//               profilePicture: profilePicture,
//               signUpDate: new Date(),
//             };
//             await addDoc(collectionRef, userData);
//           }
//           const docData = querySnapShots.docs[0];
//           const userData = docData.data();
//           const token = await new SignJWT({
//             email: userData.email,
//             userType: userData.userType,
//             username: userData.username,
//             profilePicture: userData.profilePicture,
//           })
//             .setProtectedHeader({ alg: "HS256" })
//             .setIssuedAt()
//             .setExpirationTime("7 days")
//             .sign(getJwtSecretKey());

//           const response = NextResponse.json({ success: true });
//           response.cookies.set({
//             name: "token",
//             value: token,
//             path: "/",
//           });
//           return response;
//         }
//       } catch (error: any) {
//         console.log("Something went wrong while Github authtentication", error);
//         return NextResponse.json({ error: error.message }, { status: 400 });
//       }
//       break;

//     default:
//       return NextResponse.json(
//         { error: "Invalid authentication method" },
//         { status: 400 }
//       );
//       break;
//   }
// }

//! Admin Sdk alanı */
import { initAdmin } from "@/libs/firebaseAdmin/config"; // Admin SDK konfigürasyonunu doğru şekilde içe aktar
import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { getJwtSecretKey } from "@/libs/actions/auth";

export async function POST(request: Request) {
  initAdmin();
  const admin = require("firebase-admin");
  const adminAuth = admin.auth();
  const adminDb = admin.firestore();

  const formdata = await request.formData();
  const email = formdata.get("email") || null;
  const username = formdata.get("username") || null;
  const password = formdata.get("password") || null;
  const authMethod = formdata.get("authMethod");
  const userUid = formdata.get("userUid") || null;
  const profilePicture = formdata.get("profilePicture") || "";

  //* For users collection
  const collectionRef = adminDb.collection("users");

  switch (authMethod) {
    case "email":
      if (
        typeof email === "string" &&
        typeof password === "string" &&
        typeof username === "string"
      ) {
        try {
          const userCredential = await adminAuth.createUser({
            email,
            password,
            displayName: username,
          });
          const user = userCredential;
          if (user) {
            const userData = {
              uid: user.uid,
              email,
              username,
              userType: "Free",
              profilePicture: "",
              signUpDate: new Date(),
            };
            //* Dökümanı oluşturma
            await collectionRef.doc(user.uid).set(userData);
            //* Tokenı oluşturma
            const token = await new SignJWT({
              email: userData.email,
              userType: userData.userType,
              username: userData.username,
              profilePicture: userData.profilePicture,
            })
              .setProtectedHeader({ alg: "HS256" })
              .setIssuedAt()
              .setExpirationTime("7 days")
              .sign(getJwtSecretKey());
            //* Dönecek response'ı oluşturma
            const response = NextResponse.json({
              success: true,
            });
            //* Response'a cookie set etmek token adında oluşturduğumuz token'la.
            response.cookies.set({
              name: "token",
              value: token,
              path: "/",
            });
            return response;
          }
        } catch (error: any) {
          console.log(
            "Invalid Form data: email, password or username is missing or incorrect",
            error
          );
          return NextResponse.json({ error: error.message }, { status: 400 });
        }
      } else {
        console.error("Invalid Form Data Type");
        return NextResponse.json(
          { error: "Geçersiz e-posta, şifre veya kullanıcı adı" },
          { status: 400 }
        );
      }
      break;
    case "Google":
      try {
        if (typeof userUid === "string") {
          //* User yok ise collectionda o zaman ekleme yapıcaz onun için query.
          const userDoc = await collectionRef.doc(userUid).get();
          if (!userDoc.exists) {
            const userData = {
              uid: userUid,
              email,
              username,
              userType: "Free",
              profilePicture: profilePicture,
              signUpDate: new Date(),
            };
            await collectionRef.doc(userUid).set(userData);
          }
          const userData = (await collectionRef.doc(userUid).get()).data();
          const token = await new SignJWT({
            email: userData?.email,
            userType: userData?.userType,
            username: userData?.username,
            profilePicture: userData?.profilePicture,
          })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("7 days")
            .sign(getJwtSecretKey());

          const response = NextResponse.json({ success: true });
          response.cookies.set({
            name: "token",
            value: token,
            path: "/",
          });
          return response;
        }
      } catch (error: any) {
        console.log("Something went wrong while Google authentication", error);
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      break;
    case "Github":
      try {
        if (typeof userUid === "string") {
          const userDoc = await collectionRef.doc(userUid).get();
          if (!userDoc.exists) {
            const userData = {
              uid: userUid,
              email,
              username,
              userType: "Free",
              profilePicture: profilePicture,
              signUpDate: new Date(),
            };
            await collectionRef.doc(userUid).set(userData);
          }
          const userData = (await collectionRef.doc(userUid).get()).data();
          const token = await new SignJWT({
            email: userData?.email,
            userType: userData?.userType,
            username: userData?.username,
            profilePicture: userData?.profilePicture,
          })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("7 days")
            .sign(getJwtSecretKey());

          const response = NextResponse.json({ success: true });
          response.cookies.set({
            name: "token",
            value: token,
            path: "/",
          });
          return response;
        }
      } catch (error: any) {
        console.log("Something went wrong while GitHub authentication", error);
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      break;

    default:
      return NextResponse.json(
        { error: "Invalid authentication method" },
        { status: 400 }
      );
      break;
  }
}

// export const runtime = "nodejs";
