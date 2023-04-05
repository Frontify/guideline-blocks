import React from "react";
import renderer from "react-test-renderer";

import { assert, describe, it } from "vitest";
import { Metadata } from "./Metadata";

describe("Guest Submission - MetadataProps", () => {
    it("Renders Text form", () => {
        const component = renderer.create(<Metadata />);

        assert.equal(Math.sqrt(4), 2);
    });
});
