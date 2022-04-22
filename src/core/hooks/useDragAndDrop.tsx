import React, { useCallback, useEffect, useRef, useState } from "react";

interface useDragAndDropProps {
    elementRef: React.RefObject<HTMLDivElement>,
    activeElementRef: React.RefObject<HTMLDivElement>,
    setState: React.Dispatch<React.SetStateAction<"closed" | "halfOpened" | "fullyOpened">>
}

export function useDragAndDrop({
    elementRef,
    activeElementRef,
    setState
}: useDragAndDropProps) {
    const startObjectPositionY = useRef<number>(0);
    let isStartHeightDeclared = useRef(false);

    const [elementHeight, setElementHeight] = useState(startObjectPositionY.current)
    const startClientY = useRef(0); 

    const onMouseMove = useCallback((e: MouseEvent) => {
        console.log('onMouseMove')
        let newHeight = startObjectPositionY.current - e.clientY + startClientY.current;
        setElementHeight(newHeight)
    }, [setElementHeight])
    
    const onMouseUp = useCallback((e: MouseEvent) => {
        console.log('onMouseUp')
        let newHeight = startObjectPositionY.current - e.clientY + startClientY.current;
        const heightProportion = newHeight / window.screen.availHeight * 100;
        if (heightProportion < 40) {
            setState('halfOpened')
            setState('closed')
        } else if (heightProportion < 60) {
            setState('closed')
            setState('halfOpened')
        } else {
            setState('closed')
            setState('fullyOpened')
        }
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseup', onMouseUp)
        isStartHeightDeclared.current = false;
    }, [onMouseMove])

    const onMouseDown = useCallback((e: MouseEvent) => {
        console.log('onMouseDown')
        if (activeElementRef.current && elementRef.current) {
            startObjectPositionY.current = document.documentElement.scrollHeight - elementRef.current?.getBoundingClientRect().top
            console.log(startObjectPositionY.current)
            isStartHeightDeclared.current = true;
            window.addEventListener('mouseup', onMouseUp);
            window.addEventListener('mousemove', onMouseMove);
            startClientY.current = e.clientY;
        }    
    }, [activeElementRef, elementRef])
    
    useEffect(() => {
        if (elementRef.current && isStartHeightDeclared.current) {
           elementRef.current.style.height = `${elementHeight}px`
        } 
    }, [elementHeight, setElementHeight, elementRef])

    useEffect(() => {
        let activeElementRefValue: HTMLDivElement;
        if (activeElementRef.current && elementRef.current) {
            activeElementRef.current.addEventListener('mousedown', onMouseDown)
            activeElementRefValue = activeElementRef.current;
        } 
        return () => {
            if (activeElementRefValue) {
                activeElementRefValue.removeEventListener('mousedown', onMouseDown)
            }
        }
    }, [onMouseDown, elementRef, activeElementRef])
}
