import type { Category } from "@/types/category";

// TODO(store): href will point to real category pages once we build the store.
export const categories: Category[] = [
    { id: "new-in-the-club", label: "New in the Club", image: "/images/categories/new-in-the-club.png", href: "#menu" },
    { id: "burger", label: "Burger", image: "/images/categories/burger.png", href: "#menu" },
    { id: "sides", label: "Sides", image: "/images/categories/sides.png", href: "#menu" },
    { id: "fries", label: "Fries", image: "/images/categories/fries.png", href: "#menu" },
    { id: "desserts-beverages", label: "Desserts & Beverages", image: "/images/categories/desserts-beverages.png", href: "#menu" },
    { id: "launch-offer", label: "Launch Offer", image: "/images/categories/launch-offer.png", href: "#menu", badge: "₦3,000" },
    { id: "wraps", label: "Wraps", image: "/images/categories/wraps.png", href: "#menu" },
    { id: "salads", label: "Salads", image: "/images/categories/salads.png", href: "#menu" },
];