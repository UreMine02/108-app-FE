import React, { useEffect } from "react";
import TextField from "../base/TextField";
import RadioGroup from "../base/RadioGroup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import MultiSelect from "../base/MultiSelect";
import DatePickerField from "../base/DatePicker/DatePicker";
import { toast } from "react-toastify";
// import myData from "../../data.json";

const Schema = yup.object().shape({
	ten: yup.string().required("Trường bắt buộc"),
	tuoi: yup.number().required("Trường bắt buộc"),
	gioiTinh: yup.string().required("Trường bắt buộc"),
	trinDoHocVan: yup.string().required("Trường bắt buộc"),
	dungSmartPhone: yup.string().required("Trường bắt buộc"),
	diaChi: yup.string().required("Trường bắt buộc"),
	tanSuatKham: yup.string().required("Trường bắt buộc"),
	tienSuBoMe: yup.string().required("Trường bắt buộc"),
	tienSuAnhChi: yup.string().required("Trường bắt buộc"),
	thoiGianPhatHien: yup.date(),
	dieuTri: yup.string().required("Trường bắt buộc"),
	nhomThuoc: yup.array().required("Trường bắt buộc"),
	hba1cLucDau: yup.string().required("Trường bắt buộc"),
	tienSuBenh: yup.array().required("Trường bắt buộc"),
	Hb: yup.number().required("Trường bắt buộc"),
	Hema: yup.number().required("Trường bắt buộc"),
	Glu: yup.number().required("Trường bắt buộc"),
	Ure: yup.number().required("Trường bắt buộc"),
	Hba1c: yup.number().required("Trường bắt buộc"),
	Creatinin: yup.number().required("Trường bắt buộc"),
	eGFR: yup.number().required("Trường bắt buộc"),
	Cholesterol: yup.number().required("Trường bắt buộc"),
	LDLC: yup.number().required("Trường bắt buộc"),
	HDLC: yup.number().required("Trường bắt buộc"),
	Trigly: yup.number().required("Trường bắt buộc"),
	Na: yup.number().required("Trường bắt buộc"),
	K: yup.number().required("Trường bắt buộc"),
	Ca: yup.number().required("Trường bắt buộc"),
	Protein: yup.string().required("Trường bắt buộc"),
	sieuAm: yup.string().required("Trường bắt buộc"),
	khamMat: yup.string().required("Trường bắt buộc"),
});

