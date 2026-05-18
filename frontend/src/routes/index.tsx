import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
  checkClockInStatus,
  clockOut,
  deleteEntry,
  getEntries,
} from '../api/entriesApi'
import { Entries } from '../components/Entries'
import { Header } from '../components/Header'
import { Pagination as PaginationComponent } from '../components/Pagination'
import { ClockIn } from '../components/clockIn'
import type { Entry, Pagination } from '../types/entries'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const navigate = useNavigate()
  const [entries, setEntries] = useState<Entry[]>([])
  const [pagination, setPagination] = useState<Pagination>()
  const [page, setPage] = useState<number>(1)
  const [isClockedIn, setIsClockedIn] = useState<boolean>(false)
  const [screen, setScreen] = useState<'entries' | 'createEntry' | 'editEntry'>(
    'entries',
  )

  async function refreshEntries() {
    const data = await getEntries(page)
    setEntries(data.items)
    setPagination(data.pagination)
  }

  async function refreshClockStatus() {
    const status = await checkClockInStatus()
    setIsClockedIn(status)
  }

  useEffect(() => {
    void refreshClockStatus().catch(() => {})
  }, [])

  useEffect(() => {
    void refreshEntries().catch((error) => {
      console.error('Failed to fetch entries:', error)
    })
  }, [page])

  function handleClockIn() {
    navigate({ to: '/entries/createEntries' })
  }

  function handleEdit(id: number) {
    navigate({
      to: '/entries/$id/edit',
      params: { id: String(id) },
    })
  }

  async function handleClockOut() {
    try {
      await clockOut()
      await refreshClockStatus()
      await refreshEntries()
    } catch (error) {
      console.error('Failed to clock out:', error)
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteEntry(id)
      await refreshEntries()
      await refreshClockStatus()
    } catch (error) {
      console.error('Failed to delete entry:', error)
    }
  }

  function handlePageChange(newPage: number) {
    if (pagination && newPage >= 1 && newPage <= pagination.totalPages) {
      setPage(newPage)
    }
  }

  return (
    <>
      <Header
        isClockedIn={isClockedIn}
        clickClockIn={handleClockIn}
        clickClockOut={handleClockOut}
      />

      <div className="main-container">
        {screen === 'entries' && (
          <>
            {entries.map((entry, index) => (
              <Entries
                key={entry.id}
                start_time={entry.start_time}
                finish_time={entry.finish_time}
                description={entry.description}
                project={entry.project_title ?? 'No Project'}
                tags={entry.tags}
                appearOrder={index}
                onDelete={() => {
                  void handleDelete(entry.id)
                }}
                onEdit={() => handleEdit(entry.id)}
              />
            ))}

            {pagination && (
              <PaginationComponent
                pages={pagination}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </>
  )
}
