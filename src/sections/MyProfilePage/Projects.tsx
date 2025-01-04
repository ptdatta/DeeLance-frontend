import DullTabButton from "components/DullTabButton";
import Pagination from "components/Pagination";
import Paper from "components/Paper";
import PerPageItemsSelector from "components/PerPageItemsSelector";
import Typography from "components/Typography";
import { useState } from "react";

const Card = () => {
  return (
    <Paper>
      <Typography variant="xl" className="font-medium mb-2">
        Mobile app developments{" "}
      </Typography>
      <Typography
        variant="xs"
        className="text-black/60 dark:text-white/60 mb-4"
      >
        Oct 7, 2022 - Dec 8, 2022
      </Typography>

      <Typography className="text-black/80 dark:text-white/80">
        Lorem ipsum is a placeholder text commonly used to demonstrate the
        visual form of a document or a typeface without relying on meaningful
        content.
      </Typography>
    </Paper>
  );
};

function Projects() {
  const [projectsType, setProjectsType] = useState("completed");

  return (
    <div>
      <div className="mb-6 flex items-center space-x-4">
        <DullTabButton
          onClick={() => setProjectsType("completed")}
          active={projectsType === "completed"}
        >
          Completed (12)
        </DullTabButton>
        <DullTabButton
          onClick={() => setProjectsType("progress")}
          active={projectsType === "progress"}
        >
          In Progress (7)
        </DullTabButton>
      </div>

      <div className="space-y-4">
        {projectsType === "completed" ? (
          <>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </>
        ) : null}

        {projectsType === "progress" ? (
          <>
            <Card />
            <Card />
          </>
        ) : null}
      </div>

      <div className="flex items-center justify-between mt-8">
        <PerPageItemsSelector />
        <Pagination />
      </div>
    </div>
  );
}

export default Projects;
