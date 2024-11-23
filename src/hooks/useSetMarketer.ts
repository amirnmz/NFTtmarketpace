import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { SportNFTContract } from "@/consts/nft_contracts";
import { useToast } from "@chakra-ui/react";

export const useSetMarketer = (_marketer: string, fraction: number) => {
  const { mutateAsync: sendTransaction, isPending } = useSendTransaction();
  const toast = useToast();
  const setMarketer = () => {
    const transaction = prepareContractCall({
      contract: SportNFTContract,
      method: "function setMarketer(address _marketer, uint96 fraction)",
      params: [_marketer, BigInt(fraction * 100)],
    });
    sendTransaction(transaction)
      .then(() => {
        toast({
          title: "Success",
          description: "Marketer set",
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

  return { setMarketer, isPending };
};
