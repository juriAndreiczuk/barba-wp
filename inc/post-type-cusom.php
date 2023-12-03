<?php
class Post_type_custom { 
  public function __construct($props) {
    $this->props = $props;

    add_action('init', array($this, 'cpt_init'));
  }

  public function cpt_init() {  
    $args = [
      'label' => $this->props['label'],
      'public' => true,
      'has_archive' => true,
      'show_ui' => true,
      'capability_type' => 'post',
      'hierarchical' => false,
      'rewrite' => ['with_front' => false, 'slug' => $this->props['slug']],
      'query_var' => true,
      'menu_icon' => 'dashicons-format-gallery',
      'supports' => ['title', 'editor', 'revisions', 'thumbnail', 'page-attributes', 'author', 'excerpt' ],
      'show_in_rest' => true,
      'rest_base' => $this->props['slug'],
      'taxonomies' => ['category']
    ];
    register_post_type($this->props['slug'], $args);
  }
}