import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Button from "../components/button"
import jaroWinklerDistance from "../logic/jaroWinklerDistance";
import levenshteinDistance from "../logic/levenshteinDistance";
import trigramDistance from "../logic/trigramDistance";
import cosineSimilarity from '../logic/cosineSimilarity';
import termFreqInvDocFreq from '../logic/termFreqInvDocFreq';

class Evaluation extends React.Component {
    state = {
        firstString: "",
        secondString: "",
        levenResults: "",
        levenEmoji: "",
        trigramResults: "",
        trigramEmoji: "",
        jaroDistance: "",
        JaroDistEmoji: "",
        jaroWinkResults: "",
        jaroWinkEmoji: "",
        cosResults: "",
        cosEmoji: "",
        tfidfResults: "",
        tfidfEmoji: ""
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
            levenResults: (levenshteinDistance(this.state.firstString, this.state.secondString)).toFixed(4),
            trigramResults: (trigramDistance(this.state.firstString, this.state.secondString)).toFixed(4),
            jaroDistanceResults: ((jaroWinklerDistance(this.state.firstString, this.state.secondString))[0]).toFixed(4),
            jaroWinkResults: ((jaroWinklerDistance(this.state.firstString, this.state.secondString))[1]).toFixed(4),
            cosResults: (cosineSimilarity(this.state.firstString, this.state.secondString)).toFixed(4),
            tfidfResults: (termFreqInvDocFreq(this.state.firstString, this.state.secondString)).toFixed(4),
        })
        this.setState((state) => {
          let emoji = state.levenEmoji;
          if(state.levenResults >= 0.7){
            emoji = '🙌';
          } else if(state.levenResults >= 0.5){
              emoji= '🤷‍♀';
          } else {
            emoji = '😭';
          }
          return {levenEmoji: emoji}
        })
        this.setState((state) => {
          let emoji = state.trigramEmoji;
          if(state.trigramResults >= 0.7){
            emoji = '🙌';
          } else if(state.trigramResults >= 0.5){
              emoji= '🤷‍♀';
          } else {
            emoji = '😭';
          }
          return {trigramEmoji: emoji}
        })
        this.setState((state) => {
          let emoji = state.JaroDistEmoji;
          if(state.jaroDistanceResults >= 0.7){
            emoji = '🙌';
          } else if(state.jaroDistanceResults >= 0.5){
              emoji= '🤷‍♀';
          } else {
            emoji = '😭';
          }
          return {JaroDistEmoji: emoji}
        })
        this.setState((state) => {
          let emoji = state.jaroWinkEmoji;
          if(state.jaroWinkResults >= 0.7){
            emoji = '🙌';
          } else if(state.jaroWinkResults >= 0.5){
              emoji= '🤷‍♀';
          } else {
            emoji = '😭';
          }
          return {jaroWinkEmoji: emoji};
        })
        this.setState((state) => {
          let emoji = state.cosEmoji;
          if(state.cosResults >= 0.7){
            emoji = '🙌';
          } else if(state.cosResults >= 0.5){
            emoji= '🤷‍♀';
          } else {
            emoji = '😭';
          }
          return {cosEmoji: emoji};
        })
        this.setState((state) => {
          let emoji = state.tfidfEmoji;
          if(state.tfidfResults >= 0.7){
            emoji = '🙌';
          } else if(state.tfidfResults >= 0.5){
            emoji= '🤷‍♀';
          } else {
            emoji = '😭';
          }
          return {tfidfEmoji: emoji};
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
            <p>Levenshtein Results: {this.state.levenResults} {this.state.levenEmoji}</p>
            <p>Trigram Results: {this.state.trigramResults} {this.state.trigramEmoji}</p>
            <p>Jaro Distance Results: {this.state.jaroDistanceResults} {this.state.JaroDistEmoji}</p>
            <p>Jaro-Winkler Results: {this.state.jaroWinkResults} {this.state.jaroWinkEmoji}</p>
            <p>Cosine Similarity Results: {this.state.cosResults} {this.state.cosEmoji}</p>
            <p>TFIDF Results: {this.state.tfidfResults} {this.state.tfidfEmoji}</p>
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
