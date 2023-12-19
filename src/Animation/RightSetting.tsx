import classNames from 'classnames'
import styled from 'styled-components'

interface RightSettingProps {
  state: string
  interval: number
  setState: (state: string) => void
  setInterval: (interval: number) => void
  position: any
  setPosition: (position: any) => void
}
const RightSetting: React.FC<RightSettingProps> = (props) => {
  const items = [
    { type: 'fade', label: 'Fade' },
    { type: 'slide', label: 'Slide' },
    { type: 'flip', label: 'Flip' },
    { type: 'flex', label: 'Flex' }
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

      <div className="position">
        <div
          onClick={() =>
            props.setPosition((position: any) => {
              return Object.assign({}, position, { bottom: position.bottom + 5 })
            })
          }
          className="item"
        >
          ↑
        </div>

        <div
          onClick={() =>
            props.setPosition((position: any) => {
              return Object.assign({}, position, { left: position.left - 5 })
            })
          }
          className="item"
        >
          ←
        </div>
        <div
          onClick={() =>
            props.setPosition((position: any) => {
              return Object.assign({}, position, { left: position.left + 5 })
            })
          }
          className="item"
        >
          →
        </div>

        <div
          onClick={() =>
            props.setPosition((position: any) => {
              return Object.assign({}, position, { bottom: position.bottom - 5 })
            })
          }
          className="item"
        >
          ↓
        </div>
      </div>
      <div style={{ fontSize: 12 }} className="position-value">
        left: {props.position.left}; bottom: {props.position.bottom}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  min-height: 20px;
  border-radius: 8px;
  z-index: 9999;

  box-shadow: 0 0 10px #aaa;
  left: 0px;
  top: 0px;
  background-color: #fff;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 8px;
  padding: 16px 4px;
  flex-wrap: wrap;

  .item {
    width: 50px;
    height: 24px;
    border-radius: 4px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    transition: all 0.3s;
    color: #444;
    font-size: 12px;

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
      width: 50px;
      height: 20px;
      font-size: 12px;
      background-color: #eee;
      border: 1px solid #ccc;
      border-radius: 4px;
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        background-color: #ccc;
      }
    }
  }

  .position {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 8px;

    .item {
      width: 50px;
      height: 20px;
      cursor: pointer;
      background-color: #eee;
    }
  }

  .position-lr {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
`

export default RightSetting
