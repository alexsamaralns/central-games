import Home from '../pages/home/Home.tsx'
import TicTacToe from '../pages/tic-tac-toe/TicTacToe.tsx'
import RockPaperScissors from'../pages/rock-paper-scissors/RockPaperScissors.tsx'
import Genius from '../pages/genius/Genius.tsx'
import Bio from '../pages/bio/Bio.tsx'

const routes = [
  {
    path: '/',
    name: 'Home',
    element: <Home />
  },
  {
    path: '/tictactoe',
    name: 'TicTacToe',
    element: <TicTacToe />
  },
  {
    path: '/rockpaperscissors',
    name: 'RockPaperScissors',
    element: <RockPaperScissors />
  },
  {
    path: '/genius',
    name: 'Genius',
    element: <Genius />
  },
  {
    path: '/bio',
    name: 'Bio',
    element: <Bio />
  },
]

export default routes
