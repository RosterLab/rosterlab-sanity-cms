import { PortableText as BasePortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/client'

const components = {
  block: {
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1 className="text-4xl font-bold mb-6 text-neutral-900">{children}</h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-3xl font-bold mb-4 text-neutral-900">{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="text-2xl font-bold mb-3 text-neutral-900">{children}</h3>
    ),
    h4: ({ children }: { children: React.ReactNode }) => (
      <h4 className="text-xl font-bold mb-2 text-neutral-900">{children}</h4>
    ),
    normal: ({ children }: { children: React.ReactNode }) => (
      <p className="mb-4 text-neutral-700 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="border-l-4 border-primary-500 pl-6 py-2 mb-4 italic text-neutral-600 bg-neutral-50 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-neutral-700">
        {children}
      </ul>
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-neutral-700">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children: React.ReactNode }) => <li className="ml-4">{children}</li>,
    number: ({ children }: { children: React.ReactNode }) => <li className="ml-4">{children}</li>,
  },
  marks: {
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="font-semibold text-neutral-900">{children}</strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }: { children: React.ReactNode }) => (
      <code className="bg-neutral-100 text-neutral-800 px-1 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ value, children }: { value: { href: string; blank?: boolean }; children: React.ReactNode }) => {
      const target = value?.blank ? '_blank' : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-primary-600 hover:text-primary-800 underline"
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }: { value: { asset?: { _ref: string }; alt?: string } }) => {
      if (!value?.asset?._ref) {
        return null
      }
      
      return (
        <div className="my-8">
          <Image
            src={urlFor(value).width(800).height(400).url()}
            alt={value.alt || 'Blog image'}
            width={800}
            height={400}
            className="rounded-lg shadow-md w-full h-auto"
          />
          {value.alt && (
            <p className="text-center text-sm text-neutral-500 mt-2">
              {value.alt}
            </p>
          )}
        </div>
      )
    },
    youtube: ({ value }: { value: { url: string } }) => {
      const { url } = value
      if (!url) return null
      
      const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1]
      if (!videoId) return null
      
      return (
        <div className="my-8">
          <div className="relative aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video"
              className="absolute inset-0 w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )
    },
  },
}

interface PortableTextProps {
  value: Array<{
    _type: string;
    children?: Array<{ text: string; marks?: string[] }>;
    markDefs?: Array<{ _key: string; _type: string; href?: string }>;
    style?: string;
    listItem?: string;
  }>
}

export default function PortableText({ value }: PortableTextProps) {
  return <BasePortableText value={value} components={components} />
}