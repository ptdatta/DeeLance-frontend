import Button from "components/Button";
import Checkbox from "components/Checkbox";
import Paper from "components/Paper";
import TabBar from "components/TabBar";
import TabButton from "components/TabButton";
import Typography from "components/Typography";
import PageLayout from "layouts/PageLayout";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const TaskCard = () => {
  return (
    <Paper className="bg-woodsmoke-200 dark:bg-woodsmoke-700" size={3}>
      {/* <div className="flex items-center justify-between border-b-2 border-white/10 pb-4 mb-6">
        <Typography variant="lg" className="font-medium">
          Draft Task
        </Typography>

        <div className="flex items-center space-x-3">
          <Button variant="dark">Delete</Button>
          <Button variant="dark">Live Preview</Button>
        </div>
      </div> */}

      <div className="flex items-center justify-between space-x-5">
        <div className="flex items-center space-x-4 flex-1">
          <div className="flex-shrink-0">
            <Checkbox />
          </div>

          <div className="w-12 aspect-square rounded-md bg-black" />

          <Typography variant="base" className="font-medium">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry
          </Typography>
        </div>
        <Link to="/task-preview">preview</Link>
        <button className="w-8 h-8 rounded bg-woodsmoke-900 flex items-center justify-center">
          <FaChevronDown />
        </button>
      </div>
    </Paper>
  );
};

const tabs = ["Active", "Pause", "Block", "Draft"];

function TasksPage() {
  const [tab, setTab] = useState(tabs[0]);

  return (
    <PageLayout>
      <div className="container-wrapper">
        <Paper>
          <header className="flex items-center justify-between mb-6">
            <Typography variant="2xl" className="font-medium">
              Task
            </Typography>
            <Button asChild>
              <Link to="/create-task">Create new Task</Link>
            </Button>
          </header>

          <main>
            <TabBar>
              <TabButton
                active={tab === tabs[0]}
                onClick={() => setTab(tabs[0])}
              >
                Active
              </TabButton>
              <TabButton
                active={tab === tabs[1]}
                onClick={() => setTab(tabs[1])}
              >
                Pause
              </TabButton>
              <TabButton
                active={tab === tabs[2]}
                onClick={() => setTab(tabs[2])}
              >
                Block
              </TabButton>
              <TabButton
                active={tab === tabs[3]}
                onClick={() => setTab(tabs[3])}
              >
                Draft
              </TabButton>
            </TabBar>

            <div className="space-y-4 mt-8">
              {tab === tabs[0] ? (
                <>
                  <TaskCard />
                  <TaskCard />
                  <TaskCard />
                  <TaskCard />
                  <TaskCard />
                </>
              ) : null}

              {tab === tabs[1] ? (
                <>
                  <TaskCard />
                  <TaskCard />
                </>
              ) : null}

              {tab === tabs[2] ? (
                <>
                  <TaskCard />
                </>
              ) : null}

              {tab === tabs[3] ? (
                <>
                  <TaskCard />
                  <TaskCard />
                  <TaskCard />
                  <TaskCard />
                </>
              ) : null}
            </div>
          </main>
        </Paper>
      </div>
    </PageLayout>
  );
}

export default TasksPage;
