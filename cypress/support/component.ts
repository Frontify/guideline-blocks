/* (c) Copyright Frontify Ltd., all rights reserved. */

//@ts-ignore
global.process ||= {};
//@ts-ignore
global.process.env ||= {};

import "@frontify/fondue/style";
import "cypress-real-events/support";
import "./structuredClone";
