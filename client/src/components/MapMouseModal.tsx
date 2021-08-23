import React, { useEffect, useState } from 'react'

type Props = {
    text: string
    show: boolean
}

const MapMouseModal = ({ text, show }: Props) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const setFromEvent = (e: any) => setMousePosition({ x: e.pageX, y: e.pageY });
        window.addEventListener("mousemove", setFromEvent);

        return () => {
            window.removeEventListener("mousemove", setFromEvent);
        };
    }, [])

    return (
        <>
            {
                show &&
                <div className="z-20 absolute bg-gray-200 px-4 py-2 rounded-md" style={{ left: mousePosition.x - 35, top: mousePosition.y - 50 }}>
                    <div>{text}</div>
                </div>
            }
        </>
    )
}

export default MapMouseModal
