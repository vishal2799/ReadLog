import { getAllBooks } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import React, { createContext, useContext } from "react";

interface Book {
  $id: string;
  title: string;
  status: string; // "reading", "to-read", "finished"
}

interface BooksContextType {
  books: Book[] | null;
  loading: boolean;
  refetch: () => void;
}

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export const BooksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: books, loading, refetch } = useAppwrite(getAllBooks);

  return (
    <BooksContext.Provider value={{ books, loading, refetch }}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error("useBooks must be used within a BooksProvider");
  }
  return context;
};
