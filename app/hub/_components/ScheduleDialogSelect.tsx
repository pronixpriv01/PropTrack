import DynamicCombobox from "./DynamicCombox";

const CategorySelect = ({ categories ,selectedCategory, onChange }: CategorySelectProps) => {
    const options: DynamicComboboxOption<string>[] = categories.map(category => ({
        value: category,
        label: category
    }))

    return (
        <DynamicCombobox
            options={options}
            value={selectedCategory}
            onChange={onChange}
            placeholder="Kategorie asuwählen..."
        />
    );
};

export default CategorySelect;
