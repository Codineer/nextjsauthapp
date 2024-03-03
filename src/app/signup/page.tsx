"use client"
import Link from "next/link"
import React from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { EnvelopeOpenIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
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
import toast from "react-hot-toast"

export default function SignUpPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        userName: ""
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(true)

    const [loading, setLoading] = React.useState(false)

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user)
            console.log("signup success", response.data)
            router.push("/login")
        } catch (error: any) {
            console.log("signup failed", error.response.data.error)
            toast.error(error.response.data.error)
        } finally {
            setLoading(false)
        }
    }
    React.useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.userName.length > 0) {
            setButtonDisabled(false)
        }

        else {
            setButtonDisabled(true)
        }
    }, [user])

    return (
        <div className="bg-cover bg-center bg-no-repeat bg-custom-background flex flex-col items-center justify-center min-h-screen py-2">
            <hr />
            <Card className="w-[350px] backdrop-blur-md bg-opacity-30 bg-blue-400 outline-none border-0">
                <CardHeader>
                    <CardTitle>{loading ? "processing" : "Signup"}</CardTitle>
                    <CardDescription className="text-black">Please fill the below form.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="username">username</Label>
                                <Input type="text"
                                    id="username"
                                    value={user.userName}
                                    onChange={(e) => setUser({ ...user, userName: e.currentTarget.value })}
                                    placeholder="username" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input type="text"
                                    id="email"
                                    value={user.email}
                                    onChange={(e) => setUser({ ...user, email: e.currentTarget.value })}
                                    placeholder="Email" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input type="password"
                                    id="password"
                                    value={user.password}
                                    onChange={(e) => setUser({ ...user, password: e.currentTarget.value })}
                                    placeholder="password" />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={onSignup}>{buttonDisabled ? "No signup" : "Signup"}</Button>
                    {/* <Button>Deploy</Button> */}
                    <Link href={"/login"}>
                        <Button>
                            <EnvelopeOpenIcon className="mr-2 h-4 w-4" />

                            Login with Email


                        </Button>
                    </Link>
                </CardFooter>
            </Card>


        </div>
    )
}