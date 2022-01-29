import { useCallback, useEffect, useRef, useState } from "react"

type CornersType = {
    topLeft: React.RefObject<HTMLDivElement>,
    topRight: React.RefObject<HTMLDivElement>,
    bottomLeft: React.RefObject<HTMLDivElement>,
    bottomRight: React.RefObject<HTMLDivElement>
}

interface useResizeProps {
    elementRef: React.RefObject<HTMLDivElement>,
    corners: CornersType,
    onMouseUpFunction: Function
}

export const useResize = ({
    elementRef,
    corners,
    onMouseUpFunction
}: useResizeProps) => {
    const startObjectSize = {
        width: useRef(0),
        height: useRef(0)
    }
    const isStartSizeDeclared = useRef(false)
    const newWidth = useRef(0); 
    const newHeight = useRef(0);
    const edgeType = useRef('');

    const startObjectPositionX = useRef<number>(0);
    const startObjectPositionY = useRef<number>(0);

    const [elementSize, setElementSize] = useState({
        width: startObjectSize.width.current,
        height: startObjectSize.height.current
    })

    const [elementPosition, setElementPosition] = useState({
        x: startObjectPositionX.current,
        y: startObjectPositionY.current
    })

    const startClientX = useRef(0);
    const startClientY = useRef(0);
    const shiftXRef = useRef(0);
    const shiftYRef = useRef(0)

    const onMouseMove = useCallback((e: MouseEvent) => {
        if (isStartSizeDeclared.current) {
            let newX = startObjectPositionX.current;
            let newY = startObjectPositionY.current;
            const shiftX = e.clientX - startClientX.current;
            const shiftY = e.clientY - startClientY.current;
            const proportions = startObjectSize.width.current/startObjectSize.height.current;
            switch (edgeType.current) {
                case 'top-left': 
                    if (e.shiftKey) {
                        newX = startObjectPositionX.current + shiftX * proportions;
                        newY = startObjectPositionY.current + shiftX;
                        shiftXRef.current = shiftX * proportions;
                        shiftYRef.current = shiftX;
                        newWidth.current = startObjectSize.width.current - shiftX * proportions;
                        newHeight.current = startObjectSize.height.current - shiftX;    
                    } else {
                        newX = startObjectPositionX.current + shiftX;
                        newY = startObjectPositionY.current + shiftY;
                        shiftXRef.current = shiftX;
                        shiftYRef.current = shiftY;
                        newWidth.current = startObjectSize.width.current - shiftX;
                        newHeight.current = startObjectSize.height.current - shiftY
                    }
                break;
                case 'top-right': 
                    if (e.shiftKey) {
                        newX = startObjectPositionX.current;
                        newY = startObjectPositionY.current + shiftY; 
                        shiftYRef.current = shiftY;
                        newWidth.current = startObjectSize.width.current - shiftY * proportions;
                        newHeight.current = startObjectSize.height.current - shiftY   
                    } else {
                        newX = startObjectPositionX.current;
                        newY = startObjectPositionY.current + shiftY; 
                        shiftYRef.current = shiftY;
                        newWidth.current = startObjectSize.width.current + shiftX;
                        newHeight.current = startObjectSize.height.current - shiftY    
                    }
                break;
                case 'bottom-right': 
                    if (e.shiftKey) {
                        newWidth.current = startObjectSize.width.current + shiftX * proportions;
                        newHeight.current = startObjectSize.height.current + shiftX;    
                    } else {
                        newWidth.current = startObjectSize.width.current + shiftX;
                        newHeight.current = startObjectSize.height.current + shiftY    
                    } 
                break;
                case 'bottom-left': 
                    if (e.shiftKey) {
                        newX = startObjectPositionX.current - shiftY * proportions;
                        newY = startObjectPositionY.current;
                        shiftXRef.current = -shiftY * proportions; 
                        newWidth.current = startObjectSize.width.current + shiftY * proportions;
                        newHeight.current = startObjectSize.height.current + shiftY    
                    } else {
                        newX = startObjectPositionX.current + shiftX;
                        newY = startObjectPositionY.current;
                        shiftXRef.current = shiftX; 
                        newWidth.current = startObjectSize.width.current - shiftX;
                        newHeight.current = startObjectSize.height.current + shiftY;    
                    }
                break;
            } 
            const strokeWidth = Number(elementRef.current?.style.strokeWidth)
            if (newWidth.current < strokeWidth) {
                newWidth.current = strokeWidth
            }
            if (newHeight.current < strokeWidth) {
                newHeight.current = strokeWidth
            }
            setElementPosition({
                x: newX,
                y: newY
            })
            setElementSize({
                width: newWidth.current,
                height: newHeight.current
            })
        }
    }, [])

    const onMouseUp = useCallback((e: MouseEvent) => {
        if (isStartSizeDeclared.current) {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            const shiftX = shiftXRef.current;
            const shiftY = shiftYRef.current;
            setElementSize({
                width: newWidth.current,
                height: newHeight.current
            });
            onMouseUpFunction(
                newWidth.current, 
                newHeight.current,
                shiftX,
                shiftY
            );
        }
    }, [onMouseUpFunction])

    const onMouseDown = useCallback((e: MouseEvent) => {
        if (elementRef.current) {
            e.preventDefault();
            const target = e.target as HTMLDivElement;
            edgeType.current = target.id;
            window.addEventListener('mousemove', onMouseMove); 
            window.addEventListener('mouseup', onMouseUp); 
            const width = elementRef.current?.style.width;
            const height = elementRef.current?.style.height
            startObjectSize.width.current = Number(width.substring(0, width.length - 2));
            startObjectSize.height.current = Number(height.substring(0, height.length - 2));
            const strX = elementRef.current?.style.left;
            const strY = elementRef.current?.style.top;
            startObjectPositionX.current = Number(strX?.substring(0, strX.length - 2));
            startObjectPositionY.current = Number(strY?.substring(0, strY.length - 2));
            isStartSizeDeclared.current = true;
            startClientX.current = e.clientX;
            startClientY.current = e.clientY;
            newWidth.current = startObjectSize.width.current;
            newHeight.current = startObjectSize.height.current;
        }
    }, [elementRef, onMouseMove, onMouseUp]);

    useEffect(() => {
        if (elementRef.current && isStartSizeDeclared.current) {
            elementRef.current.style.width = `${elementSize.width}px`;
            elementRef.current.style.height = `${elementSize.height}px`;
            elementRef.current.style.left = `${elementPosition.x}px`;
            elementRef.current.style.top = `${elementPosition.y}px`;
        }
    }, [elementSize, setElementSize, elementPosition, setElementPosition])

    useEffect(() => {
            corners.topLeft.current?.addEventListener('mousedown', onMouseDown);
            corners.topRight.current?.addEventListener('mousedown', onMouseDown);
            corners.bottomLeft.current?.addEventListener('mousedown', onMouseDown);
            corners.bottomRight.current?.addEventListener('mousedown', onMouseDown);
           
        return () => {
            if (elementRef.current) {
                corners.topLeft.current?.removeEventListener('mousedown', onMouseDown);
                corners.topRight.current?.removeEventListener('mousedown', onMouseDown);
                corners.bottomLeft.current?.removeEventListener('mousedown', onMouseDown);
                corners.bottomRight.current?.removeEventListener('mousedown', onMouseDown);
            }
        }
    }, [onMouseDown, corners.topLeft.current, corners.topRight.current, corners.bottomLeft.current, corners.bottomRight.current]) 
}