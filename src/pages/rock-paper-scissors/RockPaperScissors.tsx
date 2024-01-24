import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './RockPaperScissors.css'

let timer = 0
let judgeTimer = 0
let increment = 1
let playing = false
let auxHandPlayer = 0
let auxHandComputer = 0

const HANDS_PATH = [
  '/assets/images/rockpaperscissors/rock_hand.png',
  '/assets/images/rockpaperscissors/paper_hand.png',
  '/assets/images/rockpaperscissors/scissors_hand.png',
]

const JUDGE_PATH = [
  '/assets/images/rockpaperscissors/normal_1.png',
  '/assets/images/rockpaperscissors/normal_2.png',
  '/assets/images/rockpaperscissors/normal_3.png',
]

const TimeSquare = () => {
  return (
    <div className="w-4 h-8 bg-red-500"></div>
  )
}

const RockPaperScissors = () => {
  const navigate = useNavigate()
  const timeCounterRef = useRef<HTMLDivElement | null>(null)
  const [timeSquares, setTimeSquares] = useState<JSX.Element[]>([])
  const [handPlayer, setHandPlayer] = useState<number>(0)
  const [handComputer, setHandComputer] = useState<number>(0)
  const [judge, setJudge] = useState<number>(0)
  const [winner, setWinner] = useState<string>('')
  const [pointsPlayer, setPointsPlayer] = useState<number>(0)
  const [pointsComputer, setPointsComputer] = useState<number>(0)

  useEffect(() => {
    timer = 0
    judgeTimer = 0
    increment = 1
    playing = false
    auxHandPlayer = 0
    auxHandComputer = 0
  }, [])

  useEffect(() => {
    if (winner === 'Player wins!') setPointsPlayer(pointsPlayer + 1)
    if (winner === 'Computer wins!') setPointsComputer(pointsComputer + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winner])

  const startGame = () => {
    if (timer < 10) {
      setTimeout(() => {
        timer += 1
        judgeTimer += increment

        setTimeSquares((prevSquares) => [...prevSquares, <TimeSquare key={timer} />])

        auxHandComputer = Math.floor(Math.random() * 3)
        setHandComputer(auxHandComputer)

        if (judgeTimer === 2 || judgeTimer === 0) increment *= -1

        setJudge(judgeTimer)

        startGame()
      }, 1000)
    } else {
      playing = false
      timer = 0
      checkResult()
    }
  }

  const checkResult = () => {
    // 0 equivalent rock
    // 1 equivalent paper
    // 2 equivalent scissors

    if (auxHandPlayer === auxHandComputer) {
      setWinner('Draw!')
    } else if (auxHandPlayer === 0 && auxHandComputer === 1) {
      setWinner('Computer wins!')
    } else if (auxHandPlayer === 0 && auxHandComputer === 2) {
      setWinner('Player wins!')
    } else if (auxHandPlayer === 1 && auxHandComputer === 0) {
      setWinner('Player wins!')
    } else if (auxHandPlayer === 1 && auxHandComputer === 2) {
      setWinner('Computer wins!')
    } else if (auxHandPlayer === 2 && auxHandComputer === 0) {
      setWinner('Computer wins!')
    } else if (auxHandPlayer === 2 && auxHandComputer === 1) {
      setWinner('Player wins!')
    }
  }

  const changeHand = (change: string) => {
    if (change === 'back') {
      if (handPlayer === 0) {
        auxHandPlayer = 2
      } else {
        auxHandPlayer = auxHandPlayer - 1
      }
    } else {
      if (handPlayer === 2) {
        auxHandPlayer = 0
      } else {
        auxHandPlayer = auxHandPlayer + 1
      }
    }
    setHandPlayer(auxHandPlayer)
  }

  const resetGame = () => {
    timer = 0
    judgeTimer = 0
    increment = 1
    playing = false
    auxHandPlayer = 0
    auxHandComputer = 0
    setTimeSquares([])
    setHandPlayer(0)
    setHandComputer(0)
    setJudge(0)
    setWinner('')
    setPointsPlayer(0)
    setPointsComputer(0)
  }

  return (
    <div className="w-full h-screen bg-gray-900 flex justify-between items-center flex-col">
      <div className="absolute left-2 hover:cursor-pointer">
        <img className="md:w-28 w-16" src="/assets/images/rockpaperscissors/arrow_back.png" onClick={() => navigate('/')} alt="arrow_back" />
      </div>
      <div className="title-rockpaperscissors w-full flex justify-center items-center flex-col mt-8 gap-3">
        <img className="rock-title fadeIn animate w-44 h-11 object-cover px-8" src="/assets/images/rockpaperscissors/rock.png" alt="rock_title" />
        <img className="paper-title fadeIn animate w-52 h-11 object-cover px-8" src="/assets/images/rockpaperscissors/paper.png" alt="paper_title" />
        <img className="scissors-title fadeIn animate w-64 h-11 object-cover px-8" src="/assets/images/rockpaperscissors/scissors.png" alt="scissors_title" />
      </div>
      <div className="w-11/12 h-auto mt-52 border absolute bg-indigo-500 flex justify-between items-center flex-col rounded-lg outline-none">
        <div className="w-full mb-5 flex justify-end items-center flex-row mt-3 mr-5">
          <span className="text-xl font-semibold mr-4">TIME</span>
          <div ref={timeCounterRef} className="w-[169px] h-10 bg-black flex justify-end items-center flex-row px-1">
            {timeSquares}
          </div>
        </div>
        <div className="w-full flex justify-center items-center flex-row">
          <div className="w-full flex justify-center items-start flex-col pl-5 md:pl-10">
            <img className="balloon-player" src="/assets/images/rockpaperscissors/balloon.png" alt="balloon_p1" />
            <img
              className="back-arrow"
              src="/assets/images/rockpaperscissors/arrow_left.png"
              alt="arrow_left"
              onClick={() => {
                if (playing) changeHand('back')
              }}
            />
            <img className="hand-player" src={HANDS_PATH[handPlayer]} alt="hand_p1" />
            <img
              className="next-arrow"
              src="/assets/images/rockpaperscissors/arrow_right.png"
              alt="arrow_right"
              onClick={() => {
                if (playing) changeHand('next')
              }}
            />
            <span className="text-xl mt-5 md:text-3xl font-semibold">Player</span>
            <span className="text-base mt-5 font-semibold">{`Score: ${pointsPlayer}`}</span>
          </div>
          <div className="w-full flex justify-center items-center">
            {winner.length === 0 && (
              <img className="absolute w-16 bottom-[83px]" src={JUDGE_PATH[judge]} alt="judge" />
            )}
            {winner === 'Draw!' && (
              <img className="absolute w-16 bottom-[83px]" src={JUDGE_PATH[judge]} alt="judge" />
            )}
            {winner.length > 0 && winner !== 'Draw!' && (
              <img
                className={winner === 'Computer wins!' ? 'absolute w-[83px] bottom-[83px]' : 'absolute w-[83px] bottom-[83px] -scale-x-100'}
                src='/assets/images/rockpaperscissors/winner.png'
                alt="judge"
              />
            )}
          </div>
          <div className="w-full h-full flex justify-center items-end flex-col pr-5 md:pr-10">
            <img className="balloon-computer" src="/assets/images/rockpaperscissors/balloon.png" alt="balloon_computer" />
            <img className="hand-computer" src={HANDS_PATH[handComputer]} alt="hand_computer" />
            <span className="text-xl mt-5 md:text-3xl font-semibold">Computer</span>
            <span className="text-base mt-5 font-semibold">{`Score: ${pointsComputer}`}</span>
          </div>
        </div>
        <div className="w-full">
          <div className="w-full h-4 bg-green-700"></div>
          <div className="w-full h-1 bg-green-900"></div>
          <div className="w-full h-16 bg-green-800 rounded-b-lg flex justify-center items-center flex-row gap-10">
            <button
              className={
                playing ? 'w-28 md:w-1/6 py-3 text-black bg-gray-300 font-semibold md:px-5 md:py-3 rounded-md'
                  : 'w-28 md:w-1/6 -mb-2 py-3 text-black bg-indigo-300 font-semibold md:px-5 md:py-3 rounded-md hover:bg-indigo-600 duration-300'
              }
              type="button"
              onClick={() => {
                setTimeSquares([])
                setJudge(0)
                setWinner('')
                playing = true
                startGame()
              }}
              disabled={playing}
            >
              START
            </button>
            <button
              className={
                playing ? 'w-28 md:w-1/6 py-3 text-black bg-gray-300 font-semibold md:px-5 md:py-3 -mb-[2px] rounded-md'
                  : 'w-28 md:w-1/6 -mb-2 py-3 text-black bg-green-300 font-semibold md:px-5 md:py-3 rounded-md hover:bg-green-600 duration-300'
              }
              type="button"
              onClick={resetGame}
              disabled={playing}
            >
              RESET GAME
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RockPaperScissors
