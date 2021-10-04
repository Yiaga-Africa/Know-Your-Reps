import React, { useEffect, useState } from "react"
import Footer from "../components/Footer"
import StatisticCard from "../components/Legislators/StatisticCard"
import NavBar from "../components/NavBar/NavBar"

// Images
import maleImage from "../assets/images/MaleImage.svg"
import femaleImage from "../assets/images/FemaleImage.svg"
import senateLogo from "../assets/images/SenateLogoImage.png"
import repsLogo from "../assets/images/HORLogoImage.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// import { LegislatorsSampleDataSet } from '../utils/legislatorsSampleData'
import LegislatorTableRow from "../components/Legislators/LegislatorTableRow"
import { gql, useQuery } from "@apollo/client"
import { Link } from "react-router-dom"
import Searchbar from "../components/Searchbar"
import { Helmet } from "react-helmet"

export type Legislator = {
    id: number
    name: string
    age: number
    gender: string
    party: string
    district: string
    state: string
    status: string
    __typename: string
}

// Sorts using the values in object keys for an object array

export const dynamicSort = (property: string) => {
    var sortOrder = 1
    if (property[0] === "-") {
        sortOrder = -1
        property = property.substr(1)
    }
    return function (a: any, b: any) {
        /* next line works with strings and numbers,
         * and you may want to customize it to your needs
         */
        var result =
            a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0
        return result * sortOrder
    }
}

