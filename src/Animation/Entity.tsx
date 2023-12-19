import classNames from 'classnames'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'

export type animationType = 'slide' | 'flip' | 'fade'

type timerType = {
  enter?: any
  leave?: any
}

interface EntityProps {
  state: animationType
  interval: number
  position: {
    bottom: number
    left: number
  }
}

//动画结束后，显示时长，及滚动后静止时长
const delay = 2000
//文案列表
const textList = [
  'XX just bought',
  'XX bought 32 min ago',
  'XX just added to cart',
  'XX added to cart 5 min ago',
  '524 people added to cart in the last 24 hours',
  'XX currently viewing',
  '2.9K+ people viewed in the last 24 hours',
  '257 people bought in the last 24 hours',
  '36 people rated 5 stars in the last 24 hours'
]

const Entity: React.FC<EntityProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null)
  const timer = useRef<timerType>({})
  const [textKey, setTextKey] = useState<number>(0)
  const timeout = useMemo(() => {
    return props.interval * 1000 + delay
  }, [props.interval])

  //切换为退出态
  const switchToLeave = useCallback(
    (directExit?: boolean) => {
      if (!ref.current) return
      ref.current!.classList.remove('animate__slideInLeft', 'animate__flipInX', 'animate__fadeIn')
      ref.current!.classList.add(getAnimationClass(props.state, 'leave'))

      if (directExit) return
      timer.current.leave = setTimeout(() => {
        switchToEnter()
      }, timeout)
    },
    [props.state, timeout]
  )

  //切换为进入态
  const switchToEnter = useCallback(() => {
    if (!ref.current) return
    setTextKey((key) => (key + 1) % textList.length)
    ref.current!.classList.remove('animate__slideOutLeft', 'animate__flipOutX', 'animate__fadeOut')
    ref.current!.classList.add(getAnimationClass(props.state, 'enter'))
    timer.current.enter = setTimeout(() => {
      switchToLeave()
    }, timeout)
  }, [props.state, timeout])

  useEffect(() => {
    clearTimeout(timer.current.enter)
    clearTimeout(timer.current.leave)
    if (!ref.current) return
    timer.current.enter = setTimeout(() => {
      switchToLeave()
    }, timeout)

    return () => {
      clearTimeout(timer.current.enter)
    }
  }, [props.state, timeout])

  useEffect(() => {
    if (!ref.current) return
    function handleClick() {
      if (ref.current?.classList.contains(getAnimationClass(props.state, 'leave'))) return
      clearTimeout(timer.current.leave)
      clearTimeout(timer.current.enter)
      timer.current.leave = setTimeout(() => {
        switchToLeave()
      }, timeout)
    }

    function handleScroll() {
      clearTimeout(timer.current.leave)
      clearTimeout(timer.current.enter)
      switchToLeave(true)
      timer.current.leave = setTimeout(() => {
        switchToEnter()
      }, timeout)
    }
    ref.current.addEventListener('click', handleClick)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('click', handleClick)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [switchToLeave, timeout])

  return (
    <AnimationWrapper interval={props.interval} distance={props.position.left}>
      <Wrapper
        ref={ref}
        className={classNames('animate__animated animation-duration-auto', getAnimationClass(props.state, 'enter'))}
        style={{
          bottom: props.position.bottom,
          left: props.position.left
        }}
      >
        <img src="https://res.ushopaid.com/static/logo/logo.svg" alt="" className="img" />
        <div className="content">{textList[textKey]}</div>
      </Wrapper>
    </AnimationWrapper>
  )
}

const getAnimationClass = (state: animationType, mode: 'enter' | 'leave') => {
  const animationEnterList = {
    slide: 'animate__slideInLeft',
    flip: 'animate__flipInX',
    fade: 'animate__fadeIn'
  }

  const animationLeaveList = {
    slide: 'animate__slideOutLeft',
    flip: 'animate__flipOutX',
    fade: 'animate__fadeOut'
  }

  return mode === 'enter' ? animationEnterList[state] : animationLeaveList[state]
}

const AnimationWrapper = styled.div<{ interval: number; distance: number }>`
  ${({ interval }) => {
    return `
      .animation-duration-auto {
        animation-duration: ${interval}s;
      }
    `
  }}

  ${({ distance }) => {
    return `
      @-webkit-keyframes slideInLeft {
        from {
          -webkit-transform: translate3d(calc(-100% - ${distance}px), 0, 0);
          transform: translate3d(calc(-100% - ${distance}px), 0, 0);
          visibility: visible;
        }

        to {
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
        }
      }
      @keyframes slideInLeft {
        from {
          -webkit-transform: translate3d(calc(-100% - ${distance}px), 0, 0);
          transform: translate3d(calc(-100% - ${distance}px), 0, 0);
          visibility: visible;
        }

        to {
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
        }
      }
      @-webkit-keyframes slideOutLeft {
        from {
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
        }

        to {
          visibility: hidden;
          -webkit-transform: translate3d(calc(-100% - ${distance}px), 0, 0);
          transform: translate3d(calc(-100% - ${distance}px), 0, 0);
        }
      }
      @keyframes slideOutLeft {
        from {
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
        }

        to {
          visibility: hidden;
          -webkit-transform: translate3d(calc(-100% - ${distance}px), 0, 0);
          transform: translate3d(calc(-100% - ${distance}px), 0, 0);
        }
      }
    `
  }}
`

const Wrapper = styled.div`
  position: fixed;
  z-index: 999999999;
  bottom: 100px;
  left: 50px;
  height: 40px;
  border-radius: 40px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  gap: 8px;
  .img {
    width: 20px;
    height: 20px;
    border-radius: 40px;
    margin-left: 10px;
  }
  .content {
    font-size: 12px;
    margin-right: 10px;
    white-space: nowrap;
  }
`

export default Entity
