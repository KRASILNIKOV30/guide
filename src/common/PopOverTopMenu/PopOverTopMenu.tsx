import { connect } from 'react-redux';
import { useRef, useState } from 'react';
import { useDragAndDrop } from '../../core/hooks/useDragAndDrop';
import styles from './PopOverTopMenu.module.css';
import { PlacePanel } from '../PlacePanel/PlacePanel';

interface PopOverTopMenuProps {
    state?: 'closed' | 'halfOpened' | 'fullyOpened',
}

const PopOverTopMenu = ({
    state
}: PopOverTopMenuProps) => {
    const maxHeight = 100;
    const maxAvgHeight = 60;
    const avgHeight = 50;
    const minAvgHeight = 40;
    const minHeight = 20;
    if (!state) {
        state = 'closed'
    }
    
    const [currentState, setCurrentState] = useState(state)
    const popOverTopRef = useRef(null)
    const popOverTopMenuRef = useRef(null)

    let height = '';
    switch (currentState) {
        case 'closed': {
            height = `${minHeight}vh`
            break;
        }
        case 'halfOpened': {
            height = `${avgHeight}vh`
            break
        }
        case 'fullyOpened': {
            height = `${maxHeight}vh`
        }
    }

    useDragAndDrop({
        elementRef: popOverTopMenuRef,
        activeElementRef: popOverTopRef,
        setState: setCurrentState,
        maxHeight,
        maxAvgHeight,
        minAvgHeight,
        minHeight
    })

    return(
        <div
            ref = {popOverTopMenuRef}
            className = {styles.pop_over_top_menu}
            style = {{
                'height': `${height}`
            }}
        >
            <div
                className = {styles.pop_over_top}
                ref = {popOverTopRef}
            >
            </div>
            <h1 className = {styles.header_text}>Туры от Гида</h1>
            <div className={styles.place_list}>
                <PlacePanel
                    name = 'Дом Бабочка'
                    address='Ленинский проспект, 16'
                    imageSrc='data:image/gif;base64,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'
                    state='active'
                    number={1}
                />
            </div>
        </div>
    )
}

export default connect()(PopOverTopMenu);