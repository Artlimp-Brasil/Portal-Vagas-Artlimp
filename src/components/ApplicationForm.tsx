import { useState, type FormEvent } from "react";
import { CheckCircle2, Upload, Send, Instagram, Facebook, Linkedin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Field from "@/components/Field"
import { FieldLabel } from "@/components/ui/field"
import { toast } from "sonner";
import { onlyNumbers, formatCurrencyBRL, formatPhone } from "@/utils/masks"
import { cityOptions, experienceOptions, genderOptions, maritalStatusOptions } from "@/constants/applicationOptions"
import { stepOneSchema, stepTwoSchema } from "@/schemas/applicationSchema"
import { getZodErrors } from "@/utils/zodErrors";
import { ApplicationFormProps, ApplicationFormState } from "@/types/applicationForm";
import { handleSubmitApplication } from "@/service/applicationService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import parseLocalDate from "@/utils/parseDate";

const initialState: ApplicationFormState = {
  name: "",
  email: "",
  phone: "",
  city: "",
  otherCity: "",
  linkedin: "",
  salary: "",
  resumeName: "",
  resumeFile: null,
  job: "",
  gender: "",
  experience: "",
  maritalStatus: "",
  birthDate: "",
  professionalJourney: "",
  aboutYou: "",
};


const ApplicationForm = ({ jobTitle }: ApplicationFormProps) => {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<ApplicationFormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof ApplicationFormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [isDraggingResume, setIsDraggingResume] = useState(false);


  const update = <K extends keyof ApplicationFormState>(key: K, value: ApplicationFormState[K]) => {
    setForm((p) => ({
      ...p,
      [key]: value,
      ...(key === "city" && value !== "Outras" ? { otherCity: "" } : {}),
    }));

    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const handleResumeDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDraggingResume(false);

    const file = event.dataTransfer.files?.[0];
    handleResumeFile(file);
  };

  const validateStepOne = (): boolean => {
    const result = stepOneSchema.safeParse({
      name: form.name,
      email: form.email,
      phone: form.phone,
      city: form.city,
      otherCity: form.otherCity,
      linkedin: form.linkedin,
      salary: form.salary,
      resumeName: form.resumeName,
    });

    const zodErrors = getZodErrors(result);
    setErrors(zodErrors);

    return result.success;
  };

  const handleResumeFile = (file?: File) => {
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const allowedExtensions = [".pdf", ".doc", ".docx"];

    const hasAllowedType = allowedTypes.includes(file.type);
    const hasAllowedExtension = allowedExtensions.some((extension) =>
      file.name.toLowerCase().endsWith(extension)
    );

    if (!hasAllowedType && !hasAllowedExtension) {
      toast.error("Envie um currículo em PDF, DOC ou DOCX.");
      return;
    }

    update("resumeName", file.name);
    update("resumeFile", file);
  };
  const handleRemoveResume = () => {
    update("resumeName", "");
    update("resumeFile", null);
  };

  const validateStepTwo = (): boolean => {
    const result = stepTwoSchema.safeParse({
      gender: form.gender,
      maritalStatus: form.maritalStatus,
      experience: form.experience,
      birthDate: form.birthDate,
      professionalJourney: form.professionalJourney,
      aboutYou: form.aboutYou,
    });

    const zodErrors = getZodErrors(result);
    setErrors(zodErrors);

    return result.success;
  };

  const handleNextStep = () => {
    const isValid = validateStepOne();

    if (!isValid) {
      toast.error("Preencha corretamente os campos obrigatórios da primeira etapa.");
      return;
    }

    setErrors({});
    setCurrentStep(2);
  };


  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();

    if (!validateStepTwo()) {
      toast.error("Verifique os campos obrigatórios.");
      return;
    }

    try {
      setSubmitting(true);
      await handleSubmitApplication(
        {
          ...form,
          job: jobTitle,
          salary: String(Number(onlyNumbers(form.salary)) / 100),
          phone: onlyNumbers(form.phone),
          resumeFile: form.resumeFile
        }
      );

      setSuccess(true);
      toast.success("Candidatura enviada com sucesso!", { 
        style: {
          background: "#53a653",
          color: "#fff",
        },
      });

    } catch (error) {
      toast.error("Erro ao enviar candidatura", {
        style: {
          background: "#ef4444",
          color: "#fff",
        },
      });

    } finally {
      setSubmitting(false);
      setCurrentStep(1);
    }
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 shadow-elevated text-center animate-fade-up">
        <div className="mx-auto h-14 w-14 rounded-full bg-success/10 text-success flex items-center justify-center mb-4">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="font-display text-xl font-semibold">Candidatura enviada!</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Recebemos seus dados para a vaga <strong className="text-foreground">{jobTitle}</strong>.
          Em breve nosso time entrará em contato.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3">
          <p className="text-sm text-muted-foreground text-center">
            Quer acompanhar novas vagas e novidades da empresa?
            <br />
            Siga a gente nas redes sociais:
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/artlimpbrasil"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <Instagram className="h-5 w-5 text-pink-500" />
            </a>

            <a
              href="https://www.facebook.com/share/1KrZSquqBz/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <Facebook className="h-5 w-5 text-blue-600" />
            </a>

            <a
              href="https://www.linkedin.com/company/artlimpbrasil/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <Linkedin className="h-5 w-5 text-blue-500" />
            </a>
          </div>
        </div>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => { setSuccess(false); setForm(initialState); }}
        >
          Enviar outra candidatura
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border bg-card p-6 shadow-elevated space-y-4  max-h-[85vh] overflow-y-auto"
      noValidate
    >
      <div>
        <h3 className="font-display text-lg font-semibold">Candidate-se a esta vaga</h3>
        <p className="text-xs text-muted-foreground mt-1">Preencha os dados abaixo. Leva menos de 2 minutos.</p>
      </div>
      <div className="flex gap-6 border-b border-border">
        <button
          type="button"
          onClick={() => {
            setCurrentStep(1);
            setErrors({});
          }}
          className={`pb-2 text-sm font-medium transition-colors ${currentStep === 1
            ? "border-b-2 border-primary text-primary"
            : "text-muted-foreground hover:text-foreground"
            }`}
        >
          1. Informações
        </button>

        <button
          type="button"
          onClick={handleNextStep}
          className={`pb-2 text-sm font-medium transition-colors ${currentStep === 2
            ? "border-b-2 border-primary text-primary"
            : "text-muted-foreground hover:text-foreground cursor-not-allowed"
            }`}
          disabled={currentStep === 1}
        >
          2. Sobre você
        </button>
      </div>{currentStep === 1 && (
        <>
          <Field label="Nome completo" error={errors.name} required>
            <Input value={form.name} onChange={(e) => update("name", e.target.value)} maxLength={120} />
          </Field>

          <Field label="E-mail" error={errors.email} required>
            <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} maxLength={160} />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Telefone / WhatsApp" error={errors.phone} required>
              <Input
                inputMode="numeric"
                placeholder="(19) 99999-9999"
                value={form.phone}
                onChange={(e) => update("phone", formatPhone(e.target.value))}
                maxLength={15}
              />
            </Field>
            <Field label="Cidade" error={errors.city} required>
              <Select
                value={form.city}
                onValueChange={(value) => update("city", value)}
              >
                <SelectTrigger className="h-10 rounded-xl">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>

                <SelectContent>
                  {cityOptions.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
          {form.city === "Outras" && (
            <Field
              label="Qual sua cidade? Você tem disponibilidade para se mudar? "
              error={errors.otherCity}
              required
            >
              <Input
                value={form.otherCity}
                onChange={(e) => update("otherCity", e.target.value)}
                maxLength={80}
                placeholder="Digite sua cidade"
              />
            </Field>
          )}
          <Field label="LinkedIn" error={errors.linkedin}>
            <Input
              type="url"
              placeholder="https://www.linkedin.com/in/seu-perfil"
              value={form.linkedin}
              onChange={(e) => update("linkedin", e.target.value)}
              maxLength={200}
            />
          </Field>

          <Field label="Pretensão salarial" error={errors.salary} required>

            <Input
              inputMode="numeric"
              placeholder="R$ 0.000,00"
              value={form.salary}
              onChange={(e) => update("salary", formatCurrencyBRL(e.target.value))}
              maxLength={20}
            />
          </Field>

          <Field label="Currículo" error={errors.resumeName} required>
            <label
              htmlFor="resumeFile"
              onDragOver={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setIsDraggingResume(true);
              }}
              onDragLeave={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setIsDraggingResume(false);
              }}
              onDrop={handleResumeDrop}
              className={cn(
                "relative flex min-h-[120px] cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed p-5 text-center text-sm transition-all",
                "hover:border-primary hover:bg-primary/5",
                isDraggingResume
                  ? "scale-[1.02] border-primary bg-primary/10 shadow-md"
                  : "border-border bg-background text-muted-foreground"
              )}
            >
              <input
                id="resumeFile"
                name="resumeFile"
                type="file"
                accept=".pdf,.doc,.docx"
                className="sr-only"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  handleResumeFile(file);
                  event.target.value = "";
                }}
              />

              <div
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-full transition-colors",
                  isDraggingResume ? "bg-primary text-primary-foreground" : "bg-muted text-primary"
                )}
              >
                <Upload className="h-5 w-5" />
              </div>

              {form.resumeName ? (
                <div className="max-w-full pr-8">
                  <p className="truncate font-medium text-foreground">
                    {form.resumeName}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Clique para substituir ou arraste outro arquivo
                  </p>
                </div>
              ) : (
                <div>
                  <p className="font-medium text-foreground">
                    Clique ou arraste seu currículo aqui
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Formatos aceitos: PDF, DOC ou DOCX
                  </p>
                </div>
              )}

              {form.resumeFile && (
                <button
                  type="button"
                  aria-label="Remover currículo"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    handleRemoveResume();
                  }}
                  className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs text-foreground transition-colors hover:bg-destructive hover:text-destructive-foreground"
                >
                  ✕
                </button>
              )}
            </label>
          </Field>

        </>
      )}
      {currentStep === 2 && (
        <>
          <Field label="Gênero" error={errors.gender} required>
            <Select
              value={form.gender}
              onValueChange={(value) => update("gender", value)}
            >
              <SelectTrigger className="h-11 rounded-xl">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>

              <SelectContent>
                {genderOptions.map((gender) => (
                  <SelectItem key={gender} value={gender}>
                    {gender}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Estado civil" error={errors.maritalStatus} required>
            <Select
              value={form.maritalStatus}
              onValueChange={(value) => update("maritalStatus", value)}
            >
              <SelectTrigger className="h-11 rounded-xl">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>

              <SelectContent>
                {maritalStatusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="Data de nascimento" error={errors.birthDate} required>
            <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="birthDate"
                  className="h-11 w-full justify-start rounded-xl font-normal"
                >
                  {form.birthDate
                    ? format(parseLocalDate(form.birthDate), "dd/MM/yyyy", { locale: ptBR })
                    : "Selecione sua data de nascimento"}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                  mode="single"
                  selected={form.birthDate ? parseLocalDate(form.birthDate) : undefined}
                  defaultMonth={form.birthDate ? parseLocalDate(form.birthDate) : undefined}
                  captionLayout="dropdown"
                  startMonth={new Date(1940, 0)}
                  endMonth={new Date()}
                  disabled={(date) => date > new Date()}
                  locale={ptBR}
                  onSelect={(date) => {
                    if (!date) return;

                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const day = String(date.getDate()).padStart(2, "0");

                    update("birthDate", `${year}-${month}-${day}`);
                    setDatePickerOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </Field>

          <Field label="Quanto tempo de experiência comprovada na area de interesse?" error={errors.experience} required>
            <Select
              value={form.experience}
              onValueChange={(value) => update("experience", value)}
            >
              <SelectTrigger className="h-11 rounded-xl">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>

              <SelectContent>
                {experienceOptions.map((experience) => (
                  <SelectItem key={experience} value={experience}>
                    {experience}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field
            label="Nos conte sobre sua trajetória profissional"
            error={errors.professionalJourney}
            required
            description="Fale um pouco sobre os locais que você trabalhou, o que aprendeu e o que gostaria de fazer no seu próximo emprego…"
          >
            <Textarea
              rows={5}
              maxLength={1000}
              value={form.professionalJourney}
              onChange={(e) => update("professionalJourney", e.target.value)}
              placeholder="Digite aqui sua trajetória profissional"
            />
          </Field>
          <Field
            label="Nos conte sobre você"
            error={errors.aboutYou}
            required
            description="Queremos te conhecer melhor! Nos conte um pouco sobre sua vida pessoal, seu dia a dia, o que você gosta de fazer…"
          >
            <Textarea
              rows={5}
              maxLength={1000}
              value={form.aboutYou}
              onChange={(e) => update("aboutYou", e.target.value)}
              placeholder="Digite aqui um pouco sobre você"
            />
          </Field>
        </>
      )}
      {currentStep === 1 ? (
        <Button
          type="button"
          onClick={handleNextStep}
          className="w-full h-11 bg-gradient-primary hover:opacity-95 shadow-glow"
        >
          Avançar
        </Button>
      ) : (
        <Button
          type="button"
          onClick={onSubmit}
          disabled={submitting}
          className="w-full h-11 bg-gradient-primary hover:opacity-95 shadow-glow"
        >
          <Send className="h-4 w-4 mr-2" />
          {submitting ? "Enviando..." : "Enviar candidatura"}
        </Button>
      )}
    </form>
  );
};

export default ApplicationForm;
