import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"

class IndexPage extends React.Component {
  render() {
    const siteTitle = "Fuzzy String Matching"

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Fuzzy String Matching Home"
          keywords={[`fuzzy`, `gatsby`, `string`, `matching`]}
        />
        <img style={{ margin: 0 }} src="https://image.freepik.com/free-vector/online-dating-couple-love-app-phone-it-is-match-online-dating_80328-177.jpg" alt="Matching" />
        <h1>
          Hey fellow string searching enthusiasts!{" "}
          <span role="img" aria-label="wave emoji">
            👋
          </span>
        </h1>
        <p>
          This site is built to assess the performance of various approximate string matching algorithms aka fuzzy string searching.
        </p>
        <p>Click to evaluate two strings!</p>
        <Link to="/evaluation/">
          <Button marginTop="35px">Go to String Evaluation</Button>
        </Link>
      </Layout>
    )
  }
}

export default IndexPage
