import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search files..."
        className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg 
                 text-gray-200 placeholder-gray-400 focus:outline-none focus:border-purple-500
                 focus:ring-1 focus:ring-purple-500 transition-all duration-200"
      />
    </div>
  );
}