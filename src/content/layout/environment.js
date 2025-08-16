import React from 'react'

const Environment = ({ environment }) => {
    // environment components
    const sky = <div className="h-[50vh] bg-[#87C1E9]" />
    const grass = <div className="h-[50vh] bg-[#89BA38]" />
    const nightSky = <div className="h-[50vh] bg-[#1a1a2e]" />
    const concrete = <div className="h-[50vh] bg-[#808080]" />
    const water = <div className="h-[50vh] bg-[#0077be]" />
    const sand = <div className="h-[50vh] bg-[#e6be8a]" />
  
    // environment configurations
    const environments = {
        park: (
            <div className="fixed top-0 left-0 w-full h-screen -z-[2] overflow-hidden animate-fade-in">
                {sky}
                {grass}
            </div>
        ),
        night: (
            <div className="fixed top-0 left-0 w-full h-screen -z-[2] overflow-hidden animate-fade-in">
                {nightSky}
                {concrete}
            </div>
        ),
        beach: (
            <div className="fixed top-0 left-0 w-full h-screen -z-[2] overflow-hidden animate-fade-in">
                {sky}
                {sand}
            </div>
        ),
        ocean: (
            <div className="fixed top-0 left-0 w-full h-screen -z-[2] overflow-hidden animate-fade-in">
                {sky}
                {water}
            </div>
        ),
        city: (
            <div className="fixed top-0 left-0 w-full h-screen -z-[2] overflow-hidden animate-fade-in">
                {sky}
                {concrete}
            </div>
        )
    }

    // Return the requested environment configuration or default to park
    return environments[environment] || environments.park
}

export default Environment