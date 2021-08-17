import React from "react"
import { NavLink } from "react-router-dom"

type NavBarLink = {
    name: string
    route: string
}

const NavBarItem = ({ name, route }: NavBarLink) => {
    return (
        <>
            <NavLink
                to={route}
                isActive={(match) => !match?.isExact ? false : true}
                activeClassName="bg-kyl-green text-white px-4"
                className="p-2 hover:bg-cadmium hover:text-white"
            >
                {name}
            </NavLink>
        </>
    )
}

export default NavBarItem