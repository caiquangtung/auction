"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Button } from "flowbite-react";
import { deleteAuction } from "@/app/actions/auctionActions";

type CustomError = {
  status: number;
  message: string;
};

type Props = {
  id: string;
};

export default function DeleteButton({ id }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const doDelete = async () => {
    setLoading(true);
    try {
      const res = await deleteAuction(id);
      if (res.error) {
        throw res.error;
      }
      router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else if (isCustomError(error)) {
        toast.error(`Error ${error.status}: ${error.message}`);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  function isCustomError(error: unknown): error is CustomError {
    return (
      typeof error === "object" &&
      error !== null &&
      "status" in error &&
      "message" in error
    );
  }

  return (
    <Button
      color="failure"
      onClick={doDelete}
      isProcessing={loading}
    >
      Delete Auction
    </Button>
  );
}
