import classNames from 'classnames'
import styled from 'styled-components'

interface RightSettingProps {
  state: string
  interval: number
  setState: (state: string) => void
  setInterval: (interval: number) => void
}
const RightSetting: React.FC<RightSettingProps> = (props) => {
  const items = [
    { type: 'fade', label: 'Fade' },
    { type: 'slide', label: 'Slide' },
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
      <div className="animation-rate">
        <button
          onClick={() => {
            props.setInterval(Math.max(1, props.interval - 0.25))
          }}
        >
          -0.25
        </button>
        <div>Rate({props.interval})</div>
        <button
          onClick={() => {
            props.setInterval(props.interval + 0.25)
          }}
        >
          +0.25
        </button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: fixed;
  width: 128px;
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
    width: 100px;
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

  .animation-rate {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    gap: 8px;
    button {
      width: 34px;
      font-size: 12px;
      background-color: #ffffff;
      border: 1px solid #409eff;
      border-radius: 4px;
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        background-color: #ccc;
      }
    }
  }
`

export default RightSetting
