import React, { useState } from "react"
import Footer from "../components/Footer"
import NavBar from "../components/NavBar/NavBar"
import senateLogo from "../assets/images/SenateLogoImage.png"
import repsLogo from "../assets/images/HORLogoImage.png"
import pdf from "../assets/images/PDFImage.svg"
import StatisticCard from "../components/Bills/StatisticCard"
import Searchbar from "../components/Searchbar"
import BillsTableRow from "../components/Bills/BillsTableRow"

export type Bill = {
    id: number
    name: string
    firstReading: string
    secondReading: string
    thirdReading: string
    status: string
}

const BillsPage = () => {
    const billData = [
        { number: 109, image: senateLogo, description: "Senate Bills" },
        { number: 360, image: repsLogo, description: "House Bills" },
        { number: 360, image: pdf, description: "Bills Passed" },
    ]

    const sampleBills: Bill[] = [
        {
            id: 78,
            name: "National Food Bank of Nigeria (Est) Bill, 2021",
            firstReading: "14/07/2021",
            secondReading: "31/07/2021",
            thirdReading: "",
            status: "Passed",
        },
        {
            id: 731,
            name: "National Environmental Standards and Regulations Enforcement Agency (NESREA)",
            firstReading: "14/07/2021",
            secondReading: "31/07/2020",
            thirdReading: "",
            status: "Late",
        },
        {
            id: 465,
            name: "Administration of Criminal Justice Act (Amendment) Bill, 2020",
            firstReading: "01/07/2020",
            secondReading: "14/07/2020",
            thirdReading: "",
            status: "Rejected",
        },
    ]

    const [searchValue, setSearchValue] = useState("")
    const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    }
    const clearSearch = () => {
        setSearchValue("")
    }

    return (
        <>
            <NavBar />

            <div className="mt-10 flex flex-col items-center ">
                {/* Cards */}
                <div className="flex flex-row space-x-8">
                    {billData.map((element, index) => (
                        <StatisticCard
                            key={index}
                            index={index}
                            description={element.description}
                            number={element.number}
                            image={element.image}
                        />
                    ))}
                </div>

                {/* Search and table */}
                <div className="flex flex-col w-[75rem] mt-10 space-y-4">
                    <div className="font-semibold">Search</div>
                    <div className="flex">
                        <div className="font-semibold mr-1">1040897</div>
                        <> results</>
                    </div>

                    <Searchbar
                        placeholder="Search by Bill ID, Bill Name or Status"
                        clearSearch={clearSearch}
                        searchValue={searchValue}
                        onChange={onSearchChange}
                    />

                    {/* Bills Table */}
                    <div className="table-fixed table w-full border-[1px]">
                        {/* First Table Row */}
                        <div className="table-header-group bg-kyl-green text-white mx-2">
                            <div className="table-cell py-2 pl-4 w-1/12">
                                Bill ID
                            </div>
                            <div className="table-cell w-[45%]">Bill Name</div>
                            <div className="table-cell w-[15%]">
                                First Reading
                            </div>
                            <div className="table-cell w-[15%]">
                                Second Reading
                            </div>
                            <div className="table-cell w-[15%]">
                                Third Reading
                            </div>
                            <div className="table-cell w-[10%]">Status</div>
                            <div className="table-cell w-[10%]">Download</div>
                        </div>

                        {/* Bills Data */}
                        <div className="table-row-group text-sm text-gray-700">
                            {sampleBills.map((bill, index) => (
                                <BillsTableRow
                                    key={`bill${index}`}
                                    index={index}
                                    bill={bill}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default BillsPage
