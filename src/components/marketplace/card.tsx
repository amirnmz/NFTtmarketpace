import { Box, Image, Badge, Text, Button, Stack, Icon, useColorModeValue } from "@chakra-ui/react";
import { FaEthereum, FaShoppingCart, FaCheckCircle } from "react-icons/fa";

interface NFTCardProps {
  imageUrl: string;
  title: string;
  price: string;
  description: string;
  status: 'available' | 'sold';
}

const NFTCard: React.FC<NFTCardProps> = ({ imageUrl, title, price, description, status }) => {
  const bg = useColorModeValue("white", "gray.800");
  const shadow = useColorModeValue("md", "xl");
  const textColor = useColorModeValue("gray.800", "white");
  const priceColor = useColorModeValue("teal.500", "teal.200");

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
      <Image src={imageUrl} alt={title} />

      <Box p="6">
        <Stack direction="row" align="center" justify="space-between" mb={3}>
          <Text fontWeight="bold" fontSize="lg" color={textColor}>{title}</Text>
          {status === 'sold' && (
            <Badge colorScheme="red" display="flex" alignItems="center">
              <Icon as={FaCheckCircle} mr={1} /> Sold Out
            </Badge>
          )}
        </Stack>

        <Text fontSize="sm" color="gray.500" mb={3}>{description}</Text>

        <Stack direction="row" align="center" mb={4}>
          <Icon as={FaEthereum} color={priceColor} />
          <Text fontWeight="bold" fontSize="md" color={priceColor}>
            {price} ETH
          </Text>
        </Stack>

        <Button
          colorScheme="teal"
          width="100%"
          disabled={status === 'sold'}
          leftIcon={<FaShoppingCart />}
        >
          {status === 'sold' ? "Unavailable" : "Buy Now"}
        </Button>
      </Box>
    </Box>
  );
};

export default NFTCard;
