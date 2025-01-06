"use client";
import React, { useEffect, useState } from "react";
import AuctionCard from "./AuctionCard";
import AddPagination from "../components/AddPagination";
import { getData } from "../actions/auctionActions";
import { useParamsStore } from "@/hooks/useParamsStore";
import { useShallow } from "zustand/shallow";
import qs from "query-string";
import Filters from "./Filters";
import { ImSpinner } from "react-icons/im";
import { useAuctionStore } from "@/hooks/useAuctionStore";
import EmptyFilter from "../components/EmptyFilter";


export default function Listings() {
  const [loading, setLoading] = useState(true);
  const params = useParamsStore(
    useShallow((state) => ({
      pageNumber: state.pageNumber,
      pageSize: state.pageSize,
      searchTerm: state.searchTerm,
      orderBy: state.orderBy,
      filterBy: state.filterBy,
      seller: state.seller,
      winner: state.winner,
    }))
  );
  const data = useAuctionStore(
    useShallow((state) => ({
      auctions: state.auctions,
      totalCount: state.totalCount,
      pageCount: state.pageCount,
    }))
  );
  const setData = useAuctionStore((state) => state.setData);
  const setParams = useParamsStore((state) => state.setParams);
  const url = qs.stringifyUrl({ url: "", query: params });

  function setPageNumber(pageNumber: number) {
    setParams({ pageNumber });
    setLoading(true);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getData(url);
        setData(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [url, setData]);

  if (loading) {
    return (
      <div className="h-[calc(100vh-220px)] flex items-center justify-center">
        <div className="flex flex-col justify-center items-center">
          <ImSpinner className="animate-spin text-4xl text-gray-500 mb-2" />
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!data || data.totalCount === 0) {
    return (
        <EmptyFilter
          title="No auctions found"
          subtitle="Try adjusting your search filters or resetting them."
          showReset={true}
        />
    );
  }

  return (
    <>
      <Filters />
      <div className="grid grid-cols-4 gap-6">
        {data.auctions.map((auction) => (
          <AuctionCard auction={auction} key={auction.id} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <AddPagination
          pageChanged={setPageNumber}
          currentPage={params.pageNumber}
          pageCount={data.pageCount}
        />
      </div>
    </>
  );
}
