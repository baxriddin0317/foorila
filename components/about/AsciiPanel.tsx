import DonutAnimation from '../DonutAnimation'

const AsciiPanel = () => {
  return (
    <div>
      <h2 className="inline capitalize text-black dark:text-white text-lg font-bold p-1 border-r border-brand-border">
        AI 3D ASCII Art Generator
      </h2>
      <DonutAnimation />
    </div>
  )
}

export default AsciiPanel