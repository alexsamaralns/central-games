import { useNavigate } from 'react-router-dom'

const Bio = () => {
  const navigate = useNavigate()

  return (
    <div className="w-full md:h-screen min-h-screen bg-gray-900 flex justify-evenly items-center flex-col font-sans">
      <div className="w-full flex justify-center items-center md:flex-row flex-col px-11 gap-14">
        <div className="md:w-1/2 w-full min-h-full md:mt-0 mt-8">
          <p className="text-orange-300 md:text-2xl text-lg">Hi!</p>
          <p className="text-orange-300 md:text-2xl text-lg">
            I'm Alex Amaral, bachelor's in Computer Engineering. Over 4 years of experience in the field. Fullstack Developer with expertise in
            ReactJS (Frontend) and NodeJS (Backend), proficient in both relational and non-relational databases, daily use of GitHub
            for version control and Linux enthusiast. Successfully delivered impactful projects as a Fullstack Developer,
            comprehensive understanding of both frontend and backend technologies, skilled in managing and utilizing relational and non-relational databases,
            regularly contribute to and collaborate on projects through GitHub and passionate about the efficiency and flexibility offered by
            the Linux operating system. Exciting opportunities to contribute my skills and expertise in a dynamic team environment.
            Let's build the future together!
          </p>
        </div>
        <div className="md:w-1/2 w-full min-h-full flex md:justify-between justify-center items-center flex-col">
          <div className="md:w-1/2 w-full min-h-full flex md:justify-start justify-center items-center flex-col">
            <p className="text-white text-2xl mb-14">Where find me?</p>
            <div className="w-full flex justify-center items-center flex-row gap-6 md:mb-0 mb-8">
              <a href="https://www.linkedin.com/in/alex-amaral-a45b9ab0/" target="_blank" rel="linkedin">
                <img className="md:w-23 w-11 hover: cursor-pointer" src="/assets/images/linkedin.png" alt="linkedin" />
              </a>
              <a href="https://github.com/alexsamaralns" target="_blank" rel="github">
                <img className="md:w-23 w-11 hover: cursor-pointer" src="/assets/images/github.png" alt="github" />
              </a>
              <a href="https://www.instagram.com/alexsamaralns1/" target="_blank" rel="instagram">
                <img className="md:w-23 w-11 hover: cursor-pointer" src="/assets/images/instagram.png" alt="instagram" />
              </a>
            </div>
            <p className="text-orange-300 md:text-xl text-lg md:mt-9 mt-5">alexsamaralns@gmail.com</p>
          </div>
          <div className="md:w-1/2 w-full min-h-full flex justify-center items-center flex-col md:mb-0 mb-8 mt-10">
            <img className="w-32 cursor-pointer" src="/assets/images/back_arrow.png" onClick={() => navigate('/')} alt="back_arrow" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bio