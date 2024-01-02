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
        console.log(optionValue);
        if (checked) {
            if(optionValue.value === "Chưa bao giờ" || checkedValues[0]?.value === 'Chưa bao giờ')
                onChange([optionValue])
            else
                onChange([...checkedValues, optionValue]);
        } else {
            onChange(checkedValues.filter((item) => item.value !== optionValue.value));
        }
    };
    return (
        <div className='my-1'>
            <div className='flex'>
                <span className={clsx("m-auto text-left mr-4", `w-[300px]`)}>
                    {title}
                    {required && <span className='ml-1 text-red-600'>*</span>}
                </span>
                <div className="checkbox-group flex w-full">
                    {options.map((option, index) => (
                        <div className="mr-3 flex min-w-[120px]">
                            <input
                                className={`w-5 h-5`}
                                type="checkbox"
                                value={option}
                                checked={checkedValues.map(item => item.value).includes(option.value)}
                                onChange={(e) => handleCheckboxChange(e.target.checked, option)}
                                disabled={disabled}
                            />
                            <label key={index} className="flex ml-2">
                                {option.label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            {/* {helperText && (
                <HelperText className='ml-4' style={{ paddingLeft: title ? width : 0 }}>
                    {helperText}
                </HelperText>
            )} */}
        </div>
    );
};


export default CheckboxGroup;