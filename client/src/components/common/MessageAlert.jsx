import React from 'react'

export default function MessageAlert({children, isInfo}) {
  return (
    <div className={`rounded-lg p-2 ${isInfo ? 'bg-neutral-600 text-neutral-200 border border-neutral-200':'bg-red-400 text-red-600 border border-red-600'}`}>{children}</div>
  )
}
