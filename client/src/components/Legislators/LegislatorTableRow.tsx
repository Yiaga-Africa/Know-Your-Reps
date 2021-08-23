import React from "react"
import { Link } from "react-router-dom"
import { Legislator } from "../../pages/LegislatorsPage"

// type Legislator = {
//     name: string,
//     district: string,
//     status: string,
//     gender: string,
//     party: string,
//     age: number,
//     state: string
// }

type Props = {
    legislator: Legislator
    index: number
}

const LegislatorTableRow = ({ legislator, index }: Props) => {
    const type = legislator.status.toLowerCase().includes("senator")
        ? "senators"
        : "representatives"

    return (
        <div
            className={`table-row ${index % 2 !== 1 && "bg-gray-100"}`}
            key={index}
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
                    <div
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
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default LegislatorTableRow
