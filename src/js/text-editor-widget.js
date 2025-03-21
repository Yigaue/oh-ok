class OhOkTextEditor {
  constructor(config) {
    this.container = config.element || document.body;
    this.editor = null;
    this.initEditor();
  }

  initEditor() {
    this.container.innerHTML = `
      <div class="oh-ok-text-editor-widget">
        <div class="oh-ok-toolbar sticky">
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
          <button data-command="removeHighlight" title="Remove formatting">❌</button>
          <button data-command="justifyLeft" title="Align Left">⬅</button>
          <button data-command="justifyCenter" title="Center">↔</button>
          <button data-command="justifyFull" title="Justify Text">≡</button>
          <button data-command="justifyRight" title="Align Right">➡</button>
          <button data-command="undo" title="Undo">↺</button>
          <button data-command="redo" title="Redo">↻</button>
          <button data-command="createLink" title="Insert Link">🔗</button>
          <button data-command="unlink" title="Remove Link">❌</button>
          <button data-command="print" title="Print all or print a selection">🖨️</button>
          <button data-command="insertCode" title="Insert Code">{<?>}</button>
        </div>
        <div class="oh-ok-editor-content" contenteditable="true"></div>
        <div class="oh-ok-count-display">Words: 0 | Characters: 0</div>
      </div>
    `;

    this.editor = this.container.querySelector('.oh-ok-editor-content');

    this.toolbarHandlers();
    this.countDisplay();
    this.autoSave();
    this.pasteHandler();
  }

  // Public methods
  getContent() {
    return this.editor.innerHTML;
  }

  setContent(content) {
    this.editor.innerHTML = content;
  }

  toolbarHandlers() {
    const strikethroughButton = this.container.querySelector('[data-command="strikeThrough"]');
    const highlightColorInput = this.container.querySelector('.highlight-color');

    // Update button state
    this.editor.addEventListener('input', () => {
      const isStrikethrough = document.queryCommandState('strikeThrough');
      strikethroughButton.classList.toggle('active', isStrikethrough);
    });

    // Button commands
    this.container.querySelectorAll('[data-command]').forEach(button => {
      button.addEventListener('click', () => {
        if (button.dataset.command === 'highlight') {
          this.handleHighlight(highlightColorInput.value);
        } else if (button.dataset.command === 'removeHighlight') {
          this.removeAllFormating();
        } else if (button.dataset.command === 'createLink') {
          this.handleLinkInsertion();
        } else if (button.dataset.command === 'print') {
          this.handlePrint();
        } else if (button.dataset.command === 'insertCode') {
          this.handleInsertCode();
        } else {
          document.execCommand(button.dataset.command, false);
        }
        this.editor.focus();
      });
    });

    this.container.querySelector('.font-size').addEventListener('change', (e) => {
      document.execCommand('fontSize', false, e.target.value);
      this.editor.focus();
    });

    this.container.querySelector('.color-picker').addEventListener('input', (e) => {
      document.execCommand('foreColor', false, e.target.value);
      this.editor.focus();
    });

    this.container.querySelector('.font-family').addEventListener('change', (e) => {
      document.execCommand('fontName', false, e.target.value);
      this.editor.focus();
    });
  }

  handleHighlight(color) {
    if (color) {
      document.execCommand('styleWithCSS', false, true);
      document.execCommand('backColor', false, color);
    }
  }

  removeAllFormating() {
    document.execCommand('removeFormat', false);
  }

  handleLinkInsertion() {
    let url = prompt('Enter the URL:');
    if (url) {
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `https://${url}`;
      }
      document.execCommand('createLink', false, url);
    }
  }

  countDisplay() {
    const countDisplay = this.container.querySelector('.oh-ok-count-display');

    const updateCount = () => {
      const text = this.editor.innerText.trim();
      const words = text.split(/\s+/).filter(word => word.length > 0);
      const characters = text.length;
      countDisplay.textContent = `Words: ${words.length} | Characters: ${characters}`;
    };

    this.editor.addEventListener('input', updateCount);
    updateCount();
  }

  autoSave() {
    this.editor.addEventListener('input', () => {
      localStorage.setItem('editorContent', this.editor.innerHTML);
    });

    const savedContent = localStorage.getItem('editorContent');
    if (savedContent) {
      this.editor.innerHTML = savedContent;
    }
  }

  handlePrint() {
    const selection = window.getSelection();
    const content = selection.toString() || this.editor.innerHTML;
    const printWindow = window.open('', '', 'width=900,height=700');
    if (!printWindow) {
      alert('Please allow pop-ups for this site to print.');
      return;
    }
    printWindow.document.write(`
      <html>
          <head>
              <title></title>
              <style>
                  @page {
                    size: auto;
                    margin: 40;
                  }
                  body { font-family: Arial, sans-serif; }
                  img { max-width: 100%; height: auto; }
                  .oh-ok-editor-content { padding: 20px; }
              </style>
          </head>
          <body>
              <div class="editor-content">${content}</div>
              <script>
                  window.onload = () => {
                      window.print(); // Open print dialog
                      window.onafterprint = () => {
                          window.close(); // Close the print window after printing
                      };
                  };
              </script>
          </body>
      </html>
    `);
    printWindow.document.close();
  }

  handleInsertCode() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const parentElement = range.commonAncestorContainer;
      const isInsideCodeBlock = this.isInsideCodeBlock(parentElement);

      if (!range.collapsed && !isInsideCodeBlock) {
        const codeElement = document.createElement('code');
        codeElement.textContent = range.toString();
        const preElement = document.createElement('pre');
        preElement.appendChild(codeElement);
        range.deleteContents();
        range.insertNode(preElement);
      } 
      
      if(range.collapsed && !isInsideCodeBlock) {
        const codeElement = document.createElement('code');
        const code = '/';
        const preElement = document.createElement('pre');
        codeElement.textContent = code;
        preElement.appendChild(codeElement);

        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          range.insertNode(preElement); //Insert the pre element
          range.collapse(false);
        }
      }
      range.collapse(false); 
    }

    this.editor.focus();
  }

  pasteHandler() {
    this.editor.addEventListener('paste', (e) => {
      e.preventDefault();

      const text = (e.clipboardData || window.clipboardData).getData('text');

      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const parentElement = range.commonAncestorContainer;

        const isInsideCodeBlock = this.isInsideCodeBlock(parentElement);

        if (isInsideCodeBlock) {
          const codeElement = document.createElement('code');
          codeElement.textContent = text;
          range.deleteContents();
          range.insertNode(codeElement);
          range.collapse(false);
        } else {
          const textNode = document.createTextNode(text);
          range.deleteContents();
          range.insertNode(textNode);
          range.collapse(false);
        }
      }

      this.editor.focus();
    });
  }

  isInsideCodeBlock(element) {
    while (element && element !== this.editor) {
      if (element.tagName === 'CODE' || element.tagName === 'PRE') {
        return true;
      }
      element = element.parentElement;
    }
    return false;
  }
}

export default OhOkTextEditor;