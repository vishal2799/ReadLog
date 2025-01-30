import React, { createContext, useContext, useEffect, useState } from "react";
import { getAllBooks, getAllLogs } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { useGlobalContext } from "./GlobalProvider";

interface Log {
  pages_read: number;
  body: string;
}

interface Book {
  $id: string;
  title: string;
  status: string; // "reading", "to-read", "finished"
  genre: string;
  total_pages: number;
  progressPercentage?: string; // Dynamically added progress
  logs?: Log[]; // Logs associated with the book
}

interface BooksContextType {
  books: Book[] | null;
  loading: boolean;
  refetch: () => void;
}

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export const BooksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useGlobalContext();

  const { data: books, loading: booksLoading, refetch: refetchBooks } = useAppwrite(
    () => (user ? getAllBooks(user?.$id) : Promise.resolve([]))
  );
  const [booksWithDetails, setBooksWithDetails] = useState<Book[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooksAndLogs = async () => {
      if (!books || books?.length === 0) {
        setBooksWithDetails([]); // Prevent crashing if books are empty
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        const allBooksWithLogs = await Promise.all(
          books.map(async (book: any) => {
            const logs = await getAllLogs(book?.$id);
            const cumulativeProgress = logs.reduce((sum, log) => sum + log?.pages_read, 0);

            const progressPercentage = Math.min(
              (cumulativeProgress / book?.total_pages) * 100,
              100
            ).toFixed(2);

            return {
              ...book,
              progressPercentage,
              logs,
            };
          })
        );

        setBooksWithDetails(allBooksWithLogs);
      } catch (error) {
        console.error("Error fetching books or logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooksAndLogs();
  }, [books]);

  const refetch = () => {
    refetchBooks();
  };

  return (
    <BooksContext.Provider value={{ books: booksWithDetails, loading, refetch }}>
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
