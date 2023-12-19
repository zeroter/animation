import { useEffect, useMemo, useState } from 'react'
import RightSetting from './RightSetting'
import Entity, { animationType } from './Entity'

const Animation = () => {
  const [state, setState] = useState<string>('slide')
  const [isSmall, setIsSmall] = useState<boolean>(false)

  const bgImage = useMemo(() => {
    return isSmall ? `./public/mobile_bg.jpg` : './public/pc_bg.jpeg'
  }, [isSmall])

  useEffect(() => {
    function updateClient() {
      setIsSmall(window.innerWidth < 576)
    }

    window.addEventListener('resize', updateClient)
  }, [])

  return (
    <div style={{ backgroundImage: bgImage }}>
      <Entity state={state as animationType}></Entity>
      <RightSetting setState={setState} state={state}></RightSetting>
    </div>
  )
}



export default Animation
