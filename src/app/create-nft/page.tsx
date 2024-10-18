"use client";
import Abi from "./abi.json";
import { useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  Image,
} from "@chakra-ui/react";
import { SportNFT } from "@/types";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";
import { useAddress, useSigner } from "@thirdweb-dev/react";

const contractABI = Abi;
const contractAddress = "0xf55A21Abd589bAA43cd9E13Af2a3cB5B5bF518f0";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function CreateNFT() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  // const activeAccount = useActiveAccount();
  const address = useAddress();
  const signer = useSigner();

  console.log(signer, "<<");
  console.log(address, "<<Add");
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        return signer;
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to connect wallet.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return null;
      }
    } else {
      toast({
        title: "Error",
        description: "Please install MetaMask!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return null;
    }
  };

  const uploadToPinata = async (imageFile: File) => {
    const formData = new FormData();
    formData.append("file", imageFile);

    const pinataApiKey = "48d4c8c5e597418efc05";
    const pinataSecretApiKey =
      "5a6e6ad9ddfa45e5e5fdaa16074d448f004357d5b4b9de2bc3cc64b560cb7c38";
    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey,
          },
        },
      );
      return res.data.IpfsHash;
    } catch (error) {
      console.error("Error uploading image: ", error);
      toast({
        title: "Error",
        description: "Failed to upload image to Pinata.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      throw error;
    }
  };

  // Upload metadata to Pinata
  const uploadMetadataToPinata = async (metadata: object) => {
    const pinataApiKey = "48d4c8c5e597418efc05";
    const pinataSecretApiKey =
      "5a6e6ad9ddfa45e5e5fdaa16074d448f004357d5b4b9de2bc3cc64b560cb7c38";

    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        metadata,
        {
          headers: {
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey,
          },
        },
      );
      return res.data.IpfsHash;
    } catch (error) {
      console.error("Error uploading metadata: ", error);
      toast({
        title: "Error",
        description: "Failed to upload metadata to Pinata.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      throw error;
    }
  };

  const handleUpload = async () => {
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

    setLoading(true);

    try {
      console.log(signer, "SIGNER<<");
      if (!signer)
        toast({
          title: "Error",
          description: "Please connect your wallet",
          status: "error",
          duration: 3000,
          isClosable: true,
        });

      const imageHash = await uploadToPinata(image);
      const imageUrl = `https://gateway.pinata.cloud/ipfs/${imageHash}`;

      const metadata = {
        name: title,
        description,
        image: imageUrl,
      };
      const metadataHash = await uploadMetadataToPinata(metadata);
      const tokenURI = `https://gateway.pinata.cloud/ipfs/${metadataHash}`;

      // const signer = await connectWallet();

      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer,
      ) as SportNFT;

      console.log(contract, "<<");
      if (!address) {
        throw new Error("No active account found.");
      }
      const tx = await contract.mintNFT(
        address,
        tokenURI,
        ethers.BigNumber.from(100),
        ethers.BigNumber.from(100),
      );
      await tx.wait();

      toast({
        title: "Success",
        description: "NFT created and minted successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error: ", error);
      toast({
        title: "Error",
        description: "Something went wrong during the minting process.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      maxWidth="500px"
      mx="auto"
      mt="20"
      p="6"
      borderWidth="1px"
      borderRadius="lg"
    >
      <FormControl mb="4">
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter NFT title"
        />
      </FormControl>
      <FormControl mb="4">
        <FormLabel htmlFor="description">Description</FormLabel>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter NFT description"
        />
      </FormControl>
      <FormControl mb="4">
        <FormLabel htmlFor="image">Upload Image</FormLabel>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </FormControl>

      {/* Display image preview */}
      {previewUrl && (
        <Box mb="4">
          <Image src={previewUrl} alt="NFT Preview" />
        </Box>
      )}

      <Button colorScheme="teal" onClick={handleUpload} isLoading={loading}>
        Create NFT
      </Button>
    </Box>
  );
}
