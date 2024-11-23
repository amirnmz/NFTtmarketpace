import { getContract, prepareContractCall, sendTransaction } from "thirdweb";
import { useToast } from "@chakra-ui/react";
import { useUploadToIPFS } from "@/hooks/api/useUploadToIPFS";
import { useActiveAccount } from "thirdweb/react";
import { SportNFTContract } from "@/consts/nft_contracts";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useHandleCreateNFT = () => {
  const uploadToIPFS = useUploadToIPFS();
  const account = useActiveAccount();
  const router = useRouter();
  const toast = useToast();
  const handleUpload = async ({
    title,
    image,
    description,
    marketer,
    royalty,
  }: {
    title?: string;
    image?: File | null;
    description?: string;
    marketer: string;
    royalty: number;
  }) => {
    console.log("<<");
    if (!title || !description || !image) {
      toast({
        title: "Error",
        description: "Please fill all fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      const token = await uploadToIPFS({
        file: image,
        data: { name: title, description },
      });

      if (!account?.address) {
        throw new Error("No active account found.");
      }
      // console.log({
      //   marketer,
      //   uri: tokenURI.ipfsHash,
      //   roy: BigInt(royalty * 100),
      // });
      const _minterRoyalty = BigInt(royalty * 100);
      const tokenURI = "https://gateway.pinata.cloud/ipfs/" + token.ipfsHash;
      const _marketer = marketer;
      console.log([_marketer, tokenURI, _minterRoyalty], "<<");

      const transaction = prepareContractCall({
        contract: SportNFTContract,
        method:
          "function mint(address _marketer, string tokenURI, uint96 minterRoyalty) returns (uint256)",
        params: [_marketer, tokenURI, _minterRoyalty],
      });
      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      });

      if (transactionHash) {
        toast({
          title: "Success",
          description: "NFT created and minted successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        router.push("/profile");
      } else {
        toast({
          title: "Error",
          description: "Something went wrong during the minting process.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      console.error("Error: ", error);
      toast({
        title: "Error",
        description: "Invalid Marketer",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return useMutation({
    mutationFn: handleUpload,
    mutationKey: ["create-nft"],
  });
};
