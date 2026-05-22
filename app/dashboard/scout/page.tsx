import { redirect } from 'next/navigation'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import ScoutClientPage from '@/components/scout/ScoutClientPage'

export default async function ScoutDashboardPage() {
  const user = await getLoggedInUser()

  // 1. Security Check
  if (!user) redirect('/login')

  // 2. Role Verification
  if (user.role !== 'scout' && user.role !== 'admin') {
    redirect('/')
  }

  // Pass the real user ID to the client component
  return <ScoutClientPage userId={user.$id || user.id} />
}