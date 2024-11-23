import { getDetailedViewData } from "@/app/actions/auctionActions";
import React from "react";
import CountdownTimer from "../../CountdownTimer";
import { DetailedSpecs } from "./DetailedSpecs";
import { getCurrentUser } from "@/app/actions/authActions";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

export default async function Details({ params }: { params: { id: string } }) {
  const data = await getDetailedViewData(params.id);
  const user = await getCurrentUser();
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">{`${data.make} ${data.model}`}</h1>
        <div className="flex gap-3">
          {user?.username === data.seller && (
            <>
              <EditButton id={data.id} />
              <DeleteButton id={data.id} />
            </>
          )}
          <div className="flex justify-center items-center">
            <h3 className="text-xl font-semibold">Time Remaining:</h3>
            <CountdownTimer auctionEnd={data.auctionEnd} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-3">
        {/* Image Section */}
        <div className="w-full bg-gray-200 rounded-lg overflow-hidden">
          <img
            src={data.imageUrl}
            alt="Car Image"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Bids Section */}
        <div className="w-full bg-gray-200 rounded-lg p-4">
          <h3 className="text-xl font-semibold">Bids</h3>
          {/* Add bidding functionality here later */}
        </div>
      </div>

      <div className="mt-6">
        <DetailedSpecs auction={data} />
      </div>
    </div>
  );
}
