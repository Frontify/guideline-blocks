import guidelineBlocksSettings from "@frontify/guideline-blocks-settings/tailwind";

module.exports = {
    presets: [guidelineBlocksSettings],
    content: ["./{packages,examples}/*/src/**/*.{ts,tsx}"],
    corePlugins: {
        preflight: false,
    },
    theme: {
        extend: {
            colors: {
                "blank-state-weak": "#ABADAD",
                "blank-state-weak-inverse": "#FFFFFF",
                "blank-state-shaded": "#727474",
                "blank-state-shaded-inverse": "#FAFAFA",
                "blank-state-weighted": "#696B6B",
                "blank-state-weighted-inverse": "#F1F1F1",
                "blank-state-hover": "#1A1C1C",
                "blank-state-hover-inverse": "#FFFFFF",
                "blank-state-pressed": "#080808",
                "blank-state-pressed-inverse": "#F1F1F1",
                "blank-state-line": "#A3A5A5",
                "blank-state-line-hover": "#1A1C1C",
            },
            boxShadow: {
                "inner-line": "inset 0 0 0 var(--border-width-default) var(--color-line-mid)",
                "t-inner-line":
                    "inset 0 var(--border-width-default) 0 0 var(--color-line-mid)",
                "inner-line-x-strong":
                    "inset 0 0 0 var(--border-width-default) var(--color-line-strong)",
                "y-inner-line-x-strong":
                    "inset 0 var(--border-width-default) 0 0 var(--color-line-strong), inset 0 calc(var(--border-width-default) * -1) 0 0 var(--color-line-strong)",
                "inner-line-first":
                    "inset var(--border-width-default) 0 0 0 var(--color-line-mid), inset 0 var(--border-width-default) 0 0 var(--color-line-mid), inset 0 calc(var(--border-width-default) * -1) 0 0 var(--color-line-mid)",
                "inner-line-last":
                    "inset calc(var(--border-width-default) * -1) 0 0 0 var(--color-line-mid), inset 0 var(--border-width-default) 0 0 var(--color-line-mid), inset 0 calc(var(--border-width-default) * -1) 0 0 var(--color-line-mid)",
                "inner-line-y":
                    "inset 0 var(--border-width-default) 0 0 var(--color-line-mid), inset 0 calc(var(--border-width-default) * -1) 0 0 var(--color-line-mid)",
                "inner-line-strong":
                    "inset 0 0 0 var(--border-width-default) var(--color-line-strong)",
            },
            keyframes: {
                "fade-in-forwards": {
                    from: {
                        "background-color": "rgba(255, 255, 255, 0)",
                    },
                    to: {
                        "background-color": "rgba(255, 255, 255, 1)",
                    },
                },
            },
            animation: {
                "fade-in-forwards": "fade-in-forwards 0.3s forwards",
            },
        },
    },
};
