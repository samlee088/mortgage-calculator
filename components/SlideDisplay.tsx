"use client";

import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type T = "purchasePrice" | "downPayment" | "repaymentTime" | "interestRate";

type SliderDisplayProps = {
  max: number;
  min: number;
  step: number;
  className: string;
  formDescription: string;
  formLabel: string;
  name: T;
  slideChange: (value: number[], name: T) => void;
};

function SlideDisplay({
  max,
  min,
  step,
  className,
  formDescription,
  formLabel,
  name,
  slideChange,
}: SliderDisplayProps) {
  let defaultValuesMap = {
    purchasePrice: "10,000",
    downPayment: "10,000",
    repaymentTime: "10",
    interestRate: ".5",
  };
  const [sliderDisplay, setsliderDisplay] = useState(defaultValuesMap[name]);

  function updateSliderHeader(
    value: number[],
    name: "purchasePrice" | "downPayment" | "repaymentTime" | "interestRate"
  ) {
    console.log(value[0]);
    setsliderDisplay(value[0].toLocaleString());
    console.log(name);
    slideChange(value, name);
  }

  return (
    <FormItem>
      <FormLabel>
        {formLabel}
        {sliderDisplay}
        {name === "repaymentTime" ? ` Years` : null}
        {name === "interestRate" ? `%` : null}
      </FormLabel>
      <FormControl>
        <div className="flex items-center">
          <Slider
            onValueChange={(value) => updateSliderHeader(value, name)}
            max={max}
            min={min}
            step={step}
            className={className}
          />
          <div className="w-10 text-center"></div>
        </div>
      </FormControl>
      <FormDescription>{formDescription}</FormDescription>
      <FormMessage />
    </FormItem>
  );
}

export default SlideDisplay;
