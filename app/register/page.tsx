'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleRegister = async () => {
        setLoading(true)
        setError('')

        const { error } = await supabase.auth.signUp({
            email,
            password,
        })

        if (error) setError(error.message)
        else setError('Check your email to confirm!')

        setLoading(false)
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <Card className="w-87.5">
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className={error.includes('Check') ? 'text-green-500' : 'text-red-500'} text-sm>{error}</p>}
                    <Button onClick={handleRegister} disabled={loading} className="w-full">
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}