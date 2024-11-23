import { Button, Flex, Input, useToast } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useState } from "react";
import { useSetMarketer } from "@/hooks/useSetMarketer";

export const SetMarketer = () => {
  const [marketer, setMarketer] = useState("");
  const [fraction, setFraction] = useState(1);
  const toast = useToast();
  const { setMarketer: mutate, isPending } = useSetMarketer(marketer, fraction);

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      gap={2}
    >
      <label htmlFor="input"> Marketer </label>
      <Input value={marketer} onChange={(e) => setMarketer(e.target.value)} />
      <label htmlFor="input"> Royalty %</label>
      <Input
        value={fraction}
        type={"number"}
        onChange={(e) => setFraction(+e.target.value)}
      />
      <Button
        isLoading={isPending}
        onClick={() => {
          if (!ethers.utils.isAddress(marketer)) {
            toast({
              title: "Error",
              description: "Invalid address",
              status: "error",
              duration: 5000,
            });
            return;
          }
          if (fraction > 90) {
            toast({
              title: "Error",
              description: "Invalid royalty",
              status: "error",
              duration: 5000,
            });
            return;
          }
          mutate();
        }}
      >
        Set Marketer
      </Button>
    </Flex>
  );
};
