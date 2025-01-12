import CopyToClipboardButton from "@/components/CopyToClipboardButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogCloseIcon,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { OrderType } from "@/types/order.types";
import { TaskType } from "@/types/task.type";
import { IUser } from "@/types/user.types";
import { queryKeys } from "@/utils";
import { orderStatusLabels } from "@/utils/constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import Typography from "components/Typography";
import numeral from "numeral";
import { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Textarea from "@/components/Textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import Loader from "@/components/Loader";
import { AxiosError } from "axios";
import {
  ethers,
  parseUnits,
  formatUnits,
  BrowserProvider,
  Contract,
} from "ethers";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
  useWeb3Modal,
} from "@web3modal/ethers/react";
import { platformContract } from "@/utils/config";

const FormSchema = z.object({
  reason: z
    .string({ message: "Reason is required" })
    .min(20, {
      message: "Reason must be at least 20 characters.",
    })
    .max(160, {
      message: "Reason must not be longer than 30 characters.",
    }),
});

const Row = ({
  total,
  initialTransactionHash,
  clientId,
  gigId,
  BlockchainGigId,
  freelancerId,
  _id,
  currentTab,
  status,
  reasonForDecline,
  revision,
}: OrderType & { currentTab: keyof typeof orderStatusLabels }) => {
  const { data: user } = useQuery<IUser>({ queryKey: ["user"] });
  const gig = gigId as TaskType;
  const freelancer = freelancerId as unknown as IUser;
  const client = clientId as unknown as IUser;
  const freelancerOrClient =
    user?.accountType === "FREELANCER" ? client : freelancer;
  const axiosPrivate = useAxiosPrivate();
  const [reasonModalOpen, setReasonModal] = useState<boolean>(false);

  const { address, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [isApproving, setIsApproving] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { refetch: refetchOrders } = useQuery({
    queryKey: [queryKeys.orders.getOrders, user?._id, currentTab],
    enabled: false,
  });

  const {
    mutate: declineOrWithdrawOrder,
    isLoading: isDecliningOrWithdrawingOrder,
  } = useMutation({
    mutationFn: async ({
      reasonForDecline: reason,
    }: {
      reasonForDecline?: string;
    }) => {
      const type = user?.accountType === "FREELANCER" ? "decline" : "withdraw";

      if (type === "withdraw") {
        try {
          if (!isConnected) {
            toast({
              title: "Connect Your Wallet",
              description: "Connect your wallet and try again!",
              variant: "destructive",
            });
            return;
          }

          const ethersProvider = new BrowserProvider(walletProvider);
          const signer = await ethersProvider.getSigner();
          const contract = new Contract(
            platformContract.address,
            platformContract.abi,
            signer
          );

          console.log("Calling withdrawGig with gigId: ", _id, BlockchainGigId);
          const tx = await contract.withdrawGig(BlockchainGigId);
          console.log("Transaction object: ", tx);
          const receipt = await tx.wait();
          console.log("Transaction Receipt: ", receipt);

          console.log("Calling backend API to update order status");
          const apiResponse = await axiosPrivate.patch(
            `/order/${_id}/${type}`,
            {},
            {
              withCredentials: true,
            }
          );
          console.log("API response: ", apiResponse);

          toast({
            title: "Order withdrawn successfully",
            // description: `Transaction hash: ${receipt.transactionHash}`,
          });

          await refetchOrders();
        } catch (error) {
          console.error("Error in withdrawal process: ", error);
          toast({
            title: "Transaction Failed",
            description:
              error.message || "Something went wrong, please try again.",
            variant: "destructive",
          });
          throw error;
        }
      } else {
        try {
          if (!isConnected) {
            toast({
              title: "Connect Your Wallet",
              description: "Connect your wallet and try again!",
              variant: "destructive",
            });
            return;
          }
          const ethersProvider = new BrowserProvider(walletProvider);
          const signer = await ethersProvider.getSigner();
          const contract = new Contract(
            platformContract.address,
            platformContract.abi,
            signer
          );

          console.log(
            "Calling decline with BlockchainGigId: ",
            BlockchainGigId
          );

          const tx = await contract.rejectGig(BlockchainGigId);
          const receipt = await tx.wait();
          console.log("Transaction Receipt: ", receipt);

          console.log("Calling backend API to update gig decline status");
          const response = await axiosPrivate.patch(`/order/${_id}/${type}`, {
            reasonForDecline: reason,
          });
          console.log("Decline response: ", response);

          toast({
            title: "Order declined",
          });

          await refetchOrders();
        } catch (error) {
          console.error("Error in declining process: ", error);
          if (error instanceof AxiosError && error.response?.data.errors) {
            form.setError("reason", {
              message: error.response?.data.errors[0].msg,
            });
          }
        }
      }
    },
    onError(error) {
      console.error("Mutation onError: ", error);
      if (error instanceof AxiosError) {
        if (error.response?.data.errors) {
          form.setError("reason", {
            message: error.response?.data.errors[0].msg,
          });
        }
      } else {
        toast({
          title: "Transaction Failed",
          description:
            error.message || "Something went wrong, please try again.",
          variant: "destructive",
        });
      }
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    declineOrWithdrawOrder({ reasonForDecline: data.reason });
  }

  const handleComplete = async () => {
    try {
      const apiResponse = await axiosPrivate.patch(
        `/orders/${_id}/complete`,
        null,
        {
          withCredentials: true,
        }
      );
      console.log("API response from backend:", apiResponse);
    } catch (error) {
      console.error("Error in completing the gig:", error);
      toast({
        title: "Transaction Failed",
        description: error.message || "Something went wrong, please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCompleting(false);
    }
  };

  const handleClientComplete = async () => {
    if (!isConnected) {
      toast({
        title: "Connect Your Wallet",
        description: "Please connect your wallet to complete the gig.",
        variant: "destructive",
      });
      return;
    }
    setIsCompleting(false);
    try {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();
      const contract = new Contract(
        platformContract.address,
        platformContract.abi,
        signer
      );

      console.log("Calling completeGig with BlockchainGigId:", BlockchainGigId);

      const tx = await contract.completeGig(BlockchainGigId);
      const receipt = await tx.wait();
      console.log("Transaction Receipt:", receipt);
      const apiResponse = await axiosPrivate.patch(
        `/order/${_id}/orderDeliverd`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log("API response from backend:", apiResponse);

      toast({
        title: "Gig Completed Successfully",
        description: `Gig with ID: ${BlockchainGigId} has been completed.`,
      });
      await refetchOrders();
    } catch (error) {
      console.error("Error in completing the gig:", error);
      toast({
        title: "Gig Complete Failed",
        description: error.message || "Something went wrong, please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCompleting(false);
    }
  };
  const handleFreelnacerComplete = async () => {
    setIsCompleting(true);
    try {
      console.log("Calling completeGig with BlockchainGigId:", BlockchainGigId);

      const apiResponse = await axiosPrivate.patch(
        `/order/${_id}/ordercomplete`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log("API response from backend:", apiResponse);

      toast({
        title: "Gig Completed Successfully",
        description: `Gig with ID: ${BlockchainGigId} has been completed.`,
      });
      await refetchOrders();
    } catch (error) {
      console.error("Error in completing the gig:", error);
      toast({
        title: "Gig Complete Failed",
        description: error.message || "Something went wrong, please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCompleting(false);
    }
  };

  const handleApprove = async () => {
    if (!isConnected) {
      toast({
        title: "Connect Your Wallet",
        description: "Please connect your wallet to approve the gig.",
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

      console.log("Calling approveGig with BlockchainGigId: ", BlockchainGigId);

      const tx = await contract.approveGig(BlockchainGigId);
      const receipt = await tx.wait();
      console.log("Transaction Receipt: ", receipt);

      console.log("Calling backend API to update gig approval status");
      const apiResponse = await axiosPrivate.patch(
        `/orders/${_id}/approve`,
        {},
        {
          withCredentials: true,
        }
      );

      console.log("API response: ", apiResponse);

      toast({
        title: "Gig Approved Successfully",
        description: `Gig has been approved.`,
      });

      await refetchOrders();
    } catch (error) {
      console.error("Error in approval process: ", error);
      toast({
        title: "Transaction Failed",
        description: error.message || "Something went wrong, please try again.",
        variant: "destructive",
      });
    } finally {
      setIsApproving(false);
    }
  };

  const handleRevision = async () => {
    try {
      const apiResponse = await axiosPrivate.patch(
        `/order/${_id}/orderRevision`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log("API response from backend:", apiResponse);

      toast({
        title: "Revision Requested Successfully",
        description: `Revision requested for Gig with ID: ${BlockchainGigId}.`,
      });

      await refetchOrders();
    } catch (error) {
      console.error("Error in requesting revision:", error);
      toast({
        title: "Revision Request Failed",
        description: error.message || "Something went wrong, please try again.",
        variant: "destructive",
      });
    }
  };

  const renderActions = () => {
    if (status === "completed") {
      if (user?.accountType === "CLIENT") {
        return (
          <Button 
            variant="ghost"
            onClick={() => navigate(`/order/${_id}`)}
            className="flex items-center space-x-2"
          >
            View Details <FaExternalLinkAlt className="ml-2 w-3 h-3" />
          </Button>
        );
      } else if (user?.accountType === "FREELANCER") {
        return <Badge>Waiting for Client</Badge>;
      }
    }
    if (status === "revision") {
      if (user?.accountType === "FREELANCER") {
        return <Button onClick={()=>{navigate(`/order/${_id}`);}}>Re-deliver Work</Button>;
      } else if (user?.accountType === "CLIENT") {
        return <Badge>Revision Requested</Badge>;
      }
    }
    return null;
  };

  const navigate = useNavigate();

  return (
    <>
      <TableRow 
        className={`
          hover:bg-slate-50 transition-colors cursor-pointer
          ${isDecliningOrWithdrawingOrder ? "opacity-60 pointer-events-none" : ""}
        `}
        onClick={() => {
          if (status === "active") {
            navigate(`/order/${_id}`);
          }
        }}
      >
        <TableCell className="font-medium">
          <div className="flex items-center space-x-2 hover:text-green-700">
            <p className="w-[100px] truncate text-sm">{initialTransactionHash}</p>
            <CopyToClipboardButton
              className="flex justify-end text-base hover:scale-105 transition-transform"
              text={initialTransactionHash || ""}
            />
          </div>
        </TableCell>
        <TableCell className="font-medium">
          <Link
            to={`/profile/${freelancerOrClient._id}`}
            target="_blank"
            className="flex items-center space-x-2 group w-fit"
          >
            <Avatar>
              <AvatarImage src={freelancerOrClient.avatar} />
              <AvatarFallback>{freelancerOrClient.UserName[0]}</AvatarFallback>
            </Avatar>

            <span className="group-hover:underline">
              {freelancerOrClient.UserName}{" "}
              <FaExternalLinkAlt className="inline-block w-3 h-3 ml-2 opacity-80" />
            </span>
          </Link>
        </TableCell>
        <TableCell>
          <Link
            to={`/task-preview/${gig._id}`}
            target="_blank"
            className="flex items-center space-x-2 justify-between group w-[12rem]"
          >
            <span className="truncate w-[calc(12rem-14px)] group-hover:underline block">
              {gig?.title}
            </span>
            <FaExternalLinkAlt className="w-3 h-3 opacity-80" />
          </Link>
        </TableCell>
        <TableCell className="font-medium">
          <span className="text-green-700 font-semibold">
            {numeral(total).format("$0,0")}
          </span>
        </TableCell>

        {status === "awaiting-freelancer-approval" ? (
          <>
            <TableCell className="text-center">
              {user?.accountType === "FREELANCER" ? (
                <div className="flex items-center justify-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto px-4 py-2 text-sm hover:text-green-600 hover:bg-green-50 transition-colors rounded-full"
                    onClick={handleApprove}
                    disabled={isApproving}
                  >
                    {isApproving ? <Loader.CircularSnake /> : "Approve"}
                  </Button>

                  <Separator orientation="vertical" className="h-6" />

                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto px-4 py-2 text-sm hover:text-red-600 hover:bg-red-50 transition-colors rounded-full"
                    onClick={() => setReasonModal(true)}
                  >
                    Decline
                  </Button>
                </div>
              ) : (
                <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition-colors">
                  Pending
                </Badge>
              )}
            </TableCell>

            {user?.accountType === "FREELANCER" ? null : (
              <TableCell>
                <Button
                  variant="destructive"
                  size="sm"
                  className="h-auto py-1 text-sm"
                  onClick={() =>
                    declineOrWithdrawOrder({ reasonForDecline: "" })
                  }
                >
                  Withdraw offer
                </Button>
              </TableCell>
            )}
          </>
        ) : null}

        {status === "active" ? (
          <TableCell className="text-center">
            {user?.accountType === "FREELANCER" ? (
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-sm hover:text-green-600"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFreelnacerComplete();
                }}
                disabled={isCompleting}
              >
                {isCompleting ? <Loader.CircularSnake /> : "Complete"}
              </Button>
            ) : (
              <Badge variant="outline" className="text-sm">
                In Progress
              </Badge>
            )}
          </TableCell>
        ) : null}

        {status === "freelancer-declined" ? (
          <TableCell className="text-center">
            <Badge variant="destructive">Declined</Badge>
          </TableCell>
        ) : null}

        {status === "client-withdrawn" ? (
          <TableCell className="text-center">
            <Badge variant="destructive">Withdrawn</Badge>
          </TableCell>
        ) : null}

        {user?.accountType === "CLIENT" &&
        currentTab === "freelancer-declined" &&
        reasonForDecline?.length !== 0 &&
        reasonForDecline ? (
          <TableCell className="text-center">
            <Button
              size="sm"
              className="h-auto py-1 text-sm font-normal rounded-full"
              onClick={() => setReasonModal(true)}
            >
              Reason
            </Button>
          </TableCell>
        ) : (
          <TableCell />
        )}
        <TableCell className="text-center">{renderActions()}</TableCell>
      </TableRow>

      <Dialog
        open={reasonModalOpen}
        onOpenChange={(open) => setReasonModal(open)}
      >
        <DialogContent className="sm:max-w-[425px] p-0">
          <DialogHeader
            variant="bordered"
            className="flex items-center justify-between px-8 mb-6"
          >
            <DialogTitle>Reason for Decline</DialogTitle>
            <DialogCloseIcon />
          </DialogHeader>

          {user?.accountType === "CLIENT" ? (
            <div className="p-8 pt-0">
              <Link
                to={`/profile/${freelancerOrClient._id}`}
                target="_blank"
                className="flex items-center mb-4 space-x-2 group w-fit"
              >
                <Avatar>
                  <AvatarImage src={freelancerOrClient.avatar} />
                  <AvatarFallback>
                    {freelancerOrClient.UserName[0]}
                  </AvatarFallback>
                </Avatar>

                <span>
                  <span className="block group-hover:underline">
                    {freelancerOrClient.UserName}{" "}
                    <FaExternalLinkAlt className="inline-block w-3 h-3 ml-2 opacity-80" />
                  </span>
                  <span className="block text-sm opacity-80">
                    {freelancerOrClient?.title}
                  </span>
                </span>
              </Link>

              <p>{reasonForDecline}</p>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="px-8">
                  <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us a little bit about yourself"
                            className="resize-none h-36"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <DialogFooter variant="bordered" className="px-8">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-black/40"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    type="submit"
                    disabled={isDecliningOrWithdrawingOrder}
                  >
                    <span>Decline Offer</span>
                    {isDecliningOrWithdrawingOrder ? (
                      <Loader.CircularSnake
                        className="w-4 h-4 ml-2"
                        color="white"
                      />
                    ) : null}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

function MyOrdersPage() {
  const { data: user } = useQuery<IUser>({ queryKey: ["user"] });
  const axiosPrivate = useAxiosPrivate();
  const [tab, setTab] = useState<keyof typeof orderStatusLabels>(
    "awaiting-freelancer-approval"
  );
  const {
    data,
    isLoading: isOrdersLoading,
    error,
  } = useQuery({
    queryKey: [queryKeys.orders.getOrders, user?._id, tab],
    queryFn: async () => {
      try {
        const res = await axiosPrivate.get(`/orders/freelancer/${tab}`);
        console.log("API Response for orders:", res.data); // Log API response here
        return res.data;
      } catch (err) {
        console.error(
          "Error fetching orders:",
          err.response?.data || err.message
        );
        throw err;
      }
    },
    enabled: !!user?._id, // Ensure user is available before making the query
  });

  return (
    <div className="container-wrapper max-w-7xl mx-auto px-4 py-8">
      <Tabs
        value={tab}
        onValueChange={(value) => setTab(value as keyof typeof orderStatusLabels)}
        className="space-y-6"
      >
        <Typography variant="2xl" className="mb-8 font-semibold text-gray-800">
          Manage Orders
        </Typography>

        <TabsList className="justify-start w-full h-auto px-6 py-3 bg-white border rounded-t-lg border-black/10 shadow-sm">
          {Object.keys(orderStatusLabels).map((_item: any) => {
            const item = _item as keyof typeof orderStatusLabels;

            return (
              <TabsTrigger
                key={item}
                value={item}
                className="
                  data-[state=active]:bg-green-700 
                  data-[state=active]:text-white 
                  items-center space-x-2 
                  px-4 py-2 
                  rounded-full 
                  transition-all
                  hover:bg-slate-100
                  data-[state=active]:hover:bg-green-800
                  [&[data-state='active']_#circle]:border-white/80
                "
              >
                <span>{orderStatusLabels[item]}</span>

                {data?.counts[item] ? (
                  <span
                    id="circle"
                    className="flex items-center justify-center w-5 h-5 text-xs font-normal border rounded-full border-slate-400"
                  >
                    {data?.counts[item]}
                  </span>
                ) : null}
              </TabsTrigger>
            );
          })}
        </TabsList>

        <div className="bg-white rounded-b-lg shadow-sm">
          <Table className="border border-black/10">
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                <TableHead className="font-semibold text-gray-700">Tx Hash</TableHead>
                <TableHead className="font-semibold text-gray-700">Buyer</TableHead>
                <TableHead className="font-semibold text-gray-700">Gig</TableHead>
                <TableHead className="font-semibold text-gray-700">
                  {user?.accountType === "FREELANCER" ? "Paid" : "Total"}
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  {user?.accountType === "FREELANCER" ? "Action" : "Status"}
                </TableHead>
                {user?.accountType === "CLIENT" &&
                tab === "freelancer-declined" ? (
                  <TableHead />
                ) : null}
              </TableRow>
            </TableHeader>

            <TableBody>
              {isOrdersLoading ? (
                new Array(4).fill("").map((_, i) => (
                  <TableRow key={i}>
                    {new Array(6).fill("").map((__, j) => (
                      <TableCell key={j}>
                        <Skeleton className="w-full h-4 rounded-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <>
                  {data?.orders.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={100}
                        className="text-center opacity-80"
                      >
                        No orders to show
                      </TableCell>
                    </TableRow>
                  ) : (
                    data?.orders?.map((order) => (
                      <Row key={order?._id} {...order} currentTab={tab} />
                    ))
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </div>
      </Tabs>
    </div>
  );
}

export default MyOrdersPage;
