/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from "react";

type IconProps = {
  iconUrl: string;
}

export const Icon: FC<IconProps> = ({ iconUrl }) => (
  <span className="tw-pr-3">
    <img alt={"icon"} src={iconUrl} className="tw-inline tw-w-6 tw-h-6" />
  </span>
);
