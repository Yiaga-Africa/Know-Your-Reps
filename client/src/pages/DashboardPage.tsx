import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { ChangeEventHandler, useEffect, useState } from "react"
import StatisticCard from "../components/Dashboard/StatisticCard"
import NavBar from "../components/NavBar/NavBar"

// images
import map from "../assets/images/Geo-map-image.png"
import senateLogo from "../assets/images/SenateLogoImage.png"
import repsLogo from "../assets/images/HORLogoImage.png"
import shoaLogo from "../assets/images/SHOALogo.svg"
import voterRegLogo from "../assets/images/VoterRegLogo.svg"
import maleImage from "../assets/images/MaleImage.svg"
import femaleImage from "../assets/images/FemaleImage.svg"
import map2 from "../assets/images/nigeria.svg"
import pdf from "../assets/images/PDFImage.svg"

import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import Map from "../components/Map"
import { firebaseStorage } from "../utils/firebase"
import { Helmet } from "react-helmet"

const DashboardPage = () => {
    const legislatorList = [
        { description: "Senators", image: senateLogo },
        { description: "HOR Members", image: repsLogo },
        { description: "SHOA Members", image: shoaLogo },
    ]

    const voterList = [
        {
            number: "?",
            description: "Registered Voters",
            image: voterRegLogo,
        },
        { number: "?", description: "Male Voters", image: maleImage },
        { number: "?", description: "Female Voters", image: femaleImage },
    ]

    const geopoliticalZones = [
        { name: "North Central", color: "#2E58A6" },
        { name: "North East", color: "#BE894A" },
        { name: "North West", color: "#BEAC83" },
        { name: "South East", color: "#FEA621" },
        { name: "South South", color: "#0EA0C6" },
        { name: "South West", color: "#80C41C" },
    ]

    const recentBill = {
        title: "Lorem ipsum dolor sit amet",
        description:
            "Nam consequat mi felis, eu pellentesque ligula dapibus in. Praesent rutrum varius dolor nec fringilla.",
    }

    type Bill = {
        title: string
        description: string
    }

    const generateBills = (): Bill[] => {
        let bills = []
        for (let x = 0; x < 6; x++) {
            bills.push(recentBill)
        }

        return bills
    }

    return (
        <>
            <Helmet title={`Home | Know Your Legislators`} />

            <NavBar />

            <div className="mt-5 lg:mt-10 flex flex-col overflow-hidden">
                {/* Legislature member count */}
                <div className="flex overflow-auto pb-2 lg:pb-1 space-x-3 lg:justify-center px-3 lg:px-0">
                    {legislatorList.map((element, index) => (
                        <StatisticCard
                            key={index}
                            index={index}
                            description={element.description}
                            image={element.image}
                        />
                    ))}

                    <Link
                        to="/analysis"
                        className="flex min-w-[50%] lg:min-w-0 lg:w-56 shadow-md hover:shadow-lg justify-center items-center bg-kyl-green text-white"
                    >
                        <div className="flex flex-col mr-8 font-semibold text-lg">
                            <span>See</span>
                            <span>Analysis</span>
                        </div>

                        <FontAwesomeIcon icon={["fas", "play"]} />
                    </Link>
                </div>

                {/* Map and Bills Section */}
                <div className="flex flex-col lg:flex-row mt-8 lg:space-x-3 lg:justify-center px-3">
                    {/* Geographical Map for SHOA */}
                    <div className="shadow-md lg:w-[50rem] flex flex-col px-2 lg:px-8 py-3">
                        {/* Title and ellipses */}
                        <div className="flex flex-row justify-between">
                            <div className="font-semibold mb-5">
                                Geographical Map for SHOA
                            </div>
                            <div>
                                <FontAwesomeIcon
                                    icon={["fas", "ellipsis-h"]}
                                    className="text-gray-500 cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* Map */}
                        <div className="flex lg:justify-center">
                            {/* <img src={map} className="h-[22rem] w-[30rem] " /> */}
                            <Map />
                        </div>

                        {/* Map Legends */}
                        <div className="invisible lg:visible flex flex-wrap space-x-4 mt-1 lg:mt-5">
                            {geopoliticalZones.map((zone, index) => (
                                <div
                                    key={`${index}${zone}`}
                                    className=" flex flex-row items-center space-x-3"
                                >
                                    <div
                                        className={`rounded-full h-3 w-3`}
                                        style={{
                                            backgroundColor: `${zone.color}`,
                                        }}
                                    />
                                    <div className="text-sm">{zone.name}</div>
                                </div>
                            ))}
                        </div>

                        <div className="lg:invisible flex flex-row items-center space-x-2">
                            <div
                                className={`rounded-full h-3 w-3`}
                                style={{
                                    backgroundColor: `#3AA76D`,
                                }}
                            />
                            <div>Select State to see SHOA Data</div>
                        </div>
                    </div>

                    {/* Bills */}
                    <div className="shadow-md lg:w-80 mt-6 lg:mt-0">
                        {/* Title and ellipses */}
                        <div className="flex flex-row justify-between px-4 pt-3">
                            <div className="font-semibold">
                                Recent Bills in the Senate
                            </div>
                            <div>
                                <FontAwesomeIcon
                                    icon={["fas", "ellipsis-h"]}
                                    className="text-gray-500 cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* Bills List */}
                        <div className="flex flex-col divide-y-[1px] divide-gray-300 mt-2">
                            {generateBills().map((bill, index) => (
                                <Link
                                    to="#"
                                    key={index}
                                    className=" py-3 hover:bg-gray-100 last:h-full last:pb-7"
                                >
                                    <div className="flex flex-row px-4">
                                        <img src={pdf} />
                                        <div className="flex flex-col ml-3">
                                            <div className="line-clamp-1 font-semibold text-sm">
                                                {bill.title}
                                            </div>
                                            <div className="line-clamp-1 font-light text-sm">
                                                {bill.description}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Analysis of Voter Registration in Nigeria */}
                <div className="flex flex-col mt-8 mb-8  px-3 lg:px-0">
                    <div className="font-semibold ml-5 lg:ml-[12.5rem] mb-4">
                        Analysis of the Voter Register in Nigeria
                    </div>
                    <div className="flex overflow-auto  pb-2 lg:pb-1 space-x-3 lg:justify-center">
                        {voterList.map((element, index) => (
                            <StatisticCard
                                key={index}
                                index={index}
                                number={element.number}
                                description={element.description}
                                image={element.image}
                                isVoter
                            />
                        ))}

                        <Link
                            to="#"
                            className="flex min-w-[50%] lg:min-w-0 lg:w-56 shadow-md hover:shadow-lg justify-center items-center bg-kyl-green text-white"
                        >
                            <div className="flex flex-col mr-8 font-semibold text-lg">
                                <span>See</span>
                                <span>Analysis</span>
                            </div>

                            <FontAwesomeIcon icon={["fas", "play"]} />
                        </Link>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    )
}

export default DashboardPage
