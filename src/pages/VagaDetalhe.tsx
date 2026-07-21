import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Building2,
  Laptop2,
  CheckCircle2,
  ListChecks,
  Sparkles,
  Gift,
  Clock,
  Brain,
  DollarSign,
  TrendingUp

} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ApplicationForm from "@/components/ApplicationForm";
import { getJobBySlug } from "@/data/jobs";
import NotFound from "@/pages/NotFound";
import ExternalSalesJobDetail from "@/components/jobs/ExternalSalesJobDetail";
import ExternalSalesPjJobDetail from "@/components/jobs/ExternalSalesPjJobDetail";

const VagaDetalhe = () => {
  const { slug } = useParams<{ slug: string }>();
  const job = slug ? getJobBySlug(slug) : undefined;

  useEffect(() => {
    if (job) document.title = `${job.title} | ARTLIMP BRASIL`;
  }, [job]);

  if (!job) return <NotFound />;

  const meta = [
    { icon: MapPin, label: job.location },
    { icon: Laptop2, label: job.workModel },
    { icon: Briefcase, label: job.contractType },
    { icon: Building2, label: job.area },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="bg-gradient-soft border-b border-border/60">
          <div className="container-page py-10 md:py-14">
            <Link
              to="/vagas"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para vagas
            </Link>

            <div className="max-w-3xl">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
                {job.area}
              </span>

              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                {job.title}
              </h1>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
                {meta.map((m) => (
                  <span
                    key={m.label}
                    className="inline-flex items-center gap-1.5"
                  >
                    <m.icon className="h-4 w-4 text-primary" />
                    {m.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container-page grid gap-10 lg:grid-cols-3 lg:items-start">
            <article className="lg:col-span-2 space-y-10">
              {
                job.slug === "representante-comercial-tecnico-pj" ? (
                  <ExternalSalesPjJobDetail job={job} />
                ) :
                  job.slug.includes("representante-comercial-tecnico") ? (
                    <ExternalSalesJobDetail job={job} />
                  ) : (
                    <>
                      <Block title="Sobre a vaga">
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                          {job.description.split("\n").map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                          ))}
                        </div>
                      </Block>

                      <Block title="Responsabilidades" icon={ListChecks}>
                        <BulletList items={job.responsibilities} />
                      </Block>

                      <Block title="Requisitos" icon={CheckCircle2}>
                        <BulletList items={job.requirements} />
                      </Block>

                      {job.differentials.length > 0 && (
                        <Block title="Diferenciais" icon={Sparkles}>
                          <BulletList items={job.differentials} />
                        </Block>
                      )}

                      {job.perfil && job.perfil.length > 0 && (
                        <Block title="Perfil que Buscamos" icon={Sparkles}>
                          <BulletList items={job.perfil} />
                        </Block>
                      )}

                      {job.abilities && job.abilities.length > 0 && (
                        <Block title="Competências e Habilidades" icon={Brain}>
                          <BulletList items={job.abilities} />
                        </Block>
                      )}

                      <Block title="Benefícios" icon={Gift}>
                        <BulletList items={job.benefits} />
                      </Block>

                      <Block title="Horário de trabalho" icon={Clock}>
                        <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              Jornada de trabalho
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                              {job.workSchedule}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              Horário de almoço
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                              {job.lunchBreak}
                            </p>
                          </div>
                        </div>
                      </Block>
                    </>
                  )}
            </article>

            <aside className="lg:sticky lg:top-24">
              <ApplicationForm jobTitle={job.title} />
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

interface BlockProps {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}

const Block = ({ title, icon: Icon, children }: BlockProps) => (
  <div>
    <h2 className="flex items-center gap-2 font-display text-xl md:text-2xl font-semibold mb-4">
      {Icon && <Icon className="h-5 w-5 text-primary" />}
      {title}
    </h2>
    {children}
  </div>
);


const BulletList = ({ items }: { items: string[] }) => (
  <ul className="space-y-2.5">
    {items.map((item) => (
      <li key={item} className="flex gap-3 text-foreground/90 leading-relaxed">
        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

export default VagaDetalhe;