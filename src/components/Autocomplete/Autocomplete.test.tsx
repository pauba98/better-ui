import React from "react";
import { queryByText, render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Autocomplete from "./Autocomplete";
import top100Films from "../../constants/constants";

describe("Autocomplete", () => {
    test("renders the Autocomplete component with defaultID", () => {
        const film = top100Films[0];
        render(<Autocomplete options={top100Films} defaultID={film.id} />);
        expect(screen.getByRole('textbox')).toHaveValue(film.label)
    });

    test("click the Autocomplete", async () => {
        render(<Autocomplete options={top100Films} />);
        await userEvent.click(screen.getByRole('textbox'));
        expect(screen.getByText(top100Films[0].label)).toBeVisible()
        expect(screen.getByText(top100Films[1].label)).toBeVisible()
    });

    test("write the Autocomplete input and click option", async () => {
        const clickMock = jest.fn()
        render(<Autocomplete options={top100Films} onChange={clickMock} />);
        await userEvent.type(screen.getByRole('textbox'), 'return')
        expect(screen.queryByText('The Lord of the Rings: The Return of the King')).toBeInTheDocument()
        expect(screen.queryByText('Star Wars: Episode VI - Return of the Jedi')).toBeInTheDocument()
        expect(screen.queryByText('Forrest Gump')).toBeNull()
        expect(screen.queryByText('Goodfellas')).toBeNull()
        await userEvent.click(screen.getByText('The Lord of the Rings: The Return of the King'));
        expect(screen.getByRole('textbox')).toHaveValue('The Lord of the Rings: The Return of the King');
        expect(clickMock).toHaveBeenCalledTimes(1)
    });

    test("write the Autocomplete input and click custom option", async () => {
        const clickMock = jest.fn()
        render(<Autocomplete
            options={top100Films}
            onChange={clickMock}
            renderOption={({ option, active, onClick }) =>
                <button key={option.id} style={{ backgroundColor: active ? '#ccc' : '#fff' }} onClick={onClick}>
                    {option.label}
                </button>
            }
        />
        );
        const inputElement = screen.getByRole('textbox');
        const optionLabelToClick = 'American Beauty';
        await userEvent.type(inputElement, 'ame')
        expect(screen.queryByText('American Beauty')).toBeInTheDocument()
        expect(screen.queryByText('Once Upon a Time in America')).toBeInTheDocument()
        expect(screen.queryByText('Requiem for a Dream')).toBeNull();
        const buttonOptionAmelie = screen.getByRole('button', { name: optionLabelToClick });
        await userEvent.click(buttonOptionAmelie);
        expect(clickMock).toHaveBeenCalledTimes(1)
        expect(inputElement).toHaveValue(optionLabelToClick)
        await userEvent.click(inputElement);
        const buttonOptionAmelie2 = screen.getByRole('button', { name: optionLabelToClick });
        expect(buttonOptionAmelie2).toHaveStyle({ backgroundColor: 'rgb(204, 204, 204)' })
    });

    test("write the Autocomplete input no consider accents or casing", async () => {
        render(<Autocomplete options={top100Films} />
        );
        const inputElement = screen.getByRole('textbox');
        await userEvent.type(inputElement, 'aMe')
        expect(screen.queryByText('Amélie')).toBeInTheDocument()
        expect(screen.queryByText('American Beauty')).toBeInTheDocument()
        expect(screen.queryByText('Requiem for a Dream')).toBeNull();
        await userEvent.clear(inputElement)
        await userEvent.click(inputElement)
        await userEvent.type(inputElement, 'amé')
        expect(screen.queryByText('American Beauty')).toBeInTheDocument()
        expect(screen.queryByText('Amélie')).toBeInTheDocument()
        expect(screen.queryByText('American History X')).toBeInTheDocument();
        expect(screen.queryByText('Goodfellas')).toBeNull();
    });

    test("Autocomplete with empty options", async () => {
        const noOptionsText = 'No options available.'
        render(<Autocomplete options={[]} emptyOptionsMessage={noOptionsText}/>);
        await userEvent.click(screen.getByRole('textbox'));
        expect(screen.queryByText(noOptionsText)).toBeInTheDocument()
    })

    test("No options typed autocomplete", async () => {
        const noOptionsText = 'Empty options list'
        render(<Autocomplete options={top100Films} />);
        await userEvent.type(screen.getByRole('textbox'), 'foekwf');
        screen.debug()
        expect(screen.queryByText(noOptionsText)).toBeInTheDocument()
    })

});
