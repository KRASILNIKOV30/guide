import { useCallback, useEffect } from "react"

interface useCheckBoxTouchProps {
    checkBoxRef: React.RefObject<HTMLDivElement>,
    state: "default" | "active" | "finished" | "deleted" | "tourPreview",
    onClickFunction: Function,
    changeModelFunction: Function
} 

const useCheckBoxTouch = ({
    checkBoxRef,
    state,
    onClickFunction,
    changeModelFunction
}: useCheckBoxTouchProps) => {
    const onTouch = useCallback((e: TouchEvent) => {
        if (state === 'active') {
            changeModelFunction()
            onClickFunction()
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