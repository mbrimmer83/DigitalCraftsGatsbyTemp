import React from 'react'
import { graphql } from 'gatsby'

const ProjectTemplate = props => {
  const {
    data: {
      project: {
        html,
        fields: { prefix, slug },
        frontmatter: { title }
      },
    }
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

export default ProjectTemplate

//eslint-disable-next-line no-undef
export const projectQuery = graphql`
  query ProjectBySlug($slug: String!) {
    project: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
        prefix
      }
      frontmatter {
        title
        subtitle
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