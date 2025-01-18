interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  coverColor: string;
  coverUrl: string;
  videoUrl: string;
  summary: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
}
interface BookParams {
  title: string;
  author: string;
  description: string;
  genre: string;
  rating: number;
  totalCopies: number;
  coverUrl: string;
  coverColor: string;
  videoUrl: string;
  totalCopies: number;
  summary: string;
}

interface BorrowBookParams {
  bookId: string;
  userId: string;
}
