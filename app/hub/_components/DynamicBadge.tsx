import { Badge } from "@/components/ui/badge";

const DynamicBadge = ({ category, type, role }: DynamicBadgeProps) => {
    const badgeVariant = determineBadgeVariant(category, type, role);
  
    return (
      <Badge 
        className="cursor-pointer"
        variant={badgeVariant !== undefined ? badgeVariant: "default"}>
        {category}
      </Badge>
    );
  };
  
  function determineBadgeVariant(category: string, type: NotificationType, role: AccountRoles): VariantType {
    if (role === "Manager Developer") {
      return "success";
    } else if (role === "Marketing") {
      return "secondary";
    } else if (role === "CEO") {
      return "message";
    }
    
    if (type === "assignment") {
      return "reminder";
    } else if (type === "status_change") {
      return "message";
    } else if (type === "general") {
      return "notification";
    }

    // Fallback-Wert
    return "default";
  }
  
  export default DynamicBadge;