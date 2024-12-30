import { useApi } from "@/hooks/useApi";
import { useQuery } from "@tanstack/react-query";
export const CHECK_REQUESTS_QUERY_KEY = "checkRequests";
export const useCheckRequests = () => {
  const api = useApi();
  const queryFn = async () => {
    const res = await api.get<BulkData<ContractAuth>>("/contract-auth", {
      params: {
        page: 0,
        take: 100,
        filter: {
          has_approved: false,
          is_active: true,
          type: "MINTER",
        },
        relation: {
          user: true,
        },
      },
    });
    return res.data;
  };
  return useQuery({
    queryFn,
    queryKey: [CHECK_REQUESTS_QUERY_KEY],
    refetchInterval: 10_000,
  });
};
