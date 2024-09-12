"use client";
import {
  EmailIcon,
  ErrorIcon,
  Github,
  Google,
  PasswordIcon,
  SuccessCheck,
  UsernameIcon,
} from "@/libs/components/svgs";
import Button from "@/libs/components/utils/Button";
import { cn } from "@/libs/utils/cn";
import { validateSignupForm } from "@/libs/zodValidationSchemas/signupValidation";
import Image from "next/image";
import { useState } from "react";

const SignIn = () => {
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    const validation = validateSignupForm({ username, email, password });

    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }

    formData.append("authMethod", "email");

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (!result.ok) {
      console.log("Kullanıcı kaydedilemedi");
    } else {
      console.log("Kullanıcı oluşturuldu");
    }
  }
  return (
    <div className="flex items-center justify-center w-full h-[491px]   relative top-[60px] ">
      {/* Form Elements */}
      <div className="w-[385px] bg-[#1B1B1B] max-h-[423px] pl-8 pr-[103px] py-[20px] ">
        <h3 className="text-white">Room'a Ücretsiz Kayıt Ol</h3>
        {/* Form For email/password/username */}
        <form onSubmit={handleSubmit} className="">
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
              text="Giriş Yap"
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
        {/* Button For google auth with onclick event */}
        <button className="flex w-[250px] bg-hoverBlue  text-white px-[14px] py-[10px] rounded-[5px] items-center hover:bg-defaultBlue transition-all ease-in-out  justify-center gap-2 mt-2">
          <Google className="w-[14px] h-[14px]" />
          <span className="h-[14px]">Google İle Giriş Yap</span>
        </button>
        {/* Button For github auth with onclick event */}
        <button className="flex w-[250px] bg-[#24292E]  text-white px-[14px] py-[10px] rounded-[5px] items-center hover:bg-[#3c454e] transition-all ease-in-out  justify-center gap-2 mt-2">
          <Github className="w-[14px] h-[14px]" />
          <span className="h-[14px]">Github İle Giriş Yap</span>
        </button>
      </div>
      {/* İmage Container */}
      <div className="w-[547px] h-[423px] relative">
        <Image src="/artwork.png" alt="artwork" fill className="object-cover" />
      </div>
    </div>
  );
};

export default SignIn;
