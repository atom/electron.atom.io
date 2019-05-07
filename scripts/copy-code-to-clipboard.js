const ClipboardJS = require('clipboard')
const clipboard = new ClipboardJS('.btn-clipboard', {
  // strip leading console $ from copied codeblocks
  text: trigger => {
    const codeBlockID = trigger.getAttribute('data-clipboard-target').substr(1)
    let codeBlock = document.getElementById(codeBlockID).textContent

    return codeBlock.replace(/^\$\W*/gm, '')
  }
})

clipboard.on('success', e => e.clearSelection())

module.exports = function copyCodeToClipBoard () {
  document.querySelectorAll(`code.hljs`).forEach(code => {
    const id = `_${Math.random().toString(36).substr(5)}`
    code.id = id
    const button = document.createElement('button')
    button.classList.add('btn-clipboard', 'tooltipped', 'tooltipped-n', 'border', 'float-left')
    button.setAttribute('aria-label', window.localized.clipboard.copy_to_clipboard)
    button.setAttribute('data-clipboard-target', `#${id}`)
    button.innerHTML = window.localized.clipboard.copy
    code.parentElement.appendChild(button)

    // Make prefixed dollars unselectable
    code.innerHTML = code.innerHTML.replace(/\n\$ /g, '\n<span class="no-select">$ </span>')

    if (code.classList.contains('language-sh')) {
      // Make bash comments unselectable
      code.querySelectorAll('.hljs-comment').forEach(comment => {
        comment.classList.add('no-select')
      })

      // Remove comment new-lines from selection
      code.innerHTML = code.innerHTML.replace(/(^|\n)(<span class="hljs-comment no-select"># .+?<\/span>)\n/g, '$1$2<br class="no-select" />')
    }
  })

  document.querySelectorAll('.btn-clipboard').forEach(button => {
    button.addEventListener('mouseout', e => {
      e.target.setAttribute('aria-label', window.localized.clipboard.copy_to_clipboard)
      e.target.blur()
    })
    button.addEventListener('click', e => {
      e.target.setAttribute('aria-label', window.localized.clipboard.copied)
    })
  })
}
