import React from "react";
import { getByRole, render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Checkbox from "./Checkbox";

describe("Checkbox", () => {
    test("renders the Checkbox component", () => {
        render(<Checkbox>Hello World</Checkbox>);
        expect(screen.getByRole('button')).toHaveTextContent('Hello World')
        expect(screen.getByRole('checkbox')).not.toBeChecked()
    });

    test("click the checkbox", async () => {
        render(<Checkbox>
            Hello World
        </Checkbox>);
        await userEvent.click(screen.getByRole('checkbox'));
        expect(screen.getByRole('checkbox')).toBeChecked()
    });

    test("click the checkbox button", async () => {
        render(<Checkbox>
            Hello World
        </Checkbox>);
        await userEvent.click(screen.getByRole('button'));
        expect(screen.getByRole('checkbox')).toBeChecked()
    });
    

    test("click the checkbox button with default checked", async () => {
        render(<Checkbox defaultChecked={true}>
            Hello World
        </Checkbox>);
        await userEvent.click(screen.getByRole('button'));
        expect(screen.getByRole('checkbox')).not.toBeChecked()
    });

});
