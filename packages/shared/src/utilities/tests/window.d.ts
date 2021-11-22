export declare global {
    interface Window {
        blockSettings: Record<number, Record<string, unknown>>;
        application: {
            connectors: {
                events: {
                    components: {
                        [key: string]: {
                            component: {
                                onAssetChooserAssetChosen: AssetChooserAssetChosenCallback;
                                onTemplateChooserTemplateChosen: TemplateChooserTemplateChosenCallback;
                            };
                        };
                    };
                    notify: <T = Record<string, unknown>>(
                        something: null,
                        eventName: TerrificEvent,
                        options: T
                    ) => void;
                    registerComponent: (component: { id: string }) => void;
                };
            };
        };
    }
}
