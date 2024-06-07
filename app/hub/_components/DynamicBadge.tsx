import { Badge } from "@/components/ui/badge";

const DynamicBadge = ({ category, type }: DynamicBadgeProps) => {
    const badgeVariant = determineBadgeVariant(category, type);
  
    return (
      <Badge 
        className="cursor-pointer"
        variant={badgeVariant}>
        {category}
      </Badge>
    );
  };
  
  function determineBadgeVariant(category: string, type: "AccountRole" | "Reminder" | "Notification") {
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
        return "default";
    } else {
        return "default";
    }
  }
  
  export default DynamicBadge;