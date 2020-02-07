// @ts-check

const { createMacro } = require("babel-plugin-macros")

module.exports = createMacro(({ references }) => {
  for (const identifier of references.default) {
    const callExpression = identifier.parentPath
    if (!callExpression.isCallExpression()) continue
    const [argument] = callExpression.get("arguments")
    argument.addComment("leading", "#__PURE__")
    callExpression.replaceWith(argument)
  }
})
