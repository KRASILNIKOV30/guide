import { connect } from 'react-redux';
import { useRef, useState } from 'react';
import { useDragAndDrop } from '../../core/hooks/useDragAndDrop';
import styles from './PopOverTopMenu.module.css';

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
    const minHeight = 10;
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
        </div>
    )
}

export default connect()(PopOverTopMenu);