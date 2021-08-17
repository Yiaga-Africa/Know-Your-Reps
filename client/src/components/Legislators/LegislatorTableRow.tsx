import React from 'react'

type Legislator = {
    name: string,
    representing: string,
    office: string,
    gender: string
}

type Props = {
    legislator: Legislator
    index: number
}

const LegislatorTableRow = ({ legislator, index }: Props) => {
    return (
        <div className={`table-row ${index % 2 !== 1 && 'bg-gray-100'}`} key={index}>
            <div className="table-cell pl-4 py-8">{legislator.name}</div>
            <div className="table-cell">{legislator.representing}</div>
            <div className="table-cell">{legislator.office}</div>
            <div className="table-cell">{legislator.gender}</div>
            <div className="table-cell">
                <div
                    className="
                        cursor-pointer 
                        rounded-xl 
                        border-[3px] 
                        inline-block 
                        text-sm 
                        border-gray-600 px-2
                        hover:bg-gray-600
                        hover:text-white
                    "
                >
                    View Profile
                </div>
            </div>
        </div>
    )
}

export default LegislatorTableRow
