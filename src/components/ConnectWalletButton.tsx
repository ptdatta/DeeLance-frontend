import { useDisconnect, useWeb3ModalAccount } from "@web3modal/ethers/react";
import Button from "./Button";
import { MdAccountBalanceWallet } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";

export default function ConnectWalletButton({ children, ...props }: any) {
  const { t } = useTranslation();
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { disconnect } = useDisconnect();
  const w3mButtonRef = useRef<HTMLElement>(null);

  const handleClick = () => {
    if (isConnected) {
      disconnect();
    }
  };

  useEffect(() => {
    if (w3mButtonRef.current) {
      const w3mButtonElement = (
        w3mButtonRef.current as HTMLElement
      ).shadowRoot?.querySelector("button");
      if (w3mButtonElement) {
        w3mButtonElement.style.padding = "0.5rem 1rem";
        w3mButtonElement.style.backgroundColor = "#06a551";
        w3mButtonElement.style.color = "white";
        w3mButtonElement.style.borderRadius = "0.375rem";
        w3mButtonElement.style.display = "flex";
        w3mButtonElement.style.alignItems = "center";
      }
    }
  }, [w3mButtonRef]);

  return (
    <>
      {!isConnected ? (
        <div ref={w3mButtonRef as any}>
          <w3m-button />
        </div>
      ) : (
        <Button
          onClick={handleClick}
          startIcon={
            isConnected ? (
              <MdAccountBalanceWallet className="text-[1.4em]" />
            ) : null
          }
          {...props}
        >
          {t("Disconnect")}
        </Button>
      )}
    </>
  );
}
