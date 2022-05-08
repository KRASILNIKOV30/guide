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
        if (elementRef.current) {
            elementRef.current.style.transition = '.5s'
        }

        if (currentClientX.current > startClientX.current - 20) {
            swipedLeft();
            console.log('Left')
        }
        else if (currentClientX.current < startClientX.current - 20) {
            swipedRight();
        }

        window.removeEventListener('touchend', onTouchEnd);
        window.removeEventListener('touchmove', onTouchMove)

    }, [elementRef, swipedRight, swipedLeft, onTouchMove, currentClientX])

    const onTouchStart = useCallback((e: TouchEvent) => {
        console.log('onTouchStart')
        //e.preventDefault();
        if (elementRef.current) {
            elementRef.current.style.transition = '0s';
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