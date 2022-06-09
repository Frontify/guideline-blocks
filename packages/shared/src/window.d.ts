/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { Emitter } from 'mitt';
import { DesignApiResponse } from './hooks/useGuidelineDesignTokens';

declare global {
    interface Window {
        emitter: Emitter<{ HubAppearanceUpdated: DesignApiResponse['hub'] }>;
    }
}
