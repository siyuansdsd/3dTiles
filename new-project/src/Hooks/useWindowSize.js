import { useEffect, useState } from "react"

const useWindowSize = () => {
    // 我需要有addEventListner的funcrtion
    // 我需要有removeEventListner的funcrtion
    // 请在下面写出符合上述要求的代码
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    })
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return windowSize
}

export default useWindowSize