/* (c) Copyright Frontify Ltd., all rights reserved. */

export const Strikethrough = ({ color }: { color: string }) => {
    return (
        <svg
            width="100%"
            style={{ overflow: 'visible' }}
            height="100%"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <line
                x1="0%"
                y1="100%"
                x2="100%"
                y2="0%"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
            />
        </svg>
    );
};
