import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const brewMethods = [
  "Pour Over",
  "French Press",
  "AeroPress",
  "Cold Brew",
  "Moka Pot",
  "Percolator",
  "Siphon/Vacuum Pot",
  "Capsule",
  "Espresso Machine",
  "Manual Espresso",
] as const;

const formSchema = z.object({
  beanId: z.string(),
  method: z.enum(brewMethods),
  date: z.date(),
  dose: z.preprocess((val) => Number(val), z.number()),
  yield: z.preprocess((val) => Number(val), z.number()),
  grindSize: z.string(),
  brewTime: z.preprocess((val) => Number(val), z.number()),
  preinfusionTime: z.preprocess((val) => Number(val), z.number()).optional(),
  bloomTime: z.preprocess((val) => Number(val), z.number()).optional(),
  leverPressure: z.preprocess((val) => Number(val), z.number()).optional(),
  temperature: z.preprocess((val) => Number(val), z.number()),
  notes: z.string().optional(),
  rating: z.number().min(1).max(5),
});

type FormValues = z.infer<typeof formSchema>;

interface Bean {
  id: number;
  name: string;
}

interface NewBrewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  beans: Bean[];
}

export function NewBrewModal({ open, onOpenChange, beans }: NewBrewModalProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      beanId: "",
      method: "Pour Over",
      date: new Date(),
      dose: 0,
      yield: 0,
      grindSize: "",
      brewTime: 0,
      temperature: 0,
      rating: 3,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // TODO: Implement brew creation logic
      console.log(data);
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating brew:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white p-6 my-4">
        <DialogHeader className="pb-4">
          <DialogTitle>Record New Brew</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="beanId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bean</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a bean" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white border rounded-md shadow-md">
                      {beans.map((bean) => (
                        <SelectItem
                          key={bean.id}
                          value={bean.id.toString()}
                          className="cursor-pointer"
                        >
                          {bean.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brew Method</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white border rounded-md shadow-md">
                      {brewMethods.map((method) => (
                        <SelectItem
                          key={method}
                          value={method}
                          className="cursor-pointer"
                        >
                          {method}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Brew Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 bg-white border rounded-md shadow-md"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dose (g)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="yield"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Yield (g)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="grindSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grind Size</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="brewTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brew Time (s)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="temperature"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Temperature (°C)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="preinfusionTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preinfusion Time (s)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bloomTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bloom Time (s)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {form.watch("method") === "Manual Espresso" && (
              <FormField
                control={form.control}
                name="leverPressure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lever Pressure (bar)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <Slider
                      min={1}
                      max={5}
                      step={1}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-coffee-600 hover:bg-coffee-700 text-white"
            >
              Save Brew
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
