// @ts-nocheck

import Button from "components/Button";
import CountrySelect from "components/CountrySelect";
import Paper from "components/Paper";
import Typography from "components/Typography";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaCamera } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "utils/constants";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const AvatarUploadCard = () => {
  const [files, setFiles] = useState([]);
  const [user, setUser] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    noDrag: true,
    multiple: false,
    maxFiles: 1,
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map(
          (file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            }) as any
        )
      );
    },
  });

  // Effetto per caricare l'avatar corrente
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${BASE_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data.user);
          // Imposta l'URL dell'avatar utilizzando l'ID dell'utente
          setAvatarUrl(`/uploads/${response.data.user._id}.jpg`);
          console.log("response = ", response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const onUpload = () => {
    console.log("uploading...");
    if (!files.length || !user || uploading) return;
    console.log("uploading...");

    setUploading(true);
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("avatar", files[0]);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${BASE_URL}/user/avatar`, formData, config)
      .then((response) => {
        // Imposta l'URL dell'avatar utilizzando l'ID dell'utente
        setAvatarUrl(`/uploads/${user._id}.jpg`);
        setFiles([]);
      })
      .catch((error) => {
        console.error("error avatar");
        console.error(error);
      })
      .finally(() => {
        setUploading(false);
      });
  };

  useEffect(() => {
    // Assicurati di revocare gli URL dei file per evitare perdite di memoria
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <Paper>
      <div className="flex items-start space-x-8 justify-between">
        <aside>
          <Typography variant="xl" className="font-medium mb-3">
            Avatar
          </Typography>

          <Typography className="opacity-80">
            This is your avatar. <br />
            Click on the avatar to upload a custom one from your files.
          </Typography>
        </aside>

        <div
          {...getRootProps({ className: "dropzone" })}
          className="w-20 h-20 rounded-full bg-woodsmoke-800 dark:bg-woodsmoke-400 relative flex items-center justify-center z-10 overflow-hidden hover:opacity-60 transition-all duration-200 cursor-pointer flex-shrink-0"
        >
          {/* Show the uploaded image or the current user's avatar */}
          {files.length > 0 ? (
            <img
              src={files[0].preview}
              className="absolute top-0 left-0 w-full h-full object-cover z-10"
              alt="upload-preview"
            />
          ) : // If there is a user and an avatar, show the avatar, otherwise show the camera icon
          user && user.avatar ? (
            <img
              src={user.avatar}
              className="absolute top-0 left-0 w-full h-full object-cover z-10"
              alt="avatar-img"
            />
          ) : (
            <FaCamera className="text-white opacity-70 text-3xl -z-10" />
          )}

          <input {...getInputProps()} />
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <Typography variant="sm" className="opacity-60">
          An avatar is optional but strongly recommended.
        </Typography>

        <Button
          onClick={onUpload}
          disabled={!files.length || uploading}
          className="ml-auto"
        >
          {uploading ? "Uploading..." : "Save"}
        </Button>
      </div>
    </Paper>
  );
};

const schema = yup.object({
  FullName: yup.string().required(),
});

const fetchFullName = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get(`${BASE_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { FullName: res.data.user.FullName };
  } catch (error) {
    console.error(error);
  }

  return { FullName: "" };
};

const Username = () => {
  const token = localStorage.getItem("token");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, isLoading },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: fetchFullName,
  });

  const onSubmit = async (data) => {
    return new Promise((resolve) => {
      const updateFullName = async () => {
        console.log("updated FullName ===");

        try {
          const res = await axios({
            url: `${BASE_URL}/profile`,
            method: "patch",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            data: {
              FullName: data.FullName,
            },
          });

          console.log("updated FullName", res);
          resolve();
        } catch (error) {
          console.log("updateFullName FullName");
          console.log(error);
          resolve();
        }
      };

      updateFullName();
    });
  };

  /*   return (
    <Paper>
      <Typography variant="xl" className="font-medium mb-3">
        Full Name
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 flex space-x-4 items-center">
          <Input
            disabled={isLoading}
            {...register("FullName")}
            className="flex-1"
          />
          <Button disabled={!isDirty} loading={isSubmitting} type="submit">
            Save
          </Button>
        </div>
      </form>

      <Typography className="opacity-80">
        This is your username. Write to edit your username.
      </Typography>
    </Paper>
  ); */
};

export default function Settings() {
  return (
    <div>
      <Typography variant="2xl" className="font-bold mb-6">
        Account Settings
      </Typography>

      <main className="[&>*]:border [&>*]:border-black/20 dark:[&>*]:border-white/20 space-y-6">
        <Username />

        <AvatarUploadCard />

        <Paper>
          <Typography variant="xl" className="font-medium mb-5">
            Select a Country
          </Typography>

          <CountrySelect />
        </Paper>
      </main>
    </div>
  );
}
