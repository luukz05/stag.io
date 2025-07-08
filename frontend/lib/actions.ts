"use server";
import { registerSchema } from "./schema";
import { redirect } from "next/navigation";
import { loginSchema } from "./schema";
import { connectDB } from "./mongoose";
import { User } from "./schema";
import bcrypt from "bcrypt";

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

export async function registerAction(formData: FormData) {
  await connectDB();

  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Preencha os dados corretamente." };
  }

  const { name, email, password } = parsed.data;

  // Verifica se já existe um usuário com o mesmo e-mail
  const userExists = await User.findOne({ email });

  if (userExists) {
    return { error: "E-mail já cadastrado." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Cria o usuário
  await User.create({
    name,
    email,
    passwordHash: await bcrypt.hash(password, 10),
  });

  redirect("/login"); // ou para o dashboard direto, se quiser logar após cadastrar
}
