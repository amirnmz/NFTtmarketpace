import {
  Box,
  Flex,
  Heading,
  Img,
  SimpleGrid,
  Spinner,
  Tab,
  TabList,
  Tabs,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { blo } from "blo";
import { shortenAddress } from "thirdweb/utils";
import type { Account } from "thirdweb/wallets";
import { ProfileMenu } from "./Menu";
import { useState } from "react";
import { NFT_CONTRACTS, type NftContract } from "@/consts/nft_contracts";
import {
  MediaRenderer,
  useActiveAccount,
  useReadContract,
} from "thirdweb/react";
import { OwnedItem } from "./OwnedItem";
import { getAllValidListings } from "thirdweb/extensions/marketplace";
import { MARKETPLACE_CONTRACTS } from "@/consts/marketplace_contract";
import { Link } from "@chakra-ui/next-js";
import { getOwnedERC1155s } from "@/extensions/getOwnedERC1155s";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useGetENSAvatar } from "@/hooks/useGetENSAvatar";
import { useGetENSName } from "@/hooks/useGetENSName";
import { useProfile } from "@/hooks/api/useProfile";
import { useGetUserNfts } from "@/hooks/api/useGetUserNfts";

type Props = {
  address: string;
};

export function ProfileSection(props: Props) {
  const { address } = props;
  const account = useActiveAccount();
  const isYou = address.toLowerCase() === account?.address.toLowerCase();
  const { data: ensName } = useGetENSName({ address });
  const { data: ensAvatar } = useGetENSAvatar({ ensName });
  const [tabIndex, setTabIndex] = useState<number>(0);

  const { data: user } = useProfile();
  const { data: nfts, isLoading } = useGetUserNfts(address);

  const columns = useBreakpointValue({ base: 1, sm: 2, md: 2, lg: 2, xl: 4 });
  return (
    <Box px={{ lg: "50px", base: "20px" }}>
      <Flex direction={{ lg: "row", md: "column", sm: "column" }} gap={5}>
        <Img
          src={ensAvatar ?? blo(address as `0x${string}`)}
          w={{ lg: 150, base: 100 }}
          rounded="8px"
        />
        <Box my="auto">
          <Heading>{user?.nickname ?? "Unnamed"}</Heading>
          <Text color="gray">{shortenAddress(address)}</Text>
        </Box>
      </Flex>

      <Flex direction={{ lg: "row", base: "column" }} gap="10" mt="20px">
        {isLoading ? (
          <Box>
            <Spinner />
          </Box>
        ) : (
          <>
            <Box>
              <Flex direction="row" justifyContent="space-between" px="12px">
                <Tabs
                  variant="soft-rounded"
                  onChange={(index) => setTabIndex(index)}
                  isLazy
                  defaultIndex={0}
                >
                  <TabList>
                    <Tab>Owned ({nfts?.result?.length})</Tab>
                    {/*<Tab>Listings ({listings.length || 0})</Tab>*/}
                    {/* <Tab>Auctions ({allAuctions?.length || 0})</Tab> */}
                  </TabList>
                </Tabs>
              </Flex>
              <SimpleGrid columns={columns} spacing={4} p={4}>
                {tabIndex === 0 ? (
                  <>
                    {nfts && nfts?.result?.length > 0 ? (
                      <>
                        {nfts?.result?.map((item) => (
                          <OwnedItem key={item.id.toString()} nft={item} />
                        ))}
                      </>
                    ) : (
                      <Box>
                        <Text>
                          {isYou
                            ? "You"
                            : ensName
                              ? ensName
                              : shortenAddress(address)}{" "}
                          {isYou ? "do" : "does"} not own any NFT in this
                          collection
                        </Text>
                      </Box>
                    )}
                  </>
                ) : (
                  <>
                    {/*{listings && listings.length > 0 ? (*/}
                    {/*  <>*/}
                    {/*    {listings?.map((item) => (*/}
                    {/*      <Box*/}
                    {/*        key={item.id}*/}
                    {/*        rounded="12px"*/}
                    {/*        as={Link}*/}
                    {/*        href={`/collection/${contract.chain.id}/${*/}
                    {/*          contract.address*/}
                    {/*        }/token/${item.asset.id.toString()}`}*/}
                    {/*        _hover={{ textDecoration: "none" }}*/}
                    {/*        w={250}*/}
                    {/*      >*/}
                    {/*        <Flex direction="column">*/}
                    {/*          <MediaRenderer*/}
                    {/*            client={client}*/}
                    {/*            src={item.asset.metadata.image}*/}
                    {/*          />*/}
                    {/*          <Text mt="12px">*/}
                    {/*            {item.asset?.metadata?.name ?? "Unknown item"}*/}
                    {/*          </Text>*/}
                    {/*          <Text>Price</Text>*/}
                    {/*          <Text>*/}
                    {/*            {toEther(item.pricePerToken)}{" "}*/}
                    {/*            {item.currencyValuePerToken.symbol}*/}
                    {/*          </Text>*/}
                    {/*        </Flex>*/}
                    {/*      </Box>*/}
                    {/*    ))}*/}
                    {/*  </>*/}
                    {/*) : (*/}
                    {/*  <Box>*/}
                    {/*    You do not have any listing with this collection*/}
                    {/*  </Box>*/}
                    {/*)}*/}
                  </>
                )}
              </SimpleGrid>
            </Box>
          </>
        )}
      </Flex>
    </Box>
  );
}
