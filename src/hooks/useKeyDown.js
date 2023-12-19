import { useEffect } from 'react';

function useKeyDown(
    key,
    callback
) {
    const keyDownFunction = (event) => {
        if (event.code === key) {
            callback()
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", keyDownFunction);

        return (() => {
            window.removeEventListener("keydown", keyDownFunction);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

export default useKeyDown;