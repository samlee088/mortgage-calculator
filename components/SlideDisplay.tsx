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

type SliderDisplayProps = {
  max: number;
  min: number;
  step: number;
  className: string;
  formDescription: string;
  formLabel: string;
  slideChange: (value: number[]) => void;
};

function SlideDisplay({
  max,
  min,
  step,
  className,
  formDescription,
  formLabel,
  slideChange,
}: SliderDisplayProps) {
  const [purchasePriceDisplay, setPurchasePriceDisplay] = useState("10,000");

  function updateSliderHeader(value: number[]) {
    console.log(value[0]);
    setPurchasePriceDisplay(value[0].toLocaleString());
    slideChange(value);
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
            onValueChange={(value) => updateSliderHeader(value)}
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
