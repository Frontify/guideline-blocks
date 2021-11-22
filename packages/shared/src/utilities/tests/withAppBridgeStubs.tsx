import { AppBridgeNative } from '@frontify/app-bridge';
import Sinon from 'sinon';

type AppBridgeEvents = {
    onGetBlockSettings?: () => Record<number, Record<string, unknown>>;
    onGetEditorState?: () => boolean;
};
const GetEditorStateDefault = true;

const useStubedAppBridge = ({
    onGetBlockSettings,
    onGetEditorState,
}: AppBridgeEvents): Sinon.SinonStubbedInstance<AppBridgeNative> => {
    const appBridge = Sinon.createStubInstance(AppBridgeNative);
    appBridge.blockId = 0;
    appBridge.sectionId = 0;

    const blockSettings = onGetBlockSettings ? onGetBlockSettings() : {};
    cy.window().then((window) => {
        window.blockSettings = {
            [appBridge.blockId?.toString() ?? 0]: blockSettings,
        };
        window.application = {
            connectors: {
                events: {
                    components: {
                        appBridge: {
                            component: {
                                onAssetChooserAssetChosen: () => console.log('on asset chooser asset chosen'),
                                onTemplateChooserTemplateChosen: () =>
                                    console.log('on template chooser template chosen'),
                            },
                        },
                    },
                    notify: () => console.log('notify'),
                    registerComponent: () => console.log('register'),
                },
            },
        };
    });
    appBridge.getBlockSettings.returns(new Promise(() => blockSettings));
    appBridge.getEditorState.returns(onGetEditorState ? onGetEditorState() : GetEditorStateDefault);

    return appBridge;
};

type withAppBridgeStubsProps = { appBridge: AppBridgeNative };

export function withAppBridgeStubs<T extends withAppBridgeStubsProps = withAppBridgeStubsProps>(
    WrappedComponent: React.ComponentType<T>,
    events: AppBridgeEvents
): [React.ComponentType<Omit<T, keyof withAppBridgeStubsProps>>, Sinon.SinonStubbedInstance<AppBridgeNative>] {
    const appBridge = useStubedAppBridge(events);
    const appBridgeProps = { appBridge };
    const ComponentWithAppBridgeStubs = (props: Omit<T, keyof withAppBridgeStubsProps>) => {
        return <WrappedComponent {...appBridgeProps} {...(props as T)} />;
    };

    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    ComponentWithAppBridgeStubs.displayName = `withAppBridgeStubs(${displayName})`;

    return [ComponentWithAppBridgeStubs, appBridge];
}
