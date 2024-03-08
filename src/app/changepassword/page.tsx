"use client"
import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import axios from "axios"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
const Page = () => {

    const changepassword = async () => {
        setDisabled(true)
        console.log("utkaesh")
        try {
            const res = await axios.post("/api/users/changepassword", data)
            console.log(res)
        } catch (error: any) {
            console.log(error)
        }
    }
    const [data, setdata] = useState({
        oldPassword: "",
        newPassword: ""
    })
    useEffect(() => {
        if (data.newPassword.length > 0 && data.oldPassword.length > 0) {
            setDisabled(false)
        }
        else {
            setDisabled(true)
        }
    }, [data])

    const [disabled, setDisabled] = useState(true)
    return (
        <div className="flex justify-center items-center w-screen h-screen bg-black">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Fill Below Form</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Old Password</Label>
                                <Input id="name" value={data.oldPassword} placeholder="Enter Old Password" onChange={(e) => setdata({ ...data, oldPassword: e.currentTarget.value })} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">New Password</Label>
                                <Input id="name" value={data.newPassword} onChange={(e) => setdata({ ...data, newPassword: e.currentTarget.value })} placeholder="Enter New Password" />
                            </div>

                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    {/* <Button variant="outline"></Button> */}
                    <Button onClick={!disabled ? changepassword : undefined}>Submit</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Page
