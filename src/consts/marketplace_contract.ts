import type { Chain } from "thirdweb";
import { polygon } from "./chains";

type MarketplaceContract = {
  address: string;
  chain: Chain;
};

/**
 * You need a marketplace contract on each of the chain you want to support
 * Only list one marketplace contract address for each chain
 */
export const MARKETPLACE_CONTRACTS: MarketplaceContract[] = [
  {
    address: process.env.NEXT_PUBLIC_SPORT_NFT_MARKET_CONTRACT as string,
    chain: polygon,
  },
];
