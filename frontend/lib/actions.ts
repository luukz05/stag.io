"use server";

import { loginSchema } from "./schema";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = loginSchema.safeParse(raw);

  if (!result.success) {
    // Aqui você pode lançar um erro ou retornar mensagens
    console.error(result.error.format());
    return;
  }

  const { email, password } = result.data;

  // Aqui você faria a validação no banco de dados (mock exemplo):
  if (email === "admin@stag.io" && password === "123456") {
    redirect("/dashboard"); // login bem-sucedido
  }

  throw new Error("Credenciais inválidas");
}
