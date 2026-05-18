import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { deleteTag, getTags } from '../api/tagsApi'
import type { Tags } from '../types/tags'
import { Header } from '../components/tags/Header'
import { TagItem } from '../components/tags/TagItem'

export const Route = createFileRoute('/tags')({
  component: TagsPage,
})

function TagsPage() {
  const [error, setError] = useState<string | null>(null)
  const [tags, setTags] = useState<Tags[]>([])
  const navigate = useNavigate()

  async function fetchTags() {
    try {
      const cache = await getTags()
      setTags(cache)
      setError(null)
    } catch (error) {
      console.error('Failed to fetch tags:', error)
      setError(`Failed to fetch tags. Please try again later. ${error}`)
    }
  }

  useEffect(() => {
    void fetchTags()
  }, [])

  async function handleDeleteTag(tagId: number) {
    try {
      await deleteTag(tagId)
      await fetchTags()
    } catch (error) {
      console.error('Failed to delete tag:', error)
      setError('Failed to delete tag. Please try again later.')
    }
  }

  return (
    <>
      <Header
        onCreateTagClick={() => {
          navigate({ to: '/tag/tagCreate' })
        }}
      />
      <div className="main-container">
        <>
          <h1>Tags</h1>
          <p>Welcome to the Tags page!</p>
          {error && <div className="error">{error}</div>}
          {tags.length === 0 && <p>No tags found.</p>}
          {tags.length > 0 &&
            !error &&
            tags.map((tag) => (
              <TagItem
                key={tag.id}
                description={tag.description}
                title={tag.title}
                onDelete={() => {
                  void handleDeleteTag(tag.id)
                }}
                onEdit={() => {
                  navigate({
                    to: `/tag/${tag.id}/edit`,
                    params: { id: String(tag.id) },
                  })
                }}
              />
            ))}
        </>
      </div>
    </>
  )
}
