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
import { pb } from "../../../../lib/pocketbase";
import { useToast } from "../../../../hooks/use-toast";
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters",
  }),
  email: z.string().min(2, {
    message: "Email must be at least 2 characters",
  }),
  password: z.string().min(8, {
    message: "Password must be least 8 characters",
  }),
  passwordConfirm: z.string().min(8, {
    message: "Password confirm must be least 8 characters",
  }),
});
const RegisterPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = async(data: z.infer<typeof formSchema>) => {

    setIsLoading(true)
    try {

      const postdata = {
        username: data.username,
        email: data.email,
        emailVisibility: true,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
        name: data.name
      };
      const record = await pb.collection('users').create(data);
      toast({
        variant: "success",
        title: "Registered Success",
      })
      router.refresh();
      router.push("/auth/login");
      
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password Confirm</FormLabel>
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
            <>Register</>
          )}
        </Button>
      </form>
      <div className="mt-8">
        <Label className="flex flex-col items-center">
          Already have an account
        </Label>
        <Link href="/auth/login" className="mt-10 text-slate-500">
          Click here to login
        </Link>
      </div>
    </Form>
  );
};

export default RegisterPage;
