"use client";
import { useRef, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  Image,
  Spinner,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { SportNFTContract } from "@/consts/nft_contracts";
import { useHandleCreateNFT } from "@/hooks/useHandleCreateNFT";
import { useHandleRequestMinter } from "@/hooks/useHandleMinterRequest";
import { isAddress } from "thirdweb/utils";
import { useAddMinterProof } from "@/hooks/api/useAddMinterProof";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function CreateNFT() {
  const [title, setTitle] = useState("");
  const [marketer, setMarketer] = useState("");
  const [royalty, setRoyalty] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // const activeAccount = useActiveAccount();
  const account = useActiveAccount();
  const toast = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  const [file, setFile] = useState<File | null>(null);
  const { mutateAsync: addMinterProof, isPending: isUploadingFile } =
    useAddMinterProof();
  const { data, isPending } = useReadContract({
    contract: SportNFTContract,
    method:
      "function getMinter(address _minter) view returns ((bool isApproved, bool isRequested, uint96 royaltyFraction))",
    params: [account?.address as string],
  });

  const { mutate: handleUpload, isPending: isLoading } = useHandleCreateNFT();
  const { mutate: handleRequestMinter, isPending: isLoadingMinterRequest } =
    useHandleRequestMinter();

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
        <FormLabel htmlFor="marketer">Marketer</FormLabel>
        <Input
          id="marketer"
          value={marketer}
          onChange={(e) => setMarketer(e.target.value)}
          placeholder="Marketer address"
        />
      </FormControl>
      <FormControl mb="4">
        <FormLabel htmlFor="royalty">Royalty %</FormLabel>
        <Input
          type="number"
          id="royalty"
          value={royalty}
          onChange={(e) => {
            if (+e.target.value >= 0 && +e.target.value < 5) {
              setRoyalty(+e.target.value);
            }
          }}
          placeholder="royalty%"
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

      {isPending ? (
        <Spinner />
      ) : (
        <>
          {!data?.isRequested && (
            <Box color={"red"}>You are not a official member</Box>
          )}
          {data?.isRequested && !data?.isApproved && (
            <Box color={"red"}>You are not approved</Box>
          )}
          {!data?.isRequested ? (
            <Flex flexDirection={"column"} gap={2}>
              <Input
                type="file"
                accept="image/*,application/pdf"
                ref={fileRef}
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFile(file);
                  }
                }}
              />
              <Button
                disabled={isUploadingFile || isLoadingMinterRequest}
                onClick={() => fileRef.current?.click()}
              >
                Upload Proof
              </Button>
              <Text>{file ? file.name : "No file selected"}</Text>
              <Button
                disabled={!file}
                isLoading={isLoadingMinterRequest}
                colorScheme="teal"
                onClick={async () => {
                  if (file) {
                    await addMinterProof(file);
                  }
                  handleRequestMinter();
                }}
              >
                Member request
              </Button>
            </Flex>
          ) : (
            <Button
              disabled={!data?.isApproved}
              colorScheme="teal"
              onClick={async () => {
                if (!isAddress(marketer)) {
                  toast({
                    title: "Error",
                    description: "Invalid Marketer address",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  });
                  return;
                }

                handleUpload({
                  title,
                  description,
                  image,
                  marketer,
                  royalty,
                });
              }}
              isLoading={isLoading}
            >
              Create NFT
            </Button>
          )}
        </>
      )}
    </Box>
  );
}
