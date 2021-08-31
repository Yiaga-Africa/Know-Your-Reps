import { Tab } from "@headlessui/react"
import React from "react"
import Footer from "../../components/Footer"
import NavBar from "../../components/NavBar/NavBar"
import FemaleLegislatorsAnalysis from "./FemaleLegislatorsAnalysis"
import HORMemberAnalysis from "./HORMemberAnalysis"

const AnalysisPage = () => {
    const setSelection = ({ selected }: any) =>
        selected ? "border-b-2  border-kyl-green" : ""

    return (
        <>
            <NavBar />
            <div className="flex justify-center mt-6">
                {/* Sidebar */}
                <div className="flex flex-row">
                    <Tab.Group vertical manual>
                        {/* Legislative Data */}
                        <Tab.List className="flex flex-col space-y-4">
                            <div className="bg-[#F6F6F6] py-4 px-2 divide-y-2 divide-dashed divide-gray-200 shadow-md w-full">
                                <div className="font-semibold mb-1">
                                    Legislative Data
                                </div>
                                <ul className="flex flex-col items-start pt-2 space-y-1">
                                    <Tab className={setSelection}>
                                        HOR Member Analysis
                                    </Tab>
                                    <Tab className={setSelection}>
                                        Female Representation
                                    </Tab>
                                    <Tab className={setSelection}>
                                        Youth Representation
                                    </Tab>
                                    <Tab className={setSelection}>
                                        Political Party Representation
                                    </Tab>
                                    <Tab className={setSelection}>
                                        Bill Analysis
                                    </Tab>
                                </ul>
                            </div>

                            <div className="bg-[#F6F6F6] py-4 px-2 divide-y-2 divide-dashed divide-gray-200 shadow-md w-full">
                                <div className="font-semibold mb-1">
                                    Election Data
                                </div>
                                <ul className="flex flex-col items-start pt-2 space-y-1">
                                    <Tab className={setSelection}>
                                        Registered Voters by Region
                                    </Tab>
                                    <Tab className={setSelection}>
                                        Registered Voters by State
                                    </Tab>
                                    <Tab className={setSelection}>
                                        Polling Unit Analysis
                                    </Tab>
                                    <Tab className={setSelection}>
                                        Election Results
                                    </Tab>
                                </ul>
                            </div>
                        </Tab.List>
                        <Tab.Panels className="ml-10">
                            <div>
                                <Tab.Panel>
                                    <HORMemberAnalysis />
                                </Tab.Panel>

                                <Tab.Panel>
                                    <FemaleLegislatorsAnalysis />
                                </Tab.Panel>

                                <Tab.Panel>
                                    {/*TODO: Youth Representation  */}
                                </Tab.Panel>

                                <Tab.Panel>
                                    {/*TODO: Political Party Representation  */}
                                </Tab.Panel>

                                <Tab.Panel>
                                    {/*TODO: Bill Analysis  */}
                                </Tab.Panel>
                            </div>

                            <div>
                                <Tab.Panel>
                                    {/*TODO: Registered Voters by Region  */}
                                </Tab.Panel>

                                <Tab.Panel>
                                    {/*TODO: Registered Voters by State  */}
                                </Tab.Panel>

                                <Tab.Panel>
                                    {/*TODO: Polling Unit Analysis  */}
                                </Tab.Panel>

                                <Tab.Panel>
                                    {/*TODO: Election Results  */}
                                </Tab.Panel>
                            </div>
                        </Tab.Panels>
                    </Tab.Group>

                    {/* Data */}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AnalysisPage
