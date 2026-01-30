import { GraduationCap } from 'lucide-react';
import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center">
    <GraduationCap className="h-10 w-10 bg-transparent dark:text-blue-400 text-blue-700" />
      <div className='ml-1 px-1'>
      <h1 className="text-size15 font-bold dark:bg-gradient-to-r dark:from-blue-300 dark:to-teal-500 bg-gradient-to-r from-blue-700 via-blue-500 to-teal-500 bg-clip-text text-transparent" style={{ fontFamily: "'Krona One', 'sans-serif'", letterSpacing: '0.1em' }}>
      StageLik
        </h1>
        <p className="text-size10 font-mono text-glow">
          Intern Management Platform
        </p>
      </div>
    </div>
  );
};

export default Logo;
