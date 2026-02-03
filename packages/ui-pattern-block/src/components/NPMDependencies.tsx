/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactElement } from 'react';

import { Dependencies } from './Dependencies';

interface Props {
    onNpmDependenciesChanged: (newDependencies: string) => void;
    npmDependencies: string;
    shouldCollapseByDefault: boolean;
    borderRadius?: number;
    readOnly?: boolean;
}

export const NPMDependencies = ({
    onNpmDependenciesChanged,
    npmDependencies,
    shouldCollapseByDefault,
    borderRadius,
    readOnly,
}: Props): ReactElement => {
    return (
        <Dependencies
            label="NPM dependencies (JSON)"
            placeholder={'{ \n    "dependency1": "latest",\n    "dependency2": "latest"\n}'}
            onBlur={onNpmDependenciesChanged}
            value={npmDependencies}
            shouldCollapseByDefault={shouldCollapseByDefault}
            borderRadius={borderRadius}
            readOnly={readOnly}
        />
    );
};
