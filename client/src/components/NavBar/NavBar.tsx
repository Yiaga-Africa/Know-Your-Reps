import React, { useEffect, useState } from "react"
import { Link, withRouter } from "react-router-dom"
import * as Routes from "../../utils/routes"
import NavBarItem from "./NavBarItem"
import kylLogo from "../../assets/images/KYLLogoImage.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const NavBar = () => {
    type NavLink = {
        name: string
        route: string
    }

    const navLinks: NavLink[] = [
        { name: "Dashboard", route: Routes.DASHBOARD },
        { name: "Legislators", route: Routes.LEGISLATORS },
        { name: "Bills", route: Routes.BILLS },
        { name: "Analysis", route: Routes.ANALYSIS },
        { name: "Resources", route: Routes.RESOURCES },
    ]

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <>
            {/* Desktop View */}
            <div className="hidden lg:flex items-center h-16 shadow-md px-48 justify-between sticky top-0 bg-white">
                <Link to="/">
                    <img src={kylLogo} />
                </Link>

                <div className="flex space-x-6 flex-wrap text-sm">
                    {navLinks.map((navlink, index) => (
                        <NavBarItem
                            key={index}
                            name={navlink.name}
                            route={navlink.route}
                        />
                    ))}
                </div>
            </div>

            {/* Mobile View */}
            <div className="visible lg:hidden flex flex-row items-center shadow-md h-16 px-5 space-x-20">
                <FontAwesomeIcon
                    icon={["fas", "bars"]}
                    className="text-[1rem]"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                />

                <Link to="/">
                    <img src={kylLogo} className="h-4" />
                </Link>
            </div>

            {/* Mobile menu*/}
            <div
                style={{
                    visibility: `${mobileMenuOpen ? "visible" : "hidden"}`,
                }}
                className="w-full fixed overflow-hidden top-0 left-0 h-screen bg-white pt-6 flex flex-col space-y-10"
            >
                <div className="flex flex-row w-screen justify-end">
                    <FontAwesomeIcon
                        icon={["fas", "arrow-left"]}
                        className="mr-5"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    />
                </div>
                <div className="flex flex-col items-center justify-items-center">
                    {navLinks.map((navlink, index) => (
                        <NavBarItem
                            key={index}
                            name={navlink.name}
                            route={navlink.route}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default withRouter(NavBar)
