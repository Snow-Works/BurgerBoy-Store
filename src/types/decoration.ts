export interface Decoration {
  id: string;
  src: string;
  left: number; // % from the left edge of the section
  top: number; // % from the top edge of the section
  size: number; // width in vw (1vw = 1% of the screen width)
  drift: number; // px it moves up or down while you scroll (negative = opposite way)
}