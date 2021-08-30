import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

type Props = {
    placeholder?: string
    searchValue: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    clearSearch: () => void
}

const Searchbar = ({
    placeholder,
    searchValue,
    onChange,
    clearSearch,
}: Props) => {
    return (
        <div className="flex flex-row items-center justify-between border-[3px] px-4 py-2 border-gray-400 text-gray-400">
            {/* Input */}
            <input
                placeholder={placeholder}
                value={searchValue}
                className="outline-none w-full placeholder-gray-400 text-gray-700"
                onChange={onChange}
            />

            {/* Clear text icon */}
            {searchValue !== "" && (
                <FontAwesomeIcon
                    icon={["fas", "times-circle"]}
                    onClick={clearSearch}
                    className="cursor-pointer hover:text-gray-700"
                />
            )}

            {/* Search Icon */}
            <FontAwesomeIcon icon={["fas", "search"]} className="ml-3" />
        </div>
    )
}

export default Searchbar
