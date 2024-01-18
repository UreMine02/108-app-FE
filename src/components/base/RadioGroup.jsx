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
		<div className='my-1 w-full md:flex md:items-center'>
			<div className='md:flex'>
				<div className={clsx("m-auto text-left mr-4 ")}>
					{label}
					{required && <span className='ml-1 text-red-600'>*</span>}
					<div>
						{helperText && (
							<div className="text-red-600 w-full bg-red-50">{helperText}</div>	
						)}
					</div>
				</div>
				<div className='grid grid-cols-2 sm:grid-cols-3 lg:flex md:grid-cols-4 gap-2 sm:gap-4 text-left'>
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
		</div>
	);
};

export default RadioGroup;
