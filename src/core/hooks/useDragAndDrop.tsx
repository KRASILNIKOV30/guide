import React, { useCallback, useEffect, useRef, useState } from "react";

interface useDragAndDropProps {
    elementRef: React.RefObject<HTMLDivElement>,
    activeElementRef: React.RefObject<HTMLDivElement>
}

export function useDragAndDrop({
    elementRef,
    activeElementRef
}: useDragAndDropProps) {
    const startObjectPositionY = useRef<number>(0);
    if (elementRef.current?.getBoundingClientRect().top) {
        startObjectPositionY.current = elementRef.current?.getBoundingClientRect().top
    }

    const [elementHeight, setElementHeight] = useState(startObjectPositionY.current)

    const startClientY = useRef(0); 

    const onMouseMove = useCallback((e: MouseEvent) => {
        console.log('onMouseMove')
        let newHeight = startObjectPositionY.current + e.clientY - startClientY.current;
        setElementHeight(newHeight)
    }, [setElementHeight])
    
    const onMouseUp = useCallback((e: MouseEvent) => {
        console.log('onMouseUp')
        let newHeight = startObjectPositionY.current + e.clientY - startClientY.current;
        setElementHeight(newHeight)   
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseup', onMouseUp)
    }, [onMouseMove])

    const onMouseDown = useCallback((e: MouseEvent) => {
        console.log('onMouseDown')
        if (activeElementRef.current) {
            window.addEventListener('mouseup', onMouseUp);
            window.addEventListener('mousemove', onMouseMove);
            startClientY.current = e.clientY;
        }    
    }, [activeElementRef])
    
    useEffect(() => {
        if (elementRef.current) {
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
    }, [onMouseDown, elementRef])
}