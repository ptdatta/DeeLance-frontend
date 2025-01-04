import { DeelancePlatformABI } from "../../contracts/abi.json";

const ChainConfig = {
  deelance: {
    testnet: {
      id: 45510,
      chainId: "0xb1c6",
      name: "Deelance",
      network: "Deelance Testnet",
      nativeCurrency: {
        decimals: 18,
        name: "DEE",
        symbol: "DEE",
      },
      rpcUrls: ["https://rpc.deelance.com"],
      blockExplorers: ["https://deescan.com/"],
      PlatformContract: {
        address: "0x6Cf9D9E6DC072CA2e068A4BADaf7BC614ECdC010",
        abi: DeelancePlatformABI,
      },
    },
    mainnet: {
      id: 45510,
      chainId: "0xb1c6",
      name: "Deelance",
      network: "Deelance Mainnet",
      nativeCurrency: {
        decimals: 18,
        name: "DEE",
        symbol: "DEE",
      },
      rpcUrls: ["https://rpc.deelance.com"],
      blockExplorers: ["https://deescan.com/"],
      PlatformContract: {
        address: "0x6Cf9D9E6DC072CA2e068A4BADaf7BC614ECdC010",
        abi: DeelancePlatformABI,
      },
    },
  },
};

export const chainConfig = ChainConfig.deelance.mainnet;
export const platformContract = chainConfig.PlatformContract;
