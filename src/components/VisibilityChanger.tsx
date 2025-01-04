import { useState } from "react";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import EditableDetailBox from "./EditableDetailBox";
import Typography from "./Typography";
import RadioBox from "./RadioBox";
import Button from "./Button";

export default function VisibilityChanger() {
  const [isEditingMode, setEditingMode] = useState(false);
  const queryClient = useQueryClient();
  const user: any = queryClient.getQueryData(["user"]);
  const [visibility, setVisibility] = useState(user?.isPrivate);
  const isPrivate = user?.isPrivate;
  const axiosPrivate = useAxiosPrivate();

  const { mutate: handleSave, isLoading } = useMutation({
    mutationFn: async () => {
      const res = await axiosPrivate.patch(`/user/${user._id}/visibility`, {
        isPrivate: visibility,
      });

      return res.data.data;
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["user"], type: "all" });
      setEditingMode(false);
    },
  });

  const changeHandler = (e: any) => {
    setVisibility(e!.target!.value === "true");
  };

  return (
    <EditableDetailBox
      title={"Profile Visibility"}
      onEditClick={() => setEditingMode((val) => !val)}
    >
      {!isEditingMode ? (
        <Typography variant="sm" className="text-black/80 dark:text-white/80">
          {isPrivate ? "Private" : "Public"}
        </Typography>
      ) : (
        <>
          <div className="space-y-2 mt-4">
            <RadioBox
              label={"Public"}
              name="visibility"
              value="false"
              onChange={changeHandler}
              defaultChecked={visibility === false}
            />
            <RadioBox
              label={"Private"}
              name="visibility"
              value="true"
              onChange={changeHandler}
              defaultChecked={visibility === true}
            />
          </div>

          <Button
            className="mt-2 ml-auto"
            disabled={isLoading}
            onClick={
              visibility === isPrivate
                ? () => setEditingMode(false)
                : () => handleSave()
            }
            variant={visibility === isPrivate ? "error-outlined" : undefined}
          >
            {visibility === isPrivate ? "Cancel" : "Save"}
          </Button>
        </>
      )}
    </EditableDetailBox>
  );
}
