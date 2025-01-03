import { useCheckRequests } from "@/hooks/api/useCheckRequests";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import { ApproveUserCard } from "@/components/admin-page/ApproveUserCard";
import { RiFilePaper2Fill } from "react-icons/ri";
import { ApproveMarketerCard } from "@/components/admin-page/ApproveMarketerCard";
import { useCheckMarketerRequests } from "@/hooks/api/useCheckMarketerRequests";

export const CheckMarketerRequests = () => {
  const { data, isLoading } = useCheckMarketerRequests();
  if (isLoading) return <Spinner />;

  return (
    <Flex flexDirection={"column"} gap={3} justifyContent={"center"}>
      {data?.result.map((auth) => (
        <ApproveMarketerCard key={auth.id} data={auth} />
      ))}
      {data?.result.length === 0 && (
        <Flex
          flexDirection={"column"}
          justifyContent={"center"}
          gap={1}
          alignItems={"center"}
        >
          <RiFilePaper2Fill size={35} />
          <Text>No requests</Text>
        </Flex>
      )}
    </Flex>
  );
};
