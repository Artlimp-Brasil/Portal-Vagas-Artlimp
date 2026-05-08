import {
  ListChecks,
  CheckCircle2,
  Sparkles,
  Gift,
  Clock,
  MapPinned,
  Route,
  TrendingUp,
  DollarSign,
} from "lucide-react";

import type { Job } from "@/types/job";

interface Props {
  job: Job;
}

const Block = ({ title, icon: Icon, children }: any) => (
  <div>
    <h2 className="flex items-center gap-2 font-display text-xl font-semibold mb-4">
      {Icon && <Icon className="h-5 w-5 text-primary" />}
      {title}
    </h2>
    {children}
  </div>
);

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="space-y-2.5">
    {items.map((item) => (
      <li key={item} className="flex gap-3">
        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const ExternalSalesPjJobDetail = ({ job }: Props) => {
  return (
    <div className="space-y-10">

      <Block title="Sobre a vaga">
        <p className="text-muted-foreground leading-relaxed">
          {job.description}
        </p>
      </Block>

      
      <Block title="Modelo de crescimento e ganhos" icon={TrendingUp}>
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
          <p className="font-medium">
            {job.compensation?.growthExpectation}
          </p>

          <div>
            <p className="font-semibold">Comissão</p>
            <p className="text-muted-foreground">
              {job.compensation?.commission}
            </p>
          </div>

          <div>
            <p className="font-semibold">Ajuda de custo (progressiva)</p>
            <BulletList items={job.compensation?.costAid || []} />
          </div>
        </div>
      </Block>

      <Block title="Reembolsos" icon={DollarSign}>
        <BulletList items={job.compensation?.reimbursements || []} />
      </Block>

      <Block title="Bonificações" icon={DollarSign}>
        <BulletList items={job.compensation?.bonuses || []} />
      </Block>

      {/* REGIÕES */}
      {job.regions && (
        <Block title="Regiões de atendimento" icon={MapPinned}>
          <div className="grid gap-4 md:grid-cols-2">
            {job.regions.map((region) => (
              <div key={region.baseCity} className="p-5 border rounded-xl">
                <h3 className="font-semibold">
                  Representante residente em: {region.baseCity}
                </h3>

                <div className="mt-2 flex flex-wrap gap-2">
                  {region.coverage.map((city) => (
                    <span
                      key={city}
                      className="bg-muted px-3 py-1 rounded-full text-sm"
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

      <Block title="Diferenciais" icon={Sparkles}>
        <BulletList items={job.differentials} />
      </Block>

      <Block title="Estrutura oferecida" icon={Gift}>
        <BulletList items={job.benefits} />
      </Block>

      <Block title="Etapas do processo" icon={Route}>
        <BulletList items={job.steps} />
      </Block>

      <Block title="Horário de trabalho" icon={Clock}>
        <p>{job.workSchedule}</p>
        <p className="text-sm text-muted-foreground mt-2">
          {job.lunchBreak}
        </p>
      </Block>

    </div>
  );
};

export default ExternalSalesPjJobDetail;