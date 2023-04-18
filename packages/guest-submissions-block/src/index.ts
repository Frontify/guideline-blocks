import "tailwindcss/tailwind.css";

import { defineBlock } from "@frontify/guideline-blocks-settings";

import { settings } from "./settings";
import { Router } from "./View";

export default defineBlock({
    block: Router,
    settings,
});
