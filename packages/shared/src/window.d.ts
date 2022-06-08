import type { Emitter } from 'mitt';
import { DesignApiResponse } from './hooks/useDesignApi';

declare global {
    interface Window {
        emitter: Emitter<{ HubAppearanceUpdated: DesignApiResponse['hub'] }>;
    }
}
