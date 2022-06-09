/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { Emitter } from 'mitt';
import { DesignTokenApiResponse } from './hooks/useGuidelineDesignTokens';

declare global {
    interface Window {
        emitter: Emitter<{ HubAppearanceUpdated: DesignTokenApiResponse['hub'] }>;
    }
}
