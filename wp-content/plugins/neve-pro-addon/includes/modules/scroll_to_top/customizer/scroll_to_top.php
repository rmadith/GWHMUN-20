<?php
/**
 * Author:          Stefan Cotitosu <stefan@themeisle.com>
 * Created on:      2019-02-06
 *
 * @package Neve Pro Addon
 */

namespace Neve_Pro\Modules\Scroll_To_Top\Customizer;

use Neve\Customizer\Base_Customizer;
use Neve\Customizer\Types\Control;
use Neve\Customizer\Types\Section;

/**
 * Class Scroll_To_Top
 *
 * @package Neve_Pro\Customizer\Options
 */
class Scroll_To_Top extends Base_Customizer {

	/**
	 * Base initialization.
	 */
	public function init() {
		parent::init();
		add_action( 'wp_head', array( $this, 'live_refresh_scripts' ) );
	}

	/**
	 * Live refresh for scroll to top controls.
	 *
	 * @return bool
	 */
	public function live_refresh_scripts() {
		if ( ! is_customize_preview() ) {
			return false;
		}
		?>
		<script type="text/javascript">
		jQuery(document).ready(function () {
			wp.customize('neve_scroll_to_top_side', function (value) {
				value.bind(function ( newval ) {
					var traget = jQuery('#scroll-to-top');
					if ( newval === 'right' ) {
						traget.removeClass( 'scroll-to-top-left' ).addClass( 'scroll-to-top-right' );
					}
					if ( newval === 'left' ) {
						traget.removeClass( 'scroll-to-top-right' ).addClass( 'scroll-to-top-left' );
					}
				});
			});

			wp.customize( 'neve_scroll_to_top_label', function (value) {
				value.bind(function ( newval ) {
					var hasLabel = jQuery('.scroll-to-top-label').length > 0;
					if ( hasLabel ) {
						jQuery('.scroll-to-top-label' ).text( newval );
					} else {
						jQuery( '.scroll-to-top' ).append( '<p class="scroll-to-top-label">' + newval + '</p>' );
					}
				});
			});
		});
		</script>
		<?php
		return true;
	}

	/**
	 * Add customizer section and controls
	 */
	public function add_controls() {
		$this->scroll_to_top_section();
		$this->scroll_to_top_options();
		$this->scroll_to_top_style_controls();
	}

	/**
	 * Register customizer section for the module
	 */
	private function scroll_to_top_section() {

		$this->add_section(
			new Section(
				'neve_scroll_to_top',
				array(
					'priority' => 80,
					'title'    => esc_html__( 'Scroll To Top', 'neve' ),
					'panel'    => 'neve_layout',
				)
			)
		);

	}

