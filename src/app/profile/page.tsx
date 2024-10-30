"use client";

import { ProfileSection } from "@/components/profile-page/Profile";
import { client } from "@/consts/client";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useActiveAccount, useConnectModal } from "thirdweb/react";

export default function ProfilePage() {
  const account = useActiveAccount();
  if (!account)
    return (
      <Box>
        <Flex>
          <Heading m="auto">Log in to continue</Heading>
        </Flex>
      </Box>
    );
  return <ProfileSection address={account.address} />;
}
