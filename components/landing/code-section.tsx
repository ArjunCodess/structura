"use client"

import Code from '@/components/landing/code'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { BASE_URL } from '@/lib/constants'

const codeBlock = `const data = "John is 25 years old and studies computer science at university."

const schema = {
  name: { type: "string" },
  age: { type: "number" },
  isStudent: { type: "boolean" },
  courses: {
    type: "array",
    items: { type: "string" }
  }
}

const res = await fetch('${BASE_URL}/api/extract', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    data,
    format: schema
  }),
})`

const CodeSection = () => {
  return (
    <ScrollArea className='relative'>
      <Code code={codeBlock} />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

export default CodeSection