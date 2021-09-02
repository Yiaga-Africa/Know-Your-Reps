import React, { useEffect } from "react"
import { Link, withRouter } from "react-router-dom"
import * as Routes from '../../utils/routes'
import NavBarItem from "./NavBarItem"
import kylLogo from '../../assets/images/KYLLogoImage.svg'

const NavBar = () => {
    type NavLink = {
        name: string
        route: string
    }

    const navLinks: NavLink[] = [
        { name: 'Dashboard', route: Routes.DASHBOARD },
        { name: 'Legislators', route: Routes.LEGISLATORS },
        { name: 'Bills', route: Routes.BILLS },
        { name: 'Analysis', route: Routes.ANALYSIS },
        { name: 'Resources', route: Routes.RESOURCES }
    ]

    return (
        <>
            <div className="flex items-center h-16 shadow-md px-48 justify-between sticky top-0 bg-white">
                <Link to="/">
                    <img src={kylLogo} />
                </Link>

                <div className="flex space-x-6 flex-wrap text-sm">
                    {
                        navLinks.map((navlink, index) => (
                            <NavBarItem key={index} name={navlink.name} route={navlink.route} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default withRouter(NavBar)