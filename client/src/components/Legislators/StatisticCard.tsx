import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { gql, useQuery } from "@apollo/client"
import React, { useState } from "react"
import { Link } from "react-router-dom"

type CardProps = {
    number?: number;
    description: string;
    image?: string;
  };
  
  const StatisticCard = ({ number, description, image }: CardProps) => {
    let maleCount = 0;
    let femaleCount = 0;
  
    const GET_AGGREGATE = gql`
      query GetAggregate {
        representatives_aggregate {
          aggregate {
            count
          }
        }
        senators_aggregate {
          aggregate {
            count
          }
        }
        shoa_aggregate {
          aggregate {
            count
          }
        }
  
        representatives {
          gender
        }
  
        senators {
          gender
        }
      }
    `;
  
    const { data, loading } = useQuery(GET_AGGREGATE);
    /* Get the number of male and female legislators
    null gender cases not handled
    */
    if (loading) {
        return <div>Loading...</div>; // You can replace this with a loading indicator
      }
    
      // Get the number of male and female legislators
      if (data) {
        data.representatives.forEach((i: any) => {
          if (i.gender === "Male") {
            maleCount += 1;
          } else if (i.gender === "Female") {
            femaleCount += 1;
          }
        });
    
        data.senators.forEach((i: any) => {
          if (i.gender === "Male") {
            maleCount += 1;
          } else if (i.gender === "Female") {
            femaleCount += 1;
          }
        });
      }
    
    /* if (!loading) {
        data.representatives.forEach((i: any) => {
            if (i.gender === "Male") {
                maleCount += 1
            } else if (i.gender === "Female") {
                femaleCount += 1
            }
        })

        data.senators.forEach((i: any) => {
            if (i.gender === "Male") {
                maleCount += 1
            } else if (i.gender === "Female") {
                femaleCount += 1
            }
        })
    }
 */
    return (
        <div className="divide-y-2 divide-dashed divide-gray-200 min-w-[65%] lg:min-w-0 lg:w-72 shadow-md hover:shadow-lg inline-flex flex-col">
            <div className="py-8 px-6 flex">
                {image ? (
                    <img
                        src={image}
                        style={{ height: "2.6rem" }}
                        className="mr-5"
                    />
                ) : (
                    <FontAwesomeIcon
                        icon={["fas", "house-user"]}
                        className="mr-5"
                        style={{ fontSize: "45px" }}
                    />
                )}

                <div className="flex flex-col">
               {/*  <span className="font-semibold">
                    {number ? (
                    number.toLocaleString()
                    ) : description === "Senators" ? (
                    data?.senators_aggregate?.aggregate?.count ?? null
                    ) : description === "HOR Members" ? (
                    data?.representatives_aggregate?.aggregate?.count ?? null
                    ) : description === "SHOA Members" ? (
                    data?.shoa_aggregate?.aggregate?.count ?? null
                    ) : description === "Male Legislators" ? (
                    maleCount
                    ) : description === "Female Legislators" ? (
                    femaleCount
                    ) : (
                    <></>
                    )}
                </span> */}
                <span className="font-semibold">
                      {number?.toLocaleString() ?? (
                          description === "Senators" ? data?.senators_aggregate?.aggregate?.count ?? "N/A" :
                          description === "HOR Members" ? data?.representatives_aggregate?.aggregate?.count ?? "N/A" :
                          description === "SHOA Members" ? data?.shoa_aggregate?.aggregate?.count ?? "N/A" :
                          description === "Male Legislators" ? maleCount ?? "N/A" :
                          description === "Female Legislators" ? femaleCount ?? "N/A" :
                          "N/A"
                      )}
                  </span>
                    <span className="font-light text-sm">{description}</span>
                </div>
            </div>

            <div className="flex flex-row-reverse p-4 text-sm">
                <Link to="#">View List</Link>
            </div>
        </div>
    )
}

export default StatisticCard
