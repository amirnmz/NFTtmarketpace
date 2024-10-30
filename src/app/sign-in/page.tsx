"use client";

import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  useColorMode,
} from "@chakra-ui/react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client } from "@/consts/client";
import React, { useEffect, useState } from "react";
import useLogin from "@/hooks/api/useLogin";
import { useGetNickname } from "@/hooks/api/useGetNickname";
import { polygon } from "@/consts/chains";
import { ConnectBtn } from "@/components/shared/ConnectBtn";

export default function SignIn() {
  const account = useActiveAccount();
  const [nickname, setNickname] = useState("");

  function setValue(e: React.ChangeEvent<HTMLInputElement>) {
    setNickname(e.target.value);
  }
  const { mutate, isPending } = useLogin();
  const { data, isLoading } = useGetNickname();
  useEffect(() => {
    if (data) {
      setNickname(data.nickname);
    }
  }, [data]);

  const { colorMode } = useColorMode();

  return (
    <Flex>
      <Box mt="24px" m="auto">
        <Flex direction="column" gap="4">
          {/* Delete this <Card /> in your own app */}
          <Heading ml="20px" mt="40px">
            Login
          </Heading>
          <Flex
            direction="row"
            wrap="wrap"
            mt="20px"
            gap="5"
            justifyContent="space-evenly"
          >
            <label htmlFor="input">Address</label>
            <Input value={account?.address} disabled />
            <label htmlFor="input">Nickname</label>
            <Input
              value={nickname}
              onChange={setValue}
              placeholder="Nickname"
              disabled={isPending || isLoading}
            />
            {account ? (
              <Button
                isLoading={isPending}
                onClick={() =>
                  mutate({ wallet_address: account.address, nickname })
                }
                width={"100%"}
              >
                Login
              </Button>
            ) : (
              <ConnectBtn />
            )}
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}
