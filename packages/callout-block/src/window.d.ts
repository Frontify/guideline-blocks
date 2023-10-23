/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { Emitter } from 'mitt';

declare global {
    interface Window {
        emitter: Emitter<{
            HubAppearanceUpdated: unknown;
        }>;
    }
}
