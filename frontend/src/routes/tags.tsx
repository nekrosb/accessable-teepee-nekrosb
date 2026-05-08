import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { deleteTag, getTags } from '../api/tagsApi'
import type { Tags } from '../types/tags'
import { Header } from '../components/tags/Header'
import { TagItem } from '../components/tags/TagItem'
import { CreateTagForm } from '../components/tags/CreateTagForm'
import { EditTagForm } from '../components/tags/EditTagForm'

export const Route = createFileRoute('/tags')({
  component: TagsPage,
})

function TagsPage() {
  const [error, setError] = useState<string | null>(null)
  const [tags, setTags] = useState<Tags[]>([])
  const [screen, setScreen] = useState<'tags' | 'createTag' | 'editTag'>('tags')
  const [selectedTag, setSelectedTag] = useState<Tags | null>(null)

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

  function openCreateTagScreen() {
    setSelectedTag(null)
    setScreen('createTag')
  }

  function closeCreateTagScreen() {
    setSelectedTag(null)
    setScreen('tags')
  }

  function openEditTagScreen(tag: Tags) {
    setSelectedTag(tag)
    setScreen('editTag')
  }

  function closeEditTagScreen() {
    setSelectedTag(null)
    setScreen('tags')
  }

  async function handleTagCreated() {
    await fetchTags()
    setScreen('tags')
  }

  return (
    <>
      <Header onCreateTagClick={openCreateTagScreen} />
      <div className="main-container">
        {screen === 'tags' && (
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
                    openEditTagScreen(tag)
                  }}
                />
              ))}
          </>
        )}

        {screen === 'editTag' && selectedTag && (
          <EditTagForm
            tag={selectedTag}
            onClose={closeEditTagScreen}
            onUpdated={() => {
              void fetchTags()
            }}
          />
        )}

        {screen === 'createTag' && (
          <CreateTagForm
            onClose={closeCreateTagScreen}
            onCreated={() => {
              void handleTagCreated()
            }}
          />
        )}
      </div>
    </>
  )
}
