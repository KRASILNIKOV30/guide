import { useCallback, useEffect } from "react"

interface useCheckBoxTouchProps {
    checkBoxRef: React.RefObject<HTMLDivElement>,
    state: "default" | "active" | "finished" | "deleted" | "tourPreview",
    setState: React.Dispatch<React.SetStateAction<"default" | "active" | "finished" | "deleted" | "tourPreview">>
} 

const useCheckBoxTouch = ({
    checkBoxRef,
    state,
    setState
}: useCheckBoxTouchProps) => {
    const onTouch = useCallback((e: TouchEvent) => {
        if (state === 'active') {
            setState('finished')
        } else if (state === 'finished') {
            setState('active')
        }
            
    }, [state, setState])

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
    }, [checkBoxRef, state, setState, onTouch])
}

export {useCheckBoxTouch}