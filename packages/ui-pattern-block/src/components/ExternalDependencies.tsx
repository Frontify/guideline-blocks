/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactElement } from 'react';

import { Dependencies } from './Dependencies';

interface Props {
    onExternalDependenciesChanged: (newDependencies: string) => void;
    externalDependencies: string;
    shouldCollapseByDefault: boolean;
    borderRadius?: number;
    readOnly?: boolean;
}

export const ExternalDependencies = ({
    onExternalDependenciesChanged,
    shouldCollapseByDefault,
    externalDependencies,
    borderRadius,
    readOnly,
}: Props): ReactElement => {
    return (
        <Dependencies
            label="External dependencies"
            placeholder={'["https://cdn.dependency1.com", "https://cdn.dependency2.com"]'}
            onBlur={onExternalDependenciesChanged}
            value={externalDependencies}
            shouldCollapseByDefault={shouldCollapseByDefault}
            borderRadius={borderRadius}
            readOnly={readOnly}
        />
    );
};
