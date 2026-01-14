import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "../../Popover";
import { Button } from "../../Button";
import { HiMenuAlt2 } from "react-icons/hi";
import TextInput from "../../TextInput";
import { DateInput } from "../../DateInput";
import DropdownInput from "../../DropdownInput";
import { buildResetValues } from "@/utils/constant";
import Typography from "../../Typography";
import type { FilterField } from "@/types/filter";

export const TableFilter = ({
  filters,
  defaultValues,
  onApply,
  onReset,
}: {
  filters: FilterField[];
  defaultValues?: Record<string, any>;
  onApply: (values: Record<string, any>) => void;
  onReset?: () => void;
}) => {
  const [open, setOpen] = useState(false);

  const {
    control,
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const handleReset = () => {
    const resetValues = buildResetValues(filters);

    reset(resetValues);

    // Force-update controlled fields (important)
    Object.entries(resetValues).forEach(([key, value]) => {
      setValue(key, value, {
        shouldDirty: false,
        shouldTouch: false,
        shouldValidate: false,
      });
    });

    onReset?.();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="small"
          type="button"
          variant={"outline"}
          className="text-xs border-[#D3D3D3] text-[#4B4B4B]"
        >
          <HiMenuAlt2 size={20} />
          Filter By
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sameWidthAsTrigger
        align="end"
        className="w-[90vw] md:w-[360px] p-0 flex flex-col max-h-[65vh]"
      >
        <form className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="sticky -top-4 z-20 bg-white border-b py-3">
            <Typography variant={"smallText"}>Filter</Typography>
          </div>
          {filters.map((filter) => {
            switch (filter.type) {
              case "text":
                return (
                  <TextInput
                    key={filter.name}
                    label={filter.label}
                    placeholder={filter.placeholder}
                    {...register(filter.name)}
                    error={errors[filter.name]?.message as string}
                  />
                );

              case "date":
                return (
                  <DateInput
                    key={filter.name}
                    label={filter.label}
                    placeholder={filter.placeholder}
                    {...register(filter.name)}
                    error={errors[filter.name]?.message as string}
                  />
                );

              case "select":
                return (
                  <Controller
                    key={filter.name}
                    name={filter.name}
                    control={control}
                    render={({ field }) => (
                      <DropdownInput
                        label={filter.label}
                        placeholder={filter.placeholder}
                        options={filter.options || []}
                        value={field.value}
                        error={errors[filter.name]?.message as string}
                        onValueChange={field.onChange}
                      />
                    )}
                  />
                );

              default:
                return null;
            }
          })}
        </form>

        <div className="sticky bottom-0 bg-white border-t p-4 flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => {
              handleReset();
              setOpen(false);
            }}
          >
            Reset All
          </Button>

          <Button
            className="w-full"
            onClick={() => {
              handleSubmit(onApply)();
              setOpen(false);
            }}
          >
            Apply Now
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
