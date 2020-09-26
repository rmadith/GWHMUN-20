<?php
/**
 * File that handle dynamic css for Scroll to top integration.
 *
 * @package Neve_Pro\Modules\Scoll_To_Top
 */

namespace Neve_Pro\Modules\Scroll_To_Top;


use Neve\Core\Settings\Mods;
use Neve_Pro\Core\Generic_Style;

/**
 * Class Dynamic_Style
 *
 * @package Neve_Pro\Modules\Scoll_To_Top
 */
class Dynamic_Style extends Generic_Style {
	const ICON_TOP_COLOR              = 'neve_scroll_to_top_icon_color';
	const ICON_BACKGROUND_COLOR       = 'neve_scroll_to_top_background_color';
	const ICON_TOP_COLOR_HOVER        = 'neve_scroll_to_top_icon_hover_color';
	const ICON_BACKGROUND_COLOR_HOVER = 'neve_scroll_to_top_background_hover_color';
	const ICON_IMAGE                  = 'neve_scroll_to_top_image';
	const ICON_TYPE                   = 'neve_scroll_to_top_type';

	const ICON_PADDING       = 'neve_scroll_to_top_padding';
	const ICON_BORDER_RADIUS = 'neve_scroll_to_top_border_radius';
	const ICON_SIZE          = 'neve_scroll_to_top_icon_size';

	/**
	 * Add dynamic style subscribers.
	 *
	 * @param array $subscribers Css subscribers.
	 *
	 * @return array|mixed
	 */
	public function add_subscribers( $subscribers = [] ) {

		$subscribers[] = [
			'selectors' => '.scroll-to-top',
			'rules'     => [
				'color'            => [
					'key'     => self::ICON_TOP_COLOR,
					'default' => '#ffffff',
				],
				'padding'          => [
					'key'           => self::ICON_PADDING,
					'is_responsive' => true,
					'default'       => array(
						'desktop'      => array(
							'top'    => 8,
							'right'  => 10,
							'bottom' => 8,
							'left'   => 10,
						),
						'tablet'       => array(
							'top'    => 8,
							'right'  => 10,
							'bottom' => 8,
							'left'   => 10,
						),
						'mobile'       => array(
							'top'    => 8,
							'right'  => 10,
							'bottom' => 8,
							'left'   => 10,
						),
						'desktop-unit' => 'px',
						'tablet-unit'  => 'px',
						'mobile-unit'  => 'px',
					),
				],
				'border-radius'    => [
					'key'     => self::ICON_BORDER_RADIUS,
					'default' => 3,
				],
				'background-color' => [
					'key'     => self::ICON_BACKGROUND_COLOR,
					'default' => empty( Mods::get( self::ICON_BACKGROUND_COLOR, '#0366d6' ) ) ? 'transparent' : '#0366d6',
				],
			],
		];

		$subscribers[] = [
			'selectors' => '.scroll-to-top:hover, .scroll-to-top:focus',
			'rules'     => [
				'color'            => [
					'key'     => self::ICON_TOP_COLOR_HOVER,
					'default' => '#ffffff',
				],
				'background-color' => [
					'key'     => self::ICON_BACKGROUND_COLOR_HOVER,
					'default' => empty( Mods::get( self::ICON_BACKGROUND_COLOR_HOVER, '#0366d6' ) ) ? 'transparent' : '#0366d6',
				],
			],
		];

		$type = Mods::get( self::ICON_TYPE, 'icon' );

		if ( $type === 'icon' ) {

			$subscribers[] = [
				'selectors' => '.scroll-to-top.icon .scroll-to-top-icon',
				'rules'     => [
					'width'  => [
						'key'           => self::ICON_SIZE,
						'default'       => '{ "mobile": "16", "tablet": "16", "desktop": "16" }',
						'is_responsive' => true,
						'filter'        => function ( $css_prop, $value, $meta, $device ) {
							$value = (int) $value;
							if ( $value > 0 ) {
								return sprintf( '%s:%s;', $css_prop, $value . 'px' );
							}
							return '';
						},
					],
					'height' => [
						'key'           => self::ICON_SIZE,
						'default'       => '{ "mobile": "16", "tablet": "16", "desktop": "16" }',
						'is_responsive' => true,
						'filter'        => function ( $css_prop, $value, $meta, $device ) {
							$value = (int) $value;
							if ( $value > 0 ) {
								return sprintf( '%s:%s;', $css_prop, $value . 'px' );
							}
							return '';
						},
					],
				],
			];
		}

		if ( $type === 'image' ) {
			$subscribers[] = [
				'selectors' => '.scroll-to-top.image .scroll-to-top-image',
				'rules'     => [
					'background-color' => [
						'key'    => self::ICON_IMAGE,
						'filter' => function ( $css_prop, $value, $meta, $device ) {
							$image  = wp_get_attachment_url( $value );
							$style  = '';
							$style .= sprintf( 'background-image: url("%s");', esc_url( $image ) );
							$style .= 'background-size:cover;';
							return $style;
						},
					],
				],
			];

			$subscribers['.scroll-to-top.image .scroll-to-top-image'] = [
				'width'  => [
					'key'           => self::ICON_SIZE,
					'default'       => '{ "mobile": "16", "tablet": "16", "desktop": "16" }',
					'is_responsive' => true,
					'filter'        => function ( $css_prop, $value, $meta, $device ) {
						$value = (int) $value;
						if ( $value > 0 ) {
							return sprintf( '%s:%s;', $css_prop, $value . 'px' );
						}
						return '';
					},
				],
				'height' => [
					'key'           => self::ICON_SIZE,
					'default'       => '{ "mobile": "16", "tablet": "16", "desktop": "16" }',
					'is_responsive' => true,
					'filter'        => function ( $css_prop, $value, $meta, $device ) {
						$value = (int) $value;
						if ( $value > 0 ) {
							return sprintf( '%s:%s;', $css_prop, $value . 'px' );
						}
						return '';
					},
				],
			];
		}

		return $subscribers;
	}
}
