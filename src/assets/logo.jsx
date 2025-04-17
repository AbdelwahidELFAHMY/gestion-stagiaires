import { GraduationCap } from 'lucide-react';
import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center">
    <GraduationCap className="h-10 w-10 text-indigo-600" />
      <div className='ml-1 px-1'>
      <h1 className="text-size20 font-bold text-indigo-500" style={{ fontFamily: "'Dynalight', cursive", letterSpacing: '0.2em' }}>
      StellarStage
        </h1>
        <p className="text-size10 font-mono text-glow">
          Trainee Management Platform
        </p>
      </div>
    </div>
  );
};

export default Logo;
