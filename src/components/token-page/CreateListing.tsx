import { NATIVE_TOKEN_ICON_MAP, Token } from "@/consts/supported_tokens";
import { useMarketplaceContext } from "@/hooks/useMarketplaceContext";
import { CheckIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Image,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import {
  NATIVE_TOKEN_ADDRESS,
  prepareContractCall,
  sendAndConfirmTransaction,
} from "thirdweb";

import {
  isApprovedForAll as isApprovedForAll721,
  setApprovalForAll as setApprovalForAll721,
} from "thirdweb/extensions/erc721";
import { createListing } from "thirdweb/extensions/marketplace";
import {
  useActiveWalletChain,
  useSendTransaction,
  useSwitchActiveWalletChain,
} from "thirdweb/react";
import type { Account } from "thirdweb/wallets";
import { ethers } from "ethers";

type Props = {
  tokenId: bigint;
  refetch: () => void;
  account: Account;
};

export function CreateListing(props: Props) {
  const priceRef = useRef<HTMLInputElement>(null);

  const { tokenId, account, refetch } = props;
  const switchChain = useSwitchActiveWalletChain();
  const activeChain = useActiveWalletChain();
  const [currency, setCurrency] = useState<Token>();
  const toast = useToast();

  const {
    nftContract,
    marketplaceContract,
    refetchAllListings,
    supportedTokens,
  } = useMarketplaceContext();
  const chain = marketplaceContract.chain;

  const nativeToken: Token = {
    tokenAddress: NATIVE_TOKEN_ADDRESS,
    symbol: chain.nativeCurrency?.symbol || "NATIVE TOKEN",
    icon: NATIVE_TOKEN_ICON_MAP[chain.id] || "",
  };

  const { mutateAsync: sendTransaction, isPending } = useSendTransaction();

  const createListing = (value: string) => {
    const transaction = prepareContractCall({
      contract: marketplaceContract,
      method: "function listNFT(uint256 tokenId, uint256 price)",
      params: [tokenId, BigInt(ethers.utils.parseEther(value)?.toString())],
    });
    sendTransaction(transaction)
      .then(() => {
        refetchAllListings();
        refetch();
        toast({
          title: "Listing created successfully",
          status: "success",
          isClosable: true,
          duration: 5000,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const options: Token[] = [nativeToken].concat(supportedTokens);
  const [isApproving, setIsApproving] = useState(false);
  return (
    <>
      <br />
      <Flex direction="column" w={{ base: "90vw", lg: "430px" }} gap="10px">
        <>
          <Text>Price</Text>
          <Input
            type="number"
            ref={priceRef}
            placeholder="Enter a price for your listing"
          />
        </>
        <Menu>
          <MenuButton minH="48px" as={Button} rightIcon={<ChevronDownIcon />}>
            {currency ? (
              <Flex direction="row">
                <Image
                  boxSize="2rem"
                  borderRadius="full"
                  src={currency.icon}
                  mr="12px"
                />
                <Text my="auto">{currency.symbol}</Text>
              </Flex>
            ) : (
              "Select currency"
            )}
          </MenuButton>
          <MenuList>
            {options.map((token) => (
              <MenuItem
                minH="48px"
                key={token.tokenAddress}
                onClick={() => setCurrency(token)}
                display={"flex"}
                flexDir={"row"}
              >
                <Image
                  boxSize="2rem"
                  borderRadius="full"
                  src={token.icon}
                  ml="2px"
                  mr="14px"
                />
                <Text my="auto">{token.symbol}</Text>
                {token.tokenAddress.toLowerCase() ===
                  currency?.tokenAddress.toLowerCase() && (
                  <CheckIcon ml="auto" />
                )}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <Button
          isDisabled={!currency}
          isLoading={isPending || isApproving}
          onClick={async () => {
            setIsApproving(true);
            const value = priceRef.current?.value;
            if (!value) {
              return toast({
                title: "Please enter a price for this listing",
                status: "error",
                isClosable: true,
                duration: 5000,
              });
            }
            if (!currency) {
              return toast({
                title: `Please select a currency for the listing`,
                status: "error",
                isClosable: true,
                duration: 5000,
              });
            }
            if (activeChain?.id !== nftContract.chain.id) {
              await switchChain(nftContract.chain);
            }

            // Check for approval
            const checkApprove = isApprovedForAll721;

            const isApproved = await checkApprove({
              contract: nftContract,
              owner: account.address,
              operator: marketplaceContract.address,
            });

            if (!isApproved) {
              const setApproval = setApprovalForAll721;

              const approveTx = setApproval({
                contract: nftContract,
                operator: marketplaceContract.address,
                approved: true,
              });

              await sendAndConfirmTransaction({
                transaction: approveTx,
                account,
              });
            }
            setIsApproving(false);

            createListing(value);
          }}
        >
          List
        </Button>
      </Flex>
    </>
  );
}
