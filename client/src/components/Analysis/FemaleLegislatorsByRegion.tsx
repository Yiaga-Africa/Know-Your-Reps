import React from "react"
import { useQuery, gql } from "@apollo/client"
import { Bar } from "react-chartjs-2"
import { MapData, colors } from "../../utils/mapData"
import { useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const FemaleLegislatorsByRegion = () => {
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
                where: {
                    state: { _in: $northCentralList }
                    _and: { gender: { _eq: "Female" } }
                }
            ) {
                aggregate {
                    count
                }
            }

            northEast: representatives_aggregate(
                where: {
                    state: { _in: $northEastList }
                    _and: { gender: { _eq: "Female" } }
                }
            ) {
                aggregate {
                    count
                }
            }

            northWest: representatives_aggregate(
                where: {
                    state: { _in: $northWestList }
                    _and: { gender: { _eq: "Female" } }
                }
            ) {
                aggregate {
                    count
                }
            }

            southSouth: representatives_aggregate(
                where: {
                    state: { _in: $southSouthList }
                    _and: { gender: { _eq: "Female" } }
                }
            ) {
                aggregate {
                    count
                }
            }

            southEast: representatives_aggregate(
                where: {
                    state: { _in: $southEastList }
                    _and: { gender: { _eq: "Female" } }
                }
            ) {
                aggregate {
                    count
                }
            }

            southWest: representatives_aggregate(
                where: {
                    state: { _in: $southWestList }
                    _and: { gender: { _eq: "Female" } }
                }
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
        labels: [
            "North Central",
            "North East",
            "North West",
            "South East",
            "South South",
            "South West",
        ],
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

    const ref = useRef()

    return (
        <>
            <div className="flex justify-center items-center">
                {!loading ? (
                    <Bar data={chartData} />
                ) : (
                    <FontAwesomeIcon
                        icon={["fas", "circle-notch"]}
                        size="2x"
                        className="text-kyl-green  m-6"
                        spin
                    />
                )}
            </div>
        </>
    )
}

export default FemaleLegislatorsByRegion
