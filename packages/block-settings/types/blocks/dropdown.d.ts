import { ChoicesType } from './choices';

export declare enum DropdownSize {
    Small = 'Small',
    Large = 'Large',
}

export type DropdownBlock = {
    type: 'dropdown';
    disabled?: boolean;
    placeholder?: string;
    size?: DropdownSize;
} & ChoicesType;
