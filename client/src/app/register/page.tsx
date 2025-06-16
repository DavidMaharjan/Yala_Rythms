"use client"

import { useState } from "react"
import Link from "next/link"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Music, Eye, EyeOff, Guitar, Piano, Drum } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import axios from "axios"
import { toast } from "sonner"
import Navbar from "@/components/ui/navbar"

// Validation Schema
const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .required("Last name is required"),
  email: Yup.string().email("Please enter a valid email address").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  userType: Yup.string()
    .oneOf(["buyer", "seller", "both"], "Please select a valid option")
    .required("Please select how you plan to use the platform"),
  agreeToTerms: Yup.boolean()
    .oneOf([true], "You must agree to the terms and conditions")
    .required("You must agree to the terms and conditions"),
  subscribeNewsletter: Yup.boolean(),
})

// Initial Values
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  userType: "both",
  agreeToTerms: false,
  subscribeNewsletter: false,
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

const handleSubmit = async (values, { setSubmitting, setStatus }) => {
  try {
    setStatus(null)
    const response = await axios.post("http://localhost:3001/register", values)
    // toast(response.data.message)

    if (response.status === 201 || response.status === 200) {
      setStatus({ type: "success", message: "Account created successfully! Please check your email for verification." })
      // router.push('/login')
    } else {
      setStatus({ type: "error", message: "Registration failed. Please try again." })
    }
  } 
  catch (error:unknown) {
    // Check for duplicate email error from backend
    if (
      error.response &&
      (error.response.status === 409 || // 409 Conflict is common for duplicate
        (error.response.data && error.response.data.message && error.response.data.message.toLowerCase().includes("email")))
    ) {
      setStatus({ type: "error", message: "Email already taken. Please use a different email." })
    } else {
      setStatus({ type: "error", message: "Registration failed. Please try again." })
    }
  }
  finally {
    setSubmitting(false)
  }
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      
      <Navbar></Navbar>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-md">
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center space-y-2">
              <div className="flex justify-center gap-2 mb-4">
               <img src="./images/logo.png" alt="logo" className="h-30 w-40"></img>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Sign Up</CardTitle>
              <CardDescription className="text-gray-600">
                Create your account to buy and sell musical instruments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ values, errors, touched, isSubmitting, status, setFieldValue }) => (
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

                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Field
                          as={Input}
                          id="firstName"
                          name="firstName"
                          placeholder="John"
                          className={errors.firstName && touched.firstName ? "border-red-500" : ""}
                        />
                        <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Field
                          as={Input}
                          id="lastName"
                          name="lastName"
                          placeholder="Doe"
                          className={errors.lastName && touched.lastName ? "border-red-500" : ""}
                        />
                        <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Field
                        as={Input}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
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
                          placeholder="Create a strong password"
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

                    {/* Confirm Password */}
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Field
                          as={Input}
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          className={errors.confirmPassword && touched.confirmPassword ? "border-red-500" : ""}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                    </div>

                    {/* User Type */}
                    <div className="space-y-3">
                      <Label>I want to:</Label>
                      <RadioGroup value={values.userType} onValueChange={(value) => setFieldValue("userType", value)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="buyer" id="buyer" />
                          <Label htmlFor="buyer">Buy instruments only</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="seller" id="seller" />
                          <Label htmlFor="seller">Sell instruments only</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="both" id="both" />
                          <Label htmlFor="both">Both buy and sell</Label>
                        </div>
                      </RadioGroup>
                      <ErrorMessage name="userType" component="div" className="text-red-500 text-sm" />
                    </div>

                    {/* Terms and Conditions */}
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="agreeToTerms"
                          checked={values.agreeToTerms}
                          onCheckedChange={(checked) => setFieldValue("agreeToTerms", checked)}
                        />
                        <Label htmlFor="agreeToTerms" className="text-sm leading-5">
                          I agree to the{" "}
                          <Link href="/terms" className="text-purple-600 hover:underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-purple-600 hover:underline">
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>
                      <ErrorMessage name="agreeToTerms" component="div" className="text-red-500 text-sm" />
                    </div>

                    {/* Newsletter */}
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="subscribeNewsletter"
                        checked={values.subscribeNewsletter}
                        onCheckedChange={(checked) => setFieldValue("subscribeNewsletter", checked)}
                      />
                      <Label htmlFor="subscribeNewsletter" className="text-sm">
                        Send me updates about new instruments and deals
                      </Label>
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isSubmitting}>
                      {isSubmitting ? "Creating Account..." : "Create Account"}
                    </Button>
                  </Form>
                )}
              </Formik>

              {/* Divider */}
              <div className="relative">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
                  Or continue with
                </span>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </Button>
              </div>

              {/* Login Link */}
              <div className="text-center text-sm">
                <span className="text-gray-600">Already have an account? </span>
                <Link href="/login" className="text-purple-600 hover:underline font-medium">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
