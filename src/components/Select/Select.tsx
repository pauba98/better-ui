import React, { CSSProperties, useEffect, useRef, useState } from 'react';

// Styles & Assets
import styles from './Select.module.css';

// Components
import SelectTriangle from '../Helpers/SelectTriangle/SelectTriangle';
import Dropdown from '../Helpers/Dropdown/Dropdown';

// Interface
import { IOption } from '../Autocomplete/Autocomplete';
export interface SelectProps<T extends React.Key> {
    options: IOption<T>[]
    placeholder?: string
    defaultID?: T | null
    disabledOptions?: T[]
    value?: T | null
    style?: CSSProperties
    styleDropdown?: CSSProperties
    styleInput?: CSSProperties
    error?: boolean
    disabled?: boolean
    onChange?: (id: T) => void
    renderInput?: ({ showOptions, label, onClick }: { showOptions: boolean, label: React.ReactNode | undefined, onClick: (e: React.MouseEvent) => void }) => React.ReactNode
}

const Select = <T extends React.Key>({
    options,
    placeholder,
    value,
    defaultID,
    disabledOptions,
    style,
    styleDropdown,
    styleInput,
    error,
    disabled,
    onChange,
    renderInput,
}: SelectProps<T>) => {

    const optionRefs = useRef(new Map<T, HTMLDivElement | null>());

    const [showOptions, setShowOptions] = useState(false);

    const [currentOptionID, setCurrentOptionID] = useState<IOption<T>['id'] | null | undefined>(value ?? defaultID);

    const handleChangeOption = (id: IOption<T>['id'], disabled?: boolean) => () => {
        if (disabled) return;
        setShowOptions(false)
        if (!onChange) return;
        setCurrentOptionID(id);
        onChange(id);
    };

    const currentID = value ?? currentOptionID;

    useEffect(() => {
        // scroll to the selected option
        if (showOptions && currentID !== null && currentID !== undefined) {
            const el = optionRefs.current.get(currentID);
            if (el) {
                el.scrollIntoView({ block: 'start' });
            }
        }
    }, [showOptions, currentID]);

    useEffect(() => {
        optionRefs.current.clear();
    }, [options]);

    useEffect(() => {
        if (value === undefined) return;
        setCurrentOptionID(value)
    }, [value])

    const selectRef = useRef<HTMLInputElement | null>(null);

    const defaultLabel = options.find(o => o.id === currentID)?.label;

    const onClickInput = () => {
        if (disabled) return;
        setShowOptions(x => !x);
    }

    return (
        <div
            className={`${styles.select} ${disabled ? styles.disabled : ''}`}
            style={{ ...style }}
            ref={selectRef}
        >
            {renderInput?.({ showOptions: showOptions, label: defaultLabel, onClick: onClickInput }) ??
                <button
                    type='button'
                    className={`${styles.selectButton} ${error ? styles.error : ''}`}
                    style={styleInput}
                    onClick={onClickInput}
                >
                    {defaultLabel ?
                        <div className={styles.label}>{defaultLabel}</div>
                        :
                        <p className={styles.placeholder}>{placeholder ?? ''}</p>
                    }
                    <SelectTriangle show={showOptions} />
                </button>
            }
            <Dropdown
                show={showOptions}
                elementRef={selectRef}
                style={styleDropdown}
                handleClickOutside={() => setShowOptions(false)}
            >
                <div className={styles.options}>
                    {options.length === 0 ?
                        <p className={styles.emptyMessage}>Empty options list</p>
                        :
                        options.map(option => {
                            const disabled = disabledOptions?.includes(option.id)
                            return (
                                <div
                                    key={String(option.id)}
                                    ref={(el) => {
                                        optionRefs.current.set(option.id, el);
                                    }}
                                    onClick={handleChangeOption(option.id, disabled)}
                                    className={`${styles.option} ${option.id === currentID ? styles.selectedOption : ''} ${disabled ? styles.disabledOption : ''}`}
                                >
                                    {option.label}
                                </div>
                            );
                        }
                        )}
                </div>
            </Dropdown>
        </div>
    );
};

export default Select;