import React from 'react'
import { Legislator } from '../../pages/LegislatorsPage'

type Props = {
    legislator: Legislator
    index: number
}

const StateLegislatorTableRow = ({ legislator, index }: Props) => {
    return (
        <div className={`table-row ${index % 2 !== 1 && 'bg-gray-100'}`} key={index}>
            <div className="table-cell pl-4 py-8 pr-4 capitalize">{legislator.name?.toLowerCase()}</div>
            <div className="table-cell py-8 break-words pr-2 capitalize">{legislator.district?.toLowerCase()}</div>
            <div className="table-cell py-8">{legislator.status}</div>
            <div className="table-cell py-8">{legislator.gender}</div>
            <div className="table-cell">
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
            </div>
        </div>
    )
}

export default StateLegislatorTableRow
