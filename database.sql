-- Crea la tabla de clientes (clients)
CREATE TABLE public.clients (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Activo',
  created_at TIMESTAMP WITH TIME ZONE NULL DEFAULT now(),
  CONSTRAINT clients_pkey PRIMARY KEY (id)
);

-- Habilitar RLS (Opcional pero recomendado)
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Crear política para permitir inserción y lectura anónima/autenticada
-- (Nota: Para un sistema real de producción, debes restringir esto a usuarios autenticados)
CREATE POLICY "Permitir lectura a todos" ON public.clients FOR SELECT USING (true);
CREATE POLICY "Permitir inserción a todos" ON public.clients FOR INSERT WITH CHECK (true);
