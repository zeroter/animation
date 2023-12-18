import styled from 'styled-components'

interface RightSettingProps {
  setState: (state: string) => void
}
const RightSetting: React.FC<RightSettingProps> = (props) => {
  return <Wrapper></Wrapper>
}

const Wrapper = styled.div`
  position: fixed;
`

export default RightSetting
