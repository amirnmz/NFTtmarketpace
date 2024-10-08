import type { Chain } from "thirdweb";
import { polygon, polygonAmoy } from "./chains";

export type NftContract = {
  address: string;
  chain: Chain;
  type: "ERC1155" | "ERC721";

  title?: string;
  description?: string;
  thumbnailUrl?: string;
  slug?: string;
};

/**
 * Below is a list of all NFT contracts supported by your marketplace(s)
 * This is of course hard-coded for demo purpose
 *
 * In reality, the list should be dynamically fetched from your own data source
 */
export const NFT_CONTRACTS: NftContract[] = [
  {
    address: "0xf55A21Abd589bAA43cd9E13Af2a3cB5B5bF518f0",
    chain: polygon,
    title: "Mata NFT",
    thumbnailUrl:
      "https://orange-nearby-cardinal-511.mypinata.cloud/ipfs/QmVembeT2MiYFpMkvGkPzYP2EXHtrxG1xyqYUMvbHXPFZ6",
    type: "ERC721",
  },
];
