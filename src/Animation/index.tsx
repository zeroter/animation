import { useState } from 'react'
import styled from 'styled-components'
import RightSetting from './RightSetting'

const Animation = () => {
  const [state, setState] = useState<string>('fade')

  return (
    <Wrapper>
      <RightSetting setState={setState}></RightSetting>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`

export default Animation
