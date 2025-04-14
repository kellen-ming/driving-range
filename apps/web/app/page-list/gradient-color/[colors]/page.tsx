import clsx from "clsx";

export interface ColoBackgrounDBoardProps {
  params: Record<string, string>
}

export default function ColoBackgrounDBoard(props: ColoBackgrounDBoardProps) {
  const { params } = props;
  const { colors } = params;
  if(!colors) return 

  const formatColors = JSON.parse(colors) as string[]
  let gradientClasses = '';
  if(formatColors.length > 2) {
    gradientClasses = `from-[${formatColors[0]}] via-[${formatColors[1]}] to-[${formatColors[2]}]`
  } else {
    gradientClasses = `from-[${formatColors[0]}] to-[${formatColors[1]}]`
  }
  
  const bgBaseClasses = `
    min-h-screen
    bg-gradient-to-b
    justify-center
    items-center
  `

  const baseClasses = `
          flex p-3 
          text-white 
          justify-between 
          rounded-2xl 
          bg-gradient-to-r 
          from-[#EF6837] 
          to-[#114468]  
          shadow-xl
        `
  return (
    <div className={clsx(bgBaseClasses, gradientClasses)}>
      <div
        className={clsx(baseClasses, gradientClasses)}>
        {
          formatColors?.map((color, index) => (
            <span key={index}>{color}</span>
          ))
        }
      </div>
    </div>
    
  );
}
