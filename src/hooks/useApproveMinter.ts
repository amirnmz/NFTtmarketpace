import { useSendTransaction } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { SportNFTContract } from "@/consts/nft_contracts";
import { useToast } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";

export const useApproveMinter = (_minter: string) => {
  const { mutateAsync: sendTransaction, isPending } = useSendTransaction();
  const toast = useToast();

  const handleApprove = () => {
    const transaction = prepareContractCall({
      contract: SportNFTContract,
      method: "function approveMinter(address _minter)",
      params: [_minter],
    });
    sendTransaction(transaction)
      .then(() => {
        toast({
          title: "Success",
          description: "Minter approved",
          status: "success",
          duration: 5000,
        });
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Something went wrong",
          status: "error",
          duration: 5000,
        });
      });
  };
  return {
    handleApprove,
    isPending,
  };
};
