import type { Chain } from "thirdweb";
import { polygonAmoy } from "./chains";

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
    address: "0xf55A21Abd589bAA43cd9E13Af2a3cB5B5bF518f0",
    chain: polygonAmoy,
  },
 
];
