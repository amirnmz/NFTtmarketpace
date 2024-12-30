import { useMutation } from "@tanstack/react-query";
import { useApi } from "../useApi";
import { useToast } from "@chakra-ui/react";

export const useAddMarketerProof = () => {
  const api = useApi();
  const mutationFn = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post(
      "/contract-auth/add-marketer-proof",
      formData
    );
    return response.data;
  };
  const toast = useToast();
  return useMutation({
    mutationFn,
    onSuccess: () => {
      toast({
        title: "File uploaded successfully",
        status: "success",
      });
    },
    onError: () => {
      toast({
        title: "Failed to upload file",
        status: "error",
      });
    },
  });
};
