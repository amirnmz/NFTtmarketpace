type BaseEntity = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
};
interface ExpressFile {
  /** Name of the form field associated with this file. */
  fieldname: string;
  /** Name of the file on the uploader's computer. */
  originalname: string;
  /**
   * Value of the `Content-Transfer-Encoding` header for this file.
   * @deprecated since July 2015
   * @see RFC 7578, Section 4.7
   */
  encoding: string;
  /** Value of the `Content-Type` header for this file. */
  mimetype: string;
  /** Size of the file in bytes. */
  size: number;
  /**
   * A readable stream of this file. Only available to the `_handleFile`
   * callback for custom `StorageEngine`s.
   */
  stream: Readable;
  /** `DiskStorage` only: Directory to which this file has been uploaded. */
  destination: string;
  /** `DiskStorage` only: Name of this file within `destination`. */
  filename: string;
  /** `DiskStorage` only: Full path to the uploaded file. */
  path: string;
  /** `MemoryStorage` only: A Buffer containing the entire file. */
  buffer: Buffer;
}
type User = BaseEntity & {
  wallet_address: string;

  nickname: string;

  role: RoleEnum;

  minter_proof: ExpressFile;

  marketer_proof: ExpressFile;
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

  user: User;

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
