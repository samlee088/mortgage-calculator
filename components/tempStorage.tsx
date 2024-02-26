<FormField
                control={form.control}
                name="purchasePrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Purchase Price : ${purchasePriceDisplay}
                    </FormLabel>
                    <FormControl>
                      {/* <Input placeholder="shadcn" {...field} />
                       */}
                      <div className="flex items-center">
                        <Slider
                          onValueChange={slideChange}
                          max={1000000}
                          min={10000}
                          step={10000}
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