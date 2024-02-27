import React from "react";
type DisplayProps = {
  data: string;
  header: string;
};
function CalculationDisplay({ data, header }: DisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center  min-w-96">
      <h1>{header}</h1>
      <br />
      <h1>{data}</h1>
    </div>
  );
}

export default CalculationDisplay;
