import React from "react";
import Input from "./Input";
import tw from "tailwind-styled-components";
import clsx from "clsx";

const Textarea = tw.textarea`rounded-sm`;

const HelperText = tw.div`text-red-600 my-1 text-sm`;

function TextField({
	required,
	id,
	label,
	value,
	helperText,
	onChange,
	width = "200px",
	multiline,
	rowsMax,
	placeholder,
	register,
	type = "text",
	disabled,
	readOnly,
	className,
	autoComplete,
}) {
	return (
		<div className={clsx("my-1", className)}>
			<div className='flex'>
				<span className={clsx("m-auto mr-2 min-w-[80px] text-left")}>
					{label}
					{required && <span className='ml-1 text-red-600'>*</span>}
				</span>
				{multiline ? (
					<Textarea
						className={`mt-1 rounded-lg border-transparent ${helperText ? "border-red-500" : "border-gray-300"}
            flex-1 appearance-none border}
            px-4 py-2 bg-white
            text-gray-700 placeholder-gray-400 shadow-sm 
            text-base focus:outline-none focus:ring-2
            focus:ring-blue-800 focus:border-transparent min-h-[64px] max-h-[300px]`}
						rows={rowsMax}
						{...register}
						placeholder={placeholder}
					/>
				) : (
					<Input
						className={`mt-1 ${helperText ? "border-red-500" : "border-gray-300"}`}
						value={value}
						onChange={onChange}
						disabled={disabled}
						placeholder={placeholder}
						{...register}
						type={type}
						readOnly={readOnly}
						autoComplete={autoComplete}
					/>
				)}
			</div>
			{/* {helperText && (
				<HelperText className='ml-4' style={{ paddingLeft: label ? width : 0 }}>
					{helperText.length}
				</HelperText>
			)} */}
		</div>
	);
}

export default TextField;
