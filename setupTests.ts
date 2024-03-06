/* (c) Copyright Frontify Ltd., all rights reserved. */

import { cleanup, configure } from "@testing-library/react";
import { afterEach, beforeAll } from "vitest";

beforeAll(() => {
    configure({ testIdAttribute: "data-test-id" });
});

afterEach(() => {
    cleanup();
});
