/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type IconProps } from './type';

export const IconLightbulb = ({ title }: IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            className="tw-flex tw-items-center tw-justify-center tw-fill-current"
            name="IconLightbulb20"
            aria-hidden="true"
            aria-labelledby="lightbulbTitle"
        >
            <title id="lightbulbTitle">{title}</title>
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12.252 10.842a1.5 1.5 0 0 0-.752 1.3v2.283h-3v-2.283a1.5 1.5 0 0 0-.752-1.3 4.5 4.5 0 0 1-.563-.384A4.45 4.45 0 0 1 5.5 6.97C5.5 4.508 7.508 2.5 10 2.5s4.5 2.008 4.5 4.47a4.45 4.45 0 0 1-1.685 3.488 4.5 4.5 0 0 1-.563.383M7 14.425v-2.283a6 6 0 0 1-.75-.511A5.95 5.95 0 0 1 4 6.97C4 3.672 6.686 1 10 1s6 2.673 6 5.97a5.95 5.95 0 0 1-2.25 4.66q-.355.285-.75.511v2.284a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5m1.125 2.99a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5z"
                clipRule="evenodd"
            ></path>
        </svg>
    );
};
