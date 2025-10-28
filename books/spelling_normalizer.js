// Function-level comment: يقوم بتطبيع نص عربي بسيط لتقليل أخطاء شائعة (ألف مقصورة/ممدودة، همزات).
(function(exports){
  "use strict";

  /**
   * يطبّع بعض الحروف العربية الشائعة.
   * @param {string} text
   * @returns {string}
   */
  function normalizeArabic(text){
    return String(text)
      .replace(/ى/g, 'ي') // ألف مقصورة إلى ياء
      .replace(/ة\b/g, 'ه') // تاء مربوطة في نهاية الكلمة إلى هاء (اختياري)
      .replace(/[إأآ]/g, 'ا') // توحيد الألف المهموزة
      .replace(/\s+/g, ' ') // دمج المسافات
      .trim();
  }

  exports.normalizeArabic = normalizeArabic;
})(typeof module !== 'undefined' ? module.exports : (this.Spell = {}));

