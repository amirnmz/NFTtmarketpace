import { create } from "zustand";
import { Pagination } from "@/hooks/stores/pagination/pagination";

const useMarketPagination = create<PaginationTypeFront>(Pagination);

export default useMarketPagination;
