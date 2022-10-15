import React, { forwardRef, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [isShowPassword, setIsShowPassword] = useState<Boolean>(false);
  const [isHover, setIsHover] = useState<Boolean>(false);

  const { type } = props;

  const handleMouseOver = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const handleTogglePassword = () => {
    setIsShowPassword((prevState) => !prevState);
  };

  return (
    <div
      className="inline-block w-full relative"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <input {...props} type={isShowPassword ? "text" : type} ref={ref} />

      {isHover && (
        <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
          {type === "password" &&
            (isShowPassword ? (
              <BiHide
                className="cursor-pointer"
                onClick={handleTogglePassword}
              />
            ) : (
              <BiShow
                className="cursor-pointer"
                onClick={handleTogglePassword}
              />
            ))}
        </div>
      )}
    </div>
  );
});

export default Input;
