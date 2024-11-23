"use client";
import {
  Flex,
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

export default function Page() {
  const isMobile = useMediaQuery("(max-width: 526px)");
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
