"use client";

import { client } from "@/consts/client";
import { useGetENSAvatar } from "@/hooks/useGetENSAvatar";
import { useGetENSName } from "@/hooks/useGetENSName";
import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Image,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { blo } from "blo";
import { FaRegMoon } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { IoSunny } from "react-icons/io5";
import {
  ConnectButton,
  useActiveAccount,
  useActiveWallet,
  useDisconnect,
} from "thirdweb/react";
import type { Wallet } from "thirdweb/wallets";
import { SideMenu } from "./SideMenu";
import { ConnectBtn } from "@/components/shared/ConnectBtn";
import { useAuth } from "@/hooks/useAuth";

export function Navbar() {
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const { colorMode } = useColorMode();

  // Define colors based on the color mode
  const bgColor = useColorModeValue("#ffffff", "#212f3d"); // White for light mode, dark color for dark mode
  const textColor = useColorModeValue("black", "white"); // Black for light mode, white for dark mode

  return (
    <Box
      bgColor={bgColor}
      color={textColor}
      py="15px"
      px={{ base: "20px", lg: "50px" }}
    >
      <Flex direction="row" justifyContent="space-between">
        <Box my="auto">
          <Heading
            as={Link}
            href="/"
            _hover={{ textDecoration: "none" }}
            bgColor="black"
            bgClip="text"
            fontWeight="bold"
          >
            SPORT NFT
          </Heading>
        </Box>
        <Box
          sx={{ justifyContent: "center", alignItems: "center" }}
          display={{ lg: "flex", base: "none" }}
        >
          <ToggleThemeButton />
          {account && wallet ? (
            <ProfileButton address={account.address} wallet={wallet} />
          ) : (
            <ConnectBtn connectButton={{ style: { height: "56px" } }} />
          )}
          <Link href="/create-nft">
            <Button ml="10px" height="56px">
              Create NFT
            </Button>
          </Link>
          <Link href="/virtualtour">
            <Button ml="10px" height="56px">
              VIRTUAL TOUR
            </Button>
          </Link>
        </Box>
        <SideMenu />
      </Flex>
    </Box>
  );
}

function ProfileButton({
  address,
  wallet,
}: {
  address: string;
  wallet: Wallet;
}) {
  const { disconnect } = useDisconnect();
  const { data: ensName } = useGetENSName({ address });
  const { data: ensAvatar } = useGetENSAvatar({ ensName });
  const { colorMode } = useColorMode();

  // Define text color for the profile button
  const textColor = useColorModeValue("black", "white");
  const { logout } = useAuth();
  return (
    <Menu>
      <MenuButton as={Button} height="56px" color={textColor}>
        <Flex direction="row" gap="5">
          <Box my="auto">
            <FiUser size={30} />
          </Box>
          <Image
            src={ensAvatar ?? blo(address as `0x${string}`)}
            height="40px"
            rounded="8px"
          />
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem display="flex">
          <Box mx="auto">
            <ConnectButton client={client} theme={colorMode} />
          </Box>
        </MenuItem>
        <MenuItem
          as={Link}
          href="/profile"
          _hover={{ textDecoration: "none" }}
          color={textColor}
        >
          Profile {ensName ? `(${ensName})` : ""}
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (wallet) disconnect(wallet);
            logout();
          }}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

function ToggleThemeButton() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button height="56px" w="56px" onClick={toggleColorMode} mr="10px">
      {colorMode === "light" ? <FaRegMoon /> : <IoSunny />}
    </Button>
  );
}
