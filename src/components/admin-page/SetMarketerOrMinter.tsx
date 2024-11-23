import { Divider, Flex } from "@chakra-ui/react";
import { SetMinter } from "@/components/admin-page/SetMinter";
import { SetMarketer } from "@/components/admin-page/SetMarketer";

export const SetMarketerOrMinter = () => {
  return (
    <Flex flexDirection={"column"} gap={5}>
      <SetMarketer />
      <Divider />
      <SetMinter />
    </Flex>
  );
};
