---
to: "src/views/<%= h.changeCase.pascal(name) %>.vue"
---
<%
  const fileName = h.changeCase.pascal(name)
  const titleName = h.changeCase.title(name)
%><template>
  <div></div>
</template>

<script>
export default {
  page: {
    title: '<%= fileName %>',
    meta: [{ name: 'description', content: 'The <%= titleName %> page.' }],
  },
  name: '<%= titleName %>',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  methods: {}
}
</script>
<%

if (useStyles) { %>
<style lang="scss" scoped>
</style>
<% } %>