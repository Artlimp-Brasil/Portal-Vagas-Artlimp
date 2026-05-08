import { Label } from "@/components/ui/label";

interface FieldProps {
  label: string;
  error?: string;
  required?: boolean;
  description?: string;
  children: React.ReactNode;
}

const Field = ({ label, error, required, description, children }: FieldProps) => (
  <div className="space-y-1.5">
    <Label className="text-xs font-medium text-foreground/80">
      {label} {required && <span className="text-destructive">*</span>}
    </Label>

    {description && (
      <p className="text-xs text-muted-foreground">
        {description}
      </p>
    )}

    {children}

    {error && <p className="text-xs text-destructive">{error}</p>}
  </div>
);

export default Field