import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Briefcase, Building2 } from "lucide-react";
import type { Job } from "@/types/job";

interface JobCardProps {
  job: Job;
}

const workModelStyles: Record<Job["workModel"], string> = {
  Presencial: "bg-accent text-accent-foreground",
  Híbrido: "bg-primary/10 text-primary",
  Remoto: "bg-success/10 text-success",
};

const JobCard = ({ job }: JobCardProps) => {
  return (
    <Link
      to={`/vagas/${job.slug}`}
      className="group flex flex-col h-full rounded-2xl border border-border bg-card p-6 shadow-card hover:shadow-elevated hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
          <Building2 className="h-3 w-3" />
          {job.area}
        </span>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${workModelStyles[job.workModel]}`}>
          {job.workModel}
        </span>
      </div>

      <h3 className="font-display text-xl font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
        {job.title}
      </h3>

      <p className="mt-3 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
        {job.shortDescription}
      </p>

      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          {job.location}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Briefcase className="h-3.5 w-3.5" />
          {job.contractType}
        </span>
      </div>

      <div className="mt-6 pt-5 border-t border-border/70 flex items-center justify-between">
        <span className="text-sm font-semibold text-primary">Ver detalhes</span>
        <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
};

export default JobCard;
