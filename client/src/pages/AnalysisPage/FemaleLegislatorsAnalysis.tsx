import React from "react"
import senateLogo from "../../assets/images/SenateLogoImage.png"
import repsLogo from "../../assets/images/HORLogoImage.png"
import FemaleLegStatCard from "../../components/Analysis/FemaleLegStatCard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import FemaleLegislatorsByRegion from "../../components/Analysis/FemaleLegislatorsByRegion"
import PercentRepresentationInNass from "../../components/Analysis/PercentRepresentationInNass"

const FemaleLegislatorsAnalysis = () => {
    const femaleLegislatorData = [
        { description: "Female Senators", image: senateLogo },
        { description: "Female HOR Members", image: repsLogo },
    ]

    return (
        <div className="flex flex-col space-y-10">
            <div className="flex flex-row space-x-10">
                {femaleLegislatorData.map((legislator, index) => (
                    <FemaleLegStatCard
                        description={legislator.description}
                        image={legislator.image}
                        key={`card${index}`}
                    />
                ))}

                <div className="flex w-36 shadow-md hover:shadow-lg justify-center items-center bg-kyl-green text-white">
                    <span className="mr-4">View List</span>

                    <FontAwesomeIcon icon={["fas", "play"]} />
                </div>
            </div>

            {/* Region Visualization */}
            <div className="flex flex-col shadow-md p-4">
                <div className="flex flex-row justify-between items-center mb-4">
                    <div className="text-white bg-[#E74029] px-3 py-1 rounded-sm">
                        Female House of Representatives Members By Region
                    </div>

                    <FontAwesomeIcon
                        icon={["fas", "ellipsis-h"]}
                        className="text-gray-500 cursor-pointer"
                    />
                </div>

                <FemaleLegislatorsByRegion />
            </div>

            <div className="flex flex-col shadow-md p-4">
                <div className="flex flex-row justify-between items-center mb-4">
                    <div className="text-white bg-[#E74029] px-3 py-1 rounded-sm">
                        Percentage of Women in the National Assembly
                    </div>

                    <FontAwesomeIcon
                        icon={["fas", "ellipsis-h"]}
                        className="text-gray-500 cursor-pointer"
                    />
                </div>

                {/* NASS Representation 👇 */}
                <PercentRepresentationInNass />
            </div>
        </div>
    )
}

export default FemaleLegislatorsAnalysis
