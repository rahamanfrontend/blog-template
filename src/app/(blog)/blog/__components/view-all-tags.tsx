/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'

// @ts-ignore
import { Check, ChevronDown } from 'lucide-react'
import { SanityDocument } from 'next-sanity'
import { useEffect, useRef, useState } from 'react'

import { getAllTags } from '../utils/load-all-tags'

interface Tag {
  id: string
  name: string
}

export default function ViewAllTags({
  setSelectedTagsValue,
}: {
  setSelectedTagsValue: React.Dispatch<React.SetStateAction<string>>
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [tags, setTags] = useState<Tag[]>([])

  const [loader, setLoader] = useState(false)

  useEffect(() => {
    const fetchTags = async () => {
      setLoader(true)
      try {
        const tags = await getAllTags()
        if (tags?.length > 0) {
          const allTags = tags.map(
            (item: SanityDocument, index: number) =>
              ({
                id: item._id,
                name: item.name,
              }) as unknown as Tag,
          )
          setTags(allTags as Tag[])
        }
        setLoader(false)
      } catch (err) {
        setTags([])
        setLoader(false)
      } finally {
        setLoader(false)
      }
    }
    fetchTags()
  }, [])

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId],
    )
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    // @ts-ignore
    setSelectedTagsValue(selectedTags)
  }, [selectedTags.length])

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-2 rounded-md px-4 py-2 text-[#FF5D31] transition-colors duration-200 hover:bg-transparent hover:text-[#FF5D31]/90'
      >
        <span className='text-lg font-medium'>View all Tags</span>
        <div className='flex items-center gap-2'>
          <span className='flex h-5 w-5 items-center justify-center rounded-full bg-[#FF5D31] text-xs font-medium text-white'>
            {selectedTags.length || tags.length}
          </span>
          <ChevronDown className='h-4 w-4' />
        </div>
      </button>
      {isOpen && (
        <div className='absolute z-10 mt-2 w-56 rounded-md bg-white shadow-lg'>
          <div className='max-h-[200px] overflow-y-auto py-1'>
            {tags.map(tag => (
              <div
                key={tag.id}
                onClick={() => toggleTag(tag.id)}
                className={`flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-gray-100 ${
                  selectedTags.includes(tag.id)
                    ? 'font-medium text-[#FF5D31]'
                    : ''
                }`}
              >
                <div className='flex flex-1 items-center gap-2'>
                  {selectedTags.includes(tag.id) && (
                    <Check className='h-4 w-4 text-[#FF5D31]' />
                  )}
                  <span>{tag?.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
