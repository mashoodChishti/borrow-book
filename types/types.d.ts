interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  genre: string;
  rating: number;
  total_copies: number;
  available_copies: number;
  color: string;
  cover: string;
  video: string;
  summary: string;
  isLoanedBook?: boolean;
}

interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
}