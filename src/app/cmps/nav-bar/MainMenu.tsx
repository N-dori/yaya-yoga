
import MainMenuList from './MainMenuList'


type MainMenuProps = {
  isShown: boolean
  setIsShown: (b: boolean) => void
}

export default function MainMenu({setIsShown, isShown }: MainMenuProps) {

  const mainMenuListProps = {
    isShown,
    setIsShown
  }

  return (
    <section style={isShown?{transform: `translateY(4em)`}:{}} className='menu-container '>

      <MainMenuList {...mainMenuListProps} />

    </section>
  )
}