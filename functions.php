<?php
show_admin_bar(false);

// Theme Support
if (!function_exists('fv_setup')) {
	function fv_setup()	{
		add_theme_support('automatic-feed-links');
		add_theme_support('title-tag');
		add_theme_support('post-thumbnails');
		register_nav_menus(array(
			'menu-1' => esc_html__('Primary', 'fv'),
		));

    add_image_size( 'full-hd', 1920);
	}
}
add_action('after_setup_theme', 'fv_setup');

function add_async_forscript($url) {
	if (strpos($url, '#asyncload') === false) {
		return $url;
	} else if (is_admin()) {
		return str_replace('#asyncload', '', $url);
	} else {
		return str_replace('#asyncload', '', $url) . "' defer='defer";
	}
}
add_filter('clean_url', 'add_async_forscript', 11, 1);

function fv_scripts() {
	// css
	wp_enqueue_style('fv-css-libs', get_template_directory_uri() . '/dist/css/libs.css');
	wp_enqueue_style('fv-css-app', get_template_directory_uri() . '/dist/css/app.css');
	// js
	wp_enqueue_script('fv-js-app', get_template_directory_uri() . '/dist/js/app.js#asyncload',  array(), '20151215', true);

	if (is_singular() && comments_open() && get_option('thread_comments')) {
		wp_enqueue_script('comment-reply');
	}
}
add_action('wp_enqueue_scripts', 'fv_scripts');

function add_favicon() {
	echo '<link rel="shortcut icon" type="image/x-icon" href="' . get_template_directory_uri() . '/favicon.ico" />';
}
add_action('wp_head', 'add_favicon');

function logout_page() {  
  $login_page  = home_url( 'wp-admin' );  
  wp_redirect( $login_page . "?loggedout=true" );  
  exit;  
} 
add_action('wp_logout','logout_page');

if (function_exists('acf_add_options_page')) {
	acf_add_options_page();
  acf_set_options_page_menu('Options');
}

// custom functions
require get_template_directory() . '/inc/load-posts.php';

function images() {
  return bloginfo('template_directory').'/dist/img/';
}

function cc_mime_types($mimes) {
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;
}
add_filter('upload_mimes', 'cc_mime_types');