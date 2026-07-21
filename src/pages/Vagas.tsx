import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionTitle from "@/components/SectionTitle";
import JobCard from "@/components/JobCard";
import JobFilters, {
  FILTERS_DEFAULT,
  FILTER_ALL,
  type JobFiltersState,
} from "@/components/JobFilters";
import { getActiveJobs } from "@/data/jobs";
import { SearchX } from "lucide-react";
import type { Job } from "@/types/job";

const groupJobsByArea = (jobs: Job[]) => {
  return jobs.reduce<Record<string, Job[]>>((acc, job) => {
    if (!acc[job.area]) {
      acc[job.area] = [];
    }

    acc[job.area].push(job);
    return acc;
  }, {});
};

const Vagas = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";

  const [filters, setFilters] = useState<JobFiltersState>({
    ...FILTERS_DEFAULT,
    query: initialQ,
  });

  const allJobs = useMemo(() => getActiveJobs(), []);

  const areas = useMemo(
    () => Array.from(new Set(allJobs.map((job) => job.area))).sort(),
    [allJobs]
  );

  const locations = useMemo(
    () => Array.from(new Set(allJobs.map((job) => job.location))).sort(),
    [allJobs]
  );

  const workModels = useMemo(
    () => Array.from(new Set(allJobs.map((job) => job.workModel))),
    [allJobs]
  );

  const filteredJobs = useMemo(() => {
    const query = filters.query.trim().toLowerCase();

    return allJobs.filter((job) => {
      if (filters.area !== FILTER_ALL && job.area !== filters.area) return false;
      if (filters.location !== FILTER_ALL && job.location !== filters.location)
        return false;
      if (filters.workModel !== FILTER_ALL && job.workModel !== filters.workModel)
        return false;

      if (query) {
        const searchableContent = `
          ${job.title}
          ${job.area}
          ${job.location}
          ${job.shortDescription}
        `.toLowerCase();

        if (!searchableContent.includes(query)) return false;
      }

      return true;
    });
  }, [allJobs, filters]);

  const groupedJobs = useMemo(() => {
    return groupJobsByArea(filteredJobs);
  }, [filteredJobs]);

  const groupedAreas = useMemo(() => {
    return Object.keys(groupedJobs).sort();
  }, [groupedJobs]);

  useEffect(() => {
    document.title = "Vagas disponíveis | ARTLIMP BRASIL";
  }, []);

  useEffect(() => {
    const next = new URLSearchParams(searchParams);

    if (filters.query) {
      next.set("q", filters.query);
    } else {
      next.delete("q");
    }

    setSearchParams(next, { replace: true });
    
  }, [filters.query]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="bg-gradient-soft border-b border-border/60">
          <div className="container-page py-16 md:py-20">
            <SectionTitle
              eyebrow="Carreiras"
              title="Vagas disponíveis"
              description="Selecione a vaga de sua experiência e veja os pré-requisitos."
            />
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container-page">
            <JobFilters
              value={filters}
              onChange={setFilters}
              areas={areas}
              locations={locations}
              workModels={workModels}
            />

            <div className="mt-6 flex items-baseline justify-between">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {filteredJobs.length}
                </span>{" "}
                {filteredJobs.length === 1
                  ? "vaga encontrada"
                  : "vagas encontradas"}
              </p>
            </div>

            {filteredJobs.length > 0 ? (
              <div className="mt-10 space-y-14">
                {groupedAreas.map((area) => (
                  <section key={area}>
                    <h2 className="mb-6 font-display text-2xl font-semibold text-foreground">
                      {area}
                    </h2>

                    <div className="grid gap-5 md:grid-cols-2">
                      {groupedJobs[area].map((job) => (
                        <JobCard key={job.id} job={job} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <div className="mt-12 rounded-2xl border border-dashed border-border bg-card p-12 text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <SearchX className="h-6 w-6 text-muted-foreground" />
                </div>

                <h3 className="font-display text-lg font-semibold">
                  Nenhuma vaga encontrada
                </h3>

                <p className="text-sm text-muted-foreground mt-1">
                  Tente ajustar os filtros ou refazer sua busca.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Vagas;