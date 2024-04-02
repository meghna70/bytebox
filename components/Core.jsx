import React from 'react'
import CoreFeatureCard from "./ui/CoreFeatureCard"
import sync from "../public/sync.svg";
import collab from "../public/collab.svg";
import recover from "../public/recover.svg"
function Core() {
  return (
    <div>
        <div className= ' w-full'>
        <h2 style={{fontSize:40, fontWeight:500, marginBottom:80, textAlign:"center", color:"#373737"}} >Our Core Features</h2>
             
            <div className='flex flex-row justify-center items-center space-x-4'>
               <CoreFeatureCard img={sync}  title={"Synchronization"} subtitle="Seamless file synchronization across multiple devices."/>
                <CoreFeatureCard img={collab} title={"Collaboration"} subtitle="Download files and folders anywhere"/>
                <CoreFeatureCard img={recover} title={"Recovery"} subtitle="File recovery and version history features"/>
            </div>
        </div>
    </div>
  )
}

export default Core