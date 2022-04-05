import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateUser from "./CreateUser";
import DangerAlert from "../components/DangerAlert";

function UserList() {
	const [isModal, setIsModal] = useState(false);
	const [data, setData] = useState([]);
	const [id, setId] = useState("");
	const [isBgAlert, setIsBgAlert] = useState(false);
	const [isDangerAlert, setIsDangerAlert] = useState(false);

	const showData = async () => {
		const user = await axios.get("http://localhost:5000/user");
		if (user.data.data === null) {
			console.log("data empty");
		} else {
			setData(user.data.data);
		}
	};

	useEffect(() => {
		showData();
	}, []);

	const deleteData = async () => {
		await axios.delete(`http://localhost:5000/user/${id}`);

		showData();
	};

	return (
		<div className="user-list">
			<CreateUser
				isModal={isModal}
				setIsModal={setIsModal}
				showData={showData}
			/>

			<DangerAlert
				isBgAlert={isBgAlert}
				isDangerAlert={isDangerAlert}
				setIsBgAlert={setIsBgAlert}
				setIsDangerAlert={setIsDangerAlert}
				deleteData={deleteData}
			/>

			<h1 className="my-40">Users</h1>

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
								<th className="py-11">Username</th>
								<th className="py-11">Email</th>
								<th className="py-11">Role</th>
								<th className="py-11 border-radius-right-10">
									Action
								</th>
							</tr>
						</thead>
						<tbody id="table-body">
							{data.map((user, index) => {
								return (
									<tr
										className="border-bottom-1 border-grey"
										key={index}
									>
										<td className="py-15">{index + 1}</td>
										<td className="py-15 text-capitalize">
											{user.first_name} <span> </span>
											{user.last_name}
										</td>
										<td className="py-15">
											{user.username}
										</td>
										<td className="py-15">{user.email}</td>
										<td className="py-15">
											{user.role.name}
										</td>
										<td className="py-15 justify-center">
											<Link
												className="bg-orange px-10 py-5 border-none font-16 cursor-pointer color-white mr-5 border-radius-5 text-decoration-none"
												to={`/admin/user-list/detail/${user.user_id}`}
											>
												Detail
											</Link>
											<div
												onClick={() => {
													setId(user.user_id);
													setIsBgAlert(true);
													setIsDangerAlert(true);
												}}
											>
												<button
													className="bg-red px-10 py-5 border-none font-16 cursor-pointer color-white mr-5 border-radius-5"
													type="button"
												>
													Delete
												</button>
											</div>
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

export default UserList;