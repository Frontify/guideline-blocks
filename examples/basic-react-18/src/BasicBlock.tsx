/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button } from '@frontify/fondue/components';

import { ReactElement, useState, version } from 'react';

export const BasicBlock = (): ReactElement => {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <h1>
                Basic Block using React {version} running in {process.env.NODE_ENV}
            </h1>
            <p>This is a basic block</p>
            <Button onPress={handleClick}>Click me</Button>
            <p>Count: {count}</p>
        </div>
    );
};
