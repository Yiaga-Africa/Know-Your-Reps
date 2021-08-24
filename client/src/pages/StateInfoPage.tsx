import { gql, useQuery } from "@apollo/client"
import React, { useState } from "react"
import { Redirect, useParams, withRouter } from "react-router-dom"
import Footer from "../components/Footer"
import NavBar from "../components/NavBar/NavBar"
import stateLogo from "../assets/images/statePicImage.png"
import StatesDropdown from "../components/Legislators/StatesDropdown"
import LegislatorTableRow from "../components/Legislators/LegislatorTableRow"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Legislator } from "./LegislatorsPage"
import { MapData } from "../utils/mapData"
import StateLegislatorTableRow from "../components/Legislators/StateLegislatorTableRow"

type StateData = {
    id: number
    state: string
    capital: string
    slogan: string
    geopolitical_zone: string
    land_mass: number
    population: number
    registered_voters: number
    polling_units: number
    voting_points: number
}

function dynamicSort(property: string) {
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

const StateInfoPage = () => {
    // @ts-ignore
    let { stateId } = useParams()
    if (isNaN(parseInt(stateId))) return <Redirect to="/" />

    let stateName = `%${MapData[stateId - 1].name}%`
    const [searchValue, setSearchValue] = useState("")

    let stateData: StateData | undefined

    let legislatorList: Legislator[] = []

    const GET_STATE_DATA = gql`
        query StateData($stateId: Int!, $stateName: String!) {
            state_data_by_pk(id: $stateId) {
                id
                state
                capital
                slogan
                geopolitical_zone
                land_mass
                population
                registered_voters
                polling_units
                voting_points
            }

            senators(where: { state: { _ilike: $stateName } }) {
                id
                name
                district
                gender
                status
                party
            }

            representatives(where: { state: { _ilike: $stateName } }) {
                id
                name
                district
                gender
                status
                party
            }
        }
    `

    const { loading, error, data } = useQuery(GET_STATE_DATA, {
        variables: { stateId, stateName },
    })

    const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    }

    const clearSearch = () => {
        setSearchValue("")
    }

    if (!loading) {
        stateData = data.state_data_by_pk
        const senatorsList: Legislator[] = data.senators
        const representativesList: Legislator[] = data.representatives
        legislatorList = senatorsList.concat(representativesList)
    }

    return (
        <>
            <NavBar />
            <div className="flex flex-col items-center mt-10">
                <div className="shadow-md mx-32 flex flex-row p-4 w-[76%]">
                    {/* Image */}
                    <div className="mr-12">
                        <img className="h-32" src={stateLogo} />
                    </div>

                    {/* Data */}
                    <div className="grid grid-cols-4 gap-y-8 gap-x-14 w-full">
                        {/* First Row */}

                        <div className="flex flex-col">
                            <div className="text-2xl font-semibold">
                                {!loading && stateData?.state}
                            </div>
                            <div className="text-sm font-light">
                                {!loading && stateData?.slogan}
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <div className="text-xl font-semibold">
                                Capital:
                            </div>
                            <div className="font-light text-sm">
                                {!loading && stateData?.capital}
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <div>Geo-Political Zone:</div>
                            <div className="font-light text-sm">
                                {!loading && stateData?.geopolitical_zone}
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <div>Land Mass:</div>
                            <div className="font-light text-sm">
                                {!loading &&
                                    stateData?.land_mass.toLocaleString()}
                                km
                                <sup>2</sup>
                            </div>
                        </div>

                        {/* Second Row */}
                        <div className="flex flex-col text-[#126A12]">
                            <div>Population:</div>
                            <div className="font-light text-sm">
                                {!loading &&
                                    stateData?.population.toLocaleString()}
                            </div>
                        </div>

                        <div className="flex flex-col text-[#D95200]">
                            <div>Registered Voters:</div>
                            <div className="font-light text-sm">
                                {!loading &&
                                    stateData?.registered_voters.toLocaleString()}
                            </div>
                        </div>

                        <div className="flex flex-col text-[#009CB8]">
                            <div>Polling Units:</div>
                            <div className="font-light text-sm">
                                {!loading &&
                                    stateData?.polling_units.toLocaleString()}
                            </div>
                        </div>

                        <div className="flex flex-col text-[#8C3600]">
                            <div>Voting Points:</div>
                            <div className="font-light text-sm">
                                {!loading &&
                                    stateData?.voting_points.toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row mt-4 space-x-6">
                    <StatesDropdown currentState={stateId} />

                    {/* Search */}
                    <div className="flex flex-col w-[61rem] space-y-4">
                        {/* Searchbox */}
                        <div className="flex flex-row items-center justify-between border-[3px] px-4 py-2 border-gray-400 text-gray-400">
                            {/* Input */}
                            <input
                                placeholder={
                                    "Search by Name, District, Status, Gender"
                                }
                                value={searchValue}
                                className="outline-none w-full placeholder-gray-400 text-gray-700"
                                onChange={onSearchChange}
                            />

                            {/* Clear text icon */}
                            {searchValue !== "" && (
                                <FontAwesomeIcon
                                    icon={["fas", "times-circle"]}
                                    onClick={clearSearch}
                                    className="cursor-pointer hover:text-gray-700"
                                />
                            )}

                            {/* Search Icon */}
                            <FontAwesomeIcon
                                icon={["fas", "search"]}
                                className="ml-3"
                            />
                        </div>

                        {/* Legislators Table */}
                        <div className="table-fixed table w-full border-[1px]">
                            {/* First Table Row */}
                            <div className="table-header-group bg-kyl-green text-white mx-2">
                                <div className="table-cell py-2 pl-4 w-[20%]">
                                    Name
                                </div>
                                <div className="table-cell w-[25%]">
                                    District
                                </div>
                                <div className="table-cell">Party</div>
                                <div className="table-cell w-[20%]">Status</div>
                                <div className="table-cell w-[10%]">Gender</div>
                                <div className="table-cell w-[12%]">
                                    Details
                                </div>
                            </div>

                            {/* Legistor Data */}
                            <div className="table-row-group text-sm text-gray-700">
                                {!loading ? (
                                    legislatorList
                                        .sort(dynamicSort("state"))
                                        .map((legislator: Legislator) =>
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
                                                <StateLegislatorTableRow
                                                    legislator={legislator}
                                                    index={legislator.id}
                                                    key={`${legislator.id}${legislator.name}`}
                                                />
                                            ) : // ternary evaluates the name and searchtext else moves on
                                            legislator?.name
                                                  ?.toLowerCase()
                                                  .includes(
                                                      searchValue.toLowerCase()
                                                  ) ? (
                                                <StateLegislatorTableRow
                                                    legislator={legislator}
                                                    index={legislator.id}
                                                    key={`${legislator.id}${legislator.name}`}
                                                />
                                            ) : // checks the seachtext and where they represent
                                            legislator?.district
                                                  ?.toLowerCase()
                                                  .includes(
                                                      searchValue.toLowerCase()
                                                  ) ? (
                                                <StateLegislatorTableRow
                                                    legislator={legislator}
                                                    index={legislator.id}
                                                    key={`${legislator.id}${legislator.name}`}
                                                />
                                            ) : // ternary checks the gender
                                            legislator?.gender
                                                  ?.toLowerCase()
                                                  .includes(
                                                      searchValue.toLowerCase()
                                                  ) ? (
                                                <StateLegislatorTableRow
                                                    legislator={legislator}
                                                    index={legislator.id}
                                                    key={`${legislator.id}${legislator.name}`}
                                                />
                                            ) : // ternary checks the office
                                            legislator?.status
                                                  ?.toLowerCase()
                                                  .includes(
                                                      searchValue.toLowerCase()
                                                  ) ? (
                                                <StateLegislatorTableRow
                                                    legislator={legislator}
                                                    index={legislator.id}
                                                    key={`${legislator.id}${legislator.name}`}
                                                />
                                            ) : (
                                                <></>
                                            )
                                        )
                                ) : (
                                    <div className="py-2 pl-4">Loading...</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default withRouter(StateInfoPage)
