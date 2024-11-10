// types/index.ts

// Định nghĩa kiểu `PagedResult` cho dữ liệu có phân trang, với kiểu dữ liệu tổng quát `T`
export type PagedResult<T> = {
    results: T[];
    pageCount: number;
    totalCount: number;
  };
  
  // Định nghĩa kiểu `Auction`
  export type Auction = {
    reservePrice: number
    seller: string
    winner?: string
    soldAmount: number
    currentHighBid: number
    creatAt: string
    updateAt: string
    auctionEnd: string
    status: string
    make: string
    model: string
    year: number
    color: string
    mileage: number
    imageUrl: string
    id: string
  };
  