import { useEffect, useCallback } from 'react';

    const useClickOutside = (
        elementRef: React.RefObject<HTMLElement|null>, 
        onOutsideClick: () => void,
        activeArea?: React.RefObject<HTMLElement|null> 
    ) => {
    const onMouseDown = useCallback((e: MouseEvent) => {
        if (!e.shiftKey && !e.ctrlKey) {
            if (activeArea && activeArea.current) {
                if (elementRef.current && !elementRef.current.contains(e.target as Node) && activeArea.current.contains(e.target as Node)) {
                    onOutsideClick()
                }
            } else {
                if (elementRef.current && !elementRef.current.contains(e.target as Node)) {
                    onOutsideClick()
                }
            }
        }
    }, [elementRef, onOutsideClick, activeArea])

    useEffect(() => {
        window.addEventListener('mousedown', onMouseDown)
    
        return () => {
            window.removeEventListener('mousedown', onMouseDown)
        }
    }, [onMouseDown]);
}

export {useClickOutside}