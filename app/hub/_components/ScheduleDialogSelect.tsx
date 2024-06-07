import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select";

const CategorySelect = ({ categories ,selectedCategory, onChange }: CategorySelectProps) => {
    return (
        <Select value={selectedCategory} onValueChange={onChange}>
            <SelectTrigger>
                <SelectValue placeholder="Kategorie auswählen" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Kategorie:</SelectLabel>
                    {categories.map((category, index) => (
                        <SelectItem key={index} value={category}>
                            {category}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default CategorySelect;
