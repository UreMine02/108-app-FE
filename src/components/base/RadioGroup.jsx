import React from "react";
import Radio from "./Radio";
import tw from "tailwind-styled-components";
import clsx from "clsx";

const HelperText = tw.div`text-red-600 my-1 text-sm`;

const RadioGroup = ({
	options,
	name,
	value,
	onChange,
	label,
	required,
	helperText,
	width = "150px",
}) => {
	return (
		<div className='my-1 w-full'>
			<div className='flex'>
				<span className={clsx("m-auto text-left mr-4 ")}>
					{label}
					{required && <span className='ml-1 text-red-600'>*</span>}
				</span>
				<div className='flex-1 flex gap-4'>
					{options.map((opt) => (
						<Radio
							key={opt}
							name={name}
							checked={opt === value}
							onChange={() => onChange(opt)}
							label={opt}
						/>
					))}
				</div>
			</div>
			{helperText && (
				<HelperText className='ml-4' style={{ paddingLeft: label ? width : 0 }}>
					{helperText}
				</HelperText>
			)}
		</div>
	);
};

export default RadioGroup;
