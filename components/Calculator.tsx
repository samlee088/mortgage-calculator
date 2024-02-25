"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

const formSchema = z.object({
  purchasePrice: z.number().positive({ message: "this👏is👏too👏big" }),
});

function Calculator() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      purchasePrice: 1,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const [purchasePriceDisplay, setPurchasePriceDisplay] = useState(1);

  // Slider change function
  function slideChange(value: number[]) {
    console.log(value[0]);
    setPurchasePriceDisplay(value[0]);
  }

  return (
    <div className="flex flex-col items-center justify-center bg-transparent  min-w-96">
      Calculator
      <Card className="flex flex-col items-center justify-center">
        <CardHeader className="flex flex-col items-center justify-center mb-20">
          <CardTitle>Mortgage Calculator</CardTitle>
          <CardDescription>
            Online Calculator for mortgage payments
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center mb-20 no-padding">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 flex flex-col items-center justify-center mb-20 no-padding "
            >
              <FormField
                control={form.control}
                name="purchasePrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Purchase Price : {purchasePriceDisplay}
                    </FormLabel>
                    <FormControl>
                      {/* <Input placeholder="shadcn" {...field} />
                       */}
                      <div className="flex items-center">
                        <Slider
                          onValueChange={slideChange}
                          max={100000}
                          min={100}
                          step={100}
                          className="w-64"
                        />
                        <div className="w-10 text-center"></div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      The total amount of the loan
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Calculator;
