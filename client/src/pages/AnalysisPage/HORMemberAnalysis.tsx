import React from "react";
import senateLogo from "../../assets/images/SenateLogoImage.png";
import repsLogo from "../../assets/images/HORLogoImage.png";
import LegislatorStatisticCard from "../../components/Analysis/LegislatorStatisticCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LegislatorsByRegion from "../../components/Analysis/LegislatorsByRegion";
import LegislatorStatusChart from "../../components/Analysis/LegislatorStatusChart";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_LEGISLATOR_DATA } from "../../graphql/queries";

const HORMemberAnalysis = () => {
    const { data, loading, error } = useQuery(GET_LEGISLATOR_DATA);

    if (loading) {
        return <div>Loading...</div>; // You can replace this with a loading indicator
    }

    if (error) {
        console.error("Error fetching data:", error);
        return <div>Error fetching data</div>; // You can replace this with an error message or component
    }

    const legislatorData = [
        { description: "Senators", image: senateLogo },
        { description: "HOR Members", image: repsLogo },
    ];

    return (
        <div className="flex flex-col space-y-10">
            <div className="flex flex-row space-x-10">
                {legislatorData.map((legislator, index) => (
                    <LegislatorStatisticCard
                        description={legislator.description}
                        image={legislator.image}
                        key={`card${index}`}
                        index={index}
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
    );
};

export default HORMemberAnalysis;
