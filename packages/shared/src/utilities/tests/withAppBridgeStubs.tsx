import { AppBridgeNativeMock, Asset, IAppBridgeNative } from '@frontify/app-bridge';
import { ComponentType } from 'react';
import { stub } from 'sinon';

type useStubedAppBridgeProps = {
    blockSettings?: Record<string, unknown>;
    blockAssets?: Record<string, Asset[]>;
    editorState?: boolean;
    openAssetChooser?: () => void;
    closeAssetChooser?: () => void;
};

interface Window {
    blockSettings: Record<number, Record<string, unknown>>;
    emitter: Record<string, any>;
}

const useStubedAppBridge = ({
    blockSettings = {},
    blockAssets = {},
    editorState = false,
    openAssetChooser = () => null,
    closeAssetChooser = () => null,
}: useStubedAppBridgeProps): IAppBridgeNative => {
    const appBridge = new AppBridgeNativeMock(0, 0);

    cy.window().then((window) => {
        (window as unknown as Window).blockSettings = { 0: blockSettings };
        (window as unknown as Window).emitter = {
            on: () => null,
            off: () => null,
            emit: () => null,
        };
        stub((window as unknown as Window).emitter, 'on');
        stub((window as unknown as Window).emitter, 'off');
        stub((window as unknown as Window).emitter, 'emit');
    });

    stub(appBridge, 'getBlockSettings').returns(new Promise((resolve) => resolve(blockSettings)));
    stub(appBridge, 'getEditorState').returns(editorState);
    stub(appBridge, 'openAssetChooser').callsFake(openAssetChooser);
    stub(appBridge, 'closeAssetChooser').callsFake(closeAssetChooser);
    stub(appBridge, 'getBlockAssets').callsFake(() => new Promise((resolve) => resolve(blockAssets)));

    return appBridge;
};

type withAppBridgeStubsProps = { appBridge: IAppBridgeNative };

export function withAppBridgeStubs<T>(
    WrappedComponent: ComponentType<T>,
    props?: useStubedAppBridgeProps
): [ComponentType<Omit<T, keyof withAppBridgeStubsProps>>, IAppBridgeNative] {
    const appBridge = useStubedAppBridge(props ?? {});
    const ComponentWithAppBridgeStubs = (props: Omit<T, keyof withAppBridgeStubsProps>) => {
        return <WrappedComponent appBridge={appBridge} {...(props as T)} />;
    };

    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    ComponentWithAppBridgeStubs.displayName = `withAppBridgeStubs(${displayName})`;

    return [ComponentWithAppBridgeStubs, appBridge];
}
