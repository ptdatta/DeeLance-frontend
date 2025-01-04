import { useState } from "react";
import Button from "components/Button";
import Input from "components/Input";
import Typography from "components/Typography";
import PageLayout from "layouts/PageLayout";

function PostJobsNext({ jobDetails, onPost }: any) {
  /*   const history = useHistory();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      history.push('/login');
    }
  }, [token, history]); 
 */

  // Unisce i dettagli del lavoro dalla prima parte con quelli della seconda parte
  const [fullJobDetails, setFullJobDetails] = useState({
    ...jobDetails, // Dati dalla prima parte del form
    salaryType: "",
    salaryMin: "",
    salaryMax: "",
    salaryRate: "",
    supplementalPay: "",
    benefits: "",
    language: "",
    hiringAmount: "",
    hiringUrgency: "",
  });

  // Aggiorna lo stato locale quando i campi di input cambiano
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFullJobDetails({ ...fullJobDetails, [name]: value });
  };

  // Gestisce l'invio del form al backend
  const handleSubmit = async () => {
    // Add validation here
    onPost(fullJobDetails); // Invia i dettagli del lavoro completi al backend
  };

  return (
    <PageLayout>
      <div className="container-wrapper">
        <div className="max-lg:mb-6">
          <Typography className="text-xl font-semibold py-2">
            Salary Packages
          </Typography>
          {/* Informazioni sul fatto che l'utente non abbia mai postato un lavoro prima possono essere mostrate qui se necessario */}
        </div>
        <div className="border-b-1 border-woodsmoke-400 pb-8 grid lg:grid-cols-3 gap-6 mb-6">
          {/* ... Altri componenti Input qui ... */}
          <Input
            label="Salary Type"
            name="salaryType"
            placeholder="Choose Salary Type"
            value={fullJobDetails.salaryType}
            onChange={handleInputChange}
          />
          <Input
            label="Minimum"
            name="salaryMin"
            placeholder="Enter Minimum Salary"
            value={fullJobDetails.salaryMin}
            onChange={handleInputChange}
          />
          <Input
            label="Maximum"
            name="salaryMax"
            placeholder="Enter Maximum Salary"
            value={fullJobDetails.salaryMax}
            onChange={handleInputChange}
          />
          <Input
            label="Rate"
            name="salaryRate"
            placeholder="Enter Salary Rate"
            value={fullJobDetails.salaryRate}
            onChange={handleInputChange}
          />
          <Input
            label="Supplemental Pay"
            name="supplementalPay"
            placeholder="Enter Supplemental Pay"
            value={fullJobDetails.supplementalPay}
            onChange={handleInputChange}
          />
          <Input
            label="Other Benefit Offered"
            name="benefits"
            placeholder="Enter Other Benefits"
            value={fullJobDetails.benefits}
            onChange={handleInputChange}
          />
          <Input
            label="Language"
            name="language"
            placeholder="Choose Your Language"
            value={fullJobDetails.language}
            onChange={handleInputChange}
          />
          <Input
            label="How many People you Hire for this job"
            name="hiringAmount"
            placeholder="Enter Hiring Amount"
            value={fullJobDetails.hiringAmount}
            onChange={handleInputChange}
          />
          <Input
            label="How quick do you need to hire?"
            name="hiringUrgency"
            placeholder="Enter Hiring Urgency"
            value={fullJobDetails.hiringUrgency}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-end">
          <Button size="sm" className="px-20" onClick={handleSubmit}>
            Post
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}

export default PostJobsNext;
