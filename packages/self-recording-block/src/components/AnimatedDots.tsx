/* (c) Copyright Frontify Ltd., all rights reserved. */

export const AnimatedDots = () => {
    const DELAYS = [0.7, 0.9, 0.11];

    return (
        <>
            {DELAYS.map((delay, index) => (
                <span key={index} className="tw-animate-ping tw-font-bold " style={{ animationDelay: `${delay}s` }}>
                    .
                </span>
            ))}
        </>
    );
};
