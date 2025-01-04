import React from "react";
import Loader from "@/components/Loader";
import { toast } from "@/components/ui/use-toast";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useMutation, useQuery } from "@tanstack/react-query";
import Button from "components/Button";
import Paper from "components/Paper";
import Typography from "components/Typography";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BrowserProvider, Contract } from "ethers";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
  useSwitchNetwork,
} from "@web3modal/ethers/react";
import { platformContract, chainConfig } from "utils/config";

function ConfirmTransaction() {
  const [searchParams] = useSearchParams();
  const taskId = searchParams.get("taskId");
  const axiosPrivate = useAxiosPrivate();
  const { data: user } = useQuery<any>({ queryKey: ["user"], enabled: false });
  const navigate = useNavigate();
  const { refetch: refetchTask } = useQuery({
    queryKey: ["edit task", taskId],
    enabled: false,
  });

  const { address, isConnected, chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { switchNetwork } = useSwitchNetwork();

  const { mutate: updateTxStatus, isLoading: isUpdatingTxStatus } = useMutation(
    {
      mutationFn: async ({ txStatus }: { txStatus: "success" | "failed" }) => {
        const response = await axiosPrivate.post("/set-task-init-tx-status", {
          blockchainCreationStatus: txStatus,
          taskId,
        });
        await refetchTask();
        return response.data;
      },
      onSuccess: (data) => {
        const updatedTask: any = data.data;
        const isTxFailed = updatedTask.blockchainCreationStatus === "failed";

        toast({
          title: `Transaction ${isTxFailed ? "Failed" : "Successful"}`,
          description: isTxFailed
            ? "Please try again"
            : "Your gig is on blockchain now",
        });

        navigate(`/profile/${user._id}/tasks`);
      },
    }
  );

  const handleCreateJob = async () => {
    if (!isConnected) {
      toast({
        title: "Connect Wallet",
        description: "Wallet not Connected",
        variant: "destructive",
      });
      return;
    }

    if (chainId !== chainConfig.id) {
      switchNetwork(chainConfig.id);
    }

    console.log(platformContract.address);

    try {
      // const ethersProvider = new BrowserProvider(walletProvider);
      // const signer = await ethersProvider.getSigner();
      // const contract = new Contract(
      //   platformContract.address,
      //   platformContract.abi,
      //   signer
      // );

      // const overrides = {
      //   value: "1000", // Amount of ether to send
      // };

      // const tx = await contract.createJob(address, "600", "3", overrides);
      // await tx.wait();

      // Update status as success
      updateTxStatus({ txStatus: "success" });
    } catch (error) {
      console.error("Blockchain transaction failed:", error);

      // Update status as failed
      updateTxStatus({ txStatus: "failed" });
    }
  };

  return (
    <Paper className="relative space-y-10 overflow-hidden">
      <div className="py-10">
        <Typography
          variant="3xl"
          className="mb-3 font-bold text-center opacity-80"
        >
          You are almost There!
        </Typography>

        <div className="flex items-center justify-center mt-8 space-x-4">
          <Button
            type="button"
            disabled={isUpdatingTxStatus}
            onClick={handleCreateJob}
          >
            <span>Confirm Gig</span>
            {isUpdatingTxStatus ? (
              <Loader.CircularSnake color="white" className="w-4 h-4 ml-2" />
            ) : null}
          </Button>
        </div>
      </div>
    </Paper>
  );
}

export default ConfirmTransaction;
