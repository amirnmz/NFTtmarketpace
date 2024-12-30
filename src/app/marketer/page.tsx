"use client";

import { Button, Flex, Input, Spinner, Text } from "@chakra-ui/react";
import { SportNFTContract } from "@/consts/nft_contracts";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { useHandleMarketerRequest } from "@/hooks/useHandleMarketerRequest";
import { useRef, useState } from "react";
import { useAddMarketerProof } from "@/hooks/api/useAddMarketerProof";

export default function Page() {
  const account = useActiveAccount();
  const { data, isPending } = useReadContract({
    contract: SportNFTContract,
    method:
      "function getMarketer(address _marketer) view returns ((bool isApproved, bool isRequested, uint96 royaltyFraction))",
    params: [account?.address as string],
  });
  const {
    mutate,
    isPending: isMutating,
    data: dataRequest,
  } = useHandleMarketerRequest();

  const { mutateAsync: addMarketerProof, isPending: isUploadingFile } =
    useAddMarketerProof();

  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  return (
    <Flex
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
      marginTop={10}
    >
      {isPending ? (
        <Spinner />
      ) : (
        <Flex
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Flex
            justifyContent={"center"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Text fontSize={18} variant={"h1"}>
              Marketer
            </Text>
            <Text color={data?.isApproved ? "green" : "red"}>
              {data?.isApproved ? "Active" : "Not Active"}
            </Text>

            {!data?.isApproved && (
              <Flex flexDirection={"column"} gap={5} alignItems={"center"}>
                <Input
                  sx={{
                    display: "none",
                  }}
                  type="file"
                  ref={fileRef}
                  accept="application/pdf,image/jpeg,image/png"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
                <Button
                  disabled={
                    isUploadingFile || data?.isRequested || !!dataRequest
                  }
                  onClick={() => fileRef.current?.click()}
                >
                  Upload proof
                </Button>
                {file && <Text>{file.name}</Text>}

                <Button
                  disabled={data?.isRequested || !!dataRequest || !file}
                  isLoading={isMutating || isUploadingFile}
                  onClick={async () => {
                    if (file) {
                      await addMarketerProof(file);
                      mutate();
                    }
                  }}
                >
                  {data?.isRequested
                    ? "Your request is pending"
                    : "Become marketer"}
                </Button>
              </Flex>
            )}
            {data?.royaltyFraction && (
              <Text>Royalty: {+data?.royaltyFraction.toString() / 100} % </Text>
            )}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}
