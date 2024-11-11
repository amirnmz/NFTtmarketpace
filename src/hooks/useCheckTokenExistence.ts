import { useQuery } from "@tanstack/react-query";
import { readContract } from "thirdweb";
import { SportNFTContract } from "@/consts/nft_contracts";

export const useCheckTokenExistence = (tokenId: string) => {
  async function queryFn() {
    if (tokenId === "") {
      return null;
    }
    const uri = await readContract({
      contract: SportNFTContract,
      method: "function tokenURI(uint256 tokenId) view returns (string)",
      params: [BigInt(tokenId)],
    });
    if (!uri) {
      return false;
    }
    return uri;
  }
  return useQuery({
    queryFn,
    queryKey: ["TokenExistence", tokenId],
    retry: 0,
  });
};
