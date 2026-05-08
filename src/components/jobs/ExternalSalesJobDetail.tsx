import {
  CheckCircle2,
  ListChecks,
  Sparkles,
  Gift,
  Clock,
  MapPinned,
  Route,
  Car,
} from "lucide-react";

import type { Job } from "@/types/job";

interface ExternalSalesJobDetailProps {
  job: Job;
}

const ExternalSalesJobDetail = ({ job }: ExternalSalesJobDetailProps) => {
  return (
    <>
      <Block title="Sobre a vaga">
        <p className="text-muted-foreground leading-relaxed">
          {job.description}
        </p>
      </Block>

      <Block title="Como será sua atuação" icon={Car}>
        <p className="text-muted-foreground leading-relaxed">
          Esta é uma posição externa, com foco em visitas comerciais,
          prospecção, demonstração técnica de produtos, instalação de
          equipamentos e acompanhamento dos clientes no pós-venda.
        </p>
      </Block>

      {job.regions && job.regions.length > 0 && (
        <Block title="Regiões de atendimento" icon={MapPinned}>
          <div className="grid gap-4 md:grid-cols-2">
            {job.regions.map((region) => (
              <div
                key={region.baseCity}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <h3 className="font-semibold text-foreground">
                  Representante residente em: {region.baseCity}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  Cidades atendidas:
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {region.coverage.map((city) => (
                    <span
                      key={city}
                      className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Block>
      )}

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

      <Block title="Benefícios" icon={Gift}>
        <BulletList items={job.benefits} />
      </Block>

      {job.steps && job.steps.length > 0 && (
        <Block title="Etapas do processo seletivo" icon={Route}>
          <BulletList items={job.steps} />
        </Block>
      )}

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

export default ExternalSalesJobDetail;