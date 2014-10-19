<?php require('header.php') ?>
<script>
jQuery(document).ready(function ($) {
  $('#simplemap-1').simplegmaps({
    MapOptions: {
      center: '-34.397, 150.644'
    }
  });
});
</script>

    <div class="row">
      <div class="col-md-8 col-xs-12 col-sm-12 col-md-push-2">
        <div id="simplemap-1" class="google-map"></div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-8 col-xs-12 col-sm-12 col-md-push-2">
        <h3 class="code">javascript</h3>
        <pre class="language-javascript">
        <code class="language-javascript">
  jQuery(document).ready(function ($) {
    $('#simplemap').simplegmaps({
      MapOptions: {
        center: '-34.397, 150.644'
      }
    });
  });
        </code>
      </pre>

      <h3 class="code">html</h3>
      <pre>
        <code class="language-markup">
          <div id="simplemap" class="google-map"></div>
        </code>
      </pre>

      </div>
    </div>
    </div>
<?php require('footer.php') ?>
