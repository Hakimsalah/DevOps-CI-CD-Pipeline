import React from "react";
import Faqs from "./faqs";
import Telechar from "./telechar";

const Faqs1 = () => {
  return (
    <div className="w-screen bg-gray-50 py-12">
      <div className="mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Faqs />
          <Telechar />
        </div>
      </div>
    </div>
  );
};

export default Faqs1;
