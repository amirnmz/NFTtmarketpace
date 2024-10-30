import { polygon } from "@/consts/chains";
import { client } from "@/consts/client";
import { ConnectButton, ConnectButtonProps } from "thirdweb/react";
import React from "react";
import { useColorMode } from "@chakra-ui/react";
import { createWallet } from "thirdweb/wallets";
const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
  createWallet("com.trustwallet.app"),
  createWallet("com.binance"),
  createWallet("org.uniswap"),
  createWallet("com.okex.wallet"),
  createWallet("com.bitget.web3"),
];
export const ConnectBtn = (props: Partial<ConnectButtonProps>) => {
  const { colorMode } = useColorMode();

  return (
    <ConnectButton
      {...props}
      wallets={wallets}
      appMetadata={{
        name: "Sport NFT",
        description: "Sport NFT Collection",
        url: "https://sportnft.io",
      }}
      chain={polygon}
      supportedNFTs={{
        [polygon.id]: [process.env.NEXT_PUBLIC_SPORT_NFT_CONTRACT as "0x"],
      }}
      theme={colorMode}
      client={client}
    />
  );
};