const LegislatorsPage = () => {
    const generalData = [
        { description: "Senators", image: senateLogo },
        { description: "HOR Members", image: repsLogo },
        { number: 360, description: "Male Legislators", image: maleImage },
        { number: 804, description: "Female Legislators", image: femaleImage },
    ]

    const [searchValue, setSearchValue] = useState("")

    let legislatorList: Legislator[] = []

    const GET_LEGISLATORS = gql`
        query GetLegislators {
            senators {
                id
                name
                age
                party
                district
                state
                gender
                status
            }

            representatives {
                id
                name
                age
                party
                district
                state
                gender
                status
            }
        }
    `

    const { data, loading, error } = useQuery(GET_LEGISLATORS)

    const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    }

    const onCategoryClick = (text: string) => {
        setSearchValue(text)
    }

    const clearSearch = () => {
        setSearchValue("")
    }

    const handleChamberChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSearchValue(event.target.value)
    }

    if (!loading) {
        const senatorsList: Legislator[] = data.senators
        const representativesList: Legislator[] = data.representatives
        legislatorList = senatorsList.concat(representativesList)
    }

    return (
        <>
            <Helmet title={`Legislators | Know Your Legislators`} />
            <NavBar />

            <div className="mt-10 flex flex-col">
                <div className="flex overflow-auto pb-2 lg:pb-1 space-x-3 lg:justify-center px-3 lg:px-0">
                    {generalData.map((element, index) => (
                        <StatisticCard
                            key={index}
                            description={element.description}
                            image={element.image}
                        />
                    ))}
                </div>

                {/* Search and Category */}
                <div className="flex flex-col lg:flex-row justify-center mt-10 mx-3 lg:mx-0 lg:space-x-6">
                    {/* Sidebar */}
                    <div className="hidden lg:flex lg:flex-col">
                        {/* Category */}
                        <div className="bg-[#F6F6F6] divide-y-2 divide-dashed divide-gray-200 py-3 shadow-md mb-4">
                            <div className="font-semibold px-5 pb-1">
                                Category
                            </div>
                            <div className="text-gray-700 px-5 pt-4 inline-flex flex-col space-y-2">
                                <div
                                    className="cursor-pointer"
                                    onClick={(e) => onCategoryClick("senator")}
                                >
                                    Senate
                                </div>

                                <div
                                    className="cursor-pointer"
                                    onClick={(e) => onCategoryClick("rep")}
                                >
                                    House of Reps
                                </div>
                            </div>
                        </div>

                        {/* More Information */}
                        <div className="bg-[#F6F6F6] divide-y-2 divide-dashed divide-gray-200 py-3 shadow-md mb-4">
                            <div className="font-semibold px-5 pb-1">
                                More Information
                            </div>
                            <div className="text-gray-700 px-5 pt-4 inline-flex flex-col space-y-2">
                                <div className="cursor-pointer">
                                    About Parliament
                                </div>

                                <div className="cursor-pointer">Elections</div>

                                <div className="cursor-pointer">
                                    Data on Women
                                </div>

                                <div className="cursor-pointer">
                                    Data on Men
                                </div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="bg-[#F6F6F6] divide-y-2 divide-dashed divide-gray-200 py-3 shadow-md">
                            <div className="font-semibold px-5 pb-1">
                                Contact Information
                            </div>
                            <div className="text-gray-700 px-5 pt-4 inline-flex flex-col space-y-2">
                                <div>National Assembly</div>
                                <div>P.M.B 141</div>
                                <div>Abuja</div>
                                <div>Nigeria</div>
                                <div className="flex flex-row pt-3">
                                    <div className="mr-1">Email:</div>
                                    <a
                                        href="mailto:info@nass.gov.ng"
                                        className="text-blue-500 hover:text-blue-300"
                                    >
                                        info@nass.gov.ng
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Select Chamber */}
                    <div className="flex flex-row lg:hidden">
                        <select
                            className="border-[3px] w-full mb-2 px-2 py-2 border-gray-400 text-gray-700"
                            onChange={(e) => handleChamberChange(e)}
                        >
                            <option value="select">Select Chamber</option>
                            <option value="rep">
                                House of Representatives
                            </option>
                            <option value="senator">House of Senate</option>
                        </select>
                    </div>

                    {/* Search */}
                    <div className="flex flex-col lg:w-[61rem] space-y-2 lg:space-y-4">
                        <div className="font-semibold">Search</div>
                        <div>
                            <span className="font-semibold">
                                {!loading ? legislatorList.length : "--"}
                            </span>{" "}
                            results
                        </div>

                        {/* Searchbox */}
                        <Searchbar
                            clearSearch={clearSearch}
                            searchValue={searchValue}
                            onChange={onSearchChange}
                            placeholder={
                                "Search by Name, District, Status, Gender"
                            }
                        />

                        {/* Legislators Table */}
                        <>
                            {/* Desktop Table */}
                            <div className="hidden lg:table-fixed lg:table w-full border-[1px]">
                                {/* First Table Row */}
                                <div className="table-header-group bg-kyl-green text-white mx-2">
                                    <div className="table-cell py-2 pl-4 w-1/6">
                                        Name
                                    </div>
                                    <div className="table-cell w-1/6">
                                        District
                                    </div>
                                    <div className="table-cell w-1/6">
                                        State
                                    </div>
                                    <div className="table-cell w-1/12">Age</div>
                                    <div className="table-cell w-1/12">
                                        Party
                                    </div>
                                    <div className="table-cell">Status</div>
                                    <div className="table-cell">Gender</div>
                                    <div className="table-cell">Details</div>
                                </div>

                                {/* Legistor Data */}
                                <div className="table-row-group text-sm text-gray-700">
                                    {!loading ? (
                                        legislatorList
                                            .sort(dynamicSort("state"))
                                            .map(
                                                (
                                                    legislator: Legislator,
                                                    index
                                                ) =>
                                                    /*
                                                1st ternary evaluates the name and searchtext else moves on
                                                2nd ternary checks the seachtext and where they represent then move on to next ternary
                                                3rd ternary checks the state
                                                4th ternary checks the age
                                                5th ternary checks the party
                                                6th ternary checks the gender
                                                7th ternary checks if the searchtext matches the office held
        
                                            */
                                                    searchValue === "" ? (
                                                        <LegislatorTableRow
                                                            legislator={
                                                                legislator
                                                            }
                                                            index={index}
                                                            key={`${legislator.id}${legislator.name}`}
                                                        />
                                                    ) : // ternary evaluates the name and searchtext else moves on
                                                    legislator?.name
                                                          ?.toLowerCase()
                                                          .includes(
                                                              searchValue.toLowerCase()
                                                          ) ? (
                                                        <LegislatorTableRow
                                                            legislator={
                                                                legislator
                                                            }
                                                            index={index}
                                                            key={`${legislator.id}${legislator.name}`}
                                                        />
                                                    ) : // checks the seachtext and where they represent
                                                    legislator?.district
                                                          ?.toLowerCase()
                                                          .includes(
                                                              searchValue.toLowerCase()
                                                          ) ? (
                                                        <LegislatorTableRow
                                                            legislator={
                                                                legislator
                                                            }
                                                            index={index}
                                                            key={`${legislator.id}${legislator.name}`}
                                                        />
                                                    ) : // ternary checks the state
                                                    legislator?.state
                                                          ?.toLowerCase()
                                                          .includes(
                                                              searchValue.toLowerCase()
                                                          ) ? (
                                                        <LegislatorTableRow
                                                            legislator={
                                                                legislator
                                                            }
                                                            index={index}
                                                            key={`${legislator.id}${legislator.name}`}
                                                        />
                                                    ) : // ternary checks the age
                                                    legislator?.age
                                                          ?.toString()
                                                          .includes(
                                                              searchValue.toLowerCase()
                                                          ) ? (
                                                        <LegislatorTableRow
                                                            legislator={
                                                                legislator
                                                            }
                                                            index={index}
                                                            key={`${legislator.id}${legislator.name}`}
                                                        />
                                                    ) : // ternary checks the party
                                                    legislator?.party
                                                          ?.toLowerCase()
                                                          .includes(
                                                              searchValue.toLowerCase()
                                                          ) ? (
                                                        <LegislatorTableRow
                                                            legislator={
                                                                legislator
                                                            }
                                                            index={index}
                                                            key={`${legislator.id}${legislator.name}`}
                                                        />
                                                    ) : // ternary checks the gender
                                                    legislator?.gender
                                                          ?.toLowerCase()
                                                          .includes(
                                                              searchValue.toLowerCase()
                                                          ) ? (
                                                        <LegislatorTableRow
                                                            legislator={
                                                                legislator
                                                            }
                                                            index={index}
                                                            key={`${legislator.id}${legislator.name}`}
                                                        />
                                                    ) : // ternary checks the office
                                                    legislator?.status
                                                          ?.toLowerCase()
                                                          .includes(
                                                              searchValue.toLowerCase()
                                                          ) ? (
                                                        <LegislatorTableRow
                                                            legislator={
                                                                legislator
                                                            }
                                                            index={index}
                                                            key={`${legislator.id}${legislator.name}`}
                                                        />
                                                    ) : (
                                                        <></>
                                                    )
                                            )
                                    ) : (
                                        <div className="py-2 pl-4">
                                            Loading...
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Mobile Table */}
                            <div className="table lg:hidden">
                                <div className="table-header-group bg-kyl-green text-white mx-2">
                                    <div className="table-cell py-4 pl-4">
                                        Name
                                    </div>
                                </div>

                                {/* Legistor Data */}
                                <div className="table-row-group text-sm text-gray-700">
                                    {!loading ? (
                                        legislatorList
                                            .sort(dynamicSort("state"))
                                            .map(
                                                (
                                                    legislator: Legislator,
                                                    index
                                                ) =>
                                                    /*
                                                1st ternary evaluates the name and searchtext else moves on
                                                2nd ternary checks the seachtext and where they represent then move on to next ternary
                                                3rd ternary checks the state
                                                4th ternary checks the age
                                                5th ternary checks the party
                                                6th ternary checks the gender
                                                7th ternary checks if the searchtext matches the office held
        
                                            */
                                                    searchValue === "" ? (
                                                        <LegislatorTableRow
                                                            legislator={
                                                                legislator
                                                            }
                                                            index={index}
                                                            key={`${legislator.id}${legislator.name}`}
                                                        />
                                                    ) : // ternary evaluates the name and searchtext else moves on
                                                    legislator?.name
                                                          ?.toLowerCase()
                                                          .includes(
                                                              searchValue.toLowerCase()
                                                          ) ? (
                                                        <LegislatorTableRow
                                                            legislator={
                                                                legislator
                                                            }
                                                            index={index}
                                                            key={`${legislator.id}${legislator.name}`}
                                                        />
                                                    ) : // checks the seachtext and where they represent
                                                    legislator?.district
                                                          ?.toLowerCase()
                                                          .includes(
                                                              searchValue.toLowerCase()
                                                          ) ? (
                                                        <LegislatorTableRow
                                                            legislator={
                                                                legislator
                                                            }
                                                            index={index}
                                                            key={`${legislator.id}${legislator.name}`}
                                                        />
                                                    ) : // ternary checks the state
                                                    legislator?.state
                                                          ?.toLowerCase()
                                                          .includes(
                                                              searchValue.toLowerCase()
                                                          ) ? (
                                                        <LegislatorTableRow
                                                            legislator={
                                                                legislator
                                                            }
                                                            index={index}
                                                            key={`${legislator.id}${legislator.name}`}
                                                        />
                                                    ) : // ternary checks the age
                                                    legislator?.age
                                                          ?.toString()
                                                          .includes(
                                                              searchValue.toLowerCase()
                                                          ) ? (
                                                        <LegislatorTableRow
                                                            legislator={
                                                                legislator
                                                            }
                                                            index={index}
                                                            key={`${legislator.id}${legislator.name}`}
                                                        />
                                                    ) : // ternary checks the party
                                                    legislator?.party
                                                          ?.toLowerCase()
                                                          .includes(
                                                              searchValue.toLowerCase()
                                                          ) ? (
                                                        <LegislatorTableRow
                                                            legislator={
                                                                legislator
                                                            }
                                                            index={index}
                                                            key={`${legislator.id}${legislator.name}`}
                                                        />
                                                    ) : // ternary checks the gender
                                                    legislator?.gender
                                                          ?.toLowerCase()
                                                          .includes(
                                                              searchValue.toLowerCase()
                                                          ) ? (
                                                        <LegislatorTableRow
                                                            legislator={
                                                                legislator
                                                            }
                                                            index={index}
                                                            key={`${legislator.id}${legislator.name}`}
                                                        />
                                                    ) : // ternary checks the office
                                                    legislator?.status
                                                          ?.toLowerCase()
                                                          .includes(
                                                              searchValue.toLowerCase()
                                                          ) ? (
                                                        <LegislatorTableRow
                                                            legislator={
                                                                legislator
                                                            }
                                                            index={index}
                                                            key={`${legislator.id}${legislator.name}`}
                                                        />
                                                    ) : (
                                                        <></>
                                                    )
                                            )
                                    ) : (
                                        <div className="py-2 pl-4">
                                            Loading...
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default LegislatorsPage
