(() => {
  class DropArea {
    constructor(id = "drop-area", callback) {
      this.el = document.getElementById(id);
      this.callback = callback;
      this.init();
    }

    init() {
      // Prevent default drag behaviors
      ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
        this.el.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
      });

      // Highlight drop area when item is dragged over it
      ["dragenter", "dragover"].forEach((eventName) => {
        this.el.addEventListener(eventName, highlight.bind(this), false);
      });

      ["dragleave", "drop"].forEach((eventName) => {
        this.el.addEventListener(eventName, unhighlight.bind(this), false);
      });

      // Handle dropped files
      this.el.addEventListener("drop", onDrop.bind(this), false);
    }
  }

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function highlight() {
    this.el.classList.add("highlight");
  }

  function unhighlight() {
    this.el.classList.remove("highlight");
  }

  function onDrop(e) {
    let dt = e.dataTransfer;
    let files = dt.files;
    this.callback(files);
  }

  window.DropArea = DropArea;
})();
