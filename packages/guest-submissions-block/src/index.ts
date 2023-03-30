import "tailwindcss/tailwind.css";

import { defineBlock } from "@frontify/guideline-blocks-settings";

import { settings } from "./settings";
import { GuestSubmission } from "./view/GuestSubmission";

export default defineBlock({
    block: GuestSubmission,
    settings,
});
