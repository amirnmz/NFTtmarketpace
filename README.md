

### 2. Install the dependencies
```bash
# npm
npm install

# yarn
yarn

# pnpm
pnpm install
```

### 3. Set up environment variables
Create a file called `.env.local` (at the root level of your project) with the following content:
```
NEXT_PUBLIC_TW_CLIENT_ID="<your-thirdweb-client-id"
```
Don't have a thirdweb clientId? [Grab one now](https://thirdweb.com/dashboard/settings/api-keys). Make sure you set up the `Allowed Domains` properly. [Learn how](https://portal.thirdweb.com/account/api-keys)

### 4. You're set
You can now run the template in your local machine.
```bash
# npm
npm run dev

# yarn
yarn dev

# pnpm
pnpm dev
```

## Customize your marketplace

### 1. Supported networks
This template allows you to build a marketplace that can handle multiple NFT collections from multiple networks. For each network you want to support, you need to deploy a [MarketplaceV3 contract](https://thirdweb.com/thirdweb.eth/MarketplaceV3) on that network.

To add a chain (network) to your marketplace, head to the file [`./src/consts/chains.ts`](./src/consts/chains.ts) and add that chain to the export array:
```typescript
export { ethereum, bsc } from "thirdweb/chains";
```
[Learn more about thirdweb Chains](https://portal.thirdweb.com/typescript/v5/chain)

If the chain you are looking is not in our [default list](https://portal.thirdweb.com/references/typescript/v5/variables), you can define your own chain using the `defineChain` method:

```typescript
// chain.ts
import { defineChain, ethereum, bsc } from "thirdweb/chains";

const yourChainId = 4747;
const yourCustomChain = defineChain(yourChainId);

export { ethereum, bsc, yourCustomChain }
```

### 2. Supported marketplaces

Once the marketplace contract deployment's completed, you need to put the MarketplaceV3 contract address and its respective chain in the file [`/src/consts/marketplace_contracts.ts`](/src/consts/marketplace_contract.ts)

Example:
```typescript
import { yourCustomChain, ethereum } from "./chains";

export const MARKETPLACE_CONTRACTS: MarketplaceContract[] = [
  {
    address: "your-marketplace-contrac-address-on-the-custom-chain",
    chain: yourCustomChain,
  },
  {
    address: "your-marketplace-contrac-address-on-ethereum",
    chain: ethereum,
  },
  // ... add more here
];
```

### 3. Supported payment currencies

thirdweb's MarketplaceV3 contract allows you to buy and sell NFTs in multiple currencies (ERC20 tokens) rather than just the native tokens like ETH, AVAX, MATIC etc.

If you want to support (or restrict) a only a few selected currencies for your marketplace, you need to do that via thirdweb Dashboard > you marketplace contract > Permission > Asset.

Once that is done, head over to the file [`./src/consts/supported_tokens.ts`](./src/consts/supported_tokens.ts) and fill in some basic info of those tokens that you aim to support. For example, the code below will add a dropdown to the UI for USDC and USDT, on the Avalanche Fuji network:

```typescript
export const SUPPORTED_TOKENS: SupportedTokens[] = [
  {
    chain: avalancheFuji,
    tokens: [
      {
        tokenAddress: "0x5425890298aed601595a70ab815c96711a31bc65",
        symbol: "USDC",
        icon: "/erc20-icons/usdc.png",
      },
      {
        tokenAddress: "0x82dcec6aa3c8bfe2c96d40d8805ee0da15708643",
        symbol: "USDT",
        icon: "/erc20-icons/usdt.png",
      },
      // Add more ERC20 here...
    ],
  },
]
```
You have to prepare your own icon assets for each token in this list.

## Support

For help or feedback, please [visit our support site](https://thirdweb.com/support)

## Additional Resources

- [Documentation](https://portal.thirdweb.com/typescript/v5)

## Security

If you believe you have found a security vulnerability in any of our packages, we kindly ask you not to open a public issue; and to disclose this to us by emailing `security@thirdweb.com`.

