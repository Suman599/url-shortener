import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const[longUrl,setLongUrl]=useState();
  const navigate=useNavigate();
  const handleShorten=(e)=>{
    e.preventDefault();
    if(longUrl) navigate(`/auth?createNew=${longUrl}`);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
        The only URL Shortener <br /> you&rsquo;ll ever need!👇
      </h2>
      <form onSubmit={handleShorten} className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2">
        <Input
          type="url"
          value={longUrl}
          placeholder="Enter your loooong URL"
          onChange={(e)=>setLongUrl(e.target.value)}
          className="h-full flex-1 py-4 px-4"
        />
        <Button className="h-full" type="submit" variant="destructive">Shorten!</Button>
      </form>
      <img src="src\public\banner.jpeg" alt="banner" className="w-full my-11 md:px-11" />
      <Accordion type="multiple" collapsible className="w-full md:px-11">
        <AccordionItem value="item-1">
          <AccordionTrigger>How does Trimmr URL shortener works?</AccordionTrigger>
            <AccordionContent>
              When you enter a long URL, our system generates a shorter version of that url.This shortedned version redirects to the original long URL when accessed.
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Do I need an account to use the app?</AccordionTrigger>
            <AccordionContent>
              Yes creating an account allows you to manage your URL's, views its analytics and customise your short URL's.
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>How can I ask if I have further doubts?</AccordionTrigger>
            <AccordionContent>
              If you have further questions you can reach out to us at chakrabortysuman5999@gmail.com.
            </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default Landing;