	/**
	 * Register option toggle in customizer
	 */
	private function scroll_to_top_options() {

		$this->add_control(
			new Control(
				'neve_scroll_to_top_general',
				array(
					'sanitize_callback' => 'sanitize_text_field',
				),
				array(
					'label'            => esc_html__( 'General', 'neve' ),
					'section'          => 'neve_scroll_to_top',
					'priority'         => 10,
					'class'            => 'scroll-to-top-general',
					'accordion'        => true,
					'expanded'         => true,
					'controls_to_wrap' => 6,
				),
				'Neve\Customizer\Controls\Heading'
			)
		);

		/**
		 * Button side
		 */
		$this->add_control(
			new Control(
				'neve_scroll_to_top_side',
				array(
					'default'           => 'right',
					'sanitize_callback' => array( $this, 'sanitize_scroll_to_top_side' ),
					'transport'         => $this->selective_refresh,
				),
				array(
					'label'    => esc_html__( 'Choose Side', 'neve' ),
					'section'  => 'neve_scroll_to_top',
					'priority' => 20,
					'type'     => 'select',
					'choices'  => array(
						'left'  => esc_html__( 'Left', 'neve' ),
						'right' => esc_html__( 'Right', 'neve' ),
					),
				)
			)
		);

		/**
		 * Scroll to top type
		 */
		$this->add_control(
			new Control(
				'neve_scroll_to_top_type',
				array(
					'default'           => 'icon',
					'sanitize_callback' => array( $this, 'sanitize_scroll_to_top_type' ),
				),
				array(
					'label'    => esc_html__( 'Type', 'neve' ),
					'section'  => 'neve_scroll_to_top',
					'priority' => 30,
					'type'     => 'select',
					'choices'  => array(
						'icon'  => esc_html__( 'Icon', 'neve' ),
						'image' => esc_html__( 'Image', 'neve' ),
					),
				)
			)
		);

		/**
		 * Image button
		 */
		$this->add_control(
			new Control(
				'neve_scroll_to_top_image',
				array(
					'sanitize_callback' => 'absint',
				),
				array(
					'label'           => esc_html__( 'Image', 'neve' ),
					'section'         => 'neve_scroll_to_top',
					'priority'        => 40,
					'active_callback' => array( $this, 'is_image_type_control' ),
					'flex_height'     => true,
					'flex_width'      => true,
				),
				'\WP_Customize_Cropped_Image_Control'
			)
		);

		/*
		 * Label
		 */
		$this->add_control(
			new Control(
				'neve_scroll_to_top_label',
				array(
					'sanitize_callback' => 'sanitize_text_field',
					'transport'         => $this->selective_refresh,
				),
				array(
					'priority' => 50,
					'section'  => 'neve_scroll_to_top',
					'label'    => esc_html__( 'Label', 'neve' ),
					'type'     => 'text',
				)
			)
		);

		/**
		 * Offset
		 */
		$this->add_control(
			new Control(
				'neve_scroll_to_top_offset',
				array(
					'sanitize_callback' => 'absint',
					'default'           => 0,
				),
				array(
					'label'       => esc_html__( 'Offset (px)', 'neve' ),
					'description' => esc_html__( 'Show button when page is scrolled x pixels.', 'neve' ),
					'section'     => 'neve_scroll_to_top',
					'step'        => 1,
					'input_attr'  => array(
						'min'     => 0,
						'max'     => 1000,
						'default' => 0,
					),
					'input_attrs' => array(
						'min'        => 0,
						'max'        => 1000,
						'defaultVal' => 0,
					),
					'priority'    => 60,
				),
				class_exists( 'Neve\Customizer\Controls\React\Range' ) ? 'Neve\Customizer\Controls\React\Range' : 'Neve\Customizer\Controls\Range'
			)
		);

		/**
		 * Hide on mobile
		 */
		$this->add_control(
			new Control(
				'neve_scroll_to_top_on_mobile',
				array(
					'sanitize_callback' => 'neve_sanitize_checkbox',
					'default'           => false,
				),
				array(
					'label'    => esc_html__( 'Hide on mobile', 'neve' ),
					'section'  => 'neve_scroll_to_top',
					'type'     => 'neve_toggle_control',
					'priority' => 70,
				),
				'Neve\Customizer\Controls\Checkbox'
			)
		);
	}

	/**
	 * Add style controls for Scroll to top module.
	 */
	private function scroll_to_top_style_controls() {

		$this->add_control(
			new Control(
				'neve_scroll_to_top_style',
				array(
					'sanitize_callback' => 'sanitize_text_field',
				),
				array(
					'label'            => esc_html__( 'Style', 'neve' ),
					'section'          => 'neve_scroll_to_top',
					'priority'         => 80,
					'class'            => 'advanced-sidebar-accordion',
					'accordion'        => true,
					'expanded'         => false,
					'controls_to_wrap' => 8,
				),
				'Neve\Customizer\Controls\Heading'
			)
		);

		$default_padding_values = array(
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
		);
		$this->add_control(
			new Control(
				'neve_scroll_to_top_padding',
				array(
					'default'   => $default_padding_values,
					'transport' => version_compare( NEVE_VERSION, '2.7.3', '<=' ) ? 'refresh' : $this->selective_refresh,
				),
				array(
					'label'                 => __( 'Padding', 'neve' ),
					'sanitize_callback'     => array( $this, 'sanitize_spacing_array' ),
					'section'               => 'neve_scroll_to_top',
					'input_attrs'           => array(
						'units' => array( 'px' ),
					),
					'default'               => $default_padding_values,
					'priority'              => 90,
					'live_refresh_selector' => true,
					'live_refresh_css_prop' => array(
						'responsive'  => true,
						'directional' => true,
						'template'    =>
							'#scroll-to-top {
							padding-top: {{value.top}};
							padding-right: {{value.right}};
							padding-bottom: {{value.bottom}};
							padding-left: {{value.left}};
						}',
					),
				),
				'\Neve\Customizer\Controls\React\Spacing'
			)
		);

