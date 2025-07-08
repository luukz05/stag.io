"use server";

import { redirect } from "next/navigation";
import { loginSchema } from "./schema";
import { connectDB } from "./mongoose";
import { User } from "./schema";

export async function loginAction(formData: FormData) {
  await connectDB();

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Dados inválidos." };
  }

  const { email, password } = parsed.data;

  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
    return { error: "E-mail ou senha inválidos." };
  }

  // Aqui você pode definir um cookie de sessão, token JWT, etc.

  redirect("/dashboard");
}
