import { useQuery } from "@tanstack/react-query";
import { useApi } from "@/hooks/useApi";
import useMarketPagination from "@/hooks/stores/useMarketPagination";
import { useSearchMarketplace } from "../stores/useSearchMarketplace";

export const useGetAllListings = () => {
  const api = useApi();
  const search = useSearchMarketplace((state) => state.search);
  const activePage = useMarketPagination((state) => state.activePage);
  const queryFn = async () => {
    const res = await api.get<BulkData<NFT>>("market", {
      params: {
        page: activePage - 1,
        take: 20,
        filter: {
          searchFiled: search,
        },
      },
    });
    return res.data;
  };
  return useQuery({
    queryFn,
    queryKey: ["Listings", activePage, search],
    refetchInterval: 20_000,
  });
};
