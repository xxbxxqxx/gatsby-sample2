import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import Img from "gatsby-image";
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
//import Box from '@material-ui/core/Card';
import Card from '@material-ui/core/Card';
//import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';

const SearchResult = props => {
  const tempData = useStaticQuery(graphql`
      query SearchData {
        allContentfulCookiebotManualForSeach: allContentfulCookiebotManual( sort: {fields: createdAt, order: DESC}, filter: {node_locale: {eq: "en-US"}} ) {
          edges {
            node {
              title
              slug
              thumbnail{
                fluid(maxWidth: 400) {
                  ...GatsbyContentfulFluid_withWebp
                }
              }
              content{
                json
              }
              contentMarkdown {
                childMarkdownRemark {
                  excerpt(format: PLAIN, pruneLength: 3000, truncate: true)
                }
              }
              createdAt(formatString: "YYYY-MM-DD")
            }
          }
        }
    }
  `)

  const className = useState("")
  const allPosts = tempData.allContentfulCookiebotManualForSeach.edges
  const emptyQuery = ""
  const [state, setState] = useState({
    filteredData: [],
    query: emptyQuery,
  })
  const handleInputChange = event => {
    console.log(event.target.value)
    const query = event.target.value
    const posts = tempData.allContentfulCookiebotManualForSeach.edges || []

    const filteredData = posts.filter(post => {
      const title = post.node.title
      const contentd = post.node.content ? documentToPlainTextString(post.node.content.json) : ""
      const contentmd = post.node.contentMarkdown ? post.node.contentMarkdown.childMarkdownRemark.excerpt : ""
      return (
        title.toLowerCase().includes(query.toLowerCase()) ||
        contentd.toLowerCase().includes(query.toLowerCase()) ||
        contentmd.toLowerCase().includes(query.toLowerCase())
      )
    })
    setState({
      query,
      filteredData,
    })
  }
  const { filteredData, query } = state
  const hasSearchResults = filteredData && query !== emptyQuery
  const result = hasSearchResults ? filteredData : allPosts

  return (
    <div className={className}>
      <div className="result-inner">
        <form noValidate autoComplete="off">
          <TextField id="standard-basic" label="検索ワードを入力..." aria-label="Search" onChange={handleInputChange} />
        </form>
        <Alert severity="success" style={{marginBottom: 20, border: "none"}} variant="outlined">
          <div className="result-inner__res">
            {query !== "" ?
              query + " の検索結果: " + result.length + "件"
              : result.length + "件の記事があります"
            }
          </div>
        </Alert>
        <Grid container spacing={2} elevation="0" style={{display: "flex", flexWrap: "wrap", background: "none", flexGrow: 1,}}>
        {result && result.map(({ node: post }) => {
            return (
              <Grid item md={4} style={{display: "flex"}}>
              <Card style={{marginBottom: 10,}}>
              <Link to={`/post/${post.slug}/`} className="post-basic-item-a">
                {post.thumbnail
                ?  <CardMedia style={{height: 140,}}> 
                    <Img
                      fluid={post.thumbnail.fluid}
                      //className="thumbndail"
                      style={{height:"100%"}}
                    />
                  </CardMedia> 
                : <div style={{height: 140,lineHeight: "140px", fontSize: "2em", textAlign: "center", background: "rgb(92 182 204)" }}>&#x1f916;</div>
                }
                <CardContent>
                <Typography color="textPrimary" variant="h2" component="h3" style={{fontSize: 22,fontWeight: 700,marginTop: 3,marginBottom: 13,}}>
                  {post.title}
                </Typography>
                <Typography color="textSecondary" style={{fontSize: 15,}}>
                  {post.createdAt}
                </Typography>
              </CardContent>
              </Link>
              </Card>
              </Grid>
            )
          })
        }
        </Grid>
      </div>
    </div>
  )
}

export default SearchResult