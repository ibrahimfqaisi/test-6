import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

function Footer() {
	return (
		<>
			<div className="flex flex-col items-start justify-around w-full p-20 bg-black-50 h-1/2 md:flex-row">
				<div className="p-5 ">
					<ul>
						<p className="pb-6 text-3xl font-bold text-white-800">
							TECH<span className="text-blue-600">AGENT</span>
						</p>
						<div className="flex gap-6 pb-5" >
							<FaInstagram className="text-2xl cursor-pointer hover:text-yellow-600" />
							<FaTwitter className="text-2xl cursor-pointer hover:text-blue-600" />
							<FaLinkedin className="text-2xl cursor-pointer hover:text-blue-600" />
							<FaYoutube className="text-2xl cursor-pointer hover:text-red-600" />
						</div>
					</ul>
				</div>
				<div className="p-5">
					<ul>
						<p className="pb-4 text-2xl font-bold text-white-800">Product</p>
						<li className="pb-2 font-semibold text-gray-500 cursor-pointer text-md hover:text-blue-600">
							Stocks
						</li>
						<li className="pb-2 font-semibold text-gray-500 cursor-pointer text-md hover:text-blue-600">
							Futures & Options
						</li>
						<li className="pb-2 font-semibold text-gray-500 cursor-pointer text-md hover:text-blue-600">
							Mutual Funds
						</li>
						<li className="pb-2 font-semibold text-gray-500 cursor-pointer text-md hover:text-blue-600">
							Fixed deposits
						</li>
					</ul>
				</div>
				<div className="p-5">
					<ul>
						<p className="pb-4 text-2xl font-bold text-white-600">Company</p>
						<li className="pb-2 font-semibold text-gray-500 cursor-pointer text-md hover:text-blue-600">
							About
						</li>
						<li className="pb-2 font-semibold text-gray-500 cursor-pointer text-md hover:text-blue-600">
							Products
						</li>
						<li className="pb-2 font-semibold text-gray-500 cursor-pointer text-md hover:text-blue-600">
							Pricing
						</li>
						<li className="pb-2 font-semibold text-gray-500 cursor-pointer text-md hover:text-blue-600">
							Careers
						</li>
						<li className="pb-2 font-semibold text-gray-500 cursor-pointer text-md hover:text-blue-600">
							Press & Media
						</li>
					</ul>
				</div>
				<div className="p-5">
					<ul>
						<p className="pb-4 text-2xl font-bold text-white-400">Support</p>
						<li className="pb-2 font-semibold text-gray-500 cursor-pointer text-md hover:text-blue-600">
							Contact
						</li>
						<li className="pb-2 font-semibold text-gray-500 cursor-pointer text-md hover:text-blue-600">
							Support Portals
						</li>
						<li className="pb-2 font-semibold text-gray-500 cursor-pointer text-md hover:text-blue-600">
							List Of Charges
						</li>
						<li className="pb-2 font-semibold text-gray-500 cursor-pointer text-md hover:text-blue-600">
							Downloads & Resources
						</li>
						<li className="pb-2 font-semibold text-gray-500 cursor-pointer text-md hover:text-blue-600">
							Videos
						</li>
					</ul>
				</div>
			</div>
			<div className="flex flex-col items-center justify-center p-5 text-center bg-gray-500">
				<h1 className="font-semibold  text-white-800">
					© 2023 All rights reserved | Build with ❤ by{" "}
					<span className="font-semibold cursor-pointer hover:text-blue-600">
						TECH AGENT{" "}
					</span>
				</h1>
			</div>
		</>
	);
}

export default Footer;