import React from 'react';
import Todolist from './Todolist';

interface TitlePageProps {
    title?: string;
}

const TitlePage: React.FC<TitlePageProps> = ({title}) => {
  return (
    <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">{title}</h5>
        <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
            View all
        </a>
        <Todolist />
    </div>
  )
}

export default TitlePage;