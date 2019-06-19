import React, { useState, useEffect, useRef } from 'react'
import { useAnimationFrame } from './hooks'
import styles from './App.module.css'
import sheet1 from './1.png'

let m = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4],
  [11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13],
  [11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13],
  [11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13],
  [11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13],
  [11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13],
  [11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13],
  [11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13],
  [11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13],
]

let keyStep = {
  ArrowUp: [0, -1],
  ArrowRight: [1, 0],
  ArrowDown: [0, 1],
  ArrowLeft: [-1, 0],
}

function App() {
  let sheetW = 9

  let appRef = useRef()
  useEffect(() => {
    appRef.current.focus()
  }, [])

  let [char, setChar] = useState([0, 15])

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
      let [dx, dy] = keyStep[key] || [0, 0]

      setChar(([x, y]) => {
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
            transform: `translate(${-(char[0] * 32) + camSize[0] / 2 - 32 / 2}px, ${-(char[1] * 32 - camSize[1] / 2 + 32 / 2)}px)`,
          }}
        >

          {
            m.flatMap((row, y) => {

              return row.map((tile, x) => {

                let srcX = (tile % sheetW) * 32
                let srcY = ~~(tile / sheetW) * 32

                // console.log(`(${x},${y}) ${srcX} ${srcY}`)

                return (
                  <div
                    key={`${x},${y}`}
                    className={styles.Tile}
                    style={{
                      left: `${x * 32}px`,
                      top: `${y * 32}px`,
                    }}
                  >

                    {
                      tile !== undefined ? (

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

          <div
            className={styles.Char}
            style={{
              // left: `${char[0] * 32}px`,
              // top: `${char[1] * 32}px`,

              transform: `translate(${char[0] * 32}px, ${char[1] * 32}px)`,
            }}
          >
            🚶‍♂️
          </div>

        </div>
      </div>

    </div>
  )
}

export default App
