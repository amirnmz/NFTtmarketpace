import {
  Flex,
  IconButton,
  Input,
  Text,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import { RiCheckLine, RiClipboardLine, RiCloseLine } from "react-icons/ri";
import { useDeclinePerson } from "@/hooks/api/useDeclinePerson";
import { useApproveMinter } from "@/hooks/useApproveMinter";
import { shortenAddress } from "thirdweb/utils";
import { useApproveMarketer } from "@/hooks/useApproveMarketer";
import { useState } from "react";

type propsType = {
  data: ContractAuth;
};

export const ApproveMarketerCard = ({ data }: propsType) => {
  const { mutate, isPending } = useDeclinePerson(data.address);
  const [fraction, setFraction] = useState(1);
  const { handleApprove, isPending: isPendingApprove } = useApproveMarketer(
    data.address,
    fraction,
  );
  const { onCopy, hasCopied } = useClipboard("");
  const toast = useToast();

  return (
    <Flex gap={2} justifyContent={"center"} alignItems={"center"}>
      <IconButton onClick={() => onCopy(data?.address)} aria-label={"Approve"}>
        {hasCopied ? <RiCheckLine /> : <RiClipboardLine />}
      </IconButton>
      <Text>{shortenAddress(data?.address)}</Text>
      {data?.name && <Text>({data?.name})</Text>}
      <Flex gap={2}>
        <Input
          type={"number"}
          value={fraction}
          onChange={(e) => setFraction(+e.target.value)}
        />
        <IconButton
          onClick={() => {
            if (fraction < 90) {
              handleApprove();
            } else {
              toast({
                title: "Error",
                description: "Fraction must be less than 90%",
                status: "error",
                duration: 5000,
              });
            }
          }}
          isLoading={isPending || isPendingApprove}
          aria-label={"Approve"}
        >
          <RiCheckLine />
        </IconButton>
        <IconButton
          onClick={() => {
            mutate();
          }}
          isLoading={isPending || isPendingApprove}
          aria-label={"Decline"}
        >
          <RiCloseLine />
        </IconButton>
      </Flex>
    </Flex>
  );
};
