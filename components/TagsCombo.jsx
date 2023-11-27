"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function TagsCombo({ tags, value, setValue }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[150px] capitalize justify-between"
        >
          {value
            ? tags.find(
                (tag) => tag.tag_name.toLowerCase() === value.toLowerCase()
              )?.tag_name
            : "Select Tag..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search for a tag..." />
          <CommandEmpty>No Tags found.</CommandEmpty>
          <CommandGroup>
            {tags?.map((tag) => (
              <CommandItem
                key={tag.tag_id}
                value={tag.tag_name}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                {tag.tag_name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
