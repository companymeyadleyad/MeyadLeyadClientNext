export interface DropdownItem {
  label: string;
  link: string;
}

export interface Dropdown {
  title: string;
  id: string;
  items: DropdownItem[];
}
