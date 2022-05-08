import { useCallback, useEffect, useRef } from "react";

interface useSwipeProps {
    elementRef: React.RefObject<HTMLElement>
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
        if (currentClientX.current > startClientX.current - 20 && currentClientX.current  !== 0) {
            swipedLeft();
            currentClientX.current = 0;
        }
        else if (currentClientX.current < startClientX.current - 20 && currentClientX.current  !== 0) {
            swipedRight();
            currentClientX.current = 0;
        }

        window.removeEventListener('touchend', onTouchEnd);
        window.removeEventListener('touchmove', onTouchMove)
    }, [swipedRight, swipedLeft, onTouchMove, currentClientX])

    const onTouchStart = useCallback((e: TouchEvent) => {
        if (elementRef.current) {
            window.addEventListener('touchend', onTouchEnd);
            window.addEventListener('touchmove', onTouchMove);
            startClientX.current = e.touches[0].clientX;
        }
    }, [elementRef, onTouchEnd, onTouchMove])
    
    useEffect(() => {
        let elementRefValue: HTMLElement;
        if (elementRef.current) {
            elementRef.current.addEventListener('touchstart', onTouchStart, {passive: false});
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