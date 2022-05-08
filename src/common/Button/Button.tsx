import { connect } from 'react-redux';
import styles from './Button.module.css';
import { Link } from 'react-router-dom'

interface ButtonProps {
    viewStyle: 'main' | 'secondary' | 'add' | 'delete' | 'delete_outline'
            | 'hint' | 'back' | 'cancel' | 'location' | 'plus' | 'minus' | 'back_to_location'
            | 'info',
    text?: string,
    onClick: () => void
}

const Button = ({
    viewStyle,
    text = '',
    onClick
}: ButtonProps) => {
    let buttonStyle = '';
    switch(viewStyle) {
        case 'main': {buttonStyle = styles.main; break}
        case 'secondary': {buttonStyle = styles.secondary; break}
        case 'add': {buttonStyle = styles.add; break}
        case 'delete': {buttonStyle = styles.delete; break}
        case 'delete_outline': {buttonStyle = styles.delete_outline; break}
        case 'hint': {buttonStyle = styles.hint; break}
        case 'back': {buttonStyle = styles.back; break}
        case 'cancel': {buttonStyle = styles.cancel; break}
        case 'info': {buttonStyle = styles.info; break}
        case 'location': {buttonStyle = styles.location; break}
        case 'plus': {buttonStyle = styles.plus; break}
        case 'minus': {buttonStyle = styles.minus; break}
        case 'back_to_location': {buttonStyle = styles.back_to_location; break}
    }
    return (
        <button 
            type = 'button'
            className = {`${styles.button} ${buttonStyle}`}
            onClick = {onClick}
        >
            <div className = {(viewStyle === 'main' || viewStyle === 'secondary') ? viewStyle === 'main' ? styles.text_container_gradient : styles.text_container : styles.text_container_hide}>
                <Link to="/previewtour">{text}</Link>
            </div>
        </button>
    )
}

export default connect()(Button)