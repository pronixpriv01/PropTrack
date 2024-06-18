"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useState } from "react";

const ComboboxPopover = ({ options, value, onChange, placeholder, label }: PopoverComboboxProps) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex items-center space-x-4">
            {label && <label className="text-sm text-muted-foreground">{label}</label>}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[150px]">
                        {value ? options.find((opt) => opt.value === value)?.label : placeholder}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" side="right" align="start">
                    <Command>
                        <CommandList>
                            <CommandEmpty></CommandEmpty>
                            <CommandGroup>
                                {options.map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        value={option.value}
                                        onSelect={(selectedValue) => {
                                            onChange(selectedValue);
                                            setOpen(false);
                                        }}
                                    >
                                        {option.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default ComboboxPopover;