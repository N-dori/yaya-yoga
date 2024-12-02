
type CloseSvgProps = {
  setIsShown:(b:boolean) => void
}

export default function CloseSvg({setIsShown}: CloseSvgProps) {
  
  return (
<svg onClick={()=>setIsShown(false)} className="pointer" xmlns="http://www.w3.org/2000/svg" 
height="30px" viewBox="0 -960 960 960" width="30px" fill={'var(--clr1)'}><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>  )
}