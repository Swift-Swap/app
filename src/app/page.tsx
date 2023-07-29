"use client"
import React from 'react'
import Image from 'next/image'
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'
export default function Home() {
    const { toast } = useToast()
    const [showed, setShowed] = React.useState(false)
    React.useState(() => {
        if (typeof localStorage === "undefined") return
        const isShowed = localStorage.getItem("showed-unfinished-website")
        if (isShowed) {
            if (JSON.parse(isShowed)) {
                console.log(isShowed)
                setShowed(true)
                return
            }
        }
        if (showed) return
        toast({
            title: "Unfinished website",
            description: "This website is still under construction. Please check back later!",
            action: <ToastAction altText="Never show again" onClick={() => {
                if (typeof localStorage === "undefined") return
                localStorage.setItem("showed-unfinished-website", JSON.stringify(true))
            }}>Dont show again</ToastAction>,
        })
        setShowed(true)
    })
    return (
        <div className="flex flex-col justify-center items-center w-screen flex-1">
            <div className="flex justify-start gap-40 items-center w-2/3">
                <div className="flex flex-col gap-8">
                    <h1 className="text-4xl"> Pave the way for an easy day! </h1>
                    <p>
                        A platform designed to help students trade parking spots on campus efficiently and conveniently. We aim to alleviate parking congestion by encouraging voluntary student spot exchanges.
                    </p>
                </div>
                <Image
                    src="https://lh3.googleusercontent.com/pw/AIL4fc8HD64g7VHf2szaXEpWXVo3sMz0vY2PEtYM05IRJivYi1ryqvxb4BDxYqxoonLzjr4RyGUVRoSq3bCrw-k2e2YhSt_063DfKCYBTFE0go5D8NxglYUdPIiotqm3q7Wfp1vtzE2dZ5JeFnJnf9ac3vvI4mwChgQQFXZdxTXMmKEi_cZ-O0S2AiRHuESwr8O3F9fMAwTA6sOFZKWXmlYBtRN7eKZFawxQCVCJIle4atvQhCh55cEWr_uSRsR1hQIfafVheRTuJ2WNMrUEqFDiLOY5QYP_MI6oOVv3MJMDJojRbGUy_MwOxH4A_Fr_tY5gQHBFuqrmzeukPCrAm2cpSK_E0ys8Dja_c5YZSa3ElTVhFhgd4wRHbGAdbi53q3PsH4bd4cMzK1cqU1RFPHENL1hVMBmB3xJUrQSAilOR7dlxkxLcnAUieXy6vkfBCnt3ysqyD3XHDx55jWOK515garJSs1k4Ds5KH4PB9jGUwNkuGBqiqg1Q3uJqLARepgFAF_fMHo2y6za9lNo3mvNgNriIxq4UkEU9eTWmMPYiGgB5b_YkH_7PUKyf3eDqbBHqrGp-cvy-6pUuIYQcplooCfqAeTy_KvMVtWUk5rYbjEycoFpsHMkDK32RJArGc8akVSGcIIgdFXzKZBuDAy4s0Wh0VTj9noMTT0bWq-FV07bA2SgjEt2l0LT0Fox6QTVthWe_o0zk2IYMmBqJXo5A5bG1OhGxw9XcLN-vHdp9oazGM9T5LYNzrqvwIEQmIaJUPkQMairOZijFbAyxUdtfF5vriHz_tExvee77WfzFoV3iK7qam8CAdFtzq_rTZNeEahsC8p41byAArGBQozAXUiG2ge-X4ojlM2aVEiGMClRzKsKIkijLiJUICNX-797JkwMS-nBqnIVTmhWbCuVkWrkqy-ajPR5X0biFdZ9QbhWkjHYJxMIlzVYhdyT7CR03FNWOiVMlpDzPnNZcLKiIQpMllTRAAj8BZjr43twVkl61nGQZ-u3JwRp1Z2CMSQ7libo=w660-h660-s-no?authuser=3"
                    width={500} height={500} alt={"Image of car"} />
            </div>
        </div>
    )
}

