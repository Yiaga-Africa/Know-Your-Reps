import { gql, useQuery } from "@apollo/client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

type CardProps = {
    number?: number
    description: string
    image?: string
    isVoter?: boolean
}

const FemaleLegStatCard = ({ number, description, image }: CardProps) => {
    let GET_DATA = gql`
        query GetFemaleLegislators {
            representatives_aggregate(where: { gender: { _eq: "Female" } }) {
                aggregate {
                    count
                }
            }
            senators_aggregate(where: { gender: { _eq: "Female" } }) {
                aggregate {
                    count
                }
            }
        }
    `

    const { data, loading } = useQuery(GET_DATA)

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
                        ) : description === "Female Senators" ? (
                            data.senators_aggregate.aggregate.count
                        ) : description === "Female HOR Members" ? (
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

export default FemaleLegStatCard
