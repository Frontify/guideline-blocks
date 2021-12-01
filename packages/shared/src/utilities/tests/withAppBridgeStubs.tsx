import { AppBridgeNativeMock, IAppBridgeNative } from '@frontify/app-bridge';
import { ComponentType } from 'react';
import { stub } from 'sinon';

type useStubedAppBridgeProps = {
    blockSettings?: Record<string, unknown>;
    editorState?: boolean;
};

interface Window {
    blockSettings: Record<number, Record<string, unknown>>;
}

const useStubedAppBridge = ({ blockSettings = {}, editorState = false }: useStubedAppBridgeProps): IAppBridgeNative => {
    const appBridge = new AppBridgeNativeMock(0, 0);

    cy.window().then((window) => {
        (window as unknown as Window).blockSettings = { 0: blockSettings };
    });
    stub(appBridge, 'getBlockSettings').returns(new Promise((resolve) => resolve(blockSettings)));
    stub(appBridge, 'getEditorState').returns(editorState);

    return appBridge;
};

type withAppBridgeStubsProps = { appBridge: IAppBridgeNative };

export function withAppBridgeStubs<T>(
    WrappedComponent: ComponentType<T>,
    props: useStubedAppBridgeProps
): [ComponentType<Omit<T, keyof withAppBridgeStubsProps>>, IAppBridgeNative] {
    const appBridge = useStubedAppBridge(props);
    const ComponentWithAppBridgeStubs = (props: Omit<T, keyof withAppBridgeStubsProps>) => {
        return <WrappedComponent appBridge={appBridge} {...(props as T)} />;
    };

    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    ComponentWithAppBridgeStubs.displayName = `withAppBridgeStubs(${displayName})`;

    return [ComponentWithAppBridgeStubs, appBridge];
}
