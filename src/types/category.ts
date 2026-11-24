export interface Category {
    id: string;
    label: string;
    image: string;
    href: string;
    badge?: string; // the "?" mean optional, some card have batch.
}