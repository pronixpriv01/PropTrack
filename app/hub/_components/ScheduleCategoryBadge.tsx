import { cn } from "@/lib/utils";

interface ScheduleCategoryBadgeProps {
    category: string;
}

const categoryStyles = {
    Meeting: 'bg-blue-500',
    Interview: 'bg-red-500',
    Discussion: 'bg-green-500',
    default: 'bg-gray-500',
};

const ScheduleCategoryBadge = ({ category }: ScheduleCategoryBadgeProps) => {
    const categoryColor = categoryStyles[category as keyof typeof categoryStyles] || categoryStyles.default;

    return <div className={cn('w-[3px] h-16', categoryColor)} />
};

export default ScheduleCategoryBadge;