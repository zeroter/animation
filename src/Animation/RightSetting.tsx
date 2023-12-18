import classNames from 'classnames'
import styled from 'styled-components'

interface RightSettingProps {
  state: string
  setState: (state: string) => void
}
const RightSetting: React.FC<RightSettingProps> = (props) => {
  const items = [
    { type: 'fadeIn', label: 'Fade in' },
    { type: 'fadeLeft', label: 'Fade left' },
    { type: 'flip', label: 'Flip' }
  ]

  return (
    <Wrapper>
      {items.map((item: any) => (
        <div
          className={classNames('item', {
            selected: item.type === props.state
          })}
          key={item.type}
          onClick={() => {
            props.setState(item.type)
          }}
        >
          {item.label}
        </div>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: fixed;
  width: 100px;
  height: 150px;
  border-radius: 8px;

  box-shadow: 0 0 10px #aaa;
  right: 10px;
  bottom: 10px;
  background-color: #fff;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;

  .item {
    width: 80px;
    height: 32px;
    border-radius: 4px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    transition: all 0.3s;
    color: #444;
    font-size: 13px;

    &:hover {
      border-color: #409eff;
      color: #409eff;
    }

    &.selected {
      border-color: #409eff;
      color: #fff;
      background-color: #409eff;
    }
  }
`

export default RightSetting
