import { joinClassNames } from "@frontify/guideline-blocks-shared";
import { BorderShape } from "../styling";

export const AssetDropzoneStyling = joinClassNames([
    "tw-py-[25.5px] tw-w-full tw-transition tw-duration-250 tw-ease-in-out hover:tw-bg-box-neutral hover:tw-border-line-xx-strong",
    BorderShape,
]);
export const BackgroundBase = "tw-bg-base-alt tw-border-line-x-strong";
export const BackgroundActive = "tw-bg-box-neutral tw-border-line-xx-strong";
export const contentCenter = "tw-grid tw-place-content-center";
