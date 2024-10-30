import { useQuery } from "@tanstack/react-query";
import { useActiveAccount } from "thirdweb/react";
import { useApi } from "@/hooks/useApi";

export const useProfile = () => {
  const account = useActiveAccount();
  const api = useApi();
  const queryFn = async () => {
    const res = await api.get<User>("user/profile");
    return res.data;
  };
  return useQuery({
    queryFn,
    queryKey: [
      "profile",
      {
        account: account?.address,
      },
    ],
  });
};
