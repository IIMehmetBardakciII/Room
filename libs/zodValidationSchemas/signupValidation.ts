import { z } from "zod";
//* Şifre doğrulama regex: En az bir küçük harf, bir büyük harf ve minimum 6 karakter
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

const signUpSchema = z.object({
  username: z.string().min(3, "Kullanıcı adı en az 3 karakterden oluşmalı"),
  email: z.string().email("Geçersiz Email"),
  password: z
    .string()
    .min(6, "Şifre en az 6 karakterden oluşmalı")
    .regex(
      passwordRegex,
      "Şifre En az 1 Küçük harf, 1 Büyük harf ve minimum 6 karakter olmalı."
    ),
});

export const validateSignupForm = (data: {
  username?: string;
  email: string;
  password: string;
}) => {
  const result = signUpSchema.safeParse(data);

  if (result.success) {
    return { success: true, errors: null };
  } else {
    const errors: { [key: string]: string } = {};
    result.error.errors.map((error) => {
      errors[error.path[0]] = error.message;
    });
    return { succes: true, errors };
  }
};
