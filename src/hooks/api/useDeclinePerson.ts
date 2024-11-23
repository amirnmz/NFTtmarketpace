import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "@/hooks/useApi";
import { CHECK_REQUESTS_QUERY_KEY } from "@/hooks/api/useCheckRequests";

export const useDeclinePerson = (minter: string) => {
  const api = useApi();
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutationFn = async () => {
    await api.post("contract-auth/decline-minter", {
      address: minter,
    });
  };
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CHECK_REQUESTS_QUERY_KEY] });
      toast({
        title: "Success",
        description: "Minter declined",
        status: "success",
        duration: 5000,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 5000,
      });
    },
  });
};
