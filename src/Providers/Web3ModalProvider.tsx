// import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
// import { ReactNode } from "react";

// import { WagmiConfig } from "wagmi";
// import { mainnet } from "wagmi/chains";

// // 1. Get projectId
// const projectId = "4ff178b5adf37e8779469102693e824b";

// // 2. Create wagmiConfig
// const metadata = {
//   name: "Web3Modal",
//   description: "Web3Modal Example",
//   url: "https://web3modal.com",
//   icons: ["https://avatars.githubusercontent.com/u/37784886"],
// };

// const chains = [mainnet];
// const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// // 3. Create modal
// createWeb3Modal({ wagmiConfig, projectId, chains });

// export default function Web3ModalProvider({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
// }
