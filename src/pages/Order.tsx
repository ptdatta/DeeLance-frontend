import { useParams } from "react-router-dom";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderType } from "@/types/order.types";
import { IUser } from "@/types/user.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Typography from "components/Typography";
import {
  FaUpload,
  FaExclamationTriangle,
  FaComments,
  FaFileAlt,
  FaHistory,
  FaCheckCircle,
  FaClock,
  FaPaperPlane,
  FaDownload,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import numeral from "numeral";
import Timer from "components/Timer";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import { useToast } from "@/components/ui/use-toast";
import Textarea from "@/components/Textarea";
import JSZip from "jszip";
import { saveAs } from "file-saver";

interface FileState {
  name: string;
  file: File;
}

function Order() {
  const { orderId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<FileState | null>(null);
  const [activeTab, setActiveTab] = useState("activity");
  const [isDisputeOpen, setIsDisputeOpen] = useState(false);
  const [isRevisionRequested, setIsRevisionRequested] = useState(false);
  const [revisionReason, setRevisionReason] = useState("");
  const [disputeReason, setDisputeReason] = useState("");
  const [isSubmittingDispute, setIsSubmittingDispute] = useState(false);
  const [orderDelivered, setOrderDelivered] = useState(false);

  const { data: user } = useQuery<IUser>({ queryKey: ["user"] });

  const { data: orderResponse, isLoading: isOrderLoading } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const response = await axiosPrivate.get(`/order/${orderId}`);
      return response.data;
    },
    enabled: !!user?._id,
  });

  const { data: taskResponse, isLoading: isTaskLoading } = useQuery({
    queryKey: ["task", orderResponse?.data?.gigId],
    queryFn: async () => {
      const response = await axiosPrivate.get(
        `/task/${orderResponse?.data?.gigId}`
      );
      return response.data;
    },
    enabled: !!orderResponse?.data?.gigId,
  });

  useEffect(() => {
    if (orderResponse?.data?.status === "delivered") {
      setOrderDelivered(true);
    }
  }, orderResponse);

  const isFreelancer = orderResponse?.data?.freelancerId === user?._id;
  const isClient = orderResponse?.data?.clientId === user?._id;

  const otherParty = isFreelancer
    ? orderResponse?.data?.clientId
    : orderResponse?.data?.freelancerId;

  const renderActionButtons = () => {
    if (isFreelancer) {
      return (
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full h-11 flex items-center gap-2"
            onClick={() => handleDeliver()}
            disabled={isDelivering}
          >
            <FaUpload /> Deliver Order
          </Button>
        </div>
      );
    }

    if (isClient) {
      return (
        <div className="space-y-3">
          <Button
            className="w-full h-11 flex items-center justify-center gap-2 bg-green-800 hover:bg-green-700"
            onClick={handleAcceptDelivery}
            disabled={isAccepting || orderDelivered}
          >
            {orderDelivered ? (
              <>
                <FaCheckCircle />
                Delivery Accepted
              </>
            ) : isAccepting ? (
              <Loader.CircularSnake className="w-5 h-5" />
            ) : (
              <>
                <FaCheckCircle />
                Accept Delivery
              </>
            )}
          </Button>

          {isRevisionRequested ? (
            <div className="space-y-3">
              <Textarea
                placeholder="Please describe your issue..."
                value={revisionReason}
                onChange={(e) => setRevisionReason(e.target.value)}
                className="w-full min-h-[100px]"
              />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsRevisionRequested(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  disabled={!revisionReason.trim()}
                  onClick={() => handleRevisionRequest()}
                >
                  Submit Revision
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              className="w-full h-11 flex items-center justify-center gap-2"
              onClick={() => setIsRevisionRequested(true)}
            >
              <FaHistory />
              Request Revision
            </Button>
          )}
        </div>
      );
    }

    return null;
  };

  console.log("Order Component Rendered - OrderID:", orderId);

  const orderDetails =
    orderResponse?.data && taskResponse?.data
      ? {
          _id: orderResponse.data._id,
          status: orderResponse.data.status,
          deliveryDate: new Date(orderResponse.data.deadline).getTime(),
          orderNumber:
            orderResponse.data.initialTransactionHash?.slice(0, 10) || "N/A",
          orderDate: new Date(
            orderResponse.data.createdAt
          ).toLocaleDateString(),
          orderFiles: orderResponse.data.files,

          title: taskResponse.data.title,
          totalPrice: taskResponse.data.price,
          deliveryDays: taskResponse.data.deliveryDays,
          description: taskResponse.data.packageDescription,
          revision: taskResponse.data.revision,

          seller: {
            username: taskResponse.data.userId.UserName,
            email: taskResponse.data.userId.email,
            wallet: taskResponse.data.userId.wallet,
          },

          category: taskResponse.data.category,
          subCategory: taskResponse.data.subCategory,

          activities: [
            {
              type: "message",
              content: "Project started",
              time: "2 hours ago",
              user: "System",
            },
            {
              type: "file",
              content: "Initial requirements uploaded",
              time: "1 day ago",
              user: "Client",
            },
          ],
          milestones: [
            {
              title: "Project Initiation",
              status: "completed",
              date: new Date(orderResponse.data.createdAt).toLocaleDateString(),
              description: "Project setup and requirements gathering",
            },
            {
              title: "Development Phase",
              status: "in_progress",
              date: new Date(orderResponse.data.deadline).toLocaleDateString(),
              description: taskResponse.data.packageDescription,
            },
          ],
        }
      : null;

  useEffect(() => {
    console.log("Updated Order Details:", orderDetails);
  }, [orderDetails]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      console.log("Selected File:", file);
      setSelectedFile({ file, name: file.name }); // Ensure `file` is stored
    }
  };

  const isDeadlinePassed = orderDetails?.deliveryDate! < Date.now();

  const { mutate: deliverOrder, isLoading: isDelivering } = useMutation({
    mutationFn: async () => {
      if (!selectedFile?.file) {
        throw new Error("No file selected for upload.");
      }

      const formData = new FormData();
      formData.append("files", selectedFile.file);

      console.log("Completing order with file:", selectedFile.name);
      const response = await axiosPrivate.patch(
        `/order/${orderId}/ordercomplete`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Order completion response:", response.data);
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Order Completed",
        description: "You have successfully marked this order as complete.",
        variant: "default",
        className: "bg-white border border-gray-200",
        style: {
          backgroundColor: "white",
          color: "black",
        },
      });

      queryClient.invalidateQueries(["order", orderId]);
    },
    onError: (error: any) => {
      console.error("Order completion error:", error);
      toast({
        title: "Completion Failed",
        description:
          error.response?.data?.msg ||
          "There was an error completing the order. Please try again.",
        variant: "destructive",
        className: "bg-white border border-gray-200",
        style: {
          backgroundColor: "white",
          color: "black",
        },
      });
    },
  });

  const { mutate: acceptDelivery, isLoading: isAccepting } = useMutation({
    mutationFn: async () => {
      console.log("Accepting delivery for order:", orderId);
      const response = await axiosPrivate.patch(
        `/order/${orderId}/orderDelivered`
      );
      console.log("Order acceptance response:", response.data);
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Delivery Accepted",
        description: "You have successfully accepted the delivery.",
        variant: "default",
        className: "bg-white border border-gray-200",
        style: {
          backgroundColor: "white",
          color: "black",
        },
      });
      setOrderDelivered(true);

      queryClient.invalidateQueries(["order", orderId]);
    },
    onError: (error: any) => {
      console.error("Delivery acceptance error:", error);
      toast({
        title: "Acceptance Failed",
        description:
          error.response?.data?.msg ||
          "There was an error accepting the delivery. Please try again.",
        variant: "destructive",
        className: "bg-white border border-gray-200",
        style: {
          backgroundColor: "white",
          color: "black",
        },
      });
    },
  });

  const handleDeliver = () => {
    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select a file before completing the order.",
        variant: "destructive",
      });
      return;
    }

    deliverOrder();
  };

  const downloadAllFiles = async () => {
    if (!orderDetails?.orderFiles?.length) {
      alert("No files available to download.");
      return;
    }

    const zip = new JSZip();
    const folder = zip.folder("orderfiles");

    try {
      const filePromises = orderDetails.orderFiles.map(async (fileUrl: any) => {
        const response = await fetch(fileUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${fileUrl}`);
        }
        const blob = await response.blob();
        const fileName = decodeURIComponent(fileUrl.split("/").pop());
        folder?.file(fileName, blob);
      });

      await Promise.all(filePromises);
      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, "orderfiles.zip");
    } catch (error) {
      console.error("Error downloading files:", error);
      alert("An error occurred while downloading files. Please try again.");
    }
  };

  const downloadFile = async (fileUrl: any) => {
    try {
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch the file: ${fileUrl}`);
      }
      const blob = await response.blob();
      const fileName = decodeURIComponent(fileUrl.split("/").pop());
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the file:", error);
      alert("Failed to download the file. Please try again.");
    }
  };

  const handleAcceptDelivery = () => {
    acceptDelivery();
  };

  const { mutate: handleRevisionRequest } = useMutation({
    mutationFn: async () => {
      const response = await axiosPrivate.patch("/orderRevision", {
        orderId,
        reason: revisionReason,
      });
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Revision Requested",
        description: "Your revision request has been sent.",
        className: "bg-white border border-gray-200",
      });
      setIsRevisionRequested(false);
      setRevisionReason("");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to create revision request",
        variant: "destructive",
      });
    },
  });

  const { mutate: submitDispute } = useMutation({
    mutationFn: async () => {
      const response = await axiosPrivate.post("/createDispute", {
        orderId,
        reason: disputeReason,
      });
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Dispute Created",
        description: "Your dispute has been submitted successfully.",
        variant: "default",
      });
      setIsDisputeOpen(false);
      setDisputeReason("");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to create dispute",
        variant: "destructive",
      });
    },
  });

  if (isOrderLoading || isTaskLoading) {
    return (
      <div className="container-wrapper py-8 flex items-center justify-center">
        <Loader.CircularSnake className="w-8 h-8" />
      </div>
    );
  }

  if (!orderDetails) {
    console.log("No order details found - rendering not found state");
    return (
      <div className="container-wrapper py-8 text-center">
        <Typography variant="xl" className="text-gray-500">
          Order not found
        </Typography>
      </div>
    );
  }

  console.log("Rendering order details:", {
    status: orderDetails.status,
    orderNumber: orderDetails.orderNumber,
    title: orderDetails.title,
    totalPrice: orderDetails.totalPrice,
    activities: orderDetails.activities?.length,
    milestones: orderDetails.milestones?.length,
  });

  return (
    <div className="container-wrapper py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <Typography variant="xl" className="font-semibold mb-6">
              {isFreelancer ? "Order from Client" : "Order Details"}
            </Typography>
            <div className="grid grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="col-span-2 space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <Badge
                          variant="outline"
                          className={`
                          px-4 py-1 rounded-full text-sm font-medium
                          ${orderDetails.status === "completed" ? "bg-green-100 text-green-800" : ""}
                          ${orderDetails.status === "active" ? "bg-blue-100 text-blue-800" : ""}
                        `}
                        >
                          {orderDetails.status === "completed"
                            ? "Completed"
                            : "In Progress"}
                        </Badge>
                        <Typography variant="sm" className="text-gray-500">
                          {orderDetails.orderNumber}
                        </Typography>
                      </div>
                      <Typography variant="2xl" className="mb-4 font-bold">
                        {orderDetails.title}
                      </Typography>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>{orderDetails.category}</span>
                        <span>•</span>
                        <span>{orderDetails.subCategory}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Typography
                        variant="2xl"
                        className="font-bold text-green-700"
                      >
                        {numeral(orderDetails.totalPrice).format("$0,0")}
                      </Typography>
                      <Typography variant="sm" className="text-gray-500">
                        Delivery in {orderDetails.deliveryDays} days
                      </Typography>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <Tabs defaultValue="activity" className="w-full">
                    <div className="border-b">
                      <TabsList className="flex p-0 bg-transparent">
                        {[
                          "activity",
                          "details",
                          "deliverables",
                          "messages",
                        ].map((tab) => (
                          <TabsTrigger
                            key={tab}
                            value={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 px-8 py-4 text-sm font-medium border-b-2 transition-all
                              ${
                                activeTab === tab
                                  ? "border-green-800 text-green-800 bg-green-50/50"
                                  : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                              }
                            `}
                          >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </div>

                    <div className="p-6">
                      <TabsContent value="activity" className="m-0">
                        <div className="space-y-8">
                          {/* Activity Feed */}
                          <div className="space-y-6">
                            {orderDetails.activities.map((activity, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-4"
                              >
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                                  {activity.type === "message" && (
                                    <FaComments />
                                  )}
                                  {activity.type === "file" && <FaFileAlt />}
                                  {activity.type === "milestone" && (
                                    <FaCheckCircle />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="flex justify-between">
                                    <p className="font-medium">
                                      {activity.user}
                                    </p>
                                    <span className="text-sm text-gray-500">
                                      {activity.time}
                                    </span>
                                  </div>
                                  <p className="text-gray-600">
                                    {activity.content}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Milestones Timeline */}
                          <div className="border-l-2 border-gray-200 pl-4 space-y-6">
                            {orderDetails.milestones.map((milestone, index) => (
                              <div key={index} className="relative">
                                <div
                                  className={`absolute -left-6 w-4 h-4 rounded-full border-2 
                                  ${
                                    milestone.status === "completed"
                                      ? "bg-green-500 border-green-500"
                                      : milestone.status === "in_progress"
                                        ? "bg-blue-500 border-blue-500"
                                        : "bg-white border-gray-300"
                                  }`}
                                />
                                <div className="bg-gray-50 rounded-lg p-4">
                                  <div className="flex justify-between items-center mb-2">
                                    <div>
                                      <p className="font-medium">
                                        {milestone.title}
                                      </p>
                                      <p className="text-sm text-gray-500">
                                        {milestone.date}
                                      </p>
                                    </div>
                                    <Badge
                                      className={`
                                      px-3 py-1 rounded-full
                                      ${milestone.status === "completed" ? "bg-green-100 text-green-800" : ""}
                                      ${milestone.status === "in_progress" ? "bg-blue-100 text-blue-800" : ""}
                                      ${milestone.status === "pending" ? "bg-gray-100 text-gray-800" : ""}
                                    `}
                                    >
                                      {milestone.status}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-gray-600">
                                    {milestone.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="deliverables" className="m-0">
                        {isClient ? (
                          <div className="space-y-6">
                            {orderDetails?.orderFiles?.length > 0 ? (
                              <>
                                {orderDetails.orderFiles.map(
                                  (fileUrl: any, index: number) => (
                                    <div
                                      key={index}
                                      className="bg-gray-50 border-2 border-dashed rounded-xl p-8 flex justify-between items-center"
                                    >
                                      <a
                                        href={fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-blue-600 hover:underline"
                                      >
                                        <FaFileAlt className="text-green-800" />
                                        <span className="text-sm truncate">
                                          {decodeURIComponent(
                                            fileUrl.split("/").pop()
                                          )}
                                        </span>
                                      </a>
                                      <button
                                        onClick={() => downloadFile(fileUrl)}
                                        className="text-green-800 hover:text-green-700"
                                      >
                                        <FaDownload className="w-5 h-5" />
                                      </button>
                                    </div>
                                  )
                                )}
                                <Button
                                  className="w-full bg-green-800 hover:bg-green-700 h-12 flex items-center justify-center gap-2"
                                  onClick={downloadAllFiles}
                                >
                                  Download All
                                  <FaDownload className="w-5 h-5" />
                                </Button>
                              </>
                            ) : (
                              <p className="text-gray-500 text-center">
                                No files available to download.
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className="space-y-6">
                            <div className="bg-gray-50 border-2 border-dashed rounded-xl p-8">
                              <input
                                type="file"
                                id="file-upload"
                                className="hidden"
                                onChange={handleFileChange}
                              />
                              <label
                                htmlFor="file-upload"
                                className="cursor-pointer block text-center"
                              >
                                <div className="space-y-4">
                                  <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center shadow-sm">
                                    <FaUpload className="h-6 w-6 text-green-800" />
                                  </div>
                                  <div>
                                    <Typography
                                      variant="lg"
                                      className="font-medium text-gray-900"
                                    >
                                      Upload Deliverables
                                    </Typography>
                                    <p className="text-sm text-gray-500 mt-1">
                                      Drag and drop your files here, or click to
                                      browse
                                    </p>
                                  </div>
                                  {selectedFile && (
                                    <div className="bg-white p-3 rounded-lg inline-flex items-center gap-2">
                                      <FaFileAlt className="text-green-800" />
                                      <span className="text-sm">
                                        {selectedFile.name}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </label>
                            </div>
                            <Button
                              className="w-full bg-green-800 hover:bg-green-700 h-12 flex items-center justify-center gap-2"
                              onClick={handleDeliver}
                              disabled={isDelivering || !selectedFile}
                            >
                              {isDelivering ? (
                                <Loader.CircularSnake className="w-5 h-5" />
                              ) : (
                                <>
                                  <FaPaperPlane />
                                  Complete Order
                                </>
                              )}
                            </Button>
                          </div>
                        )}
                      </TabsContent>
                    </div>
                  </Tabs>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <Typography variant="lg" className="font-semibold mb-4">
                    Package Description
                  </Typography>
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: orderDetails.description,
                    }}
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Timer Card */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2 mb-4">
                    <FaClock className="text-green-800" />
                    <p className="font-medium text-gray-900">
                      Delivery Deadline
                    </p>
                  </div>

                  {isDeadlinePassed ? (
                    <div className="text-red-600 font-medium">
                      Deadline has passed
                    </div>
                  ) : (
                    <Timer
                      endDate={orderDetails.deliveryDate}
                      onComplete={() => {
                        console.log("Timer completed!");
                        // You can add additional logic here when timer completes
                      }}
                    />
                  )}

                  <div className="mt-2 text-sm text-gray-500">
                    Due: {new Date(orderDetails.deliveryDate).toLocaleString()}
                  </div>
                </div>

                {/* Seller Info */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <Typography variant="lg" className="font-semibold mb-4">
                    Seller Information
                  </Typography>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">Username</span>
                      <span className="font-medium">
                        {orderDetails.seller.username}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">Email</span>
                      <span className="font-medium">
                        {orderDetails.seller.email}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Wallet</span>
                      <span
                        className="font-medium truncate"
                        title={orderDetails.seller.wallet}
                      >
                        {orderDetails.seller.wallet.slice(0, 6)}...
                        {orderDetails.seller.wallet.slice(-4)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <Typography variant="lg" className="font-semibold mb-4">
                    Quick Actions
                  </Typography>
                  {renderActionButtons()}
                </div>

                {/* Dispute Section */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <FaExclamationTriangle className="text-red-500" />
                      <Typography variant="lg" className="font-semibold">
                        Need Help?
                      </Typography>
                    </div>

                    <p className="text-sm text-gray-600">
                      If you're experiencing any issues with this order, our
                      support team is here to help resolve them.
                    </p>

                    {isDisputeOpen ? (
                      <div className="space-y-3">
                        <Textarea
                          placeholder="Please describe your issue..."
                          value={disputeReason}
                          onChange={(e) => setDisputeReason(e.target.value)}
                          className="w-full min-h-[100px]"
                        />
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => setIsDisputeOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="destructive"
                            className="flex-1"
                            disabled={
                              !disputeReason.trim() || isSubmittingDispute
                            }
                            onClick={() => submitDispute()}
                          >
                            Submit Dispute
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        variant="destructive"
                        className="w-full h-11"
                        onClick={() => setIsDisputeOpen(true)}
                      >
                        Open Dispute
                      </Button>
                    )}
                  </div>
                </div>

                {/* Order Info */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <Typography variant="lg" className="font-semibold mb-4">
                    Order Information
                  </Typography>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">Transaction Hash</span>
                      <span
                        className="font-medium truncate"
                        title={orderResponse.data.initialTransactionHash}
                      >
                        {orderResponse.data.initialTransactionHash.slice(0, 6)}
                        ...
                        {orderResponse.data.initialTransactionHash.slice(-4)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">Order Date</span>
                      <span className="font-medium">
                        {orderDetails.orderDate}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">Revisions</span>
                      <span className="font-medium">
                        {orderDetails.revision}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Deadline</span>
                      <span className="font-medium">
                        {new Date(
                          orderDetails.deliveryDate
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Sidebar */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <Typography variant="lg" className="font-semibold mb-4">
              {isFreelancer ? "Client Information" : "Freelancer Information"}
            </Typography>
            {/* ... user info content ... */}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <Typography variant="lg" className="font-semibold mb-4">
              Quick Actions
            </Typography>
            {renderActionButtons()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
