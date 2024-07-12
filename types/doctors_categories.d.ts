export interface IDoctorsCategories {
    id?: string; // optional id
    name: string;
    sort: number;
    doctors: IDoctors[];
  }