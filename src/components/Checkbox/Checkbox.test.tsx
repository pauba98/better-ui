import React from "react";
import { render, screen } from "@testing-library/react";

import Checkbox from "./Checkbox";

describe("Checkbox", () => {
    test("renders the Checkbox component", () => {
        render(<Checkbox>Hello World</Checkbox>);
        const button = screen.getByRole('button');
        expect(button).toHaveTextContent('Hello World')
    });

    test("renders the Checkbox component", () => {
        render(<Checkbox>
            Hello World
        </Checkbox>);
    });
});
