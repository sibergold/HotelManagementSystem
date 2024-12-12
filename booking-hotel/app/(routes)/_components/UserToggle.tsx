"use client";
import { UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const UserToggle = () => {
 const [user, setUser] = useState(null);
   const router = useRouter();
 
   useEffect(()=>{
     const fetchUser = async()=>{
       const authData = localStorage.getItem("pocketbase_auth");
       if(authData){
         const {token, record} = JSON.parse(authData);
         setUser(record)
       }
     }
     fetchUser();
   },[])
  return (
    <div>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex text-white text-xs items-center justify-center"><UserIcon className="text-white" />{user.name}</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={'/my-reservation'}>
            <DropdownMenuItem>My Reservation</DropdownMenuItem>  
            </Link>  
            <DropdownMenuItem onClick={()=>{localStorage.removeItem("pocketbase_auth");setUser(null); router.refresh(); router.push('/')}}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/auth/login">
          <UserIcon className="text-white" />
        </Link>
      )}
    </div>
  );
};

export default UserToggle;
