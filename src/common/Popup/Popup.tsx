import { Link } from 'react-router-dom'
import styles from './Popup.module.css'

interface PopupProps {
    state: 'question' | 'final'
    name: string,
    onClick: React.Dispatch<React.SetStateAction<'none' | 'question' | 'final'>>
    onPositiveClick?: Function,
    onNegativeClick?: Function
}

const Popup = ({
    state,
    name,
    onClick,
    onPositiveClick,
    onNegativeClick
}: PopupProps) => {
    if (!onPositiveClick) {
        onPositiveClick = () => {}
    }
    if (!onNegativeClick) {
        onNegativeClick = () => {}
    }
    const onPositive = () => {
        onClick('none');
        onPositiveClick!()
    }
    const onNegative = () => {
        onClick('none');
        onNegativeClick!()
    }
    const getMessage = () => {
        if (state === 'question') {
            return `Вы дошли до ${name}?`
        }
        return `Вы прошли тур ${name}`
    }

    return(
        <div className={styles.popup}>
            <div className={styles.popup_content}>
                <div className={styles.popup_message}>
                    {getMessage()}
                </div>
                {state === 'question' &&
                    <div className={styles.popup_answers}>
                        <button onClick={onPositive} className={styles.positive_answer}>Да</button>
                        <button onClick={onNegative} className={styles.negative_answer}>Нет</button>
                    </div> 
                }
                {state === 'final' &&
                    <div className={styles.popup_button_wrap}>
                        <button className={styles.popup_button}>
                            <Link to={'/tourselect'}>На главную</Link>
                        </button>
                    </div>
                }
                
            </div>
        </div>
    )
}

export {Popup}