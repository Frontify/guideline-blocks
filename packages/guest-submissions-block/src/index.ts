import "tailwindcss/tailwind.css";

import { defineBlock } from "@frontify/guideline-blocks-settings";

import { settings } from "./settings";
import { BlockRouter } from "./View";

export default defineBlock({
    block: BlockRouter,
    settings,
});
