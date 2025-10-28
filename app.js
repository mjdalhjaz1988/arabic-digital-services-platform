// Function-level comment: يهيّئ تطبيق الويب التدريجي (PWA) ويعالج تلميح التثبيت إن توفر.
(function(){
  "use strict";

  /**
   * يسجل Service Worker إن كان المتصفح يدعم ذلك.
   */
  // Function-level comment: يسجّل Service Worker من المسار النسبي ليتوافق مع GitHub Pages ومسارات الفرع.
  function registerSW() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').catch(function(err){
        console.warn('فشل تسجيل Service Worker:', err);
      });
    }
  }

  /**
   * يعالج حدث beforeinstallprompt لإتاحة تثبيت التطبيق.
   */
  function handleInstallPrompt() {
    window.addEventListener('beforeinstallprompt', function(e){
      e.preventDefault();
      var deferredPrompt = e;
      // يمكن لاحقًا ربطه بزر "تثبيت".
      deferredPrompt.prompt();
    });
  }

  function onReady(fn){
    if(document.readyState === 'loading'){ document.addEventListener('DOMContentLoaded', fn); }
    else { fn(); }
  }

  onReady(function(){
    registerSW();
    handleInstallPrompt();
  });
})();
