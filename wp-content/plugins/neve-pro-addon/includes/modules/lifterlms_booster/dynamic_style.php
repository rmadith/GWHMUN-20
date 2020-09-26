<?php
/**
 * File that handle dynamic css for Lifter integration.
 *
 * @package Neve_Pro\Modules\LifterLMS_Booster
 */

namespace Neve_Pro\Modules\LifterLMS_Booster;

use Neve_Pro\Core\Generic_Style;

/**
 * Class Dynamic_Style
 *
 * @package Neve_Pro\Modules\LifterLMS_Booster
 */
class Dynamic_Style extends Generic_Style {
	const PRIMARY_COLOR = 'neve_lifter_primary_color';
	/**
	 * Main color elements selectors.
	 *
	 * @var array
	 */
	private $main_color_selectors = array(
		'border-color' =>
			'.llms-instructor-info .llms-instructors .llms-author,
			.llms-instructor-info .llms-instructors .llms-author .avatar,
			.llms-notification,
			.llms-checkout-section',
		'color'        =>
			'.llms-lesson-preview.is-complete .llms-lesson-complete,
			.llms-loop-item-content .llms-loop-title:hover',
		'background'   =>
			'.llms-instructor-info .llms-instructors .llms-author .avatar,
			.llms-access-plan-title,
			.llms-checkout-wrapper .llms-form-heading',

	);

	/**
	 * Add dynamic style subscribers.
	 *
	 * @param array $subscribers Css subscribers.
	 *
	 * @return array|mixed
	 */
	public function add_subscribers( $subscribers = [] ) {

		$subscribers[ $this->main_color_selectors['border-color'] ] = [
			'border-color' => self::PRIMARY_COLOR,
		];
		$subscribers[ $this->main_color_selectors['color'] ]        = [
			'color' => self::PRIMARY_COLOR,
		];
		$subscribers[ $this->main_color_selectors['background'] ]   = [
			'background-color' => self::PRIMARY_COLOR,
		];

		$theme_mod = '';
		$context   = '';
		if ( is_memberships() ) {
			$theme_mod = 'neve_membership_box_shadow_intensity';
			$context   = 'membership';
		}

		if ( is_courses() ) {
			$theme_mod = 'neve_course_box_shadow_intensity';
			$context   = 'course';
		}
		if ( empty( $theme_mod ) || empty( $context ) ) {
			return $subscribers;
		}
		$subscribers[ '.llms-' . $context . '-list .llms-loop-item .llms-loop-item-content' ] = [
			'box-shadow' => [
				'key'    => $theme_mod,
				'filter' => function ( $css_prop, $value, $meta, $device ) {
					return 'box-shadow: 0px 1px 20px ' . ( $value - 20 ) . 'px rgba(0, 0, 0, 0.12);';
				},
			],
		];

		return $subscribers;
	}
}
