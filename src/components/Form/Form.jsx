import React, { useState } from "react";
import TextField from "../base/TextField";
import RadioGroup from "../base/RadioGroup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePickerField from "../base/DatePicker/DatePicker";
import CheckboxGroup from "../base/CheckboxGroup";
import { toast } from "react-toastify";

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
  sieuAm: yup.string().required("Trường bắt buộc"),
  khamMat: yup.string().required("Trường bắt buộc"),
  chieuCao: yup.number().required("Trường bắt buộc"),
  canNang: yup.number().required("Trường bắt buộc"),
  BMI: yup.number().required("Trường bắt buộc"),
  HATT: yup.string().required("Trường bắt buộc"),
  HATTr: yup.string().required("Trường bắt buộc"),
  nuoctieu_albumin: yup.string().required("Trường bắt buộc"),
  maBenhNhan: yup.string().required("Trường bắt buộc"),
  dieuTriDTD: yup.string().required("Trường bắt buộc"),
  dieuTriTHA: yup.string().required("Trường bắt buộc"),
  thoiGianPhatHien: yup.string().required("Trường bắt buộc"),
  ngayKhamBenh: yup.string().required("Trường bắt buộc"),
});

function Form() {
  const [inputDate, setInputDate] = useState('');
  const [inputTSBenh, setInputTSBenh] = useState([]);
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm({ resolver: yupResolver(Schema) });
  const onSubmit = data => {
    console.log(data);
    let newData = JSON.parse(JSON.stringify(data));
    newData.thoiGianPhatHien = new Date(
      data.thoiGianPhatHien
    ).toLocaleDateString("vi");
    newData.ngayKhamBenh = new Date(
      data.ngayKhamBenh
    ).toLocaleDateString("vi");
    newData.nhomThuoc = data.nhomThuoc?.map(e => e.value);
    newData.tienSuBenh = data.tienSuBenh?.map(e => e.value);
    newData.soNamDTD = calculateYearFromDate(inputDate);
    console.log(newData, "a");

    fetch("https://api-108.aiotlab-annotation.com/notes", {
      method: "POST",
      body: JSON.stringify(newData),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(() => {
      toast.success("Gửi dữ liệu thành công");
      const fieldsToReset = ["maBenhNhan", "ten", "tuoi", "gioiTinh", "trinDoHocVan", "dungSmartPhone",
        "diaChi", "tanSuatKham", "tienSuBoMe", "tienSuAnhChi", "thoiGianPhatHien",
        "ngayKhamBenh", "nhomThuoc", "nhomThuocTS", "hba1cLucDau", "tienSuBenh",
        "Hb", "HbA", "Hema", "Glu", "Ure", "Creatinin", "eGFR", "Cholesterol", "LDLC",
        "HDLC", "Trigly", "Na", "K", "Ca", "sieuAm", "khamMat", "ghiChu", "thuocHaAp", "thuocHaApTS", "haMoMau", "haMoMauTS",
        "chieuCao", "canNang", "BMI", "HATT", "HATTr", "nuoctieu_albumin", "dieuTriDTD", "dieuTriTHA", "thoigianM1", "thoigianM2", "benhKemTheo"
      ];
      fieldsToReset.forEach(fieldName => {
        setValue(fieldName, "");
        setInputDate("");
      });
    })
    .catch(() => {
      toast.error("Gửi dữ liệu thất bại");
    });
  };

  function calculateYearFromDate(date) {
    const now = new Date();
    const year = now.getFullYear() - date?.getFullYear()
    return !year ? now.getMonth() - date?.getMonth() + 1 + ' tháng' : year + ' năm';
  }
  return (
    <div className="mx-3 sm:mx-10 overflow-hidden">
      <div className="font-bold text-left mt-5">I. Thông tin hành chính</div>
      <div className="bg-gray-50 rounded shadow-md px-2 py-4 mt-2">
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-2 sm:gap-4">
          <Controller control={control} name="maBenhNhan" render={({ field }) => (
              <TextField
                label={"Mã bệnh nhân"}
                value={field.value}
                helperText={errors?.maBenhNhan?.message}
                onChange={e => field.onChange(e.target.value)}
                required={true}
              />
            )}
          />
          <Controller control={control} name="ten" render={({ field }) => (
              <TextField
                label={"Họ và tên"}
                className="w-[500px]"
                value={field.value}
                helperText={errors?.ten?.message}
                onChange={e => field.onChange(e.target.value)}
                required={true}
              />
            )}
          />
          <Controller control={control} name="tuoi" render={({ field }) => (
              <TextField
                label={"Tuổi"}
                className="w-[170px]"
                value={field.value}
                helperText={errors?.tuoi?.message}
                onChange={e => field.onChange(e.target.value)}
                type="number"
                required={true}
              />
            )}
          />
          <Controller control={control} name="gioiTinh" render={({ field }) => (
              <RadioGroup
                name="gioiTinh"
                options={["Nam", "Nữ"]}
                value={field.value}
                onChange={e => {
                  field.onChange(e);
                }}
                label="Giới tính"
                helperText={errors?.gioiTinh?.message}
                required={true}
              />
            )}
          />
          <Controller control={control} name="diaChi" render={({ field }) => (
              <RadioGroup
                name="diaChi"
                options={["Nông thôn", "Thành thị"]}
                value={field.value}
                onChange={e => {
                  field.onChange(e);
                }}
                helperText={errors?.diaChi?.message}
                label="Địa chỉ"
                required={true}
              />
            )}
          />
          <Controller control={control} name="dungSmartPhone" render={({ field }) => (
              <RadioGroup
                name="dungSmartPhone"
                options={["Có", "Không"]}
                value={field.value}
                onChange={e => {
                  field.onChange(e);
                }}
                label="Biết sử dụng smart phone"
                required={true}
                helperText={errors?.dungSmartPhone?.message}
              />
            )}
          />
        </div>
        <div className="grid 2xl:grid-cols-2 2xl:gap-2 sm:gap-4">
          <Controller control={control} name="trinDoHocVan" render={({ field }) => (
              <RadioGroup
                name="trinDoHocVan"
                options={["< lớp 12", "12-đại học", "sau đại học"]}
                value={field.value}
                onChange={e => {
                  field.onChange(e);
                }}
                label="Trình độ học vấn"
                required={true}
                helperText={errors?.trinDoHocVan?.message}
              />
            )}
          />
          <Controller control={control} name="tanSuatKham" render={({ field }) => (
              <RadioGroup
                name="tanSuatKham"
                options={[
                  "1 tháng/lần",
                  "1-3 tháng/lần",
                  "6-12 tháng/lần",
                  "> 24 tháng",
                ]}
                value={field.value}
                onChange={e => {
                  field.onChange(e);
                }}
                label="Tần suất khám bệnh"
                required={true}
                helperText={errors?.tanSuatKham?.message}
              />
            )}
          />
        </div>
      </div>

      <div className="font-bold text-left mt-5">II. Tiền sử</div>
      <div className="bg-gray-50 rounded shadow-md px-2 py-4 mt-2">
        <div className="grid lg:grid-cols-2 lg:gap-2 sm:gap-4">
          <Controller control={control} name="tienSuBoMe" render={({ field }) => (
              <RadioGroup
                name="tienSuBoMe"
                options={["Có", "Không"]}
                value={field.value}
                onChange={e => {
                  field.onChange(e);
                }}
                label="Bố/mẹ đẻ bị ĐTĐ"
                required={true}
                helperText={errors?.tienSuBoMe?.message}
              />
            )}
          />
          <Controller control={control} name="tienSuAnhChi" render={({ field }) => (
              <RadioGroup
                name="tienSuAnhChi"
                options={["Có", "Không"]}
                value={field.value}
                onChange={e => {
                  field.onChange(e);
                }}
                label="Anh/chị/em bị ĐTĐ"
                required={true}
                helperText={errors?.tienSuAnhChi?.message}
              />
            )}
          />
        </div>
        <div className="grid md:grid-cols-2 2xl:grid-cols-3">
          <Controller control={control} name="thoiGianPhatHien" render={({ field }) => (
              <DatePickerField
                selected={field.value}
                onChange={(date) => {
                  field.onChange(date);
                  setInputDate(date);
                }}
                label={"Phát hiện ĐTĐ từ bao giờ"}
                hasTimeInput={false}
                required={true}
                helperText={errors?.thoiGianPhatHien?.message}
              />
            )}
          />
          <Controller control={control} name="ngayKhamBenh" render={({ field }) => (
              <DatePickerField
                selected={field.value}
                onChange={date => field.onChange(date)}
                label={"Ngày khám bệnh"}
                hasTimeInput={false}
                required={true}
                helperText={errors?.ngayKhamBenh?.message}
              />
            )}
          />
          <Controller control={control} name="hba1cLucDau" render={({ field }) => (
              <TextField
                label={"HbA1C lúc phát hiện"}
                value={field.value}
                helperText={errors?.hba1cLucDau?.message}
                onChange={e => field.onChange(e.target.value)}
                type="number"
                required={false}
              />
            )}
          />
          <Controller control={control} name="benhKemTheo" render={({ field }) => (
              <TextField
                label={"Các bệnh kèm theo"}
                value={field.value}
                helperText={errors?.benhKemTheo?.message}
                onChange={e => field.onChange(e.target.value)}
                type="text"
                required={false}
              />
            )}
          />
        </div>
        {inputDate &&
          <div className="text-left font-medium mb-4">
            Thời gian mắc đái tháo đường: {calculateYearFromDate(inputDate)}
          </div>
        }
        <Controller control={control} name="tienSuBenh" render={({ field }) => (
            <CheckboxGroup
              title={"Đã được chẩn đoán biến chứng:"}
              options={["Bàn chân", "Mắt", "Mạch vành", "Động mạch chi dưới", "Thận", "Thần kinh", "Chưa bao giờ",
              ].map(e => ({
                label: e,
                value: e,
              }))}
              placeholder=""
              value={field.value}
              onChange={(newValue) => {
                field.onChange(newValue);
                setInputTSBenh(newValue.filter((item) => item.value !== "Chưa bao giờ"));
              }}
              helperText={errors?.tienSuBenh?.message}
              required={false}
              isMulti={true}
            />
          )}
        />
        {inputTSBenh && 
          <div className="grid gap-2 sm:gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {inputTSBenh.map(item => 
              <div className="text-left md:flex my-auto items-center">
                <div className="mr-4">Biến chứng {item.value} (năm) <span className="font-bold text-red-600">*</span></div>
                <input className="w-full sm:w-auto" type="" name={`${item.value} Year`} required/>
              </div>
            )}
          </div>
        }
        <div className="grid 2xl:grid-cols-2 2xl:gap-2 sm:gap-4">
          <Controller control={control} name="dieuTriDTD" render={({ field }) => (
              <RadioGroup name="dieuTriDTD"
                options={["Thường xuyên", "Không thường xuyên", "Không điều trị"]}
                value={field.value}
                onChange={e => {
                  field.onChange(e);
                }}
                label="Điều trị đái tháo đường"
                required={true}
                helperText={errors?.dieuTriDTD?.message}
              />
            )}
          />
          <Controller control={control} name="thoigianM1" render={({ field }) => (
              <TextField
                label={"Thời gian mắc sau khi bị ĐTĐ (năm)"}
                value={field.value}
                helperText={errors?.thoigianM1?.message}
                onChange={e => field.onChange(e.target.value)}
                type="number"
                required={false}
              />
            )}
          />
        </div>
        <div className="grid 2xl:grid-cols-2 2xl:gap-2 sm:gap-4">
          <Controller control={control} name="dieuTriTHA" render={({ field }) => (
              <RadioGroup
                name="dieuTriTHA"
                options={["Thường xuyên", "Không thường xuyên", "Không điều trị"]}
                value={field.value}
                onChange={e => {
                  field.onChange(e);
                }}
                label="Điều trị tăng huyết áp"
                required={true}
                helperText={errors?.dieuTriTHA?.message}
              />
            )}
          />
          <Controller control={control} name="thoigianM2" render={({ field }) => (
              <TextField
                label={"Thời gian mắc sau khi bị THA (năm)"}
                value={field.value}
                helperText={errors?.thoigianM2?.message}
                onChange={e => field.onChange(e.target.value)}
                type="number"
                required={false}
              />
            )}
          />
        </div>
        <div className="font-bold text-left mt-2">Tiền sử dùng thuốc:</div>
        <Controller control={control} name="nhomThuocTS" render={({ field }) => (
            <CheckboxGroup
              title={"Nhóm thuốc hạ đường máu"}
              options={["Insulin", "SU", "Metformin", "GLP1", "ức chế SGLT2", "Acarbose", "ức chế DPP4"].map(e => ({
                label: e,
                value: e,
              }))}
              placeholder=""
              value={field.value}
              onChange={newValue => {
                field.onChange(newValue);
              }}
              helperText={errors?.nhomThuocTS?.message}
              required={false}
            />
          )}
        />
        <Controller control={control} name="thuocHaApTS" render={({ field }) => (
            <CheckboxGroup
              title={"Nhóm thuốc hạ áp:"}
              options={["Chẹn calci", "Chẹn beta", "UC thụ thể", "UC men chuyển", "Nhóm khác"].map(e => ({
                label: e,
                value: e,
              }))}
              placeholder=""
              value={field.value}
              onChange={newValue => {
                field.onChange(newValue);
              }}
              helperText={errors?.thuocHaApTS?.message}
              required={false}
              isMulti={true}
            />
          )}
        />
        <Controller control={control} name="haMoMauTS" render={({ field }) => (
            <CheckboxGroup
              title={"Nhóm thuốc hạ mỡ máu:"}
              options={["Statin", "Fibrat"].map(e => ({
                label: e,
                value: e,
              }))}
              placeholder=""
              value={field.value}
              onChange={newValue => {
                field.onChange(newValue);
              }}
              helperText={errors?.haMoMauTS?.message}
              required={false}
              isMulti={true}
            />
          )}
        />
      </div>

      <div className="font-bold text-left mt-5">III. Thông tin thu thập</div>
      <div className="bg-gray-50 rounded shadow-md px-2 py-4 my-2">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
          <Controller control={control} name="chieuCao" render={({ field }) => (
              <TextField
                label={"Chiều cao (cm)"}
                value={field.value}
                helperText={errors?.chieuCao?.message}
                onChange={e => field.onChange(e.target.value)}
                type="number"
                required={true}
              />
            )}
          />
          <Controller control={control} name="canNang" render={({ field }) => (
              <TextField
                label={"Cân nặng (kg)"}
                value={field.value}
                helperText={errors?.canNang?.message}
                onChange={e => field.onChange(e.target.value)}
                type="number"
                required={true}
              />
            )}
          />
          <Controller control={control} name="BMI" render={({ field }) => (
              <TextField
                label={"BMI"}
                value={field.value}
                helperText={errors?.BMI?.message}
                onChange={e => field.onChange(e.target.value)}
                type="number"
                required={true}
              />
            )}
          />
          <Controller control={control} name="HATT" render={({ field }) => (
              <TextField
                label={"Huyết áp - HATT"}
                value={field.value}
                onChange={e => field.onChange(e.target.value)}
                type="number"
                helperText={errors?.HATT?.message}
                required={true}
              />
            )}
          />
          <Controller control={control} name="HATTr" render={({ field }) => (
              <TextField
                label={"Huyết áp - HATTr"}
                value={field.value}
                onChange={e => field.onChange(e.target.value)}
                type="number"
                required={true}
                helperText={errors?.HATTr?.message}
              />
            )}
          />
        </div>
        <Controller control={control} name="nhomThuoc" render={({ field }) => (
            <CheckboxGroup title={"Nhóm thuốc hạ đường máu"}
              options={["Insulin", "SU", "Metformin", "GLP1", "ức chế SGLT2", "Acarbose", "ức chế DPP4"].map(e => ({
                label: e,
                value: e,
              }))}
              placeholder=""
              value={field.value}
              onChange={newValue => {
                field.onChange(newValue);
              }}
              helperText={errors?.nhomThuoc?.message}
              required={false}
            />
          )}
        />
        <Controller control={control} name="thuocHaAp" render={({ field }) => (
            <CheckboxGroup title={"Nhóm thuốc hạ áp:"}
              options={[
                "Chẹn calci",
                "Chẹn beta",
                "UC thụ thể",
                "UC men chuyển",
                "Nhóm khác",
              ].map(e => ({
                label: e,
                value: e,
              }))}
              placeholder=""
              value={field.value}
              onChange={newValue => {
                field.onChange(newValue);
              }}
              helperText={errors?.thuocHaAp?.message}
              required={false}
              isMulti={true}
            />
          )}
        />
        <Controller control={control} name="haMoMau" render={({ field }) => (
            <CheckboxGroup
              title={"Nhóm thuốc hạ mỡ máu:"}
              options={["Statin", "Fibrat"].map(e => ({
                label: e,
                value: e,
              }))}
              placeholder=""
              value={field.value}
              onChange={newValue => {
                field.onChange(newValue);
              }}
              helperText={errors?.haMoMau?.message}
              required={false}
              isMulti={true}
            />
          )}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
          <Controller control={control} name="Hb" render={({ field }) => (
              <TextField
                label={"Hb"}
                value={field.value}
                helperText={errors?.Hb?.message}
                onChange={e => field.onChange(e.target.value)}
                type="number"
                required={false}
              />
            )}
          />
          <Controller control={control} name="Hema" render={({ field }) => (
              <TextField
                label={"Hematocrit"}
                value={field.value}
                helperText={errors?.Hema?.message}
                onChange={e => field.onChange(e.target.value)}
                type="number"
                required={false}
              />
            )}
          />
          <Controller control={control} name="HbA" render={({ field }) => (
              <TextField
                label={"HbA1C"}
                value={field.value}
                helperText={errors?.HbA?.message}
                onChange={e => field.onChange(e.target.value)}
                type="number"
                required={false}
              />
            )}
          />
          <Controller control={control} name="Glu" render={({ field }) => (
              <TextField
                label={"Glucose"}
                value={field.value}
                helperText={errors?.Glu?.message}
                onChange={e => field.onChange(e.target.value)}
                type="number"
                required={false}
              />
            )}
          />
          <Controller control={control} name="Ure" render={({ field }) => (
              <TextField
                label={"Ure"}
                value={field.value}
                helperText={errors?.Ure?.message}
                onChange={e => field.onChange(e.target.value)}
                type="number"
                required={false}
              />
            )}
          />
          <Controller control={control} name="Creatinin" render={({ field }) => (
              <TextField
                label={"Creatinin"}
                value={field.value}
                helperText={errors?.Creatinin?.message}
                onChange={e => field.onChange(e.target.value)}
                type="number"
                required={false}
              />
            )}
          />
          <Controller control={control} name="eGFR" render={({ field }) => (
              <TextField
                label={"eGFR"}
                value={field.value}
                helperText={errors?.eGFR?.message}
                onChange={e => field.onChange(e.target.value)}
                type="number"
                required={false}
              />
            )}
          />
          <Controller control={control} name="Cholesterol" render={({ field }) => (
              <TextField
                label={"Cholesterol"}
                value={field.value}
                helperText={errors?.Cholesterol?.message}
                onChange={e => field.onChange(e.target.value)}
                type="number"
                required={false}
              />
            )}
          />
          <Controller control={control} name="LDLC" render={({ field }) => (
              <TextField
                label={"LDL-C"}
                value={field.value}
                helperText={errors?.LDLC?.message}
                onChange={e => field.onChange(e.target.value)}
                type="number"
                required={false}
              />
            )}
          />
          <Controller control={control} name="HDLC" render={({ field }) => (
              <TextField
                label={"HDL-C"}
                value={field.value}
                helperText={errors?.HDLC?.message}
                onChange={e => field.onChange(e.target.value)}
                type="number"
                required={false}
              />
            )}
          />
          <Controller control={control} name="Trigly" render={({ field }) => (
              <TextField
                label={"Trigly"}
                value={field.value}
                helperText={errors?.Trigly?.message}
                onChange={e => field.onChange(e.target.value)}
                type="number"
                required={false}
              />
            )}
          />
          <Controller control={control} name="Na" render={({ field }) => (
              <TextField
                label={"Natri"}
                value={field.value}
                helperText={errors?.Na?.message}
                onChange={e => field.onChange(e.target.value)}
                type="number"
                required={false}
              />
            )}
          />
          <Controller control={control} name="K" render={({ field }) => (
              <TextField
                label={"Kali"}
                value={field.value}
                helperText={errors?.K?.message}
                onChange={e => field.onChange(e.target.value)}
                type="number"
                required={false}
              />
            )}
          />
          <Controller control={control} name="Ca" render={({ field }) => (
              <TextField
                label={"Calci"}
                value={field.value}
                helperText={errors?.Ca?.message}
                onChange={e => field.onChange(e.target.value)}
                type="number"
                required={false}
              />
            )}
          />
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 md:gap-4">
          <Controller control={control} name="sieuAm" render={({ field }) => (
              <RadioGroup
                name="Kích thước thận"
                options={["Bình thường", "Nhỏ"]}
                value={field.value}
                onChange={e => {
                  field.onChange(e);
                }}
                label="Kích thước thận"
                helperText={errors?.sieuAm?.message}
                required={true}
              />
            )}
          />
          <Controller control={control} name="khamMat" render={({ field }) => (
              <RadioGroup
                name="Khám mắt đánh giá"
                options={["Có", "Không"]}
                value={field.value}
                onChange={e => {
                  field.onChange(e);
                }}
                label="Khám mắt đánh giá"
                helperText={errors?.khamMat?.message}
                required={true}
              />
            )}
          />
          <Controller control={control} name="nuoctieu_albumin" render={({ field }) => (
              <RadioGroup
                label="Nước tiểu(Có Albumin niệu):"
                options={["Có", "Không"]}
                value={field.value}
                onChange={e => {
                  field.onChange(e);
                }}
                helperText={errors?.nuoctieu_albumin?.message}
                required={true}
              />
            )}
          />
        </div>
        <Controller control={control} name="ghiChu" render={({ field }) => (
            <TextField
              label={"Ghi Chú"}
              value={field.value}
              helperText={errors?.ghiChu?.message}
              onChange={e => field.onChange(e.target.value)}
            />
          )}
        />
      </div>
      <div className="mt-5 mb-12">
        <button
          onClick={handleSubmit(onSubmit)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded-full focus:outline-none focus:shadow-outline"
        >
          Gửi
        </button>
      </div>
    </div>
  );
}

export default Form;
