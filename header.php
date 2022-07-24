<!doctype html>
<html <?php language_attributes(); ?> >

  <head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="msapplication-TileColor" content="#333333">
    <meta name="theme-color" content="#ffffff">
    <?php wp_head(); ?>
  </head>

  <body data-barba="wrapper">
    <div id="page" class="site">
      <?php get_template_part('template-parts/header') ?>
      <div id="content" class="site-content">