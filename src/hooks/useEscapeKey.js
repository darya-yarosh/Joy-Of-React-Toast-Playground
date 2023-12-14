import { useEffect } from 'react';

function useEscapeKey(
    key,
    callback
) {
    useEffect(() => {
        document.addEventListener("keydown", (event) => {
            if (event.code === key) {
                callback()
            }
        });

        return (() => {
            document.removeEventListener("keydown", (event) => {
                if (event.code === key) {
                    callback()
                }
            })
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

export default useEscapeKey;