import React, { useState } from 'react'
import Footer from '../components/Footer'
import StatisticCard from '../components/Legislators/StatisticCard'
import NavBar from '../components/NavBar/NavBar'

// Images
import maleImage from '../assets/images/MaleImage.svg'
import femaleImage from '../assets/images/FemaleImage.svg'
import senateLogo from '../assets/images/SenateLogoImage.png'
import repsLogo from '../assets/images/HORLogoImage.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { LegislatorsSampleDataSet } from '../utils/legislatorsSampleData'
import LegislatorTableRow from '../components/Legislators/LegislatorTableRow'

const LegislatorsPage = () => {
    const data = [
        { number: 109, description: 'Senators', image: senateLogo },
        { number: 360, description: 'HOR Memebers', image: repsLogo },
        { number: 360, description: 'Male Voters', image: maleImage },
        { number: 804, description: 'Female Voters', image: femaleImage },
    ]

    const [searchValue, setSearchValue] = useState('')

    const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    }

    const onCategoryClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setSearchValue(event.currentTarget.innerText)
    }

    const clearSearch = () => {
        setSearchValue('')
    }

    return (
        <>
            <NavBar />

            <div className="mt-10 flex flex-col">
                <div className="flex justify-center flex-row space-x-3">
                    {data.map((element, index) => (
                        <StatisticCard
                            key={index}
                            number={element.number}
                            description={element.description}
                            image={element.image}
                        />
                    ))}
                </div>

                {/* Search and Category */}
                <div className="flex flex-row justify-center mt-10 space-x-6">
                    {/* Category */}
                    <div className="bg-[#F6F6F6] divide-y-2 divide-dashed divide-gray-200 py-3 shadow-md max-h-[8.3rem]">
                        <div className="font-semibold px-10 pb-1">Category</div>
                        <div className="text-gray-700 px-10 pt-4 inline-flex flex-col space-y-2">
                            <div className="cursor-pointer" onClick={onCategoryClick}>
                                Senate
                            </div>

                            <div className="cursor-pointer" onClick={onCategoryClick}>
                                House of Reps
                            </div>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="flex flex-col w-[61rem] space-y-5">
                        <div className="font-semibold">Search</div>
                        <div><span className="font-semibold">1040897</span> results</div>

                        {/* Searchbox */}
                        <div className="flex flex-row items-center justify-between border-[3px] px-4 py-2 border-gray-400 text-gray-400">
                            {/* Input */}
                            <input
                                placeholder={'Search by Name, State'}
                                value={searchValue}
                                className="outline-none w-full placeholder-gray-400 text-gray-700"
                                onChange={onSearchChange}
                            />

                            {/* Clear text icon */}
                            {
                                searchValue !== ''
                                && <FontAwesomeIcon
                                    icon={['fas', 'times-circle']}
                                    onClick={clearSearch}
                                    className="cursor-pointer hover:text-gray-700" />
                            }

                            {/* Search Icon */}
                            <FontAwesomeIcon icon={['fas', 'search']} className="ml-3" />
                        </div>

                        {/* Legislators Table */}
                        <div className="table-fixed table w-full border-[1px]">
                            {/* First Table Row */}
                            <div className="table-header-group bg-kyl-green text-white mx-2">
                                <div className="table-cell py-2 pl-4 w-1/4">Name</div>
                                <div className="table-cell w-1/3">Representing</div>
                                <div className="table-cell">Office</div>
                                <div className="table-cell">Gender</div>
                                <div className="table-cell">Details</div>
                            </div>

                            {/* Legistor Data */}
                            <div className="table-row-group text-sm text-gray-700">
                                {LegislatorsSampleDataSet.map((legislator, index) => (
                                    /*
                                      1st ternary evaluates the name and searchtext else moves on
                                      2nd ternary checks the seachtext and where they represent then move on to next ternary
                                      3rd ternary checks if the searchtext matches the office held, else returns a fragament

                                    */
                                    searchValue === ''
                                        ? <LegislatorTableRow legislator={legislator} index={index} />

                                        : legislator.name.toLowerCase().includes(searchValue.toLowerCase())
                                            ? <LegislatorTableRow legislator={legislator} index={index} />

                                            : legislator.representing.toLowerCase().includes(searchValue.toLowerCase())
                                                ? <LegislatorTableRow legislator={legislator} index={index} />

                                                : legislator.office.toLowerCase().includes(searchValue.toLowerCase())
                                                    ? <LegislatorTableRow legislator={legislator} index={index} />
                                                    : <></>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default LegislatorsPage