function Form() {
	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm({ resolver: yupResolver(Schema) });

	const onSubmit = (data) => {
		console.log(data);
		let newData = JSON.parse(JSON.stringify(data));
		newData.thoiGianPhatHien = new Date(
			data.thoiGianPhatHien
		).toLocaleDateString("vi");
		newData.nhomThuoc = data.nhomThuoc.map((e) => e.value);
		newData.tienSuBenh = data.tienSuBenh.map((e) => e.value);
		console.log(newData, "a");

		fetch("http://localhost:5000/notes/", {
			method: "POST",
			// mode: "no-cors",
			body: JSON.stringify(newData),
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
		}).then(() => {
			toast.success('Gửi dữ liệu thành công')
		}).catch(() => {
			toast.error('Gửi dữ liệu thất bại')
		});
	};
 
	// console.log(myData);
	return (
		<div>
			<Controller
				control={control}
				name='ten'
				render={({ field }) => (
					<TextField
						label={"Họ và tên"}
						value={field.value}
						helperText={errors?.ten?.message}
						onChange={(e) => field.onChange(e.target.value)}
					/>
				)}
			/>
			<Controller
				control={control}
				name='tuoi'
				render={({ field }) => (
					<TextField
						label={"Tuổi"}
						value={field.value}
						helperText={errors?.ten?.message}
						onChange={(e) => field.onChange(e.target.value)}
						type='number'
					/>
				)}
			/>
			<Controller
				control={control}
				name='gioiTinh'
				render={({ field }) => (
					<RadioGroup
						name='gioiTinh'
						options={["Nam", "Nữ"]}
						value={field.value}
						onChange={(e) => {
							field.onChange(e);
						}}
						label='Giới tính'
						required={true}
					/>
				)}
			/>
			<Controller
				control={control}
				name='trinDoHocVan'
				render={({ field }) => (
					<RadioGroup
						name='trinDoHocVan'
						options={["< lớp 12", "12-đại học", "sau đại học"]}
						value={field.value}
						onChange={(e) => {
							field.onChange(e);
						}}
						label='Trình độ học vấn'
						required={true}
					/>
				)}
			/>
			<Controller
				control={control}
				name='dungSmartPhone'
				render={({ field }) => (
					<RadioGroup
						name='dungSmartPhone'
						options={["Có", "Không"]}
						value={field.value}
						onChange={(e) => {
							field.onChange(e);
						}}
						label='Biết sử dụng smart phone'
						required={true}
					/>
				)}
			/>
			<Controller
				control={control}
				name='diaChi'
				render={({ field }) => (
					<RadioGroup
						name='diaChi'
						options={["Nông thôn", "Thành thị"]}
						value={field.value}
						onChange={(e) => {
							field.onChange(e);
						}}
						label='Địa chỉ'
						required={true}
					/>
				)}
			/>
			<Controller
				control={control}
				name='tanSuatKham'
				render={({ field }) => (
					<RadioGroup
						name='tanSuatKham'
						options={[
							"1 tháng/lần",
							"1-3 tháng/lần",
							"6-12 tháng/lần",
							"> 24 tháng",
						]}
						value={field.value}
						onChange={(e) => {
							field.onChange(e);
						}}
						label='Tần suất khám bệnh'
						required={true}
					/>
				)}
			/>
			<Controller
				control={control}
				name='tienSuBoMe'
				render={({ field }) => (
					<RadioGroup
						name='tienSuBoMe'
						options={["Có", "Không"]}
						value={field.value}
						onChange={(e) => {
							field.onChange(e);
						}}
						label='Bố/mẹ đẻ bị ĐTĐ'
						required={true}
					/>
				)}
			/>
			<Controller
				control={control}
				name='tienSuAnhChi'
				render={({ field }) => (
					<RadioGroup
						name='tienSuAnhChi'
						options={["Có", "Không"]}
						value={field.value}
						onChange={(e) => {
							field.onChange(e);
						}}
						label='Anh/chị/em bị ĐTĐ'
						required={true}
					/>
				)}
			/>
			<Controller
				control={control}
				name='thoiGianPhatHien'
				render={({ field }) => (
					<DatePickerField
						selected={field.value}
						onChange={(date) => field.onChange(date)}
						label={"Phát hiện ĐTĐ từ bao giờ"}
						hasTimeInput={false}
						required={true}
					/>
				)}
			/>
			<Controller
				control={control}
				name='dieuTri'
				render={({ field }) => (
					<RadioGroup
						name='dieuTri'
						options={["Thường xuyên", "Không thường xuyên", "Không điều trị"]}
						value={field.value}
						onChange={(e) => {
							field.onChange(e);
						}}
						label='Điều trị thuốc hạ đường máu'
						required={true}
					/>
				)}
			/>
			<Controller
				control={control}
				name='nhomThuoc'
				render={({ field }) => (
					<MultiSelect
						title={"Nhóm thuốc hạ đường máu"}
						options={[
							"Insulin",
							"SU",
							"Metformin",
							"ức chế DPP4",
							"GLP1",
							"ức chế SGLT2",
							"Acarbose",
						].map((e) => ({
							label: e,
							value: e,
						}))}
						placeholder=''
						value={field.value}
						onChange={(newValue) => {
							field.onChange(newValue);
						}}
						helperText={errors?.nhomThuoc?.message}
						required={true}
						isMulti={true}
					/>
				)}
			/>
			<Controller
				control={control}
				name='hba1cLucDau'
				render={({ field }) => (
					<TextField
						label={"HbA1C lúc phát hiện"}
						value={field.value}
						helperText={errors?.ten?.message}
						onChange={(e) => field.onChange(e.target.value)}
						type='number'
					/>
				)}
			/>
			<Controller
				control={control}
				name='tienSuBenh'
				render={({ field }) => (
					<MultiSelect
						title={"Đã bao giờ được chẩn đoán biến chứng chưa"}
						options={[
							"Bàn chân",
							"Mắt",
							"Mạch vành",
							"Bệnh động mạch chi dưới",
							"Thận",
							"Thần kinh",
						].map((e) => ({
							label: e,
							value: e,
						}))}
						placeholder=''
						value={field.value}
						onChange={(newValue) => {
							field.onChange(newValue);
						}}
						helperText={errors?.nhomThuoc?.message}
						required={true}
						isMulti={true}
					/>
				)}
			/>
			<Controller
				control={control}
				name='Hb'
				render={({ field }) => (
					<TextField
						label={"Hb"}
						value={field.value}
						helperText={errors?.ten?.message}
						onChange={(e) => field.onChange(e.target.value)}
						type='number'
					/>
				)}
			/>
			<Controller
				control={control}
				name='Hema'
				render={({ field }) => (
					<TextField
						label={"Hematocrit"}
						value={field.value}
						helperText={errors?.ten?.message}
						onChange={(e) => field.onChange(e.target.value)}
						type='number'
					/>
				)}
			/>{" "}
			<Controller
				control={control}
				name='Glu'
				render={({ field }) => (
					<TextField
						label={"Glucose"}
						value={field.value}
						helperText={errors?.ten?.message}
						onChange={(e) => field.onChange(e.target.value)}
						type='number'
					/>
				)}
			/>{" "}
			<Controller
				control={control}
				name='Hba1c'
				render={({ field }) => (
					<TextField
						label={"HbA1C"}
						value={field.value}
						helperText={errors?.ten?.message}
						onChange={(e) => field.onChange(e.target.value)}
						type='number'
					/>
				)}
			/>{" "}
			<Controller
				control={control}
				name='Ure'
				render={({ field }) => (
					<TextField
						label={"Ure"}
						value={field.value}
						helperText={errors?.ten?.message}
						onChange={(e) => field.onChange(e.target.value)}
						type='number'
					/>
				)}
			/>{" "}
			<Controller
				control={control}
				name='Creatinin'
				render={({ field }) => (
					<TextField
						label={"Creatinin"}
						value={field.value}
						helperText={errors?.ten?.message}
						onChange={(e) => field.onChange(e.target.value)}
						type='number'
					/>
				)}
			/>{" "}
			<Controller
				control={control}
				name='eGFR'
				render={({ field }) => (
					<TextField
						label={"eGFR"}
						value={field.value}
						helperText={errors?.ten?.message}
						onChange={(e) => field.onChange(e.target.value)}
						type='number'
					/>
				)}
			/>{" "}
			<Controller
				control={control}
				name='Cholesterol'
				render={({ field }) => (
					<TextField
						label={"Cholesterol"}
						value={field.value}
						helperText={errors?.ten?.message}
						onChange={(e) => field.onChange(e.target.value)}
						type='number'
					/>
				)}
			/>{" "}
			<Controller
				control={control}
				name='LDLC'
				render={({ field }) => (
					<TextField
						label={"LDL-C"}
						value={field.value}
						helperText={errors?.ten?.message}
						onChange={(e) => field.onChange(e.target.value)}
						type='number'
					/>
				)}
			/>{" "}
			<Controller
				control={control}
				name='HDLC'
				render={({ field }) => (
					<TextField
						label={"HDL-C"}
						value={field.value}
						helperText={errors?.ten?.message}
						onChange={(e) => field.onChange(e.target.value)}
						type='number'
					/>
				)}
			/>
			<Controller
				control={control}
				name='Trigly'
				render={({ field }) => (
					<TextField
						label={"Triglycerid"}
						value={field.value}
						helperText={errors?.ten?.message}
						onChange={(e) => field.onChange(e.target.value)}
						type='number'
					/>
				)}
			/>
			<Controller
				control={control}
				name='Na'
				render={({ field }) => (
					<TextField
						label={"Natri"}
						value={field.value}
						helperText={errors?.ten?.message}
						onChange={(e) => field.onChange(e.target.value)}
						type='number'
					/>
				)}
			/>
			<Controller
				control={control}
				name='K'
				render={({ field }) => (
					<TextField
						label={"Kali"}
						value={field.value}
						helperText={errors?.ten?.message}
						onChange={(e) => field.onChange(e.target.value)}
						type='number'
					/>
				)}
			/>
			<Controller
				control={control}
				name='Ca'
				render={({ field }) => (
					<TextField
						label={"Calci"}
						value={field.value}
						helperText={errors?.ten?.message}
						onChange={(e) => field.onChange(e.target.value)}
						type='number'
					/>
				)}
			/>
			<Controller
				control={control}
				name='Protein'
				render={({ field }) => (
					<RadioGroup
						name='Protein niệu'
						options={["Có", "Không"]}
						value={field.value}
						onChange={(e) => {
							field.onChange(e);
						}}
						label='Tần suất khám bệnh'
						required={true}
					/>
				)}
			/>
			<Controller
				control={control}
				name='sieuAm'
				render={({ field }) => (
					<RadioGroup
						name='Kích thước thận'
						options={["Bình thường", "Nhỏ"]}
						value={field.value}
						onChange={(e) => {
							field.onChange(e);
						}}
						label='Tần suất khám bệnh'
						required={true}
					/>
				)}
			/>
			<Controller
				control={control}
				name='khamMat'
				render={({ field }) => (
					<TextField
						label={"Khám mắt đánh giá"}
						value={field.value}
						helperText={errors?.ten?.message}
						onChange={(e) => field.onChange(e.target.value)}
					/>
				)}
			/>
			<button onClick={handleSubmit(onSubmit)}>Gửi</button>
		</div>
	);
}

export default Form;
