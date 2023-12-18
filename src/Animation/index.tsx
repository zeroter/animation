import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import RightSetting from './RightSetting'

const Animation = () => {
  const [state, setState] = useState<string>('fadeIn')
  const [isSmall, setIsSmall] = useState<boolean>(false)

  const bgImage = useMemo(() => {
    return isSmall ? `./public/mobile_bg.jpg` : './public/pc_bg.png'
  }, [isSmall])

  useEffect(() => {
    function updateClient() {
      setIsSmall(window.innerWidth < 576)
    }

    window.addEventListener('resize', updateClient)
  }, [])

  return (
    <Wrapper style={{ backgroundImage: bgImage }}>
      <img src={bgImage} />
      <RightSetting setState={setState} state={state}></RightSetting>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;

  img {
    width: 100%;
    overflow: hidden;
  }
`

export default Animation
