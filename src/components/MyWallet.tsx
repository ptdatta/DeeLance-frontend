import { useEffect, useState, useRef } from "react";
import { Contract, formatUnits, getDefaultProvider } from "ethers";

import { BsKey } from "react-icons/bs";
// import { useAccount, useBalance, useContractReads } from "wagmi";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";

import contractAbi from "config/contract-abi.json";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./Tooltip";
import Button from "./Button";
import ConnectWalletButton from "./ConnectWalletButton";
import CopyToClipboardButton from "./CopyToClipboardButton";
import Typography from "./Typography";

function NftCard({ text, img }) {
  return (
    <div>
      <img src={img} className="w-full" alt="" />
      <Typography className="mt-2 text-center">{text}</Typography>
    </div>
  );
}

function MyWallet() {
  const { t } = useTranslation();
  const { address, isConnected } = useWeb3ModalAccount();
  // const { data } = useBalance({ address });
  const [ethPrice, setEthPrice] = useState("");
  const effectRan = useRef(false);
  // const { data: balanceOfNfts, isFetching } = useContractReads({
  //   enabled: address,
  //   contracts: [
  //     {
  //       abi: contractAbi,
  //       address: "0x490Fa9Dc69D05e754EE8a9615cb7ad781A51cB36",
  //       functionName: "balanceOf",
  //       args: ["0xb7f5D500a33B199d20a22b6e93c73f8dCbac5EA9", 0],
  //     },
  //     {
  //       abi: contractAbi,
  //       address: "0x490Fa9Dc69D05e754EE8a9615cb7ad781A51cB36",
  //       functionName: "balanceOf",
  //       args: ["0xb7f5D500a33B199d20a22b6e93c73f8dCbac5EA9", 1],
  //     },
  //     {
  //       abi: contractAbi,
  //       address: "0x490Fa9Dc69D05e754EE8a9615cb7ad781A51cB36",
  //       functionName: "balanceOf",
  //       args: ["0xb7f5D500a33B199d20a22b6e93c73f8dCbac5EA9", 2],
  //     },
  //   ],
  // });
  const { walletProvider } = useWeb3ModalProvider();
  const [ethBalance, setEthBalance] = useState("");
  const [nftBalances, setNftBalances] = useState(["0", "0", "0"]);
  const [loading, setLoading] = useState(false);

  async function getBalance() {
    setLoading(true);
    // const ethersProvider = new BrowserProvider(walletProvider);
    const ethersProvider = getDefaultProvider(
      "https://eth-mainnet.public.blastapi.io"
    );
    // const signer = await ethersProvider.getSigner();

    const balanceETH = await ethersProvider.getBalance(address);
    console.log(balanceETH, "balanceETH");
    setEthBalance(formatUnits(balanceETH, 18));

    // The Contract object
    const DeeContract = new Contract(
      "0x490Fa9Dc69D05e754EE8a9615cb7ad781A51cB36",
      contractAbi,
      ethersProvider
    );
    const balanceOfNfts0 = await DeeContract.balanceOf(address, 0);
    const balanceOfNfts1 = await DeeContract.balanceOf(address, 1);
    const balanceOfNfts2 = await DeeContract.balanceOf(address, 2);
    console.log(balanceOfNfts0, "balanceOfNfts0");

    setNftBalances([
      formatUnits(balanceOfNfts0, 0),
      formatUnits(balanceOfNfts1, 0),
      formatUnits(balanceOfNfts2, 0),
    ]);
    setLoading(false);
  }

  useEffect(() => {
    if (effectRan.current || import.meta.env.MODE !== "development") {
      axios
        .get(
          "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=YourApiKeyToken"
        )
        .then((res) => {
          setEthPrice(Number(res.data.result.ethusd).toFixed(2));
        });

      if (isConnected && address) {
        getBalance();
      }
    }

    return () => {
      effectRan.current = true;
    };
  }, [isConnected, address]);

  return (
    <div>
      <Typography className="font-bold mb-7">{t("My Wallet")}</Typography>

      {isConnected ? (
        <div className="grid grid-cols-[auto_1fr_auto] gap-4 items-center mb-5">
          <div>
            <BsKey className="flex text-3xl" />
          </div>
          <Typography
            variant="sm"
            className="w-full min-w-full px-2 py-1 overflow-hidden rounded-lg text-black/60 dark:text-white/60 bg-woodsmoke-200 dark:bg-woodsmoke-700 text-ellipsis"
          >
            {address}
          </Typography>

          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <CopyToClipboardButton
                    className="flex justify-end text-xl"
                    text={address}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent sideOffset={10}>Copy Address</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ) : null}

      <div className="grid justify-between grid-cols-2 px-4 py-2 rounded-md bg-woodsmoke-100 dark:bg-woodsmoke-950 gap-y-2 mb-7">
        <Typography>$ETH {t("Price")}:</Typography>
        <Typography className="text-right text-black/60 dark:text-white/60">
          = ${ethPrice} USD
        </Typography>

        {isConnected && ethPrice ? (
          <>
            <Typography>{t("Your Balance:")}</Typography>
            <Typography className="text-right text-black/60 dark:text-white/60">
              {ethBalance} ETH
            </Typography>
          </>
        ) : null}
      </div>

      {address ? (
        <>
          <Typography className="mb-5 font-bold">{t("Your NFT's")}</Typography>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <NftCard
              img="/images/nfts/general.png"
              text={loading ? "loading..." : Number(nftBalances[0])}
            />
            <NftCard
              img="/images/nfts/premium.png"
              text={loading ? "loading..." : Number(nftBalances[1])}
            />
            <NftCard
              img="/images/nfts/pro.png"
              text={loading ? "loading..." : Number(nftBalances[2])}
            />
          </div>
        </>
      ) : null}

      {/* <Button
          className="flex h-auto p-0 mx-auto w-fit text-green-haze-600"
          variant="simple"
        >
          Disconnect your wallet
        </Button> */}

      <div className="grid grid-cols-2 gap-4">
        <ConnectWalletButton className="flex-1">
          {t("Connect Wallet")}
        </ConnectWalletButton>

        <Button
          as="a"
          target="_blank"
          href="https://nft.deelance.com"
          variant="outlined"
          className="flex-1"
        >
          {t("Buy NFT's")}
        </Button>
      </div>
    </div>
  );
}
export default MyWallet;
