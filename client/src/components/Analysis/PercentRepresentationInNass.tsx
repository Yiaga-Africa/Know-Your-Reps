import { gql, useQuery } from "@apollo/client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { useRef } from "react"
import { Doughnut, Pie } from "react-chartjs-2"

const PercentRepresentationInNass = () => {
    const maleLegislator = "Male"
    const femaleLegislator = "Female"

    type DataSet = {
        label: string
        data: number[]
    }

    const GET_DATA = gql`
        query GetLegislatorsAggregateByStatus(
            $maleLegislator: String!
            $femaleLegislator: String!
        ) {
            maleRepresentatives: representatives_aggregate(
                where: { gender: { _eq: $maleLegislator } }
            ) {
                aggregate {
                    count
                }
            }

            femaleRepresentatives: representatives_aggregate(
                where: { gender: { _ilike: $femaleLegislator } }
            ) {
                aggregate {
                    count
                }
            }

            maleSenators: senators_aggregate(
                where: { gender: { _eq: $maleLegislator } }
            ) {
                aggregate {
                    count
                }
            }

            femaleSenators: senators_aggregate(
                where: { gender: { _eq: $femaleLegislator } }
            ) {
                aggregate {
                    count
                }
            }
        }
    `

    const chartData = {
        labels: ["Male Legislators", "Female Legislators"],
        datasets: [
            {
                label: "Percentage of Female Legislators",
                data: [],
                backgroundColor: ["#7BB31A", "#FF9800"],
            } as DataSet,
        ],
    }

    const { data, loading, error } = useQuery(GET_DATA, {
        variables: { maleLegislator, femaleLegislator },
    })

    if (!loading && !error) {
        const maleLegislatorCount =
            data.maleRepresentatives.aggregate.count +
            data.maleSenators.aggregate.count

        const femaleLegislatorCount =
            data.femaleRepresentatives.aggregate.count +
            data.femaleSenators.aggregate.count

        chartData.datasets[0].data.push(
            maleLegislatorCount,
            femaleLegislatorCount
        )
    }

    return (
        <>
            <div className="flex justify-center items-center">
                {!loading ? (
                    <Pie
                        height={400}
                        data={chartData}
                        options={{
                            responsive: false,
                            aspectRatio: 2,
                            maintainAspectRatio: false,
                        }}
                    />
                ) : (
                    <>
                        <FontAwesomeIcon
                            icon={["fas", "circle-notch"]}
                            size="2x"
                            className="text-kyl-green  m-6"
                            spin
                        />
                    </>
                )}
            </div>
        </>
    )
}

export default PercentRepresentationInNass
