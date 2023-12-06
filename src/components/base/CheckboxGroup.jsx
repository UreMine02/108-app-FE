import clsx from "clsx";
import tw from "tailwind-styled-components";

const HelperText = tw.div`text-red-600 my-1 text-sm`;

const CheckboxGroup = ({
    title,
    options,
    helperText,
    required,
    onChange,
    value,
    width = "150px",
    disabled,
}) => {
    const checkedValues = Array.isArray(value) ? value : [];

    const handleCheckboxChange = (checked, optionValue) => {
        if (checked) {
            onChange([...checkedValues, optionValue]);
        } else {
            onChange(checkedValues.filter((item) => item !== optionValue));
        }
        console.log(checkedValues);
    };
    return (
        <div className='my-1'>
            <div className='flex'>
                <span className={clsx("m-auto text-left mr-4", `w-[300px]`)}>
                    {title}
                    {required && <span className='ml-1 text-red-600'>*</span>}
                </span>
                <div className="checkbox-group flex w-full justify-between">
                    {options.map((option, index) => (
                        <>
                            <label key={index} className="flex">
                                {option.label}
                            </label>
                            <input
                                className="w-5 h-5"
                                type="checkbox"
                                value={option}
                                checked={checkedValues.map(item => item.value).includes(option.value)}
                                onChange={(e) => handleCheckboxChange(e.target.checked, option)}
                                disabled={disabled}
                            />
                        </>
                    ))}
                </div>
            </div>
            {helperText && (
                <HelperText className='ml-4' style={{ paddingLeft: title ? width : 0 }}>
                    {helperText}
                </HelperText>
            )}
        </div>
    );
};


export default CheckboxGroup;