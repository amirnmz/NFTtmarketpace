/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  SportNFTMarketplace,
  SportNFTMarketplaceInterface,
} from "../../contracts/SportNFTMarketplace";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_nftContract",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ReentrancyGuardReentrantCall",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "NFTListed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "NFTSold",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "buyNFT",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "cancelListing",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "listNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "listings",
    outputs: [
      {
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nftContract",
    outputs: [
      {
        internalType: "contract SportNFT",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051610b0b380380610b0b83398101604081905261002f91610059565b6001600055600280546001600160a01b0319166001600160a01b0392909216919091179055610089565b60006020828403121561006b57600080fd5b81516001600160a01b038116811461008257600080fd5b9392505050565b610a73806100986000396000f3fe60806040526004361061004a5760003560e01c8063305a67a81461004f57806351ed82881461007157806394383f1414610084578063d56d229d146100a4578063de74e57b146100e1575b600080fd5b34801561005b57600080fd5b5061006f61006a3660046107ba565b610140565b005b61006f61007f3660046107ba565b61024e565b34801561009057600080fd5b5061006f61009f3660046107d3565b61059f565b3480156100b057600080fd5b506002546100c4906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b3480156100ed57600080fd5b506101216100fc3660046107ba565b600160208190526000918252604090912080549101546001600160a01b039091169082565b604080516001600160a01b0390931683526020830191909152016100d8565b600081815260016020818152604092839020835180850190945280546001600160a01b03168085529201549083015233146101bb5760405162461bcd60e51b81526020600482015260166024820152752cb7ba9030b932903737ba103a34329039b2b63632b960511b60448201526064015b60405180910390fd5b600082815260016020819052604080832080546001600160a01b03191681559091019190915560025490516323b872dd60e01b8152306004820152336024820152604481018490526001600160a01b03909116906323b872dd90606401600060405180830381600087803b15801561023257600080fd5b505af1158015610246573d6000803e3d6000fd5b505050505050565b610256610790565b600081815260016020818152604092839020835180850190945280546001600160a01b03168452909101549082018190526102d35760405162461bcd60e51b815260206004820152601760248201527f4e4654206e6f74206c697374656420666f722073616c6500000000000000000060448201526064016101b2565b806020015134101561031e5760405162461bcd60e51b8152602060048201526014602482015273125b9cdd59999a58da595b9d081c185e5b595b9d60621b60448201526064016101b2565b600082815260016020818152604080842080546001600160a01b031916815590920183905560025490840151915163152a902d60e11b815260048101869052602481019290925282916001600160a01b0390911690632a55205a90604401600060405180830381865afa158015610399573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526103c191908101906108e7565b9150915060005b825181101561044f578281815181106103e3576103e36109aa565b60200260200101516001600160a01b03166108fc838381518110610409576104096109aa565b60200260200101519081150290604051600060405180830381858888f1935050505015801561043c573d6000803e3d6000fd5b5080610447816109d6565b9150506103c8565b50600081600181518110610465576104656109aa565b602002602001015182600081518110610480576104806109aa565b602002602001015161049291906109ef565b84602001516104a19190610a08565b84516040519192506001600160a01b03169082156108fc029083906000818181858888f193505050501580156104db573d6000803e3d6000fd5b506002546040516323b872dd60e01b8152306004820152336024820152604481018790526001600160a01b03909116906323b872dd90606401600060405180830381600087803b15801561052e57600080fd5b505af1158015610542573d6000803e3d6000fd5b50505050336001600160a01b0316857f6329e40c0365262ebbff5ca819385c2b9713dcaa050ed07866d72c441395699a866020015160405161058691815260200190565b60405180910390a35050505061059c6001600055565b50565b6002546040516331a9108f60e11b81526004810184905233916001600160a01b031690636352211e90602401602060405180830381865afa1580156105e8573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061060c9190610a1b565b6001600160a01b03161461065a5760405162461bcd60e51b81526020600482015260156024820152742cb7ba9030b932903737ba103a34329037bbb732b960591b60448201526064016101b2565b600081116106aa5760405162461bcd60e51b815260206004820152601f60248201527f5072696365206d7573742062652067726561746572207468616e207a65726f0060448201526064016101b2565b6040805180820182523380825260208083018581526000878152600192839052859020935184546001600160a01b0319166001600160a01b039182161785559051939091019290925560025492516323b872dd60e01b81526004810191909152306024820152604481018590529116906323b872dd90606401600060405180830381600087803b15801561073d57600080fd5b505af1158015610751573d6000803e3d6000fd5b50506040518381523392508491507f5f9c03de076f5063cd3ebcfe8ef7aa8af378e4b35a83c77ba9777e97083879a29060200160405180910390a35050565b6002600054036107b357604051633ee5aeb560e01b815260040160405180910390fd5b6002600055565b6000602082840312156107cc57600080fd5b5035919050565b600080604083850312156107e657600080fd5b50508035926020909101359150565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715610834576108346107f5565b604052919050565b600067ffffffffffffffff821115610856576108566107f5565b5060051b60200190565b80516001600160a01b038116811461087757600080fd5b919050565b600082601f83011261088d57600080fd5b815160206108a261089d8361083c565b61080b565b82815260059290921b840181019181810190868411156108c157600080fd5b8286015b848110156108dc57805183529183019183016108c5565b509695505050505050565b600080604083850312156108fa57600080fd5b825167ffffffffffffffff8082111561091257600080fd5b818501915085601f83011261092657600080fd5b8151602061093661089d8361083c565b82815260059290921b8401810191818101908984111561095557600080fd5b948201945b8386101561097a5761096b86610860565b8252948201949082019061095a565b9188015191965090935050508082111561099357600080fd5b506109a08582860161087c565b9150509250929050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b6000600182016109e8576109e86109c0565b5060010190565b80820180821115610a0257610a026109c0565b92915050565b81810381811115610a0257610a026109c0565b600060208284031215610a2d57600080fd5b610a3682610860565b939250505056fea264697066735822122034a84d97f79fbac8dbddcf48210b63d3aba69e61baeb19e37069e5882b636a1664736f6c63430008140033";

type SportNFTMarketplaceConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SportNFTMarketplaceConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SportNFTMarketplace__factory extends ContractFactory {
  constructor(...args: SportNFTMarketplaceConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _nftContract: string,
    overrides?: Overrides & { from?: string }
  ): Promise<SportNFTMarketplace> {
    return super.deploy(
      _nftContract,
      overrides || {}
    ) as Promise<SportNFTMarketplace>;
  }
  override getDeployTransaction(
    _nftContract: string,
    overrides?: Overrides & { from?: string }
  ): TransactionRequest {
    return super.getDeployTransaction(_nftContract, overrides || {});
  }
  override attach(address: string): SportNFTMarketplace {
    return super.attach(address) as SportNFTMarketplace;
  }
  override connect(signer: Signer): SportNFTMarketplace__factory {
    return super.connect(signer) as SportNFTMarketplace__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SportNFTMarketplaceInterface {
    return new utils.Interface(_abi) as SportNFTMarketplaceInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SportNFTMarketplace {
    return new Contract(address, _abi, signerOrProvider) as SportNFTMarketplace;
  }
}