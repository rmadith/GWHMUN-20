<?php
/**
 * Author:          Stefan Cotitosu <stefan@themeisle.com>
 * Created on:      2019-02-07
 *
 * @package Neve Pro Addon
 */

namespace Neve_Pro\Modules\Scroll_To_Top;

use Neve_Pro\Core\Abstract_Module;

/**
 * Class Module
 *
 * @package Neve_Pro\Modules\Scroll_To_Top
 */
class Module extends Abstract_Module {

	/**
	 * Define module properties.
	 *
	 * @access  public
	 * @return void
	 * @property string $this->slug        The slug of the module.
	 * @property string $this->name        The pretty name of the module.
	 * @property string $this->description The description of the module.
	 * @property string $this->order       Optional. The order of display for the module. Default 0.
	 * @property boolean $this->active      Optional. Default `false`. The state of the module by default.
	 *
	 * @version 1.0.0
	 */
	public function define_module_properties() {
		$this->slug              = 'scroll_to_top';
		$this->name              = __( 'Scroll To Top', 'neve' );
		$this->description       = __( 'Simple but effective module to help you navigate back to the top of the really long pages.', 'neve' );
		$this->documentation     = array(
			'url'   => 'https://docs.themeisle.com/article/1060-scroll-to-top-module-documentation',
			'label' => __( 'Learn more', 'neve' ),
		);
		$this->order             = 5;
		$this->has_dynamic_style = true;
	}

	/**
	 * Check if module should load.
	 *
	 * @return bool
	 */
	public function should_load() {
		return $this->is_active();
	}

	/**
	 * Run Scroll to Top Module
	 */
	public function run_module() {
		add_action( 'neve_after_primary', array( $this, 'render_button' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_filter( 'neve_pro_filter_customizer_modules', array( $this, 'add_customizer_classes' ) );
		add_action( 'wp_print_styles', array( $this, 'module_css' ) );
		add_action( 'neve_before_header_hook', array( $this, 'scroll_to_top_amp' ) );
	}

	/**
	 * Scroll to top amp observer.
	 */
	public function scroll_to_top_amp() {
		if ( ! neve_is_amp() ) {
			return false;
		}

		echo '<amp-position-observer on="enter:hideAnim.start; exit:showAnim.start" layout="nodisplay"></amp-position-observer>';

		// We use 2 `amp-animation` elements to trigger the visibility of the button. The first one is for making the button visible
		echo '
		<amp-animation id="showAnim" layout="nodisplay">
		<script type="application/json">
		  {
		    "duration": "200ms",
		    "fill": "both",
		    "iterations": "1",
		    "direction": "alternate",
		    "animations": [
		      {
		        "selector": "#scroll-to-top",
		        "keyframes": [
		         { "opacity": "1", "visibility": "visible" }
		        ]
		      }
		    ]
		  }
		</script>
		</amp-animation>';

		echo '
		<!-- ... and the second one is for adding the button.-->
		<amp-animation id="hideAnim" layout="nodisplay">
		  <script type="application/json">
		    {
		      "duration": "200ms",
		      "fill": "both",
		      "iterations": "1",
		      "direction": "alternate",
		      "animations": [
		        {
		          "selector": "#scroll-to-top",
		          "keyframes": [
		            { "opacity": "0", "visibility": "hidden" }
		          ]
		        }
		      ]
		     }
		    </script>
		  </amp-animation>
		';
		return true;
	}

	/**
	 * Add module css.
	 */
	public function module_css() {
		echo '<style>';

		echo '.scroll-to-top {';
			echo is_rtl() ? 'left: 20px;' : 'right: 20px;';
			echo '
			border: none;
			position: fixed;
			bottom: 30px;
			display: none;
			opacity: 0;
			visibility: hidden;
			transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
			align-items: center;
			justify-content: center;
			z-index: 999;
		}';

		echo '.scroll-to-top:focus {
			outline: none;
		}';

		echo '.scroll-to-top.image {
			background-position: center;
		}';

		echo'.scroll-to-top .scroll-to-top-image {
			width: 100%;
		    height: 100%;
		}';

		echo '.scroll-to-top .scroll-to-top-label {
			margin: 0;
			padding: 5px;
		}';

		echo '.scroll-to-top:hover {
			text-decoration: none;
		}';

		echo '.scroll-to-top.scroll-to-top-left {';
			echo is_rtl() ? 'right: 20px; left: unset;' : 'left: 20px; right: unset;';
		echo '}';

		echo '.scroll-to-top.scroll-show-mobile {
		  display: flex;
		}';

		echo '@media (min-width: 960px) {
			.scroll-to-top {
				display: flex;
			}
		}';
		echo '</style>';
	}

	/**
	 * Add customizer classes.
	 *
	 * @param array $classes loaded classes.
	 *
	 * @return array
	 */
	public function add_customizer_classes( $classes ) {
		$classes[] = 'Modules\Scroll_To_Top\Customizer\Scroll_To_Top';

		return $classes;
	}

	/**
	 * Enqueue module scripts
	 *
	 * @return bool
	 */
	public function enqueue_scripts() {
		if ( neve_is_amp() ) {
			return false;
		}

		wp_register_script( 'neve-pro-scroll-to-top', NEVE_PRO_INCLUDES_URL . 'modules/scroll_to_top/assets/js/script.js', array(), NEVE_PRO_VERSION, true );

		wp_enqueue_script( 'neve-pro-scroll-to-top' );

		wp_localize_script( 'neve-pro-scroll-to-top', 'scrollOffset', $this->localize_scroll() );

		return true;
	}

	/**
	 * Send offset to the JS object
	 *
	 * @return array
	 */
	private function localize_scroll() {
		return array(
			'offset' => get_theme_mod( 'neve_scroll_to_top_offset', 0 ),
		);
	}

	/**
	 * Display scroll to top button
	 */
	public function render_button() {
		$position       = get_theme_mod( 'neve_scroll_to_top_side', 'right' );
		$hide_on_mobile = get_theme_mod( 'neve_scroll_to_top_on_mobile', false );
		$type           = get_theme_mod( 'neve_scroll_to_top_type', 'icon' );
		$label          = get_theme_mod( 'neve_scroll_to_top_label' );
		$image          = get_theme_mod( 'neve_scroll_to_top_image' );

		$extra_class  = sprintf( 'scroll-to-top-%s %s', $position, ( ( ! $hide_on_mobile ) ? ' scroll-show-mobile ' : '' ) );
		$extra_class .= $type;

		echo '<a tabindex="0" on="tap:neve_body.scrollTo(duration=200)" id="scroll-to-top" class="scroll-to-top ' . esc_attr( $extra_class ) . '">';
		if ( $type === 'icon' ) {
			echo '<svg class="scroll-to-top-icon"  width="15" height="15" viewBox="0 0 448 512"><path fill="currentColor" d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"/></svg>';
		}
		if ( $type === 'image' && ! empty( $image ) ) {
			echo '<div class="scroll-to-top-image"></div>';
		}
		if ( ! empty( $label ) ) {
			echo '<p class="scroll-to-top-label">' . wp_kses_post( $label ) . '</p>';
		}
		if ( neve_is_amp() ) {
			echo '<amp-position-observer on="enter:hideAnim.start; exit:showAnim.start" layout="nodisplay"></amp-position-observer>';
		}
		echo '</a>';
	}
}
