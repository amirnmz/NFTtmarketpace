"use client";
import { HStack, IconButton, Text } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePrevious: () => void;
  handleNext: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  handlePrevious,
  handleNext,
}) => {
  return (
    <HStack spacing={2} justify="center" mt={4}>
      <IconButton
        icon={<FaChevronLeft />}
        aria-label="Previous Page"
        onClick={handlePrevious}
        isDisabled={currentPage === 1}
      />
      <Text>
        Page {currentPage} of {totalPages}
      </Text>
      <IconButton
        icon={<FaChevronRight />}
        aria-label="Next Page"
        onClick={handleNext}
        isDisabled={currentPage === totalPages}
      />
    </HStack>
  );
};

export default Pagination;
