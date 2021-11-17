import { Bundle } from '../bundle';

export type BaseBlock = {
    id: string;
    label?: string;
    info?: string;
    show?: (bundle: Bundle) => boolean;
    onChange?: (bundle: Bundle) => void;
};
