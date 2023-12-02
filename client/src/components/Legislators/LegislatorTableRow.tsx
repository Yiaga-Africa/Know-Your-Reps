import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Legislator } from "../../pages/LegislatorsPage"

type Props = {
    legislator: Legislator
    index: number
}

const LegislatorTableRow = ({ legislator, index }: Props) => {
    const [showMobileDetails, setShowMobileDetails] = useState(false)

    const type = legislator.status.toLowerCase().includes("senator")
        ? "senators"
        : "representatives"

        return (
            <>
                {/* Desktop View */}
                <div
                    className={`lg:table-row ${
                        index % 2 !== 1 && "bg-gray-100"
                    } hidden`}
                    key={`${index}${legislator?.age}`}
                >
                    <div className="table-cell pl-4 py-8 pr-4 capitalize">
                        {legislator?.name?.toLowerCase()}
                    </div>
                    <div className="table-cell py-8 break-words pr-2 capitalize">
                        {legislator?.district?.toLowerCase()}
                    </div>
                    <div className="table-cell py-8 capitalize">
                        {legislator?.state?.toLowerCase()}
                    </div>
                    <div className="table-cell py-8">{legislator?.age}</div>
                    <div className="table-cell py-8">{legislator?.party}</div>
                    <div className="table-cell py-8">{legislator?.status}</div>
                    <div className="table-cell py-8">{legislator?.gender}</div>
                    <div className="table-cell">
                        <Link to={`/legislators/${type}/${legislator?.id}`}>
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
    
                {/* Mobile View */}
                <div
                    className={`table-row ${
                        index % 2 !== 1 && "bg-gray-100"
                    } lg:hidden`}
                    key={index}
                >
                    <div className="table-cell capitalize py-4 px-4">
                        <div
                            className="flex justify-between"
                            onClick={() => setShowMobileDetails(!showMobileDetails)}
                        >
                            {legislator?.name?.toLowerCase()}
    
                            {showMobileDetails ? (
                                <FontAwesomeIcon icon={["fas", "caret-up"]} />
                            ) : (
                                <FontAwesomeIcon icon={["fas", "caret-down"]} />
                            )}
                        </div>
    
                        <div
                            style={{
                                visibility: showMobileDetails
                                    ? "visible"
                                    : "hidden",
                                height: showMobileDetails ? "auto" : 0,
                            }}
                            className="grid grid-cols-2 mt-2 ml-2 gap-x-0"
                        >
                            <div className="flex flex-col space-y-2">
                                <div>State:</div>
                                <div>District:</div>
                                <div>Age:</div>
                                <div>Party:</div>
                                <div>Gender:</div>
                            </div>
    
                            <div className="flex flex-col space-y-2 ml-[-4rem]">
                                <div className="capitalize">
                                    {legislator?.state?.toLowerCase()}
                                </div>
                                <div className="capitalize">
                                    {legislator?.district?.toLowerCase()}
                                </div>
                                <div>{legislator?.age}</div>
                                <div>{legislator?.party}</div>
                                <div>{legislator?.gender}</div>
                            </div>
    
                            <div className="relative mb-8 mt-2 col-span-2">
                                <Link to={`/legislators/${type}/${legislator?.id}`}>
                                    <button
                                        className="
                                            cursor-pointer 
                                            rounded-xl 
                                            border-[3px] 
                                            text-sm 
                                            border-gray-600 
                                            hover:bg-gray-600
                                            hover:text-white
                                            px-2
                                            absolute
                                            right-0
                                        "
                                    >
                                        View Profile
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    
    export default LegislatorTableRow
