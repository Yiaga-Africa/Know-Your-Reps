import React from "react"
import { Bill } from "../../pages/BillsPage"

type Props = {
    index: number
    bill: Bill
}

const BillsTableRow = ({ index, bill }: Props) => {
    return (
        <div
            className={`table-row ${index % 2 !== 1 && "bg-gray-100"}`}
            key={index}
        >
            <div className="table-cell pl-4 py-8 pr-4">{bill.id}</div>
            <div className="table-cell py-8 break-words pr-4 capitalize">
                {bill.name.toLowerCase()}
            </div>
            <div className="table-cell py-8">{bill.firstReading}</div>
            <div className="table-cell py-8">{bill.secondReading}</div>
            <div className="table-cell py-8">{bill.thirdReading}</div>
            <div className="table-cell py-8">{bill.status}</div>
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
                    Download
                </div>
            </div>
        </div>
    )
}

export default BillsTableRow
