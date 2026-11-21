/**
 * Permite que `node --test` importe los módulos TypeScript puros de src/ tal cual,
 * sin compilar: Node 24 quita los tipos y este hook resuelve "@/..." y las
 * importaciones sin extensión ("./catalog" → "./catalog.ts").
 * Uso: node --import ./scripts/ts-hooks.mjs --test scripts/tests/
 */
import { registerHooks } from "node:module";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const SRC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src");

registerHooks({
  resolve(specifier, context, nextResolve) {
    let target = specifier;
    if (target.startsWith("@/")) target = pathToFileURL(path.join(SRC, target.slice(2))).href;
    const isLocal = target.startsWith(".") || target.startsWith("file:");
    if (isLocal && !/\.[cm]?[jt]sx?$/.test(target) && context.parentURL) {
      const base = target.startsWith("file:")
        ? fileURLToPath(target)
        : path.resolve(path.dirname(fileURLToPath(context.parentURL)), target);
      for (const candidate of [`${base}.ts`, path.join(base, "index.ts")]) {
        if (existsSync(candidate)) return nextResolve(pathToFileURL(candidate).href, context);
      }
    }
    return nextResolve(target, context);
  },
});
