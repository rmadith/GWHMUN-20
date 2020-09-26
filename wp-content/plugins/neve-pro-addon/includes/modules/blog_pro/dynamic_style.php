<?php
/**
 * File that handle dynamic css for Blog pro integration.
 *
 * @package Neve_Pro\Modules\Blog_Pro
 */

namespace Neve_Pro\Modules\Blog_Pro;

use Neve\Core\Settings\Mods;
use Neve_Pro\Core\Generic_Style;

/**
 * Class Dynamic_Style
 *
 * @package Neve_Pro\Modules\Blog_Pro
 */
class Dynamic_Style extends Generic_Style {

	const AVATAR_SIZE = 'neve_author_avatar_size';

	/**
	 * Register extra hooks.
	 */
	public function register_hooks() {
		parent::register_hooks();
		add_filter(
			'neve_gravatar_args',
			[ $this, 'add_dynamic_gravatar' ]
		);
	}

	/**
	 * Add dynamic gravatar values.
	 *
	 * @param array $args_array Avatar args.
	 *
	 * @return mixed
	 */
	public function add_dynamic_gravatar( $args_array ) {

		$avatar_size = Mods::to_json( self::AVATAR_SIZE );

		if ( ! isset( $args_array['size'] ) ) {
			return $args_array;
		}
		if ( ! is_array( $avatar_size ) ) {
			return $args_array;
		}

		$args_array['size'] = max( $avatar_size );

		return $args_array;
	}

	/**
	 * Add dynamic style subscribers.
	 *
	 * @param array $subscribers Css subscribers.
	 *
	 * @return array|mixed
	 */
	public function add_subscribers( $subscribers = [] ) {
		$subscribers['.nv-meta-list .meta.author .photo'] = [
			'height' => [
				'key'           => self::AVATAR_SIZE,
				'is_responsive' => true,
			],
			'width'  => [
				'key'           => self::AVATAR_SIZE,
				'is_responsive' => true,
			],
		];

		return $subscribers;
	}
}
