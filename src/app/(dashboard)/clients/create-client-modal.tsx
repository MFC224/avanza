"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { addClient } from "./actions";

export function CreateClientModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    try {
      await addClient(formData);
      setOpen(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.2)]">
        <Plus className="w-4 h-4 mr-2" />
        Nuevo Cliente
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-zinc-950 text-zinc-100 border-zinc-800">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Cliente</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Ingresa los datos del cliente. Haz clic en guardar cuando termines.
          </DialogDescription>
        </DialogHeader>
        
        <form action={onSubmit}>
          <div className="grid gap-4 py-4">
            {error && <p className="text-sm text-red-400 bg-red-950/50 p-2 rounded border border-red-900 font-medium">{error}</p>}
            
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-zinc-300">Nombre completo</Label>
              <Input id="name" name="name" required className="bg-zinc-900 border-zinc-800 text-white focus:border-blue-500" placeholder="Ej. Juan Pérez" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="company" className="text-zinc-300">Empresa / Startup</Label>
              <Input id="company" name="company" required className="bg-zinc-900 border-zinc-800 text-white focus:border-blue-500" placeholder="Ej. TechCorp" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-zinc-300">Correo electrónico</Label>
              <Input id="email" name="email" type="email" required className="bg-zinc-900 border-zinc-800 text-white focus:border-blue-500" placeholder="juan@ejemplo.com" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="status" className="text-zinc-300">Estado</Label>
              <Input id="status" name="status" defaultValue="Activo" className="bg-zinc-900 border-zinc-800 text-white focus:border-blue-500" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="border-zinc-800 hover:bg-zinc-800 text-zinc-300" disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white" disabled={loading}>
              {loading ? "Guardando..." : "Guardar Cliente"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
