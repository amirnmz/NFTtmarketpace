import { useQuery } from "@tanstack/react-query";
import { useApi } from "@/hooks/useApi";
import useMarketPagination from "@/hooks/stores/useMarketPagination";

export const useGetAllListings = () => {
  const api = useApi();
  const activePage = useMarketPagination((state) => state.activePage);
  const queryFn = async () => {
    const res = await api.get<BulkData<NFT>>("market", {
      params: {
        page: activePage - 1,
        take: 20,
      },
    });
    return res.data;
  };
  return useQuery({
    queryFn,
    queryKey: ["Listings", activePage],
    refetchInterval: 20_000,
  });
};
