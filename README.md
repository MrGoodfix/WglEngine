# Reading "Building Your Own 2D Game Engine and Create Great Web Games" and attempting to make it "easier" with TypeScript.
The books repo...
https://github.com/Apress/build-your-own-2d-game-engine-2e

# IDE Setup
1. nvm for windows ... https://github.com/coreybutler/nvm-windows 
2. nvm install
3. nvm use latest or <version>
## global typescript
4. npm install -g typescript
## project typescript
4. npm install typescript --save-dev
## need something to host
5. npm install http-server -g
6. Installed the extension "Shader languages support for VS Code"

# Initial Project Setup
1. git init
2. tsc --init
3. vscode command pallette "Configure tasks"
    - Create tasks.json from template
    - Others
4. added vite after the fact
    - npm install vite --save-dev
    - copy or manually create files following vite documentation

# Compile
first time, npm install
npx vite build

# Running
- npx vite
or 
- npm run dev

# tsconfig stuff
https://www.totaltypescript.com/tsconfig-cheat-sheet

# Interesting resources
https://www.geeksforgeeks.org/getting-started-with-vite/
https://web.archive.org/web/20180301041827/https://prideout.net/archive/colors.php

i need to fix the issue with overriding types