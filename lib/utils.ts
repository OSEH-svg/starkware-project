import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toQuantized(value: string, decimals: number = 18): string {
  try {
    if (!value) return "0";
    // Handle "2" -> "2.0"
    const [integer, fraction = ""] = value.split(".");
    const paddedFraction = fraction.padEnd(decimals, "0").slice(0, decimals);
    const result = BigInt(`${integer}${paddedFraction}`);
    return result.toString();
  } catch (e) {
    console.error("Quantization error:", e);
    return "0";
  }
}
