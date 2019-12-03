import React from 'react'
import { graphql } from 'gatsby'

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
    <React.Fragment>
      <header>
        <h1>{title}</h1>
      </header>
      <div className="bodytext" dangerouslySetInnerHTML={{ __html: html }} />  
    </React.Fragment>
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