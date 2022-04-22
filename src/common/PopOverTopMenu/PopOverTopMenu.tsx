import { useRef } from 'react';
import { connect } from 'react-redux';
import { useDragAndDrop } from '../../core/hooks/useDragAndDrop';
import styles from './PopOverTopMenu.module.css';

interface PopOverTopMenuProps {
    state: 'closed' | 'halfOpened' | 'fullyOpened',
}

const PopOverTopMenu = ({
    state
}: PopOverTopMenuProps) => {
   

    const popOverTopRef = useRef(null)
    const popOverTopMenuRef = useRef(null)

    let height = '';
    switch (state) {
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

    /* useDragAndDrop({
        elementRef: popOverTopMenuRef,
        activeElementRef: popOverTopRef
    }) */

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
        </div>
    )
}

export default connect()(PopOverTopMenu);