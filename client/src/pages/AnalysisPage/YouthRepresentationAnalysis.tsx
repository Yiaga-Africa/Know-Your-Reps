import React from "react"
import senateLogo from "../../assets/images/SenateLogoImage.png"
import repsLogo from "../../assets/images/HORLogoImage.png"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import YouthLegStatCard from "../../components/Analysis/YouthLegStatCard"
import YouthRepsByRegion from "../../components/Analysis/YouthRepsByRegion"
import YouthSHOAByRegion from "../../components/Analysis/YouthSHOAByRegion"

const YouthRepresentationAnalysis = () => {
    const legislatorData = [
        { description: "Youth Senators", image: senateLogo },
        { description: "Youth HOR Members", image: repsLogo },
    ]

    return (
        <div className="flex flex-col space-y-10">
            <div className="flex flex-row space-x-10">
                {legislatorData.map((legislator, index) => (
                    <YouthLegStatCard
                        description={legislator.description}
                        image={legislator.image}
                        key={`card${index}`}
                    />
                ))}

                <Link
                    to="/legislators"
                    className="flex w-36 shadow-md hover:shadow-lg justify-center items-center bg-kyl-green text-white"
                >
                    <div className="flex flex-col mr-4 font-semibold text-lg">
                        <span>View List</span>
                    </div>

                    <FontAwesomeIcon icon={["fas", "play"]} />
                </Link>
            </div>

            <div className="flex flex-col shadow-md p-4">
                <div className="flex flex-row justify-between items-center mb-4">
                    <div className="text-white bg-[#E74029] px-3 py-1 rounded-sm">
                        Youth House of Representatives Members By Region (35 and
                        under)
                    </div>

                    <FontAwesomeIcon
                        icon={["fas", "ellipsis-h"]}
                        className="text-gray-500 cursor-pointer"
                    />
                </div>

                <YouthRepsByRegion />
            </div>

            <div className="flex flex-col shadow-md p-4">
                <div className="flex flex-row justify-between items-center mb-4">
                    <div className="text-white bg-[#E74029] px-3 py-1 rounded-sm">
                        Youth State House of Assembly Members By Region (35 and
                        under)
                    </div>

                    <FontAwesomeIcon
                        icon={["fas", "ellipsis-h"]}
                        className="text-gray-500 cursor-pointer"
                    />
                </div>

                <YouthSHOAByRegion />
            </div>

            {/* <div className="flex flex-col shadow-md p-4">
                <div className="flex flex-row justify-between items-center mb-4">
                    <div className="text-white bg-[#E74029] px-3 py-1 rounded-sm">
                        New VS Returning Legislators
                    </div>

                    <FontAwesomeIcon
                        icon={["fas", "ellipsis-h"]}
                        className="text-gray-500 cursor-pointer"
                    />
                </div> */}

            {/* <LegislatorStatusChart /> */}
            {/* </div> */}
        </div>
    )
}

export default YouthRepresentationAnalysis
