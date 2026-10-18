import { login } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-8 shadow-xl">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <span className="text-2xl font-bold text-white">A</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Ingresa al sistema interno de AVANZA
          </p>
        </div>

        <form className="mt-8 space-y-6" action={login}>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-zinc-300">
                Correo Electrónico
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="bg-zinc-900 border-zinc-800 text-white focus:border-blue-500"
                placeholder="admin@avanza.dev"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-zinc-300">
                Contraseña
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="bg-zinc-900 border-zinc-800 text-white focus:border-blue-500"
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold">
            Entrar al Dashboard
          </Button>
        </form>
      </div>
    </div>
  );
}
