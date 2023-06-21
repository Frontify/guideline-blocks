/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, ReactElement, useEffect, useState } from 'react';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { useEditorState } from '@frontify/app-bridge';
import { EditorMode } from './EditorMode';
import { UserMode } from './UserMode';
import { SuccessPage } from './SuccessPage';

export enum BlockRoutes {
    'EDITOR_MODE' = 'EDITOR_MODE',
    'VIEW_MODE' = 'VIEW_MODE',
    'SUCCESS_PAGE' = 'SUCCESS_PAGE',
}

export const Router: FC<BlockProps> = ({ appBridge }) => {
    const isEditing = useEditorState(appBridge);
    const [currentView, setCurrentView] = useState<BlockRoutes>(BlockRoutes.EDITOR_MODE);

    const viewComponents: Record<BlockRoutes, ReactElement> = {
        EDITOR_MODE: <EditorMode appBridge={appBridge} />,
        VIEW_MODE: <UserMode appBridge={appBridge} setView={setCurrentView} />,
        SUCCESS_PAGE: <SuccessPage appBridge={appBridge} />,
    };

    useEffect(() => {
        if (isEditing) {
            setCurrentView(BlockRoutes.EDITOR_MODE);
        } else {
            setCurrentView(BlockRoutes.VIEW_MODE);
        }
    }, [isEditing]);

    return viewComponents[currentView];
};
