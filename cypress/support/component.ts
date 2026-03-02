/* (c) Copyright Frontify Ltd., all rights reserved. */

//@ts-ignore
global.process ||= {};
//@ts-ignore
global.process.env ||= {};

import "../../packages/shared/src/components/StyleProvider/styles.css";
import "cypress-real-events/support";
import "./structuredClone";
