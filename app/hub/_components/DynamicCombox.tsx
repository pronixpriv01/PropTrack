"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

const DynamicCombobox = ({ options, value = [], onChange, placeholder = "Auswählen..." }: DynamicComboboxProps<any>) => {
    const [open, setOpen] = useState(false);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const handleSelect = (currentValue: any) => {
        const newValue = Array.isArray(value) && value.includes(currentValue)
            ? value.filter((v: any) => v !== currentValue)
            : Array.isArray(value) ? [...value, currentValue] : [currentValue];
        onChange(newValue);
    }

    const ComboboxContent = (
        <Command>
            <CommandInput placeholder="Suche..." />
            <CommandEmpty>Keine Ergebnisse!</CommandEmpty>
            <CommandGroup>
                <CommandList>
                    {options.map((option) => (
                        <CommandItem
                            key={option.value.toString()}
                            value={option.value.toString()}
                            onSelect={() => handleSelect(option.value)}
                        >
                            <Check
                                className={cn(
                                    "mr-2 h-4 w-4",
                                    Array.isArray(value) && value.includes(option.value) ? "opacity-100" : "opacity-0"
                                )}
                            />
                            {option.label}
                        </CommandItem>
                    ))}
                </CommandList>
            </CommandGroup>
        </Command>
    );

    return (
        isMobile ? (
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                    >
                        {Array.isArray(value) && value.length > 0
                            ? value.map((val: any) => options.find((option) => option.value === val)?.label).join(", ")
                            : placeholder
                        }
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </DrawerTrigger>
                <DrawerContent className="w-auto">
                    {ComboboxContent}
                </DrawerContent>
            </Drawer>
        ) : (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                    >
                        {Array.isArray(value) && value.length > 0
                            ? value.map((val: any) => options.find((option) => option.value === val)?.label).join(", ")
                            : placeholder
                        }
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                    {ComboboxContent}
                </PopoverContent>
            </Popover>
        )
    );
};

export default DynamicCombobox;
