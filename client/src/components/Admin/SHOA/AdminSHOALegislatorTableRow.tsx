import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { ChangeEvent, useState } from "react"
import { Legislator } from "../../../pages/LegislatorsPage"

type Props = {
    legislator: Legislator
    index: number
}

const AdminSHOALegislatorTableRow = ({ legislator, index }: Props) => {
    const [isEditing, setIsEditing] = useState(false)

    const startEditing = () => setIsEditing(true)
    const endEditing = () => setIsEditing(false)

    const [name, setName] = useState(legislator.name)
    const [district, setDistrict] = useState(legislator.district)
    const [age, setAge] = useState(legislator.age)
    const [party, setParty] = useState(legislator.party)
    const [gender, setGender] = useState(legislator.gender)

    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const onDistrictChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDistrict(event.target.value)
    }

    const onGenderChange = (event: ChangeEvent<HTMLInputElement>) => {
        setGender(event.target.value)
    }

    const onAgeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAge(+event.target.value)
    }

    const onPartyChange = (event: ChangeEvent<HTMLInputElement>) => {
        setParty(event.target.value)
    }

    return (
        <div
            className={`table-row ${index % 2 !== 1 && "bg-gray-100"}`}
            key={index}
        >
            <div className="table-cell pl-4 py-8 pr-4 capitalize">
                {!isEditing ? (
                    name?.toLowerCase()
                ) : (
                    <input
                        className="p-1 ring-1 ring-black rounded-md"
                        value={name}
                        onChange={onNameChange}
                    />
                )}
            </div>
            <div className="table-cell py-8 break-words pr-2 capitalize">
                {!isEditing ? (
                    district?.toLowerCase()
                ) : (
                    <input
                        className="p-1 ring-1 ring-black rounded-md"
                        value={district}
                        onChange={onDistrictChange}
                    />
                )}
            </div>
            <div className="table-cell py-8">State House of Assembly</div>
            <div className="table-cell py-8">
                {!isEditing ? (
                    age
                ) : (
                    <input
                        className="p-1 ring-1 ring-black w-16 rounded-md"
                        value={age}
                        onChange={onAgeChange}
                    />
                )}
            </div>
            <div className="table-cell py-8">
                {!isEditing ? (
                    party
                ) : (
                    <input
                        className="p-1 ring-1 ring-black w-16 rounded-md"
                        value={party}
                        onChange={onPartyChange}
                    />
                )}
            </div>
            <div className="table-cell py-8 capitalize">
                {!isEditing ? (
                    gender?.toLowerCase()
                ) : (
                    <input
                        className="p-1 ring-1 ring-black w-16 rounded-md"
                        value={gender}
                        onChange={onGenderChange}
                    />
                )}
            </div>
            <div className="table-cell">
                <button
                    className="
                        rounded-xl
                        inline-block 
                        text-sm 
                        my-8
                    "
                    onClick={startEditing}
                >
                    <FontAwesomeIcon icon={["fas", "edit"]} size={"2x"} />
                </button>

                {isEditing && (
                    <button className="ml-2" onClick={endEditing}>
                        <FontAwesomeIcon icon={["fas", "check"]} size={"2x"} />
                    </button>
                )}
            </div>
        </div>
    )
}

export default AdminSHOALegislatorTableRow
