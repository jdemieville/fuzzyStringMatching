import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"
import jaroWinklerDistance from "../logic/jaroWinklerDistance";
import levenshteinDistance from "../logic/levenshteinDistance";
import trigramDistance from "../logic/trigramDistance";

class Evaluation extends React.Component {
    state = {
        firstString: "",
        secondString: "",
        levenResults: "",
        trigramResults: "",
        jaroWinkResults: "",
    }
    handleInputChange = event => {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
          [name]: value,
        })
      }
      handleSubmit = event => {
        event.preventDefault()
        alert(`first ${this.state.firstString} second ${this.state.secondString}!`)
      }
    render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location}>
      <h1>Enter strings to compare</h1>
        <form onSubmit={this.handleSubmit}>
            <label>
                First string: 
                <input 
                    type='text' 
                    name='firstString'
                    value={this.state.firstString}
                    onChange={this.handleInputChange}
                ></input>
            </label>
            <div></div>
            <label>
                Second string: 
                <input 
                    type='text' 
                    name='secondString'
                    value={this.state.secondString}
                    onChange={this.handleInputChange}
                ></input>
            </label>
            <button type='submit'>Evaluate</button>
            <h1>Results</h1>
        </form>
      </Layout>
    )
  }
}

export default Evaluation

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
