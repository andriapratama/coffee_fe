import axios from "axios";
import React, { useEffect, useState } from "react";
import CreateMainCategory from "./CreateMainCategory";
import UpdateMainCategory from "./UpdateMainCategory";
import DangerAlert from "../components/DangerAlert";

function MainCategory() {
	const [isModal, setIsModal] = useState(false);
	const [isUpdateModal, setIsUpdateModal] = useState(false);
	const [data, setData] = useState([]);
	const [categoryId, setCategoryId] = useState("");
	const [name, setName] = useState("");
	const [isBgAlert, setIsBgAlert] = useState(false);
	const [isDangerAlert, setIsDangerAlert] = useState(false);

	const showData = async () => {
		const category = await axios.get("http://localhost:5000/main-category");

		setData(category.data.data);
	};

	useEffect(() => {
		showData();
	}, []);

	const deleteData = async () => {
		await axios.delete(`http://localhost:5000/main-category/${categoryId}`);

		showData();
	};

	return (
		<div className="main-category">
			<CreateMainCategory
				isModal={isModal}
				setIsModal={setIsModal}
				showData={showData}
			/>

			<UpdateMainCategory
				isUpdateModal={isUpdateModal}
				setIsUpdateModal={setIsUpdateModal}
				categoryId={categoryId}
				name={name}
				setName={setName}
				showData={showData}
			/>

			<DangerAlert
				isBgAlert={isBgAlert}
				isDangerAlert={isDangerAlert}
				setIsBgAlert={setIsBgAlert}
				setIsDangerAlert={setIsDangerAlert}
				deleteData={deleteData}
			/>

			<h1 className="my-40">Main Categories</h1>

			<div className="width-full bg-white border-radius-20 height-100vh mb-10">
				<div className="p-30 flex">
					<div className="width-150">
						<button
							className="btn-orange cursor-pointer"
							onClick={() => setIsModal(true)}
						>
							Add New
						</button>
					</div>
					<div className="width-300 border-2 border-orange border-radius-5 flex-center">
						<i className="fas fa-search px-20 py-9 mr-5 border-right-2 border-orange"></i>
						<input
							className="width-full px-15 py-11 border-none outline-none"
							type="search"
							placeholder="Search"
							// onKeyUp={(e) => handleSearch(e.target.value)}
						/>
					</div>
				</div>

				<div className="p-30">
					<table className="width-full text-center border-collapse">
						<thead className="bg-orange color-white">
							<tr>
								<th className="border-radius-left-10 py-11">
									No
								</th>
								<th className="py-11">Name</th>
								<th className="py-11 border-radius-right-10">
									Action
								</th>
							</tr>
						</thead>
						<tbody id="table-body">
							{data.map((category, index) => {
								return (
									<tr
										className="border-bottom-1 border-grey"
										key={index}
									>
										<td className="py-15">{index + 1}</td>
										<td className="py-15 text-capitalize">
											{category.name}
										</td>
										<td className="py-15">
											<button
												className="bg-orange px-10 py-5 border-none cursor-pointer font-16 color-white mr-5 border-radius-5"
												onClick={() => {
													setCategoryId(
														category.main_category_id
													);
													setName(category.name);
													setIsUpdateModal(true);
												}}
											>
												Edit
											</button>
											<button
												className="bg-red px-10 py-5 border-none cursor-pointer font-16 color-white mr-5 border-radius-5"
												onClick={() => {
													setIsBgAlert(true);
													setIsDangerAlert(true);
													setCategoryId(
														category.main_category_id
													);
												}}
											>
												Delete
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default MainCategory;