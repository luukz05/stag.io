"use client";

import { useState } from "react";
import { loginAction } from "@/lib/actions";
import { Input } from "./input";
import { Button } from "./button";

export default function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      await loginAction(formData);
    } catch (err) {
      console.error("Erro no login:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm text-zinc-300">
          E-mail
        </label>
        <Input
          id="email"
          type="email"
          placeholder="seuemail@exemplo.com"
          className="bg-zinc-800 text-white border-white/10 placeholder:text-zinc-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
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
          className="bg-zinc-800 text-white border-white/10 placeholder:text-zinc-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full text-base px-6 py-2 rounded-xl">
        Entrar
      </Button>

      <p className="text-center text-sm text-zinc-400">
        Não tem uma conta?{" "}
        <a href="/register" className="text-purple-400 hover:underline">
          Criar conta
        </a>
      </p>
    </form>
  );
}
