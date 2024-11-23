"use client";

import { Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { SportNFTContract } from "@/consts/nft_contracts";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { useHandleMarketerRequest } from "@/hooks/useHandleMarketerRequest";
import { ethers } from "ethers";

export default function Page() {
  const account = useActiveAccount();
  const { data, isPending } = useReadContract({
    contract: SportNFTContract,
    method:
      "function getMarketer(address _marketer) view returns ((bool isApproved, bool isRequested, uint96 royaltyFraction))",
    params: [account?.address as string],
  });
  const {
    mutate,
    isPending: isMutating,
    data: dataRequest,
  } = useHandleMarketerRequest();

  return (
    <Flex
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
      marginTop={10}
    >
      {isPending ? (
        <Spinner />
      ) : (
        <Flex
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Flex
            justifyContent={"center"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Text fontSize={18} variant={"h1"}>
              Marketer
            </Text>
            <Text color={data?.isApproved ? "green" : "red"}>
              {data?.isApproved ? "Active" : "Not Active"}
            </Text>
            {!data?.isApproved && (
              <Button
                disabled={data?.isRequested || !!dataRequest}
                isLoading={isMutating}
                onClick={() => mutate()}
              >
                {data?.isRequested
                  ? "Your request is pending"
                  : "Become marketer"}
              </Button>
            )}
            {data?.royaltyFraction && (
              <Text>Royalty: {+data?.royaltyFraction.toString() / 100} % </Text>
            )}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}
