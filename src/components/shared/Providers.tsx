"use client";
import { chakraTheme, chakraThemeConfig } from "@/consts/chakra";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import { ThirdwebProvider as ThirdwebProviderV5 } from "thirdweb/react";
import { AuthProvider } from "@/components/shared/AuthProvider";

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  if (client)
    return (
      <ChakraProvider theme={chakraTheme}>
        <ColorModeScript
          initialColorMode={chakraThemeConfig.initialColorMode}
        />
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ThirdwebProviderV5>{children}</ThirdwebProviderV5>
          </QueryClientProvider>
        </AuthProvider>
      </ChakraProvider>
    );
}
