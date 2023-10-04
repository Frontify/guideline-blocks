/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';
import { Dependencies } from './Dependencies';

interface Props {
    onNpmDependenciesChanged: (newDependencies: string) => void;
    npmDependencies: string;
    shouldCollapseByDefault: boolean;
}

export const NPMDependencies = ({
    onNpmDependenciesChanged,
    npmDependencies,
    shouldCollapseByDefault,
}: Props): ReactElement => {
    return (
        <Dependencies
            label="NPM dependencies (JSON)"
            placeholder={'{ \n    "dependency1": "latest",\n    "dependency2": "latest"\n}'}
            onBlur={onNpmDependenciesChanged}
            value={npmDependencies}
            shouldCollapseByDefault={shouldCollapseByDefault}
        />
    );
};
