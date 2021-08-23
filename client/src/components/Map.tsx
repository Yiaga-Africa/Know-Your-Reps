import React, { useState } from "react"
import { Link } from "react-router-dom"
import { MapData } from "../utils/mapData"
import MapMouseModal from "./MapMouseModal"
import * as Routes from "../utils/routes"

const Map = () => {
    const [showModal, setShowModal] = useState(false)
    const [activeState, setActiveState] = useState("")

    const mouseEnter = (e: React.MouseEvent<SVGPathElement>, name: string) => {
        e.currentTarget.style.fill = "#d3d3d3"
        setShowModal(true)
        setActiveState(name)
    }

    const mouseLeave = (
        e: React.MouseEvent<SVGPathElement>,
        originalColor: string
    ) => {
        e.currentTarget.style.fill = originalColor
        setShowModal(false)
        setActiveState("")
    }

    return (
        <>
            <MapMouseModal show={showModal} text={activeState} />

            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-[22rem]"
                overflow="visible"
                viewBox="0 0 841.9 595.3"
            >
                <g>
                    {MapData.map((state, index) => (
                        <Link
                            key={index}
                            to={`${Routes.STATE_INFO}/${index + 1}`}
                        >
                            <path
                                d={state.d}
                                name={state.name}
                                fill={state.fill}
                                id={state.id}
                                stroke="black"
                                className="cursor-pointer"
                                onMouseEnter={(e) => mouseEnter(e, state.name)}
                                onMouseLeave={(e) => mouseLeave(e, state.fill)}
                            />
                        </Link>
                    ))}
                </g>
            </svg>
        </>
    )
}

export default Map
