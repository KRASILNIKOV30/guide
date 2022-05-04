    import React, { useCallback, useEffect, useRef, useState } from "react";

interface useDragAndDropProps {
    elementRef: React.RefObject<HTMLDivElement>,
    activeElementRef: React.RefObject<HTMLDivElement>,
    setState: React.Dispatch<React.SetStateAction<"closed" | "halfOpened" | "fullyOpened">>
    maxHeight: number
    maxAvgHeight: number
    minAvgHeight: number
    minHeight: number
}

export function useDragAndDrop({
    elementRef,
    activeElementRef,
    setState,
    maxHeight,
    maxAvgHeight,
    minAvgHeight,
    minHeight
}: useDragAndDropProps) {
    const startObjectPositionY = useRef<number>(0);
    let isStartHeightDeclared = useRef(false);

    const [elementHeight, setElementHeight] = useState(startObjectPositionY.current)
    const currentHeightRef = useRef(0)
    const startClientY = useRef(0); 

    const onTouchMove = useCallback((e: TouchEvent) => {
        let newHeight = startObjectPositionY.current - e.touches[0].clientY + startClientY.current;
        const heightProportion = newHeight / window.screen.availHeight * 100;
        if (heightProportion > maxHeight) {
            newHeight = document.documentElement.scrollHeight * maxHeight / 100
        }
        if (heightProportion < minHeight) {
            newHeight = document.documentElement.scrollHeight * minHeight / 100
        } 
        
        setElementHeight(newHeight)
        currentHeightRef.current = newHeight
    }, [setElementHeight])
    
    const onTouchEnd = useCallback((e: TouchEvent) => {
        if (elementRef.current) {
            elementRef.current.style.transition = '.5s'
        }
        const heightProportion = currentHeightRef.current / window.screen.availHeight * 100;
        if (heightProportion < minAvgHeight) {
            setState('halfOpened')
            setState('closed')
        } else if (heightProportion < maxAvgHeight) {
            setState('closed')
            setState('halfOpened')
        } else {
            setState('closed')
            setState('fullyOpened')
        }
        window.removeEventListener('touchmove', onTouchMove)
        window.removeEventListener('touchend', onTouchEnd)
        isStartHeightDeclared.current = false;
    }, [onTouchMove])

    const onTouchStart = useCallback((e: TouchEvent) => {
        e.preventDefault()
        if (activeElementRef.current && elementRef.current) {
            elementRef.current.style.transition = '0s'
            startObjectPositionY.current = document.documentElement.scrollHeight - elementRef.current?.getBoundingClientRect().top
            isStartHeightDeclared.current = true;
            window.addEventListener('touchend', onTouchEnd);
            window.addEventListener('touchmove', onTouchMove);
            startClientY.current = e.touches[0].clientY;
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
            activeElementRef.current.addEventListener('touchstart', onTouchStart)
            activeElementRefValue = activeElementRef.current;
        } 
        return () => {
            if (activeElementRefValue) {
                activeElementRefValue.removeEventListener('touchstart', onTouchStart)
            }
        }
    }, [onTouchStart, elementRef, activeElementRef])
}
