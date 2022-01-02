# Know Your Legislators Project Documentation

- [Know Your Legislators Project Documentation](#know-your-legislators-project-documentation)
  - [Project Structure](#project-structure)
    - [Assets](#assets)
    - [Components](#components)
    - [Contexts](#contexts)
    - [GraphQL](#graphql)
    - [Pages](#pages)
    - [Utils](#utils)
    - [Standalone src files](#standalone-src-files)
    - [Root folder](#root-folder)

## Project Structure
  
### Assets

- `/documents`: Contains the spreadsheets used as datasets for the database tables
- `/fonts`: Contains app fonts
- `/images`: Contains svg images and png images

### Components

- #### Component Groups

  - `Admin/`
    - `Legislators/`
    - `SHOA/`
  - `Analysis/`
  - `Bills/`
  - `Dashboard/`
  - `Legislators/`
  - `Navbar/`

- #### Standalone Components
  
  - `App`: The main application component. Contains the routing, and FontAwesome style imports.
  - `Footer`
  - `Map`
  - `MapMouseModal`
  - `ScrollToTopButton`
  - `Searchbar`

### Contexts

**NOTE**: This folder is meant to contain [React contexts](https://reactjs.org/docs/context.html)  for minimalist state management.

### GraphQL

**NOTE**: Meant to contain the graphql queries used in the project.

- [ ] **TODO**: Modularize the queries and separate concerns into different files.

### Pages

**NOTE**: The Pages folder has subfolders that contain the main page for rounting, and other components that are used to display content depending on user action (which tend to be tabs).

- #### Page Groups

  - *Admin*
    - *LegislatorsTab*
    - *SHOATab*

  - *AnalysisPage*
    - *FemaleLegislatorsAnalysis*
    - *HORMemberAnalysis*
    - *YouthRepresentationAnalysis*

- #### Standalone Pages

  - *BillsPage*
  - *DashboardPage*
  - *LegislatorsPage*
  - *SpecificLegislatorsPage*
  - *StateInfoPage*

### Utils

**NOTE**: This folder contains functions that serve to interact with external resources or serve supplementary purposes

- `firebase.ts`: This contains the initialization for firebase and exports methods to allow interfacing with firebase in the application

- `legislatorsSampleData.ts`: Sample dataset for legislators ***DEPRECATED**

- `mapData.ts`: Contains the dataset and colours used to develop the map svg in the home page

- `routes.ts`: Contains the string data used to develop the routes in the app component.

### Standalone src files

- `favicon.svg`: This is the website favicon, replace with svg or picture preferred
- `index.css`: Tailwind styles are initialized in this file.
- `logo.svg`: Website logo
- `main.tsx`: Where the index html file imports the website from. Contains apollo context wrapping and router wrapping
- `netlify.toml`: Netlify config
- `vite-env.d.ts`: Vite type decleration file. ***Do not touch**

### Root folder

- `.env`: Contains environment variables for the Hasura Key and Firebase API details.
- `index.html`
- `postcss.config.js`: Configuration for postcss
- `tailwind.config.js`: Tailwind configuration
- `tsconfig.js`: Typescript configuration
- `vite.config.ts`: Vite configuration
