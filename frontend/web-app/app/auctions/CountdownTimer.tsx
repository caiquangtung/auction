'use client'
import React from 'react';
import Countdown, { zeroPad } from 'react-countdown';

type Props = {
  auctionEnd: string;
};

const renderer = ({ days, hours, minutes, seconds, completed }: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}) => {
  if (completed) {
  return(
    <div className={`border-2 border-white text-white p-2 rounded-lg flex justify-center bg-red-700`}>
      <span>Auction Finished</span>
    </div>
    ) ;
  }

  const bgColor = days === 0 && hours < 10 ? 'bg-amber-600' : 'bg-green-600';

  return (
    <div className={`border-2 border-white text-white p-2 rounded-lg flex justify-center ${bgColor}`}>
      <span suppressHydrationWarning>
        {zeroPad(days)}d : {zeroPad(hours)}h : {zeroPad(minutes)}m : {zeroPad(seconds)}s
      </span>
    </div>
  );
};

export default function CountdownTimer({ auctionEnd }: Props) {
  return (
    <Countdown
      date={new Date(auctionEnd)}
      renderer={renderer}
    />
  );
}
