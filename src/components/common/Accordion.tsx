import { cn } from "@/utils/class-name";
import * as RadixAccordion from "@radix-ui/react-accordion";
import { BiChevronDown } from "react-icons/bi";

export interface AccordionItem {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
}

const Accordion = ({
  items,
  type = "multiple",
  defaultValue,
  className,
}: {
  items: AccordionItem[];
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  className?: string;
}) => {
  return (
    <RadixAccordion.Root
      type={type}
      defaultValue={defaultValue as any}
      className={cn("grid gap-4", className)}
    >
      {items.map((item) => (
        <RadixAccordion.Item
          key={item.id}
          value={item.id}
          className="bg-[#F5F5F5] rounded-xl px-4"
        >
          <RadixAccordion.Header>
            <RadixAccordion.Trigger
              className="
                flex w-full items-center justify-between py-4
                text-sm font-medium text-left
                [&[data-state=open]>svg]:rotate-180
              "
            >
              {item.title}
              <BiChevronDown className="h-4 w-4 transition-transform duration-300" />
            </RadixAccordion.Trigger>
          </RadixAccordion.Header>

          <RadixAccordion.Content
            className="
              pb-4 text-sm text-gray-600
              data-[state=open]:animate-accordion-down
              data-[state=closed]:animate-accordion-up
            "
          >
            {item.content}
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  );
};

export default Accordion;
