import type { PickerOption } from "@/components/Picker"
import { sortTypes, type SortType } from "@/types/SortType"

export interface SortBy extends Omit<PickerOption, "value"> {
  value: SortType
}

export const sortBy: SortBy[] = [
  {
    label: "Date ascending",
    imageAlt: "Date ascending",
    image:
      "https://extraextrabricks.pl/environment/cache/images/500_500_productGfx_3935/Mini-figurka-LEGO-City-kobieta--mama-w-fioletowej-bluzie%2C-piaskowych-spodniach.webp",
    value: sortTypes.ASC,
  },
  {
    label: "Date descending",
    imageAlt: "Date descending",
    image:
      "https://extraextrabricks.pl/environment/cache/images/500_500_productGfx_3935/Mini-figurka-LEGO-City-kobieta--mama-w-fioletowej-bluzie%2C-piaskowych-spodniach.webp",
    value: sortTypes.DESC,
  },
  {
    label: "Alphabetically",
    imageAlt: "Alphabetically",
    image:
      "https://extraextrabricks.pl/environment/cache/images/500_500_productGfx_3935/Mini-figurka-LEGO-City-kobieta--mama-w-fioletowej-bluzie%2C-piaskowych-spodniach.webp",
    value: sortTypes.ALFA_ASC,
  },
  {
    label: "Reverse alphabetically",
    imageAlt: "Reverse alphabetically",
    image:
      "https://extraextrabricks.pl/environment/cache/images/500_500_productGfx_3935/Mini-figurka-LEGO-City-kobieta--mama-w-fioletowej-bluzie%2C-piaskowych-spodniach.webp",
    value: sortTypes.ALFA_DESC,
  },
] as const
