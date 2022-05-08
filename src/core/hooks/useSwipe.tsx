import { useCallback, useEffect, useRef } from "react";

interface useSwipeProps {
    elementRef: React.RefObject<HTMLDivElement>
    swipedRight: () => void
    swipedLeft: () => void
}

function useSwipe({ elementRef, swipedRight, swipedLeft }: useSwipeProps) {
    const startClientX = useRef(0);
    const currentClientX = useRef(0);

    const onTouchMove = useCallback((e: TouchEvent) => {
        currentClientX.current = e.touches[0].clientX;
    }, [])

    const onTouchEnd = useCallback((e: TouchEvent) => {
        if (currentClientX.current > startClientX.current - 20) {
            swipedLeft();
        }
        else if (currentClientX.current < startClientX.current - 20) {
            swipedRight();
        }

        window.removeEventListener('touchend', onTouchEnd);
        window.removeEventListener('touchmove', onTouchMove)

    }, [swipedRight, swipedLeft, onTouchMove, currentClientX])

    const onTouchStart = useCallback((e: TouchEvent) => {
        //e.preventDefault();
        if (elementRef.current) {
            window.addEventListener('touchend', onTouchEnd);
            window.addEventListener('touchmove', onTouchMove);
            startClientX.current = e.touches[0].clientX;
        }
    }, [elementRef, onTouchEnd, onTouchMove])
    
    useEffect(() => {
        let elementRefValue: HTMLDivElement;
        if (elementRef.current) {
            elementRef.current.addEventListener('touchstart', onTouchStart);
            elementRefValue = elementRef.current;
        }
    
        return () => {
            if (elementRefValue) {
                elementRefValue.removeEventListener('touchstart', onTouchStart);
            } 
        }
    }, [onTouchStart, elementRef]);
}

export { useSwipe }