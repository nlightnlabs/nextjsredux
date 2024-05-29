import React from 'react'
import Link from 'next/link'

const Navigation = () => {
  return (
    <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/modules/apps">Apps</Link></li>
        <li><Link href="/modules/data_management">Data Management</Link></li>
        <li><Link href="/modules/models">Models</Link></li>
        <li><Link href="/modules/models">Integrations</Link></li>
        <li><Link href="/modules/workflows">Workflows</Link></li>
        <li><Link href="/modules/agents">Agents</Link></li>
    </ul>
  )
}

export default Navigation