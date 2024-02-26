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

type T = "purchasePrice" | "downPayment";

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
  const [purchasePriceDisplay, setPurchasePriceDisplay] = useState("10,000");

  function updateSliderHeader(value: number[], name: "purchasePrice" | "downPayment") {
    console.log(value[0]);
    setPurchasePriceDisplay(value[0].toLocaleString());
    console.log(name);
    slideChange(value, name);
  }

  return (
    <FormItem>
      <FormLabel>
        {formLabel}
        {purchasePriceDisplay}
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
