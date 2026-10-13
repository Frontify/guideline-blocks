/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';
import { type expect } from 'vitest';

// Vitest 5 no longer reads the global `jest.Matchers`, and `@testing-library/jest-dom/vitest`
// still augments the pre-v5 `Assertion<T>`, so register the jest-dom matchers on `Matchers<R, T>`.
declare module 'vitest' {
    // oxlint-disable-next-line typescript/no-empty-object-type -- declaration merging needs an interface
    interface Matchers<R, T> extends TestingLibraryMatchers<ReturnType<typeof expect.stringContaining>, R> {}
}
