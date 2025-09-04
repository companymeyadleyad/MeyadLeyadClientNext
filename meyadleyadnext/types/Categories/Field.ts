import { SelectOption } from "./SelectOption";

export interface Field {
  fieldId: number;
  fieldType: number;
  label: string;
  name: string;
  placeHolder: string;
  required: boolean;
  title: string;
  options?: SelectOption[];
}
