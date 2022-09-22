/* (c) Copyright Frontify Ltd., all rights reserved. */

function readPackage(pkg) {
    //INFO: temporary until we add those peerDependencies in fondue package.json
    if (pkg.name === "@frontify/fondue-tokens") {
        pkg.dependencies = {
            ...pkg.dependencies,
            postcss: "^8.4.16",
            scheduler: ">=0.19.0",
        };
    }

    return pkg;
}

module.exports = {
    hooks: {
        readPackage,
    },
};
