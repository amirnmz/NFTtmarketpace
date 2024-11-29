import { useState } from "react";
import { Button, Flex, Input, useToast } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useSetMinter } from "@/hooks/useSetMinter";

export const SetMinter = () => {
  const [minter, setMinter] = useState("");

  const toast = useToast();
  const { setMinter: mutate, isPending } = useSetMinter(minter);

  return (
    <Flex flexDirection={"column"} gap={5}>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        gap={2}
      >
        <label htmlFor="input"> Minter </label>
        <Input value={minter} onChange={(e) => setMinter(e.target.value)} />
        <Button
          isLoading={isPending}
          onClick={() => {
            if (!ethers.utils.isAddress(minter)) {
              toast({
                title: "Error",
                description: "Invalid address",
                status: "error",
                duration: 5000,
              });
              return;
            }
            mutate();
          }}
        >
          Set Minter
        </Button>
      </Flex>
    </Flex>
  );
};
