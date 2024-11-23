import { Chain, getContract } from "thirdweb";
import { polygon, polygonAmoy } from "./chains";
import { client } from "@/consts/client";

export type NftContract = {
  address: string;
  chain: Chain;
  type: "ERC1155" | "ERC721";

  title?: string;
  description?: string;
  thumbnailUrl?: string;
  slug?: string;
};
const contractAddress = process.env.NEXT_PUBLIC_SPORT_NFT_CONTRACT as string;

/**
 * Below is a list of all NFT contracts supported by your marketplace(s)
 * This is of course hard-coded for demo purpose
 *
 * In reality, the list should be dynamically fetched from your own data source
 */
export const NFT_CONTRACTS: NftContract[] = [
  {
    address: contractAddress,
    chain: polygon,
    title: "Sport NFT",
    thumbnailUrl:
      // "https://orange-nearby-cardinal-511.mypinata.cloud/ipfs/QmVembeT2MiYFpMkvGkPzYP2EXHtrxG1xyqYUMvbHXPFZ6",
      "/erc721/icon.png",
    type: "ERC721",
  },
];

export const SportNFTContract = getContract({
  address: contractAddress,
  chain: polygon,
  client,
});
