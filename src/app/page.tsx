import Image from "next/image"
import { Mail } from "../components/mail/mail"
import { mails } from "../data/sales-data"

export default function HomePage() {
  const defaultLayout = [20, 32, 48]
  const defaultCollapsed = false

  const accounts = [
    {
      label: "Sales Team",
      email: "sales@company.com",
      icon: (
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
          <title>Gmail</title>
          <path
            d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      label: "Support Team", 
      email: "support@company.com",
      icon: (
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
          <title>Vercel</title>
          <path d="M24 22.525H0l12-21.05 12 21.05z" fill="currentColor" />
        </svg>
      ),
    },
  ]

  return (
    <div className="h-screen flex-col md:flex">
      <Mail
        accounts={accounts}
        mails={mails}
        defaultLayout={defaultLayout}
        defaultCollapsed={defaultCollapsed}
        navCollapsedSize={4}
      />
    </div>
  )
} 