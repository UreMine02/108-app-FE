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
            <div className='xl:flex text-left'>
                <div className={clsx("text-left mr-4 min-w-[210px]")}>
                    {title}
                    {required && <span className='ml-1 text-red-600'>*</span>}
                </div>
                <div className="checkbox-group grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-4 lg:flex">
                    {options.map((option, index) => (
                        <div className="flex text-left min-w-[100px]">
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