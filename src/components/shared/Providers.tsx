"use client";
import { chakraTheme, chakraThemeConfig } from "@/consts/chakra";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { ThirdwebProvider } from "thirdweb/react";
import { ThirdwebProvider as ThirdwebProviderV4 } from "@thirdweb-dev/react";

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider theme={chakraTheme}>
      <ColorModeScript initialColorMode={chakraThemeConfig.initialColorMode} />
      <QueryClientProvider client={queryClient}>
        <ThirdwebProviderV4
          activeChain="polygon"
          clientId={process.env.NEXT_PUBLIC_TW_CLIENT_ID}
        >
          <ThirdwebProvider>{children}</ThirdwebProvider>
        </ThirdwebProviderV4>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
