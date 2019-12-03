const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require('path')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode })
    const fileNode = getNode(node.parent)
    const source = fileNode.sourceInstanceName
    const separtorIndex = ~slug.indexOf('--') ? slug.indexOf('--') : 0
    const shortSlugStart = separtorIndex ? separtorIndex + 2 : 0

    if (source !== 'parts') {
      createNodeField({
        node,
        name: `slug`,
        value: `${separtorIndex ? '/' : ''}${slug.substring(shortSlugStart)}`
      })
    }
    createNodeField({
      node,
      name: `prefix`,
      value: separtorIndex ? slug.substring(1, separtorIndex) : ''
    })
    createNodeField({
      node,
      name: `source`,
      value: source
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve('./src/templates/PostTemplate.js')
    const projectTemplate = path.resolve('./src/templates/ProjectTemplate.js')

    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              filter: { fields: { slug: { ne: null } } }
              sort: { fields: [fields___prefix], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  id
                  fields {
                    slug
                    prefix
                    source
                  }
                  frontmatter {
                    title
                    category
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        const items = result.data.allMarkdownRemark.edges

        // Create posts
        const posts = items.filter(item => item.node.fields.source === 'posts')
        posts.forEach(({ node }, index) => {
          const slug = node.fields.slug
          const next = index === 0 ? undefined : posts[index - 1].node
          const prev = index === posts.length - 1 ? undefined : posts[index + 1].node
          const source = node.fields.source

          createPage({
            path: `/blog${slug}`,
            component: postTemplate,
            context: {
              slug,
              prev,
              next,
              source
            }
          })
        })

        // Create project
        const projects = items.filter(item => item.node.fields.source === 'projects')
        projects.forEach(({ node }) => {
          const slug = node.fields.slug
          const source = node.fields.source

          createPage({
            path: `/projects${slug}`,
            component: projectTemplate,
            context: {
              slug,
              source
            }
          })
        })
      })
    )
  })
}
