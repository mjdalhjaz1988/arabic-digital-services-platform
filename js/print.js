// إضافة زر الطباعة ووظيفة تنفيذ الطباعة
// Function-level comment: يقوم هذا الملف بتهيئة زر الطباعة ويربطه بوظيفة طباعة المستند باستخدام window.print، مع التحقق من توفر العنصر.
(function () {
  "use strict";

  /**
   * يربط زر يحمل المعرف "printBtn" بحدث الطباعة.
   * إذا لم يكن الزر موجودًا، يتجاهل العملية دون أخطاء.
   */
  function initPrintButton() {
    var btn = document.getElementById("printBtn");
    if (!btn) return;
    btn.addEventListener("click", function () {
      window.print();
    });
  }

  // تهيئة الطباعة عند تحميل الصفحة
  /**
   * يضمن تنفيذ التهيئة بعد تحميل DOM بالكامل.
   */
  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  onReady(initPrintButton);
})();

