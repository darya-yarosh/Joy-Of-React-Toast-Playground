import { useEffect } from 'react';

function useKey(
    key,
    callback
) {
    const keyDownFunction = (event) => {
        if (event.code === key) {
            callback()
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", keyDownFunction);

        return (() => {
            document.removeEventListener("keydown", keyDownFunction);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

export default useKey;