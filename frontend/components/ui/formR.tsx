"use client";

import { useState } from "react";
import { registerAction } from "@/lib/actions";
import { Input } from "./input";
import { Button } from "./button";
import Link from "next/link";

export default function FormRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    try {
      await registerAction(formData);
    } catch (err) {
      console.error("Erro no registro:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm text-zinc-300">
          Nome completo
        </label>
        <Input
          id="name"
          type="text"
          placeholder="Seu nome"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-zinc-800 text-white border-white/10 placeholder:text-zinc-400"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm text-zinc-300">
          E-mail
        </label>
        <Input
          id="email"
          type="email"
          placeholder="seuemail@exemplo.com"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-zinc-800 text-white border-white/10 placeholder:text-zinc-400"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm text-zinc-300">
          Senha
        </label>
        <Input
          id="password"
          type="password"
          placeholder="********"
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-zinc-800 text-white border-white/10 placeholder:text-zinc-400"
        />
      </div>

      <Button type="submit" className="w-full text-base px-6 py-2 rounded-xl">
        Criar conta
      </Button>

      <p className="text-center text-sm text-zinc-400">
        Já tem uma conta?{" "}
        <Link href="/login" className="text-purple-400 hover:underline">
          Entrar
        </Link>
      </p>
    </form>
  );
}
