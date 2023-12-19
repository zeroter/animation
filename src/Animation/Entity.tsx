import classNames from 'classnames'
import { useCallback, useEffect, useRef } from 'react'
import styled from 'styled-components'

export type animationType = 'slide' | 'flip' | 'fade'

type timerType = {
  enter?: any
  leave?: any
}

interface EntityProps {
  state: animationType
  interval: number
}
const Entity: React.FC<EntityProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null)
  const timer = useRef<timerType>({})

  //切换为退出态
  const switchToLeave = useCallback(
    (directExit?: boolean) => {
      if (!ref.current) return
      ref.current!.classList.remove('animate__slideInLeft', 'animate__flipInX', 'animate__fadeIn')
      ref.current!.classList.add(getAnimationClass(props.state, 'leave'))

      if (directExit) return
      timer.current.leave = setTimeout(() => {
        switchToEnter()
      }, 2000)
    },
    [props.state]
  )

  //切换为进入态
  const switchToEnter = useCallback(() => {
    if (!ref.current) return
    ref.current!.classList.remove('animate__slideOutLeft', 'animate__flipOutX', 'animate__fadeOut')
    ref.current!.classList.add(getAnimationClass(props.state, 'enter'))
    timer.current.enter = setTimeout(() => {
      switchToLeave()
    }, 3000)
  }, [props.state])

  useEffect(() => {
    clearTimeout(timer.current.enter)
    clearTimeout(timer.current.leave)
    if (!ref.current) return
    timer.current.enter = setTimeout(() => {
      switchToLeave()
    }, 3000)

    return () => {
      clearTimeout(timer.current.enter)
    }
  }, [props.state])

  useEffect(() => {
    if (!ref.current) return
    function handleClick() {
      if (ref.current?.classList.contains(getAnimationClass(props.state, 'leave'))) return
      clearTimeout(timer.current.leave)
      clearTimeout(timer.current.enter)
      timer.current.leave = setTimeout(() => {
        switchToLeave()
      }, 2000)
    }

    function handleScroll() {
      clearTimeout(timer.current.leave)
      clearTimeout(timer.current.enter)
      switchToLeave(true)
      timer.current.leave = setTimeout(() => {
        switchToEnter()
      }, 2000)
    }
    ref.current.addEventListener('click', handleClick)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('click', handleClick)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [switchToLeave])

  return (
    <AnimationWrapper interval={props.interval}>
      <Wrapper ref={ref} className={classNames('animate__animated', getAnimationClass(props.state, 'enter'))}>
        <img src="https://res.ushopaid.com/static/logo/logo.svg" alt="" className="img" />
        <div className="content">bought 32 min ago</div>
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

const AnimationWrapper = styled.div<{ interval: number }>`
  ${({ interval }) => {
    return `
      animation-duration: ${interval}s;
    `
  }}
`

const Wrapper = styled.div`
  position: fixed;
  bottom: 10%;
  left: 20px;
  width: 160px;
  height: 40px;
  border-radius: 40px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  .img {
    width: 20px;
    height: 20px;
    border-radius: 40px;
    margin-left: 10px;
  }
  .content {
    font-size: 12px;
    margin-right: 10px;
  }
`

export default Entity
