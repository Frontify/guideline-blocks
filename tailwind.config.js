module.exports = {
    presets: [require("@frontify/arcade/tailwind")],
    content: ["./{packages,examples}/*/src/**/*.{ts,tsx}"],
    corePlugins: {
        preflight: false,
    },
};
