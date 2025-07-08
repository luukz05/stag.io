// app/page.tsx (Next.js App Router)
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LP() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white px-4">
      <Card className="backdrop-blur-md bg-white/5 border border-white/10 shadow-xl w-full max-w-xl rounded-2xl">
        <CardContent className="p-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Bem-vindo ao <span className="text-purple-400">Stag.io</span>
          </h1>
          <p className="text-zinc-300 text-base md:text-lg mb-6">
            Uma plataforma moderna, rápida e inteligente para conectar ideias e talentos. Transforme seus projetos em realidade com colaboração em tempo real.
          </p>
          <Button variant="default" className="text-base px-6 py-2 rounded-xl" asChild>
            <Link href="/login">Começar agora</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
