import { useQuery } from "@tanstack/react-query";

export const useReadFromIPFS = (uri: string) => {
  const queryFn = async (): Promise<IPFSData> => {
    const res = await fetch(uri);
    return res.json();
  };
  return useQuery({
    queryFn,
    queryKey: ["readFromIPFS", { uri }],
  });
};
