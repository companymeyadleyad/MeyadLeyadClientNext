import React from "react";

interface PageTitleProps {
  text: string;
  className?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ text, className = "" }) => {
  return <h1 className={`page-title ${className}`}>{text}</h1>;
};

export default PageTitle;
