import React, { useCallback, useEffect, useRef, useState } from "react";

interface useDragAndDropProps {
    elementRef: React.RefObject<HTMLDivElement>,
    onMouseUpFunction: Function,
    active: boolean
}

export function useDragAndDrop({
        elementRef,
        onMouseUpFunction,
        active
}: useDragAndDropProps) {
    const isStartPosDeclared = useRef(false);
    const startObjectPositionX = useRef<number>(0);
    const startObjectPositionY = useRef<number>(0);

    const [elementPosition, setElementPosition] = useState({
        x: startObjectPositionX.current,
        y: startObjectPositionY.current
    })

    const startClientX = useRef(0);
    const startClientY = useRef(0); 

    const onMouseMove = useCallback((e: MouseEvent) => {
        if (isStartPosDeclared.current) {
            const newX = startObjectPositionX.current + e.clientX - startClientX.current;
            const newY = startObjectPositionY.current + e.clientY - startClientY.current;
            setElementPosition({
                x: newX,
                y: newY
            })
        }
    }, [setElementPosition])
    
    const onMouseUp = useCallback((e: MouseEvent) => {
        if (isStartPosDeclared.current) {
            const xShift = e.clientX - startClientX.current;
            const yShift = e.clientY - startClientY.current
            let newX = startObjectPositionX.current + e.clientX - startClientX.current;
            let newY = startObjectPositionY.current + e.clientY - startClientY.current; 
            setElementPosition({
                x: newX,
                y: newY
            })
           onMouseUpFunction({x: xShift, y: yShift})   
        }
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseup', onMouseUp)
    }, [onMouseUpFunction, onMouseMove])

    const onMouseDown = useCallback((e: MouseEvent) => {
        if (elementRef.current && !e.defaultPrevented && active) {
            window.addEventListener('mouseup', onMouseUp);
            window.addEventListener('mousemove', onMouseMove);
            const strX = elementRef.current?.style.left;
            const strY = elementRef.current?.style.top;
            startObjectPositionX.current = Number(strX?.substring(0, strX.length - 2));
            startObjectPositionY.current = Number(strY?.substring(0, strY.length - 2));
            isStartPosDeclared.current = true
            startClientX.current = e.clientX;
            startClientY.current = e.clientY;
        }    
    }, [elementRef, onMouseMove, onMouseUp])
    
    useEffect(() => {
        if (elementRef.current && isStartPosDeclared.current) {
            elementRef.current.style.left = `${elementPosition.x}px`;
            elementRef.current.style.top = `${elementPosition.y}px`
        } 
    }, [elementPosition, setElementPosition, elementRef])

    useEffect(() => {
        let elementRefValue: HTMLDivElement;
        if (elementRef.current) {
            elementRef.current.addEventListener('mousedown', onMouseDown)
            elementRefValue = elementRef.current;
        } 
        return () => {
            if (elementRefValue) {
                elementRefValue.removeEventListener('mousedown', onMouseDown)
            }
        }
    }, [onMouseDown, elementRef])
}