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
type BulkData<T> = {
  result: T[];
  pagination: PaginationType;
};
type IPFSData = {
  name: string;
  description: string;
  image: string;
};
