import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Img from "gatsby-image";
import Image from "../components/image"
import SEO from "../components/seo"
//import { BLOCKS, MARKS } from "@contentful/rich-text-types"
//import { renderRichText } from "gatsby-source-contentful/rich-text"
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
//import Box from '@material-ui/core/Card';
import Card from '@material-ui/core/Card';
//import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const IndexPage = ({ data, location }) => {
  const manualPosts = data.allContentfulCookiebotManual.edges;
  return (
  <Layout>
    <SEO title="Home" />
    <div className="bg-gray">
      <div className="ast-container ast-container-top">
        <div className="post-basic">
          <h2 style={{margin: "2rem 0 3rem", fontSize: 32}}>Cookiebot マニュアル一覧</h2>
          <Grid container spacing={2} elevation="0" style={{display: "flex", flexWrap: "wrap", background: "none", flexGrow: 1,}}>
          {manualPosts && manualPosts.map(({ node: post }) => {
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
                  <Typography color="textSecondary" style={{fontSize: 16,marginBottom: 10,}}>
                    {post.contentMarkdown
                      ? post.contentMarkdown.childMarkdownRemark.excerpt
                      : documentToPlainTextString(post.content.json).slice(0, 100)
                    }...
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
    </div>
  </Layout>
  );
};

export default IndexPage

export const query = graphql`
  query BlogArticleQueryTop {
    allContentfulCookiebotManual: allContentfulCookiebotManual(limit: 30, sort: {fields: createdAt, order: DESC}, filter: {node_locale: {eq: "en-US"}} ) {
      edges {
        node {
          id
          title
          slug
          tags
          content{
            json
          }
          contentMarkdown{
            contentMarkdown
            childMarkdownRemark {
              html
              excerpt(format: PLAIN, pruneLength: 100, truncate: true)
            }
          }
          thumbnail{
            fluid(maxWidth: 400) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          createdAt(formatString: "YYYY-MM-DD")
        }
      }
    }
  }
`;