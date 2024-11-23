type BaseEntity = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
};
type User = BaseEntity & {
  wallet_address: string;

  nickname: string;

  role: RoleEnum;
};

type NFT = BaseEntity & {
  nft_id: number;

  uri: string;

  owner_wallet: string;

  block_number: number;

  is_listed: boolean;

  price: string;
};

enum ContractAuthEnum {
  MARKETER = "MARKETER",
  MINTER = "MINTER",
}

type ContractAuth = BaseEntity & {
  address: string;

  name: string;

  block_number: number;

  type: ContractAuthEnum;

  has_approved: boolean;
};

type PaginationType = {
  currentPage: number;
  nextPage: number;
  prevPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  lastPage: number;
  count: number;
  take: number;
};

type PaginationTypeFront = {
  activePage: number;
  totalPages: number;
  setPage: (pageNumber: number) => void;
  setTotal: (total: number) => void;
  next: () => void;
  previous: () => void;
  first: () => void;
};

type BulkData<T> = {
  result: T[];
  pagination: PaginationType;
};
type IPFSData = {
  name: string;
  description: string;
  image: string;
};
