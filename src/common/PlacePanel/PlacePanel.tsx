import { useRef } from 'react'
import { connect } from 'react-redux'
import { useCheckBoxTouch } from '../../core/hooks/useCheckBoxTouch'
import { passRoutePoint } from '../../model/actionCreators'
import { AppDispatch } from '../../model/store'
import styles from './PlacePanel.module.css'

interface PlacePanelProps {
    name: string,
    address: string,
    imageSrc: string,
    state: "default" | "active" | "finished" | "deleted" | "tourPreview",
    number: number,
    onClickFunction: Function
}

const PlacePanel = ({
    name, 
    address,
    imageSrc,
    state,
    number,
    onClickFunction
}: PlacePanelProps) => {
    
    let checkBoxRef = useRef(null)
    const swipeElementRef = useRef<HTMLDivElement>(null)

    useCheckBoxTouch({
        checkBoxRef,
        state: state,
        onClickFunction,
        changeModelFunction: passRoutePoint
    })

    let numberClassname = () => {
        if (state === 'finished') {
            return styles.number__disabled
        } else if (state === 'deleted') {
            return styles.number__deleted 
        } else {
            return styles.number__default
        }
    }
    let checkboxClassname = () => {
        switch(state) {
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
        if (state === 'active') {
            return styles.img_active
        } else if (state === 'deleted') {
            return ''
        }
        return styles.img_default    
    }

    return (
        <div
            className = {styles.place_panel}
            ref={swipeElementRef}
        >
            { state !== "tourPreview" && 
            <div 
                className={numberClassname()} 
            >
                {state === 'deleted' ? '' : number}
            </div>}
            {state === 'active' && <div className={styles.blackout}></div>}
            <div className={imgClassname()}></div>
            <div
                className={state === 'deleted' ? styles.img_deleted : styles.main_img} 
                style = {{'background': `url(${imageSrc}) no-repeat center center / cover`}}  
            >   
            </div>
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

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        passRoutePoint: () => dispatch(passRoutePoint())
    }
}

export default connect(mapDispatchToProps)(PlacePanel)