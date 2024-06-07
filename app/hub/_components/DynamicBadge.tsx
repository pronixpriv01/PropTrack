import { Badge } from "@/components/ui/badge";

const DynamicBadge = ({ category, type }: DynamicBadgeProps) => {
    const badgeVariant = determineBadgeVariant(category, type);
  
    return (
      <Badge 
        className="cursor-pointer"
        variant={badgeVariant !== undefined ? badgeVariant: "default"}>
        {category}
      </Badge>
    );
  };
  
  function determineBadgeVariant(category: string, type: NotificationType): VariantType {
    if (type === "AccountRole") {
      switch (category) {
        case "Manager Developer":
          return "success";
        case "Marketing":
          return "secondary";
        default:
          return "default";
      }
    } else if (type === "Reminder") {
      return "reminder";
    } else if (type === "Notification") {
      if (category === "Message") {
        return "message";
      } else {
        return "notification";
      }
    }
  
    // Fallback-Wert
    return "default";
  }
  
  export default DynamicBadge;