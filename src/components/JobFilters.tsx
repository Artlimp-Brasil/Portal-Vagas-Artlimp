import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export interface JobFiltersState {
  query: string;
  area: string;
  location: string;
  workModel: string;
}

interface JobFiltersProps {
  value: JobFiltersState;
  onChange: (next: JobFiltersState) => void;
  areas: string[];
  locations: string[];
  workModels: string[];
}

const ALL = "all";

const JobFilters = ({ value, onChange, areas, locations, workModels }: JobFiltersProps) => {
  const hasFilters =
    value.query || value.area !== ALL || value.location !== ALL || value.workModel !== ALL;

  const update = (patch: Partial<JobFiltersState>) => onChange({ ...value, ...patch });

  return (
    <div className="rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-card">
      <div className="grid gap-3 md:grid-cols-12">
        <div className="md:col-span-5 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={value.query}
            onChange={(e) => update({ query: e.target.value })}
            placeholder="Busque por cargo, palavra-chave..."
            className="pl-9 h-11"
          />
        </div>
        <div className="md:col-span-2">
          <Select value={value.area} onValueChange={(v) => update({ area: v })}>
            <SelectTrigger className="h-11"><SelectValue placeholder="Área" /></SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>Todas as áreas</SelectItem>
              {areas.map((a) => (
                <SelectItem key={a} value={a}>{a}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-3">
          <Select value={value.location} onValueChange={(v) => update({ location: v })}>
            <SelectTrigger className="h-11"><SelectValue placeholder="Localidade" /></SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>Todas as localidades</SelectItem>
              {locations.map((l) => (
                <SelectItem key={l} value={l}>{l}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-2">
          <Select value={value.workModel} onValueChange={(v) => update({ workModel: v })}>
            <SelectTrigger className="h-11"><SelectValue placeholder="Modelo" /></SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>Todos os modelos</SelectItem>
              {workModels.map((m) => (
                <SelectItem key={m} value={m}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {hasFilters && (
        <div className="mt-4 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onChange({ query: "", area: ALL, location: ALL, workModel: ALL })}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-1" /> Limpar filtros
          </Button>
        </div>
      )}
    </div>
  );
};

export default JobFilters;
export const FILTERS_DEFAULT: JobFiltersState = { query: "", area: ALL, location: ALL, workModel: ALL };
export const FILTER_ALL = ALL;
