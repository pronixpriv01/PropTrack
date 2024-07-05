import { Badge } from "@/components/ui/badge";
import { notificationsCategoryStyles } from "@/constants"
import { cn, getAccountRoleStyles } from "@/lib/utils";

const CategoryBadge = ({ category, type, role }: CategoryBadgeProps) => {
    const categoryStyle = notificationsCategoryStyles[category as keyof typeof notificationsCategoryStyles] || notificationsCategoryStyles.default;
  
    const isAccountRole = (role: string): role is AccountRoles => {
      return ["Manager Developer", "Marketing", "Developer", "DevOps", "Mobile Dev", "CEO", "TestUser"].includes(role);
    };
  
    return (
      <div>
        {isAccountRole(role) ? (
          <Badge variant="success">
            {category}
          </Badge>
        ) : (
          <div className={cn('category-badge flex items-center', categoryStyle.borderColor, categoryStyle.chipBackgroundColor)}>
            <div className={cn('size-2 rounded-full', categoryStyle.backgroundColor)} />
            <p className={cn('text-[12px] font-medium', categoryStyle.textColor, 'ml-2')}>
              {type === "general" ? (
                <Badge variant="default">{category}</Badge>
              ) : category}
            </p>
          </div>
        )}
      </div>
    );
  };
  
  export default CategoryBadge;