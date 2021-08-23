import React, { useState } from "react"
import { Route, Switch } from "react-router-dom"
import * as Routes from "../utils/routes"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { far } from "@fortawesome/free-regular-svg-icons"

import DashboardPage from "../pages/DashboardPage"
import LegislatorsPage from "../pages/LegislatorsPage"
import StateInfoPage from "../pages/StateInfoPage"

const App = () => {
    // const [isClicked, setIsClicked] = useState(false)
    // const [serverBody, setServerBody] = useState('')

    // const callBackendAPI = async () => {
    //     setIsClicked(true)
    //     const res = await fetch('/api/express_backend')
    //     const body = await res.json()

    //     if (res.status !== 200) {
    //         throw Error(body.message)
    //     }
    //     setServerBody(body.express)
    // }

    // useEffect(() => {
    //     callBackendAPI()
    // })

    library.add(fab, fas, far)

    return (
        <Switch>
            <Route exact path={Routes.DASHBOARD} component={DashboardPage} />
            <Route
                exact
                path={Routes.LEGISLATORS}
                component={LegislatorsPage}
            />
            <Route
                path={`${Routes.STATE_INFO}/:stateId`}
                component={StateInfoPage}
            />
        </Switch>
    )
}

export default App
