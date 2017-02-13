const $ = require('jquery');
const ace = require('brace');
require('brace/mode/javascript');
require('brace/mode/xml');

module.exports = (editorConfig) => {
  editorConfig.forEach((v) => {
    $(`#${v.id}`).on('keyup', (e) => {
      e.stopPropagation();
    });
  });
  const editors = editorConfig.map((v) => ace.edit(v.id));
  editors.forEach((editor, i) => {
    // require(`brace/mode/${editorConfig[i].mode}`);
    editor.getSession().setMode(`ace/mode/${editorConfig[i].mode}`);
    editor.renderer.setShowGutter(false);
    editor.setValue(editorConfig[i].text);
    editor.clearSelection();
    editor.setOptions({
      fontSize: '3vh',
    });
    editor.session.setOptions({
      tabSize: 2,
      useSoftTabs: true,
    });
  });
  return editors;
};
