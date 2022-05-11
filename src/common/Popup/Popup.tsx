import styles from './Popup.module.css'

interface PopupProps {
    placeName: string,
    onClick: React.Dispatch<React.SetStateAction<boolean>>
    onPositiveClick?: Function,
    onNegativeClick?: Function
}

const Popup = ({
    placeName,
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
        onClick(false);
        onPositiveClick!()
    }
    const onNegative = () => {
        onClick(false);
        onNegativeClick!()
    }
    return(
        <div className={styles.popup}>
            <div className={styles.popup_content}>
                <div className={styles.popup_message}>
                    Вы дошли до {placeName}?
                </div>
                <div className={styles.popup_answers}>
                    <button onClick={onPositive} className={styles.positive_answer}>Да</button>
                    <button onClick={onNegative} className={styles.negative_answer}>Нет</button>
                </div>
            </div>
        </div>
    )
}

export {Popup}