import { create } from 'zustand';

export interface ElementStyles {
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  backgroundColor?: string;
  borderRadius?: string;
  opacity?: number;
  padding?: string;
  margin?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  [key: string]: any;
}

export interface CanvasElement {
  id: string;
  type: string;
  tag: string;
  content?: string;
  innerHTML?: string;
  style: ElementStyles;
  classes?: string[];
  attributes?: Record<string, string>;
  animation?: string;
}

interface WebBuilderState {
  elements: CanvasElement[];
  selectedElementId: string | null;
  undoStack: CanvasElement[][];
  redoStack: CanvasElement[][];
  
  // Actions
  setElements: (elements: CanvasElement[]) => void;
  addElement: (element: CanvasElement) => void;
  updateElement: (id: string, updates: Partial<CanvasElement>) => void;
  deleteElement: (id: string) => void;
  selectElement: (id: string | null) => void;
  
  // History
  saveState: () => void;
  undo: () => void;
  redo: () => void;
}

export const useStore = create<WebBuilderState>((set) => ({
  elements: [],
  selectedElementId: null,
  undoStack: [],
  redoStack: [],

  setElements: (elements) => set({ elements }),
  
  addElement: (element) => 
    set((state) => ({ 
      elements: [...state.elements, element],
    })),

  updateElement: (id, updates) =>
    set((state) => ({
      elements: state.elements.map((el) => 
        el.id === id ? { ...el, ...updates, style: { ...el.style, ...updates.style } } : el
      ),
    })),

  deleteElement: (id) =>
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== id),
      selectedElementId: state.selectedElementId === id ? null : state.selectedElementId,
    })),

  selectElement: (id) => set({ selectedElementId: id }),

  saveState: () =>
    set((state) => ({
      undoStack: [...state.undoStack, state.elements],
      redoStack: [],
    })),

  undo: () =>
    set((state) => {
      if (state.undoStack.length === 0) return state;
      const previous = state.undoStack[state.undoStack.length - 1];
      const newUndoStack = state.undoStack.slice(0, -1);
      return {
        elements: previous,
        undoStack: newUndoStack,
        redoStack: [state.elements, ...state.redoStack],
      };
    }),

  redo: () =>
    set((state) => {
      if (state.redoStack.length === 0) return state;
      const next = state.redoStack[0];
      const newRedoStack = state.redoStack.slice(1);
      return {
        elements: next,
        undoStack: [...state.undoStack, state.elements],
        redoStack: newRedoStack,
      };
    }),
}));
