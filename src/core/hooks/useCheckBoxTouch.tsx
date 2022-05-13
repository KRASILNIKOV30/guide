import { useCallback, useEffect } from "react"

interface useCheckBoxTouchProps {
    checkBoxRef: React.RefObject<HTMLDivElement>,
    state: "default" | "active" | "finished" | "deleted" | "tourPreview",
    onClick: () => void,
} 

const useCheckBoxTouch = ({
    checkBoxRef,
    state,
    onClick
}: useCheckBoxTouchProps) => {
    const onTouch = useCallback((e: TouchEvent) => {
        if (state === 'active') {
            onClick()
        }     
    }, [state])

    useEffect(() => {
        let checkBoxRefValue: HTMLDivElement 
        if (checkBoxRef.current) {
            checkBoxRef.current.addEventListener('touchstart', onTouch, {passive: false})
            checkBoxRefValue = checkBoxRef.current
        }
        return () => {
            if (checkBoxRefValue) {
                checkBoxRefValue.removeEventListener('touchstart', onTouch)
            }
        }
    }, [checkBoxRef, state, onTouch])
}

export {useCheckBoxTouch}