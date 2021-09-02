import { gql, useQuery } from '@apollo/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Bar } from 'react-chartjs-2'
import { MapData, colors } from '../../utils/mapData'

const YouthSHOAByRegion = () => {
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
            northCentral: shoa_aggregate(
                where: {
                    state: { _in: $northCentralList }
                    _and: { age: { _lt: 36 } }
                }
            ) {
                aggregate {
                    count
                }
            }

            northEast: shoa_aggregate(
                where: {
                    state: { _in: $northEastList }
                    _and: { age: { _lt: 36 } }
                }
            ) {
                aggregate {
                    count
                }
            }

            northWest: shoa_aggregate(
                where: {
                    state: { _in: $northWestList }
                    _and: { age: { _lt: 36 } }
                }
            ) {
                aggregate {
                    count
                }
            }

            southSouth: shoa_aggregate(
                where: {
                    state: { _in: $southSouthList }
                    _and: { age: { _lt: 36 } }
                }
            ) {
                aggregate {
                    count
                }
            }

            southEast: shoa_aggregate(
                where: {
                    state: { _in: $southEastList }
                    _and: { age: { _lt: 36 } }
                }
            ) {
                aggregate {
                    count
                }
            }

            southWest: shoa_aggregate(
                where: {
                    state: { _in: $southWestList }
                    _and: { age: { _lt: 36 } }
                }
            ) {
                aggregate {
                    count
                }
            }
        }
    `

    const { data, loading, error } = useQuery(GET_DATA, {
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
                label: "Members of SHOA",
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

    return (
        <>
            <div className="flex justify-center items-center">
                {!loading && !error ? (
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

export default YouthSHOAByRegion
