import Input from "components/Input";
import Paper from "components/Paper";
import Typography from "components/Typography";

function Metaverse() {
  return (
    <div>
      <Typography variant="2xl" className="font-semibold mb-6">
        Add Metaverse ID
      </Typography>

      <Paper>
        <Typography
          variant="xl"
          className="font-semibold mb-5 text-green-haze-500"
        >
          Metaverse 3D Virtual World
        </Typography>

        <Input
          placeholder="Enter ID"
          label="ID"
          className="bg-woodsmoke-200 dark:bg-woodsmoke-700"
        />
      </Paper>
    </div>
  );
}

export default Metaverse;
