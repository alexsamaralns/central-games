import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import TicTacToeInfo from './TicTacToeInfo'
import './TicTacToe.css'

interface TicTacToe {
  array: string[][]
}

interface Players {
  start: boolean,
  player1Points: number,
  player2Points: number
}

let disabled: boolean = false
let counter: number = 0

const MARK_PATH = {
  p1: '/assets/images/tictactoe/tictactoe_x.png',
  p2: '/assets/images/tictactoe/tictactoe_o.png',
  p1_wins: '/assets/images/tictactoe/p1_wins.png',
  p2_wins: '/assets/images/tictactoe/p2_wins.png',
  draw: '/assets/images/tictactoe/draw.png',
}

const TicTacToe = () => {
  const navigate = useNavigate()
  const [boardSpace, setBoardSpace] = useState<TicTacToe>({
    array: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
  })
  const [winner, setWinner] = useState<string>('')
  const [playersInfo, setPlayersInfo] = useState<Players>({
    start: false,
    player1Points: 0,
    player2Points: 0
  })
  const [isPlaying, setIsPlaying] = useState<number>(1)
  const positionRef0 = useRef<HTMLImageElement | null>(null)
  const positionRef1 = useRef<HTMLImageElement | null>(null)
  const positionRef2 = useRef<HTMLImageElement | null>(null)
  const positionRef3 = useRef<HTMLImageElement | null>(null)
  const positionRef4 = useRef<HTMLImageElement | null>(null)
  const positionRef5 = useRef<HTMLImageElement | null>(null)
  const positionRef6 = useRef<HTMLImageElement | null>(null)
  const positionRef7 = useRef<HTMLImageElement | null>(null)
  const positionRef8 = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    disabled = false
    counter = 0
  }, [])

  useEffect(() => {
    if (winner === 'p1') {
      setPlayersInfo(prevState => ({
        ...prevState,
        player1Points: playersInfo.player1Points + 1
      }))
    } else if (winner === 'p2') {
      setPlayersInfo(prevState => ({
        ...prevState,
        player2Points: playersInfo.player2Points + 1
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winner])

  const selectedPlayers = () => {
    setPlayersInfo(prevState => ({
      ...prevState,
      start: true
    }))
  }

  const selectSpace = (index: string) => {
    const indexParts = index.split('-')
    const row = parseInt(indexParts[0])
    const col = parseInt(indexParts[1])

    if (boardSpace.array[row][col].length === 0 && !disabled) {
      counter += 1
      disabled = true
      const newBoardSpace = { ...boardSpace };
      newBoardSpace.array[row][col] = isPlaying === 1 ? 'x' : 'o';

      setBoardSpace(newBoardSpace);

      setTimeout(() => {
        checkBoard()
      }, 100)
    }
  }

  const checkBoard = () => {
    if (boardSpace.array[0][0] === boardSpace.array[0][1] &&
      boardSpace.array[0][1] === boardSpace.array[0][2] &&
      boardSpace.array[0][0].length > 0 &&
      boardSpace.array[0][1].length > 0 &&
      boardSpace.array[0][2].length > 0
    ) {
      setWinner(boardSpace.array[0][0] === 'x' ? 'p1' : 'p2')
      positionRef0.current?.classList.add('blinking')
      positionRef1.current?.classList.add('blinking')
      positionRef2.current?.classList.add('blinking')
    } else if (boardSpace.array[0][0] === boardSpace.array[1][0] &&
      boardSpace.array[1][0] === boardSpace.array[2][0] &&
      boardSpace.array[0][0].length > 0 &&
      boardSpace.array[1][0].length > 0 &&
      boardSpace.array[2][0].length > 0
    ) {
      setWinner(boardSpace.array[0][0] === 'x' ? 'p1' : 'p2')
      positionRef0.current?.classList.add('blinking')
      positionRef3.current?.classList.add('blinking')
      positionRef6.current?.classList.add('blinking')
    } else if (boardSpace.array[0][0] === boardSpace.array[1][1] &&
      boardSpace.array[1][1] === boardSpace.array[2][2] &&
      boardSpace.array[0][0].length > 0 &&
      boardSpace.array[1][1].length > 0 &&
      boardSpace.array[2][2].length > 0
    ) {
      setWinner(boardSpace.array[0][0] === 'x' ? 'p1' : 'p2')
      positionRef0.current?.classList.add('blinking')
      positionRef4.current?.classList.add('blinking')
      positionRef8.current?.classList.add('blinking')
    } else if (boardSpace.array[0][1] === boardSpace.array[1][1] &&
      boardSpace.array[1][1] === boardSpace.array[2][1] &&
      boardSpace.array[0][1].length > 0 &&
      boardSpace.array[1][1].length > 0 &&
      boardSpace.array[2][1].length > 0
    ) {
      setWinner(boardSpace.array[0][1] === 'x' ? 'p1' : 'p2')
      positionRef1.current?.classList.add('blinking')
      positionRef4.current?.classList.add('blinking')
      positionRef7.current?.classList.add('blinking')
    } else if (boardSpace.array[0][2] === boardSpace.array[1][1] &&
      boardSpace.array[1][1] === boardSpace.array[2][0] &&
      boardSpace.array[0][2].length > 0 &&
      boardSpace.array[1][1].length > 0 &&
      boardSpace.array[2][0].length > 0
    ) {
      setWinner(boardSpace.array[0][2] === 'x' ? 'p1' : 'p2')
      positionRef2.current?.classList.add('blinking')
      positionRef4.current?.classList.add('blinking')
      positionRef6.current?.classList.add('blinking')
    } else if (boardSpace.array[0][2] === boardSpace.array[1][2] &&
      boardSpace.array[1][2] === boardSpace.array[2][2] &&
      boardSpace.array[0][2].length > 0 &&
      boardSpace.array[1][2].length > 0 &&
      boardSpace.array[2][2].length > 0
    ) {
      setWinner(boardSpace.array[0][2] === 'x' ? 'p1' : 'p2')
      positionRef2.current?.classList.add('blinking')
      positionRef5.current?.classList.add('blinking')
      positionRef8.current?.classList.add('blinking')
    } else if (boardSpace.array[1][0] === boardSpace.array[1][1] &&
      boardSpace.array[1][1] === boardSpace.array[1][2] &&
      boardSpace.array[1][0].length > 0 &&
      boardSpace.array[1][1].length > 0 &&
      boardSpace.array[1][2].length > 0
    ) {
      setWinner(boardSpace.array[1][0] === 'x' ? 'p1' : 'p2')
      positionRef3.current?.classList.add('blinking')
      positionRef4.current?.classList.add('blinking')
      positionRef5.current?.classList.add('blinking')
    } else if (boardSpace.array[2][0] === boardSpace.array[2][1] &&
      boardSpace.array[2][1] === boardSpace.array[2][2] &&
      boardSpace.array[2][0].length > 0 &&
      boardSpace.array[2][1].length > 0 &&
      boardSpace.array[2][2].length > 0
    ) {
      setWinner(boardSpace.array[2][0] === 'x' ? 'p1' : 'p2')
      positionRef6.current?.classList.add('blinking')
      positionRef7.current?.classList.add('blinking')
      positionRef8.current?.classList.add('blinking')
    } else if (counter === 9) {
      setWinner('Draw!')
    } else {
      disabled = false
    }

    if (winner.length === 0) setIsPlaying(isPlaying === 1 ? 2 : 1)
  }

  const handleReset = (type: string) => {
    disabled = false
    setIsPlaying(1)
    counter = 0
    setWinner('')
    setBoardSpace({
      array: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
    })

    positionRef0.current?.classList.remove('blinking')
    positionRef1.current?.classList.remove('blinking')
    positionRef2.current?.classList.remove('blinking')
    positionRef3.current?.classList.remove('blinking')
    positionRef4.current?.classList.remove('blinking')
    positionRef5.current?.classList.remove('blinking')
    positionRef6.current?.classList.remove('blinking')
    positionRef7.current?.classList.remove('blinking')
    positionRef8.current?.classList.remove('blinking')

    if (type === 'reset') {
      setPlayersInfo({
        start: false,
        player1Points: 0,
        player2Points: 0
      })
    }
  }

  return (
    <div className="w-full md:h-screen min-h-screen bg-gray-900 flex justify-between items-center flex-col">
      <div className="w-full m-10 gap-y-16 flex justify-center items-center flex-col">
        <img className="object-cover px-8 scale-100 md:scale-150" src="/assets/images/tictactoe/tictactoe_title.png" alt="tictactoe_title" />
        {!playersInfo.start && (
          <div className="w-full flex justify-center items-center flex-col gap-y-5">
            <button type="button" className="blinking" onClick={() => selectedPlayers()}>
              <img className="object-cover px-8 scale-75 md:scale-100" src="/assets/images/tictactoe/start.png" alt="tictactoe_start" />
            </button>
            <button type="button" onClick={() => navigate('/')}>
              <img className="scale-75" src="/assets/images/tictactoe/back.png" alt="reset_game" />
            </button>
          </div>
        )}
      </div>
      {playersInfo.start && (
        <div className="w-full md:mt-6 -mt-6 mr-10 mb-10 ml-10 flex justify-center items-center md:flex-row flex-col">
          <div className="w-full mt-6 mr-10 mb-10 ml-10 flex justify-center items-center flex-col">
            <div className="md:w-full md:h-auto w-9/12 h-72 md:p-12 p-6 rounded-lg board border-solid border-2 border-indigo-500">
              <div className="w-full flex justify-center items-center flex-row">
                <div
                  key="position0"
                  id="position0"
                  className="md:w-24 md:h-24 w-20 h-20 flex justify-center items-center border-r-4 border-b-4 border-indigo-500 hover:cursor-pointer"
                  onClick={() => selectSpace('0-0')}
                >
                  {boardSpace.array[0][0].length > 0 && (
                    <img
                      ref={positionRef0}
                      className="scale-150"
                      src={boardSpace.array[0][0] === 'x' ? MARK_PATH.p1 : MARK_PATH.p2}
                      alt={boardSpace.array[0][0]}
                    />
                  )}
                </div>
                <div
                  key="position1"
                  id="position1"
                  className="md:w-24 md:h-24 w-20 h-20 flex justify-center items-center border-r-4 border-b-4 border-l-4 border-indigo-500 hover:cursor-pointer"
                  onClick={() => selectSpace('0-1')}
                >
                  {boardSpace.array[0][1].length > 0 && (
                    <img
                      ref={positionRef1}
                      className="scale-150"
                      src={boardSpace.array[0][1] === 'x' ? MARK_PATH.p1 : MARK_PATH.p2}
                      alt={boardSpace.array[0][1]}
                    />
                  )}
                </div>
                <div
                  key="position2"
                  id="position2"
                  className="md:w-24 md:h-24 w-20 h-20 flex justify-center items-center border-b-4 border-l-4 border-indigo-500 hover:cursor-pointer"
                  onClick={() => selectSpace('0-2')}
                >
                  {boardSpace.array[0][2].length > 0 && (
                    <img
                      ref={positionRef2}
                      className="scale-150"
                      src={boardSpace.array[0][2] === 'x' ? MARK_PATH.p1 : MARK_PATH.p2}
                      alt={boardSpace.array[0][2]}
                    />
                  )}
                </div>
              </div>
              <div className="w-full flex justify-center items-center flex-row">
                <div
                  key="position3"
                  id="position3"
                  className="md:w-24 md:h-24 w-20 h-20 flex justify-center items-center border-t-4 border-r-4 border-b-4 border-indigo-500 hover:cursor-pointer"
                  onClick={() => selectSpace('1-0')}
                >
                  {boardSpace.array[1][0].length > 0 && (
                    <img
                      ref={positionRef3}
                      className="scale-150"
                      src={boardSpace.array[1][0] === 'x' ? MARK_PATH.p1 : MARK_PATH.p2}
                      alt={boardSpace.array[1][0]}
                    />
                  )}
                </div>
                <div
                  key="position4"
                  id="position4"
                  className="md:w-24 md:h-24 w-20 h-20 flex justify-center items-center border-t-4 border-r-4 border-b-4 border-l-4 border-indigo-500 hover:cursor-pointer"
                  onClick={() => selectSpace('1-1')}
                >
                  {boardSpace.array[1][1].length > 0 && (
                    <img
                      ref={positionRef4}
                      className="scale-150"
                      src={boardSpace.array[1][1] === 'x' ? MARK_PATH.p1 : MARK_PATH.p2}
                      alt={boardSpace.array[1][1]}
                    />
                  )}
                </div>
                <div
                  key="position5"
                  id="position5"
                  className="md:w-24 md:h-24 w-20 h-20 flex justify-center items-center border-t-4 border-b-4 border-l-4 border-indigo-500 hover:cursor-pointer"
                  onClick={() => selectSpace('1-2')}
                >
                  {boardSpace.array[1][2].length > 0 && (
                    <img
                      ref={positionRef5}
                      className="scale-150"
                      src={boardSpace.array[1][2] === 'x' ? MARK_PATH.p1 : MARK_PATH.p2}
                      alt={boardSpace.array[1][2]}
                    />
                  )}
                </div>
              </div>
              <div className="w-full flex justify-center items-center flex-row">
                <div
                  key="position6"
                  id="position6"
                  className="md:w-24 md:h-24 w-20 h-20 flex justify-center items-center border-t-4 border-r-4 border-indigo-500 hover:cursor-pointer"
                  onClick={() => selectSpace('2-0')}
                >
                  {boardSpace.array[2][0].length > 0 && (
                    <img
                      ref={positionRef6}
                      className="scale-150"
                      src={boardSpace.array[2][0] === 'x' ? MARK_PATH.p1 : MARK_PATH.p2}
                      alt={boardSpace.array[2][0]}
                    />
                  )}
                </div>
                <div
                  key="position7"
                  id="position7"
                  className="md:w-24 md:h-24 w-20 h-20 flex justify-center items-center border-t-4 border-r-4 border-l-4 border-indigo-500 hover:cursor-pointer"
                  onClick={() => selectSpace('2-1')}
                >
                  {boardSpace.array[2][1].length > 0 && (
                    <img
                      ref={positionRef7}
                      className="scale-150"
                      src={boardSpace.array[2][1] === 'x' ? MARK_PATH.p1 : MARK_PATH.p2}
                      alt={boardSpace.array[2][1]}
                    />
                  )}
                </div>
                <div
                  key="position8"
                  id="position8"
                  className="md:w-24 md:h-24 w-20 h-20 flex justify-center items-center border-t-4 border-l-4 border-indigo-500 hover:cursor-pointer"
                  onClick={() => selectSpace('2-2')}
                >
                  {boardSpace.array[2][2].length > 0 && (
                    <img
                      ref={positionRef8}
                      className="scale-150"
                      src={boardSpace.array[2][2] === 'x' ? MARK_PATH.p1 : MARK_PATH.p2}
                      alt={boardSpace.array[2][2]}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-16 flex mb-10 justify-center items-center flex-col">
            {winner.length > 0 && (
              <>
                <img
                  className="scale-50"
                  src={winner === 'p1' ? MARK_PATH.p1_wins : winner === 'p2' ? MARK_PATH.p2_wins : MARK_PATH.draw}
                  alt={`${winner} wins!`}
                />
                <button type="button" onClick={() => handleReset('next')}>
                  <img
                    className="scale-50"
                    src='/assets/images/tictactoe/next_game.png'
                    alt="next_game"
                  />
                </button>
              </>
            )}
          </div>
          <TicTacToeInfo handleReset={handleReset} playersInfo={playersInfo} isPlaying={isPlaying} winner={winner} />
        </div>
      )}
    </div>
  )
}

export default TicTacToe
