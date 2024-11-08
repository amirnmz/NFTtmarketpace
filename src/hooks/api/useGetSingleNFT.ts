import { useQuery } from "@tanstack/react-query";
import { useApi } from "@/hooks/useApi";

export const useGetSingleNFT = (nft_id: number) => {
  const api = useApi();
  const queryFn = async () => {
    const nft = await api.get<NFT>(`/nft/${nft_id}`);
    return nft.data;
  };
  return useQuery({
    queryFn,
    queryKey: ["nft", nft_id],
  });
};
