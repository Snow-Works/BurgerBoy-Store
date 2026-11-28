import type { Burger } from "@/types/burger";


// `: Burger[]` means "an array where every item must match the Burger shape".
export const burgers: Burger[] = [
  {
    id: "classic-cheese",
    name: "Classic Cheese",
    caption: "Fully Loaded",
    price: 4500,
    image: "/images/burgers/burger-1.png",
    thumbnail: "/images/burgers/thumb-1.png",
    accent: "#F5B400",
  },
  {
    id: "double-smash",
    name: "Double Smash",
    caption: "Double the Smash",
    price: 6500,
    image: "/images/burgers/burger-2.png",
    thumbnail: "/images/burgers/thumb-2.png",
    accent: "#E0472F",
  },
  {
    id: "crispy-chicken",
    name: "Crispy Chicken",
    caption: "Crunch in Every Bite",
    price: 5000,
    image: "/images/burgers/Gemini_Generated_Image_grgs8tgrgs8tgrgs.png",
    thumbnail: "/images/burgers/thumb-3.png",
    accent: "#F28A1B",
  },
  {
    id: "smoky-bbq",
    name: "Smoky BBQ",
    caption: "Smoky and Stacked",
    price: 5500,
    image: "/images/burgers/burgerr-4.webp",
    thumbnail: "/images/burgers/thumb-4.png",
    accent: "#7BC043",
  },
];