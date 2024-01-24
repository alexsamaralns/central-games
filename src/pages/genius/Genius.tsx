import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './Genius.css'

const START_COUNTER = [
  '/assets/images/genius/one.png',
  '/assets/images/genius/two.png',
  '/assets/images/genius/three.png',
  '/assets/images/genius/wait.png',
]
const CTRL_STAGE = 4
const darkColorButtons = [
  'btn-green-on',
  'btn-red-on',
  'btn-yellow-on',
  'btn-blue-on'
]

let startTimer = 0
let stage = 0
let sequenceLength = CTRL_STAGE
let shineButtonTime = 1000
let execSequence = 0
let playerSequence = 0
let isProcessing = false
let sequence: number[] = []

const Genius = () => {
  const navigate = useNavigate()
  const greenButtonRef = useRef<HTMLButtonElement>(null)
  const redButtonRef = useRef<HTMLButtonElement>(null)
  const yellowButtonRef = useRef<HTMLButtonElement>(null)
  const blueButtonRef = useRef<HTMLButtonElement>(null)
  const [geniusButtons, setGeniusButtons] = useState<string[]>(['btn-green-off', 'btn-red-off', 'btn-yellow-off', 'btn-blue-off'])
  const [isPlaying, setIsPlaying] = useState<string>('stopped')
  const [numberCounter, setNumberCounter] = useState<number>(0)
  const [score, setScore] = useState<number>(0)
  const [bestScore, setBestScore] = useState<number>(0)
  const [beatBestScore, setBeatBestScore] = useState<boolean>(false)
  const [dialogWrongButton, setDialogWrongButton] = useState<boolean>(false)
  const [dialogCorrectSequence, setDialogCorrectSequence] = useState<boolean>(false)

  useEffect(() => {
    startTimer = 0
    stage = 0
    sequenceLength = CTRL_STAGE
    shineButtonTime = 1000
    isProcessing = false
  }, [])

  const startGame = (status: string) => {
    isProcessing = true
    if (startTimer < 4) {
      setTimeout(() => {
        startTimer++
        setNumberCounter(startTimer)
        startGame(status)
      }, 1000)
    } else if (status === 'initial') {
      setIsPlaying('playing')
      setNumberCounter(0)
      startTimer = 0
      stage = 1
      sequenceLength = CTRL_STAGE
      shineButtonTime = 1000
      execSequence = 0
      playerSequence = 0
      sequence = []
      setScore(0)
      setBeatBestScore(false)
      processGame(stage)
    } else {
      execSequence = 0
      playerSequence = 0
      sequence = []
      processGame(stage)
    }
  }

  const processGame = (stage: number) => {
    if (stage % CTRL_STAGE === 0) {
      stage++
      sequenceLength++
      shineButtonTime = shineButtonTime - 50
    }

    sequence = Array.from({ length: sequenceLength }, () => Math.floor(Math.random() * 4))

    showSequence()
  }

  const showSequence = () => {
    setGeniusButtons(['btn-green-off', 'btn-red-off', 'btn-yellow-off', 'btn-blue-off'])
    const auxGeniusButtons = ['btn-green-off', 'btn-red-off', 'btn-yellow-off', 'btn-blue-off']
    if (execSequence < sequenceLength) {
      auxGeniusButtons[sequence[execSequence]] = darkColorButtons[sequence[execSequence]]
      setGeniusButtons(auxGeniusButtons)
      setTimeout(() => {
        setGeniusButtons(['btn-green-off', 'btn-red-off', 'btn-yellow-off', 'btn-blue-off'])
        execSequence++
        setTimeout(() => {
          showSequence()
        }, 1000)
      }, shineButtonTime)
    } else {
      isProcessing = false
    }
  }

  const endOfGame = () => {
    startTimer = 0
    stage = 0
    sequenceLength = CTRL_STAGE
    shineButtonTime = 1000
    isProcessing = false
    setNumberCounter(0)
    setScore(0)
    setIsPlaying('stopped')
    setDialogWrongButton(false)
  }

  const clickDownButton = (button: number) => {
    if (button === 0 && greenButtonRef.current) {
      greenButtonRef.current.classList.remove('btn-green-off')
      greenButtonRef.current.classList.add('btn-green-on')
    }

    if (button === 1 && redButtonRef.current) {
      redButtonRef.current.classList.remove('btn-red-off')
      redButtonRef.current.classList.add('btn-red-on')
    }

    if (button === 2 && yellowButtonRef.current) {
      yellowButtonRef.current.classList.remove('btn-yellow-off')
      yellowButtonRef.current.classList.add('btn-yellow-on')
    }

    if (button === 3 && blueButtonRef.current) {
      blueButtonRef.current.classList.remove('btn-blue-off')
      blueButtonRef.current.classList.add('btn-blue-on')
    }

    setTimeout(() => {
      if (greenButtonRef.current && redButtonRef.current &&
        yellowButtonRef.current && blueButtonRef.current
      ) {
        greenButtonRef.current.classList.remove('btn-green-on')
        greenButtonRef.current.classList.add('btn-green-off')
        redButtonRef.current.classList.remove('btn-red-on')
        redButtonRef.current.classList.add('btn-red-off')
        yellowButtonRef.current.classList.remove('btn-yellow-on')
        yellowButtonRef.current.classList.add('btn-yellow-off')
        blueButtonRef.current.classList.remove('btn-blue-on')
        blueButtonRef.current.classList.add('btn-blue-off')
      }

      checkButtonClicked(button)
    }, 500)
  }

  const checkButtonClicked = (button: number) => {
    if (sequence[playerSequence] !== button) {
      if (score > bestScore) {
        setBestScore(score)
        setBeatBestScore(true)
      }
      setTimeout(() => {
        setDialogWrongButton(true)
        setIsPlaying('stopped')
      }, 500)
    } else if (playerSequence + 1 === sequence.length) {
      setDialogCorrectSequence(true)
      stage++
      setTimeout(() => {
        setScore(score + 1)
        startGame('continue')
        setDialogCorrectSequence(false)
      }, 2000)
    } else if (playerSequence + 1 < sequence.length) {
      playerSequence++
    }
  }

  return (
    <div className="w-full md:h-screen min-h-screen bg-gray-900 flex justify-evenly items-center flex-col">
      <div className="absolute top-7 left-7 hover:cursor-pointer">
        <img className="md:w-28 w-16" src="/assets/images/genius/back.png" onClick={() => navigate('/')} alt="back" />
      </div>
      <div className="justify-center items-center flex-col change-color md:mt-0 -mt-20">
        <img className="h-11" src="/assets/images/genius/title_white.png" alt="genius_title" />
      </div>
      <div className="w-4/5 h-96 flex justify-between items-center md:flex-row flex-col md:gap-0 gap-10 md:mt-0 -mt-56">
        <div className="md:w-3/5 w-full h-full flex items-center justify-center">
          <div className="w-80 h-80 rounded-3xl bg-black flex items-center justify-center flex-col gap-5">
            <div className="w-full flex items-center justify-center flex-row gap-5">
              <button
                ref={greenButtonRef}
                disabled={isProcessing}
                type="button"
                onClick={() => {
                  if (!isProcessing && isPlaying === 'playing') {
                    clickDownButton(0)
                  }
                }}
                className={`w-32 h-32 rounded-3xl ${geniusButtons[0]} ${!isProcessing && isPlaying === 'playing' ? 'enabled-buttons' : 'disabled-buttons'}`}
              ></button>
              <button
                ref={redButtonRef}
                disabled={isProcessing}
                type="button"
                onClick={() => {
                  if (!isProcessing && isPlaying === 'playing') {
                    clickDownButton(1)
                  }
                }}
                className={`w-32 h-32 rounded-3xl ${geniusButtons[1]} ${!isProcessing && isPlaying === 'playing' ? 'enabled-buttons' : 'disabled-buttons'}`}
              ></button>
            </div>
            <div className="w-full flex items-center justify-center flex-row gap-5">
              <button
                ref={yellowButtonRef}
                disabled={isProcessing}
                type="button"
                onClick={() => {
                  if (!isProcessing && isPlaying === 'playing') {
                    clickDownButton(2)
                  }
                }}
                className={`w-32 h-32 rounded-3xl ${geniusButtons[2]} ${!isProcessing && isPlaying === 'playing' ? 'enabled-buttons' : 'disabled-buttons'}`}
              ></button>
              <button
                ref={blueButtonRef}
                disabled={isProcessing}
                type="button"
                onClick={() => {
                  if (!isProcessing && isPlaying === 'playing') {
                    clickDownButton(3)
                  }
                }}
                className={`w-32 h-32 rounded-3xl ${geniusButtons[3]} ${!isProcessing && isPlaying === 'playing' ? 'enabled-buttons' : 'disabled-buttons'}`}
              ></button>
            </div>
          </div>
        </div>
        <div className="md:w-1/4 w-full h-full flex justify-center items-center flex-col">
          {isPlaying === 'stopped' && (
            <div
              className="w-full hover:cursor-pointer"
              onClick={() => {
                setIsPlaying('counting')
                startGame('initial')
              }}
            >
              <img className="h-8" src="/assets/images/genius/start_game.png" alt="start_game" />
            </div>
          )}
          {isPlaying === 'counting' && (
            <div className="w-full flex justify-center items-center">
              <img className="h-8" src={START_COUNTER[numberCounter]} alt="counter_start" />
            </div>
          )}
          <div className="w-full min-h-full flex justify-start items-center flex-col">
            <div className="w-full flex justify-center items-center flex-row">
              <h5 className="text-indigo-600 text-3xl">BEST SCORE: <span className="text-indigo-600 text-3xl">{bestScore}</span></h5>
            </div>
            {isPlaying === 'playing' && (
              <>
                <div className="w-full flex justify-center items-center flex-row">
                  <h5 className="text-yellow-300 text-3xl">SCORE: <span className="text-yellow-300 text-3xl">{score}</span></h5>
                </div>
                <div className="w-full flex justify-center items-center flex-col mt-24">
                  <img className="h-8" src={`/assets/images/genius/${isProcessing ? 'wait' : 'go'}.png`} alt={isProcessing ? 'wait' : 'go'} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {dialogWrongButton && (
        <div
          className="md:w-[520px] w-11/12 h-80 bg-gray-700 absolute rounded-xl flex justify-between items-center flex-col py-10 animation-dialog"
        >
          <div className="flex justify-center items-center flex-col gap-5">
            <img className="md:h-4 h-3" src="/assets/images/genius/oh_no.png" alt="oh_no" />
            <img className="md:h-4 h-3" src="/assets/images/genius/wrong_sequence.png" alt="wrong_sequence" />
            <div className="w-full flex items-center justify-center flex-row gap-5">
              <img className="md:h-4 h-3" src="/assets/images/genius/score.png" alt="score" />
              <span className="text-orange-300 text-2xl font-bold mb-1">{score}</span>
            </div>
            {beatBestScore && (
              <>
                <div className="w-full flex items-center justify-center flex-col gap-5">
                  <img className="md:h-4 h-3" src="/assets/images/genius/congrats.png" alt="congrats" />
                  <img className="md:h-4 h-3" src="/assets/images/genius/best_score.png" alt="best_score" />
                </div>
              </>
            )}
          </div>
          <button
            type="button"
            className="bg-gray-900 px-12 py-5 rounded-xl duration-500 hover:bg-gray-500"
            onClick={endOfGame}
          >
            <img className="md:h-4 h-3" src="/assets/images/genius/close.png" alt="close" />
          </button>
        </div>
      )}
      {dialogCorrectSequence && (
        <div
          className="w-96 h-32 bg-gray-700 absolute rounded-xl flex justify-between items-center flex-col py-10 animation-dialog"
        >
          <div className="flex justify-center items-center flex-col gap-5">
            <img className="md:h-4 h-3" src="/assets/images/genius/yeah.png" alt="yeah" />
            <img className="md:h-4 h-3" src="/assets/images/genius/correct.png" alt="correct" />
          </div>
        </div>
      )}
    </div>
  )
}

export default Genius
