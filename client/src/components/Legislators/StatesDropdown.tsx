import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Listbox, Transition } from "@headlessui/react"
import React, { Fragment, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { MapData } from "../../utils/mapData"
import * as Routes from "../../utils/routes"

type Props = {
    currentState: number
}

const classNames = (...classes: any[]) => {
    return classes.filter(Boolean).join(" ")
}

const StatesDropdown = ({ currentState }: Props) => {
    const [selected, setSelected] = useState(currentState - 1)

    return (
        <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
                <>
                    <div className="mt-1 relative w-40">
                        <Listbox.Button className="relative w-full bg-white rounded-sm border border-gray-300 shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <span className="flex items-center">
                                <span className="ml-3 block truncate">
                                    {MapData[selected].name}
                                </span>
                            </span>
                            <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <FontAwesomeIcon
                                    icon={["fas", "caret-down"]}
                                    aria-hidden="true"
                                />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-sm py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                {MapData.map((state, index) => (
                                    <Link
                                        to={`${Routes.STATE_INFO}/${index + 1}`}
                                        key={state.id}
                                    >
                                        <Listbox.Option
                                            value={index}
                                            className={({ active }) =>
                                                classNames(
                                                    active
                                                        ? "text-white bg-indigo-600"
                                                        : "text-gray-900",
                                                    "cursor-default select-none relative py-2 pl-3 pr-9"
                                                )
                                            }
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <div className="flex items-center">
                                                        <span
                                                            className={classNames(
                                                                selected
                                                                    ? "font-semibold"
                                                                    : "font-normal",
                                                                "ml-3 block truncate"
                                                            )}
                                                        >
                                                            {state.name}
                                                        </span>
                                                    </div>

                                                    {selected ? (
                                                        <span
                                                            className={classNames(
                                                                active
                                                                    ? "text-white"
                                                                    : "text-indigo-600",
                                                                "absolute inset-y-0 right-0 flex items-center pr-4"
                                                            )}
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={[
                                                                    "fas",
                                                                    "check",
                                                                ]}
                                                            />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    </Link>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    )
}

export default StatesDropdown
