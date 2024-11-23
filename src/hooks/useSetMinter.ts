import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { SportNFTContract } from "@/consts/nft_contracts";
import { useToast } from "@chakra-ui/react";

export const useSetMinter = (_minter: string) => {
  const { mutateAsync: sendTransaction, isPending } = useSendTransaction();
  const toast = useToast();
  const setMinter = () => {
    const transaction = prepareContractCall({
      contract: SportNFTContract,
      method: "function setMinter(address _minter)",
      params: [_minter],
    });
    sendTransaction(transaction)
      .then(() => {
        toast({
          title: "Success",
          description: "Minter set",
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

  return { setMinter, isPending };
};
