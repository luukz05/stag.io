"use server";
import { cookies } from "next/headers";
import { verifyToken } from "./jwt";
import { redirect } from "next/navigation";

export async function requireAuth() {
  const token = (await cookies()).get("token")?.value;

  if (!token || !verifyToken(token)) {
    console.log("🔴 Acesso negado: usuário não autenticado");
    redirect("/login");
  }
}
