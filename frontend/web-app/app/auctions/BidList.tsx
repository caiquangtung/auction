'use client';

import { getBidsForAuction } from '@/app/actions/auctionActions';
import { useBidStore } from '@/hooks/useBidStore';
import { User } from 'next-auth';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Auction, Bid } from '../types';
import { numberWithCommas } from '@/lib/numberWithComas';
import EmptyFilter from '../components/EmptyFilter';
import BidItem from './details/[id]/BidItem';
import BidForm from './BidForm';
import Heading from '../components/Heading';

type Props = {
    user: User | null;
    auction: Auction;
}

export default function BidList({ user, auction }: Props) {
    const [loading, setLoading] = useState(true);
    const bids = useBidStore(state => state.bids);
    const setBids = useBidStore(state => state.setBids);
    const open = useBidStore(state => state.open);
    const setOpen = useBidStore(state => state.setOpen);
    const openForBids = new Date(auction.auctionEnd) > new Date();

    const highBid = bids.reduce(
        (prev, current) => (prev > current.amount ? prev : current.bidStatus.includes('Accepted') ? current.amount : prev),
        0
    );

    useEffect(() => {
    getBidsForAuction(auction.id)
        .then((res: Bid[] | { error: string }) => {
        if ('error' in res) {
            throw new Error(res.error);
        }
        setBids(res as Bid[]);
        })
        .catch(err => {
        toast.error(err.message);
        })
        .finally(() => setLoading(false));
    }, [auction.id, setBids]);

    useEffect(() => {
        setOpen(openForBids);
    }, [openForBids, setOpen]);

    if (loading) return <span>Loading bids...</span>;

    return (
        <div className='rounded-lg shadow-md'>
            <div className='py-2 px-4 bg-white'>
                <div className='sticky top-0 bg-white p-2'>
                    <Heading title={`Current high bid is $${numberWithCommas(highBid)}`} />
                </div>
            </div>

            <div className='overflow-auto h-[400px] flex flex-col px-2'>
                {bids.length === 0 ? (
                    <EmptyFilter
                        title='No bids for this item'
                        subtitle='Please feel free to make a bid'
                    />
                ) : (
                    <>
                        {bids.map(bid => (
                            <BidItem key={bid.id} bid={bid} />
                        ))}
                    </>
                )}
            </div>

            <div className='px-2 pb-2 text-gray-500'>
                {!open ? (
                    <div className='flex items-center justify-center p-2 text-lg font-semibold'>
                        This auction has finished
                    </div>
                ) : !user ? (
                    <div className='flex items-center justify-center p-2 text-lg font-semibold'>
                        Please login to make a bid
                    </div>
                ) : user && user.username === auction.seller ? (
                    <div className='flex items-center justify-center p-2 text-lg font-semibold'>
                        You cannot bid on your own auction
                    </div>
                ) : (
                    <BidForm auctionId={auction.id} highBid={highBid} />
                )}
            </div>
        </div>
    );
}
