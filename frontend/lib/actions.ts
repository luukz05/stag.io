"use server";
import { registerSchema, loginSchema, User } from "./schema";
import { connectDB } from "./mongoose";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signToken, verifyToken } from "./jwt";
import { cookies } from "next/headers";

export async function loginAction(formData: FormData) {
  await connectDB();

  const parsed = loginSchema.safeParse({
    email: formData.get("email")?.toString() ?? "",
    password: formData.get("password")?.toString() ?? "",
  });

  if (!parsed.success) {
    console.error(parsed.error.format());
    return { error: "Dados inválidos." };
  }

  const { email, password } = parsed.data;

  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return { error: "E-mail ou senha inválidos." };
  }

  const token = signToken({ email });
  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 dia
    path: "/",
  });

  redirect("/dashboard");
}

export async function registerAction(formData: FormData) {
  await connectDB();

  const parsed = registerSchema.safeParse({
    name: formData.get("name")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    password: formData.get("password")?.toString() ?? "",
  });

  if (!parsed.success) {
    console.error(parsed.error.format());
    return { error: "Preencha os dados corretamente." };
  }

  const { name, email, password } = parsed.data;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return { error: "E-mail já cadastrado." };
  }

  await User.create({
    name,
    email,
    passwordHash: await bcrypt.hash(password, 10),
  });

  redirect("/login");
}
