/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup, configure } from "@testing-library/react";
import { afterEach, beforeAll, expect } from "vitest";
import "@testing-library/jest-dom/vitest";

class MockWorker {
    constructor() {}
    postMessage() {}
    terminate() {}
    addEventListener() {}
    removeEventListener() {}
}

global.Worker = MockWorker as any;

expect.extend(matchers);

beforeAll(() => {
    configure({ testIdAttribute: "data-test-id" });
});

afterEach(() => {
    cleanup();
});
