import styles from './PlacePanel.module.css'

interface PlacePanelProps {
    name: string,
    address: string,
    imageSrc: string,
    state: "default" | "active" | "deleted",
    checkboxState: "default" | "active" | "none",
    number: number
}

const PlacePanel = ({
    name, 
    address,
    imageSrc,
    state,
    checkboxState,
    number
}: PlacePanelProps) => {
    let numberClassnames = `${checkboxState === 'active' ? styles.number__disabled : styles.number__default}`
    let checkboxClassname = () => {
        switch(checkboxState) {
            case "active":
                return styles.checkbox__active;
            case "default":
                return styles.checkbox__default;
            case "none":
                return styles.checkbox__none;
        }
    }

    return (
        <div
            className = {styles.place_panel}
        >
            <div 
                className={numberClassnames}
                
            >
                {number}
            </div>
            <img src={imageSrc} alt='Дом Бабочка'/>
            <div className={styles.place_info}>
                <h3 className={styles.name}>{name}</h3>
                <h4 className={styles.address}>{address}</h4>
            </div>
            <div 
                className={checkboxClassname()}
                
            >

            </div>

        </div>
    )
}

export {PlacePanel}