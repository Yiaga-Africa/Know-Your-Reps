import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

type Props = {
    index: number
    image: string
    number: number
    description: string
}

const StatisticCard = ({ index, image, number, description }: Props) => {
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
                        {number && number.toLocaleString()}
                    </span>

                    <span className="font-light text-sm">{description}</span>
                </div>
            </div>

            <div className="flex flex-row-reverse p-4 text-sm">
                {/* <Link to="#">
                    View {index !== 2 || isVoter ? "List" : "by State"}
                </Link> */}
                {index !== 2 && (
                    <div className="cursor-pointer">View Bills</div>
                )}
            </div>
        </div>
    )
}

export default StatisticCard
