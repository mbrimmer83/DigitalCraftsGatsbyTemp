import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
const query = graphql`
  query IndexQuery {
    posts: allMarkdownRemark(limit: 5, sort: {fields: fields___prefix, order: DESC}, filter: {fileAbsolutePath: {regex: "//posts/[0-9]+.*--/"}}) {
    edges {
      node {
        excerpt
        frontmatter {
          title
          description
          author
          cover {
            children {
              ... on ImageSharp {
                id
                fluid(maxWidth: 800, maxHeight: 360) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        wordCount {
          paragraphs
          sentences
          words
        }
        fields {
          slug
          prefix
          source
        }
      }
    }
  }
  }
`
const IndexPage = () => {
  const data = useStaticQuery(query)
  console.log(data)
  return (
    <Layout>
      <SEO title="Home" />
      <div style={{ maxWidth: `800px`, marginBottom: `1.45rem`, margin: `auto` }}>
        {
          data.posts.edges.map((post, index) => {
            const fluid = post.node.frontmatter.cover.children[0].fluid
            return (
              <div key={index} style={{ border: `1px solid black`, marginTop: `5px` }}>
                <Img fluid={fluid} />
                <Link to={`/blog${post.node.fields.slug}`}><h2>{post.node.frontmatter.title}</h2></Link>
                <p>{post.node.excerpt}</p>
                <p>{`Word Count: ${post.node.wordCount.words}`}</p>
              </div>
            )
          })
        }
      </div>
      <Link to="/page-2/">Go to page 2</Link>
      <br/>
      <Link to="/gallery/">Gallery</Link>
    </Layout>
  )
}

export default IndexPage
