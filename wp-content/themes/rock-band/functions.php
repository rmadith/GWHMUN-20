<?php
/**
 * Components functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Rock Band
 *
 *
 * Rock Band only works with parent theme My Music Band  1.2.2 or later.
 */

$my_theme = wp_get_theme('my-music-band');
if ( version_compare( $my_theme->get( 'Version' ), '1.2.2', '<' ) ) {
	require trailingslashit( get_stylesheet_directory() ) . '/inc/back-compat.php';
	return;
}

/**
 * Loads the child theme textdomain.
 */
function rock_band_setup() {
    load_child_theme_textdomain( 'rock-band', get_stylesheet_directory() . '/languages' );

    add_editor_style( array(
		'assets/css/editor-style.css',
		my_music_band_fonts_url(),
		trailingslashit( esc_url ( get_template_directory_uri() ) ) . 'assets/css/font-awesome/css/font-awesome.css' )
	);
}
add_action( 'after_setup_theme', 'rock_band_setup' );


/**
 * Enqueue scripts and styles.
 */
function rock_band_scripts() {
	/* If using a child theme, auto-load the parent theme style. */
	if ( is_child_theme() ) {
		wp_enqueue_style( 'rock-band-style', trailingslashit( esc_url( get_template_directory_uri() ) ) . 'style.css' );
	}

	/* Always load active theme's style.css. */
	wp_enqueue_style( 'rock-band-style', get_stylesheet_uri() );

	// Theme block stylesheet.
	wp_enqueue_style( 'rock-band-block-style', get_theme_file_uri( '/assets/css/blocks.css' ), array( 'rock-band-style' ), '1.0' );
}
add_action( 'wp_enqueue_scripts', 'rock_band_scripts');

/**
 * Remove parent block style.
 */
function rock_band_dequeue_blocks() {
	wp_dequeue_style( 'my-music-band-block-style' ); 
}
add_action( 'wp_enqueue_scripts', 'rock_band_dequeue_blocks', 100 );

/**
 * Load Metabox
 */
require trailingslashit( get_stylesheet_directory() ) . '/inc/metabox/metabox.php';

/**
 * Load Customizer Options
 */
require trailingslashit( get_stylesheet_directory() ) . 'inc/customizer.php';

/**
 * Parent theme override functions
 */
require trailingslashit( get_stylesheet_directory() ) . 'inc/override-parent.php';
