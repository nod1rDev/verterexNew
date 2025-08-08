import React from "react";
import NotFound from "./Components/NotFound";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | ApexBart",
  description: "The page you are looking for could not be found.",
};
function NotFoundd() {
  return (
    <div>
      <NotFound />
    </div>
  );
}

export default NotFoundd;
