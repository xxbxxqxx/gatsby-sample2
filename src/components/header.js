import { Link, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Img from "gatsby-image"

import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import ButtonMU from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import LinkMU from '@material-ui/core/Link';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import ModalSeach from "../components/modalSearch";

const useStyles = makeStyles((theme) => ({
	buttomCbjp: {
		[theme.breakpoints.down('md')]: {
			display: "none",
		},
	},
}));

const Header = ({ siteTitle }) => {

	const classes = useStyles();
	const data = useStaticQuery(graphql`
		query QueryHeader {
			imgLogo:file(relativePath: {eq: "cm_cb_logo.png"}) {
					childImageSharp{
							fluid(maxWidth: 370) {
									...GatsbyImageSharpFluid
							}
					}
			},
		}
	`)
	return (
	<header>
		<Toolbar className={classes.toolbar} style={{borderBottom: `1px solid rgba(0, 0, 0, 0.12)`,}}>
			<ButtonMU size="medium" className={classes.buttomCbjp} style={{position: "absolute", paddingRight: 24}}><a href="https://www.cookiebot.jp/" target="_blank" style={{textTransform: "lowercase"}}>cookiebot.jp<OpenInNewIcon className="IconHeaderLinkExternal" style={{fontSize: "16px", position: "absolute", right: 4, top: 11}}/></a></ButtonMU>
			<Typography
				component="h2"
				variant="h5"
				color="inherit"
				align="center"
				noWrap
				style={{flex: 1,padding: "0 50px"}}
			>
				<Link to="/"><Img fluid={data.imgLogo.childImageSharp.fluid}  alt={siteTitle} style={{maxWidth: 370, margin: "0 auto"}} /></Link>
			</Typography>
			<ModalSeach />
			{/*
			<IconButton className>
				<SearchIcon />

			</IconButton>*/}
			{/*<ButtonMU variant="outlined" size="small">
				<a href="https://www.cookiebot.jp/#contact" target="_blank">お問い合わせ</a>
			</ButtonMU>*/}
		</Toolbar>
	</header>
)}

Header.propTypes = {
	siteTitle: PropTypes.string,
}

Header.defaultProps = {
	siteTitle: ``,
}

export default Header
