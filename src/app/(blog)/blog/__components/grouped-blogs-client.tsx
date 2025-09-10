'use client'

import { client } from '@/sanity/lib/client'
import { SanityDocument } from 'next-sanity'
import { useEffect, useState } from 'react'
import BlogCard from './blog-card'

const BLOG_QUERY = `*[_type == "blog"]{
  title,
  subtitle,
  "author": author_information->{
    name,
    designation,
    description,
    bio,
    social_information,
    "profile": author_image.asset->url
  },
  tags,
  seo_description,
  permalink,
  category,
  "featureImage": feature_image.asset->url,
  readtime,
  published_date,
  blog_content
}`

const options = { next: { revalidate: 30 } }

const GroupedBlogsClient = () => {
  const [posts, setPosts] = useState<SanityDocument[]>([])

  useEffect(() => {
    client
      .fetch<SanityDocument[]>(BLOG_QUERY, {}, options)
      .then(value => {
          setPosts(value)
      })
      .catch(err => {
        setPosts(err)
      })
  }, [])

  if (!posts || posts.length === 0) {
    return <p>No blogs found...</p>
  }

  return (
    <div className='grid grid-cols-3 gap-10'>
      {posts.map((item, index) => (
        <BlogCard data={item} key={index} />
      ))}
    </div>
  )
}

export default GroupedBlogsClient
