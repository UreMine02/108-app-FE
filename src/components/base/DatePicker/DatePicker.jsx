import React from "react";
import tw from "tailwind-styled-components";
import DatePicker, { registerLocale } from "react-datepicker";
import "./DatePicker.css";
import "react-datepicker/dist/react-datepicker.css";
import vi from "date-fns/locale/vi";
import clsx from "clsx";

registerLocale("vi", vi);

const Textarea = tw.textarea`rounded-sm`;

const HelperText = tw.div`text-red-600 my-1 text-sm`;

function DatePickerField({
	label,
	selected,
	onChange,
	helperText,
	placeholder,
	hasTimeInput = true,
	required,
	maxDate,
	minDate,
	width = "150px",
	disabled,
}) {
	return (
		<div className='my-1'>
			<div className='sm:flex'>
				<div className={clsx("text-left my-auto mr-4 ")}>
					{label}
					{required && <span className='ml-1 text-red-600'>*</span>}
					{helperText && (
						<div className="text-red-600 w-full bg-red-50">
							{helperText}
						</div>
					)}
				</div>
				<div className="text-left">
					<DatePicker
						placeholderText={placeholder}
						onChange={onChange}
						selected={selected}
						timeInputLabel='Thời gian:'
						dateFormat={hasTimeInput ? "dd/MM/yyyy h:mm aa" : "dd/MM/yyyy"}
						showTimeInput={hasTimeInput}
						locale='vi'
						minDate={minDate}
						maxDate={maxDate}
						disabled={disabled}
					/>
				</div>
			</div>
			{/* {helperText && (
				<HelperText className='ml-4' style={{ paddingLeft: label ? width : 0 }}>
					{helperText}
				</HelperText>
			)} */}
		</div>
	);
}

export default DatePickerField;
