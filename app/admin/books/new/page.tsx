import BookForm from "@/components/admin/forms/BookForm";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <Button asChild className="back-btn">
        <Link href="/admin/books">
          <ArrowLeftIcon className="h-4 w-4" />
          Go Back
        </Link>
      </Button>
      <section className="w-full max-w-2xl">
        <BookForm />
      </section>
    </>
  );
};

export default page;
