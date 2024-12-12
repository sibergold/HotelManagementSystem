import React from "react";
import ImageVawes from "../../../components/ImagesVawes";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import Image from "next/image";
import { Hotel } from "../../../types/types";
import { Skeleton } from "../../../components/ui/skeleton";
import HeroForm from "./HeroForm";

interface FooterProps{
  data:Hotel;
  loading:boolean;
}

const Footer = ({data,loading}:FooterProps) => {
  if(loading ||(!loading && data.length === 0))
  {
    return (
      <div className="relative text-white]">
        <div className="z-30 absolute inset-0">
         <ImageVawes myclassName="absolute -top-5 transform rotate-180"/>
        </div>
        <div className="z-20 relative h-96">
          <Skeleton className="w-full h-full bg-slate-600"/>
        </div>
      </div>
    )
  }
  return (
    <div className="relative text-white">
      <div className="z-10 absolute inset-0">
        <ImageVawes myclassName="absolute -top-5 transform rotate-180" />
      </div>
      <div className="z-0 absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: 'url(/slider/1.jpg)' }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-75"></div>
      </div>
      <div className="z-20 relative">
        <div className="container mx-auto pt-24 pb-16 px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Subscribe newsletter</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
              error deserunt natus? Doloremque numquam distinctio, ut nemo
              voluptate fugiat molestias, nisi, illo similique quaerat
              aspernatur id vitae blanditiis consectetur neque.
            </p>
            <div className="mt-4 flex justify-center ml-auto">
              <Input placeholder="Your Email Address" className="max-w-lg" />
              <Button variant="mybutton">Subscribe</Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Col Span 1 */}
            <div>
              <div className="w-24 py-4 px-3 rounded-xl bg-white">
                <Image
                  src="/logo.png"
                  alt="logo"
                  width={500}
                  height={500}
                  className="w-full"
                />
              </div>
              <p className="text-gray-400 mt-2">
                {data.summary.replace(/<\/?[^>]+(>|$)/g,'')}
              </p>
            </div>
            {/* Col Span 2 */}
            <div>
              <h3 className="text-xl font-bold mb-4">Rooms</h3>
              <ul className="space-y-2">
                <li>
                  <a className="text-gray-400 hover:text-white" href="#">
                    Hotel One Suite Turkey Ayvalık Lux Spa Wellness
                  </a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-white" href="#">
                    Hotel One Suite Turkey Ayvalık Lux Spa Wellness
                  </a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-white" href="#">
                    Hotel One Suite Turkey Ayvalık Lux Spa Wellness
                  </a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-white" href="#">
                    Hotel One Suite Turkey Ayvalık Lux Spa Wellness
                  </a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-white" href="#">
                    Hotel One Suite Turkey Ayvalık Lux Spa Wellness
                  </a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-white" href="#">
                    Hotel One Suite Turkey Ayvalık Lux Spa Wellness
                  </a>
                </li>
              </ul>
            </div>
            {/* Col Span 3 */}
            <div>
              <h3 className="text-xl font-bold mb-4 space-y-2">Contact</h3>
              <p className="text-gray-400">
                <span className="block">
                  {data.location}
                </span>
                <span className="block">{data.contact_phone}</span>
                <span className="block">{data.contact_email}</span>
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-400">@Omer Meric</p>
            <p className="text-gray-400">
              Designed by <span className="text-yellow-500">Omer Meric</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
