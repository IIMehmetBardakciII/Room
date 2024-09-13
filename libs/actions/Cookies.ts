"use server";
import { verifyJwtToken } from "@/libs/actions/auth";
import { cookies } from "next/headers";

export async function getCookies() {
  const cookiesUse = cookies();
  const { value: token } = cookiesUse.get("token") ?? { value: null };
  if (token) {
    try {
      const verifiedToken = await verifyJwtToken(token);
      return { verifiedToken, success: true };
    } catch (error) {
      console.error("Token doğrulama hatası:", error);
      return { verifiedToken: null, success: false };
    }
  } else {
    console.log("Token bulunamadı veya geçersiz");
    return { verifiedToken: null, success: false };
  }
}
