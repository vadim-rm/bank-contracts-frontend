import {FC} from 'react'
import './Input.css'

interface Props {
    value: string
    onChange: (value: string) => void
    onSubmit: () => void
    placeholder?: string
}

const Input: FC<Props> = ({placeholder, value, onChange, onSubmit}) => {
    const handleKeyPress = e => {
        if (e.key === "Enter") {
            onSubmit()
        }
    }

    return (
        <input type="text"
               placeholder={placeholder}
               value={value}
               onChange={(event => onChange(event.target.value))}
               onKeyDown={handleKeyPress}
        />
    )
}

export default Input