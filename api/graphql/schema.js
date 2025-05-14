const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Character {
    id: ID!
    name: String!
    status: String!
    species: String!
    type: String
    gender: String!
    origin: Location!
    location: Location!
    image: String!
    episode: [String!]!
    url: String!
    created: String!
  }

  type Location {
    name: String!
    url: String!
  }

  type Query {
    characters(
      page: Int
      name: String
      status: String
      species: String
      gender: String
      origin: String
    ): [Character]
    character(id: ID!): Character
  }
`);

module.exports = schema;