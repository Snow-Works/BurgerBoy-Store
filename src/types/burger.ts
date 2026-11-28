// An interface describes the "shape" of an object: which fields it has
// and what type each field is. TypeScript warns us if we get it wrong.
export interface Burger {
  id: string;
  name: string;
  caption: string; // small line under the hero burger
  price: number; // in naira
  image: string; // big hero cut-out
  thumbnail: string; // small rounded photo
  accent: string; // glow color for this slide
}