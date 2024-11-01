import { useMutation } from "@tanstack/react-query";
import { useActiveAccount, useActiveWalletChain } from "thirdweb/react";
import { useToast } from "@chakra-ui/react";
import { useApi } from "@/hooks/useApi";
import { useAuth } from "@/hooks/useAuth";

export default function useLogin() {
  const account = useActiveAccount();
  const chain = useActiveWalletChain();
  const toast = useToast();
  const api = useApi();
  const { login: loginAuth } = useAuth();

  const loginNewBack = async (values: {
    wallet_address: string;
    nickname: string;
    typeData: any;
    signature: string;
  }) => {
    const checkResult = await api.post<{
      access_token: string;
      user: any;
    }>(`/auth/login`, {
      wallet_address: values.wallet_address,
      nickname: values.nickname,
      message: values.typeData,
      signature: values.signature,
    });

    return checkResult.data;
  };
  const login = async (values: {
    wallet_address: string;
    nickname: string;
  }) => {
    if (!chain || !account) return;
    const typeData = {
      types: {
        SportNFT: [
          { name: "wallet", type: "string" },
          { name: "nickname", type: "string" },
        ],
      },
      primaryType: "SportNFT" as const,
      domain: {
        name: "SportNFT.com",
        version: "1",
        chainId: chain?.id,
      },
      message: {
        wallet: account.address,
        nickname: values.nickname,
      },
    };
    const signature = await account?.signTypedData(typeData);
    if (!signature) {
      toast({
        title: "Invalid Signature",
        description: "Please connect your wallet and try again",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    return loginNewBack({
      wallet_address: account.address,
      nickname: values.nickname,
      typeData,
      signature,
    });
  };

  return useMutation({
    mutationKey: ["login"],
    mutationFn: (value: { wallet_address: string; nickname: string }) =>
      login(value),
    onSuccess: (res) => {
      if (res) loginAuth(res.access_token);
    },
    onError: () => {
      toast({
        title: "Login Failed",
        description: "Please try again",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });
}
