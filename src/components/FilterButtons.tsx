import SelectButton from "components/SelectButton";
import { Popover, PopoverContent, PopoverTrigger } from "components/Popover";
import CheckBoxNumberIndicator from "components/CheckBoxNumberIndicator";
import { Command, CommandGroup, CommandItem } from "components/Command";
import TickBox from "components/TickBox";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Typography from "./Typography";
import Button from "./Button";

const categoriesData = [
  {
    name: "All Categories",
    count: 621,
  },
  {
    name: "Software Development",
    count: 566,
  },
  {
    name: "Web Application Development",
    count: 566,
  },
  {
    name: "Custom Websites Development",
    count: 302,
  },
  {
    name: "Software Bug Fixes",
    count: 24,
  },
  {
    name: "API & Integrations",
    count: 18,
  },
  {
    name: "Online Coding Lessons",
    count: 16,
  },
  {
    name: "Website Bug Fixes",
    count: 12,
  },

  {
    name: "Other",
    count: 8,
  },
  {
    name: "Website Design",
    count: 7,
  },
];

function FilterButtons() {
  const [selectedValues, setSelectedValues] = useState<any>([]);
  const { t } = useTranslation();

  return (
    <div className="flex items-center flex-wrap [&>*]:mx-2 [&>*]:my-1 -mx-2 -my-1">
      <Popover
        modal={false}
        // open={categoryPopover}
        // onOpenChange={setCategoryPopover}
      >
        <PopoverTrigger asChild>
          <SelectButton
            title={t("Category")}
            isActive={selectedValues.length !== 0}
          />
        </PopoverTrigger>
        <PopoverContent
          className="w-[26rem] flex flex-col p-0 [&>*]:px-5"
          align="end"
          sideOffset={10}
        >
          <header className="py-2 flex items-center dark:border-woodsmoke-500 border-b">
            <Typography variant="lg">Category</Typography>
          </header>

          <div className="flex-1 overflow-auto py-4">
            <Command>
              <CommandGroup>
                {categoriesData.map((item) => {
                  const isSelected = Boolean(
                    selectedValues.find((val: any) => val === item.name)
                  );

                  return (
                    <CommandItem
                      key={item.name}
                      value={item.name}
                      onSelect={() => {
                        if (isSelected) {
                          setSelectedValues(
                            selectedValues.filter((val: any) =>
                              val === item.name ? null : val
                            )
                          );
                        } else {
                          setSelectedValues((val: any) => [...val, item.name]);
                        }
                      }}
                    >
                      <CheckBoxNumberIndicator
                        number={item.count}
                        indicatorClassName="w-8"
                        className="w-full"
                      >
                        <div className="flex space-x-2 items-center">
                          <TickBox isChecked={isSelected} />
                          <Typography>{item.name}</Typography>
                        </div>

                        {/* <Checkbox
                              label={item.name + " " + isSelected}
                              // isChecked={isSelected}
                              // onChange={() => {}}
                            /> */}
                      </CheckBoxNumberIndicator>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </Command>
          </div>

          <footer className="py-2 flex items-center justify-between dark:border-woodsmoke-500 border-t">
            <Button variant="simple" className="px-0 h-auto">
              Clear All
            </Button>

            <Button
              size="sm"
              onClick={() => {
                console.log(selectedValues);
                // setCategoryPopover(false);
              }}
            >
              Apply
            </Button>
          </footer>
        </PopoverContent>
      </Popover>

      <SelectButton title={t("Time")} />
      <SelectButton title={t("Budget")} />
    </div>
  );
}

export default FilterButtons;
