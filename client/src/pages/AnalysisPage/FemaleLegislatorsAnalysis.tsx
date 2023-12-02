import React from "react"
import senateLogo from "../../assets/images/SenateLogoImage.png"
import repsLogo from "../../assets/images/HORLogoImage.png"
import FemaleLegStatCard from "../../components/Analysis/FemaleLegStatCard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import FemaleLegislatorsByRegion from "../../components/Analysis/FemaleLegislatorsByRegion"
import PercentRepresentationInNass from "../../components/Analysis/PercentRepresentationInNass"
import { Link } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { GET_FEMALE_LEGISLATORS_DATA } from "../../graphql/queries"

const FemaleLegislatorsAnalysis = () => {
    const { data, loading, error } = useQuery(GET_FEMALE_LEGISLATORS_DATA)

    if (loading) {
        return <div>Loading...</div>; // You can replace this with a loading indicator
    }

    if (error) {
        console.error("Error fetching data:", error)
        return <div>Error fetching data</div>; // You can replace this with an error message or component
    }

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
                        number={data ? data.senators_aggregate.aggregate.count : 0}
                        // You can similarly update the number for HOR members based on your GraphQL query structure
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
