// @ts-nocheck

import JobCard from "./JOb/JobCard";
import Typography from "./Typography";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SimilarJobs() {
  const [jobs, setJobs] = useState([]);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook per la navigazione
  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redirige al login se non c'è token
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
            navigate("/login"); // Redirige al login se la richiesta non è autorizzata
          } else {
            console.error("Failed to load jobs", error);
            setLoading(false);
          }
        }
      };

      fetchJobs();
    }
  }, [token, navigate]); // Aggiungi navigate alle dipendenze

  if (loading) {
    return <div>Loading jobs...</div>;
  }

  if (!jobs.length) {
    return <div />;
  }

  return (
    <div>
      <Typography variant="xl" className="font-medium mb-6">
        Similar Jobs
      </Typography>

      <Swiper slidesPerView={1.4} spaceBetween={30}>
        {jobs.map((job) => (
          <SwiperSlide key={job._id}>
            <JobCard job={job} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SimilarJobs;
