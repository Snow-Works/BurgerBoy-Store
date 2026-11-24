//An interface describes the "shape" of an object
// and what type each field is. TypeScript warns
export interface Burger {
    id: string;
    name: string;
    caption: string; //small line under the hero
    price: number; // in naira
    image: string; // big hero-cut-out
    thumbnail: string; //small rounded photo
    accent: string; //glow color for the slide
}