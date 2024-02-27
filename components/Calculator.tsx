"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import SlideDisplay from "./SlideDisplay";

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

const formSchema = z.object({
  purchasePrice: z.number().positive(),
  downPayment: z.number().positive(),
  repaymentTime: z.number().positive(),
  interestRate: z.number().positive(),
});

function Calculator() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      purchasePrice: 10000,
      downPayment: 10000,
      repaymentTime: 10,
      interestRate: 0.5,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    form.setValue("purchasePrice", values.purchasePrice);
    console.log(values);

    /* Formula for mortgage payments: M = P[r(1+r)^n/((1+r)^n)-1)]
    M = the total monthly mortgage payment
    P = the principal loan amount(Purchase Price - Down Payment)
    r = your monthly interest rate
    n = number of payments over the loan’s lifetime. */
  }

  // Slider change function
  function slideChange(
    value: number[],
    name: "purchasePrice" | "downPayment" | "repaymentTime" | "interestRate"
  ) {
    console.log(value[0]);
    form.setValue(name, value[0]);
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
                render={() => (
                  <SlideDisplay
                    name="purchasePrice"
                    slideChange={slideChange}
                    max={1000000}
                    min={10000}
                    step={10000}
                    className="w-64"
                    formDescription="The total amount of the loan"
                    formLabel="Purchase Price : $"
                  />
                )}
              />
              <FormField
                control={form.control}
                name="downPayment"
                render={() => (
                  <SlideDisplay
                    name="downPayment"
                    slideChange={slideChange}
                    max={1000000}
                    min={10000}
                    step={10000}
                    className="w-64"
                    formDescription="The Down Payment Amount"
                    formLabel="Down Payment : $"
                  />
                )}
              />
              <FormField
                control={form.control}
                name="repaymentTime"
                render={() => (
                  <SlideDisplay
                    name="repaymentTime"
                    slideChange={slideChange}
                    max={40}
                    min={10}
                    step={5}
                    className="w-64"
                    formDescription="The total length of repayment years"
                    formLabel="Repayment Years: "
                  />
                )}
              />
              <FormField
                control={form.control}
                name="interestRate"
                render={() => (
                  <SlideDisplay
                    name="interestRate"
                    slideChange={slideChange}
                    max={10}
                    min={0.5}
                    step={0.5}
                    className="w-64"
                    formDescription="The total length of repayment years"
                    formLabel="Repayment Years: "
                  />
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
