import React, { useState, useEffect, useRef } from 'react'
import Cam from './Cam'
import { useAnimationFrame } from './hooks'
import styles from './App.module.scss'

import sheet1 from './grass-2.png'
let sheet1W = 3
let sheet1H = 3

function xyStyle(x, y) {
  let isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

  let style

  if (isFirefox) {
    // fixes the reset-anim glitch
    style = {
      left: `${x}px`,
      top: `${y}px`,
    }
  } else {
    style = {
      transform: `translate(${x}px, ${y}px)`
    }
  }

  return style || {}
}

let m = [
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
  [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
  [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
  [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
  [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
  [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
  [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
  [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
]

let ty = {
  [sheet1]: {
    0: 'b',
    1: 'b',
    2: 'b',
    3: 'b',
    4: 'b',
    5: 'b',
    6: 'b',
    7: 'b',
    8: 'b',
  }
}

let keyStep = {
  ArrowUp: [null, -1],
  ArrowRight: [1, 0],
  ArrowDown: [null, 1],
  ArrowLeft: [-1, 0],
}

function App() {


  let appRef = useRef()
  useEffect(() => {
    appRef.current.focus()
  }, [])

  let [char, setChar] = useState([null, 15])

  let [camSize, setCamSize] = useState([window.innerWidth, window.innerHeight])
  useEffect(() => {

    let fn = () => setCamSize([window.innerWidth, window.innerHeight])
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)

  }, [])

  let [key, setKey] = useState()

  useEffect(() => {
    console.log(`key ${key}`)
  }, [key])

  let [next375ms, setNext375ms] = useState(0)
  useAnimationFrame(t => {

    if (t > next375ms) {
      let [dx, dy] = keyStep[key] || [null, 0]

      setChar(([x, y]) => {
        if (x + dx < 0) return [x, y]
        if (x + dx >= (m[y + dy] || []).length) return [x, y]
        if (y + dy < 0) return [x, y]
        if (y + dy >= m.length) return [x, y]
        let type = ty[sheet1][m[y + dy][x + dx]]
        if (type === 'b') return [x, y]
        return [x + dx, y + dy]
      })

      setNext375ms(t + 375)
    }

  })

  return (
    <div
      ref={appRef}
      className={styles.App}
      tabIndex="0"
      // onMouseMove={e => {
      //   setCamXY([~~(e.clientX / 32), ~~(e.clientY / 32)])
      // }}
      onKeyDown={e => {
        setKey(e.key)
      }}
      onKeyUp={e => {
        if (e.key !== key) return
        setKey()
      }}
    >

      <div className={styles.Camera}>

        <div
          className={styles.Map}
          style={{
            width: `${m[0].length * 32}px`,
            height: `${m.length * 32}px`,
            ...xyStyle(
              -(char[0] * 32) + camSize[0] / 2 - 32 / 2,
              -(char[1] * 32 - camSize[1] / 2 + 32 / 2)
            ),
          }}
        >

          {
            m.flatMap((row, y) => {

              return row.map((tile, x) => {

                let srcX = (tile % sheet1W) * 32
                let srcY = ~~(tile / sheet1H) * 32

                // console.log(`(${x},${y}) ${srcX} ${srcY}`)

                return (
                  <div
                    key={`${x},${y}`}
                    className={styles.Tile}
                    style={{
                      left: `${x * 32}px`,
                      top: `${y * 32}px`,
                      // border: `1px solid`
                    }}
                  >

                    {
                      tile !== null ? (

                        <img
                          src={sheet1}
                          style={{
                            transform: `translate(${-srcX}px, ${-srcY}px)`,
                          }}
                        />

                      ) : null
                    }

                  </div>
                )

              })

            })
          }

          <Cam
            // camRef={ourCam}
            style={{
              ...xyStyle(
                char[0] * 32,
                char[1] * 32,
              ),
            }}
            flip={(key || '').indexOf('Left') === -1}
            anim={key ? 'walk' : 'stand'}
            hat="🎩"
          // onStream={stream => {
          //   // WebRTC stuff
          // }}
          />
        </div>
      </div>

    </div>
  )
}

export default App
