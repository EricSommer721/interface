import { Button, Link, useDisclosure } from '@nextui-org/react'
import { TwitterIcon } from './components/icons/Twitter'
import { GithubIcon } from './components/icons/Github'
import { GithubLink, TwitterLink, VideoLink } from './constants/links'
import { Logo } from './components/icons/Logo'
import { TextImage } from './components/icons/Text'
import { VideoModal } from './components/VedioModal'
import { useEffect, useState } from 'react'

function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [imgLoad, setImgLoad] = useState(true)

  useEffect(() => {
    const image = document.createElement('img')
    image.onload = () => {
      setImgLoad(false)
    }
    image.src = '/bg1.png'
  }, [])

  return (
    <div
      className="w-screen h-screen relative bg-[#18082d] bg-no-repeat bg-cover bg-[50%] overflow-hidden"
      style={{
        backgroundImage: !imgLoad ? 'url(/bg1.png)' : undefined,
      }}
    >
      <VideoModal isOpen={isOpen} onOpenChange={onOpenChange} />

      <header className="px-[4vw] pt-[2.5vw]">
        <Logo />
      </header>

      <div className="absolute left-[50%] bottom-[50%] z-[1] translate-x-[-50%] translate-y-[50%] rounded-full border-solid border-[#F9F2FF] border-[20px] animate-[shining_1.5s_ease-in-out_infinite]">
        <div className="h-[58vh] md:h-[74vh] w-[58vh] md:w-[74vh] animate-[rotation_60s_linear_infinite]">
          <img
            alt="aerospace"
            src="/earth-1.png"
            className="scale-[1.01] h-full w-full"
          />
        </div>
      </div>

      <div className="absolute bottom-[20%] md:bottom-[0] z-[5] translate-y-[-20%] w-full">
        <h1>
          <div className="w-[90vw] md:w-[72vw] m-auto">
            <TextImage />
          </div>
        </h1>

        <h3 className="text-center text-white text-[5vw] md:text-[2vw]">
          Fair Launching in January 2024
        </h3>
      </div>

      <div className="absolute left-[50%] bottom-0 z-[2] translate-x-[-50%]">
        <img alt="aerospace" src="/aerospace-1.png" className="h-[60vh]" />
      </div>

      <div className="absolute bottom-0 px-[4vw] pb-[2.5vw] z-20">
        <Button
          isIconOnly
          variant="light"
          aria-label="Twitter"
          href={TwitterLink}
          as={Link}
          isExternal
        >
          <TwitterIcon />
        </Button>
        <Button
          isIconOnly
          variant="light"
          aria-label="Github"
          href={GithubLink}
          as={Link}
          isExternal
          className="ml-2"
        >
          <GithubIcon />
        </Button>
      </div>

      <div className="absolute bottom-0 w-full z-10">
        <video
          id="video"
          src={VideoLink}
          loop
          muted
          autoPlay
          className="w-[120px] h-[120px] md:w-[10vw] md:h-[10vw] ml-auto rounded border-1 border-solid border-transparent hover:border-gray-300 hover:cursor-pointer"
          onClick={onOpen}
        />
      </div>
    </div>
  )
}

export default App
