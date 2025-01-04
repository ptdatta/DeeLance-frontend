import { useRef, useState } from "react";
import EditableDetailBox from "./EditableDetailBox";
import Typography from "./Typography";
import Input from "./Input";
import Button from "./Button";

function EditableMetaverseId() {
  const [serverData, setServerData] = useState("HYSGDGUDJKDL&3638JMXHD39");
  const [clientData, setClientData] = useState(serverData);
  const [isEditing, setIsEditing] = useState(false);
  const inpRef = useRef(null);

  const handleInputChange = (e: any) => {
    setClientData(e.target.value);
  };

  return (
    <EditableDetailBox
      title="Metaverse ID"
      onEditClick={() => setIsEditing((val) => !val)}
    >
      {!isEditing ? (
        <Typography variant="sm" className="text-black/80 dark:text-white/80">
          {serverData}
        </Typography>
      ) : (
        <>
          <Input
            ref={inpRef}
            defaultValue={serverData}
            onChange={handleInputChange}
            className="mt-2"
          />

          <Button
            className="mt-4 w-full"
            // disabled={clientVisibility === serverVisibility}
            variant={clientData === serverData ? "error-outlined" : undefined}
            onClick={() => {
              setIsEditing(false);

              if (clientData === serverData) return;

              setServerData(clientData);
            }}
          >
            {clientData === serverData ? "Cancel" : "Save"}
          </Button>
        </>
      )}
    </EditableDetailBox>
  );
}

export default EditableMetaverseId;
