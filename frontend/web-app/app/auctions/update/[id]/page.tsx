import { getDetailedViewData } from "@/app/actions/auctionActions";
import AuctionForm from "../../AuctionForm";


export default async function Update({ params }: { params: { id: string } }) {
  const data = await getDetailedViewData(params.id);

  return (
    <div className="max-w-3xl mx-auto p-10 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Update Your Auction</h1>
      <p className="text-gray-600 mb-6">Please update the details of your car.</p>
      <AuctionForm auction={data} />
    </div>
  );
}

