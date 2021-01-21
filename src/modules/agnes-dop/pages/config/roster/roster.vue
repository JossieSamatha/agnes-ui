<template>
  <div>
    <gf-grid ref="grid"
             grid-no="agnes-dop-roster-ru-list"
             toolbar="find,refresh,more"
             @row-double-click="showRoster"
    >
      <template slot="left">
        <gf-button class="action-btn" @click="addRoster" size="mini">
          添加
        </gf-button>
      </template>
    </gf-grid>
  </div>
</template>

<script>

</script>
