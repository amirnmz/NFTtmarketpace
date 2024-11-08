import { useMarketplaceContext } from "@/hooks/useMarketplaceContext";
import { Button, useToast } from "@chakra-ui/react";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

type Props = {
  listingId: bigint;
  refetch: () => void;
};

export default function CancelListingButton(props: Props) {
  const { listingId, refetch } = props;
  const { marketplaceContract, refetchAllListings } = useMarketplaceContext();
  const {
    mutateAsync: sendTransaction,
    isPending,
    isSuccess,
  } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract: marketplaceContract,
      method: "function cancelListing(uint256 tokenId)",
      params: [listingId],
    });
    sendTransaction(transaction)
      .then(() => {
        refetch();
        refetchAllListings();
        toast({
          title: "You have successfully canceled the NFT listing",
          status: "success",
          isClosable: true,
          duration: 5000,
        });
      })
      .catch((e) => {
        console.log(e);
        toast({
          title: "Error",
          description: e?.message,
          status: "error",
          duration: 5000,
        });
      });
  };
  const toast = useToast();

  return (
    <Button isLoading={isPending} onClick={onClick}>
      Cancel
    </Button>
  );
}
