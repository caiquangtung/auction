import React from 'react'
import AuctionForm from '../AuctionForm'

export default function Create() {
  return (
    <div className="m-auto max-w-3xl shadow-lg p-10 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Sell Your Car</h1>
      <p className="mb-4">Please enter the details of your car below:</p>
      <AuctionForm />
    </div>
  )
}
