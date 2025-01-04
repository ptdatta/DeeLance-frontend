// @ts-nocheck

import React, { useState } from "react";
import Button from "components/Button";
import Input from "components/Input";
import Typography from "components/Typography";
import PageLayout from "layouts/PageLayout";

function PostJobs({ onNext }) {
  /*   const history = useHistory();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      history.push('/login');
    }
  }, [token, history]);  */

  // Inizializza lo stato locale per gestire i dettagli del lavoro
  const [jobDetails, setJobDetails] = useState({
    jobTitle: "",
    jobType: "",
    jobTiming: "",
    jobRequirements: "",
  });

  // Aggiorna lo stato locale quando i campi di input cambiano
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobDetails({ ...jobDetails, [name]: value });
  };

  // Gestisce il clic sul pulsante "Next", passando i dettagli del lavoro al componente padre
  const handleNextClick = () => {
    // Add validation here
    onNext(jobDetails); // Passa i dettagli del lavoro al componente padre
  };

  return (
    <PageLayout>
      <div className="container-wrapper">
        <div>
          <Typography className="text-xl font-semibold py-2">
            Create a Job Post!
          </Typography>
          {/* Questo commento è stato mantenuto come parte del codice originale
          <Typography className="text-black/50 dark:text-white/50 text-xs pb-4">
            You {"haven't"} posted a job before, so {"you'll"} need to create an
            employer account.
          </Typography> */}
        </div>
        <div className="mt-3">
          <Typography className="text-xl font-semibold py-2">
            Job Details
          </Typography>
          <Typography className="text-black/50 dark:text-white/50 text-xs pb-4">
            Start entering first Job Details..
          </Typography>
        </div>
        <div>
          <Input
            label="Job Title"
            name="jobTitle"
            placeholder="Enter Job Title"
            className="mb-5"
            value={jobDetails.jobTitle}
            onChange={handleInputChange}
          />
          <Input
            label="Job Type"
            name="jobType"
            placeholder="Choose Job Type"
            className="mb-5"
            value={jobDetails.jobType}
            onChange={handleInputChange}
          />
          <Input
            label="Job Timing"
            name="jobTiming"
            placeholder="Choose Job Timing"
            className="mb-5"
            value={jobDetails.jobTiming}
            onChange={handleInputChange}
          />
          <Input
            label="Job Requirements"
            name="jobRequirements"
            placeholder="Enter Job Requirements"
            className="mb-5"
            value={jobDetails.jobRequirements}
            onChange={handleInputChange}
          />
          <div className="flex justify-end">
            <Button size="sm" className="px-20" onClick={handleNextClick}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default PostJobs;
