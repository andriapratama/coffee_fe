import React, { useState } from "react";
import axios from "axios";
import SuccessAlert from "../components/SuccessAlert";
import { useFormik } from "formik";
import { validation } from "./subCategory.validation";
import { TextField } from "../components/formField";

const SubCategoryCreate = (props) => {
	const [isAlert, setIsAlert] = useState(false);

	const storeData = async (values) => {
		await axios.post("http://localhost:5000/sub-category", {
			name: values.name,
		});

		props.setIsCreateModal(false);
		setTimeout(() => {
			formik.resetForm();
			setIsAlert(true);
		}, 200);
		setTimeout(() => {
			setIsAlert(false);
		}, 1500);
		props.showData();
	};

	const formik = useFormik({
		initialValues: {
			name: "",
		},
		validationSchema: validation,
		onSubmit: (values) => {
			storeData(values);
		},
	});

	return (
		<div className="create-category">
			<SuccessAlert isAlert={isAlert} text="Category was created!" />
			<div className={props.isCreateModal ? "modal active" : "modal"}>
				<form onSubmit={formik.handleSubmit}>
					<div className="flex-center">
						<div className="block width-338 height-auto bg-white border-radius-10 mt-100">
							<div className="border-bottom-1 border-grey">
								<p className="ml-20 font-20 my-20">
									Create Sub Category
								</p>
							</div>

							<TextField
								name="name"
								type="text"
								placeholder="Input sub-category name"
								containerClassName="width-268 mx-auto my-20"
								onChange={formik.handleChange}
								value={formik.values.name}
								onBlur={formik.handleBlur}
								errorMessage={formik.errors.name}
								touched={formik.touched.name}
							/>

							<div className="flex py-20 border-top-1 border-grey">
								<button
									className="bg-orange px-10 py-5 border-none border-radius-5 cursor-pointer font-16 ml-20 color-white"
									type="submit"
								>
									Save
								</button>
								<button
									className="bg-grey px-10 py-5 border-none border-radius-5 cursor-pointer font-16 ml-20 color-white"
									onClick={() => {
										props.setIsCreateModal(false);
										setTimeout(() => {
											formik.resetForm();
										}, 200);
									}}
									type="button"
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SubCategoryCreate;
