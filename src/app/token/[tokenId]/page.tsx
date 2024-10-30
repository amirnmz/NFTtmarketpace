"use client";

import { Token } from "@/components/token-page/TokenPage";
import MarketplaceProvider from "@/hooks/useMarketplaceContext";

export default function ListingPage({
  params,
}: {
  params: { tokenId: string };
}) {
  const { tokenId } = params;
  if (!tokenId) {
    throw new Error("Missing listingId");
  }
  return (
    <MarketplaceProvider
      contractAddress={process.env.NEXT_PUBLIC_SPORT_NFT_CONTRACT as string}
    >
      <Token tokenId={BigInt(tokenId)} />
    </MarketplaceProvider>
  );
}
