import { connect } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { completeTour } from '../../model/actionCreators'
import { AppDispatch } from '../../model/store'
import styles from './Popup.module.css'

interface PopupProps {
    state: 'question' | 'final'
    name: string,
    onClick: React.Dispatch<React.SetStateAction<'none' | 'question' | 'final'>>
    onPositiveClick?: Function,
    onNegativeClick?: Function,
    completeTour: () => void
}

const Popup = ({
    state,
    name,
    onClick,
    onPositiveClick,
    onNegativeClick,
    completeTour
}: PopupProps) => {
    const navigate = useNavigate();

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
                        <button 
                            className={styles.popup_button}
                            onClick={() => {
                                navigate('/');
                                completeTour()
                            }}
                        >
                            На главную
                        </button>
                    </div>
                }
                
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        completeTour: () => dispatch(completeTour()),
    }
}

export default connect(null, mapDispatchToProps)(Popup)