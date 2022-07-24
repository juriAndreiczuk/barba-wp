# App Start
1. 'npm i'
2. 'gulp'

inc - custom functions (import this file in functions.php)
src - assets and source files
    |
    - fonts
    - img
    - scripts
      |
      - core
        AppState.js - file for import all pages and posts templates
        Emmiter.js - https://refactoring.guru/design-patterns/observer
        Page.js - base class for all pages
        utils.js - small functions to use on all pages
      - modules - files for components (template-parts)
      - pages - files for pages (template-pages)
      app.js - main js file for libraries import and barba initialization
    - styles
      |
      scss
        |
        base - styles for tags and reset browser default options
        layout - styles for custom grid + reusable components without reference to any section (_page-component)
        modules - styles for sections and components
        utilities - variables, functions and mixins
        app.scss - main scss file (only for import other files)
template-pages - page templates
template-parts - sections, components, modules
