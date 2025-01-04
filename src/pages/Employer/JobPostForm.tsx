import { useState, useEffect } from "react";
import PostJobs from "./PostJobs";
import PostJobsNext from "./PostJobsNext";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "utils/constants";

function JobPostForm() {
  const [jobDetails, setJobDetails] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Definizione della funzione onNext
  const onNext = (details: any) => {
    setJobDetails(details);
    setCurrentStep(2); // Passa al passo successivo
  };

  // Definizione della funzione per gestire la pubblicazione del lavoro
  const onPost = async (fullDetails: any) => {
    try {
      const response = await fetch(`${BASE_URL}/post-job`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(fullDetails),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Job posted successfully:", data);
        alert("Job posted successfully! ");
        navigate("/dashboard");
      } else {
        // Gestire le risposte di errore dal server
        throw new Error("Something went wrong while posting the job");
      }
    } catch (error) {
      console.error("Failed to post job:", error);
      // Qui puoi gestire l'errore, ad esempio mostrare un messaggio all'utente
    }
  };

  // Renderizza il componente corretto basato sul passo corrente
  return (
    <>
      {currentStep === 1 && <PostJobs onNext={onNext} />}
      {currentStep === 2 && (
        <PostJobsNext jobDetails={jobDetails} onPost={onPost} />
      )}
    </>
  );
}

export default JobPostForm;
