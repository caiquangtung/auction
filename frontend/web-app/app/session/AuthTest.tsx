"use client";
import { useState } from "react";
import { Button } from "flowbite-react"; 
import { updateAuctionTest } from "../actions/auctionActions";

export default function AuthTest() {
  // State to manage loading and result
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(undefined);

  // Function that triggers the test
  const doUpdate = async () => {
    setResult(undefined); 
    setLoading(true); 
    updateAuctionTest()
        .then(res => setResult(res))
        .catch(err => setResult(err))
        .finally(() => setLoading(false));
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Button to trigger the update test */}
      <Button onClick={doUpdate} outline isProcessing={loading}>
        Test Auth
      </Button>
      
      {/* Display result */}
      {result && (
        <div className="mt-4">
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
