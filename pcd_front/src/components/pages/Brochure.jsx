import React, { useState } from "react";
import Footer from '../footer/footer';
import ContactSection from "../Acceuil/horraire";
import ChatBot from "../ChatBot/ChatBot";
import Conseil from "./conseil";
import Telechar from "./telechar";
import Faqs1 from "./faqs1";
import Carousel from "./carousel";

export default function Brochure() {
  return (
    <div>
      <Carousel/>  
      <Conseil/>
      <Faqs1/>
      <Footer/>
      <ChatBot/>
    </div>
  );
}

{/*<Conseil/>
    <ContactSection/>
    <ChatBot/><Footer/>*/}