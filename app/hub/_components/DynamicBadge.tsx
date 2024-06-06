import { Badge } from "@/components/ui/badge";

const DynamicBadge = ({ category, type }: DynamicBadgeProps) => {
    const badgeVariant = determineBadgeVariant(category, type);
  
    return (
      <Badge variant={badgeVariant}>
        {category}
      </Badge>
    );
  };
  
  function determineBadgeVariant(category: string, type: "AccountRole" | "Reminder" | "Notification") {
    // Logik zur Bestimmung des Variantenwertes basierend auf category und type
    // Hier ein Beispiel:
    if (type === "AccountRole") {
      return "success"; // Annahme: AccountRole sollte immer die success-Variante haben
    } else if (type === "Reminder") {
      return "default"; // Annahme: Reminder sollte immer die default-Variante haben
    } else {
      return "default"; // Annahme: Andere Typen verwenden die default-Variante
    }
  }
  
  export default DynamicBadge;