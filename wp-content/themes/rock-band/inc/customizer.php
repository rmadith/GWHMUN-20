<?php
/**
 * Rock Band Theme Customizer
 *
 * @package Rock Band
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function rock_band_customize_register( $wp_customize ) {
	$wp_customize->remove_section( 'my_music_band_important_links' );
	// Important Links.
	class Rock_Band_Important_links extends WP_Customize_Control {
		public $type = 'important-links';

		public function render_content() {
			// Add Theme instruction, Support Forum, Changelog, Donate link, Review, Facebook, Twitter, Google+, Pinterest links.
			$important_links = array(
				'theme_instructions' => array(
					'link'  => esc_url( 'https://catchthemes.com/theme-instructions/rock-band/' ),
					'text'  => esc_html__( 'Theme Instructions', 'rock-band' ),
					),
				'support' => array(
					'link'  => esc_url( 'https://catchthemes.com/support/' ),
					'text'  => esc_html__( 'Support', 'rock-band' ),
					),
				'changelog' => array(
					'link'  => esc_url( 'https://catchthemes.com/changelogs/rock-band-theme/' ),
					'text'  => esc_html__( 'Changelog', 'rock-band' ),
					),
				'facebook' => array(
					'link'  => esc_url( 'https://www.facebook.com/catchthemes/' ),
					'text'  => esc_html__( 'Facebook', 'rock-band' ),
					),
				'twitter' => array(
					'link'  => esc_url( 'https://twitter.com/catchthemes/' ),
					'text'  => esc_html__( 'Twitter', 'rock-band' ),
					),
				'gplus' => array(
					'link'  => esc_url( 'https://plus.google.com/+Catchthemes/' ),
					'text'  => esc_html__( 'Google+', 'rock-band' ),
					),
				'pinterest' => array(
					'link'  => esc_url( 'http://www.pinterest.com/catchthemes/' ),
					'text'  => esc_html__( 'Pinterest', 'rock-band' ),
					),
			);

			foreach ( $important_links as $important_link ) {
				echo '<p><a target="_blank" href="' . $important_link['link'] . '" >' . $important_link['text'] . ' </a></p>'; // WPCS: XSS OK.
			}
		}
	}

	// Important Links.
	$wp_customize->add_section( 'rock_band_important_links', array(
		'priority'      => 999,
		'title'         => esc_html__( 'Important Links', 'rock-band' ),
	) );

	// Has dummy Sanitizaition function as it contains no value to be sanitized.
	my_music_band_register_option( $wp_customize, array(
			'name'              => 'rock_band_important_links',
			'sanitize_callback' => 'sanitize_text_field',
			'custom_control'    => 'Rock_Band_Important_links',
			'label'             => esc_html__( 'Important Links', 'rock-band' ),
			'section'           => 'rock_band_important_links',
			'type'              => 'rock_band_important_links',
		)
	);
	// Important Links End.
}
add_action( 'customize_register', 'rock_band_customize_register', 20 );
