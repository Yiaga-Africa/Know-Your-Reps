import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Link } from "react-router-dom"
import { Legislator } from "../../pages/LegislatorsPage"

type Props = {
    legislator: Legislator
    index: number
}

const LegislatorTableRow = ({ legislator, index }: Props) => {
    const type = legislator.status.toLowerCase().includes("senator")
        ? "senators"
        : "representatives"

    return (
        <>
            <div
                className={`lg:table-row ${
                    index % 2 !== 1 && "bg-gray-100"
                } hidden`}
                key={`${index}${legislator.age}`}
            >
                <div className="table-cell pl-4 py-8 pr-4 capitalize">
                    {legislator.name?.toLowerCase()}
                </div>
                <div className="table-cell py-8 break-words pr-2 capitalize">
                    {legislator.district?.toLowerCase()}
                </div>
                <div className="table-cell py-8 capitalize">
                    {legislator.state.toLowerCase()}
                </div>
                <div className="table-cell py-8">{legislator.age}</div>
                <div className="table-cell py-8">{legislator.party}</div>
                <div className="table-cell py-8">{legislator.status}</div>
                <div className="table-cell py-8">{legislator.gender}</div>
                <div className="table-cell">
                    <Link to={`/legislators/${type}/${legislator.id}`}>
                        <button
                            className="
                        cursor-pointer 
                        rounded-xl 
                        border-[3px] 
                        inline-block 
                        text-sm 
                        border-gray-600 
                        hover:bg-gray-600
                        hover:text-white
                        px-2
                        my-8
                    "
                        >
                            View Profile
                        </button>
                    </Link>
                </div>
            </div>

            <div
                className={`table-row ${
                    index % 2 !== 1 && "bg-gray-100"
                } lg:hidden`}
                key={index}
            >
                <div className="table-cell capitalize py-4 px-4">
                    <div className="flex justify-between">
                        {legislator.name?.toLowerCase()}

                        <FontAwesomeIcon icon={["fas", "caret-down"]} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default LegislatorTableRow
