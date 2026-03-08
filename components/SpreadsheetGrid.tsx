"use client"

import { useState, useEffect } from "react"
import { evaluateFormula } from "../lib/formula"

import { db } from "../lib/firebase"
import { doc, setDoc, onSnapshot } from "firebase/firestore"

const ROWS = 15
const COLS = 8

const columns = Array.from({ length: COLS }, (_, i) =>
  String.fromCharCode(65 + i)
)

export default function SpreadsheetGrid() {

  const [data, setData] = useState(
    Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => "")
    )
  )

  const [saving, setSaving] = useState(false)

  const [userName] = useState(
    "User-" + Math.floor(Math.random() * 1000)
  )

  const [activeUsers, setActiveUsers] = useState<string[]>([])

  useEffect(() => {

    const docRef = doc(db, "spreadsheets", "sheet1")
    const presenceRef = doc(db, "presence", "users")

    // register user as active
    setDoc(presenceRef, {
      [userName]: true
    }, { merge: true })

    // spreadsheet realtime listener
    const unsubscribe = onSnapshot(docRef, (docSnap) => {

      if (docSnap.exists()) {

        const firestoreData = docSnap.data().cells

        if (firestoreData) {

          const grid = Array.from({ length: ROWS }, () =>
            Array.from({ length: COLS }, () => "")
          )

          Object.keys(firestoreData).forEach((key) => {

            const col = key.charCodeAt(0) - 65
            const row = parseInt(key.substring(1)) - 1

            grid[row][col] = firestoreData[key]

          })

          setData(grid)

        }

      }

    })

    // presence listener
    const unsubscribePresence = onSnapshot(presenceRef, (snap) => {

      if (snap.exists()) {

        const users = Object.keys(snap.data())
        setActiveUsers(users)

      }

    })

    return () => {
      unsubscribe()
      unsubscribePresence()
    }

  }, [])

  const handleChange = async (row: number, col: number, value: string) => {

    const newData = data.map(r => [...r])
    newData[row][col] = value

    setData(newData)
    setSaving(true)

    const flatData:any = {}

    newData.forEach((rowData, r) => {
      rowData.forEach((cell, c) => {

        const key = String.fromCharCode(65 + c) + (r + 1)

        flatData[key] = cell

      })
    })

    const docRef = doc(db, "spreadsheets", "sheet1")

    await setDoc(docRef, {
      cells: flatData
    })

    setSaving(false)

  }

  return (
    <div>

      {/* Active Users */}
      <div style={{marginBottom:"10px"}}>
        <strong>Active Users:</strong>

        {activeUsers.map((user)=>(
          <div key={user}>
            🟢 {user}
          </div>
        ))}
      </div>

      {/* Saving Indicator */}
      <div style={{marginBottom:"10px", fontWeight:"bold"}}>
        {saving ? "Saving..." : "Saved ✓"}
      </div>

      <div style={{overflowX:"auto"}}>

        {/* Column Headers */}
        <div style={{display:"flex"}}>
          <div style={{width:"40px"}}></div>

          {columns.map((col)=>(
            <div
              key={col}
              style={{
                width:"100px",
                border:"1px solid gray",
                textAlign:"center",
                fontWeight:"bold"
              }}
            >
              {col}
            </div>
          ))}
        </div>

        {/* Rows */}
        {data.map((row, rIndex)=>(
          <div key={rIndex} style={{display:"flex"}}>

            {/* Row Number */}
            <div
              style={{
                width:"40px",
                border:"1px solid gray",
                textAlign:"center",
                fontWeight:"bold"
              }}
            >
              {rIndex+1}
            </div>

            {/* Cells */}
            {row.map((cell, cIndex)=>(
              <input
                key={cIndex}
                value={evaluateFormula(cell, data)}
                onChange={(e)=>handleChange(rIndex,cIndex,e.target.value)}
                style={{
                  border:"1px solid gray",
                  width:"100px",
                  height:"35px"
                }}
              />
            ))}

          </div>
        ))}

      </div>

    </div>
  )
}