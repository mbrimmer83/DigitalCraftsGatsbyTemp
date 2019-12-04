import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from '../components/layout'

const query = graphql`
    query {
      imageOne: file(relativePath: { eq: "people.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      imageTwo: file(relativePath: { eq: "state-php.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      imageThree: file(relativePath: { eq: "house.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      imageFour: file(relativePath: { eq: "graphql.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
`

const Gallery = () => {
  const data = useStaticQuery(query)
  const imageOne = data.imageOne.childImageSharp.fluid
  const imageTwo = data.imageTwo.childImageSharp.fluid
  const imageThree = data.imageThree.childImageSharp.fluid
  const imageFour = data.imageFour.childImageSharp.fluid
  return (
    <Layout>
      <div className="gallery-container">
        <div className="gallery"><Img fluid={imageFour} /></div>
        <div className="gallery"><Img fluid={imageOne} /></div>
        <div className="gallery"><Img fluid={imageTwo} /></div>
        <div className="gallery"><Img fluid={imageThree} /></div>
      </div>
    </Layout>
  )
}

export default Gallery