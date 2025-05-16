
# Rick y Morty App

![](https://http2.mlstatic.com/D_NQ_NP_740411-MCO81205821121_122024-O.webp)

![](https://img.shields.io/github/stars/pandao/editor.md.svg) ![](https://img.shields.io/github/forks/pandao/editor.md.svg) ![](https://img.shields.io/github/tag/pandao/editor.md.svg) ![](https://img.shields.io/github/release/pandao/editor.md.svg) ![](https://img.shields.io/github/issues/pandao/editor.md.svg) ![](https://img.shields.io/bower/v/editor.md.svg)


##Description

This application queries the Rick and Morty API to find out if the personale exists by name, state, origin, species and gender.

##Step By Step

- Install depencies.
Execute in folder project:

`$ npm install`

`$ npx sequelize-cli db:migrate`

after:

`$ npm run build:css`

`$ npm run sync-db`

Finally:

`$ npm run dev`

----
                    
###Relational Diagram
                    
+-------------+
|  Character  |
+-------------+
| id (PK)     |
| apiId       |
| name        |
| status      |
| species     |
| type        |
| gender      |
| originName  |
| originUrl   |
| locationName|
| locationUrl |
| image       |
| url         |
| createdAt   |
| updatedAt   |
+-------------+

### App Structure

rick-morty-app/
├── api/                  # Backend (API GraphQL)
│   ├── config/           # Configurations
│   ├── controllers/      # Controllers
│   ├── graphql/          # Resolvers GraphQL
│   ├── migrations/       # Database Migrations
│   ├── models/           # Sequelize Models 
│   ├── services/         # Business Logic
│   ├── utils/            #
│   ├── app.js            # Express Principal Aplication
│   └── server.js         # Point of Entry server
├── frontend/             # Frontend
│   ├── public/           # Public Assets
│   ├── views/            # PUG Templates
│   └── tailwind/         # TailwindCSS Config
├── .env                  # Enviroments
└── package.json

The application will be available at http://localhost:3000 and the GraphQL endpoint at http://localhost:3000/graphql.
