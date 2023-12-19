import { useEffect, useMemo, useState } from 'react'
import RightSetting from './RightSetting'
import Entity, { animationType } from './Entity'

const Animation = () => {
  const [state, setState] = useState<string>('slide')
  const [interval, setInterval] = useState<number>(1)
  const [isSmall, setIsSmall] = useState<boolean>(false)

  useEffect(() => {
    function updateClient() {
      setIsSmall(window.innerWidth < 576)
    }

    window.addEventListener('resize', updateClient)
  }, [])

  return (
    <div>
      <Entity state={state as animationType} interval={interval}></Entity>
      <RightSetting setState={setState} state={state} interval={interval} setInterval={setInterval}></RightSetting>
    </div>
  )
}

export default Animation
