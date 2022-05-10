import { connect } from 'react-redux';
import styles from './Button.module.css';
import { Link } from 'react-router-dom'

interface ButtonProps {
    viewStyle: 'main' | 'secondary' | 'with_image' | 'add' | 'delete' | 'delete_outline'
            | 'hint' | 'back' | 'cancel' | 'location' | 'plus' | 'minus' | 'back_to_location'
            | 'info' | 'info_white',
    text?: string,
    to?: string,
    image?: string,
    onClick: () => void,
    className?: string
}

const Button = ({
    viewStyle,
    text = '',
    to,
    image = '',
    onClick,
    className = ''
}: ButtonProps) => {
    let buttonStyle = '';
    switch(viewStyle) {
        case 'main': {buttonStyle = styles.main; break}
        case 'secondary': {buttonStyle = styles.secondary; break}
        case 'with_image': {buttonStyle = styles.with_image; break}
        case 'add': {buttonStyle = styles.add; break}
        case 'delete': {buttonStyle = styles.delete; break}
        case 'delete_outline': {buttonStyle = styles.delete_outline; break}
        case 'hint': {buttonStyle = styles.hint; break}
        case 'back': {buttonStyle = styles.back; break}
        case 'cancel': {buttonStyle = styles.cancel; break}
        case 'info': {buttonStyle = styles.info; break}
        case 'info_white': {buttonStyle = styles.info_white; break}
        case 'location': {buttonStyle = styles.location; break}
        case 'plus': {buttonStyle = styles.plus; break}
        case 'minus': {buttonStyle = styles.minus; break}
        case 'back_to_location': {buttonStyle = styles.back_to_location; break}
    }
    return (
        <button 
            type = 'button'
            className = {`${styles.button} ${buttonStyle} ${className}`}
            onClick = {onClick}
        >
            <div className = {(viewStyle === 'main' || viewStyle === 'secondary' || viewStyle === 'with_image') ? viewStyle === 'main' ? styles.text_container_gradient : styles.text_container : styles.text_container_hide}>
                {
                    to !== undefined ? <Link to={to}>{text}</Link> : <>{text}</>
                }
                {
                    (viewStyle === "with_image")? <div className={styles.image} style={{"backgroundImage": `url(${image})`}}> </div> : null
                }
            </div>
        </button>
    )
}

export default connect()(Button)