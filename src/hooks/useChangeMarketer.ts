import { useMutation, useQuery } from "@tanstack/react-query";
import { useSendTransaction } from "thirdweb/react";
import { useToast } from "@chakra-ui/react";
import { prepareContractCall } from "thirdweb";
import { SportNFTContract } from "@/consts/nft_contracts";

export const useChangeMarketer = (
  tokenId: number | null,
  newMarketer: string,
) => {
  const { mutateAsync: sendTransaction, isPending } = useSendTransaction();
  const toast = useToast();
  const changeMarketer = () => {
    if (!tokenId) return;
    const transaction = prepareContractCall({
      contract: SportNFTContract,
      method: "function changeMarketer(address marketer, uint256 tokenId)",
      params: [newMarketer, BigInt(tokenId?.toString())],
    });
    sendTransaction(transaction)
      .then((result) => {
        toast({
          title: "Marketer changed successfully",
          status: "success",
          isClosable: true,
          duration: 5000,
        });
      })
      .catch((err) => {
        toast({
          title: err?.message || "Error",
          status: "error",
          isClosable: true,
          duration: 5000,
        });
      });
  };
  return { changeMarketer, isChangeMarketerPending: isPending };
};
