import { Fragment } from "react"

import { FooterLink } from "@/data/footer-links"
import Link from "next/link"


function Footer() {
    return (
        <Fragment>
            <div>
                <div>
                    <div>
                        {/* Left Section */}
                        <div></div>
                        
                        {/* Right Section */}
                        <div>
                            {FooterLink.map((element, index) => {
                                return (
                                    <div key={index}>
                                        <h1>{element.title}</h1>
                                        <div>
                                            {element.links.map((ele, index) => {
                                                return (
                                                    <div key={index}>
                                                        <Link href={ele.link}> {ele.title}</Link>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div>
                    <div>
                        <div>

                        </div>
                        <div>
                            Made with ❤️ By Jatin Gamnhir © 2024 Knowledge Hut
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Footer