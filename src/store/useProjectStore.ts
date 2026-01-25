import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CanvasElement } from './useStore';

export interface Project {
    id: string;
    name: string;
    description: string;
    thumbnail?: string;
    elements: CanvasElement[];
    createdAt: number;
    updatedAt: number;
}

interface ProjectState {
    projects: Project[];
    currentProjectId: string | null;

    // Actions
    createProject: (name: string, description: string) => string;
    updateProject: (id: string, updates: Partial<Omit<Project, 'id' | 'createdAt'>>) => void;
    deleteProject: (id: string) => void;
    setCurrentProject: (id: string | null) => void;
    getCurrentProject: () => Project | null;
    saveProjectElements: (id: string, elements: CanvasElement[]) => void;
}

export const useProjectStore = create<ProjectState>()(
    persist(
        (set, get) => ({
            projects: [],
            currentProjectId: null,

            createProject: (name, description) => {
                const id = crypto.randomUUID();
                const newProject: Project = {
                    id,
                    name,
                    description,
                    elements: [],
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                };

                set((state) => ({
                    projects: [...state.projects, newProject],
                    currentProjectId: id,
                }));

                return id;
            },

            updateProject: (id, updates) => {
                set((state) => ({
                    projects: state.projects.map((project) =>
                        project.id === id
                            ? { ...project, ...updates, updatedAt: Date.now() }
                            : project
                    ),
                }));
            },

            deleteProject: (id) => {
                set((state) => ({
                    projects: state.projects.filter((project) => project.id !== id),
                    currentProjectId: state.currentProjectId === id ? null : state.currentProjectId,
                }));
            },

            setCurrentProject: (id) => {
                set({ currentProjectId: id });
            },

            getCurrentProject: () => {
                const state = get();
                return state.projects.find((p) => p.id === state.currentProjectId) || null;
            },

            saveProjectElements: (id, elements) => {
                set((state) => ({
                    projects: state.projects.map((project) =>
                        project.id === id
                            ? { ...project, elements, updatedAt: Date.now() }
                            : project
                    ),
                }));
            },
        }),
        {
            name: 'webbuilder-projects',
        }
    )
);
