"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import SlideDisplay from "./SlideDisplay";

import { Form, FormField } from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CalculationDisplay from "./CalculationDisplay";
import { useState } from "react";

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

  const [loanAmount, setLoanAmount] = useState("--");
  const [loanMonthlyPayment, setLoanMonthlyPayment] = useState("--");

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    form.setValue("purchasePrice", values.purchasePrice);

    let loanAmount = values.purchasePrice - values.downPayment;

    if (loanAmount < 0) {
      setLoanAmount("Purchase Price must be greater than to Down Payment");
      setLoanMonthlyPayment("--");
    } else {
      setLoanAmount(`$${loanAmount.toLocaleString()}`);
      let r = values.interestRate / 100;
      let numerator = r * (1 + r) ** (values.repaymentTime * 12);
      let denominator = (1 + r) ** (values.repaymentTime * 12) - 1;
      let calculator = loanAmount * (numerator / denominator);
      calculator = parseFloat(calculator.toFixed(2));
      setLoanMonthlyPayment(`$${calculator.toLocaleString()}`);
      /* Formula for mortgage payments: M = P[r(1+r)^n/((1+r)^n)-1)]
      M = the total monthly mortgage payment
      P = the principal loan amount(Purchase Price - Down Payment)
      r = your monthly interest rate
      n = number of payments over the loan’s lifetime. */
    }
  }

  // Slider change function
  function slideChange(
    value: number[],
    name: "purchasePrice" | "downPayment" | "repaymentTime" | "interestRate"
  ) {
    form.setValue(name, value[0]);
  }

  return (
    <div className="flex flex-col items-center justify-center bg-transparent  min-w-96 mt-5 mb-10">
      <Card className="flex flex-col items-center justify-center">
        <CardHeader className="flex flex-col items-center justify-center">
          <CardTitle>Mortgage Calculator</CardTitle>
          <CardDescription>
            Online Calculator for mortgage payments
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col  items-center justify-center no-padding">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 flex flex-col items-center justify-center no-padding "
            >
              <div className="flex flex-wrap ">
                <div className="w-full sm:w-1/1 lg:w-1/2 flex items-center justify-center mt-20">
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
                </div>
                <div className="w-full sm:w-1/1 lg:w-1/2 flex items-center justify-center mt-20">
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
                </div>
                <div className="w-full sm:w-1/1 lg:w-1/2 flex items-center justify-center mt-20">
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
                </div>
                <div className="w-full sm:w-1/1 lg:w-1/2 flex items-center justify-center mt-20">
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
                        formDescription="Mortgage Interest Rate"
                        formLabel="Interest Rate: "
                      />
                    )}
                  />
                </div>
              </div>
              <Button type="submit">Submit</Button>
              <CalculationDisplay data={loanAmount} header="Loan Amount" />
              <CalculationDisplay
                data={loanMonthlyPayment}
                header="Estimated Monthly Payment"
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Calculator;
