"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-black px-4 text-white">
      <Card className="relative backdrop-blur-md bg-white/5 border border-white/10 shadow-xl w-full max-w-md rounded-2xl">
        <Link
          href="/"
          className="flex items-center gap-3 text-white hover:text-purple-400 absolute left-5 top-5 transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>

        <CardHeader>
          <CardTitle className="text-3xl text-center text-white">
            Criar conta no Stag.io
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form className="space-y-4">
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
                className="bg-zinc-800 text-white border-white/10 placeholder:text-zinc-400"
              />
            </div>

            <Button
              type="submit"
              className="w-full text-base px-6 py-2 rounded-xl"
            >
              Criar conta
            </Button>
          </form>

          <p className="text-center text-sm text-zinc-400">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-purple-400 hover:underline">
              Entrar
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
