import { gql, useQuery } from "@apollo/client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

type CardProps = {
    index: number
    number?: number | string
    description: string
    image?: string
    isVoter?: boolean
}

const StatisticCard = ({
    index,
    number,
    description,
    image,
    isVoter,
}: CardProps) => {
    let GET_AGGREGATE
    let type

    GET_AGGREGATE = gql`
        query GetAggregate {
            representatives_aggregate {
                aggregate {
                    count
                }
            }
            
            shoa_aggregate {
                aggregate {
                    count
                }
            }
        }
    `

    const { data, loading } = useQuery(GET_AGGREGATE)

    return (
        <div className="divide-y-2 divide-dashed divide-gray-200 min-w-[65%] lg:min-w-0 lg:w-72 shadow-md hover:shadow-lg inline-flex flex-col">
            <div className="py-8 px-6 flex">
                {image ? (
                    <img
                        src={image}
                        style={{ height: "2.6rem" }}
                        className="mr-5"
                    />
                ) : (
                    <FontAwesomeIcon
                        icon={["fas", "house-user"]}
                        className="mr-5"
                        style={{ fontSize: "45px" }}
                    />
                )}

                <div className="flex flex-col">
                    <span className="font-semibold">
                        {number ? (
                            number.toLocaleString()
                        ) : loading ? (
                            <></>
                        ) : description === "Senators" ? (
                            data.senators_aggregate.aggregate.count
                        ) : description === "HOR Members" ? (
                            data.representatives_aggregate.aggregate.count
                        ) : description === "SHOA Members" ? (
                            data.shoa_aggregate.aggregate.count
                        ) : (
                            <></>
                        )}
                    </span>

                    <span className="font-light text-sm">{description}</span>
                </div>
            </div>

            <div className="flex flex-row-reverse p-4 text-sm">
                <Link to="#">
                    View {index !== 2 || isVoter ? "List" : "by State"}
                </Link>
            </div>
        </div>
    )
}

export default StatisticCard
