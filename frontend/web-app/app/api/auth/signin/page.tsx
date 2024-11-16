"use client";
import EmptyFilter from '@/app/components/EmptyFilter';
import React from 'react';
import { useSearchParams } from 'next/navigation';

export default function SignIn() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') as string | undefined;

  return (
    <EmptyFilter
      title="You need to be logged in to do that"
      subtitle="Please click below to log in."
      showLogin
      callbackUrl={callbackUrl}
    />
  );
}
