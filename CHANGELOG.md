# Changelog

All notable changes to this project will be documented in this file.

## [1.2.0] - 2024-11-25

### Added
- Persistent game state using localStorage
- New test suite for score tracking and game mechanics
- Best score tracking across sessions

### Changed
- Optimized score tracking logic
- Improved state management in CardsGrid component
- Refactored best score update logic for better maintainability
- Removed console.log statements for cleaner production code

### Fixed
- Best score update timing in perfect score scenarios
- State updates timing in card click handlers

## [1.1.1] - 2024-11-23

### Added
- Version number display in footer
- Hover effect on footer links

### Changed
- Improved footer styling with modern color scheme
- Adjusted footer text sizes for better readability

## [1.1.0] - 2024-11-23

### Added
- Loading states for better UX
- Image size optimization (300px width)
- Smooth transitions for card loading
- Hover effects on cards

### Changed
- Optimized image loading performance
- Improved error handling in useFetch
- Memoized Card component to prevent unnecessary re-renders
- Better validation of API responses

### Fixed
- Performance issues on tablets
- Multiple unnecessary API fetches
- Image loading reliability
- Memory usage optimization

### Technical
- Added React.memo for Card component
- Implemented useCallback for event handlers
- Improved CSS transitions
- Added proper loading state management
