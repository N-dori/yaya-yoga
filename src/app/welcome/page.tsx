
import WelcomeNewUser from '../cmps/WelcomeNewUser'


export default  function page() {


    return (
      <section className='welcome-first-page flex-col gap1 gc2'>
      <h1 className='tac mt-1'>ברוכ/ה הבא/ה</h1>
      <h2 className='tac mt-1'> 🙏מודים לך על הרשמתך</h2>
      <WelcomeNewUser/>
      </section>
    )
}