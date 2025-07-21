"use client"

import { useState } from "react"
import Link from "next/link"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Eye, EyeOff, Guitar, Piano, Drum } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Navbar from '@/components/ui/navbar'
import axios from 'axios'
import { useRouter } from "next/navigation"
import { useDispatch } from 'react-redux';
import { addLoginDetails } from '@/redux/reducerSlices/userSlice';


import { toast } from 'sonner';
const validationSchema = Yup.object({
  email: Yup.string().email("Please enter a valid email address").required("Email is required"),
  password: Yup.string().required("Password is required"),
})

const initialValues = {
  email: "",
  password: "",
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
const router =useRouter()
const dispatch= useDispatch()
 const handleSubmit = async (values, { setSubmitting, setStatus }) => {
  try {
    const { data } = await axios.post('http://localhost:3001/login', values)
    if (data?.isLoggedin && data.user?.role === "admin") {
      toast("Admin login successful!")
      dispatch(addLoginDetails(data))
      router.push('/admin/dashboard')
    } else if (data?.isLoggedin) {
      toast("Access denied: Only admins can log in here.")
      setStatus({ type: "error", message: "Access denied: Only admins can log in here." })
    } else {
      toast(data?.message || "Login failed.")
      setStatus({ type: "error", message: data?.message || "Login failed." })
    }
  } catch (error) {
    toast("Login failed. Please try again.")
    setStatus({ type: "error", message: "Login failed. Please try again." })
  } finally {
    setSubmitting(false)
  }
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-md">
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center space-y-2">
              <div className="flex justify-center gap-2 mb-4">
                <img src="/images/logo.png" className="h-30 w-40" alt="Logo" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Sign in to YalaRythms</CardTitle>
              <CardDescription className="text-gray-600">
                Welcome back! Chief.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ errors, touched, isSubmitting, status }) => (
                  <Form className="space-y-4">
                    {/* Status Messages */}
                    {status && (
                      <div
                        className={`p-3 rounded-md text-sm ${
                          status.type === "success"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                      >
                        {status.message}
                      </div>
                    )}

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Field
                        as={Input}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        className={errors.email && touched.email ? "border-red-500" : ""}
                      />
                      <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Field
                          as={Input}
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Your password"
                          className={errors.password && touched.password ? "border-red-500" : ""}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isSubmitting}>
                      {isSubmitting ? "Signing in..." : "Sign in"}
                    </Button>
                  </Form>
                )}
              </Formik>

              {/* Divider */}
              <div className="relative">
                <Separator />

              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}