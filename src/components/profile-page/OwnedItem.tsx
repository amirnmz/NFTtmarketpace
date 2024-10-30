import { client } from "@/consts/client";
import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { MediaRenderer } from "thirdweb/react";
import { useReadFromIPFS } from "@/hooks/useReadFromIPFS";

export function OwnedItem(props: { nft: NFT }) {
  const { nft } = props;
  const { data } = useReadFromIPFS(nft.uri);

  return (
    <>
      <Box
        rounded="12px"
        as={Link}
        href={"/token/" + nft.nft_id.toString()}
        _hover={{ textDecoration: "none" }}
        w={250}
      >
        <Flex direction="column">
          <MediaRenderer
            style={{ borderRadius: 25 }}
            client={client}
            src={data?.image}
          />
          <Text>{data?.name ?? "Unknown item"}</Text>
        </Flex>
      </Box>
    </>
  );
}
