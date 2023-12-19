import { useState } from 'react'
import RightSetting from './RightSetting'
import Entity, { animationType } from './Entity'

const Animation = () => {
  const [state, setState] = useState<string>('slide')
  const [interval, setInterval] = useState<number>(1)
  // const [isSmall, setIsSmall] = useState<boolean>(false)
  const [position, setPosition] = useState<{ left: number; bottom: number }>({
    left: 20,
    bottom: 100
  })

  // useEffect(() => {
  //   function updateClient() {
  //     setIsSmall(window.innerWidth < 576)
  //   }

  //   window.addEventListener('resize', updateClient)
  // }, [])

  return (
    <div>
      <Entity state={state as animationType} interval={interval} position={position}></Entity>
      <RightSetting
        position={position}
        setPosition={setPosition}
        setState={setState}
        state={state}
        interval={interval}
        setInterval={setInterval}
      ></RightSetting>
    </div>
  )
}

export default Animation
