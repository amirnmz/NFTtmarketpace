"use client";

import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Container,
  useColorModeValue,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";
import { FaTrophy, FaUsers, FaShieldAlt } from "react-icons/fa"; // Icons for visual appeal
import Image from "next/image";

import pic from "./headernft.webp";
import NFTCard from "@/components/marketplace/card";

export default function Home() {
  // Define color based on the color mode
  const headingColor = useColorModeValue("gray.800", "teal.200");
  const textColor = useColorModeValue("gray.800", "gray.300");
  const buttonColorScheme = useColorModeValue("teal", "whiteAlpha");

  return (
    <Box minH="100vh">
      {/* Header Section */}
      <Box py={4} boxShadow="sm">
        <Container maxW="container.xl">
          {/* <Flex justify="space-between" align="center">
            <Flex gap={6}>
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/marketplace">Marketplace</Link>
              <Link href="/contact">Contact</Link>
            </Flex>
          </Flex> */}
        </Container>
      </Box>

      {/* Hero Section */}
      <Box bg="teal.500" color="white" py={20}>
        <Container maxW="container.xl">
          <Flex direction={{ base: "column", md: "row" }} align="center">
            <Box flex="1">
              <Heading as="h2" size="2xl" mb={4} color={headingColor}>
                Discover Exclusive Sport NFTs
              </Heading>
              <Text fontSize="xl" mb={6} color={textColor}>
                Own a piece of your favorite sports moments and athletes through
                our unique NFT marketplace.
              </Text>
              <Button
                as={Link}
                href="/market"
                colorScheme={buttonColorScheme}
                size="lg"
              >
                Explore Marketplace
              </Button>
            </Box>
            <Box
              flex="1"
              display={{ base: "none", md: "block" }}
              ml={{ md: 10 }}
            >
              <Image src={pic} width={400} height={400} alt="Sport NFT Image" />
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* About Section */}
      <Box py={16} bg={useColorModeValue("gray.100", "gray.700")} px={4}>
        <Container maxW="container.xl">
          <Heading
            as="h3"
            size="lg"
            mb={8}
            textAlign="center"
            color={headingColor}
          >
            Why Choose Our Marketplace
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <Box
              bg={useColorModeValue("white", "gray.800")}
              borderRadius="lg"
              p={6}
              boxShadow="md"
              textAlign="center"
            >
              <Icon as={FaTrophy} w={8} h={8} color="teal.500" mb={4} />
              <Heading as="h4" size="md" mb={2} color={headingColor}>
                Exclusive Access
              </Heading>
              <Text color={textColor}>
                Get exclusive access to rare and valuable sports NFTs that you
                won’t find anywhere else.
              </Text>
            </Box>
            <Box
              bg={useColorModeValue("white", "gray.800")}
              borderRadius="lg"
              p={6}
              boxShadow="md"
              textAlign="center"
            >
              <Icon as={FaUsers} w={8} h={8} color="teal.500" mb={4} />
              <Heading as="h4" size="md" mb={2} color={headingColor}>
                Community Engagement
              </Heading>
              <Text color={textColor}>
                Join our community of collectors and sports enthusiasts to
                share, trade, and connect.
              </Text>
            </Box>
            <Box
              bg={useColorModeValue("white", "gray.800")}
              borderRadius="lg"
              p={6}
              boxShadow="md"
              textAlign="center"
            >
              <Icon as={FaShieldAlt} w={8} h={8} color="teal.500" mb={4} />
              <Heading as="h4" size="md" mb={2} color={headingColor}>
                Secure Transactions
              </Heading>
              <Text color={textColor}>
                Our platform ensures secure transactions for peace of mind when
                buying or selling NFTs.
              </Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Footer Section */}
      <Box bg="gray.800" color="gray.200" py={8}>
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <Text>&copy; 2024 SportNFT. All rights reserved.</Text>
            <Flex gap={6}>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}
