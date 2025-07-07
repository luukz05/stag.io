import Link from "next/link";
import Form from "@/components/ui/form";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-black px-4 text-white">
      <Card className="backdrop-blur-md bg-white/5 border border-white/10 shadow-xl w-full max-w-md rounded-2xl">
        <Link
          href="/"
          className="flex items-center gap-3 text-white hover:text-purple-400 absolute left-5 transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>

        <CardHeader>
          <CardTitle className="text-3xl text-center text-white">
            Entrar no Stag.io
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form />
          <p className="text-center text-sm text-zinc-400">
            Não tem uma conta?{" "}
            <a href="/register" className="text-purple-400 hover:underline">
              Criar conta
            </a>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
