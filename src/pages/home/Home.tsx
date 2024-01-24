import { useNavigate } from 'react-router-dom'
import './Home.css'

const Home = () => {
  const navigate = useNavigate()

  const handleClick = (route: string) => {
    navigate(route)
  }

  return (
    <div className="w-full md:h-screen min-h-screen bg-gray-900 flex justify-center items-center flex-col screen-mobile">
      <div className="md:top-20 -mt-60 h-screen md:-mb-16 flex justify-center items-center flex-col gap-y-14">
        <div className="flex justify-center items-center relative">
          <img className="object-cover px-8" src="/assets/images/welcome.png" alt="welcome" />
        </div>
        <div className="w-2/3 flex justify-center items-center relative">
          <img className="object-cover px-8" src="/assets/images/choose_a_game.png" alt="choose_a_game" />
        </div>
      </div>
      <div className="pb-12 flex justify-center items-center flex-col gap-x-20 lg:flex-row gap-y-10 md:mt-8 -mt-60">
        <div className="game-container">
          <button
            id="game1"
            type="button"
            onClick={() => handleClick('/tictactoe')}
            className="md:w-64 w-40 md:h-80 h-52 rounded border-dashed border-2 border-blue-500 hover:cursor-pointer hover:w-72 hover:h-96 transition-all duration-500"
          >
            <img className="object-cover px-8 scale-100" src="/assets/images/tictactoe/tictactoe_title.png" alt="tictactoe_title" />
          </button>
        </div>
        <div className="game-container">
          <button
            id="game2"
            type="button"
            onClick={() => handleClick('/rockpaperscissors')}
            className="md:w-64 w-40 md:h-80 h-52 rounded border-dashed border-2 border-blue-500 hover:cursor-pointer hover:w-72 hover:h-96 transition-all duration-500"
          >
            <div className="w-full flex justify-center items-center flex-col">
              <img className="object-cover px-8 scale-100" src="/assets/images/rockpaperscissors/rock.png" alt="rock_title" />
              <img className="object-cover px-8 scale-100" src="/assets/images/rockpaperscissors/paper.png" alt="paper_title" />
              <img className="object-cover px-8 scale-100" src="/assets/images/rockpaperscissors/scissors.png" alt="scissors_title" />
            </div>
          </button>
        </div>
        <div className="game-container">
          <button
            id="game3"
            type="button"
            onClick={() => handleClick('genius')}
            className="md:w-64 w-40 md:h-80 h-52 rounded border-dashed border-2 border-blue-500 hover:cursor-pointer hover:w-72 hover:h-96 transition-all duration-500"
          >
            <img className="object-cover px-8 scale-100" src="/assets/images/genius/title_white.png" alt="genius_title" />
          </button>
        </div>
      </div>
      <div className="w-full flex justify-center items-center mb-8">
        <button
          type="button"
          className="bg-blue-500 px-14 py-4 text-white font-semibold rounded-md duration-500 hover:bg-white hover:text-blue-500"
          onClick={() => handleClick('bio')}
        >
          Who make this?
        </button>
      </div>
    </div>
  )
}

export default Home
