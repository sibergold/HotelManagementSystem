"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Label } from "../../../../components/ui/label";
import Link from "next/link";
import { useToast } from "../../../../hooks/use-toast";
import { pb } from "../../../../lib/pocketbase";
const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters",
  }),
  password: z.string().min(2, {
    message: "Password must be least 2 characters",
  }),
});
const LoginPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

 const onSubmit = async(data: z.infer<typeof formSchema>) => {
 
     setIsLoading(true)
     try {
 
       
      const authData = await pb.collection('users').authWithPassword(data.email,data.password)
   
       toast({
         variant: "success",
         title: "Login Success",
       })
       router.refresh();
       router.push("/");
       
     } catch (error) {
 
       toast({
         variant: "destructive",
         title: `Something went wrong : ${error}`,
       })
       
     }
     finally{
       setIsLoading(false)
     }
     
 
    
   }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-4/5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="deneme@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" /> Loading
            </>
          ) : (
            <>Login</>
          )}
        </Button>
      </form>
      <div className="mt-8">
        <Label className="flex flex-col items-center">
          Dont have an account
        </Label>
        <Link href="/auth/register" className="mt-10 text-slate-500">
        Click here to create a new account
        </Link>
      </div>
    </Form>
  );
};

export default LoginPage;
