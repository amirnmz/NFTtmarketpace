"use client";
import {
  Box,
  GridItem,
  SimpleGrid,
  Spinner,
  useMediaQuery,
} from "@chakra-ui/react";
import NFTCard from "@/components/marketplace/card";
import { useGetAllListings } from "@/hooks/api/useGetAllListings";
import Pagination from "@/components/shared/Pagination";
import useMarketPagination from "@/hooks/stores/useMarketPagination";
import { useShallow } from "zustand/react/shallow";

export default function Page() {
  const [isTablet] = useMediaQuery("(max-width: 768px)");
  const [isMobile] = useMediaQuery("(max-width: 526px)");
  const { data, isLoading } = useGetAllListings();
  const { totalPages, activePage, previous, next } = useMarketPagination(
    useShallow((state) => state),
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
      }}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <SimpleGrid
          columns={isMobile ? 1 : isTablet ? 2 : 4}
          spacingX={"10px"}
          spacingY="20px"
        >
          {data?.result.map((nft) => (
            <GridItem key={nft?.id}>
              <NFTCard nft={nft} />
            </GridItem>
          ))}
        </SimpleGrid>
      )}
      <Pagination
        currentPage={activePage}
        handleNext={next}
        handlePrevious={previous}
        totalPages={totalPages}
      />
    </Box>
  );
}
