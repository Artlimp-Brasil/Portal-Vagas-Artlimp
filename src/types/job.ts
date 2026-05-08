export type WorkModel = "Presencial" | "Híbrido" | "Remoto";

export interface JobRegion {
  baseCity: string;
  coverage: string[];
}


export interface Job {
  id: string;
  slug: string;
  title: string;
  area: string;
  location: string;
  workModel: WorkModel;
  contractType: string;
  workSchedule: string;
  lunchBreak: string;
  shortDescription: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  differentials: string[];
  benefits: string[];
  steps: string[];
  regions?: JobRegion[];
  isActive: boolean;
  compensation?: {
    growthExpectation: string;
    commission: string;
    costAid: string[];
    reimbursements: string[];
    bonuses: string[];
  };
}