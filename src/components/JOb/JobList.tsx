// @ts-nocheck

import { useState, useEffect } from "react";
import Typography from "../Typography";
import JobCard from "./JobCard";
import Pagination from "components/Pagination";
import PerPageItemsSelector from "components/PerPageItemsSelector";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "utils/constants";
import Button from "components/Button";
import Paper from "components/Paper";
import { MdWorkOff } from "react-icons/md";
import Loader from "components/Loader";
import FilterButtons from "components/FilterButtons";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(10); // Numero di lavori per pagina
  const [totalPages] = useState(0); // Numero totale di pagine
  const navigate = useNavigate(); // Hook per la navigazione
  const token = localStorage.getItem("token");
  const { t } = useTranslation();

  useEffect(() => {
    if (!token) {
      // navigate("/login"); // Redirige al login se non c'è token
    } else {
      const fetchJobs = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${BASE_URL}/api/jobs`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setJobs(response.data.jobPosts);
          setLoading(false);
        } catch (error) {
          if (error.response && error.response.status === 401) {
            // navigate("/login"); // Redirige al login se la richiesta non è autorizzata
          } else {
            console.error("Failed to load jobs", error);
            setLoading(false);
          }
        }
      };

      fetchJobs();
    }
  }, [token, navigate]); // Aggiungi navigate alle dipendenze

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return (
      <Paper>
        <Loader.CircularLoader className="mx-auto my-6" />
      </Paper>
    );
  }

  if (!jobs.length) {
    return (
      <Paper className="text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto bg-green-haze-600 mb-6 text-white">
          <MdWorkOff className="text-4xl" />
        </div>

        <Typography variant="xl" className="mb-3">
          No jobs have been found.
        </Typography>
        <Typography className="opacity-80">
          To display a posted job on your profile, please create a job listing.
        </Typography>

        <Button as={Link} to="/post-jobs" className="mx-auto mt-6 w-fit">
          Post Job
        </Button>
      </Paper>
    );
  }

  return (
    <div>
      <header className="flex max-sm:flex-col max-sm:space-y-4 sm:items-center justify-between mb-6">
        <Typography variant="h2">{t("Recent Projects")}</Typography>

        <FilterButtons />
      </header>

      <main className="space-y-5 mb-10">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
        {/* <StaticJobCard />
        <StaticJobCard />
        <StaticJobCard />
        <StaticJobCard />
        <StaticJobCard /> */}
      </main>

      <div className="flex items-center justify-between">
        <PerPageItemsSelector
          itemsPerPage={jobsPerPage}
          setItemsPerPage={setJobsPerPage}
          setCurrentPage={setCurrentPage}
        />
        {/* <StaticPagination /> */}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default JobList;
