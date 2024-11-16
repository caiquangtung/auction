import React from 'react';
import CountdownTimer from './CountdownTimer';
import CarImage from './CarImage';
import { Auction } from '../types';

type Props = {
    auction: Auction;
}

export default function AuctionCard({ auction }: Props) {
    return (
        <a href='#' className="group">
            <div className='relative w-full bg-gray-200 aspect-[16/10] rounded-lg overflow-hidden'>
                <CarImage imageURL={auction.imageUrl} />
                <div className="absolute bottom-2 left-2 bg-white bg-opacity-75 p-1 rounded text-xs">
                    <CountdownTimer auctionEnd={auction.auctionEnd} />
                </div>
            </div>
            <div className="flex justify-between items-center mt-4">
                <h3 className="text-gray-700">
                    {auction.make} {auction.model}
                </h3>
                <p className="font-semibold text-sm">
                    {auction.year}
                </p>
            </div>
        </a>
    );
}