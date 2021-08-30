import React from "react"
import senateLogo from "../../assets/images/SenateLogoImage.png"
import repsLogo from "../../assets/images/HORLogoImage.png"
import StatisticCard from "../../components/Analysis/StatisticCard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import LegislatorsByRegion from "../../components/Analysis/LegislatorsByRegion"
import LegislatorStatusChart from "../../components/Analysis/LegislatorStatusChart"

const HORMemberAnalysis = () => {
    const legislatorData = [
        { description: "Senators", image: senateLogo },
        { description: "HOR Members", image: repsLogo },
    ]

    return (
        <div className="flex flex-col space-y-10">
            <div className="flex flex-row space-x-10">
                {legislatorData.map((legislator, index) => (
                    <StatisticCard
                        description={legislator.description}
                        image={legislator.image}
                        key={`card${index}`}
                        index={index}
                    />
                ))}

                <div className="flex w-36 shadow-md hover:shadow-lg justify-center items-center bg-kyl-green text-white">
                    <span className="mr-4">View List</span>

                    <FontAwesomeIcon icon={["fas", "play"]} />
                </div>
            </div>

            <div className="flex flex-col shadow-md p-4">
                <div className="flex flex-row justify-between items-center mb-4">
                    <div className="text-white bg-[#E74029] px-3 py-1 rounded-sm">
                        House of Representatives Members By Region
                    </div>

                    <FontAwesomeIcon
                        icon={["fas", "ellipsis-h"]}
                        className="text-gray-500 cursor-pointer"
                    />
                </div>

                <LegislatorsByRegion />
            </div>

            <div className="flex flex-col shadow-md p-4">
                <div className="flex flex-row justify-between items-center mb-4">
                    <div className="text-white bg-[#E74029] px-3 py-1 rounded-sm">
                        New VS Returning Legislators
                    </div>

                    <FontAwesomeIcon
                        icon={["fas", "ellipsis-h"]}
                        className="text-gray-500 cursor-pointer"
                    />
                </div>

                <LegislatorStatusChart />
            </div>
        </div>
    )
}

export default HORMemberAnalysis
