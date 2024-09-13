import { getJwtSecretKey } from "@/libs/actions/auth";
import { auth, db } from "@/libs/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log("Request işlemi geliyor");
  const formdata = await request.formData();
  const email = formdata.get("email") || null;
  const password = formdata.get("password") || null;

  if (typeof email === "string" && typeof password == "string") {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const uid = user.uid;
      const usersCollectionRef = collection(db, "users");
      const queryForUser = query(usersCollectionRef, where("uid", "==", uid));
      const querySnapShot = await getDocs(queryForUser);

      if (querySnapShot.empty) {
        console.log("User dökümanı bulunamadı");
        return NextResponse.json(
          { error: "Kullanıcı Bulunamadı." },
          { status: 404 }
        );
      }
      const userData = querySnapShot.docs[0].data();

      //*Token
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
      //* Response Creating
      const response = NextResponse.json({ success: true });
      response.cookies.set({
        name: "token",
        value: token,
        path: "/",
      });
      return response;
    } catch (error: any) {
      console.error("Something went wrong while Sign In", error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }
  return NextResponse.json(
    { error: "Geçersiz e-posta veya şifre." },
    { status: 400 }
  );
}

export const runtime = "nodejs";
