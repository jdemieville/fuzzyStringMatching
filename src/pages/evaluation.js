import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
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
        this.setState({
            levenResults: levenshteinDistance(this.state.firstString, this.state.secondString),
            trigramResults: trigramDistance(this.state.firstString, this.state.secondString),
            jaroWinkResults: jaroWinklerDistance(this.state.firstString, this.state.secondString)
        })
      }
    render() {
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
            </form>
            <h1>Results</h1>
            <p>Levenshtein Results: {this.state.levenResults}</p>
            <p>Trigram Results: {this.state.trigramResults}</p>
            <p>Jaro-Winkler Results: {this.state.jaroWinkResults}</p>
            <Link to="/">
                <Button marginTop="35px">Go home</Button>
            </Link>
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
