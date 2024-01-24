import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

interface TicTacToeInfoProps {
  handleReset: (type: string) => void,
  playersInfo: {
    start: boolean,
    player1Points: number,
    player2Points: number,
  },
  isPlaying: number,
  winner: string,
}

const TicTacToeInfo = (props: TicTacToeInfoProps) => {
  const navigate = useNavigate()
  const player1Ref = useRef<HTMLImageElement | null>(null)
  const player2Ref = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    highlightPlayer(props.isPlaying)

    if (props.winner === 'p1') {
      highlightPlayer(1)
    } else if (props.winner === 'p2') {
      highlightPlayer(2)
    }
  }, [props.isPlaying, props.winner])

  const highlightPlayer = (player: number) => {
    if (player === 1) {
      player1Ref.current?.classList.add('blinking')
      player2Ref.current?.classList.remove('blinking')
    } else {
      player1Ref.current?.classList.remove('blinking')
      player2Ref.current?.classList.add('blinking')
    }
  }

  return (
    <div className="w-full mb-12 flex items-center justify-center flex-col">
      <div className="md:w-8/12 w-11/12 h-24 mb-10 border-2 border-indigo-500 rounded-lg flex items-center justify-between flex-row">
        <div className="pl-10 flex items-center justify-center flex-col">
          <img ref={player1Ref} className="scale-90 md:scale-75" src="/assets/images/tictactoe/player_1.png" alt="player1_points" />
          <span className="text-red-500 font-bold text-lg">{props.playersInfo.player1Points}</span>
        </div>
        <div className="pr-10 flex items-center justify-center flex-col">
          <img ref={player2Ref} className="scale-90 md:scale-75" src="/assets/images/tictactoe/player_2.png" alt="player2_points" />
          <span className="text-indigo-500 font-bold text-lg">{props.playersInfo.player2Points}</span>
        </div>
      </div>
      <div className="-mt-5 flex items-center justify-center flex-col gap-4">
        <button type="button" onClick={() => props.handleReset('reset')}>
          <img className="scale-75" src="/assets/images/tictactoe/reset.png" alt="reset_game" />
        </button>
        <button type="button" onClick={() => navigate('/')}>
          <img className="scale-75" src="/assets/images/tictactoe/back.png" alt="reset_game" />
        </button>
      </div>
    </div>
  )
}

export default TicTacToeInfo
