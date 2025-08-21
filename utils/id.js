// chore: simple prefixed ID generator, keeps API shape close to spec
function genId(prefix) {
    // feat: 4-digit random block; tweak length as needed
    const num = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}-${num}`;
  }
  
  module.exports = { genId };
  