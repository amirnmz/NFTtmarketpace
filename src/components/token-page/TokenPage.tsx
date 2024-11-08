import { client } from "@/consts/client";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { getNFT as getERC721 } from "thirdweb/extensions/erc721";
import {
  MediaRenderer,
  useActiveAccount,
  useReadContract,
} from "thirdweb/react";
import { shortenAddress } from "thirdweb/utils";
import { useMarketplaceContext } from "@/hooks/useMarketplaceContext";
import dynamic from "next/dynamic";
import { NftDetails } from "./NftDetails";
import { CreateListing } from "@/components/token-page/CreateListing";
import { AddressZero } from "@ethersproject/constants";
import { useInterval } from "@chakra-ui/icons";
import { useGetSingleNFT } from "@/hooks/api/useGetSingleNFT";

const CancelListingButton = dynamic(() => import("./CancelListingButton"), {
  ssr: false,
});
const BuyFromListingButton = dynamic(() => import("./BuyFromListingButton"), {
  ssr: false,
});

type Props = {
  tokenId: bigint;
};

export function Token(props: Props) {
  const { nftContract, contractMetadata, marketplaceContract } =
    useMarketplaceContext();

  const { data: apiNft } = useGetSingleNFT(+props.tokenId.toString());

  const { tokenId } = props;
  const account = useActiveAccount();

  const { data: nft, refetch: refetchNFT } = useReadContract(getERC721, {
    tokenId: tokenId,
    contract: nftContract,
    includeOwner: true,
  });

  const { data: listings, refetch: refetchListings } = useReadContract({
    queryOptions: {
      refetchInterval: 10000,
    },
    contract: marketplaceContract,
    method:
      "function listings(uint256) view returns (address seller, uint256 price)",
    params: [tokenId],
  });

  async function refetch() {
    refetchNFT().catch((e) => {
      console.log(e);
    });
    refetchListings().catch((e) => {
      console.log(e);
    });
  }
  useInterval(refetch, 10000);

  const listedByYou =
    listings?.[0].toLowerCase() === account?.address.toLowerCase();

  const ownedByYou =
    nft?.owner?.toLowerCase() === account?.address.toLowerCase();

  return (
    <Flex direction="column">
      <Box mt="24px" mx="auto">
        <Flex
          direction={{ lg: "row", base: "column" }}
          justifyContent={{ lg: "center", base: "space-between" }}
          gap={{ lg: 20, base: 5 }}
        >
          <Flex direction="column" w={{ lg: "45vw", base: "90vw" }} gap="5">
            <MediaRenderer
              client={client}
              src={nft?.metadata.image}
              style={{ width: "max-content", height: "auto", aspectRatio: "1" }}
            />
            <Accordion allowMultiple defaultIndex={[0, 1, 2]}>
              {nft?.metadata.description && (
                <AccordionItem>
                  <Text>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        Description
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </Text>
                  <AccordionPanel pb={4}>
                    <Text>{nft.metadata.description}</Text>
                  </AccordionPanel>
                </AccordionItem>
              )}

              {/*{nft?.metadata?.attributes &&*/}
              {/*  // @ts-ignore TODO FIx later*/}
              {/*  nft?.metadata?.attributes.length > 0 && (*/}
              {/*    <NftAttributes attributes={nft.metadata.attributes} />*/}
              {/*  )}*/}

              {nft && <NftDetails nft={nft} />}
            </Accordion>
          </Flex>
          <Box w={{ lg: "45vw", base: "90vw" }}>
            <Text>Collection</Text>
            <Flex direction="row" gap="3">
              <Heading>{contractMetadata?.name}</Heading>
              <Link
                color="gray"
                href={`/collection/${nftContract.chain.id}/${nftContract.address}`}
              >
                <FaExternalLinkAlt size={20} />
              </Link>
            </Flex>
            <br />
            <Text># {nft?.id.toString()}</Text>
            <Heading>{nft?.metadata.name}</Heading>
            <br />

            <>
              <Text>Current owner</Text>
              <Flex direction="row">
                <Heading>
                  {apiNft?.owner_wallet
                    ? shortenAddress(apiNft?.owner_wallet)
                    : "N/A"}{" "}
                </Heading>
                {apiNft?.owner_wallet === account?.address && (
                  <Text color="gray">(You)</Text>
                )}
              </Flex>
              {account && nft && ownedByYou && (
                <CreateListing
                  refetch={refetch}
                  tokenId={nft?.id}
                  account={account}
                />
              )}
            </>

            <Accordion
              mt="30px"
              sx={{ container: {} }}
              defaultIndex={[0, 1]}
              allowMultiple
            >
              <AccordionItem>
                <Text>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Listings
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </Text>
                <AccordionPanel pb={4}>
                  {listings?.[0].toLowerCase() !== AddressZero.toLowerCase() &&
                    (!listedByYou ? (
                      <BuyFromListingButton
                        refetch={refetch}
                        tokenId={tokenId}
                      />
                    ) : (
                      <CancelListingButton
                        refetch={refetch}
                        listingId={tokenId}
                      />
                    ))}
                </AccordionPanel>
              </AccordionItem>

              {/*<RelatedListings excludedListingId={listings[0]?.id ?? -1n} />*/}
            </Accordion>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

function getExpiration(endTimeInSeconds: bigint) {
  // Get the current date and time
  const currentDate = new Date();

  // Convert seconds to milliseconds (bigint)
  const milliseconds: bigint = endTimeInSeconds * 1000n;

  // Calculate the future date by adding milliseconds to the current date
  const futureDate = new Date(currentDate.getTime() + Number(milliseconds));

  // Format the future date
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    timeZoneName: "short",
  };
  const formattedDate = futureDate.toLocaleDateString("en-US", options);
  return formattedDate;
}
