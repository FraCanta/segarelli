// lib/queries.js
import { gql } from "graphql-request";

// Recupera tutti i post con commenti principali e eventuali reply
export const GET_ALL_POSTS = gql`
  query getAllPosts {
    posts {
      edges {
        node {
          id
          databaseId # ID numerico utile per commentOn
          title
          uri
          slug
          excerpt
          date
          content
          featuredImage {
            node {
              sourceUrl
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
          commentCount
          comments {
            nodes {
              id
              content
              dateGmt
              parent {
                node {
                  id
                }
              }
              author {
                node {
                  name
                  email
                  avatar {
                    url
                  }
                }
              }
              replies {
                nodes {
                  id
                  content
                  dateGmt
                  author {
                    node {
                      name
                      email
                      avatar {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
          author {
            node {
              nickname
              name
            }
          }
        }
      }
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    categories {
      nodes {
        id
        name
        slug
      }
    }
  }
`;

// Query minimale per la sitemap
export const GET_POSTS_FOR_SITEMAP = gql`
  query getPostsForSitemap {
    posts(first: 1000) {
      edges {
        node {
          slug
          date
          modified
        }
      }
    }
  }
`;

// Recupera solo i commenti di un singolo post, con eventuali reply
// lib/queries.js
export const GET_POST_COMMENTS = gql`
  query GetPostComments($postId: ID!) {
    post(id: $postId, idType: DATABASE_ID) {
      databaseId
      comments(where: { parent: null }) {
        nodes {
          id
          databaseId
          content
          dateGmt
          author {
            node {
              name
              email
              avatar {
                url
              }
            }
          }
          replies {
            nodes {
              id
              databaseId
              content
              dateGmt
              author {
                node {
                  name
                  email
                  avatar {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// Ricerca post
export const SEARCH_POSTS = gql`
  query SearchPosts($search: String!) {
    posts(where: { search: $search }) {
      edges {
        node {
          id
          databaseId
          title
          uri
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
          categories {
            nodes {
              name
            }
          }
        }
      }
    }
  }
`;
