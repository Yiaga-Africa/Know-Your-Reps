import React from "react"
import senateLogo from "../../assets/images/SenateLogoImage.png"
import repsLogo from "../../assets/images/HORLogoImage.png"
import StatisticCard from "../../components/Analysis/StatisticCard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { colors, MapData } from "../../utils/mapData"
import { gql, useQuery } from "@apollo/client"
import { Bar } from "react-chartjs-2"

const HORMemberAnalysis = () => {
    const legislatorData = [
        { description: "Senators", image: senateLogo },
        { description: "HOR Members", image: repsLogo },
    ]

    const northEastList: string[] = []
    const northWestList: string[] = []
    const northCentralList: string[] = []
    const southSouthList: string[] = []
    const southEastList: string[] = []
    const southWestList: string[] = []

    MapData.forEach((state) => {
        switch (state.fill) {
            case colors.northCentral:
                northCentralList.push(state.name.toUpperCase())
                break
            case colors.northEast:
                northEastList.push(state.name.toUpperCase())
                break
            case colors.northWest:
                northWestList.push(state.name.toUpperCase())
                break
            case colors.southSouth:
                southSouthList.push(state.name.toUpperCase())
                break
            case colors.southEast:
                southEastList.push(state.name.toUpperCase())
                break
            case colors.southWest:
                southWestList.push(state.name.toUpperCase())
                break
            default:
                break
        }
    })

    const GET_DATA = gql`
        query Data(
            $northCentralList: [String!]
            $northEastList: [String!]
            $northWestList: [String!]
            $southEastList: [String!]
            $southWestList: [String!]
            $southSouthList: [String!]
        ) {
            northCentral: representatives_aggregate(
                where: { state: { _in: $northCentralList } }
            ) {
                aggregate {
                    count
                }
            }

            northEast: representatives_aggregate(
                where: { state: { _in: $northEastList } }
            ) {
                aggregate {
                    count
                }
            }

            northWest: representatives_aggregate(
                where: { state: { _in: $northWestList } }
            ) {
                aggregate {
                    count
                }
            }

            southSouth: representatives_aggregate(
                where: { state: { _in: $southSouthList } }
            ) {
                aggregate {
                    count
                }
            }

            southEast: representatives_aggregate(
                where: { state: { _in: $southEastList } }
            ) {
                aggregate {
                    count
                }
            }

            southWest: representatives_aggregate(
                where: { state: { _in: $southWestList } }
            ) {
                aggregate {
                    count
                }
            }
        }
    `

    const { data, loading } = useQuery(GET_DATA, {
        variables: {
            northCentralList,
            northEastList,
            northWestList,
            southSouthList,
            southEastList,
            southWestList,
        },
    })

    type DataSet = {
        label: string
        data: number[]
        backgroundColor: string[]
    }

    const chartData = {
        labels: ["North Central", "North East", "North West", "South East", "South South", "South West"],
        datasets: [
            {
                label: "No of Reps",
                data: [],
                backgroundColor: [
                    "#2E58A6",
                    "#BE894A",
                    "#BEAC83",
                    "#FEA621",
                    "#0EA0C6",
                    "#9EE5A1",
                ],
            } as DataSet,
        ],
    }

    const options = {
        tooltips: {mode: true},
        hover: {mode: null}
    }

    if (!loading) {
        chartData.datasets[0].data.push(
            data.northCentral.aggregate.count,
            data.northEast.aggregate.count,
            data.northWest.aggregate.count,
            data.southEast.aggregate.count,
            data.southSouth.aggregate.count,
            data.southWest.aggregate.count
        )
        // console.log(data.northCentral.aggregate)
    }

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

                {!loading && <Bar data={chartData} />}
            </div>
        </div>
    )
}

export default HORMemberAnalysis
