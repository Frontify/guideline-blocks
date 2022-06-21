/* (c) Copyright Frontify Ltd., all rights reserved. */

function readPackage(pkg) {
    //INFO: temporary until we add those peerDependencies in fondue package.json
    if (pkg.name === "@frontify/fondue") {
        pkg.dependencies = {
            ...pkg.dependencies,
            "@popperjs/core": "^2.0.0",
            immer: ">=9.0.6 <10.0.0",
            slate: ">=0.66.1",
            "slate-history": ">=0.66.0",
            "slate-hyperscript": ">=0.66.0",
            "slate-react": ">=0.74.2",
            "styled-components": ">=5.0.0",
            "react-is": ">= 16.8.0",
        };
    }

    return pkg;
}

module.exports = {
    hooks: {
        readPackage,
    },
};
