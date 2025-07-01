import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,

  DialogHeader,

  DialogTitle,

  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addFlashSale } from "@/services/FlashSale";
// import { addFlashSale } from "@/services/FlashSale";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
// import { toast } from "sonner";

 
type ISelect={
select:string[]
}





const Discount = ({select}:ISelect) => {

  const form = useForm();
  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit :SubmitHandler<FieldValues> = async (data) => {
    const modifiedData={
        product:[...select],
        discountPercentage:parseFloat(data?.discountPercentage)
    }
    console.log(modifiedData);
    
  try {
      const res = await addFlashSale(modifiedData);
      console.log(res);
      
      if (res.success) {
        toast.success(res.message);
        // setSelectedIds([]);
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
    }


  }



  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={!select?.length} size="sm">
          Add Flash Sale
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Flash Sale</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            className="space-y-3"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="discountPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      value={field.value || ""}
                      className="rounded-sm w-full"
                      placeholder="Discount Percentage"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full rounded-sm">
              {isSubmitting ? "Adding...." : "Add"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Discount;