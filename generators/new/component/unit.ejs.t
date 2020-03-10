---
to: "src/components/<%= h.changeCase.pascal(name) %>.unit.js"
---
<%
  const fileName = h.changeCase.pascal(name)
  const importName = h.changeCase.camel(fileName)

%>import <%= importName %> from './<%= fileName %>'

describe('@components/<%= importName %>', () => {
  it('exports a valid component', () => {
    expect(<%= importName %>).toBeAComponent()
  })
})
