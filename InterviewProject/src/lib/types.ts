import {PropsWithChildren} from 'react';

export type Item = {
  value: string | number;
  parent?: string;
  label: string;
};

export type SectionProps = PropsWithChildren<{
  title: string;
}>;

export type DropDownProps = {
  value: any;
  onChangeValue: (selectedValue: any) => void;
  placeholder: string;
  list: Item[];
  searchable: boolean;
  disabled?: boolean;
  modalTitle: string;
  multiSelect?: boolean;
  hideDefaultPlaceholder?: boolean;
  label?: string;
  mode?: 'MODAL' | 'FLATLIST';
  noClear?: boolean;
  renderListItem?: any;
  hideCheckboxExtraOption?: boolean;
};

export interface ListItemProp {
  multiSelect: boolean;
  handleSingleChange: (item: any) => void;
  handleValueChange: (item: any) => void;
  handleSelectAll: () => void;
  val: any;
  item: Item;
  isSelectAllActive: boolean;
  hideCheckboxExtraOption: boolean;
}