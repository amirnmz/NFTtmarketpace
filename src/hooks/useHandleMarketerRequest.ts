import { useSendTransaction } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { SportNFTContract } from "@/consts/nft_contracts";
import { useToast } from "@chakra-ui/react";

export const useHandleMarketerRequest = () => {
  const {
    mutateAsync: sendTransaction,
    isPending,
    data,
  } = useSendTransaction();
  const toast = useToast();
  const onClick = () => {
    const transaction = prepareContractCall({
      contract: SportNFTContract,
      method: "function requestMarketer()",
      params: [],
    });
    sendTransaction(transaction)
      .catch((e) => {
        toast({
          title: "Error",
          description: e?.message || "Something went wrong",
          status: "error",
          duration: 5000,
        });
      })
      .then(() => {
        toast({
          title: "Success",
          description: "Request sent",
          status: "success",
          duration: 5000,
        });
      });
  };
  return { mutate: onClick, isPending, data };
};