export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="relative flex items-center justify-center">
        {/* Glow halo */}
        <div className="absolute w-28 h-28 bg-indigo-600/20 rounded-full blur-2xl animate-pulse" />
        
        {/* Spinner ring */}
        <div className="w-12 h-12 rounded-full border-2 border-slate-800 border-t-indigo-500 animate-spin" />
      </div>
      <p className="mt-4 text-xs font-mono tracking-widest text-slate-500 uppercase">
        Cargando interfaz · AVANZA
      </p>
    </div>
  );
}
