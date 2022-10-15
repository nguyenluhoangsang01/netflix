import React, { forwardRef, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Password = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [isShowPassword, setIsShowPassword] = useState<Boolean>(false);
  const [isHover, setIsHover] = useState<Boolean>(false);

  const handleTogglePassword = () => {
    setIsShowPassword((prevState) => !prevState);
  };

  return (
    <div
      className="inline-block w-full relative"
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <input type={isShowPassword ? "text" : "password"} ref={ref} {...props} />

      {isHover && (
        <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
          {isShowPassword ? (
            <BiHide className="cursor-pointer" onClick={handleTogglePassword} />
          ) : (
            <BiShow className="cursor-pointer" onClick={handleTogglePassword} />
          )}
        </div>
      )}
    </div>
  );
});

export default Password;
