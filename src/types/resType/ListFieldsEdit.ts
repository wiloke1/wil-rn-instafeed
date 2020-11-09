import { ReneralSettingsFields } from './GeneralSettingFields';
import { CallToActionFields } from './CallToActionFields';
import { PlacementFields } from './PlacementFields';
import { ColorFields } from './ColorFields';

export interface TabManual {
  title: string;
  id: string;
  description: string;
  description_title: string;
  description_link: string;
  variation?: string;
  content: string;
}

export interface ResListFieldsEditItem {
  msg: string;
  status: string;
  items: ResListFieldsEditItemItemsData;
}

export interface ResListFieldsEditItemItemsData {
  general_settings: ReneralSettingsFields;
  call_to_action: CallToActionFields;
  placement: PlacementFields;
  colors: ColorFields;
  manual: TabManual;
}

export interface ObjectSettingTabs {
  general_settings: ReneralSettingsFields;
  call_to_action: CallToActionFields;
  placement: PlacementFields;
  colors: ColorFields;
}

export type SettingTabs = ReneralSettingsFields | CallToActionFields | PlacementFields | ColorFields;

// ===
export type ReneralSettingsFieldsValueChange = {
  [K in keyof ObjectSettingTabs['general_settings']['fields']]: ObjectSettingTabs['general_settings']['fields'][K]['value'];
};
export type CallToActionFieldsValueChange = {
  [K in keyof ObjectSettingTabs['call_to_action']['fields']]: ObjectSettingTabs['call_to_action']['fields'][K]['default'];
};
export type PlacementFieldsValueChange = {
  [K in keyof ObjectSettingTabs['placement']['fields']]: ObjectSettingTabs['placement']['fields'][K]['default'];
};
export type ColorFieldsValueChange = {
  [K in keyof ObjectSettingTabs['colors']['fields']]: ObjectSettingTabs['colors']['fields'][K]['value'];
};

export type EditItemValueChange = ReneralSettingsFieldsValueChange &
  PlacementFieldsValueChange &
  CallToActionFieldsValueChange &
  ColorFieldsValueChange;

//=== RES-DATA ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
