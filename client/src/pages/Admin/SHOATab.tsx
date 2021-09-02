import { gql, useQuery } from "@apollo/client"
import React, { useState } from "react"
import AdminSHOALegislatorTableRow from "../../components/Admin/SHOA/AdminSHOALegislatorTableRow"
import Searchbar from "../../components/Searchbar"
import { dynamicSort, Legislator } from "../LegislatorsPage"

const SHOATab = () => {
    const [searchValue, setSearchValue] = useState("")
    const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    }

    const clearSearch = () => {
        setSearchValue("")
    }

    let legislatorList: Legislator[] = []

    const GET_DATA = gql`
        query GetSHOA {
            shoa {
                id
                state
                geopolitical_zone
                district
                name
                party
                age
                gender
            }
        }
    `

    const { data, loading, error } = useQuery(GET_DATA)

    if (!loading) {
        legislatorList = data.shoa
        console.log(legislatorList)
    }

    return (
        <div className="w-full">
            <button className="px-4 py-2 bg-kyl-green hover:bg-[#086843] text-white">
                Add New
            </button>

            <div className="mt-4">
                <Searchbar
                    placeholder="Search by Name, State"
                    clearSearch={clearSearch}
                    onChange={onSearchChange}
                    searchValue={searchValue}
                />
            </div>

            <div className="table-auto table w-full border-[1px] mt-4">
                {/* First Table Row */}
                <div className="table-header-group bg-kyl-green text-white mx-2">
                    <div className="table-cell py-2 pl-4 w-1/4">Name</div>
                    <div className="table-cell w-1/6">District</div>
                    <div className="table-cell w-1/6">Office</div>
                    <div className="table-cell">Age</div>
                    <div className="table-cell">Party</div>
                    <div className="table-cell">Gender</div>
                    <div className="table-cell w-1/12">Details</div>
                </div>

                {/* Data rows */}
                <div className="table-row-group text-sm text-gray-700">
                    {!loading ? (
                        legislatorList.map((legislator, index) => (
                            <AdminSHOALegislatorTableRow
                                legislator={legislator}
                                index={index}
                                key={`${legislator.id}${legislator.name}`}
                            />
                        ))
                    ) : (
                        <div className="py-2 pl-4">Loading...</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SHOATab
