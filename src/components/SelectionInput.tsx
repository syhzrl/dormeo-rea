import React from 'react';
import styled from 'styled-components';

export interface IOption {
    id: string | number;
    description: string | number;
}

interface SelectionInputProps {
    data: IOption[];
    label: string;
    currentValue?: string | number;
    disabled?: boolean;
    required?: boolean;
    onChangeSelection: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectionInput = ({ data, label, currentValue, onChangeSelection, disabled, required }: SelectionInputProps): JSX.Element => {
    return (
        <FormGroup>
            <Label>{label}</Label>
            <Select
                value={currentValue}
                disabled={disabled}
                required={required}
                onChange={onChangeSelection}
            >
                {
                    data.map((option: IOption) => {
                        const { id, description } = option;
                        return (
                            <option
                                value={id}
                                key={id}
                            >
                                {description}
                            </option>
                        );
                    })
                }
            </Select>
        </FormGroup>
    );
};

SelectionInput.defaultProps = {
    currentValue: undefined,
    disabled: false,
    required: false,
};

const FormGroup = styled.div`
    margin: 2px 0;

    color: #000;

    overflow: hidden;
`;

const Label = styled.label`
    display: block;

    font-size: 14px;
    font-weight: 400;
    line-height: 16px;

    text-transform: capitalize;
`;

const Select = styled.select`
    display: block;
    width: 100%;

    margin-top: 6px;
    padding: 7px 10px 10px 0;

    background: none;
    color: #696969;

    font-size: 12px;
    line-height: 14px;
    text-transform: capitalize;
    
    box-sizing: border-box;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #a2a2a2;

    cursor: pointer;

    &:focus {
        outline: none;
    }
`;

export default SelectionInput;
