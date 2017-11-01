<template lang="pug">
    .linkTemp: svg: line(
        :x1="x1"
        :y1="y1"
        :x2="x2"
        :y2="y2"
        style="stroke:rgb(255,0,0);stroke-width:2"
    )
</template>

<script>
export default {
    name: "link-temp",
    props: ["x1", "x2", "y1", "y2"]
};
</script>

<style scoped>
.linkTemp,
svg {
    width: 100%;
    height: 100%;
    position: absolute;
}
</style>
