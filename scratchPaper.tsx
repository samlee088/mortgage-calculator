import { formatBigInt, parseBigInt } from "bigint-utils"; // You'll need to install this package.

const Calculator = () => {
  // ...

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
                    <FormLabel>Purchase Price</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Slider
                          value={[field.value, field.value]}
                          onChange={(value) => {
                            field.onChange(parseBigInt(value[0].toString(), 10));
                          }}
                          max={100000000}
                          step={1}
                          className="w-64"
                        />
                        <div className="w-10 text-center">
                          {formatBigInt(field.value, 10)}
                        </div>
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
};

export default Calculator;