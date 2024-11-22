/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type IconProps } from './type';

export const IconInfo = ({ title }: IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            className="tw-flex tw-items-center tw-justify-center tw-fill-current"
            name="IconInfo20"
            aria-hidden="true"
            data-test-id="callout-icon-info"
        >
            <title>{title}</title>
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M11.5 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M7.25 8.25A.75.75 0 0 1 8 7.5h2.75a.75.75 0 0 1 .75.75v8.25h1.75a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1 0-1.5H10V9H8a.75.75 0 0 1-.75-.75"
                clipRule="evenodd"
            ></path>
        </svg>
    );
};
