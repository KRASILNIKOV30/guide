import { useRef, useState } from 'react';
import { useDragAndDrop } from '../../core/hooks/useDragAndDrop';
import styles from './PopOverTopMenu.module.css';

interface PopOverTopMenuProps {
    state?: 'closed' | 'halfOpened' | 'fullyOpened',
}

const PopOverTopMenu = ({
    state
}: PopOverTopMenuProps) => {
    if (!state) {
        state = 'closed'
    }
    
    const [currentState, setCurrentState] = useState(state)
    const popOverTopRef = useRef(null)
    const popOverTopMenuRef = useRef(null)

    let height = '';
    switch (currentState) {
        case 'closed': {
            height = '10vh'
            break;
        }
        case 'halfOpened': {
            height = '50vh'
            break
        }
        case 'fullyOpened': {
            height = '100vh'
        }
    }

    useDragAndDrop({
        elementRef: popOverTopMenuRef,
        activeElementRef: popOverTopRef,
        setState: setCurrentState
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
        </div>
    )
}

export {PopOverTopMenu}