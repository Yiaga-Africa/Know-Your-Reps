import { Tab } from "@headlessui/react"
import React from "react"
import { Helmet } from "react-helmet"
import AdminNavBar from "../../components/Admin/AdminNavBar"
import Footer from "../../components/Footer"
import LegislatorsTab from "./LegislatorsTab"
import SHOATab from "./SHOATab"

const AdminPage = () => {
    const setSelection = ({ selected }: any) =>
        selected ? "text-kyl-green" : ""

    return (
        <>
            <Helmet title={"Admin | Know Your Legislators"} />

            <AdminNavBar />
            <div className="flex justify-center mt-6">
                {/* Sidebar */}
                <div className="flex flex-row">
                    <Tab.Group vertical manual>
                        <Tab.List className="flex flex-col space-y-2 shadow-md items-start p-5 bg-[#F6F6F6] h-56">
                            <Tab className={setSelection}>Legislators</Tab>
                            <Tab className={setSelection}>SHOA Members</Tab>
                            <Tab className={setSelection}>Bills</Tab>
                            <Tab className={setSelection}>Resources</Tab>
                            <Tab className={setSelection}>Election Data</Tab>
                            <Tab className={setSelection}>State Data</Tab>
                        </Tab.List>

                        <Tab.Panels className="ml-10 w-[56rem]">
                            <Tab.Panel>
                                <LegislatorsTab />
                            </Tab.Panel>
                            <Tab.Panel>
                                <SHOATab />
                            </Tab.Panel>
                            <Tab.Panel>{/* Bills */}</Tab.Panel>
                            <Tab.Panel>{/* Resources */}</Tab.Panel>
                            <Tab.Panel>{/* Election Data */}</Tab.Panel>
                            <Tab.Panel>{/* State Data */}</Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default AdminPage
