'use client'

import dynamic from 'next/dynamic'

const InkFluid = dynamic(() => import('@/components/FluidCanvas/InkFluid'), {
  ssr: false,
})

export default function InkFluidWrapper() {
  return <InkFluid />
}
