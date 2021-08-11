import React, { useEffect, useState } from 'react'

const App = () => {
    const [isClicked, setIsClicked] = useState(false)
    const [serverBody, setServerBody] = useState('')

    const callBackendAPI = async () => {
        setIsClicked(true)
        const res = await fetch('/api/express_backend')
        const body = await res.json()

        if (res.status !== 200) {
            throw Error(body.message)
        }
        setServerBody(body.express)
    }

    // useEffect(() => {
    //     callBackendAPI()
    // })

    return (
        <>
            <div className="flex justify-center items-center min-h-screen">
                <div>{isClicked ? serverBody : ""}</div>

                {!isClicked ? <div className="cursor-pointer bg-gray-200 inline-block px-2 py-1 hover:bg-gray-400 rounded-md"
                    onClick={callBackendAPI}>
                    Click Me!!
                </div> : ''}
            </div>
        </>
    );
}

export default App;
