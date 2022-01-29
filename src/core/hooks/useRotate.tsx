import { useCallback, useEffect, useRef, useState } from "react";

interface useRotateProps {
    elementRef: React.RefObject<HTMLDivElement>,
    rotateButtonRef: React.RefObject<HTMLDivElement>,
    onMouseUpFunction: Function,
    startAngle: number
}

const useRotate = ({
    elementRef,
    onMouseUpFunction,
    rotateButtonRef,
    startAngle
}: useRotateProps) => {
    const [angle, setAngle] = useState(startAngle);
    const startClientX = useRef(0);

    const onMouseMove = useCallback((e: MouseEvent) => {
        const newAngle = startAngle + e.clientX - startClientX.current
        setAngle(newAngle)
    }, [startAngle])

    const onMouseUp = useCallback((e: MouseEvent) => {
        const angleShift = e.clientX - startClientX.current;
        const newAngle = startAngle + angleShift
        setAngle(newAngle)
        onMouseUpFunction(angleShift)
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    }, [onMouseUpFunction, onMouseMove])

    const onMouseDown = useCallback((e: MouseEvent) => {
        e.preventDefault();
        if (elementRef.current) {
           window.addEventListener('mousemove', onMouseMove);
           window.addEventListener('mouseup', onMouseUp);
           startClientX.current = e.clientX
        }
    }, [elementRef, onMouseMove, onMouseUp])

    useEffect(() => {
        if (elementRef.current) {
            elementRef.current.style.transform = `rotate(${angle}deg)`
        }
    }, [angle, setAngle])
    
    useEffect(() => {
        let elementRefValue: HTMLDivElement;
        if (rotateButtonRef.current) {
            rotateButtonRef.current.addEventListener('mousedown', onMouseDown)
            elementRefValue = rotateButtonRef.current;
        } 
        return () => {
            if (elementRefValue) {
                elementRefValue.removeEventListener('mousedown', onMouseDown)
            }
        }
    }, [onMouseDown, rotateButtonRef.current])
}

export { useRotate }