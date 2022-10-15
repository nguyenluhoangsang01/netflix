import React, { forwardRef } from "react";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <div className="inline-block w-full">
    <input ref={ref} {...props} />
  </div>
));

export default Input;
