// Function-level comment: يدير بيانات المشاريع محليًا في المتصفح باستخدام localStorage، ويحدّث جدول العرض.
(function(){
  "use strict";

  var STORAGE_KEY = 'mh_projects_v1';

  /**
   * يجلب قائمة المشاريع من localStorage.
   * @returns {Array<{name:string, desc:string, status:string}>}
   */
  function loadProjects(){
    try {
      var data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('تعذّر قراءة البيانات المحلية:', e);
      return [];
    }
  }

  /**
   * يحفظ القائمة في localStorage.
   * @param {Array} list
   */
  function saveProjects(list){
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.warn('تعذّر حفظ البيانات المحلية:', e);
    }
  }

  /**
   * يضيف مشروعًا جديدًا إلى القائمة ويحدّث العرض.
   * @param {{name:string, desc:string, status:string}} item
   */
  function addProject(item){
    var list = loadProjects();
    list.push(item);
    saveProjects(list);
    renderProjects();
  }

  /**
   * يحذف مشروعًا بالفهارس.
   * @param {number} index
   */
  function deleteProject(index){
    var list = loadProjects();
    list.splice(index, 1);
    saveProjects(list);
    renderProjects();
  }

  /**
   * يرسم الجدول من البيانات المحلية.
   */
  function renderProjects(){
    var body = document.getElementById('projectsBody');
    if(!body) return;
    var list = loadProjects();
    body.innerHTML = '';
    list.forEach(function(item, idx){
      var tr = document.createElement('tr');
      tr.innerHTML = '<td>'+escapeHtml(item.name)+'</td>'+
        '<td>'+escapeHtml(item.desc||'')+'</td>'+
        '<td>'+escapeHtml(item.status||'')+'</td>'+
        '<td><button data-del="'+idx+'">حذف</button></td>';
      body.appendChild(tr);
    });
  }

  /**
   * يحوّل نصًا لعرض آمن داخل HTML.
   * @param {string} s
   */
  function escapeHtml(s){
    return String(s).replace(/[&<>"]+/g, function(c){
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c] || c;
    });
  }

  function bindForm(){
    var form = document.getElementById('projectForm');
    if(!form) return;
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var name = document.getElementById('projectName').value.trim();
      var desc = document.getElementById('projectDesc').value.trim();
      var status = document.getElementById('projectStatus').value;
      if(!name) return;
      addProject({name:name, desc:desc, status:status});
      form.reset();
    });

    var body = document.getElementById('projectsBody');
    body.addEventListener('click', function(e){
      var delIdx = e.target && e.target.getAttribute('data-del');
      if(delIdx !== null && delIdx !== undefined){
        deleteProject(parseInt(delIdx, 10));
      }
    });
  }

  function onReady(fn){
    if(document.readyState === 'loading'){ document.addEventListener('DOMContentLoaded', fn); }
    else { fn(); }
  }

  onReady(function(){
    bindForm();
    renderProjects();
  });
})();

