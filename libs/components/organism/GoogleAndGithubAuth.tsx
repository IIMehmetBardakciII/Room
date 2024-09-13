"use client";
import { signUpWithGithub, signUpWithGoogle } from "@/libs/actions/auth";
import { useRouter } from "next/navigation";
import { Google, Github } from "../svgs";

const GoogleAndGithubAuth = () => {
  const router = useRouter();
  //* Google Auth
  async function handleGoogleAuth() {
    try {
      const result = await signUpWithGoogle();
      if (!result || "error" in result) {
        console.error("Google giriş hatası:", result?.error);
        return;
      }
      const formData = new FormData();
      formData.append("email", result.user.email ?? "");
      formData.append("username", result.user.displayName ?? "");
      formData.append("userUid", result.user.uid ?? "");
      formData.append("profilePicture", result.user.photoURL ?? "");
      formData.append("authMethod", "Google");
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        console.log("Kullanıcı kaydedilemedi");
      } else {
        console.log("Kullanıcı oluşturuldu");
        router.push("/");
        window.location.reload();
      }
    } catch (error: any) {
      console.log("Something went wrong in clientside", error);
    }
  }
  async function handleGithubAuth() {
    try {
      const result = await signUpWithGithub();
      if (!result || "error" in result) {
        console.error("Google giriş hatası:", result?.error);
        return;
      }
      const formData = new FormData();
      formData.append("email", result.user.email ?? "");
      formData.append("username", result.user.displayName ?? "");
      formData.append("userUid", result.user.uid ?? "");
      formData.append("profilePicture", result.user.photoURL ?? "");
      formData.append("authMethod", "Github");
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        console.log("Kullanıcı kaydedilemedi");
      } else {
        console.log("Kullanıcı oluşturuldu");
        router.push("/");
        window.location.reload();
      }
    } catch (error: any) {
      console.log("Something went wrong in clientside", error);
    }
  }

  return (
    <div>
      {/* Button For google auth with onclick event */}
      <button
        onClick={handleGoogleAuth}
        className="flex w-[250px] bg-hoverBlue  text-white px-[14px] py-[10px] rounded-[5px] items-center hover:bg-defaultBlue transition-all ease-in-out  justify-center gap-2 mt-2"
      >
        <Google className="w-[14px] h-[14px]" />
        <span className="h-[14px]">Google İle Giriş Yap</span>
      </button>
      {/* Button For github auth with onclick event */}
      <button
        onClick={handleGithubAuth}
        className="flex w-[250px] bg-[#24292E]  text-white px-[14px] py-[10px] rounded-[5px] items-center hover:bg-[#3c454e] transition-all ease-in-out  justify-center gap-2 mt-2"
      >
        <Github className="w-[14px] h-[14px]" />
        <span className="h-[14px]">Github İle Giriş Yap</span>
      </button>
    </div>
  );
};

export default GoogleAndGithubAuth;
