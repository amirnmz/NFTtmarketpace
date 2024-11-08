import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

export const useShowError = (error: Error | null) => {
  const toast = useToast();
  useEffect(() => {
    if (error?.message) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
      });
    }
  }, [error]);
};
