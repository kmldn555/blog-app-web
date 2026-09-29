export interface Post {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  thumbnail: string;
  userId: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    nama: string;
  };
}
