import { SportNFTContract } from "@/consts/nft_contracts";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { useToast } from "@chakra-ui/react";

export const useChangeRoyaltyFee = (
  _minterRoyalty: number,
  tokenId: number | null,
) => {
  const { mutateAsync: sendTransaction, isPending } = useSendTransaction();
  const toast = useToast();
  const changeRoyaltyFee = () => {
    if (!tokenId) return;
    const transaction = prepareContractCall({
      contract: SportNFTContract,
      method: "function setRoyalties(uint96 _minterRoyalty, uint256 tokenId)",
      params: [
        BigInt((+_minterRoyalty * 100).toString()),
        BigInt(tokenId?.toString()),
      ],
    });
    sendTransaction(transaction)
      .then((result) => {
        toast({
          title: "Success",
          description: "royalty changed successfully",
          status: "success",
        });
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err?.message || "Error",
          status: "error",
        });
      });
  };
  return { changeRoyaltyFee, isChangingRoyalties: isPending };
};
