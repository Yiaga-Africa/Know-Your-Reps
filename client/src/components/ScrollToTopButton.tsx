import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

const ScrollToTopButton = () => {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

    return (
        <div className="lg:hidden fixed bottom-6 right-3 rounded-full bg-kyl-green p-2 h-10 w-10 flex justify-center items-center">
            <FontAwesomeIcon
                icon={["fas", "arrow-up"]}
                className="text-2xl text-white"
                onClick={scrollToTop}
            />
        </div>
    )
}

export default ScrollToTopButton
