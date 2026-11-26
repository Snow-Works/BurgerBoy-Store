import { siteConfig } from "@/data/siteConfig";

// 4500 -> "₦4,500"
export function formatPrice(amount: number): string {
  // Passing an explicit locale ("en-NG") makes the server and the browser
  // produce the exact same text, which avoids React "hydration" mismatches.
  return `${siteConfig.currency}${amount.toLocaleString("en-NG")}`;
}