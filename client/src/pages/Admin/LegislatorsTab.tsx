import { gql, useQuery } from "@apollo/client"
import React, { useState } from "react"
import AdminLegislatorTableRow from "../../components/Admin/Legislators/AdminLegislatorTableRow"
import Searchbar from "../../components/Searchbar"
import { dynamicSort, Legislator } from "../LegislatorsPage"

const LegislatorsTab = () => {
    const [searchValue, setSearchValue] = useState("")
    const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    }

    const clearSearch = () => {
        setSearchValue("")
    }

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

    if (!loading) {
        const senatorsList: Legislator[] = data.senators
        const representativesList: Legislator[] = data.representatives
        legislatorList = senatorsList.concat(representativesList)
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

            <div className="table-fixed table w-full border-[1px] mt-4">
                {/* First Table Row */}
                <div className="table-header-group bg-kyl-green text-white mx-2">
                    <div className="table-cell py-2 pl-4 w-1/4">Name</div>
                    <div className="table-cell w-[20%]">District</div>
                    <div className="table-cell w-1/6">Office</div>
                    <div className="table-cell">Age</div>
                    <div className="table-cell">Party</div>
                    <div className="table-cell">Gender</div>
                    <div className="table-cell">Details</div>
                </div>

                {/* Data rows */}
                <div className="table-row-group text-sm text-gray-700">
                    {!loading ? (
                        legislatorList.sort(dynamicSort('state')).map((legislator, index) => (
                            <AdminLegislatorTableRow
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

export default LegislatorsTab
