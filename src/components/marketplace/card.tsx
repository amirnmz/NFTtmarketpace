"use client";

import {
  Box,
  Image,
  Badge,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  Skeleton,
} from "@chakra-ui/react";
import { FaEthereum, FaShoppingCart } from "react-icons/fa";
import { useReadFromIPFS } from "@/hooks/useReadFromIPFS";
import Link from "next/link";
import { useActiveAccount } from "thirdweb/react";

interface NFTCardProps {
  nft: NFT;
  isShowOnly?: boolean;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft, isShowOnly }) => {
  const bg = useColorModeValue("white", "gray.800");
  const shadow = useColorModeValue("md", "xl");
  const textColor = useColorModeValue("gray.800", "white");
  const priceColor = useColorModeValue("teal.500", "teal.200");
  const { data, isLoading } = useReadFromIPFS(nft?.uri);
  const account = useActiveAccount();
  if (isLoading) return <Skeleton height={200} width={200} />;
  if (!data) return null;
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={bg}
      boxShadow={shadow}
      _hover={{ transform: "scale(1.05)", transition: "0.3s" }}
    >
      <Image src={data?.image} alt={"nft_image"} />

      <Box p="6">
        <Stack direction="row" align="center" justify="space-between" mb={3}>
          <Text fontWeight="bold" fontSize="lg" color={textColor}>
            {data?.name}
          </Text>
        </Stack>

        <Text fontSize="sm" color="gray.500" mb={3}>
          {data?.description}
        </Text>

        {!isShowOnly && (
          <Stack direction="row" align="center" mb={4}>
            <Icon as={FaEthereum} color={priceColor} />
            <Text fontWeight="bold" fontSize="md" color={priceColor}>
              {nft?.price || "N"} POL
            </Text>
          </Stack>
        )}
        {!isShowOnly && (
          <Link href={"/token/" + nft?.nft_id}>
            <Button
              colorScheme="teal"
              width="100%"
              leftIcon={<FaShoppingCart />}
            >
              {account?.address === nft?.owner_wallet
                ? "Cancel Listing"
                : "Buy Now"}
            </Button>
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default NFTCard;
