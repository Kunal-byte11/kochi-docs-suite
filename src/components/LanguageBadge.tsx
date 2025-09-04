import { Badge } from "@/components/ui/badge";

interface LanguageBadgeProps {
  language: "en" | "ml";
}

export function LanguageBadge({ language }: LanguageBadgeProps) {
  const config = {
    en: { label: "English", flag: "🇺🇸" },
    ml: { label: "മലയാളം", flag: "🇮🇳" }
  };

  const { label, flag } = config[language];

  return (
    <Badge variant="outline" className="text-xs">
      <span className="mr-1">{flag}</span>
      {label}
    </Badge>
  );
}