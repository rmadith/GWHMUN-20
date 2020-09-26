<?php
/**
 * Override parent functions
 *
 * @package Rock Band
 *
 * Adds custom classes to the array of body classes.
 *
 * @since Rock Band 1.0

 *
 * @param array $classes Classes for the body element.
 * @return array (Maybe) filtered body classes.
 */
function my_music_band_body_classes( $classes ) {
	// Adds a class of custom-background-image to sites with a custom background image.
	if ( get_background_image() ) {
		$classes[] = 'custom-background-image';
	}

	// Adds a class of group-blog to blogs with more than 1 published author.
	if ( is_multi_author() ) {
		$classes[] = 'group-blog';
	}

	// Adds a class of hfeed to non-singular pages.
	if ( ! is_singular() ) {
		$classes[] = 'hfeed';
	}

	// Always add a front-page class to the front page.
	if ( is_front_page() && ! is_home() ) {
		$classes[] = 'page-template-front-page';
	}
	$classes[] = 'fluid-layout';

	$classes[] = 'navigation-classic';

	// Adds a class with respect to layout selected.
	$layout  = my_music_band_get_theme_layout();
	$sidebar = my_music_band_get_sidebar_id();

	$layout_class = "no-sidebar content-width-layout";

	if ( 'no-sidebar-full-width' === $layout ) {
		$layout_class = 'no-sidebar full-width-layout';
	} elseif ( 'left-sidebar' === $layout ) {
		if ( '' !== $sidebar ) {
			$layout_class = 'two-columns-layout content-right';
		}
	} elseif ( 'right-sidebar' === $layout ) {
		if ( '' !== $sidebar ) {
			$layout_class = 'two-columns-layout content-left';
		}
	}

	$classes[] = $layout_class;

	$classes[] = 'excerpt-image-top';

	$classes[] = esc_attr( get_theme_mod( 'my_music_band_header_media_layout', 'header-media-fluid' ) );

	$enable_slider = my_music_band_check_section( get_theme_mod( 'my_music_band_slider_option', 'disabled' ) );

	$enable_breadcrumb = get_theme_mod( 'my_music_band_breadcrumb_option', 1 );

	$enable_header_media = true;
	$header_image        = my_music_band_featured_overall_image();

	if ( 'disable' === $header_image ) {
		$enable_header_media = false;
	} else { 
		$classes[] = 'has-header-media';
	}

	if ( ! my_music_band_has_header_media_text() ) {
		$classes[] = 'header-media-text-disabled';
	}

	if ( ( ! $enable_slider && ! $enable_header_media)  ||  !$enable_breadcrumb ) {
		$classes[] = 'primary-nav-bottom-border';
	}

	return $classes;
}

function my_music_band_custom_header_and_background() {
	$default_background_color = '#f0f0f0';
	$default_text_color       = '#373737';

	/**
	 * Filter the arguments used when adding 'custom-background' support in Rock Band.
	 *
	 * @since Rock Band 1.0

	 *
	 * @param array $args {
	 *     An array of custom-background support arguments.
	 *
	 *     @type string $default-color Default color of the background.
	 * }
	 */
	add_theme_support( 'custom-background', apply_filters( 'my_music_band_custom_background_args', array(
		'default-color' => $default_background_color,
	) ) );

	/**
	 * Filter the arguments used when adding 'custom-header' support in Rock Band.
	 *
	 * @since Rock Band 1.0

	 *
	 * @param array $args {
	 *     An array of custom-header support arguments.
	 *
	 *     @type string $default-text-color Default color of the header text.
	 *     @type int      $width            Width in pixels of the custom header image. Default 1200.
	 *     @type int      $height           Height in pixels of the custom header image. Default 280.
	 *     @type bool     $flex-height      Whether to allow flexible-height header images. Default true.
	 *     @type callable $wp-head-callback Callback function used to style the header image and text
	 *                                      displayed on the blog.
	 * }
	 */
	add_theme_support( 'custom-header', apply_filters( 'my_music_band_custom_header_args', array(
		'default-image'      	 => get_stylesheet_directory_uri() . '/assets/images/header-image.jpg',
		'default-text-color'     => $default_text_color,
		'width'                  => 1920,
		'height'                 => 1080,
		'flex-height'            => true,
		'flex-height'            => true,
		'wp-head-callback'       => 'my_music_band_header_style',
		'video'                  => true,
	) ) );

	register_default_headers( array(
		'default-image' => array(
			'url'           => '%s/assets/images/header-image.jpg',
			'thumbnail_url' => '%s/assets/images/header-image-275x155.jpg',
			'description'   => esc_html__( 'Default Header Image', 'rock-band' ),
		),
		'second-image' => array(
			'url'           => '%s/assets/images/header-image-1.jpg',
			'thumbnail_url' => '%s/assets/images/header-image-1-275x155.jpg',
			'description'   => esc_html__( 'Boxed Header Image', 'rock-band' ),
		),
		'thrid-image' => array(
			'url'           => '%s/assets/images/header-image-2.jpg',
			'thumbnail_url' => '%s/assets/images/header-image-2-275x155.jpg',
			'description'   => esc_html__( 'Dark Header Image', 'rock-band' ),
		),
	) );
}

/**
 * Enqueue editor styles for Gutenberg
 *
 * @since My Music Band Pro 1.0
 */
function my_music_band_block_editor_styles() {
	// Block styles.
	wp_enqueue_style( 'rock-band-block-editor-style', get_theme_file_uri( '/assets/css/editor-blocks.css' ) );
}
