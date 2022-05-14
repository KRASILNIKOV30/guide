import styles from './Page404.module.css'
import { connect } from 'react-redux';
import image from './images/image.svg'
import Button from '../Button/Button';

interface Page404Props {

}

const Page404 = ({}: Page404Props) => {
    return (
        <div 
            className={styles.main_container}
            style = {{'background': `url(${image}) no-repeat center center / cover`}}
        >
            <div className={styles.info_container}>
                <div className={styles.error_code}>404</div>
                <div className={styles.message}>Что-то пошло не так...</div>
            </div>
            <div className={styles.button_wrap}>
                <Button text='На главную' viewStyle='main' onClick={() => {document.location.replace('/')}}></Button>
            </div>
        </div>
    )
}

export default connect()(Page404)