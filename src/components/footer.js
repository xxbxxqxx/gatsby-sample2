import { Link, StaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import LogoCM from '../images/yoko_color_white.png';

const Footer = ({ siteTitle }) => {
	//const subCategories = data.subCategory.nodes;
	return (
		<footer className="footer-common">
			<section className="footer-common__menu">
				<div className="ast-container">
					<div className="flex-row">
						<div className="flex-column flex-column-3">
							<img src={LogoCM} alt={siteTitle} width="150" height="55" className="footer-logo__img" />
						</div>
						<div className="flex-column flex-column-3">
							<p>コスト削減、アジリティ、セキュリティに強いテックカンパニー</p>
							<p>私たちはクラウド、AI、IoT、モバイル、データ活用を得意とするテックカンパニーです。</p>
							<p>1,700社を超える実績、20,000以上の情報発信の経験を活かし、徹底した顧客志向でクライアント企業をサポートします。</p>
						</div>
						<div className="flex-column flex-column-3">
							<div className="footer-common__menu__company">
								<p className="title">クラスメソッド株式会社</p>
								<p>〒101-0025<br />
									東京都千代田区神田佐久間町1-11<br />
									産報佐久間ビル8階
								</p>
							</div>
							<div className="footer-common__menu__company">
								<p className="title">クラスメソッド ヨーロッパ</p>
								<p>Classmethod (Europe) GmbH<br />
									Krausenstr. 9-10<br />
									10117 Berlin, Germany
								</p>
							</div>
						</div>
						<div className="flex-column flex-column-3">
							<p>パートナーサイト</p>
							<p><a href="https://www.cookiebot.com/" target="_blank">Cookiebot</a></p>
						</div>
					</div>
				</div>
			</section>
			<section className="footer-common__copyright">
				<div className="ast-container flex-row">
					<div className="flex-column-6">
						Copyright © 2020
					</div>
					<div className="flex-column-6 right">
						Cookiebot | Classmethod (Europe) GmbH
					</div>
				</div>
			</section>
		</footer>
	)
}

export default Footer

//export default function showFooter(props) {
//	return (
//		<StaticQuery
//			query={graphql`
//				query SubCategoryQuery {
//				subCategory: allContentfulSubCategory(filter: {name_en: {ne: "test_sub_categor"}}) {
//					nodes {
//						name_en
//						name_ja
//						parentCategory
//						}
//					}
//				}
//			`}
//			render={data => <Footer data={data} {...props} />}
//		/>
//	)
//}

//Footer.propTypes = {
//	data: PropTypes.shape({
//		nodes: PropTypes.shape({
//			name_en: PropTypes.string.isRequired,
//			name_ja: PropTypes.string.isRequired,
//			parentCategory: PropTypes.string.isRequired,
//		}).isRequired,
//	}).isRequired,
//}


