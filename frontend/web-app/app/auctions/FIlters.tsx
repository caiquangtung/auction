import { useParamsStore } from "@/hooks/useParamsStore";
import { Button, ButtonGroup } from "flowbite-react";
import React from "react";
import { AiOutlineClockCircle, AiOutlineSortAscending } from "react-icons/ai";
import { BsFillStopCircleFill, BsStopwatchFill } from "react-icons/bs";
import { GiFlame } from "react-icons/gi";
import { MdOutlineHourglassTop } from "react-icons/md";

const pageSizeButtons = [4, 8, 12];
const orderButtons = [
  {
    label: "Alphabetical",
    icon: AiOutlineSortAscending,
    value: "make",
  },
  {
    label: "Ending Soon",
    icon: AiOutlineClockCircle,
    value: "endingSoon",
  },
  {
    label: "Recently Added",
    icon: BsFillStopCircleFill,
    value: "new",
  },
];
const filterButtons = [
  {
    label: "Live Auctions",
    icon: GiFlame,
    value: "live",
  },
  {
    label: "Ending Soon (<6 hrs)",
    icon: MdOutlineHourglassTop,
    value: "endingSoon",
  },
  {
    label: "Completed",
    icon: BsStopwatchFill,
    value: "finished",
  },
];

export default function Filters() {
  const pageSize = useParamsStore((state) => state.pageSize);
  const setParams = useParamsStore((state) => state.setParams);
  const orderBy = useParamsStore((state) => state.orderBy);
  const filterBy = useParamsStore((state) => state.filterBy);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
      <div className="flex items-center gap-2">
        <span className="uppercase text-sm text-gray-500">Filter by:</span>
        <ButtonGroup>
          {filterButtons.map(({ label, icon: Icon, value }) => (
            <Button
              key={value}
              onClick={() => setParams({ filterBy: value })}
              color={filterBy === value ? "red" : "gray"}
            >
              <Icon className="mr-3 h-4 w-4" />
              {label}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <div className="flex items-center gap-2">
        <span className="uppercase text-sm text-gray-500">Order by:</span>
        <ButtonGroup className="flex">
          {orderButtons.map(({ label, icon: Icon, value }) => (
            <Button
              key={value}
              onClick={() => setParams({ orderBy: value })}
              color={orderBy === value ? "red" : "gray"}
              className="flex items-center gap-2 focus:ring-0"
            >
              <Icon className="mr-3 h-4 w-4" />
              {label}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      <div className="flex items-center gap-2">
        <span className="uppercase text-sm text-gray-500">Page Size:</span>
        <ButtonGroup className="flex">
          {pageSizeButtons.map((value, i) => (
            <Button
              key={i}
              onClick={() => setParams({ pageSize: value })}
              color={`${pageSize === value ? "red" : "gray"}`}
              className="focus:ring-0"
            >
              {value}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </div>
  );
}
