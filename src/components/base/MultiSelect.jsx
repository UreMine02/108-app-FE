import clsx from "clsx";
import Select from "react-select";
import tw from "tailwind-styled-components";

const HelperText = tw.div`text-red-600 my-1 text-sm`;

const MultiSelect = ({
	title,
	options,
	helperText,
	required,
	placeholder,
	onChange,
	value,
	getOptionLabel,
	getOptionValue,
	width = "150px",
	isMulti,
	disabled,
}) => {
	return (
		<div className='my-1 w-1/2'>
			<div className='flex'>
				<span className={clsx("m-auto text-left mr-4 ", `w-[${width}]`)}>
					{title}
					{required && <span className='ml-1 text-red-600'>*</span>}
				</span>
				<Select
					classNamePrefix={"select-box"}
					isMulti={isMulti}
					options={options}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					getOptionLabel={getOptionLabel}
					getOptionValue={getOptionValue}
					isDisabled={disabled}
				/>
			</div>
			{helperText && (
				<HelperText className='ml-4' style={{ paddingLeft: title ? width : 0 }}>
					{helperText}
				</HelperText>
			)}
		</div>
	);
};

export default MultiSelect;
