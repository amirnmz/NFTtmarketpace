import { getContract } from "thirdweb";
import { client } from "@/consts/client";
import { polygon } from "@/consts/chains";
import { useReadContract } from "thirdweb/react";
import { useReadFromIPFS } from "@/hooks/useReadFromIPFS";

export const useTokenURI = (tokenId: string) => {
  const NFTContract = getContract({
    client,
    address: process.env.NEXT_PUBLIC_SPORT_NFT_CONTRACT as string,
    chain: polygon,
  });

  const { data: nft, isLoading: isLoadingNFT } = useReadContract({
    contract: NFTContract,
    method: "function tokenURI(uint256 tokenId) returns (string)",
    params: [BigInt(tokenId)],
  });
  if (nft) return useReadFromIPFS(nft);
  return { data: null, isLoading: isLoadingNFT };
};
