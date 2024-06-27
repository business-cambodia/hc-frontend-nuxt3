import { ICategory } from "./category";
import { IAuthor } from "./author";

export interface IArticle {
  id: number;
  sum: any;
  title: string;
  date_created: Date;
  views: number;
  slug: string;
  user_created: IAuthor;
  category: ICategory;
  thumbnail: string;
  image: string;
  length: number;
  description: string;
  keywords: string;
  telegram_embed: string;
  thumbnail_facebook: string;
}