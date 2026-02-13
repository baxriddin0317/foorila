import React from 'react'

interface props {
    title: string;
}

const Title = ({title}: props) => {
  return (
    <h2 className="inline capitalize text-black dark:text-white text-lg font-bold p-1 border-r border-brand-border">
      {title}
    </h2>
  )
}

export default Title