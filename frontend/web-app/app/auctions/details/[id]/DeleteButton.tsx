"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Button } from "flowbite-react";
import { deleteAuction } from "@/app/actions/auctionActions";
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
    } catch (error: any) {
      toast.error(`${error.status} ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

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
