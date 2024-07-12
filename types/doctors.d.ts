import { IDoctorsCategories } from './doctors_categories.d.ts';

export interface IDoctors {
    id?: string; // optional id
    name: string;
    slug: string;
    sort: number;
    description: string;
    phone: string;
    image: string;
    image1: string;
    category: IDoctorsCategories;
  }