import jobsData from "./jobs.json";
import type { Job } from "@/types/job";

export const jobs = jobsData as Job[];

export const getActiveJobs = () => {
  return jobs.filter((job) => job.isActive);
};

export const getJobBySlug = (slug: string) => {
  return jobs.find((job) => job.slug === slug && job.isActive);
};

export const getJobsByArea = (area: string) => {
  return jobs.filter((job) => job.area === area && job.isActive);
};