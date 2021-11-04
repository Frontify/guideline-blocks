/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from "react";

type IconProps = {
  url: string;
}

export const Icon: FC<IconProps> = ({ url }) => (
  <span className="tw-pr-3">
    <img alt={"icon"} src={url} className="tw-inline tw-w-6 tw-h-6" />
  </span>
);
