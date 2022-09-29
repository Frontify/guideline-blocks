/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { IconProps } from './type';

export const IconRender = ({ style = { fill: 'black' } }: IconProps) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
        <path
            d="M17.5 9.47367C17.5 10.3847 16.8046 11.0789 16 11.0789C15.1954 11.0789 14.5 10.3847 14.5 9.47367C14.5 8.56263 15.1954 7.86841 16 7.86841C16.8046 7.86841 17.5 8.56263 17.5 9.47367Z"
            stroke="#434747"
        />
        <path d="M10 15.2632L13 13.158L15.9999 14.7369L19.4999 13.158" stroke="#434747" />
        <rect x="3" y="3.15796" width="4" height="1.05263" fill="#434747" />
        <rect x="3" y="7.36841" width="4" height="1.05263" fill="#434747" />
        <rect x="3" y="9.47363" width="4" height="1.05263" fill="#434747" />
        <rect
            x="10.5"
            y="1.05273"
            width="18.9474"
            height="0.999999"
            transform="rotate(90 10.5 1.05273)"
            fill="#434747"
        />
        <rect x="14" y="3.15796" width="3" height="1.05263" fill="#434747" />
        <rect x="3" y="15.7896" width="3" height="1.05263" fill="#434747" />
        <rect x="0.5" y="0.5" width="19" height="19" rx="1.5" stroke="#434747" />
    </svg>
);
