import { useSendTransaction } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { SportNFTContract } from "@/consts/nft_contracts";
import { useToast } from "@chakra-ui/react";

export const useApproveMarketer = (_marketer: string, fraction: number) => {
  const { mutateAsync: sendTransaction, isPending } = useSendTransaction();
  const toast = useToast();

  const handleApprove = () => {
    const transaction = prepareContractCall({
      contract: SportNFTContract,
      method: "function approveMarketer(address _marketer, uint96 fraction)",
      params: [_marketer, BigInt(fraction * 100)],
    });
    sendTransaction(transaction)
      .then(() => {
        toast({
          title: "Success",
          description: "Marketer approved",
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
