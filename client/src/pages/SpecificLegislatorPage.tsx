import { gql, useQuery } from "@apollo/client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react"
import { Redirect, useLocation, useParams } from "react-router-dom"
import Footer from "../components/Footer"
import NavBar from "../components/NavBar/NavBar"
import { Legislator } from "./LegislatorsPage"
import ReactPlaceholder from "react-placeholder/lib"

const SpecificLegislatorPage = () => {
    // @ts-ignore
    const { id } = useParams()
    let legislatorData: Legislator | undefined
    const location = useLocation().pathname.split("/")[2]
    const GET_LEGISLATOR =
        location === "senators"
            ? gql`
                  query GetSenator($id: Int!) {
                      senators_by_pk(id: $id) {
                          name
                          state
                          district
                          age
                          gender
                          party
                          status
                      }
                  }
              `
            : location === "representatives"
            ? gql`
                  query GetRepresentative($id: Int!) {
                      representatives_by_pk(id: $id) {
                          name
                          state
                          district
                          age
                          gender
                          party
                          status
                      }
                  }
              `
            : location === "shoa"
            ? gql`
                  query GetRepresentative($id: Int!) {
                      shoa_by_pk(id: $id) {
                          name
                          state
                          district
                          age
                          gender
                          party
                      }
                  }
              `
            : gql``

    const { loading, data } = useQuery(GET_LEGISLATOR, { variables: { id } })

    if (!loading) {
        legislatorData =
            location === "senators"
                ? data.senators_by_pk
                : location === "representatives"
                ? data.representatives_by_pk
                : data.shoa_by_pk
    }

    const [searchValue, setSearchValue] = useState("")

    const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    }

    const clearSearch = () => {
        setSearchValue("")
    }

    const loaderStyle = {
        width: "14rem",
        paddingLeft: "0.7rem",
    }

    if (isNaN(parseInt(id))) return <Redirect to="/legislators" />

    return (
        <>
            <NavBar />

            <div className="flex flex-col mt-10">
                <div className="flex justify-center">
                    <div className="flex flex-row space-x-16 shadow-md p-6 w-[80%] justify-center items-center">
                        {/* Image */}
                        <div>
                            <FontAwesomeIcon
                                icon={["fas", "user-secret"]}
                                className="text-[1000%]"
                            />
                        </div>

                        {/* Data */}
                        <div className="flex flex-col space-y-3">
                            <div className="text-xl font-semibold flex items-center">
                                <>
                                    Name:{" "}
                                    {loading ? (
                                        // <PlaceholderLoading />
                                        <ReactPlaceholder
                                            ready={!loading}
                                            type={"text"}
                                            rows={1}
                                            color="#e8e9eb"
                                            style={loaderStyle}
                                        >
                                            <></>
                                        </ReactPlaceholder>
                                    ) : (
                                        <span className="capitalize font-normal pl-1">
                                            {legislatorData &&
                                                legislatorData.name.toLowerCase()}
                                        </span>
                                    )}
                                </>
                            </div>

                            {!(location === "shoa") && (
                                <div className="text-lg font-semibold flex items-center">
                                    <>
                                        Status:{" "}
                                        {loading ? (
                                            // <PlaceholderLoading />
                                            <ReactPlaceholder
                                                ready={!loading}
                                                type={"text"}
                                                rows={1}
                                                color="#e8e9eb"
                                                style={loaderStyle}
                                            >
                                                <></>
                                            </ReactPlaceholder>
                                        ) : (
                                            <span className="capitalize font-normal pl-1">
                                                {legislatorData &&
                                                    legislatorData.status.toLowerCase()}
                                            </span>
                                        )}
                                    </>
                                </div>
                            )}

                            <div className="text-lg font-semibold flex items-center">
                                <>
                                    State:{" "}
                                    {loading ? (
                                        // <PlaceholderLoading />
                                        <ReactPlaceholder
                                            ready={!loading}
                                            type={"text"}
                                            rows={1}
                                            color="#e8e9eb"
                                            style={loaderStyle}
                                        >
                                            <></>
                                        </ReactPlaceholder>
                                    ) : (
                                        <span className="capitalize font-normal pl-1">
                                            {legislatorData &&
                                                legislatorData.state.toLowerCase()}
                                        </span>
                                    )}
                                </>
                            </div>

                            <div className="text-lg font-semibold flex items-center">
                                <>
                                    District:{" "}
                                    {loading ? (
                                        // <PlaceholderLoading />
                                        <ReactPlaceholder
                                            ready={!loading}
                                            type={"text"}
                                            rows={1}
                                            color="#e8e9eb"
                                            style={loaderStyle}
                                        >
                                            <></>
                                        </ReactPlaceholder>
                                    ) : (
                                        <span className="capitalize font-normal pl-1">
                                            {legislatorData &&
                                                legislatorData.district.toLowerCase()}
                                        </span>
                                    )}
                                </>
                            </div>

                            <div className="text-lg font-semibold flex items-center">
                                <>
                                    Age:{" "}
                                    {loading ? (
                                        // <PlaceholderLoading />
                                        <ReactPlaceholder
                                            ready={!loading}
                                            type={"text"}
                                            rows={1}
                                            color="#e8e9eb"
                                            style={loaderStyle}
                                        >
                                            <></>
                                        </ReactPlaceholder>
                                    ) : (
                                        <span className="capitalize font-normal pl-1">
                                            {legislatorData &&
                                                legislatorData.age}
                                        </span>
                                    )}
                                    <div className="text-xs ml-1">
                                        *at the time of election
                                    </div>
                                </>
                            </div>

                            <div className="text-lg font-semibold flex items-center">
                                <>
                                    Gender:{" "}
                                    {loading ? (
                                        // <PlaceholderLoading />
                                        <ReactPlaceholder
                                            ready={!loading}
                                            type={"text"}
                                            rows={1}
                                            color="#e8e9eb"
                                            style={loaderStyle}
                                        >
                                            <></>
                                        </ReactPlaceholder>
                                    ) : (
                                        <span className="capitalize font-normal pl-1">
                                            {legislatorData &&
                                                legislatorData.gender.toLowerCase()}
                                        </span>
                                    )}
                                </>
                            </div>

                            <div className="text-lg font-semibold flex items-center">
                                <>
                                    Political Party:{" "}
                                    {loading ? (
                                        // <PlaceholderLoading />
                                        <ReactPlaceholder
                                            ready={!loading}
                                            type={"text"}
                                            rows={1}
                                            color="#e8e9eb"
                                            style={loaderStyle}
                                        >
                                            <></>
                                        </ReactPlaceholder>
                                    ) : (
                                        <span className="capitalize font-normal pl-1">
                                            {legislatorData &&
                                                legislatorData.party}
                                        </span>
                                    )}
                                </>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bills */}
                <div className="flex flex-col mt-6 justify-start space-y-3">
                    <div className="flex ml-[9.5rem]">
                        <div>Bills Sponsored/Co-Sponsored</div>
                    </div>

                    <div className="flex flex-col items-center w-full space-y-4">
                        <div className="flex flex-row items-center justify-between border-[3px] px-4 py-2 border-gray-400 text-gray-400 w-[80%]">
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

                        <div className="flex flex-col items-center">
                            <div className="table-fixed table w-[80%] border-[1px]">
                                {/* First Table Row */}
                                <div className="table-header-group bg-kyl-green text-white mx-2">
                                    <div className="table-cell py-2 pl-4">
                                        Bill ID
                                    </div>
                                    <div className="table-cell w-1/4">
                                        Bill Name
                                    </div>
                                    <div className="table-cell">
                                        1st Reading
                                    </div>
                                    <div className="table-cell">
                                        2nd Reading
                                    </div>
                                    <div className="table-cell">
                                        3rd Reading
                                    </div>
                                    <div className="table-cell w-1/12">
                                        Status
                                    </div>
                                    <div className="table-cell w-1/12">
                                        Download
                                    </div>
                                </div>

                                {/* Legistor Data */}
                                <div className="table-row-group text-sm text-gray-700"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default SpecificLegislatorPage
