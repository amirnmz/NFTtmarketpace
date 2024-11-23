import { useApi } from "@/hooks/useApi";

export const useUploadToIPFS = () => {
  const api = useApi();
  return async ({ file, data }: { file: File; data: any }) => {
    const res = await api.post<{ ipfsHash: string }>(
      "nft",
      { file, ...data },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return res.data;
  };
};
