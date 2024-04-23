/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup, configure } from "@testing-library/react";
import { afterEach, beforeAll, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";

expect.extend(matchers);

beforeAll(() => {
    configure({ testIdAttribute: "data-test-id" });
});

afterEach(() => {
    cleanup();
});
