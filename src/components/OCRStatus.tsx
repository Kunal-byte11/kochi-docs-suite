import { CheckCircle, AlertCircle, Clock, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface OCRStatusProps {
  status: "processing" | "completed" | "failed";
  confidence?: number;
}

export function OCRStatus({ status, confidence }: OCRStatusProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "processing":
        return {
          icon: Clock,
          label: "Processing",
          variant: "secondary" as const,
          className: "bg-info/10 text-info hover:bg-info/20"
        };
      case "completed":
        return {
          icon: CheckCircle,
          label: confidence ? `${confidence}% confidence` : "Completed",
          variant: "secondary" as const,
          className: "bg-success/10 text-success hover:bg-success/20"
        };
      case "failed":
        return {
          icon: XCircle,
          label: "Failed",
          variant: "destructive" as const,
          className: "bg-destructive/10 text-destructive hover:bg-destructive/20"
        };
      default:
        return {
          icon: AlertCircle,
          label: "Unknown",
          variant: "secondary" as const,
          className: "bg-warning/10 text-warning hover:bg-warning/20"
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <Badge 
      variant={config.variant}
      className={cn("flex items-center gap-1 text-xs", config.className)}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
}