"use client";
import { useState } from "react";
import { Button } from "flowbite-react"; 
import { updateAuctionTest } from "../actions/auctionActions";

type ResultType = { success: boolean; message: string } | undefined;

export default function AuthTest() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultType>(undefined);

  const doUpdate = async () => {
    setResult(undefined);
    setLoading(true);
    try {
      const res = await updateAuctionTest();
      setResult(res);
    } catch (err) {
      setResult({
        success: false,
        message: `Error occurred: ${err instanceof Error ? err.message : "Unknown error"}`
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Button onClick={doUpdate} outline isProcessing={loading}>
        Test Auth
      </Button>
      {result && (
        <div className="mt-4">
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
