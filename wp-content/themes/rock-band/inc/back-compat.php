<?php
/**
 * Rock Band back compat functionality
 *
 * Prevents Rock Band from running if the parent theme version is
 * prior to 1.2.2
 * since this theme is not meant to be backward compatible beyond that and
 * relies on functions and markup changes introduced in 1.2.2
 *
 * @since Rock Band 1.0
 */

/**
 * Prevent switching to Rock Band on old versions of Parent theme.
 *
 * Switches to the default theme.
 *
 * @since Rock Band 1.0
 */
function rock_band_switch_theme() {
	switch_theme( WP_DEFAULT_THEME );
	unset( $_GET['activated'] );
	add_action( 'admin_notices', 'rock_band_upgrade_notice' );
}
add_action( 'after_switch_theme', 'rock_band_switch_theme' );

/**
 * Adds a message for unsuccessful theme switch.
 *
 * @since Rock Band 1.0
 */
function rock_band_upgrade_notice() {
	$my_theme = wp_get_theme('my-music-band');
	$message = sprintf( __( 'Rock Band requires at least My Music Band version 1.2.2 You are running version %s. Please upgrade and try again.', 'rock-band' ), $my_theme->get( 'Version' ) );
	printf( '<div class="error"><p>%s</p></div>', $message );
}

/**
 * Prevents the Customizer from being loaded on My Music Band versions prior to 1.2.2
 *
 * @since Rock Band 1.0
 */
function rock_band_customize() {
	$my_theme = wp_get_theme('my-music-band');
	wp_die(
		sprintf( __( 'Rock Band requires at least My Music Band version 1.2.2 You are running version %s. Please upgrade and try again.', 'rock-band' ), $my_theme->get( 'Version' ) ), '', array(
			'back_link' => true,
		)
	);
}
add_action( 'load-customize.php', 'rock_band_customize' );

/**
 * Prevents the Theme Preview from being loaded on My Music Band versions prior to * 1.2.2
 *
 * @since Rock Band 1.0
 *
 * @global string $wp_version WordPress version.
 */
function rock_band_preview() {
	$my_theme = wp_get_theme('my-music-band');
	if ( isset( $_GET['preview'] ) ) {
		wp_die( sprintf( __( 'Rock Band requires at least My Music Band version 1.2.2 You are running version %s. Please upgrade and try again.', 'rock-band' ), $my_theme->get( 'Version' ) ) );
	}
}
add_action( 'template_redirect', 'rock_band_preview' );
