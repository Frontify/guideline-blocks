module.exports = {
    presets: [require("@frontify/guideline-blocks-settings/tailwind")],
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
                "inner-line": "inset 0 0 0 var(--line-width) var(--line-color)",
                "t-inner-line":
                    "inset 0 var(--line-width) 0 0 var(--line-color)",
                "inner-line-x-strong":
                    "inset 0 0 0 var(--line-width) var(--line-color-x-strong)",
                "y-inner-line-x-strong":
                    "inset 0 var(--line-width) 0 0 var(--line-color-x-strong), inset 0 calc(var(--line-width) * -1) 0 0 var(--line-color-x-strong)",
                "inner-line-first":
                    "inset var(--line-width) 0 0 0 var(--line-color), inset 0 var(--line-width) 0 0 var(--line-color), inset 0 calc(var(--line-width) * -1) 0 0 var(--line-color)",
                "inner-line-last":
                    "inset calc(var(--line-width) * -1) 0 0 0 var(--line-color), inset 0 var(--line-width) 0 0 var(--line-color), inset 0 calc(var(--line-width) * -1) 0 0 var(--line-color)",
                "inner-line-y":
                    "inset 0 var(--line-width) 0 0 var(--line-color), inset 0 calc(var(--line-width) * -1) 0 0 var(--line-color)",
                "inner-line-strong":
                    "inset 0 0 0 var(--line-width) var(--line-color-strong)",
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
