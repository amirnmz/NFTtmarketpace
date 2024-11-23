import { Button, Flex, Input, Spinner, Switch, Text } from "@chakra-ui/react";
import NFTCard from "@/components/marketplace/card";
import { ethers } from "ethers";
import { useCheckTokenExistence } from "@/hooks/useCheckTokenExistence";
import { useChangeMarketer } from "@/hooks/useChangeMarketer";
import { useChangeRoyaltyFee } from "@/hooks/useChangeRoyaltyFee";
import { useEffect, useState } from "react";
import { useReadContract } from "thirdweb/react";
import { SportNFTContract } from "@/consts/nft_contracts";

export const CheckTokens = () => {
  const [tokenId, setTokenId] = useState<number | null>(null);
  const [newMarketer, setNewMarketer] = useState<string>("");
  const [mode, setMode] = useState<"changeMarketer" | "changeRoyaltyFee">(
    "changeMarketer",
  );
  const [creatorRoyalty, setCreatorRoyalty] = useState(0);

  const { data: royalties } = useReadContract({
    contract: SportNFTContract,
    method:
      "function _royalties(uint256) view returns (address minter, address marketer, uint256 minterRoyalty, uint256 marketerRoyalty)",
    params: [BigInt((tokenId || 0)?.toString())],
  });

  useEffect(() => {
    if (royalties && typeof tokenId === "number") {
      setCreatorRoyalty(+(+royalties[2].toString() / 100));
      setNewMarketer(royalties[1].toString());
    }
  }, [royalties]);
  const { data, isPending } = useCheckTokenExistence(tokenId?.toString() ?? "");
  const { changeMarketer, isChangeMarketerPending } = useChangeMarketer(
    tokenId,
    newMarketer,
  );

  const { changeRoyaltyFee, isChangingRoyalties } = useChangeRoyaltyFee(
    creatorRoyalty,
    tokenId,
  );
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      minW={"72"}
      maxW={"100%"}
      gap={5}
    >
      <Text fontSize={"3xl"}>Admin Page</Text>
      <Flex gap={1} flexDirection={"column"}>
        <Text fontSize={"xl"}>Enter the token ID</Text>
        <Flex gap={1}>
          <Input
            type={"number"}
            onChange={(e) => {
              setTokenId(+e.target.value);
            }}
          />
          {isPending && <Spinner />}
        </Flex>
        {!!tokenId && !data && !isPending && (
          <Text color={"red"}>NFT doesnt exist</Text>
        )}
        {!isPending && data && (
          <NFTCard isShowOnly nft={{ uri: data, nft_id: tokenId } as NFT} />
        )}
        {mode === "changeMarketer" ? (
          <Flex flexDirection={"column"}>
            <Text>Marketer Wallet Address</Text>
            <Input
              type={"text"}
              value={newMarketer}
              onChange={(e) => {
                setNewMarketer(e.target.value);
              }}
            />
            {newMarketer && !ethers.utils.isAddress(newMarketer) && (
              <Text textColor={"red"}>Invalid Marketer Address</Text>
            )}
          </Flex>
        ) : (
          <Flex flexDirection={"column"}>
            <Text>Creator royalty fee %</Text>
            <Input
              value={creatorRoyalty}
              max={100}
              min={0}
              type={"number"}
              onChange={(e) => {
                setCreatorRoyalty(+e.target.value);
              }}
            />
          </Flex>
        )}
      </Flex>
      <Flex gap={2} justifyContent={"center"} alignItems={"center"}>
        <Text fontSize={12}>Change Marketer</Text>
        <Switch
          onChange={(newMarketer) => {
            setMode(
              mode === "changeMarketer" ? "changeRoyaltyFee" : "changeMarketer",
            );
          }}
        />
        <Text fontSize={12}>Change Royalty Fee</Text>
      </Flex>

      <Button
        disabled={
          (mode === "changeMarketer" && !ethers.utils.isAddress(newMarketer)) ||
          (!!tokenId && !data && !isPending)
        }
        isLoading={isChangeMarketerPending || isChangingRoyalties}
        onClick={() => {
          if (mode === "changeMarketer") return changeMarketer();
          changeRoyaltyFee();
        }}
      >
        Change Marketer
      </Button>
    </Flex>
  );
};
