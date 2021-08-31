import { gql, useQuery } from "@apollo/client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"

type CardProps = {
    index: number
    number?: number
    description: string
    image?: string
    isVoter?: boolean
}

const LegislatorStatisticCard = ({
    index,
    number,
    description,
    image,
    isVoter,
}: CardProps) => {
    let GET_AGGREGATE

    GET_AGGREGATE = gql`
        query GetAggregate {
            representatives_aggregate {
                aggregate {
                    count
                }
            }
            senators_aggregate {
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
        <div className="divide-y-2 divide-dashed divide-gray-200 w-72 shadow-md hover:shadow-lg inline-flex flex-col">
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
        </div>
    )
}

export default LegislatorStatisticCard
