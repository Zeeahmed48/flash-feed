
import type { FC } from 'react';

import './style.css';

const Select: FC<SelectProps> = ({
    options,
    label,
    placeholder,
    ...restProps
}) => {
    return (
        <form className="select-form">
            {!!label && <label className="select-label">{label}</label>}
            <select className="select-box" {...restProps}>
                {!!placeholder && <option value="">{placeholder}</option>}
                {options.map(({ label, value }) => {
                    return (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    );
                })}
            </select>
        </form>
    );
};

export default Select;