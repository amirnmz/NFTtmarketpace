import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_TW_CLIENT_ID as string,
});

// connect to your contract
const contract = getContract({
  client,
  chain: defineChain(137),
  address: "0xf55A21Abd589bAA43cd9E13Af2a3cB5B5bF518f0",
});
