/**
 * Globally register all base components for convenience,
 * because they will be used very frequently.
 * https://webpack.js.org/guides/dependency-management/#require-context
 */
import Vue from 'vue'
import lowerFirst from 'lodash/lowerFirst'
import kebabCase from 'lodash/kebabCase'

/**
 * 1. Look for files in the current directory
 * 2. Do not look in subdirectories
 * 3. Only include .vue files
 */
const requireComponent = require.context('.', false, /\.vue$/)
/**
 * For each matching file name...
 * 1. Get the component config
 * 2. Get the kebab-case version of the component name
 * 3. Remove the file extension from the end
 * 4. Globally register the component
 */
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = lowerFirst(kebabCase(fileName.replace(/^\.\/_/, '').replace(/\.\w+$/, '')))
  Vue.component(componentName, componentConfig.default || componentConfig)
})
