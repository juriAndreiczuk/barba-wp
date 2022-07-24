<?php 

function load_posts () {
  $args = unserialize( stripslashes( $_POST['query'] ) );
  $args['paged'] = $_POST['page'] + 1;

  query_posts( $args );
  if ( have_posts() ) {
    while ( have_posts() ) { the_post();?>
      <!--  post html  --> 
  <?php }
    die();
  }
}
add_action('wp_ajax_load_posts', 'load_posts');
add_action('wp_ajax_nopriv_load_posts', 'load_posts');