import React, { useState } from "react";
import SuccessAlert from "../components/SuccessAlert";
import { TextField } from "../components/formField";
import { useUpdateImage } from "./team.hook";

const TeamEditImage = (props) => {
	const [imagePreview, setImagePreview] = useState();
	const [isShowImage, setIsShowImage] = useState(false);
	const [imageValue, setImageValue] = useState("");
	const setIsEditImageModal = props.setIsEditImageModal;
	const showData = props.showData;
	const id = props.values.id;

	const { formik, isAlert } = useUpdateImage(
		setIsEditImageModal,
		showData,
		id,
		setImagePreview,
		setIsShowImage,
		setImageValue
	);

	return (
		<div className="edit-image-team">
			<SuccessAlert isAlert={isAlert} text="Image was updated!" />

			<div className={props.isEditImageModal ? "modal active" : "modal"}>
				<form onSubmit={formik.handleSubmit}>
					<div className="flex-center">
						<div className="block width-auto height-auto bg-white border-radius-10 mt-80">
							<div
								className={
									isShowImage
										? "width-auto height-200 p-20 visibility-visible justify-center"
										: "visibility-hidden"
								}
							>
								<img
									className="width-auto height-full object-fit-cover object-position-center "
									src={imagePreview}
									alt="user"
								/>
							</div>

							<TextField
								type="file"
								name="image"
								containerClassName="width-400 px-10 mx-auto my-10"
								onBlur={formik.handleBlur}
								errorMessage={formik.errors.image}
								touched={formik.touched.image}
								onChange={(e) => {
									formik.setFieldValue(
										"image",
										e.target.files[0]
									);
									setImagePreview(
										URL.createObjectURL(e.target.files[0])
									);
									setIsShowImage(true);
									setImageValue(e.target.value);
								}}
								value={imageValue}
							/>

							<div className="px-20 pt-10 pb-20">
								<button
									className="bg-orange px-10 py-5 border-none border-radius-5 color-white font-16 cursor-pointer mr-10"
									type="submit"
								>
									Save
								</button>
								<button
									className="bg-grey px-10 py-5 border-none border-radius-5 color-white font-16 cursor-pointer"
									type="button"
									onClick={() => {
										props.setIsEditImageModal(false);
										setTimeout(() => {
											setIsShowImage(false);
											setImagePreview("");
										}, 200);
										formik.resetForm();
									}}
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

export default TeamEditImage;
