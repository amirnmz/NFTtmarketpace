import { useQuery } from "@tanstack/react-query";
import { useActiveAccount } from "thirdweb/react";
import { useApi } from "@/hooks/useApi";

export const useGetUserNfts = (address: string) => {
  const account = useActiveAccount();
  const api = useApi();
  const queryFn = async () => {
    if (!account?.address) {
      return null;
    }
    const res = await api.get<BulkData<NFT>>(
      "/nft/wallet/" + (address ?? account?.address),
    );
    return res.data;
  };
  return useQuery({
    queryFn,
    queryKey: ["userNfts", { wallet: address ?? account?.address }],
  });
};
