function t(t){return t&&t.__esModule?t.default:t}var e,n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i=/^\s+|\s+$/g,o=/^[-+]0x[0-9a-f]+$/i,r=/^0b[01]+$/i,u=/^0o[0-7]+$/i,f=parseInt,c="object"==typeof n&&n&&n.Object===Object&&n,a="object"==typeof self&&self&&self.Object===Object&&self,l=c||a||Function("return this")(),d=Object.prototype.toString,s=Math.max,p=Math.min,v=function(){return l.Date.now()};function b(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function y(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&"[object Symbol]"==d.call(t)}(t))return NaN;if(b(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=b(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(i,"");var n=r.test(t);return n||u.test(t)?f(t.slice(2),n?2:8):o.test(t)?NaN:+t}e=function(t,e,n){var i,o,r,u,f,c,a=0,l=!1,d=!1,m=!0;if("function"!=typeof t)throw new TypeError("Expected a function");function g(e){var n=i,r=o;return i=o=void 0,a=e,u=t.apply(r,n)}function j(t){return a=t,f=setTimeout(T,e),l?g(t):u}function h(t){var n=t-c;return void 0===c||n>=e||n<0||d&&t-a>=r}function T(){var t=v();if(h(t))return w(t);f=setTimeout(T,function(t){var n=e-(t-c);return d?p(n,r-(t-a)):n}(t))}function w(t){return f=void 0,m&&i?g(t):(i=o=void 0,u)}function O(){var t=v(),n=h(t);if(i=arguments,o=this,c=t,n){if(void 0===f)return j(c);if(d)return f=setTimeout(T,e),g(c)}return void 0===f&&(f=setTimeout(T,e)),u}return e=y(e)||0,b(n)&&(l=!!n.leading,r=(d="maxWait"in n)?s(y(n.maxWait)||0,e):r,m="trailing"in n?!!n.trailing:m),O.cancel=function(){void 0!==f&&clearTimeout(f),a=0,i=c=o=f=void 0},O.flush=function(){return void 0===f?u:w(v())},O};const m={inputField:document.querySelector("#search-box")};m.inputField.addEventListener("input",t(e)((()=>{console.log(m.inputField.value.trim())}),300));
//# sourceMappingURL=index.8fd4798b.js.map
