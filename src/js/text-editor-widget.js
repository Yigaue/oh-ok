class OhOkTextEditor {
  constructor(config) {
    this.container = config.element || document.body;
    this.initEditor();
  }

  initEditor() {
    this.container.innerHTML = `
      <div class="text-editor-widget">
        <div class="oh-ok-toolbar">
          <button data-command="bold" title="Bold"><strong>B</strong></button>
          <button data-command="italic" title="Italic"><em>I</em></button>
          <button data-command="underline" title="Underline"><u>U</u></button>
          <button data-command="strikeThrough" title="Strikethrough"><s>S</s></button>
          <select class="font-size">
            <option value="">Size</option>
            <option value="1">Small</option>
            <option value="3">Normal</option>
            <option value="5">Large</option>
            <option value="7">Huge</option>
          </select>
          <button data-command="insertUnorderedList" title="Bulleted List">•</button>
          <button data-command="insertOrderedList" title="Numbered List">1.</button>
          <select class="font-family" title="Font Family">
            <option value="">Font</option>
            <option value="Arial">Arial</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Verdana">Verdana</option>
            <option value="Comic Sans MS">Comic Sans MS</option>
            <option value="Impact">Impact</option>
            <option value="Monospace">Monospace</option>
            <option value="Roboto">Roboto</option>
            <option value="Open Sans">Open Sans</option>
            <option value="Lato">Lato</option>
          </select>
          <input type="color" class="color-picker" title="Text Color">
          <input type="color" class="highlight-color" title="Highlight Color" value="#FFFF00">
          <button data-command="highlight" title="Highlight Text">🖍️</button>
          <button data-command="removeHighlight" title="Remove Highlight">❌</button>
          <button data-command="justifyLeft" title="Align Left">⬅</button>
          <button data-command="justifyCenter" title="Center">↔</button>
          <button data-command="justifyRight" title="Align Right">➡</button>
          <button data-command="undo" title="Undo">↺</button>
          <button data-command="redo" title="Redo">↻</button>
          <button data-command="createLink" title="Insert Link">🔗</button>
          <button data-command="unlink" title="Remove Link">❌</button>
          <button class="image-upload" title="Insert Image">
            <input type="file" class="image-input" accept="image/*" hidden>
            📷
          </button>
        </div>
        <div class="editor-content" contenteditable="true"></div>
        <div class="count-display">Words: 0 | Characters: 0</div>
      </div>
    `;
  }
}

export default OhOkTextEditor;