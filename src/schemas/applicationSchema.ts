import { z } from "zod";
import { onlyNumbers } from "@/utils/masks"

export const stepOneSchema = z
  .object({
    name: z.string().trim().min(1, "Informe seu nome"),
    email: z.string().trim().min(1, "Informe seu e-mail").email("E-mail inválido"),

    phone: z.string().trim().min(1, "Informe seu telefone").refine(
      (value) => {
        const digits = onlyNumbers(value);
        return digits.length === 10 || digits.length === 11;
      },
      { message: "Informe um telefone válido com DDD" }
    ),

    city: z.string().trim().min(1, "Informe sua cidade"),
    otherCity: z.string().optional(),

    linkedin: z
      .string()
      .trim()
      .transform((val) => (val === "" ? undefined : val))
      .optional()
      .refine((value) => !value || value.includes("linkedin.com/in/"), {
        message: "Informe o link do seu perfil do LinkedIn",
      })
      .refine((value) => !value || z.string().url().safeParse(value).success, {
        message: "Informe um link válido",
      }),

    salary: z.string().trim().min(1, "Informe sua pretensão salarial").refine(
      (value) => onlyNumbers(value).length > 0,
      { message: "Informe um valor válido" }
    ),

    resumeName: z.string().trim().min(1, "Anexe seu currículo"),
  })
  .superRefine((data, ctx) => {
    if (data.city === "Outras" && !data.otherCity?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["otherCity"],
        message: "Informe sua cidade",
      });
    }
  });

export const stepTwoSchema = z.object({
  gender: z.string().trim().min(1, "Informe seu gênero"),
  experience: z.string().trim().min(1, "Informe sua experiência"),
  maritalStatus: z.string().trim().min(1, "Informe seu estado civil"),
  birthDate: z
    .string()
    .trim()
    .min(1, "Informe sua data de nascimento")

    // valida se é uma data válida
    .refine((value) => {
      const date = new Date(value);
      return !isNaN(date.getTime());
    }, {
      message: "Informe uma data válida",
    })

    // valida se não é no futuro
    .refine((value) => {
      const date = new Date(value);
      const today = new Date();

      today.setHours(0, 0, 0, 0);

      return date <= today;
    }, {
      message: "A data de nascimento não pode ser no futuro",
    })

    // valida idade mínima (16 anos)
    .refine((value) => {
      const birth = new Date(value);
      const today = new Date();

      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birth.getDate())
      ) {
        age--;
      }

      return age >= 16;
    }, {
      message: "Você deve ter pelo menos 16 anos",
    }),

  professionalJourney: z.string().trim().min(5, "Conte um pouco sobre sua trajetória profissional"),
  aboutYou: z.string().trim().min(5, "Conte um pouco sobre você"),
});