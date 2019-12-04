import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

const PostTemplate = props => {
  const {
    data: {
      post: {
        html,
        frontmatter: { title }
      }
    },
    pageContext: { next, prev }
  } = props

  return (
    <Layout>
      <header>
        <h1>{title}</h1>
      </header>
      <div className="bodytext" dangerouslySetInnerHTML={{ __html: html }} />  
    </Layout>
  )
}

export default PostTemplate

//eslint-disable-next-line no-undef
export const postQuery = graphql`
  query PostBySlug($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
        prefix
      }
      frontmatter {
        title
        author
        category
        description
        cover {
          childImageSharp {
            resize(width: 300) {
              src
            }
          }
        }
      }
    }
  }
`