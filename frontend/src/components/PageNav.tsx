import { Link } from '@tanstack/react-router'

type PageKey = 'entries' | 'projects' | 'tags'

type Props = {
  activePage: PageKey
}

const links: Array<{ to: '/' | '/projects' | '/tags'; label: string; page: PageKey }> = [
  { to: '/', label: 'Entries', page: 'entries' },
  { to: '/projects', label: 'Projects', page: 'projects' },
  { to: '/tags', label: 'Tags', page: 'tags' },
]

export function PageNav({ activePage }: Props) {
  return (
    <nav className="header-nav" aria-label="Page navigation">
      {links.map((link) => {
        const isActive = activePage === link.page

        return (
          <Link
            key={link.to}
            to={link.to}
            aria-current={isActive ? 'page' : undefined}
            className={`header-nav__link${isActive ? ' header-nav__link--active' : ''}`}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}