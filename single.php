<?php
get_header();
$next_post = get_previous_post();
$prev_post = get_next_post();
$post_id = get_the_ID();

?>

<div class="main-info news-post generated-post" data-barba="container"  data-barba-namespace="post-<?= $post_id; ?>">
</div>

<?php get_footer(); ?>