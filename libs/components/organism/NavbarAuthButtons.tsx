"use client";
import { auth } from "@/libs/firebase/config";
import { signOut } from "firebase/auth";
import Button from "../utils/Button";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";

type NavbarAuthButtonsProps = {
  tokenStatus: boolean;
};
const NavbarAuthButtons = ({ tokenStatus }: NavbarAuthButtonsProps) => {
  const router = useRouter();
  const [successState, setSuccessState] = useState<boolean>();
  useEffect(() => setSuccessState(tokenStatus), [tokenStatus]);
  const handleLogOut = async () => {
    const cookies = new Cookies();
    try {
      await signOut(auth);
      console.log("Başarıyla çıkış yapıldı");
      cookies.remove("token");
      setSuccessState(false);
      router.push("/sign-in");
    } catch (error) {
      console.log("Something went wrong ", error);
    }
  };

  return (
    <div className="flex gap-3">
      {successState ? (
        <div onClick={handleLogOut}>
          <Button
            text="Çıkış Yap"
            buttonColor="blue"
            buttonType="ghost"
            href="/sign-up"
          />
        </div>
      ) : (
        <>
          {/* Kayıt Ol Button */}
          <Button
            text="Kayıt Ol"
            buttonColor="blue"
            buttonType="default"
            href="/sign-up"
          />
          {/* Giriş Yap Button */}
          <Button
            text="Giriş Yap"
            buttonColor="blue"
            buttonType="ghost"
            href="/sign-in"
          />
        </>
      )}
    </div>
  );
};

export default NavbarAuthButtons;
