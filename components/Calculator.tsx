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
    form.setValue("purchasePrice", values.purchasePrice);
    console.log(values);
  }

  // Slider change function
  function slideChange(value: number[]) {
    console.log(value[0]);
    form.setValue("purchasePrice", value[0]);
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
