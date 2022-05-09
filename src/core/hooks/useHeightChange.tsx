import { useCallback, useEffect, useRef, useState } from "react";

interface useHeightChangeProps {
    elementRef: React.RefObject<HTMLDivElement>,
    activeElementRef: React.RefObject<HTMLDivElement>,
    setState: React.Dispatch<React.SetStateAction<"closed" | "opened">>
    avgHeight: number
    maxHeight: number
    minHeight: number
}

export function useHeightChange({
    elementRef,
    activeElementRef,
    setState,
    maxHeight,
    minHeight,
    avgHeight
}: useHeightChangeProps) {
    const startObjectPositionY = useRef<number>(0);
    let isStartHeightDeclared = useRef(false);

    const [elementHeight, setElementHeight] = useState(startObjectPositionY.current)
    const currentHeightRef = useRef(0)
    const startClientY = useRef(0); 

    const onTouchMove = useCallback((e: TouchEvent) => {
        let newHeight = startObjectPositionY.current - e.touches[0].clientY + startClientY.current;
        const heightProportion = newHeight / window.screen.availHeight * 100;
        if (heightProportion > maxHeight) {
            newHeight = document.documentElement.clientHeight * maxHeight / 100
        }
        if (heightProportion < minHeight) {
            newHeight = document.documentElement.clientHeight * minHeight / 100
        } 
        
        setElementHeight(newHeight)
        currentHeightRef.current = newHeight
    }, [setElementHeight, minHeight, maxHeight])
    
    const onTouchEnd = useCallback((e: TouchEvent) => {
        if (elementRef.current) {
            elementRef.current.style.transition = '.5s'
        }
        const heightProportion = currentHeightRef.current / window.screen.availHeight * 100;
        if (heightProportion < avgHeight) {
            setState('opened')
            setState('closed')
        } else {
            setState('closed')
            setState('opened')
        }
        window.removeEventListener('touchmove', onTouchMove)
        window.removeEventListener('touchend', onTouchEnd)
        isStartHeightDeclared.current = false;
    }, [onTouchMove, setState, avgHeight, elementRef])

    const onTouchStart = useCallback((e: TouchEvent) => {
        e.preventDefault()
        if (activeElementRef.current && elementRef.current) {
            elementRef.current.style.transition = '0s'
            startObjectPositionY.current = document.documentElement.clientHeight - elementRef.current?.getBoundingClientRect().top
            isStartHeightDeclared.current = true;
            window.addEventListener('touchend', onTouchEnd);
            window.addEventListener('touchmove', onTouchMove);
            startClientY.current = e.touches[0].clientY;
        }    
    }, [activeElementRef, elementRef, onTouchEnd, onTouchMove])
    
    useEffect(() => {
        if (elementRef.current && isStartHeightDeclared.current) {
           elementRef.current.style.height = `${elementHeight}px`
        } 
    }, [elementHeight, setElementHeight, elementRef])

    useEffect(() => {
        console.log(document.documentElement.clientHeight)
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
