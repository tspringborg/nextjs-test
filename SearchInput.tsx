import React, {ChangeEvent, useEffect, useState} from 'react'
import styles from './styles/Home.module.scss'

export interface ISearchInputProps {
    value: string
    onValueChange: (val: string) => void
}

const defaultProps: Partial<ISearchInputProps> = {
    value: '',
    onValueChange: () => {},
};

const SearchInput: React.FC<ISearchInputProps> = (props) => {
    props = {...defaultProps, ...props};
    const [localValue, setLocalValue] = useState<string>(props.value);
    useEffect(() => {
        if (props.value !== localValue) {
            setLocalValue(props.value);
        }
    }, [props.value]);
    const handleValueChange = (event: ChangeEvent) => {
        const val = (event.target as HTMLInputElement).value;
        console.log("val: ", val);
        setLocalValue(val);
        props.onValueChange(val);
    };
    return (
        <input
            className={'input-field'}
            value={localValue}
            onChange={handleValueChange}
            placeholder={'Search...'}
        />
    )
};

export default SearchInput
