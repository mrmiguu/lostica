import React, { useState } from 'react'
import styles from './App.module.css'
import sheet1 from './1.png'

function App() {

  let m = [
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [, , , , , , , , ,],
    [2, 3, 3, 3, 3, 3, 3, 3, 3, 4],
    [11, 12, 12, 12, 12, 12, 12, 12, 12, 13],
  ]

  let sheetW = 9

  let [camXY, setCamXY] = useState([10, 20])

  return (
    <div
      className={styles.App}
      onMouseMove={e => {
        setCamXY([-~~(e.clientX / 32), -~~(e.clientY / 32)])
      }}
    >

      <div className={styles.Camera}>
        <div
          className={styles.Map}
          style={{
            transform: `translate(${-(camXY[0] * 32)}px, ${-(camXY[1] * 32)}px)`,
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

        </div>
      </div>

    </div>
  )
}

export default App
