!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},t=e.parcelRequire7bc7;null==t&&((t=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var i={id:e,exports:{}};return n[e]=i,t.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,n){o[e]=n},e.parcelRequire7bc7=t);var i=t("h6c0i");function r(e,n){var o=Math.random()>.3;return new Promise((function(t,i){o?setTimeout(t,n,{position:e,delay:n}):setTimeout(i,n,{position:e,delay:n})}))}function u(e,n){i.Notify.failure("❌ Rejected promise ".concat(e," in ").concat(n,"ms"),{timeout:4e3,clickToClose:!0,pauseOnHover:!1,showOnlyTheLastOne:!1})}function a(e,n){i.Notify.success("✅ Fulfilled promise ".concat(e," in ").concat(n,"ms"),{timeout:4e3,clickToClose:!0,pauseOnHover:!1,showOnlyTheLastOne:!1})}({form:document.querySelector(".form")}).form.addEventListener("submit",(function(e){e.preventDefault();for(var n=e.currentTarget.elements,o=n.delay.value,t=n.step.value,i=n.amount.value,l=1;l<=i;l+=1){var c=Number(o)+l*t;r(l,c).then((function(e){return a(e.position,e.delay)})).catch((function(e){return u(e.position,e.delay)}))}}))}();
//# sourceMappingURL=03-promises.acdaae1c.js.map