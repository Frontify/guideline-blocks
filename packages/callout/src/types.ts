/* (c) Copyright Frontify Ltd., all rights reserved. */

export enum CalloutType {
  WARNING = 'tw-bg-red-60',
  TIP = 'tw-bg-green-60',
  NOTE = 'tw-bg-violet-60',
  INFO = 'tw-bg-yellow-60',
}

export enum CalloutWidth {
  FULL_WIDTH = 'tw-flex',
  HUG_CONTENTS = 'tw-inline-flex',
}

export enum CalloutAlignment {
  LEFT = 'tw-justify-start',
  CENTER = 'tw-justify-center',
  RIGHT = 'tw-justify-end',
}

export enum CalloutCornerRadius {
  NONE = 'tw-rounded-none',
  S = 'tw-rounded-sm',
  M = 'tw-rounded',
  L = 'tw-rounded-xl',
}

export enum CalloutPadding {
  S = 'tw-px-8 tw-py-4',
  M = 'tw-px-8 tw-py-6',
  L = 'tw-p-9',
}

export type CalloutBlockSettings = {
  type: CalloutType;
  alignment: CalloutAlignment;
  iconSwitch: boolean;
  width: CalloutWidth;
  customPaddingSwitch: boolean;
  customCornerRadiusSwitch: boolean;
  textValue?: string;
  icon?: number;
  padding?: CalloutPadding;
  customPadding?: string[];
  cornerRadius?: CalloutCornerRadius;
  customCornerRadius?: string[];
}
