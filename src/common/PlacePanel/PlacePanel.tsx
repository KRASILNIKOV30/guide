import { useEffect, useRef, useState } from 'react'
import { useCheckBoxTouch } from '../../core/hooks/useCheckBoxTouch'
import styles from './PlacePanel.module.css'

interface PlacePanelProps {
    name: string,
    address: string,
    imageSrc: string,
    state: "default" | "active" | "finished" | "deleted" | "tourPreview",
    number: number
}

const PlacePanel = ({
    name, 
    address,
    imageSrc,
    state,
    number
}: PlacePanelProps) => {
    let checkBoxRef = useRef(null)
    const [currentState, setCurrentState] = useState(state)

    useCheckBoxTouch({
        checkBoxRef,
        state: currentState,
        setState: setCurrentState
    })

    let numberClassname = () => {
        if (currentState === 'finished') {
            return styles.number__disabled
        } else if (currentState === 'deleted') {
            return styles.number__deleted 
        } else {
            return styles.number__default
        }
    }
    let checkboxClassname = () => {
        switch(currentState) {
            case "finished":
                return styles.checkbox__active;
            case "active":
                return styles.checkbox__default;
            case "default":
                return styles.checkbox__none;
            case "deleted":
                return styles.checkbox__none;
            case "tourPreview":
                return styles.checkbox__none;
        }
    }
    let imgClassname = () => {
        if (currentState === 'active') {
            return styles.img_active
        } else if (currentState === 'deleted') {
            return ''
        }
        return styles.img_default    
    }

    return (
        <div
            className = {styles.place_panel}
        >
            { state !== "tourPreview" && 
            <div 
                className={numberClassname()} 
            >
                {state === 'deleted' ? '' : number}
            </div>}
            {currentState === 'active' && <div className={styles.blackout}></div>}
            <div className={imgClassname()}></div>
            <img
                className={state === 'deleted' ? styles.img_deleted : styles.main_img} 
                src={imageSrc} 
                alt='Дом Бабочка'
            />
            <div className={styles.place_info}>
                <h3 className={styles.name}>{name}</h3>
                <h4 className={styles.address}>{address}</h4>
            </div>
            <div 
                className={checkboxClassname()}
                ref = {checkBoxRef}
            >
            </div>
        </div>
    )
}

export {PlacePanel}