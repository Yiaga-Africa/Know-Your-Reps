import { gql, useQuery } from "@apollo/client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Doughnut } from "react-chartjs-2"

const LegislatorStatusChart = () => {
    const newLegislator = "%New%"
    const returningLegislator = "%Returning%"

    const GET_DATA = gql`
        query GetLegislatorsAggregateByStatus(
            $newLegislator: String!
            $returningLegislator: String!
        ) {
            newRepresentatives: representatives_aggregate(
                where: { status: { _ilike: $newLegislator } }
            ) {
                aggregate {
                    count
                }
            }

            returningRepresentatives: representatives_aggregate(
                where: { status: { _ilike: $returningLegislator } }
            ) {
                aggregate {
                    count
                }
            }
        }
    `
    type DataSet = {
        label: string
        data: number[]
    }

    const chartData = {
        labels: ["New Legislators", "Returning Legislators"],
        datasets: [
            {
                label: "New vs Returning Legislators",
                data: [],
                backgroundColor: ["#7BB31A", "#FF9800"],
            } as DataSet,
        ],
    }

    const { data, loading } = useQuery(GET_DATA, {
        variables: { newLegislator, returningLegislator },
    })

    if (!loading) {
        chartData.datasets[0].data.push(
            data.newRepresentatives.aggregate.count,
            data.returningRepresentatives.aggregate.count
        )
    }

    return (
        <>
            <div className="flex justify-center items-center">
                {!loading ? (
                    <Doughnut
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

export default LegislatorStatusChart
