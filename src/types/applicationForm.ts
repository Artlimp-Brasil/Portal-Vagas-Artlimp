export interface ApplicationFormProps {
  jobTitle: string;
}

export interface ApplicationFormState {
  name: string;
  email: string;
  phone: string;
  city: string;
  otherCity: string;
  linkedin: string;
  salary: string;
  resumeName: string;
  resumeFile: File,
  gender: string;
  experience: string;
  maritalStatus: string;
  birthDate: string;
  professionalJourney: string;
  aboutYou: string;
  job: string;
}

export type ApplicationFormErrors = Partial<
  Record<keyof ApplicationFormState, string>
>;

export type ApplicationStep = 1 | 2;


