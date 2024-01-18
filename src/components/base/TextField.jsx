import React from "react";
import Input from "./Input";
import tw from "tailwind-styled-components";
import clsx from "clsx";

const Textarea = tw.textarea`rounded-sm`;

function TextField({
	required,
	label,
	value,
	helperText,
	onChange,
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
		<div className={clsx("my-1 w-[95%]", className)}>
			<div className='sm:flex'>
				<div className={clsx("mr-2 my-auto min-w-[80px] text-left")}>
					{label}
					{required && <span className='ml-1 text-red-600'>*</span>}
				</div>
				{multiline ? (
					<Textarea
						className={`mt-1 rounded-lg border-transparent ${helperText ? "border-red-500" : "border-gray-300"}
							flex-1 appearance-none border px-4 py-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2
							focus:ring-blue-800 focus:border-transparent min-h-[64px] max-h-[300px]`}
						rows={rowsMax}
						{...register}
						placeholder={placeholder}
					/>
				) : (
					<Input
						className={`mt-1 w-[100%] ${helperText ? "border-red-500" : "border-gray-300"}`}
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
		</div>
	);
}

export default TextField;
