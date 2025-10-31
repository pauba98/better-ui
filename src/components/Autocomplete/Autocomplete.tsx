import React, { useEffect, useRef, useState } from 'react';

// Styles & Assets
import styles from './Autocomplete.module.css';

// Components
import Dropdown from '../Helpers/Dropdown/Dropdown';

// Models
export interface IOption<T extends React.Key> {
    id: T
    label: string
}

export interface AutocompleteProps<T extends React.Key> {
    options: IOption<T>[]
    placeholder?: string
    defaultID?: T | null
    emptyOptionsMessage?: React.ReactNode
    value?: T | null
    style?: React.CSSProperties
    error?: boolean
    onChange?: (id: T) => void
    renderInput?: ({ showOptions, label, onClick }: { showOptions: boolean, label: React.ReactNode | undefined, onClick: (e?: React.MouseEvent) => void }) => React.ReactNode
    renderOption?: ({ option, active, onClick }: { option: IOption<T>, active: boolean, onClick: () => void }) => React.ReactNode
}

const Autocomplete = <T extends React.Key>({
    options,
    placeholder,
    value,
    defaultID = null,
    emptyOptionsMessage,
    style,
    error,
    onChange,
    renderInput,
    renderOption,
}: AutocompleteProps<T>) => {

    const [showOptions, setShowOptions] = useState(false);

    const [currentOptionID, setCurrentOptionID] = useState<IOption<T>['id'] | null>(value ?? defaultID); // id of the option clicked

    const [inputValue, setInputValue] = useState<string>(''); // value of the text typed

    const handleChangeOption = (id: IOption<T>['id']) => () => { // click on an option
        setShowOptions(false)
        setCurrentOptionID(id);
        onChange?.(id);
    };

    useEffect(() => {
        if (value === undefined) return;
        setCurrentOptionID(value)
    }, [value])

    const selectRef = useRef<HTMLInputElement | null>(null);

    const selectedLabel = options.find(o => o.id === currentOptionID)?.label;

    const onClickInput = () => {
        if (inputValue !== '') setShowOptions(true)
        else setShowOptions(x => !x);
    }

    useEffect(() => {
        if (typeof selectedLabel === 'string') {
            setInputValue(selectedLabel); // Update state when label changes
        }
    }, [selectedLabel]);

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.trim() === '') setCurrentOptionID(null)
        setInputValue(value);
    }

    function normalize(str: string) {
        return str
            .normalize("NFD")              // decompose characters
            .replace(/[\u0300-\u036f]/g, '') // remove diacritical marks
            .toLocaleLowerCase();   // transform to lowercase
    }

    const filteredOptions = options.filter(o => normalize(o.label).includes(normalize(inputValue)));


    return (
        <div
            className={`${styles.select}`}
            style={{ ...style }}
            ref={selectRef}
        >
            {renderInput?.({ showOptions: showOptions, label: inputValue, onClick: onClickInput }) ??
                <input
                    type='text'
                    className={`${styles.inputAutocomplete} ${error ? styles.error : ''}`}
                    onChange={handleChangeInput}
                    placeholder={placeholder}
                    value={inputValue}
                    onClick={onClickInput}
                />
            }
            <Dropdown
                show={showOptions}
                elementRef={selectRef}
                handleClickOutside={() => setShowOptions(false)}
            >
                <div className={styles.options}>
                    {filteredOptions.length === 0 ?
                        <p className={styles.emptyMessage}>{emptyOptionsMessage ?? 'Empty options list'}</p>
                        :
                        filteredOptions.map(option =>
                            <React.Fragment key={option.id}>
                                {renderOption?.({ option, active: option.id === currentOptionID, onClick: handleChangeOption(option.id) }) ??
                                    <div
                                        onClick={handleChangeOption(option.id)}
                                        className={`${styles.option} ${option.id === currentOptionID ? styles.selectedOption : ''}`}
                                    >
                                        {option.label}
                                    </div>
                                }
                            </React.Fragment>
                        )}
                </div>
            </Dropdown>
        </div>
    );
};

export default Autocomplete;