<?php
/**
 * File that handle dynamic css for Woo pro integration.
 *
 * @package Neve_Pro\Modules\Woocommerce_Booster
 */
namespace Neve_Pro\Modules\Woocommerce_Booster;

use Neve\Core\Settings\Mods;
use Neve_Pro\Core\Generic_Style;

/**
 * Class Dynamic_Style
 *
 * @package Neve_Pro\Modules\Woocommerce_Booster
 */
class Dynamic_Style extends Generic_Style {

	const SAME_IMAGE_HEIGHT      = 'neve_force_same_image_height';
	const IMAGE_HEIGHT           = 'neve_image_height';
	const SALE_TAG_COLOR         = 'neve_sale_tag_color';
	const SALE_TAG_TEXT_COLOR    = 'neve_sale_tag_text_color';
	const SALE_TAG_RADIUS        = 'neve_sale_tag_radius';
	const BOX_SHADOW_INTENTISITY = 'neve_box_shadow_intensity';
	const THUMBNAIL_WIDTH        = 'woocommerce_thumbnail_image_width';

	const MODS_TYPEFACE_ARCHIVE_PRODUCT_TITLE      = 'neve_shop_archive_typography_product_title';
	const MODS_TYPEFACE_ARCHIVE_PRODUCT_PRICE      = 'neve_shop_archive_typography_product_price';
	const MODS_TYPEFACE_SINGLE_PRODUCT_TITLE       = 'neve_single_product_typography_title';
	const MODS_TYPEFACE_SINGLE_PRODUCT_PRICE       = 'neve_single_product_typography_price';
	const MODS_TYPEFACE_SINGLE_PRODUCT_META        = 'neve_single_product_typography_meta';
	const MODS_TYPEFACE_SINGLE_PRODUCT_DESCRIPTION = 'neve_single_product_typography_short_description';
	const MODS_TYPEFACE_SINGLE_PRODUCT_TABS        = 'neve_single_product_typography_tab_titles';
	const MODS_TYPEFACE_SHOP_NOTICE                = 'neve_shop_typography_alert_notice';
	const MODS_TYPEFACE_SHOP_SALE_TAG              = 'neve_shop_typography_sale_tag';

	/**
	 * Add dynamic style subscribers.
	 *
	 * @param array $subscribers Css subscribers.
	 *
	 * @return array|mixed
	 */
	public function add_subscribers( $subscribers = [] ) {

		/**
		 * Typography options
		 */
		$shop_typography = array(
			self::MODS_TYPEFACE_ARCHIVE_PRODUCT_TITLE      => '.woocommerce ul.products li.product .woocommerce-loop-product__title',
			self::MODS_TYPEFACE_ARCHIVE_PRODUCT_PRICE      => '.woocommerce ul.products li.product .price, .woocommerce ul.products li.product .price del, .woocommerce ul.products li.product .price ins',
			self::MODS_TYPEFACE_SINGLE_PRODUCT_TITLE       => '.woocommerce.single .product_title',
			self::MODS_TYPEFACE_SINGLE_PRODUCT_PRICE       => '.woocommerce div.product p.price, .woocommerce div.product p.price del, .woocommerce div.product p.price ins',
			self::MODS_TYPEFACE_SINGLE_PRODUCT_META        => '.product_meta, .woocommerce-product-rating',
			self::MODS_TYPEFACE_SINGLE_PRODUCT_DESCRIPTION => '.single-product .entry-summary .woocommerce-product-details__short-description',
			self::MODS_TYPEFACE_SINGLE_PRODUCT_TABS        => '.woocommerce div.product .woocommerce-tabs ul.tabs li a',
			self::MODS_TYPEFACE_SHOP_NOTICE                => '.woocommerce .woocommerce-message, .woocommerce-page .woocommerce-message, .woocommerce .woocommerce-error, .woocommerce-page .woocommerce-error',
			self::MODS_TYPEFACE_SHOP_SALE_TAG              => '.woocommerce span.onsale',
		);
		foreach ( $shop_typography as $mod => $selector ) {
			$subscribers[ $selector ] = [
				'font-size'      => [
					'key'           => $mod . '.fontSize',
					'is_responsive' => true,
					'suffix'        => 'px',
				],
				'line-height'    => [
					'key'           => $mod . '.lineHeight',
					'is_responsive' => true,
					'suffix'        => '',
				],
				'letter-spacing' => [
					'key'           => $mod . '.letterSpacing',
					'is_responsive' => true,
				],
				'font-weight'    => [
					'key' => $mod . '.fontWeight',
				],
				'text-transform' => $mod . '.textTransform',
			];
		}

		$same_image_height = Mods::get( self::SAME_IMAGE_HEIGHT );
		if ( $same_image_height === true ) {
			$subscribers['.woocommerce ul.products li.product .nv-product-image.nv-same-image-height'] = [
				'height' => [
					'key'     => self::IMAGE_HEIGHT,
					'default' => 230,
				],
			];

			$subscribers['.woocommerce .nv-list ul.products.columns-neve li.product .nv-product-image.nv-same-image-height'] = [
				[
					'key'    => self::IMAGE_HEIGHT,
					'filter' => function ( $css_prop, $value, $meta, $device ) {
						$image_width = get_option( 'woocommerce_thumbnail_image_width' );
						return 'flex-basis: ' . $image_width . 'px;';
					},
				],
			];
		}
		if ( array_key_exists( '.woocommerce span.onsale', $subscribers ) ) {
			$subscribers['.woocommerce span.onsale'] = array_merge(
				$subscribers['.woocommerce span.onsale'],
				[
					'background-color' => self::SALE_TAG_COLOR,
					'color'            => self::SALE_TAG_TEXT_COLOR,
					'border-radius'    => [
						'key'    => self::SALE_TAG_RADIUS,
						'suffix' => '%',
					],
				]
			);
		} else {
			$subscribers['.woocommerce span.onsale'] = [
				'background-color' => self::SALE_TAG_COLOR,
				'color'            => self::SALE_TAG_TEXT_COLOR,
				'border-radius'    => [
					'key'    => self::SALE_TAG_RADIUS,
					'suffix' => '%',
				],
			];
		}

		$subscribers['.nv-product-content'] = [
			'padding' => [
				'key'    => self::BOX_SHADOW_INTENTISITY,
				'filter' => function ( $css_prop, $value, $meta, $device ) {
					return 'padding: 15px;';
				},
			],
		];

		$box_shadow = Mods::get( self::BOX_SHADOW_INTENTISITY, 0 );
		if ( $box_shadow !== 0 ) {
			$subscribers['.woocommerce ul.products li .nv-card-content-wrapper'] = [
				'box-shadow' => [
					'key'    => self::BOX_SHADOW_INTENTISITY,
					'filter' => function ( $css_prop, $value, $meta, $device ) {
						return 'box-shadow: 0px 1px 20px ' . ( $value - 20 ) . 'px rgba(0, 0, 0, 0.12);';
					},
				],
			];
		}

		return $subscribers;
	}
}
