"use client"
import { Auction } from "@/app/types";
import { Table } from "flowbite-react";
type Props = {
    auction: Auction
}
export function DetailedSpecs({ auction }: Props) {
  return (
    <Table striped={true}>
      <Table.Head>
        <Table.HeadCell>Attribute</Table.HeadCell>
        <Table.HeadCell>Value</Table.HeadCell>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Make</Table.Cell>
          <Table.Cell>{auction.make}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Model</Table.Cell>
          <Table.Cell>{auction.model}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Year</Table.Cell>
          <Table.Cell>{auction.year}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Mileage</Table.Cell>
          <Table.Cell>{auction.mileage} km</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
