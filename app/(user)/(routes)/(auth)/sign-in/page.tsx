"use client";
import GoogleAndGithubAuth from "@/libs/components/organism/GoogleAndGithubAuth";
import { EmailIcon, ErrorIcon, PasswordIcon } from "@/libs/components/svgs";
import Button from "@/libs/components/utils/Button";
import { cn } from "@/libs/utils/cn";
import { validateSignupForm } from "@/libs/zodValidationSchemas/signupValidation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignIn = () => {
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  } | null>(null);
  const [pending, setPending] = useState<boolean>(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    const validation = validateSignupForm({ email, password });

    if (!validation.success) {
      setErrors(validation.errors);
      setPending(false);
    }

    try {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.log("Kullanıcı kaydedilemedi");
        setPending(false);
        return;
      } else {
        console.log("Kullanıcı oluşturuldu");
        setPending(false);
        router.push("/");
        window.location.reload();
      }
    } catch (error) {
      console.error("API isteğinde bir hata oluştu:", error);
      setPending(false); // Hata durumunda da pending'i kapatın
    }
  }
  return (
    <div className="flex items-center justify-center w-full h-[491px]   relative top-[60px] ">
      {/* Form Elements */}
      <div className="w-[385px] bg-[#1B1B1B] max-h-[423px] pl-8 pr-[103px] py-[20px] ">
        <h3 className="text-white">Room'a Ücretsiz Kayıt Ol</h3>
        {/* Form For email/password/username */}
        <form onSubmit={handleSubmit}>
          {/* email input  */}
          <div className="flex flex-col  relative w-[250px] mt-2  ">
            <label
              htmlFor="email"
              className={cn("text-white", errors?.email && "text-hoverRed")}
            >
              <span>Email</span>
            </label>
            <div
              className={cn(
                "flex items-center border-[2px] border-paragraphGray rounded-[5px] focus-within:border-hoverBlue",
                errors?.email && "border-hoverRed"
              )}
            >
              <EmailIcon
                className={cn(
                  "w-[16px] h-[16px] text-white ml-2",
                  errors?.email && "text-hoverRed"
                )}
              />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Kullanıcı adınızı giriniz"
                className="px-[10px] py-2 rounded-[5px] placeholder:text-paragraphGray text-white bg-[transparent!important] focus:outline-none"
                autoFocus
              />
              {/* Conditional icons */}

              <ErrorIcon
                className={cn(
                  "w-[16px] h-[16px]   mr-2 hidden",
                  errors?.email && "block text-hoverRed"
                )}
              />
            </div>
            {errors?.email && (
              <p className="text-disabledRed text-[12px]">{errors.email}</p>
            )}
          </div>
          {/* password input  */}
          <div className="flex flex-col relative w-[250px] mt-2  ">
            <label
              htmlFor="password"
              className={cn("text-white", errors?.password && "text-hoverRed")}
            >
              <span>Şifre</span>
            </label>
            <div
              className={cn(
                "flex items-center border-[2px] border-paragraphGray rounded-[5px] focus-within:border-hoverBlue",
                errors?.password && "border-hoverRed"
              )}
            >
              <PasswordIcon
                className={cn(
                  "w-[16px] h-[16px] text-white ml-2",
                  errors?.password && "text-hoverRed"
                )}
              />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Kullanıcı adınızı giriniz"
                className="px-[10px] py-2 rounded-[5px] placeholder:text-paragraphGray text-white bg-[transparent!important] focus:outline-none"
                autoFocus
              />
              {/* Conditional icons */}

              <ErrorIcon
                className={cn(
                  "w-[16px] h-[16px]  mr-2 hidden",
                  errors?.email && "block text-hoverRed"
                )}
              />
            </div>
            {errors?.password && (
              <p className="text-disabledRed text-[12px]">{errors.password}</p>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              buttonColor="blue"
              text={pending ? "Kullanıcı aranıyor" : "Giriş Yap"}
              buttonType="default"
              type="submit"
              className="mt-2"
            />
            <Button
              buttonColor="blue"
              text="Kayıt Ol"
              buttonType="ghost"
              className="mt-2"
              type="button"
              href="/sign-up"
            />
          </div>
        </form>
        <GoogleAndGithubAuth />
      </div>
      {/* İmage Container */}
      <div className="w-[547px] h-[423px] relative">
        <Image
          src="/artwork.png"
          alt="artwork"
          fill
          className="object-cover"
          sizes="(max-width: 547px)"
        />
      </div>
    </div>
  );
};

export default SignIn;
