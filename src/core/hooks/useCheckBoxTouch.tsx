import { useCallback, useEffect } from "react"

interface useCheckBoxTouchProps {
    checkBoxRef: React.RefObject<HTMLDivElement>,
    state: "default" | "active" | "finished" | "deleted",
    setState: React.Dispatch<React.SetStateAction<"default" | "active" | "finished" | "deleted">>
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
        if (checkBoxRef.current) {
            checkBoxRef.current.addEventListener('touchstart', onTouch, {passive: false})
        }
        return () => {
            if (checkBoxRef.current) {
                checkBoxRef.current.removeEventListener('touchstart', onTouch)
            }
        }
    }, [checkBoxRef, state, setState])
}

export {useCheckBoxTouch}