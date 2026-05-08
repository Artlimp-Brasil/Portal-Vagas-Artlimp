import { ApplicationFormState } from "@/types/applicationForm";

const API_URL = import.meta.env.VITE_API_URL;

export async function handleSubmitApplication(data: ApplicationFormState) {
  try {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("city", data.city);
    formData.append("otherCity", data.otherCity || "");
    formData.append("linkedin", data.linkedin || "");
    formData.append("salary", data.salary);
    formData.append("resumeName", data.resumeName || "");
    formData.append("gender", data.gender);
    formData.append("maritalStatus", data.maritalStatus);
    formData.append("birthDate", data.birthDate);
    formData.append("professionalJourney", data.professionalJourney);
    formData.append("aboutYou", data.aboutYou);
    formData.append("job", data.job);
    formData.append("experience",data.experience)
    formData.append("company", "Artlimp Brasil");
    formData.append("resumeFile", data.resumeFile);

    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Erro ao enviar candidatura");
    }

    return result;

  } catch (error: any) {
    throw new Error( "Erro inesperado" );
  }
}