import React from "react";
import Label from "./Label";

function Radio({ label, value, checked, name, onChange }) {
	return (
		<Label className='cursor-pointer'>
			<input
				className='rounded-md pl-2 cursor-pointer accent-blue-800 w-4 h-4'
				type='radio'
				name={name}
				value={value}
				checked={checked}
				onChange={onChange}
			/>
			<span className='ml-2'>{label}</span>
		</Label>
	);
}

export default Radio;
