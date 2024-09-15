import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { jwtVerify } from "jose";
import { auth } from "../firebase/config";

export const getJwtSecretKey = () => {
  const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;
  if (!secretKey) {
    throw new Error("JwtSecretKey is not found");
  }
  return new TextEncoder().encode(secretKey);
};

export async function verifyJwtToken(token: string) {
  try {
    //* JWT token üçe ayrılır headers-> hashleme işlemleri , payload=datamızın olduğu yer obje şeklinde ve , secretKey=datamızı güvenliğini artırmak için.
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload;
  } catch (error) {
    return null;
  }
}

export async function signUpWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    if (result) {
      return result;
    }
  } catch (error: any) {
    console.error("Google giriş hatası", error);
    return { error: error.message };
  }
}

export async function signUpWithGithub() {
  const provider = new GithubAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    if (result) {
      return result;
    }
  } catch (error: any) {
    console.error("Github giriş hatası ", error);
    return { error: error.message };
  }
}
