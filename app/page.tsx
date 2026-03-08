"use client"

import { useRouter } from "next/navigation"

export default function Home() {

  const router = useRouter()

  return (
    <div style={{padding:"40px"}}>

      <h1 style={{fontSize:"28px", marginBottom:"20px"}}>
        Documents
      </h1>

      <button
        onClick={()=>router.push("/document/sheet1")}
        style={{
          padding:"10px 20px",
          background:"black",
          color:"white",
          borderRadius:"5px"
        }}
      >
        Open Spreadsheet
      </button>

    </div>
  )
}