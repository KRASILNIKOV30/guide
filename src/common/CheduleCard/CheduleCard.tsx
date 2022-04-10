import styles from './CheduleCard.module.css';

interface CheduleCardProps {
    day: 'Пн' | 'Вт' | 'Ср' | 'Чт' | 'Пт' | 'Сб' | 'Вс',
    workDay: boolean,
    timeStart?: string,
    timeEnd?: string,
}

const CheduleCard = ({
    day,
    workDay,
    timeStart = '-',
    timeEnd = '-'
}: CheduleCardProps) => {
    return (
        <div className = {`${styles.main_container} ${!workDay && styles.main_container_weekend}`}>
            <div className = {`${styles.day_text} ${!workDay && styles.day_text_weekend}`}>
                {day}
            </div>
            <div className = {`${styles.work_time_text} ${!workDay && styles.work_time_text_disabled}`}>
                <p className = {styles.time_text}>{timeStart}</p>
                <p className = {styles.time_text}>{timeEnd}</p>
            </div>
        </div>
    )
}

export default CheduleCard;