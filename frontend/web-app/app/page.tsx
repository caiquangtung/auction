import React, { Suspense, lazy } from 'react';

const Listings = lazy(() => import('./auctions/Listings'));

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Listings />
    </Suspense>
  );
}