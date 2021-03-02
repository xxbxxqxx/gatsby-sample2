import React from 'react'
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Img from "gatsby-image";
//import marked from "marked";

import ButtonMU from '@material-ui/core/Button';

const options = {
	renderText: text => {
		return text.split('\n').reduce((children, textSegment, index) => {
			return [...children, index > 0 && <br key={index} />, textSegment];
		}, []);
	},
	renderMark: {
		[MARKS.CODE]: text => {
			return <pre className="language-plain"><code className="language-plain">{text}</code></pre>
		}
	},
	renderNode: {
		[BLOCKS.EMBEDDED_ASSET]: (node) => (
			<img
				src={node.data.target.fields.file["en-US"].url}
			/>
		),
	},
};
 
const manualPost = ({ data, location }) => {
	const { title, content, createdAt, thumbnail } = data.contentfulSamplePosts;

	return (
		<Layout>
			<SEO
				pageTitle={title}
				showSiteNameInTitle="true"
				//pageDescription={content.raw.replace(/\n/gi, '').replace(/#/gi, '').slice(0, 90)}
				pagePath={location.pathname}
			/>
			<div className="bg-gray">
				<div className="ast-container ast-container-post">
					<div className="main">
						<div className="post bg-white">
							<h1>{title}</h1>
							<p className="post__date">Posted on {createdAt}</p>
							{thumbnail && //もしサムネイル画像をもっていれば
								<Img
									fluid={thumbnail.fluid}
									className="thumbnail"
								/>
							}
							<div className="body-text">{documentToReactComponents(content.json, options)}</div>
							<p className="post__date__bottom">Posted on {createdAt}</p>
						</div>
						<div className="cm-header-manualhome-wrapper">
							<ButtonMU size="large"><Link to="/">他の記事を読む</Link></ButtonMU>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};
export default manualPost;
export const pageQuery = graphql`
	query( $slug: String) {
		contentfulSamplePosts(slug: { eq: $slug }) {
			id
			title
			content{
				json
			}
			thumbnail{
			  fluid(maxWidth: 760) {
			    ...GatsbyContentfulFluid_withWebp
			  }
			}
			createdAt(formatString: "YYYY-MM-DD")
		}
	}
`;