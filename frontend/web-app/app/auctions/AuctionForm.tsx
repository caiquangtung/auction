"use client";

import { FieldValues, useForm } from "react-hook-form";
import Input from "../components/Input";
import { Button } from "flowbite-react";
import { useEffect } from "react";
import DateInput from "../components/DateInput";
import { createAuction, updateAuction } from "../actions/auctionActions";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Auction } from "../types";

type Props = {
  auction?: Auction;
};

type CustomError = {
  status: number;
  message: string;
};

export default function AuctionForm({ auction }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    control,
    handleSubmit,
    setFocus,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onTouched",
  });

  useEffect(() => {
    if (auction) {
      const { make, model, color, mileage, year } = auction;
      reset({ make, model, color, mileage, year });
    }
    setFocus("make");
  }, [auction, reset, setFocus]);

  async function onSubmit(data: FieldValues) {
    try {
      let id = "";
      let res;
      if (pathname === "/auctions/create") {
        res = await createAuction(data);
        id = res.id;
      } else if (auction) {
        res = await updateAuction(auction.id, data);
        id = auction.id;
      }
      if (res.error) {
        throw res.error;
      }
      router.push(`/auctions/details/${id}`);
    } catch (error) {
      const customError = error as CustomError;
      console.log(customError);
      toast.error(`${customError.status} - ${customError.message}`);
    }
  }
  function handleCancel() {
    router.back();
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
      {/* Make */}
      <Input
        label="Make"
        name="make"
        control={control}
        rules={{ required: "Make is required" }}
      />

      {/* Model */}
      <Input
        label="Model"
        name="model"
        control={control}
        rules={{ required: "Model is required" }}
      />

      {/* Color */}
      <Input
        label="Color"
        name="color"
        control={control}
        rules={{ required: "Color is required" }}
      />

      {/* Year and Mileage */}
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Year"
          name="year"
          control={control}
          type="number"
          rules={{
            required: "Year is required",
            min: { value: 1900, message: "Year must be after 1900" },
          }}
        />
        <Input
          label="Mileage"
          name="mileage"
          control={control}
          type="number"
          rules={{
            required: "Mileage is required",
            min: { value: 0, message: "Mileage cannot be negative" },
          }}
        />
      </div>
      {pathname === "/auctions/create" && (
        <>
          {/* Image URL */}
          <Input
            label="Image URL"
            name="imageURL"
            control={control}
            rules={{
              required: "Image URL is required",
              pattern: {
                value: /^https?:\/\/.+\..+/,
                message: "Enter a valid URL",
              },
            }}
          />

          {/* Reserve Price and Auction End Date */}
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Reserve Price"
              name="reservePrice"
              control={control}
              type="number"
              rules={{
                required: "Reserve Price is required",
                min: { value: 0, message: "Enter 0 if no reserve" },
              }}
            />
            <DateInput
              label="Auction End Date"
              name="auctionEnd"
              control={control}
              type="date"
              rules={{ required: "Auction end date is required" }}
            />
          </div>
        </>
      )}

      {/* Submit Button */}
      <div className="flex justify-between">
        <Button type="button" className="bg-gray-300 hover:bg-red-500" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          isProcessing={isSubmitting}
          type="submit"
          disabled={!isValid}
          outline
          color="success"
        >
          {pathname === "/auctions/create" ? "Create Auction" : "Update Auction"}
        </Button>
      </div>
    </form>
  );
}
