import React from 'react';
import { Link } from 'react-router-dom';

interface INavigationLinkProps {
  href: string;
  text: string;
}

export const NavigationLink: React.FC<INavigationLinkProps> = ({ href, text }) => {
  return (
    <Link
      className="py-2.5 px-4 hover-bg rounded focus-within:outline-slate-400"
      to={href}
    >
      {text}
    </Link>
  );
};