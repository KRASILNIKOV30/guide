import { connect } from 'react-redux';
import Button from '../Button/Button';
import styles from './InputField.module.css';

interface InputFieldProps {
    placeholder?: string,
    value?: string,
    onKeyUp: (value: string) => void
}

const InputField = ({
    placeholder = "",
    value,
    onKeyUp
}: InputFieldProps) => {
    return (
        <div className={styles.main_container}>
            <div className={styles.search_icon}></div>
            <input
                type='text'
                value={value}
                className={`${styles.input_field} ${value !== '' && styles.input_field_filled}`}
                placeholder={placeholder}
                onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                        onKeyUp(e.currentTarget.value)
                    }
                }}
            ></input>
            {
                value !== ""
                ? <Button viewStyle='delete_outline' onClick={() => {onKeyUp('')}} />
                : null
            }
        </div>
        
    )
}

export default connect()(InputField)