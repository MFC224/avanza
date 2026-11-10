"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Layers,
  RefreshCw,
  Users,
  Phone,
  MessageCircle,
  Home,
  BookOpen,
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  X
} from "lucide-react";

interface CommandItem {
  id: string;
  title: string;
  category: "Navegación" | "Acción Rápida" | "Contacto" | "Legal";
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  badge?: string;
}

export function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Keyboard shortcut listener: Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    if (typeof window !== "undefined") {
      (window as unknown as { openAvanzaCommandMenu?: () => void }).openAvanzaCommandMenu = handleOpen;
      (window as unknown as { closeAvanzaCommandMenu?: () => void }).closeAvanzaCommandMenu = handleClose;
    }

    window.addEventListener("open-avanza-command-menu", handleOpen);
    window.addEventListener("close-avanza-command-menu", handleClose);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("open-avanza-command-menu", handleOpen);
      window.removeEventListener("close-avanza-command-menu", handleClose);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
        setQuery("");
        setSelectedIndex(0);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const copyToClipboard = (text: string, label: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2000);
    }
  };

  const commands: CommandItem[] = [
    {
      id: "home",
      title: "Ir a Página de Inicio",
      category: "Navegación",
      icon: Home,
      action: () => {
        router.push("/");
        setIsOpen(false);
      },
    },
    {
      id: "services",
      title: "Ver los 17 Servicios de Software & IA",
      category: "Navegación",
      icon: Layers,
      badge: "17 Módulos",
      action: () => {
        router.push("/servicios");
        setIsOpen(false);
      },
    },
    {
      id: "methodology",
      title: "Conocer la Metodología SCRUM",
      category: "Navegación",
      icon: RefreshCw,
      badge: "Sprints Semanales",
      action: () => {
        router.push("/metodologia");
        setIsOpen(false);
      },
    },
    {
      id: "team",
      title: "Conocer al Equipo & Liderazgo",
      category: "Navegación",
      icon: Users,
      badge: "Manuel & Magno",
      action: () => {
        router.push("/nosotros");
        setIsOpen(false);
      },
    },
    {
      id: "contact",
      title: "Formulario de Contacto & Cotizador",
      category: "Navegación",
      icon: Sparkles,
      badge: "15 seg",
      action: () => {
        router.push("/contacto");
        setIsOpen(false);
      },
    },
    {
      id: "reclamaciones",
      title: "Libro de Reclamaciones Virtual",
      category: "Legal",
      icon: BookOpen,
      badge: "INDECOPI",
      action: () => {
        router.push("/reclamaciones");
        setIsOpen(false);
      },
    },
    {
      id: "quote-web",
      title: "Cotizar Página Web en 7 Días",
      category: "Acción Rápida",
      icon: Sparkles,
      badge: "Express",
      action: () => {
        window.open(
          "https://wa.me/51942498841?text=Hola%20Magno,%20quiero%20cotizar%20una%20p%C3%A1gina%20web%20en%207%20d%C3%ADas.",
          "_blank"
        );
        setIsOpen(false);
      },
    },
    {
      id: "whatsapp-magno",
      title: "Chat Inmediato con Magno Alomía",
      category: "Contacto",
      icon: MessageCircle,
      badge: "+51 942 498 841",
      action: () => {
        window.open(
          "https://wa.me/51942498841?text=Hola%20Magno,%20deseo%20conversar%20sobre%20un%20proyecto.",
          "_blank"
        );
        setIsOpen(false);
      },
    },
    {
      id: "call-manuel",
      title: "Llamada Directa con Manuel Callañaupa",
      category: "Contacto",
      icon: Phone,
      badge: "+51 921 195 037",
      action: () => {
        window.location.assign("tel:+51921195037");
        setIsOpen(false);
      },
    },
    {
      id: "copy-email",
      title: "Copiar Correo Oficial: contacto@avanzastudio.com",
      category: "Acción Rápida",
      icon: Copy,
      badge: "contacto@avanzastudio.com",
      action: () => {
        copyToClipboard("contacto@avanzastudio.com", "Correo copiado");
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase()) ||
    (cmd.badge && cmd.badge.toLowerCase().includes(query.toLowerCase()))
  );

  // Handle arrow key navigation in menu
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
    } else if (e.key === "Enter" && filteredCommands[selectedIndex]) {
      e.preventDefault();
      filteredCommands[selectedIndex].action();
    }
  };

  return (
    <>
      {/* Global Event Listener Trigger (Custom Event or Navbar Click) */}
      <button
        type="button"
        id="open-command-palette-trigger"
        onClick={() => setIsOpen(true)}
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
      >
        Open
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[120] flex items-start justify-center pt-20 sm:pt-28 px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-xl bg-white/95 border border-slate-200 rounded-2xl shadow-[0_20px_60px_rgba(15,23,42,0.15)] overflow-hidden z-10"
            >
              {/* Search Bar Input */}
              <div className="flex items-center px-4 py-3.5 border-b border-slate-200 gap-3">
                <Search className="w-5 h-5 text-blue-600 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Escribe un comando o busca una sección... (ej. Servicios, WhatsApp, SCRUM)"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm focus:outline-none"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Commands List */}
              <div className="max-h-80 overflow-y-auto p-2 space-y-1">
                {filteredCommands.length === 0 ? (
                  <div className="py-8 text-center text-sm text-slate-400">
                    No encontramos ningún comando con &quot;{query}&quot;.
                  </div>
                ) : (
                  filteredCommands.map((cmd, idx) => {
                    const Icon = cmd.icon;
                    const isSelected = idx === selectedIndex;

                    return (
                      <button
                        key={cmd.id}
                        onClick={cmd.action}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-sm transition-all duration-150 cursor-pointer ${
                          isSelected
                            ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                            : "text-slate-700 hover:bg-slate-100/80"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-1.5 rounded-lg ${
                              isSelected ? "bg-white/20 text-white" : "bg-blue-50 text-blue-600"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="font-medium block">{cmd.title}</span>
                            <span
                              className={`text-[10px] uppercase tracking-wider block font-mono ${
                                isSelected ? "text-blue-100" : "text-slate-400"
                              }`}
                            >
                              {cmd.category}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {cmd.badge && (
                            <span
                              className={`text-xs px-2 py-0.5 rounded-md font-mono ${
                                isSelected
                                  ? "bg-white/20 text-white"
                                  : "bg-slate-100 text-slate-600 border border-slate-200"
                              }`}
                            >
                              {cmd.badge}
                            </span>
                          )}
                          <ArrowRight
                            className={`w-3.5 h-3.5 transition-transform ${
                              isSelected ? "translate-x-0.5 text-white" : "text-slate-400"
                            }`}
                          />
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Footer Help */}
              <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <div className="flex items-center gap-3">
                  <span>
                    <kbd className="px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200 mr-1 shadow-xs">↑↓</kbd>
                    Navegar
                  </span>
                  <span>
                    <kbd className="px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200 mr-1 shadow-xs">↵</kbd>
                    Seleccionar
                  </span>
                  <span>
                    <kbd className="px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200 mr-1 shadow-xs">ESC</kbd>
                    Cerrar
                  </span>
                </div>

                {copiedText ? (
                  <span className="text-emerald-600 flex items-center gap-1 font-semibold">
                    <Check className="w-3 h-3" /> {copiedText}
                  </span>
                ) : (
                  <span>AVANZA Command Palette</span>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export function CommandMenuTrigger() {
  const trigger = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-avanza-command-menu"));
    }
  };

  return (
    <button
      onClick={trigger}
      className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/90 border border-slate-200 text-xs text-slate-600 hover:text-slate-900 hover:border-blue-500/50 transition-all cursor-pointer shadow-xs group"
      aria-label="Abrir buscador y comandos"
    >
      <Sparkles className="w-3.5 h-3.5 text-blue-600 group-hover:rotate-12 transition-transform" />
      <span>Buscar</span>
      <kbd className="text-[10px] bg-white text-slate-600 px-1.5 py-0.5 rounded font-mono border border-slate-200 shadow-xs">⌘K</kbd>
    </button>
  );
}
