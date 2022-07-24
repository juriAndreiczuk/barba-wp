<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package fv
 */

get_header();
?>
<section class="error" data-barba="container"  data-barba-namespace="error">
  <div class="container">
    <div class="error__wrap row align-items-center">
      <div class="error__info col-12 d-flex align-items-center justify-content-center flex-column">
        <h1 class="error__info-title">404</h1>
        <p class="error__info-text"> Ta strona nie istnieje </p>
        <a class="error__info-link" href="<?= get_home_url() ?>">Przejdź do strony głownej</a>
      </div>
    </div>
  </div>
</section>
<?php
get_footer();
