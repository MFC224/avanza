/**
 * Configuración de Rendimiento Gráfico & Optimización de Recursos: AVANZA
 * Estándar: Fluidez a 90Hz–120Hz (ProMotion) & Pipeline WebP/AVIF (1080p/2K)
 */

export interface ImagePreset {
  maxWidth: number;
  maxHeight: number;
  quality: number;
  format: "webp" | "avif";
  sizes: string;
}

export const PERFORMANCE_CONFIG = {
  targetFps: 120,
  highRefreshMinFps: 90,
  maxFrameBudgetMs: 8.33, // 1000ms / 120fps ~= 8.33ms
  standardFrameBudgetMs: 16.67, // 1000ms / 60fps
  imagePresets: {
    card: {
      maxWidth: 800,
      maxHeight: 450,
      quality: 80,
      format: "webp" as const,
      sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    },
    hero: {
      maxWidth: 1920,
      maxHeight: 1080,
      quality: 85,
      format: "webp" as const,
      sizes: "100vw",
    },
    logo: {
      maxWidth: 240,
      maxHeight: 80,
      quality: 90,
      format: "webp" as const,
      sizes: "(max-width: 640px) 120px, 160px",
    },
    avatar: {
      maxWidth: 96,
      maxHeight: 96,
      quality: 85,
      format: "webp" as const,
      sizes: "48px",
    },
  },
} as const;

/**
 * Retorna las propiedades optimizadas de renderizado para next/image
 */
export function getOptimizedImageProps(
  presetKey: keyof typeof PERFORMANCE_CONFIG.imagePresets,
  customAlt: string
) {
  const preset = PERFORMANCE_CONFIG.imagePresets[presetKey];
  return {
    width: preset.maxWidth,
    height: preset.maxHeight,
    quality: preset.quality,
    sizes: preset.sizes,
    alt: customAlt,
  };
}

/**
 * Provee estilos de aceleración de hardware para GPU, eliminando repaints innecesarios
 */
export function getHardwareAccelerationStyle() {
  return {
    transform: "translateZ(0)",
    backfaceVisibility: "hidden" as const,
    WebkitFontSmoothing: "antialiased" as const,
  };
}

/**
 * Calcula el presupuesto de tiempo por fotograma (frame budget) en milisegundos
 */
export function calculateFrameBudget(fps: number): number {
  if (!fps || fps <= 0) return 16.67;
  return Number((1000 / fps).toFixed(2));
}
