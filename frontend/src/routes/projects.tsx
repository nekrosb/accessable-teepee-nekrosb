import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { getProjects } from '../api/projectsApi'
import type { Project } from '../types/projects'
import { Header } from '../components/projects/Header'
import { ProjectItem } from '../components/projects/ProjectItem.tsx'


export const Route = createFileRoute('/projects')({
  component: Projects,
})

function Projects() {
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  
  async function fetchProjects() {
    try {
      const cache = await getProjects();
      setProjects(cache);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      setError("Failed to load projects. Please try again later.");
    }
    }
    
    useEffect(() => {
      void fetchProjects();
    }, []);


  return (<>
  <Header />
  <div className="main-container">
    <h1>Projects</h1>
    <p>Welcome to the Projects page!</p>
    {error && <div className="error">{error}</div>}
    {projects.length === 0 && <p>No projects found.</p>}
    {projects.length > 0 && !error && projects.map((project) => (
      <ProjectItem
        key={project.id}
        description={project.description}
        title={project.title}
        onDelete={() => {}}
        onEdit={() => {}}
      />
    ))}

  </div>
  </>)
}
