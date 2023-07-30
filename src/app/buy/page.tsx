"use client"
import { DatePicker } from '@/components/ui/daterangepicker'
import { addDays } from 'date-fns'
import React from 'react'
import { Button } from '@/components/ui/button'
import { listings, lots } from '@/lib/utils'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { format } from "date-fns"
import Nav from '@/components/navbar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'

export default function Home() {
    const [fromDate, setFromDate] = React.useState<Date | undefined>(undefined)
    const [toDate, setToDate] = React.useState<Date | undefined>(undefined)
    const [currLot, setCurrLot] = React.useState<string>("")
    const [all, setAll] = React.useState<boolean>(true)
    React.useEffect(() => {
        if (typeof localStorage === "undefined") return
        const toDate = localStorage.getItem("toDate")
        const fromDate = localStorage.getItem("fromDate")
        if (toDate) setToDate(new Date(toDate))
        if (fromDate) setFromDate(new Date(fromDate))
        if (!fromDate) setFromDate(new Date())
        if (!toDate) setToDate(addDays(new Date(), 2))
    }, [])
    function onFromDateChange(date: Date) {
        setFromDate(date)
        setAll(false)
        if (typeof localStorage === "undefined") return
        localStorage.setItem("fromDate", date.toDateString())
    }
    function onToDateChange(date: Date) {
        setToDate(date)
        setAll(false)
        if (typeof localStorage === "undefined") return
        localStorage.setItem("toDate", date.toDateString())
    }
    const lotsMapped = lots.map((lot) => {
        return (
            <Button variant={`${currLot == lot.toLowerCase() && !all ? "default" : "secondary"}`} key={lot} onClick={() => {
                if (lot.toLowerCase() === "all") {
                    setCurrLot(lot.toLowerCase())
                    setAll(false)
                    return
                }
                setCurrLot(lot.toLowerCase())
                setAll(false)
            }}>
                {lot}
            </Button>
        )
    })
    const listingsMap = listings.filter((l) => {
        if (all) return true
        return (l.lot.toLowerCase() === currLot.toLowerCase() || currLot.toLowerCase() === "all") && fromDate?.toDateString() === l.from && toDate?.toDateString() === l.to
    }).map((listing) => {
        return (
            <Card className="h-fit w-fit flex flex-col items-center text-center" key={listing.id}>
                <CardHeader>
                    <CardTitle className="text-xl"> {format(new Date(listing.from), "LLL dd")} - {format(new Date(listing.to), "LLL dd")}  </CardTitle>
                    <CardDescription className="text-md"> #{listing.lotNum} </CardDescription>
                    <CardDescription className="text-md"> {listing.lot} </CardDescription>
                    <Button> Buy </Button>
                </CardHeader>
            </Card>
        )
    })
    return (
        <div className="w-full flex flex-col md:flex-row p-2">
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline">
                            <Menu />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <div className={`px-12 py-20 w-full h-screen sticky top-0`}>
                            <div className="w-3/4">
                                {/* Sidebar content */}
                                <div className="flex flex-col gap-4 mb-24">
                                    <h2> Parking Lot </h2>
                                    {lotsMapped}
                                </div>
                                <div className="flex flex-col gap-4 mb-4">
                                    <h2> Time Range </h2>
                                    <h4 className="text-sm"> From </h4>
                                    <DatePicker setDate={setFromDate} date={fromDate} fn={onFromDateChange} />
                                    <h4 className="text-sm"> To </h4>
                                    <DatePicker setDate={setToDate} date={toDate} fn={onToDateChange} />
                                </div>
                                <Button variant={`${all ? "default" : "secondary"}`} className={`mt-16`} onClick={() => {
                                    setAll(!all)
                                }}> All </Button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
            {/* Add a sidebar container and apply fixed positioning */}
            <div className={`px-12 py-20 xl:w-1/4 lg:w-1/3 md:w-1/2 md:flex hidden border-r-2 border-r-foreground-50 h-screen sticky top-0`}>
                <div className="lg:w-3/4 w-full">
                    {/* Sidebar content */}
                    <div className="flex flex-col gap-4 mb-24">
                        <h2> Parking Lot </h2>
                        {lotsMapped}
                    </div>
                    <div className="flex flex-col gap-4 mb-4">
                        <h2> Time Range </h2>
                        <h4 className="text-sm"> From </h4>
                        <DatePicker setDate={setFromDate} date={fromDate} fn={onFromDateChange} />
                        <h4 className="text-sm"> To </h4>
                        <DatePicker setDate={setToDate} date={toDate} fn={onToDateChange} />
                    </div>
                    <Button variant={`${all ? "default" : "secondary"}`} className={`mt-16`} onClick={() => {
                        setAll(!all)
                    }}> All </Button>
                </div>
            </div>
            <div className="grid w-full h-fit place-items-center">
                <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-8 p-12">
                    {listingsMap}
                </div>
            </div>
        </div>
    )
}
