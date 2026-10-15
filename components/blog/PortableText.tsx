import React from 'react'
import { PortableText as BasePortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/client'
import { canonicalArticleHref } from '@/lib/posts/article-redirects'

const components = {
  block: {
    h1: ({ children, value }: any) => {
      const text = Array.isArray(children) ? children.join('') : children
      const id = value?._key || (typeof text === 'string' ? text.toLowerCase().replace(/\s+/g, '-') : '')
      return (
        <h1 id={id} className="text-4xl font-bold mb-6 mt-8 text-neutral-900 scroll-mt-24">{children}</h1>
      )
    },
    h2: ({ children, value }: any) => {
      const text = Array.isArray(children) ? children.join('') : children
      const textString = typeof text === 'string' ? text : ''
      const id = value?._key || (textString.toLowerCase().replace(/\s+/g, '-') || '')
      
      // Debug: Log H2 rendering
      console.log('[PortableText] Rendering H2:', {
        children: children,
        text: text,
        textString: textString,
        id: id,
        value: value,
        hasEmptyText: !textString || textString.trim() === ''
      })
      
      return (
        <h2 id={id} className="text-3xl font-bold mb-4 mt-8 text-neutral-900 scroll-mt-24">{children}</h2>
      )
    },
    h3: ({ children, value }: any) => {
      const text = Array.isArray(children) ? children.join('') : children
      const id = value?._key || (typeof text === 'string' ? text.toLowerCase().replace(/\s+/g, '-') : '')
      return (
        <h3 id={id} className="text-2xl font-bold mb-3 mt-6 text-neutral-900 scroll-mt-24">{children}</h3>
      )
    },
    h4: ({ children, value }: any) => {
      const text = Array.isArray(children) ? children.join('') : children
      const id = value?._key || (typeof text === 'string' ? text.toLowerCase().replace(/\s+/g, '-') : '')
      return (
        <h4 id={id} className="text-xl font-bold mb-2 mt-4 text-neutral-900 scroll-mt-24">{children}</h4>
      )
    },
    normal: ({ children }: any) => (
      <p className="mb-4 text-neutral-700 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary-500 pl-6 py-2 mb-4 italic text-neutral-600 bg-neutral-50 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-outside mb-4 space-y-2 text-neutral-700 ml-8">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-outside mb-4 space-y-2 text-neutral-700 ml-8">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="pl-2">{children}</li>,
    number: ({ children }: any) => <li className="pl-2">{children}</li>,
  },
  marks: {
    usPreserve: ({ children }: any) => <>{children}</>,
    strong: ({ children }: any) => (
      <strong className="font-semibold text-neutral-900">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }: any) => (
      <code className="bg-neutral-100 text-neutral-800 px-1 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ value, children }: any) => {
      const target = value?.blank ? '_blank' : undefined
      return (
        <a
          href={canonicalArticleHref(value?.href)}
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
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null
      }

      // Keep the source resolution: resizing in Sanity first prevents Next.js
      // from serving sharp images on high-density screens.
      const dimensions = value.asset._ref.match(/-(\d+)x(\d+)-/)
      const crop = value.crop
      const width = dimensions
        ? Math.max(1, Math.round(Number(dimensions[1]) * (1 - (crop?.left || 0) - (crop?.right || 0))))
        : 800
      const height = dimensions
        ? Math.max(1, Math.round(Number(dimensions[2]) * (1 - (crop?.top || 0) - (crop?.bottom || 0))))
        : 400
      const src = urlFor(value).url()
      
      return (
        <div className="my-8">
          <a href={src} target="_blank" rel="noopener noreferrer" title="Open image at full size">
            <Image
              src={src}
              alt={value.alt || 'Blog image'}
              width={width}
              height={height}
              sizes="(min-width: 1536px) 640px, (min-width: 1280px) 580px, (min-width: 1024px) 450px, (min-width: 768px) 720px, (min-width: 640px) 592px, calc(100vw - 32px)"
              quality={95}
              className="rounded-lg shadow-md w-full h-auto cursor-zoom-in"
            />
          </a>
        </div>
      )
    },
    youtube: ({ value }: any) => {
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
  value: any
}

export default function PortableText({ value }: PortableTextProps) {
  return <BasePortableText value={value} components={components} />
}
