"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { borrowBook } from "@/lib/actions/books.action";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

interface Props {
  bookId: string;
  userId: string;
  borrowEligibility: {
    isEligible: boolean;
    message: string;
  };
}

const BorrowBook = ({ bookId, userId, borrowEligibility }: Props) => {
  const { isEligible, message } = borrowEligibility;
  const router = useRouter();
  const [borrowing, setBorrowing] = useState(false);
  const handleBorrow = async () => {
    if (!isEligible) {
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      return;
    }
    setBorrowing(true);
    try {
      const response = await borrowBook({ bookId, userId });
      if (response.success) {
        toast({
          title: "Success",
          description: "Book borrowed successfully",
        });
        router.push(`/my-profile`);
      } else {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "An error occurred while borrowing the book",
        variant: "destructive",
      });
    } finally {
      setBorrowing(false);
    }
  };
  return (
    <Button
      className="book-overview_btn"
      onClick={handleBorrow}
      disabled={borrowing}
    >
      <Image src={"/icons/book.svg"} alt="book" width={20} height={20} />
      <p className="font-bebas-neue text-xl text-dark-100">
        {borrowing ? "Borrowing ..." : "Borrow Book"}
      </p>
    </Button>
  );
};

export default BorrowBook;
