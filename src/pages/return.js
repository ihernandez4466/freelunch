import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CheckoutComplete from './checkout-complete'

export default function Return() {
  const router = useRouter()
  const { session_id } = router.query
  const [status, setStatus] = useState(null)
  const [customerEmail, setCustomerEmail] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!session_id) return

    const fetchSession = async () => {
      try {
        const response = await fetch(`/api/stripe/session?session_id=${session_id}`)
        const data = await response.json()

        if (data.status === 'open') {
          router.push('/')
          return
        }

        setStatus(data.status)
        setCustomerEmail(data.customer_email)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching session:', error)
        setLoading(false)
      }
    }

    fetchSession()
  }, [session_id, router])

  if (!session_id) {
    return <div>Invalid session</div>
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (status === 'complete') {
    return (
      <section id="success">
        <CheckoutComplete customerEmail={customerEmail} />
      </section>
    )
  }

  return <div>Something went wrong</div>
}
