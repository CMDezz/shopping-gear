// src/app/(auth)/login/page.tsx
'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/atoms/Button/Button'
import { Input } from '@/components/atoms/Input/Input'
import { Label } from '@/components/atoms/Label/Label'
import { Card } from '@/components/molecules/Card/Card'
import { Tabs } from '@/components/molecules/Tabs/Tabs'
import { loginSchema, registerSchema } from '@lib/shared/schemas'
import { loginAction, registerAction } from '@/lib/features/auth/auth.actions'
import { useLogin, useRegister } from '@lib/features/auth/hooks/auth.hooks'
import { toast } from 'sonner'
import type { LoginFormData, RegisterFormData } from '@lib/shared/schemas'

export default function Login() {
    const [isLoading, setIsLoading] = useState(false)
    const [activeTab, setActiveTab] = useState('login')

    // TanStack Query mutations
    const loginMutation = useLogin()
    const registerMutation = useRegister()

    // React Hook Form setup
    const loginForm = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    })

    const registerForm = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    })

    // Server Action handlers
    const handleServerActionLogin = async (formData: FormData) => {
        setIsLoading(true)
        try {
            const result = await loginAction(formData)

            if (result.success) {
                toast.success(result.message || 'Login successful!')
            } else {
                toast.error(result.error || 'Login failed')
            }
        } catch (error) {
            toast.error('An unexpected error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    const handleServerActionRegister = async (formData: FormData) => {
        setIsLoading(true)
        try {
            const result = await registerAction(formData)

            if (result.success) {
                toast.success(result.message || 'Registration successful!')
            } else {
                toast.error(result.error || 'Registration failed')
            }
        } catch (error) {
            toast.error('An unexpected error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    // TanStack Query handlers
    const handleQueryLogin = async (data: LoginFormData) => {
        await loginMutation.mutateAsync(data)
    }

    const handleQueryRegister = async (data: RegisterFormData) => {
        await registerMutation.mutateAsync(data)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Authentication Demo
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Server Actions + TanStack Query + Middleware
                    </p>
                </div>

                <Card className="p-6">
                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="w-full"
                    >
                        <div className="mb-6 flex space-x-1">
                            <button
                                className={`rounded-md px-4 py-2 text-sm font-medium ${
                                    activeTab === 'login'
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                                onClick={() => setActiveTab('login')}
                            >
                                Login
                            </button>
                            <button
                                className={`rounded-md px-4 py-2 text-sm font-medium ${
                                    activeTab === 'register'
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                                onClick={() => setActiveTab('register')}
                            >
                                Register
                            </button>
                        </div>

                        {/* Server Actions Section */}
                        <div className="space-y-4">
                            <div className="border-l-4 border-green-500 pl-4">
                                <h3 className="text-lg font-semibold text-green-700">
                                    Server Actions
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Direct server-side execution with middleware
                                    validation
                                </p>
                            </div>

                            {activeTab === 'login' ? (
                                <form
                                    action={handleServerActionLogin}
                                    className="space-y-4"
                                >
                                    <div>
                                        <Label htmlFor="server-email">
                                            Email
                                        </Label>
                                        <Input
                                            id="server-email"
                                            name="email"
                                            type="email"
                                            required
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="server-password">
                                            Password
                                        </Label>
                                        <Input
                                            id="server-password"
                                            name="password"
                                            type="password"
                                            required
                                            placeholder="Enter your password"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full"
                                    >
                                        {isLoading
                                            ? 'Logging in...'
                                            : 'Login with Server Action'}
                                    </Button>
                                </form>
                            ) : (
                                <form
                                    action={handleServerActionRegister}
                                    className="space-y-4"
                                >
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="server-firstName">
                                                First Name
                                            </Label>
                                            <Input
                                                id="server-firstName"
                                                name="firstName"
                                                required
                                                placeholder="First name"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="server-lastName">
                                                Last Name
                                            </Label>
                                            <Input
                                                id="server-lastName"
                                                name="lastName"
                                                required
                                                placeholder="Last name"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="server-register-email">
                                            Email
                                        </Label>
                                        <Input
                                            id="server-register-email"
                                            name="email"
                                            type="email"
                                            required
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="server-register-password">
                                            Password
                                        </Label>
                                        <Input
                                            id="server-register-password"
                                            name="password"
                                            type="password"
                                            required
                                            placeholder="Enter your password"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full"
                                    >
                                        {isLoading
                                            ? 'Registering...'
                                            : 'Register with Server Action'}
                                    </Button>
                                </form>
                            )}
                        </div>

                        {/* TanStack Query Section */}
                        <div className="mt-8 space-y-4">
                            <div className="border-l-4 border-purple-500 pl-4">
                                <h3 className="text-lg font-semibold text-purple-700">
                                    TanStack Query
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Client-side state management with caching
                                    and mutations
                                </p>
                            </div>

                            {activeTab === 'login' ? (
                                <form
                                    onSubmit={loginForm.handleSubmit(
                                        handleQueryLogin
                                    )}
                                    className="space-y-4"
                                >
                                    <div>
                                        <Label htmlFor="query-email">
                                            Email
                                        </Label>
                                        <Input
                                            id="query-email"
                                            {...loginForm.register('email')}
                                            type="email"
                                            placeholder="Enter your email"
                                        />
                                        {loginForm.formState.errors.email && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {
                                                    loginForm.formState.errors
                                                        .email.message
                                                }
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="query-password">
                                            Password
                                        </Label>
                                        <Input
                                            id="query-password"
                                            {...loginForm.register('password')}
                                            type="password"
                                            placeholder="Enter your password"
                                        />
                                        {loginForm.formState.errors
                                            .password && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {
                                                    loginForm.formState.errors
                                                        .password.message
                                                }
                                            </p>
                                        )}
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={loginMutation.isPending}
                                        className="w-full"
                                    >
                                        {loginMutation.isPending
                                            ? 'Logging in...'
                                            : 'Login with TanStack Query'}
                                    </Button>
                                </form>
                            ) : (
                                <form
                                    onSubmit={registerForm.handleSubmit(
                                        handleQueryRegister
                                    )}
                                    className="space-y-4"
                                >
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="query-firstName">
                                                First Name
                                            </Label>
                                            <Input
                                                id="query-firstName"
                                                {...registerForm.register(
                                                    'firstName'
                                                )}
                                                placeholder="First name"
                                            />
                                            {registerForm.formState.errors
                                                .firstName && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {
                                                        registerForm.formState
                                                            .errors.firstName
                                                            .message
                                                    }
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="query-lastName">
                                                Last Name
                                            </Label>
                                            <Input
                                                id="query-lastName"
                                                {...registerForm.register(
                                                    'lastName'
                                                )}
                                                placeholder="Last name"
                                            />
                                            {registerForm.formState.errors
                                                .lastName && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {
                                                        registerForm.formState
                                                            .errors.lastName
                                                            .message
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="query-register-email">
                                            Email
                                        </Label>
                                        <Input
                                            id="query-register-email"
                                            {...registerForm.register('email')}
                                            type="email"
                                            placeholder="Enter your email"
                                        />
                                        {registerForm.formState.errors
                                            .email && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {
                                                    registerForm.formState
                                                        .errors.email.message
                                                }
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="query-register-password">
                                            Password
                                        </Label>
                                        <Input
                                            id="query-register-password"
                                            {...registerForm.register(
                                                'password'
                                            )}
                                            type="password"
                                            placeholder="Enter your password"
                                        />
                                        {registerForm.formState.errors
                                            .password && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {
                                                    registerForm.formState
                                                        .errors.password.message
                                                }
                                            </p>
                                        )}
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={registerMutation.isPending}
                                        className="w-full"
                                    >
                                        {registerMutation.isPending
                                            ? 'Registering...'
                                            : 'Register with TanStack Query'}
                                    </Button>
                                </form>
                            )}
                        </div>
                    </Tabs>
                </Card>

                <div className="text-center">
                    <p className="text-sm text-gray-500">
                        Demo credentials: user@example.com / password123
                    </p>
                </div>
            </div>
        </div>
    )
}