		/**
		 * Icon size
		 */
		$this->add_control(
			new Control(
				'neve_scroll_to_top_icon_size',
				array(
					'sanitize_callback' => 'neve_sanitize_range_value',
					'default'           => '{ "mobile": "16", "tablet": "16", "desktop": "16" }',
					'transport'         => version_compare( NEVE_VERSION, '2.7.3', '<=' ) ? 'refresh' : $this->selective_refresh,
				),
				array(
					'label'                 => esc_html__( 'Icon Size (px)', 'neve' ),
					'section'               => 'neve_scroll_to_top',
					'media_query'           => true,
					'step'                  => 1,
					'input_attr'            => array(
						'mobile'  => array(
							'min'     => 10,
							'max'     => 100,
							'default' => 16,
						),
						'tablet'  => array(
							'min'     => 10,
							'max'     => 100,
							'default' => 16,
						),
						'desktop' => array(
							'min'     => 10,
							'max'     => 100,
							'default' => 16,
						),
					),
					'input_attrs'           => array(
						'step'       => 1,
						'min'        => 10,
						'max'        => 100,
						'defaultVal' => array(
							'mobile'  => 16,
							'tablet'  => 16,
							'desktop' => 16,
						),
						'units'      => array( 'px' ),
					),
					'priority'              => 100,
					'live_refresh_selector' => true,
					'live_refresh_css_prop' => array(
						'responsive' => true,
						'template'   => 'body .scroll-to-top.icon .scroll-to-top-icon, body .scroll-to-top.image .scroll-to-top-image {
							width: {{value}}px;
							height: {{value}}px;
						}',
					),
				),
				class_exists( 'Neve\Customizer\Controls\React\Responsive_Range', false ) ? 'Neve\Customizer\Controls\React\Responsive_Range' : 'Neve\Customizer\Controls\Range'
			)
		);

		/**
		 * Button border radius
		 */
		$this->add_control(
			new Control(
				'neve_scroll_to_top_border_radius',
				array(
					'sanitize_callback' => 'absint',
					'default'           => 3,
					'transport'         => version_compare( NEVE_VERSION, '2.7.3', '<=' ) ? 'refresh' : $this->selective_refresh,
				),
				array(
					'label'                 => esc_html__( 'Border Radius', 'neve' ),
					'section'               => 'neve_scroll_to_top',
					'step'                  => 1,
					'input_attr'            => array(
						'min'     => 0,
						'max'     => 200,
						'default' => 3,
					),
					'input_attrs'           => array(
						'min'        => 0,
						'max'        => 200,
						'defaultVal' => 3,
					),
					'priority'              => 110,
					'live_refresh_selector' => true,
					'live_refresh_css_prop' => array(
						'template' => 'body .scroll-to-top {
							border-radius: {{value}}px;
						}',
						'fallback' => '0',
					),
				),
				class_exists( 'Neve\Customizer\Controls\React\Range' ) ? 'Neve\Customizer\Controls\React\Range' : 'Neve\Customizer\Controls\Range'
			)
		);

		/**
		 * Colors heading
		 */
		$this->add_control(
			new Control(
				'neve_scroll_to_top_colors',
				array(
					'sanitize_callback' => 'sanitize_text_field',
				),
				array(
					'label'            => esc_html__( 'Colors', 'neve' ),
					'section'          => 'neve_scroll_to_top',
					'priority'         => 110,
					'class'            => 'advanced-sidebar-accordion',
					'accordion'        => true,
					'expanded'         => true,
					'controls_to_wrap' => 4,
					'active_callback'  => array( $this, 'is_icon_type_control' ),
				),
				'Neve\Customizer\Controls\Heading'
			)
		);

		$color_controls = array(
			'neve_scroll_to_top_icon_color'             => array(
				'default'               => '#ffffff',
				'priority'              => 120,
				'label'                 => esc_html__( 'Color', 'neve' ),
				'live_refresh_css_prop' => array(
					'template' => '
					body .scroll-to-top {
						color: {{value}};
					}',
				),
			),
			'neve_scroll_to_top_icon_hover_color'       => array(
				'default'               => '#ffffff',
				'priority'              => 130,
				'label'                 => esc_html__( 'Hover Color', 'neve' ),
				'live_refresh_css_prop' => array(
					'template' => '
					body .scroll-to-top:hover {
						color: {{value}};
					}',
				),
			),
			'neve_scroll_to_top_background_color'       => array(
				'default'               => '#0366d6',
				'priority'              => 140,
				'label'                 => esc_html__( 'Background Color', 'neve' ),
				'live_refresh_css_prop' => array(
					'template' => '
					body .scroll-to-top {
						background-color: {{value}};
					}',
				),
			),
			'neve_scroll_to_top_background_hover_color' => array(
				'default'               => '#0366d6',
				'priority'              => 150,
				'label'                 => esc_html__( 'Background Hover Color', 'neve' ),
				'live_refresh_css_prop' => array(
					'template' => '
					body .scroll-to-top:hover {
						background-color: {{value}};
					}',
				),
			),
		);

		/**
		 * Color controls
		 */
		foreach ( $color_controls as $control_id => $control_properties ) {
			$this->add_control(
				new Control(
					$control_id,
					array(
						'sanitize_callback' => 'neve_sanitize_colors',
						'default'           => $control_properties['default'],
						'transport'         => version_compare( NEVE_VERSION, '2.7.3', '<=' ) ? 'refresh' : $this->selective_refresh,
					),
					array(
						'label'                 => $control_properties['label'],
						'section'               => 'neve_scroll_to_top',
						'priority'              => $control_properties['priority'],
						'live_refresh_selector' => true,
						'live_refresh_css_prop' => $control_properties['live_refresh_css_prop'],

					),
					'\Neve\Customizer\Controls\React\Color'
				)
			);
		}
	}

	/**
	 * Active callback for controls that are available only if scroll to top is an image
	 */
	public function is_image_type_control() {
		$scroll_to_top_type = get_theme_mod( 'neve_scroll_to_top_type', 'icon' );
		if ( $scroll_to_top_type !== 'image' ) {
			return false;
		}

		return true;
	}

	/**
	 * Active callback for controls that are available only if scroll to top is an image
	 */
	public function is_icon_type_control() {
		$scroll_to_top_type = get_theme_mod( 'neve_scroll_to_top_type', 'icon' );
		if ( $scroll_to_top_type !== 'icon' ) {
			return false;
		}

		return true;
	}

	/**
	 * Sanitize scroll to top type
	 *
	 * @param string $value - value of the control.
	 *
	 * @return string
	 */
	public function sanitize_scroll_to_top_type( $value ) {
		$allowed_values = array( 'icon', 'image' );
		if ( ! in_array( $value, $allowed_values, true ) ) {
			return 'icon';
		}

		return esc_html( $value );
	}

	/**
	 * Sanitize scroll to top side
	 *
	 * @param string $value - value of the control.
	 *
	 * @return string
	 */
	public function sanitize_scroll_to_top_side( $value ) {
		$allowed_values = array( 'left', 'right' );
		if ( ! in_array( $value, $allowed_values, true ) ) {
			return 'right';
		}

		return esc_html( $value );
	}

}
