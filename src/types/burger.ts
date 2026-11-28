//An interface describes the "shape" of an object
// and what type each field is. TypeScript warns
import type { Burger } from "@/types/burger";

export const burgers: Burger[] = [
    {
        id: "classic-cheese",
        name: "Classic Cheese",
        caption: "Fully Loaded",
        image: "/images/burgers/burger-1.png",
        thumbnail: "/images/burgers/thumb-1.png",
        accent: "#F5B400",

    },

    {
        id: "double-smash",
        name: "Double Smash",
        caption: "Double the smash",
        price: 6500,
        image: "/images/burgers/burger-2.png",
        thumbnail: "/images/burgers/thumb-2.png",
        accent: "#E0472F",

    },

    {
        id: "crispy chicken",
        name: "Crispy Chicken",
        caption: "Crunch in every bite",
        price: 5000,
        image: "/images/burgers/burger-3.png",
        thumbnail: '/images/burgers/thumb-3.png',
        accent: "#F28A1B",
    },

    {
        id: "smoky-bbq",
        name: "Smoky BBQ",
        caption: "Smoky and Stacked",
        price: 5500,
        image: "/images/burgers/burger-4.webp",
        thumbnail: "/images/burgers/thumb-4.png",
        accent: "#7BC043",
    },



];