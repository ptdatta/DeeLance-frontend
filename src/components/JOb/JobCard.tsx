import { Link } from "react-router-dom";
import Typography from "components/Typography";
import { BsFillBarChartFill } from "react-icons/bs";
import { MdLocationPin } from "react-icons/md";
import { IoIosPaper } from "react-icons/io";
import Button from "components/Button";
import { FaRegBookmark } from "react-icons/fa";
import IconText from "components/IconText";

function JobCard({ job }: any) {
  // Funzione per formattare il nome dell'utente
  const formatUserName = (fullName: any) => {
    // Verifica che fullName sia una stringa non vuota
    if (fullName) {
      const names = fullName.split(" ");
      if (names.length > 1) {
        return `${names[0]} ${names[1].charAt(0)}.`;
      }
      return fullName;
    }
    return "Anonymous"; // Ritorna 'Anonymous' se fullName non è definito
  };

  // Se job.userId è undefined o non ha FullName, verrà mostrato 'Anonymous'
  const formattedUserName =
    job.userId && job.userId.FullName
      ? formatUserName(job.userId.FullName)
      : "Anonymous";
  const userCountry =
    job.userId && job.userId.country ? job.userId.country : "Unknown Country";
  const jobDescriptionPreview =
    job.jobRequirements && job.jobRequirements.length > 150
      ? `${job.jobRequirements.substring(0, 150)}...`
      : job.jobRequirements;

  return (
    <div className="bg-white dark:bg-woodsmoke-900 rounded-lg px-8 grid sm:grid-cols-[1fr_16rem] gap-6 sm:gap-12 shadow-md py-7 sm:py-0">
      <aside className="sm:py-6">
        {/* Visualizza il nome dell'utente formattato */}
        <Typography className="mb-1">{formattedUserName}</Typography>

        <div>
          <Typography variant="2xl" className="font-medium mb-1">
            {job.jobTitle}
          </Typography>
          <Typography className="text-black/60 dark:text-white/60 mb-4">
            Budget: ${job.salaryMin} - ${job.salaryMax}
          </Typography>
          <Typography className="text-black/60 dark:text-white/60 mb-5">
            {jobDescriptionPreview}
          </Typography>
        </div>
      </aside>

      <div className="rtl:border-r max-sm:border-t-1 sm:ltr:border-l-1 border-woodsmoke-700 sm:rtl:pr-10 sm:ltr:pl-10 max-sm:pb-0 py-6 flex flex-col">
        <div className="space-y-5 flex-1 mb-5">
          <IconText
            title={`Job type: ${job.jobType}`}
            icon={<BsFillBarChartFill className="text-green-haze-600" />}
          />
          <IconText
            title={`Project type: ${job.salaryType}`}
            icon={<IoIosPaper className="text-green-haze-600" />}
          />
          <IconText
            title={userCountry}
            icon={<MdLocationPin className="text-green-haze-600" />}
          />
          {/* Aggiungi qui altri dettagli se necessario */}
        </div>

        <div className="flex space-x-4 mt-auto">
          <Button
            variant="outlined"
            className="px-[.8em] text-black dark:text-white"
          >
            <FaRegBookmark />
          </Button>
          <Button asChild className="flex-1">
            <Link to={`/job-detail/${job._id}`}>View Job</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
