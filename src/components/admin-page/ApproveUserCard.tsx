import { Flex, IconButton, Text, useClipboard } from "@chakra-ui/react";
import { RiCheckLine, RiClipboardLine, RiCloseLine } from "react-icons/ri";
import { useDeclinePerson } from "@/hooks/api/useDeclinePerson";
import { useApproveMinter } from "@/hooks/useApproveMinter";
import { shortenAddress } from "thirdweb/utils";

type propsType = {
  data: ContractAuth;
};

export const ApproveUserCard = ({ data }: propsType) => {
  const { mutate, isPending } = useDeclinePerson(data.address);
  const { handleApprove, isPending: isPendingApprove } = useApproveMinter(
    data.address,
  );
  const { onCopy, hasCopied } = useClipboard("");

  return (
    <Flex gap={2} justifyContent={"center"} alignItems={"center"}>
      <IconButton onClick={() => onCopy(data?.address)} aria-label={"Approve"}>
        {hasCopied ? <RiCheckLine /> : <RiClipboardLine />}
      </IconButton>
      <Text>{shortenAddress(data?.address)}</Text>
      {data?.name && <Text>({data?.name})</Text>}

      <Flex gap={2}>
        <IconButton
          onClick={() => handleApprove()}
          isLoading={isPending || isPendingApprove}
          aria-label={"Approve"}
        >
          <RiCheckLine />
        </IconButton>
        <IconButton
          onClick={() => mutate()}
          isLoading={isPending || isPendingApprove}
          aria-label={"Decline"}
        >
          <RiCloseLine />
        </IconButton>
      </Flex>
    </Flex>
  );
};
