import { useMarketplaceContext } from "@/hooks/useMarketplaceContext";
import { Button, useToast } from "@chakra-ui/react";
import { prepareContractCall } from "thirdweb";

import { useSendTransaction } from "thirdweb/react";
import { useEffect } from "react";

type Props = {
  tokenId: bigint;
  refetch: () => void;
};

export default function BuyFromListingButton(props: Props) {
  const { tokenId, refetch } = props;
  const { marketplaceContract, refetchAllListings } = useMarketplaceContext();
  const { mutateAsync: sendTransaction, isPending } = useSendTransaction();
  const toast = useToast();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract: marketplaceContract,
      method: "function buyNFT(uint256 tokenId) payable",
      params: [tokenId],
    });
    sendTransaction(transaction)
      .then(() => {
        refetch();
        refetchAllListings();
        toast({
          title: "You have successfully bought the NFT",
          status: "success",
          isClosable: true,
          duration: 5000,
        });
      })
      .catch((e) => {
        toast({
          title: "Error",
          description: e?.message,
          status: "error",
          duration: 5000,
        });
      });
  };
  return (
    <Button isLoading={isPending} onClick={onClick}>
      Buy
    </Button>
  );
}
