"use client";

import { client } from "@/consts/client";
import { useGetENSAvatar } from "@/hooks/useGetENSAvatar";
import { useGetENSName } from "@/hooks/useGetENSName";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { FaRegMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";
import {
  ConnectButton,
  useActiveAccount,
  useActiveWallet,
  useDisconnect,
} from "thirdweb/react";
import { ConnectBtn } from "@/components/shared/ConnectBtn";
import { useAuth } from "@/hooks/useAuth";

export function SideMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const { disconnect } = useDisconnect();
  const account = useActiveAccount();
  const { data: ensName } = useGetENSName({ address: account?.address });
  const { colorMode, toggleColorMode } = useColorMode();
  const wallet = useActiveWallet();
  const { logout } = useAuth();

  return (
    <>
      <Button
        display={{ lg: "none", base: "block" }}
        ref={btnRef}
        onClick={onOpen}
      >
        <HamburgerIcon />
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Button height="56px" w="56px" onClick={toggleColorMode} mr="10px">
              {colorMode === "light" ? <FaRegMoon /> : <IoSunny />}
            </Button>
          </DrawerHeader>
          <DrawerBody>
            <Box>
              <ConnectBtn />
            </Box>
            {account && (
              <Flex mt={1} flexDirection={"column"} gap={2}>
                <Link href="/create-nft">
                  <Button height="56px">Create NFT</Button>
                </Link>
                <Link href="/profile">
                  <Button height="56px">
                    Profile {ensName ? `(${ensName})` : ""}
                  </Button>
                </Link>
              </Flex>
            )}
          </DrawerBody>
          <DrawerFooter>
            {account && (
              <Button
                onClick={() => {
                  if (wallet) disconnect(wallet);
                  logout();
                }}
              >
                Logout
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
