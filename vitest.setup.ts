/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup, configure } from "@testing-library/react";
import { afterEach, beforeAll, expect } from "vitest";
import "@testing-library/jest-dom/vitest";

class MockWorker {
    postMessage() {}
    terminate() {}
    addEventListener() {}
    removeEventListener() {}
}

globalThis.Worker = MockWorker as unknown as typeof Worker;

expect.extend(matchers);

beforeAll(() => {
    configure({ testIdAttribute: "data-test-id" });
});

afterEach(() => {
    cleanup();
});
