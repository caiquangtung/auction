"use client";

import { placeBidForAuction } from "@/app/actions/auctionActions";
import { useBidStore } from "@/hooks/useBidStore";
import { numberWithCommas } from "@/lib/numberWithComas";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
  auctionId: string;
  highBid: number;
};

export default function BidForm({ auctionId, highBid }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const addBid = useBidStore((state) => state.addBid);

  function onSubmit(data: FieldValues) {
    if (data.amount <= highBid) {
      reset();
      return toast.error(
        "Bid must be at least $" + numberWithCommas(highBid + 1)
      );
    }

    placeBidForAuction(auctionId, +data.amount)
      .then((bid) => {
        if (bid.error) throw bid.error;
        addBid(bid);
        reset();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center border-2 border-gray-300 rounded-lg py-2 px-4 bg-white shadow-sm"
    >
      <input
        type="number"
        {...register("amount")}
        className="w-full px-3 py-2 text-sm text-gray-700 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={`Enter your bid (minimum bid is $${numberWithCommas(
          highBid + 1
        )})`}
      />
      <button
        type="submit"
        className="ml-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
}
