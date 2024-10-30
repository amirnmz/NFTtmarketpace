import { useQuery } from "@tanstack/react-query";
import { useApi } from "@/hooks/useApi";
import { useActiveAccount } from "thirdweb/react";

export const useGetNickname = () => {
  const api = useApi();
  const account = useActiveAccount();
  return useQuery({
    queryFn: async () => {
      if (!account?.address) {
        return null;
      }
      const res = await api.get("/auth/info/" + account?.address);
      return res.data;
    },
    queryKey: ["nickname", { address: account?.address }],
  });
};
