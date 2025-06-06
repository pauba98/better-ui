import React from "react";
import Input from "./Input";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

describe("Checkbox", () => {
    test("renders the Checkbox component", () => {
        render(<Input type="text" error />);
        expect(screen.getByRole('textbox')).toHaveClass('error')
    });

})