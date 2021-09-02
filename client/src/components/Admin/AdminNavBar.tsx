import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Link } from "react-router-dom"
import kylLogo from "../../assets/images/KYLLogoImage.svg"

const AdminNavBar = () => {
    return (
        <>
            <div className="flex items-center h-16 shadow-md px-48 justify-between sticky top-0 bg-white">
                <Link to="/">
                    <img src={kylLogo} />
                </Link>

                <div className="flex flex-wrap text-lg space-x-2">
                    {/* <div>
                        <FontAwesomeIcon
                            icon={["fas", "user-circle"]}
                            size={"lg"}
                            className="text-blue-900"
                        />
                    </div> */}

                    <div className="px-4 py-1 border border-gray-700 hover:bg-kyl-green hover:border-0 hover:text-white cursor-pointer rounded-md">
                        Salim
                    </div>

                    <button className="px-4 py-1 border border-gray-700 hover:bg-red-700 hover:text-white cursor-pointer rounded-md">
                        <FontAwesomeIcon icon={['fas', 'door-open']}/>
                    </button>
                </div>
            </div>
        </>
    )
}

export default AdminNavBar
