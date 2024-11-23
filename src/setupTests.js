import '@testing-library/jest-dom';

// Mock IntersectionObserver if needed
class IntersectionObserver {
  observe() { return null; }
  disconnect() { return null; }
  unobserve() { return null; }
}

window.IntersectionObserver = IntersectionObserver;
