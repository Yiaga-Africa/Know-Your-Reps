import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import DashboardPage from '../pages/DashboardPage'
import * as Routes from '../utils/routes'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import LegislatorsPage from '../pages/LegislatorsPage'

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
            <Route path={Routes.LEGISLATORS} component={LegislatorsPage}/>
        </Switch>
    );
}

export default App;
