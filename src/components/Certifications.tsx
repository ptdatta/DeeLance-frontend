import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext, useState } from "react";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { CertificateType } from "types/certificate.types";
import { Method } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { AuthContext } from "Providers/AuthContextProvider";
import Button from "./Button";
import CertificateCard from "./CertificateCard";
import {
  Dialog,
  DialogClose,
  DialogCloseIcon,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./Dialog";
import Input from "./Input";
import Paper from "./Paper";
import Typography from "./Typography";
import Loader from "./Loader";
import { toast, useToast } from "./ui/use-toast";

interface CertificateFormType {
  closeModal: () => void;
  certificateDataForEdit: CertificateType | null | undefined;
}

const currentYear = new Date().getFullYear();

interface FormData extends Omit<CertificateType, "_id"> {}

const schema: yup.ObjectSchema<FormData> = yup
  .object({
    certificateName: yup.string().required("This field is required."),
    issueBy: yup.string().required("This field is required."),
    yearIssued: yup
      .number()
      .transform((value) => {
        if (
          Number.isNaN(value) ||
          value === "" ||
          value === null ||
          value === undefined
        )
          return undefined;
        return value;
      })
      .required("This field is required.")
      .test({
        name: "check if 4 digit",
        test: (value) => /^\d{4}$/.test(String(value)),
        message: "Date has wrong format. Use this format instead: YYYY",
      })
      .min(1964, "The value must be greater than or equal to 1964")
      .test({
        name: "check max",
        message: `The value must be less than or equal to ${currentYear}`,
        test: (value) => {
          return !(value > currentYear);
        },
      }),
  })
  .required();

function CertificationForm({
  closeModal,
  certificateDataForEdit,
}: CertificateFormType) {
  const { toast } = useToast();
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const user: any = queryClient.getQueryData(["user"]);
  const apiCallMethod: Method = certificateDataForEdit ? "put" : "post";
  const endpoint = certificateDataForEdit
    ? `/updateCertificate/${user._id}/${certificateDataForEdit._id}`
    : `/addCertificate/${user._id}`;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: certificateDataForEdit?._id
      ? certificateDataForEdit
      : undefined,
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (certificateDataForEdit) {
        await axiosPrivate.post(`/updateCertificate/${user._id}/${certificateDataForEdit._id}`, data);
      } else {
        await axiosPrivate.post(`/addCertificate/${user._id}`, data);
      }
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      closeModal();
    } catch (err: any) {
      console.error('Error submitting certificate:', err);
      toast({
        title: "Error",
        description: err.response?.data?.message || "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  // useEffect(() => {
  //   if (certificateDataForEdit) {
  //     const allCertificates = JSON.parse(
  //       localStorage.getItem(localStorageKeys.CERTIFICATE_KEY)
  //     );
  //     const oneCertificate = allCertificates.find(
  //       (item) => item.id === certificateDataForEdit
  //     );

  //     setValue("name", oneCertificate.name);
  //     setValue("issueMonth", oneCertificate.issueMonth);
  //     setValue("issueYear", oneCertificate.issueYear);
  //     setValue("issuingOrganization", oneCertificate.issuingOrganization);
  //   }
  // }, [certificateDataForEdit]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogHeader
        variant="bordered"
        className="flex flex-row items-center justify-between space-y-0 px-8"
      >
        <Typography variant="xl">Add license or certification</Typography>
        <DialogCloseIcon />
      </DialogHeader>

      <main className="p-8 grid grid-cols-2 gap-6">
        <Input
          variant="outlined"
          label="Cartificate Name"
          placeholder="Ex: Microsoft certified"
          {...register("certificateName")}
          error={errors?.certificateName?.message}
        />

        <Input
          variant="outlined"
          label="Certificate Issued by"
          placeholder="Ex: Microsoft"
          {...register("issueBy")}
          error={errors?.issueBy?.message}
        />

        <Input
          variant="outlined"
          label="Year Issued"
          placeholder="2002"
          type="number"
          {...register("yearIssued", { valueAsNumber: true })}
          error={errors?.yearIssued?.message}
        />
      </main>

      <DialogFooter
        variant="bordered"
        className="px-8 flex items-center justify-end space-x-5"
      >
        <DialogClose asChild>
          <Button variant="simple">
            {certificateDataForEdit?._id ? "Cancel" : "Close"}
          </Button>
        </DialogClose>

        <Button
          type="submit"
          disabled={isSubmitting || !isDirty}
          className="w-[10rem]"
        >
          {isSubmitting ? (
            <Loader.CircularSnake color="white" />
          ) : (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <>{certificateDataForEdit ? "Edit" : "Save changes"}</>
          )}
        </Button>
      </DialogFooter>
    </form>
  );
}

function Certifications() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const { userId } = useParams();
  const [certificateDataForEdit, setCertificateDataForEdit] = useState<
    CertificateType | null | undefined
  >(null);
  const queryClient = useQueryClient();
  const user: any = queryClient.getQueryData(["user"]);
  const axiosPrivate = useAxiosPrivate();
  const profile: any = queryClient.getQueryData(["profile", userId]);
  const { isToken } = useContext(AuthContext);
  const isUser = isToken ? profile._id === user._id : false;

  const { mutate: deleteCertificate, isLoading: isDeleting } = useMutation({
    mutationFn: async (certificateId: string) => {
      const response = await axiosPrivate.post(`/deleteCertificates/${user._id}/${certificateId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast({
        title: "Success",
        description: "Certificate deleted successfully",
      });
    },
    onError: (err: any) => {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to delete certificate",
        variant: "destructive",
      });
    },
  });

  const handleEditClick = (certificate: CertificateType) => {
    setCertificateDataForEdit(certificate);
    setDialogOpen(true);
  };

  const closeModal = () => {
    setCertificateDataForEdit(null);
    setDialogOpen(false);
  };

  const handleDeleteClick = (certificateId: string) => {
    if (window.confirm("Are you sure you want to delete this certificate?")) {
      deleteCertificate(certificateId);
    }
  };

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(open) => {
        if (open === false && certificateDataForEdit?._id) {
          setCertificateDataForEdit(null);
        }
        setDialogOpen(open);
      }}
    >
      <Paper>
        <header className="flex items-center justify-between mb-5">
          <Typography variant="xl" className="font-medium">
            Certifications
          </Typography>

          {isUser ? (
            <DialogTrigger asChild>
              <Button size="sm">Create</Button>
            </DialogTrigger>
          ) : null}
        </header>

        <div className="space-y-4">
          {profile.certificate?.length > 0 ? (
            profile.certificate.map((item: CertificateType) => (
              <CertificateCard
                key={item._id}
                _id={item._id}
                onEditClick={handleEditClick}
                certificateName={item.certificateName}
                issueBy={item.issueBy}
                yearIssued={item.yearIssued}
                onDeleteClick={handleDeleteClick}
              />
            ))
          ) : (
            <div className="text-center">
              <Typography variant="lg" className="font-medium opacity-80 mb-3">
                No Certificates Yet
              </Typography>
              <Typography className="opacity-60 mb-4">
                You {"haven't"} added any certificates to showcase your
                achievements. Click the Create button to start highlighting your
                accomplishments and enhancing your profile.
              </Typography>
            </div>
          )}
        </div>
      </Paper>

      {isUser ? (
        <DialogContent className="sm:max-w-[40rem] p-0">
          <CertificationForm
            certificateDataForEdit={certificateDataForEdit}
            closeModal={closeModal}
          />
        </DialogContent>
      ) : null}
    </Dialog>
  );
}

export default Certifications;
