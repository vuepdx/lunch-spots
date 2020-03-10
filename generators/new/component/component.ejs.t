---
to: "src/components/<%= h.changeCase.pascal(name) %>.vue"
---
<%
if (blocks.indexOf('template') !== -1) {
%><template>
  <div/>
</template>
<% }

if (blocks.indexOf('script') !== -1) {
%>
<script>
export default {
  <% if (blocks.indexOf('template') === -1) {
  %>render(h) {
    return <div/>
  }<% } else {
  %>name: '<%= h.changeCase.pascal(name) %>',
  props: {},
  data () {
    return {}
  },
  computed: {},
  methods: {}<% } %>
}
</script>
<% }

if (blocks.indexOf('style') !== -1) {
%>
<style lang="scss" module>
</style>
<% } %>