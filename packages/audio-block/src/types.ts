import { Asset } from '@frontify/app-bridge';

export enum TextPosition {
    Below = 'Below',
    Above = 'Above',
}

export type BlockSettings = {
    positioning: TextPosition;
    audio: Asset[] | undefined;
    description?: string;
    title?: string;
};
