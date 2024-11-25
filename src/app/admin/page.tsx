"use client";
import {
  Flex,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useMediaQuery,
} from "@chakra-ui/react";

import { CheckTokens } from "@/components/admin-page/CheckTokens";
import { CheckRequests } from "@/components/admin-page/CheckRequests";
import { CheckMarketerRequests } from "@/components/admin-page/CheckMarketerRequests";
import { SetMarketerOrMinter } from "@/components/admin-page/SetMarketerOrMinter";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { SportNFTContract } from "@/consts/nft_contracts";
import { useRouter } from "next/navigation";

export default function Page() {
  const isMobile = useMediaQuery("(max-width: 526px)");
  const account = useActiveAccount();
  const { data, isPending } = useReadContract({
    contract: SportNFTContract,
    method: "function owner() view returns (address)",
    params: [],
  });
  const router = useRouter();
  if (isPending) return <Spinner />;

  if (data !== account?.address) router.push("/");

  return (
    <Flex
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Tabs margin={5} variant="soft-rounded" colorScheme="green">
        <TabList flexDirection={isMobile[0] ? "column" : "row"}>
          <Tab>Check Minter Requests</Tab>
          <Tab>Check Marketer Requests</Tab>
          <Tab>Check Token</Tab>
          <Tab>Set Marketer/Minter</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <CheckRequests />
          </TabPanel>
          <TabPanel>
            <CheckMarketerRequests />
          </TabPanel>
          <TabPanel>
            <CheckTokens />
          </TabPanel>
          <TabPanel>
            <SetMarketerOrMinter />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
