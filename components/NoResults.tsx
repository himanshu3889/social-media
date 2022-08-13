import React from 'react';


interface IProps {
  text: string;
}

const NoResults = ({ text }: IProps) => {
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-[92vh]">
      <p className="text-6xl">
        <i className="fa-solid fa-photo-film text-red-600"></i>
      </p>
      <p className="mt-2 text-2xl text-center font-semibold">{text}</p>
    </div>
  );
};

export default NoResults;
