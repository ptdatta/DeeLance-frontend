import axios from "@/api/axios";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useMutation, useQuery } from "@tanstack/react-query";
import numeral from "numeral";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { ethers, parseUnits, formatUnits, Interface } from "ethers";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { BrowserProvider, Contract } from "ethers";
import { platformContract } from "@/utils/config";
import { useWeb3Modal } from "@web3modal/ethers/react";

function OrderPayment() {
  const { address, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { open, close } = useWeb3Modal();

  const { taskId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data, isLoading } = useQuery({
    queryKey: ["tasks", taskId],
    queryFn: async () => {
      const res = await axios.get(`/task/${taskId}`);
      return res.data.data;
    },
  });

  console.log(data);

  const { mutate: initializeOrder, isLoading: isInitializingOrder } =
    useMutation({
      mutationFn: async ({
        gigId,
        initialTransactionHash,
        BlockchainGigId,
      }) => {
        const res = await axiosPrivate.post("/order/initialize", {
          gigId,
          initialTransactionHash,
          BlockchainGigId,
        });
        console.log("Order initialized: ", res.data);

        toast({
          title: "Order Created",
          description: res.data.message,
        });

        navigate("/my-orders");
        return res.data;
      },
    });

  function convertDaysToSeconds(days) {
    return days * 24 * 60 * 60;
  }
  const handleRequest = async () => {
    if (!isConnected) {
      toast({
        title: "Connect Your Wallet",
        description: "Connect your wallet and Try again!",
        variant: "destructive",
      });
      return;
    }

    if (!data?.userId?.wallet) {
      toast({
        title: "Invalid Seller",
        description: "Seller wallet address is not available",
        variant: "destructive",
      });
      return;
    }

    try {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();
      const contract = new Contract(
        platformContract.address,
        platformContract.abi,
        signer
      );
      console.log("after ethers provider");

      const priceInWei = parseUnits("0.0001", "ether");

      const tx = await contract.createGig(
        data.userId.wallet,
        convertDaysToSeconds(data.deliveryDays),
        data.revision,
        {
          value: priceInWei,
        }
      );
      const receipt = await tx.wait();
      console.log(receipt);

      const eventInterface = new Interface(platformContract.abi);
      const decodedLogs = receipt.logs
        .map((log) => {
          try {
            return eventInterface.parseLog(log);
          } catch (e) {
            return null;
          }
        })
        .filter((log) => log !== null);

      console.log("Decoded Logs: ", decodedLogs);

      const gigCreatedEvent = decodedLogs.find(
        (event) => event.name === "GigCreated"
      );

      const gigId = gigCreatedEvent.args.gigId;
      console.log(gigId);
      toast({
        title: "Transaction Successful",
        description: `Transaction hash: ${receipt.transactionHash}`,
      });

      initializeOrder({
        gigId: data._id,
        initialTransactionHash: receipt.hash,
        BlockchainGigId: Number(gigId),
      });
      toast({
        title: "Ordered successfully",
        description: "Connect your wallet and Try again!",
      });
    } catch (error: any) {
      console.error("Transaction error:", error);
      toast({
        title: "Transaction Failed",
        description: error.message || "Something went wrong, please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container-wrapper">
        <Card className="space-y-4 p-8 max-w-[26rem] mx-auto w-full">
          <Skeleton className="aspect-[1.66/1] rounded-md relative overflow-hidden" />

          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />

          <br />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-4" />
        </Card>
      </div>
    );
  }

  return (
    <div className="container-wrapper">
      <Card className="p-8 max-w-[26rem] mx-auto w-full">
        <div className="aspect-[1.66/1] rounded-md relative overflow-hidden">
          <img
            src={data.images[0].url}
            className="absolute top-0 left-0 object-cover w-full h-full"
            alt=""
          />
        </div>
        <h1 className="truncate mt-2.5 text-lg mb-3">{data.title}</h1>

        <Separator className="my-4 opacity-10" />

        <div className="flex items-center justify-between my-4 opacity-80">
          <p>Service fee</p>
          <p>1 USD</p>
        </div>

        <Separator className="my-4 opacity-10" />

        <div className="flex items-center justify-between">
          <p className="text-xl font-medium opacity-80">Total</p>

          <p className="text-xl font-bold opacity-80">
            {numeral(data.price).format("$0,0")} Price
          </p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <p className="text-base font-medium opacity-70">
            Total Delivery Days
          </p>

          <p className="text-base font-medium opacity-70">
            {data.deliveryDays} days
          </p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <p className="text-base font-medium opacity-70">Total Rivisions</p>

          <p className="text-base font-medium opacity-70">
            <p>{data.revision} Revisions</p>
          </p>
        </div>
        {isConnected ? (
          <Button
            onClick={() => handleRequest()}
            className="w-full mt-4"
            disabled={isInitializingOrder}
          >
            <span>Confirm & Pay</span>
            <span className="flex w-4 h-4 ml-3">
              {!isInitializingOrder ? (
                <FaAngleRight className="w-full h-full" />
              ) : (
                <Loader.CircularSnake color="white" className="w-full h-full" />
              )}
            </span>
          </Button>
        ) : (
          <w3m-button />
        )}

        <p className="mt-4 text-center opacity-80">
          You will be charged {numeral(data.price).format("$0,0")} USD.
        </p>
      </Card>
    </div>
  );
}

export default OrderPayment;
