import React from "react"
import { withRouter } from "react-router-dom"
import * as Routes from '../../utils/routes'
import NavBarItem from "./NavBarItem"

const NavBar = () => {
    type NavLink = {
        name: string
        route: string
    }

    const navLinks: NavLink[] = [
        { name: 'Dashboard', route: Routes.DASHBOARD },
        { name: 'Legislators', route: Routes.LEGISLATORS },
        { name: 'Bills', route: Routes.BILLS },
        { name: 'Analysis', route: Routes.ANALYSIS }
    ]

    // const matchPath = (pathname: string) => {
    //     return navLinks.some(link => {
    //         return link.route === pathname
    //     })
    // }

    return (
        <>
            <div className="flex items-center h-16 shadow-md flex-row-reverse px-48">
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