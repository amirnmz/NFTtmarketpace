"use client";
import { chakraTheme, chakraThemeConfig } from "@/consts/chakra";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { ThirdwebProvider as ThirdwebProviderV5 } from "thirdweb/react";
import { ThirdwebProvider } from "@thirdweb-dev/react";

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider theme={chakraTheme}>
      <ColorModeScript initialColorMode={chakraThemeConfig.initialColorMode} />
      <QueryClientProvider client={queryClient}>
        <ThirdwebProvider
          activeChain="polygon"
          clientId={process.env.NEXT_PUBLIC_TW_CLIENT_ID}
        >
          <ThirdwebProviderV5>{children}</ThirdwebProviderV5>
        </ThirdwebProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
