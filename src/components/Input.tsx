import {FC, KeyboardEventHandler} from 'react'
import './Input.css'
import {Form} from "react-bootstrap";

interface Props {
    value: string
    onChange: (value: string) => void
    onSubmit: () => void
    placeholder?: string
}

const Input: FC<Props> = ({placeholder, value, onChange, onSubmit}) => {
    const handleKeyPress: KeyboardEventHandler = (e) => {
        if (e.key === "Enter") {
            onSubmit()
        }
    }

    return (
        <Form.Control
            as="input"
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(event => onChange(event.target.value))}
            onKeyDown={handleKeyPress}
        />
    )
}

export default Input