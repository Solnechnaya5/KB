/*!
 * jQuery JavaScript Library v2.2.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:23Z
 */
(function (global, factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = global.document
      ? factory(global, true)
      : function (w) {
          if (!w.document) {
            throw new Error("jQuery requires a window with a document");
          }
          return factory(w);
        };
  } else {
    factory(global);
  }
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
  var arr = [];
  var document = window.document;
  var slice = arr.slice;
  var concat = arr.concat;
  var push = arr.push;
  var indexOf = arr.indexOf;
  var class2type = {};
  var toString = class2type.toString;
  var hasOwn = class2type.hasOwnProperty;
  var support = {};
  var version = "2.2.4",
    jQuery = function (selector, context) {
      return new jQuery.fn.init(selector, context);
    },
    rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    rmsPrefix = /^-ms-/,
    rdashAlpha = /-([\da-z])/gi,
    fcamelCase = function (all, letter) {
      return letter.toUpperCase();
    };
  jQuery.fn = jQuery.prototype = {
    jquery: version,
    constructor: jQuery,
    selector: "",
    length: 0,
    toArray: function () {
      return slice.call(this);
    },
    get: function (num) {
      return num != null
        ? num < 0
          ? this[num + this.length]
          : this[num]
        : slice.call(this);
    },
    pushStack: function (elems) {
      var ret = jQuery.merge(this.constructor(), elems);
      ret.prevObject = this;
      ret.context = this.context;
      return ret;
    },
    each: function (callback) {
      return jQuery.each(this, callback);
    },
    map: function (callback) {
      return this.pushStack(
        jQuery.map(this, function (elem, i) {
          return callback.call(elem, i, elem);
        })
      );
    },
    slice: function () {
      return this.pushStack(slice.apply(this, arguments));
    },
    first: function () {
      return this.eq(0);
    },
    last: function () {
      return this.eq(-1);
    },
    eq: function (i) {
      var len = this.length,
        j = +i + (i < 0 ? len : 0);
      return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
    },
    end: function () {
      return this.prevObject || this.constructor();
    },
    push: push,
    sort: arr.sort,
    splice: arr.splice,
  };
  jQuery.extend = jQuery.fn.extend = function () {
    var options,
      name,
      src,
      copy,
      copyIsArray,
      clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false;
    if (typeof target === "boolean") {
      deep = target;
      target = arguments[i] || {};
      i++;
    }
    if (typeof target !== "object" && !jQuery.isFunction(target)) {
      target = {};
    }
    if (i === length) {
      target = this;
      i--;
    }
    for (; i < length; i++) {
      if ((options = arguments[i]) != null) {
        for (name in options) {
          src = target[name];
          copy = options[name];
          if (target === copy) {
            continue;
          }
          if (
            deep &&
            copy &&
            (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))
          ) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && jQuery.isArray(src) ? src : [];
            } else {
              clone = src && jQuery.isPlainObject(src) ? src : {};
            }
            target[name] = jQuery.extend(deep, clone, copy);
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }
    return target;
  };
  jQuery.extend({
    expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
    isReady: true,
    error: function (msg) {
      throw new Error(msg);
    },
    noop: function () {},
    isFunction: function (obj) {
      return jQuery.type(obj) === "function";
    },
    isArray: Array.isArray,
    isWindow: function (obj) {
      return obj != null && obj === obj.window;
    },
    isNumeric: function (obj) {
      var realStringObj = obj && obj.toString();
      return (
        !jQuery.isArray(obj) &&
        realStringObj - parseFloat(realStringObj) + 1 >= 0
      );
    },
    isPlainObject: function (obj) {
      var key;
      if (
        jQuery.type(obj) !== "object" ||
        obj.nodeType ||
        jQuery.isWindow(obj)
      ) {
        return false;
      }
      if (
        obj.constructor &&
        !hasOwn.call(obj, "constructor") &&
        !hasOwn.call(obj.constructor.prototype || {}, "isPrototypeOf")
      ) {
        return false;
      }
      for (key in obj) {
      }
      return key === undefined || hasOwn.call(obj, key);
    },
    isEmptyObject: function (obj) {
      var name;
      for (name in obj) {
        return false;
      }
      return true;
    },
    type: function (obj) {
      if (obj == null) {
        return obj + "";
      }
      return typeof obj === "object" || typeof obj === "function"
        ? class2type[toString.call(obj)] || "object"
        : typeof obj;
    },
    globalEval: function (code) {
      var script,
        indirect = eval;
      code = jQuery.trim(code);
      if (code) {
        if (code.indexOf("use strict") === 1) {
          script = document.createElement("script");
          script.text = code;
          document.head.appendChild(script).parentNode.removeChild(script);
        } else {
          indirect(code);
        }
      }
    },
    camelCase: function (string) {
      return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
    },
    nodeName: function (elem, name) {
      return (
        elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase()
      );
    },
    each: function (obj, callback) {
      var length,
        i = 0;
      if (isArrayLike(obj)) {
        length = obj.length;
        for (; i < length; i++) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break;
          }
        }
      } else {
        for (i in obj) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break;
          }
        }
      }
      return obj;
    },
    trim: function (text) {
      return text == null ? "" : (text + "").replace(rtrim, "");
    },
    makeArray: function (arr, results) {
      var ret = results || [];
      if (arr != null) {
        if (isArrayLike(Object(arr))) {
          jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
        } else {
          push.call(ret, arr);
        }
      }
      return ret;
    },
    inArray: function (elem, arr, i) {
      return arr == null ? -1 : indexOf.call(arr, elem, i);
    },
    merge: function (first, second) {
      var len = +second.length,
        j = 0,
        i = first.length;
      for (; j < len; j++) {
        first[i++] = second[j];
      }
      first.length = i;
      return first;
    },
    grep: function (elems, callback, invert) {
      var callbackInverse,
        matches = [],
        i = 0,
        length = elems.length,
        callbackExpect = !invert;
      for (; i < length; i++) {
        callbackInverse = !callback(elems[i], i);
        if (callbackInverse !== callbackExpect) {
          matches.push(elems[i]);
        }
      }
      return matches;
    },
    map: function (elems, callback, arg) {
      var length,
        value,
        i = 0,
        ret = [];
      if (isArrayLike(elems)) {
        length = elems.length;
        for (; i < length; i++) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret.push(value);
          }
        }
      } else {
        for (i in elems) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret.push(value);
          }
        }
      }
      return concat.apply([], ret);
    },
    guid: 1,
    proxy: function (fn, context) {
      var tmp, args, proxy;
      if (typeof context === "string") {
        tmp = fn[context];
        context = fn;
        fn = tmp;
      }
      if (!jQuery.isFunction(fn)) {
        return undefined;
      }
      args = slice.call(arguments, 2);
      proxy = function () {
        return fn.apply(context || this, args.concat(slice.call(arguments)));
      };
      proxy.guid = fn.guid = fn.guid || jQuery.guid++;
      return proxy;
    },
    now: Date.now,
    support: support,
  });
  if (typeof Symbol === "function") {
    jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
  }
  jQuery.each(
    "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
      " "
    ),
    function (i, name) {
      class2type["[object " + name + "]"] = name.toLowerCase();
    }
  );
  function isArrayLike(obj) {
    var length = !!obj && "length" in obj && obj.length,
      type = jQuery.type(obj);
    if (type === "function" || jQuery.isWindow(obj)) {
      return false;
    }
    return (
      type === "array" ||
      length === 0 ||
      (typeof length === "number" && length > 0 && length - 1 in obj)
    );
  }
  var Sizzle =
    /*!
     * Sizzle CSS Selector Engine v2.2.1
     * http://sizzlejs.com/
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license
     * http://jquery.org/license
     *
     * Date: 2015-10-17
     */
    (function (window) {
      var i,
        support,
        Expr,
        getText,
        isXML,
        tokenize,
        compile,
        select,
        outermostContext,
        sortInput,
        hasDuplicate,
        setDocument,
        document,
        docElem,
        documentIsHTML,
        rbuggyQSA,
        rbuggyMatches,
        matches,
        contains,
        expando = "sizzle" + 1 * new Date(),
        preferredDoc = window.document,
        dirruns = 0,
        done = 0,
        classCache = createCache(),
        tokenCache = createCache(),
        compilerCache = createCache(),
        sortOrder = function (a, b) {
          if (a === b) {
            hasDuplicate = true;
          }
          return 0;
        },
        MAX_NEGATIVE = 1 << 31,
        hasOwn = {}.hasOwnProperty,
        arr = [],
        pop = arr.pop,
        push_native = arr.push,
        push = arr.push,
        slice = arr.slice,
        indexOf = function (list, elem) {
          var i = 0,
            len = list.length;
          for (; i < len; i++) {
            if (list[i] === elem) {
              return i;
            }
          }
          return -1;
        },
        booleans =
          "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        whitespace = "[\\x20\\t\\r\\n\\f]",
        identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
        attributes =
          "\\[" +
          whitespace +
          "*(" +
          identifier +
          ")(?:" +
          whitespace +
          "*([*^$|!~]?=)" +
          whitespace +
          "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
          identifier +
          "))|)" +
          whitespace +
          "*\\]",
        pseudos =
          ":(" +
          identifier +
          ")(?:\\((" +
          "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
          "((?:\\\\.|[^\\\\()[\\]]|" +
          attributes +
          ")*)|" +
          ".*" +
          ")\\)|)",
        rwhitespace = new RegExp(whitespace + "+", "g"),
        rtrim = new RegExp(
          "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$",
          "g"
        ),
        rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
        rcombinators = new RegExp(
          "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"
        ),
        rattributeQuotes = new RegExp(
          "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]",
          "g"
        ),
        rpseudo = new RegExp(pseudos),
        ridentifier = new RegExp("^" + identifier + "$"),
        matchExpr = {
          ID: new RegExp("^#(" + identifier + ")"),
          CLASS: new RegExp("^\\.(" + identifier + ")"),
          TAG: new RegExp("^(" + identifier + "|[*])"),
          ATTR: new RegExp("^" + attributes),
          PSEUDO: new RegExp("^" + pseudos),
          CHILD: new RegExp(
            "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
              whitespace +
              "*(even|odd|(([+-]|)(\\d*)n|)" +
              whitespace +
              "*(?:([+-]|)" +
              whitespace +
              "*(\\d+)|))" +
              whitespace +
              "*\\)|)",
            "i"
          ),
          bool: new RegExp("^(?:" + booleans + ")$", "i"),
          needsContext: new RegExp(
            "^" +
              whitespace +
              "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
              whitespace +
              "*((?:-\\d)?\\d*)" +
              whitespace +
              "*\\)|)(?=[^-]|$)",
            "i"
          ),
        },
        rinputs = /^(?:input|select|textarea|button)$/i,
        rheader = /^h\d$/i,
        rnative = /^[^{]+\{\s*\[native \w/,
        rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        rsibling = /[+~]/,
        rescape = /'|\\/g,
        runescape = new RegExp(
          "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)",
          "ig"
        ),
        funescape = function (_, escaped, escapedWhitespace) {
          var high = "0x" + escaped - 0x10000;
          return high !== high || escapedWhitespace
            ? escaped
            : high < 0
            ? String.fromCharCode(high + 0x10000)
            : String.fromCharCode(
                (high >> 10) | 0xd800,
                (high & 0x3ff) | 0xdc00
              );
        },
        unloadHandler = function () {
          setDocument();
        };
      try {
        push.apply(
          (arr = slice.call(preferredDoc.childNodes)),
          preferredDoc.childNodes
        );
        arr[preferredDoc.childNodes.length].nodeType;
      } catch (e) {
        push = {
          apply: arr.length
            ? function (target, els) {
                push_native.apply(target, slice.call(els));
              }
            : function (target, els) {
                var j = target.length,
                  i = 0;
                while ((target[j++] = els[i++])) {}
                target.length = j - 1;
              },
        };
      }
      function Sizzle(selector, context, results, seed) {
        var m,
          i,
          elem,
          nid,
          nidselect,
          match,
          groups,
          newSelector,
          newContext = context && context.ownerDocument,
          nodeType = context ? context.nodeType : 9;
        results = results || [];
        if (
          typeof selector !== "string" ||
          !selector ||
          (nodeType !== 1 && nodeType !== 9 && nodeType !== 11)
        ) {
          return results;
        }
        if (!seed) {
          if (
            (context ? context.ownerDocument || context : preferredDoc) !==
            document
          ) {
            setDocument(context);
          }
          context = context || document;
          if (documentIsHTML) {
            if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
              if ((m = match[1])) {
                if (nodeType === 9) {
                  if ((elem = context.getElementById(m))) {
                    if (elem.id === m) {
                      results.push(elem);
                      return results;
                    }
                  } else {
                    return results;
                  }
                } else {
                  if (
                    newContext &&
                    (elem = newContext.getElementById(m)) &&
                    contains(context, elem) &&
                    elem.id === m
                  ) {
                    results.push(elem);
                    return results;
                  }
                }
              } else if (match[2]) {
                push.apply(results, context.getElementsByTagName(selector));
                return results;
              } else if (
                (m = match[3]) &&
                support.getElementsByClassName &&
                context.getElementsByClassName
              ) {
                push.apply(results, context.getElementsByClassName(m));
                return results;
              }
            }
            if (
              support.qsa &&
              !compilerCache[selector + " "] &&
              (!rbuggyQSA || !rbuggyQSA.test(selector))
            ) {
              if (nodeType !== 1) {
                newContext = context;
                newSelector = selector;
              } else if (context.nodeName.toLowerCase() !== "object") {
                if ((nid = context.getAttribute("id"))) {
                  nid = nid.replace(rescape, "\\$&");
                } else {
                  context.setAttribute("id", (nid = expando));
                }
                groups = tokenize(selector);
                i = groups.length;
                nidselect = ridentifier.test(nid)
                  ? "#" + nid
                  : "[id='" + nid + "']";
                while (i--) {
                  groups[i] = nidselect + " " + toSelector(groups[i]);
                }
                newSelector = groups.join(",");
                newContext =
                  (rsibling.test(selector) &&
                    testContext(context.parentNode)) ||
                  context;
              }
              if (newSelector) {
                try {
                  push.apply(results, newContext.querySelectorAll(newSelector));
                  return results;
                } catch (qsaError) {
                } finally {
                  if (nid === expando) {
                    context.removeAttribute("id");
                  }
                }
              }
            }
          }
        }
        return select(selector.replace(rtrim, "$1"), context, results, seed);
      }
      function createCache() {
        var keys = [];
        function cache(key, value) {
          if (keys.push(key + " ") > Expr.cacheLength) {
            delete cache[keys.shift()];
          }
          return (cache[key + " "] = value);
        }
        return cache;
      }
      function markFunction(fn) {
        fn[expando] = true;
        return fn;
      }
      function assert(fn) {
        var div = document.createElement("div");
        try {
          return !!fn(div);
        } catch (e) {
          return false;
        } finally {
          if (div.parentNode) {
            div.parentNode.removeChild(div);
          }
          div = null;
        }
      }
      function addHandle(attrs, handler) {
        var arr = attrs.split("|"),
          i = arr.length;
        while (i--) {
          Expr.attrHandle[arr[i]] = handler;
        }
      }
      function siblingCheck(a, b) {
        var cur = b && a,
          diff =
            cur &&
            a.nodeType === 1 &&
            b.nodeType === 1 &&
            (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
        if (diff) {
          return diff;
        }
        if (cur) {
          while ((cur = cur.nextSibling)) {
            if (cur === b) {
              return -1;
            }
          }
        }
        return a ? 1 : -1;
      }
      function createInputPseudo(type) {
        return function (elem) {
          var name = elem.nodeName.toLowerCase();
          return name === "input" && elem.type === type;
        };
      }
      function createButtonPseudo(type) {
        return function (elem) {
          var name = elem.nodeName.toLowerCase();
          return (name === "input" || name === "button") && elem.type === type;
        };
      }
      function createPositionalPseudo(fn) {
        return markFunction(function (argument) {
          argument = +argument;
          return markFunction(function (seed, matches) {
            var j,
              matchIndexes = fn([], seed.length, argument),
              i = matchIndexes.length;
            while (i--) {
              if (seed[(j = matchIndexes[i])]) {
                seed[j] = !(matches[j] = seed[j]);
              }
            }
          });
        });
      }
      function testContext(context) {
        return (
          context &&
          typeof context.getElementsByTagName !== "undefined" &&
          context
        );
      }
      support = Sizzle.support = {};
      isXML = Sizzle.isXML = function (elem) {
        var documentElement =
          elem && (elem.ownerDocument || elem).documentElement;
        return documentElement ? documentElement.nodeName !== "HTML" : false;
      };
      setDocument = Sizzle.setDocument = function (node) {
        var hasCompare,
          parent,
          doc = node ? node.ownerDocument || node : preferredDoc;
        if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
          return document;
        }
        document = doc;
        docElem = document.documentElement;
        documentIsHTML = !isXML(document);
        if ((parent = document.defaultView) && parent.top !== parent) {
          if (parent.addEventListener) {
            parent.addEventListener("unload", unloadHandler, false);
          } else if (parent.attachEvent) {
            parent.attachEvent("onunload", unloadHandler);
          }
        }
        support.attributes = assert(function (div) {
          div.className = "i";
          return !div.getAttribute("className");
        });
        support.getElementsByTagName = assert(function (div) {
          div.appendChild(document.createComment(""));
          return !div.getElementsByTagName("*").length;
        });
        support.getElementsByClassName = rnative.test(
          document.getElementsByClassName
        );
        support.getById = assert(function (div) {
          docElem.appendChild(div).id = expando;
          return (
            !document.getElementsByName ||
            !document.getElementsByName(expando).length
          );
        });
        if (support.getById) {
          Expr.find["ID"] = function (id, context) {
            if (
              typeof context.getElementById !== "undefined" &&
              documentIsHTML
            ) {
              var m = context.getElementById(id);
              return m ? [m] : [];
            }
          };
          Expr.filter["ID"] = function (id) {
            var attrId = id.replace(runescape, funescape);
            return function (elem) {
              return elem.getAttribute("id") === attrId;
            };
          };
        } else {
          delete Expr.find["ID"];
          Expr.filter["ID"] = function (id) {
            var attrId = id.replace(runescape, funescape);
            return function (elem) {
              var node =
                typeof elem.getAttributeNode !== "undefined" &&
                elem.getAttributeNode("id");
              return node && node.value === attrId;
            };
          };
        }
        Expr.find["TAG"] = support.getElementsByTagName
          ? function (tag, context) {
              if (typeof context.getElementsByTagName !== "undefined") {
                return context.getElementsByTagName(tag);
              } else if (support.qsa) {
                return context.querySelectorAll(tag);
              }
            }
          : function (tag, context) {
              var elem,
                tmp = [],
                i = 0,
                results = context.getElementsByTagName(tag);
              if (tag === "*") {
                while ((elem = results[i++])) {
                  if (elem.nodeType === 1) {
                    tmp.push(elem);
                  }
                }
                return tmp;
              }
              return results;
            };
        Expr.find["CLASS"] =
          support.getElementsByClassName &&
          function (className, context) {
            if (
              typeof context.getElementsByClassName !== "undefined" &&
              documentIsHTML
            ) {
              return context.getElementsByClassName(className);
            }
          };
        rbuggyMatches = [];
        rbuggyQSA = [];
        if ((support.qsa = rnative.test(document.querySelectorAll))) {
          assert(function (div) {
            docElem.appendChild(div).innerHTML =
              "<a id='" +
              expando +
              "'></a>" +
              "<select id='" +
              expando +
              "-\r\\' msallowcapture=''>" +
              "<option selected=''></option></select>";
            if (div.querySelectorAll("[msallowcapture^='']").length) {
              rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
            }
            if (!div.querySelectorAll("[selected]").length) {
              rbuggyQSA.push(
                "\\[" + whitespace + "*(?:value|" + booleans + ")"
              );
            }
            if (!div.querySelectorAll("[id~=" + expando + "-]").length) {
              rbuggyQSA.push("~=");
            }
            if (!div.querySelectorAll(":checked").length) {
              rbuggyQSA.push(":checked");
            }
            if (!div.querySelectorAll("a#" + expando + "+*").length) {
              rbuggyQSA.push(".#.+[+~]");
            }
          });
          assert(function (div) {
            var input = document.createElement("input");
            input.setAttribute("type", "hidden");
            div.appendChild(input).setAttribute("name", "D");
            if (div.querySelectorAll("[name=d]").length) {
              rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
            }
            if (!div.querySelectorAll(":enabled").length) {
              rbuggyQSA.push(":enabled", ":disabled");
            }
            div.querySelectorAll("*,:x");
            rbuggyQSA.push(",.*:");
          });
        }
        if (
          (support.matchesSelector = rnative.test(
            (matches =
              docElem.matches ||
              docElem.webkitMatchesSelector ||
              docElem.mozMatchesSelector ||
              docElem.oMatchesSelector ||
              docElem.msMatchesSelector)
          ))
        ) {
          assert(function (div) {
            support.disconnectedMatch = matches.call(div, "div");
            matches.call(div, "[s!='']:x");
            rbuggyMatches.push("!=", pseudos);
          });
        }
        rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
        rbuggyMatches =
          rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
        hasCompare = rnative.test(docElem.compareDocumentPosition);
        contains =
          hasCompare || rnative.test(docElem.contains)
            ? function (a, b) {
                var adown = a.nodeType === 9 ? a.documentElement : a,
                  bup = b && b.parentNode;
                return (
                  a === bup ||
                  !!(
                    bup &&
                    bup.nodeType === 1 &&
                    (adown.contains
                      ? adown.contains(bup)
                      : a.compareDocumentPosition &&
                        a.compareDocumentPosition(bup) & 16)
                  )
                );
              }
            : function (a, b) {
                if (b) {
                  while ((b = b.parentNode)) {
                    if (b === a) {
                      return true;
                    }
                  }
                }
                return false;
              };
        sortOrder = hasCompare
          ? function (a, b) {
              if (a === b) {
                hasDuplicate = true;
                return 0;
              }
              var compare =
                !a.compareDocumentPosition - !b.compareDocumentPosition;
              if (compare) {
                return compare;
              }
              compare =
                (a.ownerDocument || a) === (b.ownerDocument || b)
                  ? a.compareDocumentPosition(b)
                  : 1;
              if (
                compare & 1 ||
                (!support.sortDetached &&
                  b.compareDocumentPosition(a) === compare)
              ) {
                if (
                  a === document ||
                  (a.ownerDocument === preferredDoc &&
                    contains(preferredDoc, a))
                ) {
                  return -1;
                }
                if (
                  b === document ||
                  (b.ownerDocument === preferredDoc &&
                    contains(preferredDoc, b))
                ) {
                  return 1;
                }
                return sortInput
                  ? indexOf(sortInput, a) - indexOf(sortInput, b)
                  : 0;
              }
              return compare & 4 ? -1 : 1;
            }
          : function (a, b) {
              if (a === b) {
                hasDuplicate = true;
                return 0;
              }
              var cur,
                i = 0,
                aup = a.parentNode,
                bup = b.parentNode,
                ap = [a],
                bp = [b];
              if (!aup || !bup) {
                return a === document
                  ? -1
                  : b === document
                  ? 1
                  : aup
                  ? -1
                  : bup
                  ? 1
                  : sortInput
                  ? indexOf(sortInput, a) - indexOf(sortInput, b)
                  : 0;
              } else if (aup === bup) {
                return siblingCheck(a, b);
              }
              cur = a;
              while ((cur = cur.parentNode)) {
                ap.unshift(cur);
              }
              cur = b;
              while ((cur = cur.parentNode)) {
                bp.unshift(cur);
              }
              while (ap[i] === bp[i]) {
                i++;
              }
              return i
                ? siblingCheck(ap[i], bp[i])
                : ap[i] === preferredDoc
                ? -1
                : bp[i] === preferredDoc
                ? 1
                : 0;
            };
        return document;
      };
      Sizzle.matches = function (expr, elements) {
        return Sizzle(expr, null, null, elements);
      };
      Sizzle.matchesSelector = function (elem, expr) {
        if ((elem.ownerDocument || elem) !== document) {
          setDocument(elem);
        }
        expr = expr.replace(rattributeQuotes, "='$1']");
        if (
          support.matchesSelector &&
          documentIsHTML &&
          !compilerCache[expr + " "] &&
          (!rbuggyMatches || !rbuggyMatches.test(expr)) &&
          (!rbuggyQSA || !rbuggyQSA.test(expr))
        ) {
          try {
            var ret = matches.call(elem, expr);
            if (
              ret ||
              support.disconnectedMatch ||
              (elem.document && elem.document.nodeType !== 11)
            ) {
              return ret;
            }
          } catch (e) {}
        }
        return Sizzle(expr, document, null, [elem]).length > 0;
      };
      Sizzle.contains = function (context, elem) {
        if ((context.ownerDocument || context) !== document) {
          setDocument(context);
        }
        return contains(context, elem);
      };
      Sizzle.attr = function (elem, name) {
        if ((elem.ownerDocument || elem) !== document) {
          setDocument(elem);
        }
        var fn = Expr.attrHandle[name.toLowerCase()],
          val =
            fn && hasOwn.call(Expr.attrHandle, name.toLowerCase())
              ? fn(elem, name, !documentIsHTML)
              : undefined;
        return val !== undefined
          ? val
          : support.attributes || !documentIsHTML
          ? elem.getAttribute(name)
          : (val = elem.getAttributeNode(name)) && val.specified
          ? val.value
          : null;
      };
      Sizzle.error = function (msg) {
        throw new Error("Syntax error, unrecognized expression: " + msg);
      };
      Sizzle.uniqueSort = function (results) {
        var elem,
          duplicates = [],
          j = 0,
          i = 0;
        hasDuplicate = !support.detectDuplicates;
        sortInput = !support.sortStable && results.slice(0);
        results.sort(sortOrder);
        if (hasDuplicate) {
          while ((elem = results[i++])) {
            if (elem === results[i]) {
              j = duplicates.push(i);
            }
          }
          while (j--) {
            results.splice(duplicates[j], 1);
          }
        }
        sortInput = null;
        return results;
      };
      getText = Sizzle.getText = function (elem) {
        var node,
          ret = "",
          i = 0,
          nodeType = elem.nodeType;
        if (!nodeType) {
          while ((node = elem[i++])) {
            ret += getText(node);
          }
        } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
          if (typeof elem.textContent === "string") {
            return elem.textContent;
          } else {
            for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
              ret += getText(elem);
            }
          }
        } else if (nodeType === 3 || nodeType === 4) {
          return elem.nodeValue;
        }
        return ret;
      };
      Expr = Sizzle.selectors = {
        cacheLength: 50,
        createPseudo: markFunction,
        match: matchExpr,
        attrHandle: {},
        find: {},
        relative: {
          ">": { dir: "parentNode", first: true },
          " ": { dir: "parentNode" },
          "+": { dir: "previousSibling", first: true },
          "~": { dir: "previousSibling" },
        },
        preFilter: {
          ATTR: function (match) {
            match[1] = match[1].replace(runescape, funescape);
            match[3] = (match[3] || match[4] || match[5] || "").replace(
              runescape,
              funescape
            );
            if (match[2] === "~=") {
              match[3] = " " + match[3] + " ";
            }
            return match.slice(0, 4);
          },
          CHILD: function (match) {
            match[1] = match[1].toLowerCase();
            if (match[1].slice(0, 3) === "nth") {
              if (!match[3]) {
                Sizzle.error(match[0]);
              }
              match[4] = +(match[4]
                ? match[5] + (match[6] || 1)
                : 2 * (match[3] === "even" || match[3] === "odd"));
              match[5] = +(match[7] + match[8] || match[3] === "odd");
            } else if (match[3]) {
              Sizzle.error(match[0]);
            }
            return match;
          },
          PSEUDO: function (match) {
            var excess,
              unquoted = !match[6] && match[2];
            if (matchExpr["CHILD"].test(match[0])) {
              return null;
            }
            if (match[3]) {
              match[2] = match[4] || match[5] || "";
            } else if (
              unquoted &&
              rpseudo.test(unquoted) &&
              (excess = tokenize(unquoted, true)) &&
              (excess =
                unquoted.indexOf(")", unquoted.length - excess) -
                unquoted.length)
            ) {
              match[0] = match[0].slice(0, excess);
              match[2] = unquoted.slice(0, excess);
            }
            return match.slice(0, 3);
          },
        },
        filter: {
          TAG: function (nodeNameSelector) {
            var nodeName = nodeNameSelector
              .replace(runescape, funescape)
              .toLowerCase();
            return nodeNameSelector === "*"
              ? function () {
                  return true;
                }
              : function (elem) {
                  return (
                    elem.nodeName && elem.nodeName.toLowerCase() === nodeName
                  );
                };
          },
          CLASS: function (className) {
            var pattern = classCache[className + " "];
            return (
              pattern ||
              ((pattern = new RegExp(
                "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)"
              )) &&
                classCache(className, function (elem) {
                  return pattern.test(
                    (typeof elem.className === "string" && elem.className) ||
                      (typeof elem.getAttribute !== "undefined" &&
                        elem.getAttribute("class")) ||
                      ""
                  );
                }))
            );
          },
          ATTR: function (name, operator, check) {
            return function (elem) {
              var result = Sizzle.attr(elem, name);
              if (result == null) {
                return operator === "!=";
              }
              if (!operator) {
                return true;
              }
              result += "";
              return operator === "="
                ? result === check
                : operator === "!="
                ? result !== check
                : operator === "^="
                ? check && result.indexOf(check) === 0
                : operator === "*="
                ? check && result.indexOf(check) > -1
                : operator === "$="
                ? check && result.slice(-check.length) === check
                : operator === "~="
                ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(
                    check
                  ) > -1
                : operator === "|="
                ? result === check ||
                  result.slice(0, check.length + 1) === check + "-"
                : false;
            };
          },
          CHILD: function (type, what, argument, first, last) {
            var simple = type.slice(0, 3) !== "nth",
              forward = type.slice(-4) !== "last",
              ofType = what === "of-type";
            return first === 1 && last === 0
              ? function (elem) {
                  return !!elem.parentNode;
                }
              : function (elem, context, xml) {
                  var cache,
                    uniqueCache,
                    outerCache,
                    node,
                    nodeIndex,
                    start,
                    dir =
                      simple !== forward ? "nextSibling" : "previousSibling",
                    parent = elem.parentNode,
                    name = ofType && elem.nodeName.toLowerCase(),
                    useCache = !xml && !ofType,
                    diff = false;
                  if (parent) {
                    if (simple) {
                      while (dir) {
                        node = elem;
                        while ((node = node[dir])) {
                          if (
                            ofType
                              ? node.nodeName.toLowerCase() === name
                              : node.nodeType === 1
                          ) {
                            return false;
                          }
                        }
                        start = dir =
                          type === "only" && !start && "nextSibling";
                      }
                      return true;
                    }
                    start = [forward ? parent.firstChild : parent.lastChild];
                    if (forward && useCache) {
                      node = parent;
                      outerCache = node[expando] || (node[expando] = {});
                      uniqueCache =
                        outerCache[node.uniqueID] ||
                        (outerCache[node.uniqueID] = {});
                      cache = uniqueCache[type] || [];
                      nodeIndex = cache[0] === dirruns && cache[1];
                      diff = nodeIndex && cache[2];
                      node = nodeIndex && parent.childNodes[nodeIndex];
                      while (
                        (node =
                          (++nodeIndex && node && node[dir]) ||
                          (diff = nodeIndex = 0) ||
                          start.pop())
                      ) {
                        if (node.nodeType === 1 && ++diff && node === elem) {
                          uniqueCache[type] = [dirruns, nodeIndex, diff];
                          break;
                        }
                      }
                    } else {
                      if (useCache) {
                        node = elem;
                        outerCache = node[expando] || (node[expando] = {});
                        uniqueCache =
                          outerCache[node.uniqueID] ||
                          (outerCache[node.uniqueID] = {});
                        cache = uniqueCache[type] || [];
                        nodeIndex = cache[0] === dirruns && cache[1];
                        diff = nodeIndex;
                      }
                      if (diff === false) {
                        while (
                          (node =
                            (++nodeIndex && node && node[dir]) ||
                            (diff = nodeIndex = 0) ||
                            start.pop())
                        ) {
                          if (
                            (ofType
                              ? node.nodeName.toLowerCase() === name
                              : node.nodeType === 1) &&
                            ++diff
                          ) {
                            if (useCache) {
                              outerCache =
                                node[expando] || (node[expando] = {});
                              uniqueCache =
                                outerCache[node.uniqueID] ||
                                (outerCache[node.uniqueID] = {});
                              uniqueCache[type] = [dirruns, diff];
                            }
                            if (node === elem) {
                              break;
                            }
                          }
                        }
                      }
                    }
                    diff -= last;
                    return (
                      diff === first ||
                      (diff % first === 0 && diff / first >= 0)
                    );
                  }
                };
          },
          PSEUDO: function (pseudo, argument) {
            var args,
              fn =
                Expr.pseudos[pseudo] ||
                Expr.setFilters[pseudo.toLowerCase()] ||
                Sizzle.error("unsupported pseudo: " + pseudo);
            if (fn[expando]) {
              return fn(argument);
            }
            if (fn.length > 1) {
              args = [pseudo, pseudo, "", argument];
              return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase())
                ? markFunction(function (seed, matches) {
                    var idx,
                      matched = fn(seed, argument),
                      i = matched.length;
                    while (i--) {
                      idx = indexOf(seed, matched[i]);
                      seed[idx] = !(matches[idx] = matched[i]);
                    }
                  })
                : function (elem) {
                    return fn(elem, 0, args);
                  };
            }
            return fn;
          },
        },
        pseudos: {
          not: markFunction(function (selector) {
            var input = [],
              results = [],
              matcher = compile(selector.replace(rtrim, "$1"));
            return matcher[expando]
              ? markFunction(function (seed, matches, context, xml) {
                  var elem,
                    unmatched = matcher(seed, null, xml, []),
                    i = seed.length;
                  while (i--) {
                    if ((elem = unmatched[i])) {
                      seed[i] = !(matches[i] = elem);
                    }
                  }
                })
              : function (elem, context, xml) {
                  input[0] = elem;
                  matcher(input, null, xml, results);
                  input[0] = null;
                  return !results.pop();
                };
          }),
          has: markFunction(function (selector) {
            return function (elem) {
              return Sizzle(selector, elem).length > 0;
            };
          }),
          contains: markFunction(function (text) {
            text = text.replace(runescape, funescape);
            return function (elem) {
              return (
                (elem.textContent || elem.innerText || getText(elem)).indexOf(
                  text
                ) > -1
              );
            };
          }),
          lang: markFunction(function (lang) {
            if (!ridentifier.test(lang || "")) {
              Sizzle.error("unsupported lang: " + lang);
            }
            lang = lang.replace(runescape, funescape).toLowerCase();
            return function (elem) {
              var elemLang;
              do {
                if (
                  (elemLang = documentIsHTML
                    ? elem.lang
                    : elem.getAttribute("xml:lang") ||
                      elem.getAttribute("lang"))
                ) {
                  elemLang = elemLang.toLowerCase();
                  return (
                    elemLang === lang || elemLang.indexOf(lang + "-") === 0
                  );
                }
              } while ((elem = elem.parentNode) && elem.nodeType === 1);
              return false;
            };
          }),
          target: function (elem) {
            var hash = window.location && window.location.hash;
            return hash && hash.slice(1) === elem.id;
          },
          root: function (elem) {
            return elem === docElem;
          },
          focus: function (elem) {
            return (
              elem === document.activeElement &&
              (!document.hasFocus || document.hasFocus()) &&
              !!(elem.type || elem.href || ~elem.tabIndex)
            );
          },
          enabled: function (elem) {
            return elem.disabled === false;
          },
          disabled: function (elem) {
            return elem.disabled === true;
          },
          checked: function (elem) {
            var nodeName = elem.nodeName.toLowerCase();
            return (
              (nodeName === "input" && !!elem.checked) ||
              (nodeName === "option" && !!elem.selected)
            );
          },
          selected: function (elem) {
            if (elem.parentNode) {
              elem.parentNode.selectedIndex;
            }
            return elem.selected === true;
          },
          empty: function (elem) {
            for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
              if (elem.nodeType < 6) {
                return false;
              }
            }
            return true;
          },
          parent: function (elem) {
            return !Expr.pseudos["empty"](elem);
          },
          header: function (elem) {
            return rheader.test(elem.nodeName);
          },
          input: function (elem) {
            return rinputs.test(elem.nodeName);
          },
          button: function (elem) {
            var name = elem.nodeName.toLowerCase();
            return (
              (name === "input" && elem.type === "button") || name === "button"
            );
          },
          text: function (elem) {
            var attr;
            return (
              elem.nodeName.toLowerCase() === "input" &&
              elem.type === "text" &&
              ((attr = elem.getAttribute("type")) == null ||
                attr.toLowerCase() === "text")
            );
          },
          first: createPositionalPseudo(function () {
            return [0];
          }),
          last: createPositionalPseudo(function (matchIndexes, length) {
            return [length - 1];
          }),
          eq: createPositionalPseudo(function (matchIndexes, length, argument) {
            return [argument < 0 ? argument + length : argument];
          }),
          even: createPositionalPseudo(function (matchIndexes, length) {
            var i = 0;
            for (; i < length; i += 2) {
              matchIndexes.push(i);
            }
            return matchIndexes;
          }),
          odd: createPositionalPseudo(function (matchIndexes, length) {
            var i = 1;
            for (; i < length; i += 2) {
              matchIndexes.push(i);
            }
            return matchIndexes;
          }),
          lt: createPositionalPseudo(function (matchIndexes, length, argument) {
            var i = argument < 0 ? argument + length : argument;
            for (; --i >= 0; ) {
              matchIndexes.push(i);
            }
            return matchIndexes;
          }),
          gt: createPositionalPseudo(function (matchIndexes, length, argument) {
            var i = argument < 0 ? argument + length : argument;
            for (; ++i < length; ) {
              matchIndexes.push(i);
            }
            return matchIndexes;
          }),
        },
      };
      Expr.pseudos["nth"] = Expr.pseudos["eq"];
      for (i in {
        radio: true,
        checkbox: true,
        file: true,
        password: true,
        image: true,
      }) {
        Expr.pseudos[i] = createInputPseudo(i);
      }
      for (i in { submit: true, reset: true }) {
        Expr.pseudos[i] = createButtonPseudo(i);
      }
      function setFilters() {}
      setFilters.prototype = Expr.filters = Expr.pseudos;
      Expr.setFilters = new setFilters();
      tokenize = Sizzle.tokenize = function (selector, parseOnly) {
        var matched,
          match,
          tokens,
          type,
          soFar,
          groups,
          preFilters,
          cached = tokenCache[selector + " "];
        if (cached) {
          return parseOnly ? 0 : cached.slice(0);
        }
        soFar = selector;
        groups = [];
        preFilters = Expr.preFilter;
        while (soFar) {
          if (!matched || (match = rcomma.exec(soFar))) {
            if (match) {
              soFar = soFar.slice(match[0].length) || soFar;
            }
            groups.push((tokens = []));
          }
          matched = false;
          if ((match = rcombinators.exec(soFar))) {
            matched = match.shift();
            tokens.push({ value: matched, type: match[0].replace(rtrim, " ") });
            soFar = soFar.slice(matched.length);
          }
          for (type in Expr.filter) {
            if (
              (match = matchExpr[type].exec(soFar)) &&
              (!preFilters[type] || (match = preFilters[type](match)))
            ) {
              matched = match.shift();
              tokens.push({ value: matched, type: type, matches: match });
              soFar = soFar.slice(matched.length);
            }
          }
          if (!matched) {
            break;
          }
        }
        return parseOnly
          ? soFar.length
          : soFar
          ? Sizzle.error(selector)
          : tokenCache(selector, groups).slice(0);
      };
      function toSelector(tokens) {
        var i = 0,
          len = tokens.length,
          selector = "";
        for (; i < len; i++) {
          selector += tokens[i].value;
        }
        return selector;
      }
      function addCombinator(matcher, combinator, base) {
        var dir = combinator.dir,
          checkNonElements = base && dir === "parentNode",
          doneName = done++;
        return combinator.first
          ? function (elem, context, xml) {
              while ((elem = elem[dir])) {
                if (elem.nodeType === 1 || checkNonElements) {
                  return matcher(elem, context, xml);
                }
              }
            }
          : function (elem, context, xml) {
              var oldCache,
                uniqueCache,
                outerCache,
                newCache = [dirruns, doneName];
              if (xml) {
                while ((elem = elem[dir])) {
                  if (elem.nodeType === 1 || checkNonElements) {
                    if (matcher(elem, context, xml)) {
                      return true;
                    }
                  }
                }
              } else {
                while ((elem = elem[dir])) {
                  if (elem.nodeType === 1 || checkNonElements) {
                    outerCache = elem[expando] || (elem[expando] = {});
                    uniqueCache =
                      outerCache[elem.uniqueID] ||
                      (outerCache[elem.uniqueID] = {});
                    if (
                      (oldCache = uniqueCache[dir]) &&
                      oldCache[0] === dirruns &&
                      oldCache[1] === doneName
                    ) {
                      return (newCache[2] = oldCache[2]);
                    } else {
                      uniqueCache[dir] = newCache;
                      if ((newCache[2] = matcher(elem, context, xml))) {
                        return true;
                      }
                    }
                  }
                }
              }
            };
      }
      function elementMatcher(matchers) {
        return matchers.length > 1
          ? function (elem, context, xml) {
              var i = matchers.length;
              while (i--) {
                if (!matchers[i](elem, context, xml)) {
                  return false;
                }
              }
              return true;
            }
          : matchers[0];
      }
      function multipleContexts(selector, contexts, results) {
        var i = 0,
          len = contexts.length;
        for (; i < len; i++) {
          Sizzle(selector, contexts[i], results);
        }
        return results;
      }
      function condense(unmatched, map, filter, context, xml) {
        var elem,
          newUnmatched = [],
          i = 0,
          len = unmatched.length,
          mapped = map != null;
        for (; i < len; i++) {
          if ((elem = unmatched[i])) {
            if (!filter || filter(elem, context, xml)) {
              newUnmatched.push(elem);
              if (mapped) {
                map.push(i);
              }
            }
          }
        }
        return newUnmatched;
      }
      function setMatcher(
        preFilter,
        selector,
        matcher,
        postFilter,
        postFinder,
        postSelector
      ) {
        if (postFilter && !postFilter[expando]) {
          postFilter = setMatcher(postFilter);
        }
        if (postFinder && !postFinder[expando]) {
          postFinder = setMatcher(postFinder, postSelector);
        }
        return markFunction(function (seed, results, context, xml) {
          var temp,
            i,
            elem,
            preMap = [],
            postMap = [],
            preexisting = results.length,
            elems =
              seed ||
              multipleContexts(
                selector || "*",
                context.nodeType ? [context] : context,
                []
              ),
            matcherIn =
              preFilter && (seed || !selector)
                ? condense(elems, preMap, preFilter, context, xml)
                : elems,
            matcherOut = matcher
              ? postFinder || (seed ? preFilter : preexisting || postFilter)
                ? []
                : results
              : matcherIn;
          if (matcher) {
            matcher(matcherIn, matcherOut, context, xml);
          }
          if (postFilter) {
            temp = condense(matcherOut, postMap);
            postFilter(temp, [], context, xml);
            i = temp.length;
            while (i--) {
              if ((elem = temp[i])) {
                matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
              }
            }
          }
          if (seed) {
            if (postFinder || preFilter) {
              if (postFinder) {
                temp = [];
                i = matcherOut.length;
                while (i--) {
                  if ((elem = matcherOut[i])) {
                    temp.push((matcherIn[i] = elem));
                  }
                }
                postFinder(null, (matcherOut = []), temp, xml);
              }
              i = matcherOut.length;
              while (i--) {
                if (
                  (elem = matcherOut[i]) &&
                  (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1
                ) {
                  seed[temp] = !(results[temp] = elem);
                }
              }
            }
          } else {
            matcherOut = condense(
              matcherOut === results
                ? matcherOut.splice(preexisting, matcherOut.length)
                : matcherOut
            );
            if (postFinder) {
              postFinder(null, results, matcherOut, xml);
            } else {
              push.apply(results, matcherOut);
            }
          }
        });
      }
      function matcherFromTokens(tokens) {
        var checkContext,
          matcher,
          j,
          len = tokens.length,
          leadingRelative = Expr.relative[tokens[0].type],
          implicitRelative = leadingRelative || Expr.relative[" "],
          i = leadingRelative ? 1 : 0,
          matchContext = addCombinator(
            function (elem) {
              return elem === checkContext;
            },
            implicitRelative,
            true
          ),
          matchAnyContext = addCombinator(
            function (elem) {
              return indexOf(checkContext, elem) > -1;
            },
            implicitRelative,
            true
          ),
          matchers = [
            function (elem, context, xml) {
              var ret =
                (!leadingRelative && (xml || context !== outermostContext)) ||
                ((checkContext = context).nodeType
                  ? matchContext(elem, context, xml)
                  : matchAnyContext(elem, context, xml));
              checkContext = null;
              return ret;
            },
          ];
        for (; i < len; i++) {
          if ((matcher = Expr.relative[tokens[i].type])) {
            matchers = [addCombinator(elementMatcher(matchers), matcher)];
          } else {
            matcher = Expr.filter[tokens[i].type].apply(
              null,
              tokens[i].matches
            );
            if (matcher[expando]) {
              j = ++i;
              for (; j < len; j++) {
                if (Expr.relative[tokens[j].type]) {
                  break;
                }
              }
              return setMatcher(
                i > 1 && elementMatcher(matchers),
                i > 1 &&
                  toSelector(
                    tokens
                      .slice(0, i - 1)
                      .concat({ value: tokens[i - 2].type === " " ? "*" : "" })
                  ).replace(rtrim, "$1"),
                matcher,
                i < j && matcherFromTokens(tokens.slice(i, j)),
                j < len && matcherFromTokens((tokens = tokens.slice(j))),
                j < len && toSelector(tokens)
              );
            }
            matchers.push(matcher);
          }
        }
        return elementMatcher(matchers);
      }
      function matcherFromGroupMatchers(elementMatchers, setMatchers) {
        var bySet = setMatchers.length > 0,
          byElement = elementMatchers.length > 0,
          superMatcher = function (seed, context, xml, results, outermost) {
            var elem,
              j,
              matcher,
              matchedCount = 0,
              i = "0",
              unmatched = seed && [],
              setMatched = [],
              contextBackup = outermostContext,
              elems = seed || (byElement && Expr.find["TAG"]("*", outermost)),
              dirrunsUnique = (dirruns +=
                contextBackup == null ? 1 : Math.random() || 0.1),
              len = elems.length;
            if (outermost) {
              outermostContext = context === document || context || outermost;
            }
            for (; i !== len && (elem = elems[i]) != null; i++) {
              if (byElement && elem) {
                j = 0;
                if (!context && elem.ownerDocument !== document) {
                  setDocument(elem);
                  xml = !documentIsHTML;
                }
                while ((matcher = elementMatchers[j++])) {
                  if (matcher(elem, context || document, xml)) {
                    results.push(elem);
                    break;
                  }
                }
                if (outermost) {
                  dirruns = dirrunsUnique;
                }
              }
              if (bySet) {
                if ((elem = !matcher && elem)) {
                  matchedCount--;
                }
                if (seed) {
                  unmatched.push(elem);
                }
              }
            }
            matchedCount += i;
            if (bySet && i !== matchedCount) {
              j = 0;
              while ((matcher = setMatchers[j++])) {
                matcher(unmatched, setMatched, context, xml);
              }
              if (seed) {
                if (matchedCount > 0) {
                  while (i--) {
                    if (!(unmatched[i] || setMatched[i])) {
                      setMatched[i] = pop.call(results);
                    }
                  }
                }
                setMatched = condense(setMatched);
              }
              push.apply(results, setMatched);
              if (
                outermost &&
                !seed &&
                setMatched.length > 0 &&
                matchedCount + setMatchers.length > 1
              ) {
                Sizzle.uniqueSort(results);
              }
            }
            if (outermost) {
              dirruns = dirrunsUnique;
              outermostContext = contextBackup;
            }
            return unmatched;
          };
        return bySet ? markFunction(superMatcher) : superMatcher;
      }
      compile = Sizzle.compile = function (selector, match) {
        var i,
          setMatchers = [],
          elementMatchers = [],
          cached = compilerCache[selector + " "];
        if (!cached) {
          if (!match) {
            match = tokenize(selector);
          }
          i = match.length;
          while (i--) {
            cached = matcherFromTokens(match[i]);
            if (cached[expando]) {
              setMatchers.push(cached);
            } else {
              elementMatchers.push(cached);
            }
          }
          cached = compilerCache(
            selector,
            matcherFromGroupMatchers(elementMatchers, setMatchers)
          );
          cached.selector = selector;
        }
        return cached;
      };
      select = Sizzle.select = function (selector, context, results, seed) {
        var i,
          tokens,
          token,
          type,
          find,
          compiled = typeof selector === "function" && selector,
          match = !seed && tokenize((selector = compiled.selector || selector));
        results = results || [];
        if (match.length === 1) {
          tokens = match[0] = match[0].slice(0);
          if (
            tokens.length > 2 &&
            (token = tokens[0]).type === "ID" &&
            support.getById &&
            context.nodeType === 9 &&
            documentIsHTML &&
            Expr.relative[tokens[1].type]
          ) {
            context = (Expr.find["ID"](
              token.matches[0].replace(runescape, funescape),
              context
            ) || [])[0];
            if (!context) {
              return results;
            } else if (compiled) {
              context = context.parentNode;
            }
            selector = selector.slice(tokens.shift().value.length);
          }
          i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
          while (i--) {
            token = tokens[i];
            if (Expr.relative[(type = token.type)]) {
              break;
            }
            if ((find = Expr.find[type])) {
              if (
                (seed = find(
                  token.matches[0].replace(runescape, funescape),
                  (rsibling.test(tokens[0].type) &&
                    testContext(context.parentNode)) ||
                    context
                ))
              ) {
                tokens.splice(i, 1);
                selector = seed.length && toSelector(tokens);
                if (!selector) {
                  push.apply(results, seed);
                  return results;
                }
                break;
              }
            }
          }
        }
        (compiled || compile(selector, match))(
          seed,
          context,
          !documentIsHTML,
          results,
          !context ||
            (rsibling.test(selector) && testContext(context.parentNode)) ||
            context
        );
        return results;
      };
      support.sortStable =
        expando.split("").sort(sortOrder).join("") === expando;
      support.detectDuplicates = !!hasDuplicate;
      setDocument();
      support.sortDetached = assert(function (div1) {
        return div1.compareDocumentPosition(document.createElement("div")) & 1;
      });
      if (
        !assert(function (div) {
          div.innerHTML = "<a href='#'></a>";
          return div.firstChild.getAttribute("href") === "#";
        })
      ) {
        addHandle("type|href|height|width", function (elem, name, isXML) {
          if (!isXML) {
            return elem.getAttribute(
              name,
              name.toLowerCase() === "type" ? 1 : 2
            );
          }
        });
      }
      if (
        !support.attributes ||
        !assert(function (div) {
          div.innerHTML = "<input/>";
          div.firstChild.setAttribute("value", "");
          return div.firstChild.getAttribute("value") === "";
        })
      ) {
        addHandle("value", function (elem, name, isXML) {
          if (!isXML && elem.nodeName.toLowerCase() === "input") {
            return elem.defaultValue;
          }
        });
      }
      if (
        !assert(function (div) {
          return div.getAttribute("disabled") == null;
        })
      ) {
        addHandle(booleans, function (elem, name, isXML) {
          var val;
          if (!isXML) {
            return elem[name] === true
              ? name.toLowerCase()
              : (val = elem.getAttributeNode(name)) && val.specified
              ? val.value
              : null;
          }
        });
      }
      return Sizzle;
    })(window);
  jQuery.find = Sizzle;
  jQuery.expr = Sizzle.selectors;
  jQuery.expr[":"] = jQuery.expr.pseudos;
  jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
  jQuery.text = Sizzle.getText;
  jQuery.isXMLDoc = Sizzle.isXML;
  jQuery.contains = Sizzle.contains;
  var dir = function (elem, dir, until) {
    var matched = [],
      truncate = until !== undefined;
    while ((elem = elem[dir]) && elem.nodeType !== 9) {
      if (elem.nodeType === 1) {
        if (truncate && jQuery(elem).is(until)) {
          break;
        }
        matched.push(elem);
      }
    }
    return matched;
  };
  var siblings = function (n, elem) {
    var matched = [];
    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== elem) {
        matched.push(n);
      }
    }
    return matched;
  };
  var rneedsContext = jQuery.expr.match.needsContext;
  var rsingleTag = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/;
  var risSimple = /^.[^:#\[\.,]*$/;
  function winnow(elements, qualifier, not) {
    if (jQuery.isFunction(qualifier)) {
      return jQuery.grep(elements, function (elem, i) {
        return !!qualifier.call(elem, i, elem) !== not;
      });
    }
    if (qualifier.nodeType) {
      return jQuery.grep(elements, function (elem) {
        return (elem === qualifier) !== not;
      });
    }
    if (typeof qualifier === "string") {
      if (risSimple.test(qualifier)) {
        return jQuery.filter(qualifier, elements, not);
      }
      qualifier = jQuery.filter(qualifier, elements);
    }
    return jQuery.grep(elements, function (elem) {
      return indexOf.call(qualifier, elem) > -1 !== not;
    });
  }
  jQuery.filter = function (expr, elems, not) {
    var elem = elems[0];
    if (not) {
      expr = ":not(" + expr + ")";
    }
    return elems.length === 1 && elem.nodeType === 1
      ? jQuery.find.matchesSelector(elem, expr)
        ? [elem]
        : []
      : jQuery.find.matches(
          expr,
          jQuery.grep(elems, function (elem) {
            return elem.nodeType === 1;
          })
        );
  };
  jQuery.fn.extend({
    find: function (selector) {
      var i,
        len = this.length,
        ret = [],
        self = this;
      if (typeof selector !== "string") {
        return this.pushStack(
          jQuery(selector).filter(function () {
            for (i = 0; i < len; i++) {
              if (jQuery.contains(self[i], this)) {
                return true;
              }
            }
          })
        );
      }
      for (i = 0; i < len; i++) {
        jQuery.find(selector, self[i], ret);
      }
      ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
      ret.selector = this.selector ? this.selector + " " + selector : selector;
      return ret;
    },
    filter: function (selector) {
      return this.pushStack(winnow(this, selector || [], false));
    },
    not: function (selector) {
      return this.pushStack(winnow(this, selector || [], true));
    },
    is: function (selector) {
      return !!winnow(
        this,
        typeof selector === "string" && rneedsContext.test(selector)
          ? jQuery(selector)
          : selector || [],
        false
      ).length;
    },
  });
  var rootjQuery,
    rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
    init = (jQuery.fn.init = function (selector, context, root) {
      var match, elem;
      if (!selector) {
        return this;
      }
      root = root || rootjQuery;
      if (typeof selector === "string") {
        if (
          selector[0] === "<" &&
          selector[selector.length - 1] === ">" &&
          selector.length >= 3
        ) {
          match = [null, selector, null];
        } else {
          match = rquickExpr.exec(selector);
        }
        if (match && (match[1] || !context)) {
          if (match[1]) {
            context = context instanceof jQuery ? context[0] : context;
            jQuery.merge(
              this,
              jQuery.parseHTML(
                match[1],
                context && context.nodeType
                  ? context.ownerDocument || context
                  : document,
                true
              )
            );
            if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
              for (match in context) {
                if (jQuery.isFunction(this[match])) {
                  this[match](context[match]);
                } else {
                  this.attr(match, context[match]);
                }
              }
            }
            return this;
          } else {
            elem = document.getElementById(match[2]);
            if (elem && elem.parentNode) {
              this.length = 1;
              this[0] = elem;
            }
            this.context = document;
            this.selector = selector;
            return this;
          }
        } else if (!context || context.jquery) {
          return (context || root).find(selector);
        } else {
          return this.constructor(context).find(selector);
        }
      } else if (selector.nodeType) {
        this.context = this[0] = selector;
        this.length = 1;
        return this;
      } else if (jQuery.isFunction(selector)) {
        return root.ready !== undefined
          ? root.ready(selector)
          : selector(jQuery);
      }
      if (selector.selector !== undefined) {
        this.selector = selector.selector;
        this.context = selector.context;
      }
      return jQuery.makeArray(selector, this);
    });
  init.prototype = jQuery.fn;
  rootjQuery = jQuery(document);
  var rparentsprev = /^(?:parents|prev(?:Until|All))/,
    guaranteedUnique = {
      children: true,
      contents: true,
      next: true,
      prev: true,
    };
  jQuery.fn.extend({
    has: function (target) {
      var targets = jQuery(target, this),
        l = targets.length;
      return this.filter(function () {
        var i = 0;
        for (; i < l; i++) {
          if (jQuery.contains(this, targets[i])) {
            return true;
          }
        }
      });
    },
    closest: function (selectors, context) {
      var cur,
        i = 0,
        l = this.length,
        matched = [],
        pos =
          rneedsContext.test(selectors) || typeof selectors !== "string"
            ? jQuery(selectors, context || this.context)
            : 0;
      for (; i < l; i++) {
        for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
          if (
            cur.nodeType < 11 &&
            (pos
              ? pos.index(cur) > -1
              : cur.nodeType === 1 &&
                jQuery.find.matchesSelector(cur, selectors))
          ) {
            matched.push(cur);
            break;
          }
        }
      }
      return this.pushStack(
        matched.length > 1 ? jQuery.uniqueSort(matched) : matched
      );
    },
    index: function (elem) {
      if (!elem) {
        return this[0] && this[0].parentNode
          ? this.first().prevAll().length
          : -1;
      }
      if (typeof elem === "string") {
        return indexOf.call(jQuery(elem), this[0]);
      }
      return indexOf.call(this, elem.jquery ? elem[0] : elem);
    },
    add: function (selector, context) {
      return this.pushStack(
        jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context)))
      );
    },
    addBack: function (selector) {
      return this.add(
        selector == null ? this.prevObject : this.prevObject.filter(selector)
      );
    },
  });
  function sibling(cur, dir) {
    while ((cur = cur[dir]) && cur.nodeType !== 1) {}
    return cur;
  }
  jQuery.each(
    {
      parent: function (elem) {
        var parent = elem.parentNode;
        return parent && parent.nodeType !== 11 ? parent : null;
      },
      parents: function (elem) {
        return dir(elem, "parentNode");
      },
      parentsUntil: function (elem, i, until) {
        return dir(elem, "parentNode", until);
      },
      next: function (elem) {
        return sibling(elem, "nextSibling");
      },
      prev: function (elem) {
        return sibling(elem, "previousSibling");
      },
      nextAll: function (elem) {
        return dir(elem, "nextSibling");
      },
      prevAll: function (elem) {
        return dir(elem, "previousSibling");
      },
      nextUntil: function (elem, i, until) {
        return dir(elem, "nextSibling", until);
      },
      prevUntil: function (elem, i, until) {
        return dir(elem, "previousSibling", until);
      },
      siblings: function (elem) {
        return siblings((elem.parentNode || {}).firstChild, elem);
      },
      children: function (elem) {
        return siblings(elem.firstChild);
      },
      contents: function (elem) {
        return elem.contentDocument || jQuery.merge([], elem.childNodes);
      },
    },
    function (name, fn) {
      jQuery.fn[name] = function (until, selector) {
        var matched = jQuery.map(this, fn, until);
        if (name.slice(-5) !== "Until") {
          selector = until;
        }
        if (selector && typeof selector === "string") {
          matched = jQuery.filter(selector, matched);
        }
        if (this.length > 1) {
          if (!guaranteedUnique[name]) {
            jQuery.uniqueSort(matched);
          }
          if (rparentsprev.test(name)) {
            matched.reverse();
          }
        }
        return this.pushStack(matched);
      };
    }
  );
  var rnotwhite = /\S+/g;
  function createOptions(options) {
    var object = {};
    jQuery.each(options.match(rnotwhite) || [], function (_, flag) {
      object[flag] = true;
    });
    return object;
  }
  jQuery.Callbacks = function (options) {
    options =
      typeof options === "string"
        ? createOptions(options)
        : jQuery.extend({}, options);
    var firing,
      memory,
      fired,
      locked,
      list = [],
      queue = [],
      firingIndex = -1,
      fire = function () {
        locked = options.once;
        fired = firing = true;
        for (; queue.length; firingIndex = -1) {
          memory = queue.shift();
          while (++firingIndex < list.length) {
            if (
              list[firingIndex].apply(memory[0], memory[1]) === false &&
              options.stopOnFalse
            ) {
              firingIndex = list.length;
              memory = false;
            }
          }
        }
        if (!options.memory) {
          memory = false;
        }
        firing = false;
        if (locked) {
          if (memory) {
            list = [];
          } else {
            list = "";
          }
        }
      },
      self = {
        add: function () {
          if (list) {
            if (memory && !firing) {
              firingIndex = list.length - 1;
              queue.push(memory);
            }
            (function add(args) {
              jQuery.each(args, function (_, arg) {
                if (jQuery.isFunction(arg)) {
                  if (!options.unique || !self.has(arg)) {
                    list.push(arg);
                  }
                } else if (arg && arg.length && jQuery.type(arg) !== "string") {
                  add(arg);
                }
              });
            })(arguments);
            if (memory && !firing) {
              fire();
            }
          }
          return this;
        },
        remove: function () {
          jQuery.each(arguments, function (_, arg) {
            var index;
            while ((index = jQuery.inArray(arg, list, index)) > -1) {
              list.splice(index, 1);
              if (index <= firingIndex) {
                firingIndex--;
              }
            }
          });
          return this;
        },
        has: function (fn) {
          return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
        },
        empty: function () {
          if (list) {
            list = [];
          }
          return this;
        },
        disable: function () {
          locked = queue = [];
          list = memory = "";
          return this;
        },
        disabled: function () {
          return !list;
        },
        lock: function () {
          locked = queue = [];
          if (!memory) {
            list = memory = "";
          }
          return this;
        },
        locked: function () {
          return !!locked;
        },
        fireWith: function (context, args) {
          if (!locked) {
            args = args || [];
            args = [context, args.slice ? args.slice() : args];
            queue.push(args);
            if (!firing) {
              fire();
            }
          }
          return this;
        },
        fire: function () {
          self.fireWith(this, arguments);
          return this;
        },
        fired: function () {
          return !!fired;
        },
      };
    return self;
  };
  jQuery.extend({
    Deferred: function (func) {
      var tuples = [
          ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
          ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
          ["notify", "progress", jQuery.Callbacks("memory")],
        ],
        state = "pending",
        promise = {
          state: function () {
            return state;
          },
          always: function () {
            deferred.done(arguments).fail(arguments);
            return this;
          },
          then: function () {
            var fns = arguments;
            return jQuery
              .Deferred(function (newDefer) {
                jQuery.each(tuples, function (i, tuple) {
                  var fn = jQuery.isFunction(fns[i]) && fns[i];
                  deferred[tuple[1]](function () {
                    var returned = fn && fn.apply(this, arguments);
                    if (returned && jQuery.isFunction(returned.promise)) {
                      returned
                        .promise()
                        .progress(newDefer.notify)
                        .done(newDefer.resolve)
                        .fail(newDefer.reject);
                    } else {
                      newDefer[tuple[0] + "With"](
                        this === promise ? newDefer.promise() : this,
                        fn ? [returned] : arguments
                      );
                    }
                  });
                });
                fns = null;
              })
              .promise();
          },
          promise: function (obj) {
            return obj != null ? jQuery.extend(obj, promise) : promise;
          },
        },
        deferred = {};
      promise.pipe = promise.then;
      jQuery.each(tuples, function (i, tuple) {
        var list = tuple[2],
          stateString = tuple[3];
        promise[tuple[1]] = list.add;
        if (stateString) {
          list.add(
            function () {
              state = stateString;
            },
            tuples[i ^ 1][2].disable,
            tuples[2][2].lock
          );
        }
        deferred[tuple[0]] = function () {
          deferred[tuple[0] + "With"](
            this === deferred ? promise : this,
            arguments
          );
          return this;
        };
        deferred[tuple[0] + "With"] = list.fireWith;
      });
      promise.promise(deferred);
      if (func) {
        func.call(deferred, deferred);
      }
      return deferred;
    },
    when: function (subordinate) {
      var i = 0,
        resolveValues = slice.call(arguments),
        length = resolveValues.length,
        remaining =
          length !== 1 ||
          (subordinate && jQuery.isFunction(subordinate.promise))
            ? length
            : 0,
        deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
        updateFunc = function (i, contexts, values) {
          return function (value) {
            contexts[i] = this;
            values[i] = arguments.length > 1 ? slice.call(arguments) : value;
            if (values === progressValues) {
              deferred.notifyWith(contexts, values);
            } else if (!--remaining) {
              deferred.resolveWith(contexts, values);
            }
          };
        },
        progressValues,
        progressContexts,
        resolveContexts;
      if (length > 1) {
        progressValues = new Array(length);
        progressContexts = new Array(length);
        resolveContexts = new Array(length);
        for (; i < length; i++) {
          if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
            resolveValues[i]
              .promise()
              .progress(updateFunc(i, progressContexts, progressValues))
              .done(updateFunc(i, resolveContexts, resolveValues))
              .fail(deferred.reject);
          } else {
            --remaining;
          }
        }
      }
      if (!remaining) {
        deferred.resolveWith(resolveContexts, resolveValues);
      }
      return deferred.promise();
    },
  });
  var readyList;
  jQuery.fn.ready = function (fn) {
    jQuery.ready.promise().done(fn);
    return this;
  };
  jQuery.extend({
    isReady: false,
    readyWait: 1,
    holdReady: function (hold) {
      if (hold) {
        jQuery.readyWait++;
      } else {
        jQuery.ready(true);
      }
    },
    ready: function (wait) {
      if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
        return;
      }
      jQuery.isReady = true;
      if (wait !== true && --jQuery.readyWait > 0) {
        return;
      }
      readyList.resolveWith(document, [jQuery]);
      if (jQuery.fn.triggerHandler) {
        jQuery(document).triggerHandler("ready");
        jQuery(document).off("ready");
      }
    },
  });
  function completed() {
    document.removeEventListener("DOMContentLoaded", completed);
    window.removeEventListener("load", completed);
    jQuery.ready();
  }
  jQuery.ready.promise = function (obj) {
    if (!readyList) {
      readyList = jQuery.Deferred();
      if (
        document.readyState === "complete" ||
        (document.readyState !== "loading" &&
          !document.documentElement.doScroll)
      ) {
        window.setTimeout(jQuery.ready);
      } else {
        document.addEventListener("DOMContentLoaded", completed);
        window.addEventListener("load", completed);
      }
    }
    return readyList.promise(obj);
  };
  jQuery.ready.promise();
  var access = function (elems, fn, key, value, chainable, emptyGet, raw) {
    var i = 0,
      len = elems.length,
      bulk = key == null;
    if (jQuery.type(key) === "object") {
      chainable = true;
      for (i in key) {
        access(elems, fn, i, key[i], true, emptyGet, raw);
      }
    } else if (value !== undefined) {
      chainable = true;
      if (!jQuery.isFunction(value)) {
        raw = true;
      }
      if (bulk) {
        if (raw) {
          fn.call(elems, value);
          fn = null;
        } else {
          bulk = fn;
          fn = function (elem, key, value) {
            return bulk.call(jQuery(elem), value);
          };
        }
      }
      if (fn) {
        for (; i < len; i++) {
          fn(
            elems[i],
            key,
            raw ? value : value.call(elems[i], i, fn(elems[i], key))
          );
        }
      }
    }
    return chainable
      ? elems
      : bulk
      ? fn.call(elems)
      : len
      ? fn(elems[0], key)
      : emptyGet;
  };
  var acceptData = function (owner) {
    return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
  };
  function Data() {
    this.expando = jQuery.expando + Data.uid++;
  }
  Data.uid = 1;
  Data.prototype = {
    register: function (owner, initial) {
      var value = initial || {};
      if (owner.nodeType) {
        owner[this.expando] = value;
      } else {
        Object.defineProperty(owner, this.expando, {
          value: value,
          writable: true,
          configurable: true,
        });
      }
      return owner[this.expando];
    },
    cache: function (owner) {
      if (!acceptData(owner)) {
        return {};
      }
      var value = owner[this.expando];
      if (!value) {
        value = {};
        if (acceptData(owner)) {
          if (owner.nodeType) {
            owner[this.expando] = value;
          } else {
            Object.defineProperty(owner, this.expando, {
              value: value,
              configurable: true,
            });
          }
        }
      }
      return value;
    },
    set: function (owner, data, value) {
      var prop,
        cache = this.cache(owner);
      if (typeof data === "string") {
        cache[data] = value;
      } else {
        for (prop in data) {
          cache[prop] = data[prop];
        }
      }
      return cache;
    },
    get: function (owner, key) {
      return key === undefined
        ? this.cache(owner)
        : owner[this.expando] && owner[this.expando][key];
    },
    access: function (owner, key, value) {
      var stored;
      if (
        key === undefined ||
        (key && typeof key === "string" && value === undefined)
      ) {
        stored = this.get(owner, key);
        return stored !== undefined
          ? stored
          : this.get(owner, jQuery.camelCase(key));
      }
      this.set(owner, key, value);
      return value !== undefined ? value : key;
    },
    remove: function (owner, key) {
      var i,
        name,
        camel,
        cache = owner[this.expando];
      if (cache === undefined) {
        return;
      }
      if (key === undefined) {
        this.register(owner);
      } else {
        if (jQuery.isArray(key)) {
          name = key.concat(key.map(jQuery.camelCase));
        } else {
          camel = jQuery.camelCase(key);
          if (key in cache) {
            name = [key, camel];
          } else {
            name = camel;
            name = name in cache ? [name] : name.match(rnotwhite) || [];
          }
        }
        i = name.length;
        while (i--) {
          delete cache[name[i]];
        }
      }
      if (key === undefined || jQuery.isEmptyObject(cache)) {
        if (owner.nodeType) {
          owner[this.expando] = undefined;
        } else {
          delete owner[this.expando];
        }
      }
    },
    hasData: function (owner) {
      var cache = owner[this.expando];
      return cache !== undefined && !jQuery.isEmptyObject(cache);
    },
  };
  var dataPriv = new Data();
  var dataUser = new Data();
  var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    rmultiDash = /[A-Z]/g;
  function dataAttr(elem, key, data) {
    var name;
    if (data === undefined && elem.nodeType === 1) {
      name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
      data = elem.getAttribute(name);
      if (typeof data === "string") {
        try {
          data =
            data === "true"
              ? true
              : data === "false"
              ? false
              : data === "null"
              ? null
              : +data + "" === data
              ? +data
              : rbrace.test(data)
              ? jQuery.parseJSON(data)
              : data;
        } catch (e) {}
        dataUser.set(elem, key, data);
      } else {
        data = undefined;
      }
    }
    return data;
  }
  jQuery.extend({
    hasData: function (elem) {
      return dataUser.hasData(elem) || dataPriv.hasData(elem);
    },
    data: function (elem, name, data) {
      return dataUser.access(elem, name, data);
    },
    removeData: function (elem, name) {
      dataUser.remove(elem, name);
    },
    _data: function (elem, name, data) {
      return dataPriv.access(elem, name, data);
    },
    _removeData: function (elem, name) {
      dataPriv.remove(elem, name);
    },
  });
  jQuery.fn.extend({
    data: function (key, value) {
      var i,
        name,
        data,
        elem = this[0],
        attrs = elem && elem.attributes;
      if (key === undefined) {
        if (this.length) {
          data = dataUser.get(elem);
          if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
            i = attrs.length;
            while (i--) {
              if (attrs[i]) {
                name = attrs[i].name;
                if (name.indexOf("data-") === 0) {
                  name = jQuery.camelCase(name.slice(5));
                  dataAttr(elem, name, data[name]);
                }
              }
            }
            dataPriv.set(elem, "hasDataAttrs", true);
          }
        }
        return data;
      }
      if (typeof key === "object") {
        return this.each(function () {
          dataUser.set(this, key);
        });
      }
      return access(
        this,
        function (value) {
          var data, camelKey;
          if (elem && value === undefined) {
            data =
              dataUser.get(elem, key) ||
              dataUser.get(elem, key.replace(rmultiDash, "-$&").toLowerCase());
            if (data !== undefined) {
              return data;
            }
            camelKey = jQuery.camelCase(key);
            data = dataUser.get(elem, camelKey);
            if (data !== undefined) {
              return data;
            }
            data = dataAttr(elem, camelKey, undefined);
            if (data !== undefined) {
              return data;
            }
            return;
          }
          camelKey = jQuery.camelCase(key);
          this.each(function () {
            var data = dataUser.get(this, camelKey);
            dataUser.set(this, camelKey, value);
            if (key.indexOf("-") > -1 && data !== undefined) {
              dataUser.set(this, key, value);
            }
          });
        },
        null,
        value,
        arguments.length > 1,
        null,
        true
      );
    },
    removeData: function (key) {
      return this.each(function () {
        dataUser.remove(this, key);
      });
    },
  });
  jQuery.extend({
    queue: function (elem, type, data) {
      var queue;
      if (elem) {
        type = (type || "fx") + "queue";
        queue = dataPriv.get(elem, type);
        if (data) {
          if (!queue || jQuery.isArray(data)) {
            queue = dataPriv.access(elem, type, jQuery.makeArray(data));
          } else {
            queue.push(data);
          }
        }
        return queue || [];
      }
    },
    dequeue: function (elem, type) {
      type = type || "fx";
      var queue = jQuery.queue(elem, type),
        startLength = queue.length,
        fn = queue.shift(),
        hooks = jQuery._queueHooks(elem, type),
        next = function () {
          jQuery.dequeue(elem, type);
        };
      if (fn === "inprogress") {
        fn = queue.shift();
        startLength--;
      }
      if (fn) {
        if (type === "fx") {
          queue.unshift("inprogress");
        }
        delete hooks.stop;
        fn.call(elem, next, hooks);
      }
      if (!startLength && hooks) {
        hooks.empty.fire();
      }
    },
    _queueHooks: function (elem, type) {
      var key = type + "queueHooks";
      return (
        dataPriv.get(elem, key) ||
        dataPriv.access(elem, key, {
          empty: jQuery.Callbacks("once memory").add(function () {
            dataPriv.remove(elem, [type + "queue", key]);
          }),
        })
      );
    },
  });
  jQuery.fn.extend({
    queue: function (type, data) {
      var setter = 2;
      if (typeof type !== "string") {
        data = type;
        type = "fx";
        setter--;
      }
      if (arguments.length < setter) {
        return jQuery.queue(this[0], type);
      }
      return data === undefined
        ? this
        : this.each(function () {
            var queue = jQuery.queue(this, type, data);
            jQuery._queueHooks(this, type);
            if (type === "fx" && queue[0] !== "inprogress") {
              jQuery.dequeue(this, type);
            }
          });
    },
    dequeue: function (type) {
      return this.each(function () {
        jQuery.dequeue(this, type);
      });
    },
    clearQueue: function (type) {
      return this.queue(type || "fx", []);
    },
    promise: function (type, obj) {
      var tmp,
        count = 1,
        defer = jQuery.Deferred(),
        elements = this,
        i = this.length,
        resolve = function () {
          if (!--count) {
            defer.resolveWith(elements, [elements]);
          }
        };
      if (typeof type !== "string") {
        obj = type;
        type = undefined;
      }
      type = type || "fx";
      while (i--) {
        tmp = dataPriv.get(elements[i], type + "queueHooks");
        if (tmp && tmp.empty) {
          count++;
          tmp.empty.add(resolve);
        }
      }
      resolve();
      return defer.promise(obj);
    },
  });
  var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
  var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
  var cssExpand = ["Top", "Right", "Bottom", "Left"];
  var isHidden = function (elem, el) {
    elem = el || elem;
    return (
      jQuery.css(elem, "display") === "none" ||
      !jQuery.contains(elem.ownerDocument, elem)
    );
  };
  function adjustCSS(elem, prop, valueParts, tween) {
    var adjusted,
      scale = 1,
      maxIterations = 20,
      currentValue = tween
        ? function () {
            return tween.cur();
          }
        : function () {
            return jQuery.css(elem, prop, "");
          },
      initial = currentValue(),
      unit =
        (valueParts && valueParts[3]) || (jQuery.cssNumber[prop] ? "" : "px"),
      initialInUnit =
        (jQuery.cssNumber[prop] || (unit !== "px" && +initial)) &&
        rcssNum.exec(jQuery.css(elem, prop));
    if (initialInUnit && initialInUnit[3] !== unit) {
      unit = unit || initialInUnit[3];
      valueParts = valueParts || [];
      initialInUnit = +initial || 1;
      do {
        scale = scale || ".5";
        initialInUnit = initialInUnit / scale;
        jQuery.style(elem, prop, initialInUnit + unit);
      } while (
        scale !== (scale = currentValue() / initial) &&
        scale !== 1 &&
        --maxIterations
      );
    }
    if (valueParts) {
      initialInUnit = +initialInUnit || +initial || 0;
      adjusted = valueParts[1]
        ? initialInUnit + (valueParts[1] + 1) * valueParts[2]
        : +valueParts[2];
      if (tween) {
        tween.unit = unit;
        tween.start = initialInUnit;
        tween.end = adjusted;
      }
    }
    return adjusted;
  }
  var rcheckableType = /^(?:checkbox|radio)$/i;
  var rtagName = /<([\w:-]+)/;
  var rscriptType = /^$|\/(?:java|ecma)script/i;
  var wrapMap = {
    option: [1, "<select multiple='multiple'>", "</select>"],
    thead: [1, "<table>", "</table>"],
    col: [2, "<table><colgroup>", "</colgroup></table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: [0, "", ""],
  };
  wrapMap.optgroup = wrapMap.option;
  wrapMap.tbody =
    wrapMap.tfoot =
    wrapMap.colgroup =
    wrapMap.caption =
      wrapMap.thead;
  wrapMap.th = wrapMap.td;
  function getAll(context, tag) {
    var ret =
      typeof context.getElementsByTagName !== "undefined"
        ? context.getElementsByTagName(tag || "*")
        : typeof context.querySelectorAll !== "undefined"
        ? context.querySelectorAll(tag || "*")
        : [];
    return tag === undefined || (tag && jQuery.nodeName(context, tag))
      ? jQuery.merge([context], ret)
      : ret;
  }
  function setGlobalEval(elems, refElements) {
    var i = 0,
      l = elems.length;
    for (; i < l; i++) {
      dataPriv.set(
        elems[i],
        "globalEval",
        !refElements || dataPriv.get(refElements[i], "globalEval")
      );
    }
  }
  var rhtml = /<|&#?\w+;/;
  function buildFragment(elems, context, scripts, selection, ignored) {
    var elem,
      tmp,
      tag,
      wrap,
      contains,
      j,
      fragment = context.createDocumentFragment(),
      nodes = [],
      i = 0,
      l = elems.length;
    for (; i < l; i++) {
      elem = elems[i];
      if (elem || elem === 0) {
        if (jQuery.type(elem) === "object") {
          jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
        } else if (!rhtml.test(elem)) {
          nodes.push(context.createTextNode(elem));
        } else {
          tmp = tmp || fragment.appendChild(context.createElement("div"));
          tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
          wrap = wrapMap[tag] || wrapMap._default;
          tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];
          j = wrap[0];
          while (j--) {
            tmp = tmp.lastChild;
          }
          jQuery.merge(nodes, tmp.childNodes);
          tmp = fragment.firstChild;
          tmp.textContent = "";
        }
      }
    }
    fragment.textContent = "";
    i = 0;
    while ((elem = nodes[i++])) {
      if (selection && jQuery.inArray(elem, selection) > -1) {
        if (ignored) {
          ignored.push(elem);
        }
        continue;
      }
      contains = jQuery.contains(elem.ownerDocument, elem);
      tmp = getAll(fragment.appendChild(elem), "script");
      if (contains) {
        setGlobalEval(tmp);
      }
      if (scripts) {
        j = 0;
        while ((elem = tmp[j++])) {
          if (rscriptType.test(elem.type || "")) {
            scripts.push(elem);
          }
        }
      }
    }
    return fragment;
  }
  (function () {
    var fragment = document.createDocumentFragment(),
      div = fragment.appendChild(document.createElement("div")),
      input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("checked", "checked");
    input.setAttribute("name", "t");
    div.appendChild(input);
    support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
    div.innerHTML = "<textarea>x</textarea>";
    support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
  })();
  var rkeyEvent = /^key/,
    rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
    rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
  function returnTrue() {
    return true;
  }
  function returnFalse() {
    return false;
  }
  function safeActiveElement() {
    try {
      return document.activeElement;
    } catch (err) {}
  }
  function on(elem, types, selector, data, fn, one) {
    var origFn, type;
    if (typeof types === "object") {
      if (typeof selector !== "string") {
        data = data || selector;
        selector = undefined;
      }
      for (type in types) {
        on(elem, type, selector, data, types[type], one);
      }
      return elem;
    }
    if (data == null && fn == null) {
      fn = selector;
      data = selector = undefined;
    } else if (fn == null) {
      if (typeof selector === "string") {
        fn = data;
        data = undefined;
      } else {
        fn = data;
        data = selector;
        selector = undefined;
      }
    }
    if (fn === false) {
      fn = returnFalse;
    } else if (!fn) {
      return elem;
    }
    if (one === 1) {
      origFn = fn;
      fn = function (event) {
        jQuery().off(event);
        return origFn.apply(this, arguments);
      };
      fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
    }
    return elem.each(function () {
      jQuery.event.add(this, types, fn, data, selector);
    });
  }
  jQuery.event = {
    global: {},
    add: function (elem, types, handler, data, selector) {
      var handleObjIn,
        eventHandle,
        tmp,
        events,
        t,
        handleObj,
        special,
        handlers,
        type,
        namespaces,
        origType,
        elemData = dataPriv.get(elem);
      if (!elemData) {
        return;
      }
      if (handler.handler) {
        handleObjIn = handler;
        handler = handleObjIn.handler;
        selector = handleObjIn.selector;
      }
      if (!handler.guid) {
        handler.guid = jQuery.guid++;
      }
      if (!(events = elemData.events)) {
        events = elemData.events = {};
      }
      if (!(eventHandle = elemData.handle)) {
        eventHandle = elemData.handle = function (e) {
          return typeof jQuery !== "undefined" &&
            jQuery.event.triggered !== e.type
            ? jQuery.event.dispatch.apply(elem, arguments)
            : undefined;
        };
      }
      types = (types || "").match(rnotwhite) || [""];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort();
        if (!type) {
          continue;
        }
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        special = jQuery.event.special[type] || {};
        handleObj = jQuery.extend(
          {
            type: type,
            origType: origType,
            data: data,
            handler: handler,
            guid: handler.guid,
            selector: selector,
            needsContext:
              selector && jQuery.expr.match.needsContext.test(selector),
            namespace: namespaces.join("."),
          },
          handleObjIn
        );
        if (!(handlers = events[type])) {
          handlers = events[type] = [];
          handlers.delegateCount = 0;
          if (
            !special.setup ||
            special.setup.call(elem, data, namespaces, eventHandle) === false
          ) {
            if (elem.addEventListener) {
              elem.addEventListener(type, eventHandle);
            }
          }
        }
        if (special.add) {
          special.add.call(elem, handleObj);
          if (!handleObj.handler.guid) {
            handleObj.handler.guid = handler.guid;
          }
        }
        if (selector) {
          handlers.splice(handlers.delegateCount++, 0, handleObj);
        } else {
          handlers.push(handleObj);
        }
        jQuery.event.global[type] = true;
      }
    },
    remove: function (elem, types, handler, selector, mappedTypes) {
      var j,
        origCount,
        tmp,
        events,
        t,
        handleObj,
        special,
        handlers,
        type,
        namespaces,
        origType,
        elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
      if (!elemData || !(events = elemData.events)) {
        return;
      }
      types = (types || "").match(rnotwhite) || [""];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort();
        if (!type) {
          for (type in events) {
            jQuery.event.remove(elem, type + types[t], handler, selector, true);
          }
          continue;
        }
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        handlers = events[type] || [];
        tmp =
          tmp[2] &&
          new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
        origCount = j = handlers.length;
        while (j--) {
          handleObj = handlers[j];
          if (
            (mappedTypes || origType === handleObj.origType) &&
            (!handler || handler.guid === handleObj.guid) &&
            (!tmp || tmp.test(handleObj.namespace)) &&
            (!selector ||
              selector === handleObj.selector ||
              (selector === "**" && handleObj.selector))
          ) {
            handlers.splice(j, 1);
            if (handleObj.selector) {
              handlers.delegateCount--;
            }
            if (special.remove) {
              special.remove.call(elem, handleObj);
            }
          }
        }
        if (origCount && !handlers.length) {
          if (
            !special.teardown ||
            special.teardown.call(elem, namespaces, elemData.handle) === false
          ) {
            jQuery.removeEvent(elem, type, elemData.handle);
          }
          delete events[type];
        }
      }
      if (jQuery.isEmptyObject(events)) {
        dataPriv.remove(elem, "handle events");
      }
    },
    dispatch: function (event) {
      event = jQuery.event.fix(event);
      var i,
        j,
        ret,
        matched,
        handleObj,
        handlerQueue = [],
        args = slice.call(arguments),
        handlers = (dataPriv.get(this, "events") || {})[event.type] || [],
        special = jQuery.event.special[event.type] || {};
      args[0] = event;
      event.delegateTarget = this;
      if (
        special.preDispatch &&
        special.preDispatch.call(this, event) === false
      ) {
        return;
      }
      handlerQueue = jQuery.event.handlers.call(this, event, handlers);
      i = 0;
      while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
        event.currentTarget = matched.elem;
        j = 0;
        while (
          (handleObj = matched.handlers[j++]) &&
          !event.isImmediatePropagationStopped()
        ) {
          if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {
            event.handleObj = handleObj;
            event.data = handleObj.data;
            ret = (
              (jQuery.event.special[handleObj.origType] || {}).handle ||
              handleObj.handler
            ).apply(matched.elem, args);
            if (ret !== undefined) {
              if ((event.result = ret) === false) {
                event.preventDefault();
                event.stopPropagation();
              }
            }
          }
        }
      }
      if (special.postDispatch) {
        special.postDispatch.call(this, event);
      }
      return event.result;
    },
    handlers: function (event, handlers) {
      var i,
        matches,
        sel,
        handleObj,
        handlerQueue = [],
        delegateCount = handlers.delegateCount,
        cur = event.target;
      if (
        delegateCount &&
        cur.nodeType &&
        (event.type !== "click" || isNaN(event.button) || event.button < 1)
      ) {
        for (; cur !== this; cur = cur.parentNode || this) {
          if (
            cur.nodeType === 1 &&
            (cur.disabled !== true || event.type !== "click")
          ) {
            matches = [];
            for (i = 0; i < delegateCount; i++) {
              handleObj = handlers[i];
              sel = handleObj.selector + " ";
              if (matches[sel] === undefined) {
                matches[sel] = handleObj.needsContext
                  ? jQuery(sel, this).index(cur) > -1
                  : jQuery.find(sel, this, null, [cur]).length;
              }
              if (matches[sel]) {
                matches.push(handleObj);
              }
            }
            if (matches.length) {
              handlerQueue.push({ elem: cur, handlers: matches });
            }
          }
        }
      }
      if (delegateCount < handlers.length) {
        handlerQueue.push({
          elem: this,
          handlers: handlers.slice(delegateCount),
        });
      }
      return handlerQueue;
    },
    props: (
      "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
      "metaKey relatedTarget shiftKey target timeStamp view which"
    ).split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function (event, original) {
        if (event.which == null) {
          event.which =
            original.charCode != null ? original.charCode : original.keyCode;
        }
        return event;
      },
    },
    mouseHooks: {
      props: (
        "button buttons clientX clientY offsetX offsetY pageX pageY " +
        "screenX screenY toElement"
      ).split(" "),
      filter: function (event, original) {
        var eventDoc,
          doc,
          body,
          button = original.button;
        if (event.pageX == null && original.clientX != null) {
          eventDoc = event.target.ownerDocument || document;
          doc = eventDoc.documentElement;
          body = eventDoc.body;
          event.pageX =
            original.clientX +
            ((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0) -
            ((doc && doc.clientLeft) || (body && body.clientLeft) || 0);
          event.pageY =
            original.clientY +
            ((doc && doc.scrollTop) || (body && body.scrollTop) || 0) -
            ((doc && doc.clientTop) || (body && body.clientTop) || 0);
        }
        if (!event.which && button !== undefined) {
          event.which = button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;
        }
        return event;
      },
    },
    fix: function (event) {
      if (event[jQuery.expando]) {
        return event;
      }
      var i,
        prop,
        copy,
        type = event.type,
        originalEvent = event,
        fixHook = this.fixHooks[type];
      if (!fixHook) {
        this.fixHooks[type] = fixHook = rmouseEvent.test(type)
          ? this.mouseHooks
          : rkeyEvent.test(type)
          ? this.keyHooks
          : {};
      }
      copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
      event = new jQuery.Event(originalEvent);
      i = copy.length;
      while (i--) {
        prop = copy[i];
        event[prop] = originalEvent[prop];
      }
      if (!event.target) {
        event.target = document;
      }
      if (event.target.nodeType === 3) {
        event.target = event.target.parentNode;
      }
      return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
    },
    special: {
      load: { noBubble: true },
      focus: {
        trigger: function () {
          if (this !== safeActiveElement() && this.focus) {
            this.focus();
            return false;
          }
        },
        delegateType: "focusin",
      },
      blur: {
        trigger: function () {
          if (this === safeActiveElement() && this.blur) {
            this.blur();
            return false;
          }
        },
        delegateType: "focusout",
      },
      click: {
        trigger: function () {
          if (
            this.type === "checkbox" &&
            this.click &&
            jQuery.nodeName(this, "input")
          ) {
            this.click();
            return false;
          }
        },
        _default: function (event) {
          return jQuery.nodeName(event.target, "a");
        },
      },
      beforeunload: {
        postDispatch: function (event) {
          if (event.result !== undefined && event.originalEvent) {
            event.originalEvent.returnValue = event.result;
          }
        },
      },
    },
  };
  jQuery.removeEvent = function (elem, type, handle) {
    if (elem.removeEventListener) {
      elem.removeEventListener(type, handle);
    }
  };
  jQuery.Event = function (src, props) {
    if (!(this instanceof jQuery.Event)) {
      return new jQuery.Event(src, props);
    }
    if (src && src.type) {
      this.originalEvent = src;
      this.type = src.type;
      this.isDefaultPrevented =
        src.defaultPrevented ||
        (src.defaultPrevented === undefined && src.returnValue === false)
          ? returnTrue
          : returnFalse;
    } else {
      this.type = src;
    }
    if (props) {
      jQuery.extend(this, props);
    }
    this.timeStamp = (src && src.timeStamp) || jQuery.now();
    this[jQuery.expando] = true;
  };
  jQuery.Event.prototype = {
    constructor: jQuery.Event,
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    isImmediatePropagationStopped: returnFalse,
    isSimulated: false,
    preventDefault: function () {
      var e = this.originalEvent;
      this.isDefaultPrevented = returnTrue;
      if (e && !this.isSimulated) {
        e.preventDefault();
      }
    },
    stopPropagation: function () {
      var e = this.originalEvent;
      this.isPropagationStopped = returnTrue;
      if (e && !this.isSimulated) {
        e.stopPropagation();
      }
    },
    stopImmediatePropagation: function () {
      var e = this.originalEvent;
      this.isImmediatePropagationStopped = returnTrue;
      if (e && !this.isSimulated) {
        e.stopImmediatePropagation();
      }
      this.stopPropagation();
    },
  };
  jQuery.each(
    {
      mouseenter: "mouseover",
      mouseleave: "mouseout",
      pointerenter: "pointerover",
      pointerleave: "pointerout",
    },
    function (orig, fix) {
      jQuery.event.special[orig] = {
        delegateType: fix,
        bindType: fix,
        handle: function (event) {
          var ret,
            target = this,
            related = event.relatedTarget,
            handleObj = event.handleObj;
          if (
            !related ||
            (related !== target && !jQuery.contains(target, related))
          ) {
            event.type = handleObj.origType;
            ret = handleObj.handler.apply(this, arguments);
            event.type = fix;
          }
          return ret;
        },
      };
    }
  );
  jQuery.fn.extend({
    on: function (types, selector, data, fn) {
      return on(this, types, selector, data, fn);
    },
    one: function (types, selector, data, fn) {
      return on(this, types, selector, data, fn, 1);
    },
    off: function (types, selector, fn) {
      var handleObj, type;
      if (types && types.preventDefault && types.handleObj) {
        handleObj = types.handleObj;
        jQuery(types.delegateTarget).off(
          handleObj.namespace
            ? handleObj.origType + "." + handleObj.namespace
            : handleObj.origType,
          handleObj.selector,
          handleObj.handler
        );
        return this;
      }
      if (typeof types === "object") {
        for (type in types) {
          this.off(type, selector, types[type]);
        }
        return this;
      }
      if (selector === false || typeof selector === "function") {
        fn = selector;
        selector = undefined;
      }
      if (fn === false) {
        fn = returnFalse;
      }
      return this.each(function () {
        jQuery.event.remove(this, types, fn, selector);
      });
    },
  });
  var rxhtmlTag =
      /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
    rnoInnerhtml = /<script|<style|<link/i,
    rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
    rscriptTypeMasked = /^true\/(.*)/,
    rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
  function manipulationTarget(elem, content) {
    return jQuery.nodeName(elem, "table") &&
      jQuery.nodeName(
        content.nodeType !== 11 ? content : content.firstChild,
        "tr"
      )
      ? elem.getElementsByTagName("tbody")[0] ||
          elem.appendChild(elem.ownerDocument.createElement("tbody"))
      : elem;
  }
  function disableScript(elem) {
    elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
    return elem;
  }
  function restoreScript(elem) {
    var match = rscriptTypeMasked.exec(elem.type);
    if (match) {
      elem.type = match[1];
    } else {
      elem.removeAttribute("type");
    }
    return elem;
  }
  function cloneCopyEvent(src, dest) {
    var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
    if (dest.nodeType !== 1) {
      return;
    }
    if (dataPriv.hasData(src)) {
      pdataOld = dataPriv.access(src);
      pdataCur = dataPriv.set(dest, pdataOld);
      events = pdataOld.events;
      if (events) {
        delete pdataCur.handle;
        pdataCur.events = {};
        for (type in events) {
          for (i = 0, l = events[type].length; i < l; i++) {
            jQuery.event.add(dest, type, events[type][i]);
          }
        }
      }
    }
    if (dataUser.hasData(src)) {
      udataOld = dataUser.access(src);
      udataCur = jQuery.extend({}, udataOld);
      dataUser.set(dest, udataCur);
    }
  }
  function fixInput(src, dest) {
    var nodeName = dest.nodeName.toLowerCase();
    if (nodeName === "input" && rcheckableType.test(src.type)) {
      dest.checked = src.checked;
    } else if (nodeName === "input" || nodeName === "textarea") {
      dest.defaultValue = src.defaultValue;
    }
  }
  function domManip(collection, args, callback, ignored) {
    args = concat.apply([], args);
    var fragment,
      first,
      scripts,
      hasScripts,
      node,
      doc,
      i = 0,
      l = collection.length,
      iNoClone = l - 1,
      value = args[0],
      isFunction = jQuery.isFunction(value);
    if (
      isFunction ||
      (l > 1 &&
        typeof value === "string" &&
        !support.checkClone &&
        rchecked.test(value))
    ) {
      return collection.each(function (index) {
        var self = collection.eq(index);
        if (isFunction) {
          args[0] = value.call(this, index, self.html());
        }
        domManip(self, args, callback, ignored);
      });
    }
    if (l) {
      fragment = buildFragment(
        args,
        collection[0].ownerDocument,
        false,
        collection,
        ignored
      );
      first = fragment.firstChild;
      if (fragment.childNodes.length === 1) {
        fragment = first;
      }
      if (first || ignored) {
        scripts = jQuery.map(getAll(fragment, "script"), disableScript);
        hasScripts = scripts.length;
        for (; i < l; i++) {
          node = fragment;
          if (i !== iNoClone) {
            node = jQuery.clone(node, true, true);
            if (hasScripts) {
              jQuery.merge(scripts, getAll(node, "script"));
            }
          }
          callback.call(collection[i], node, i);
        }
        if (hasScripts) {
          doc = scripts[scripts.length - 1].ownerDocument;
          jQuery.map(scripts, restoreScript);
          for (i = 0; i < hasScripts; i++) {
            node = scripts[i];
            if (
              rscriptType.test(node.type || "") &&
              !dataPriv.access(node, "globalEval") &&
              jQuery.contains(doc, node)
            ) {
              if (node.src) {
                if (jQuery._evalUrl) {
                  jQuery._evalUrl(node.src);
                }
              } else {
                jQuery.globalEval(node.textContent.replace(rcleanScript, ""));
              }
            }
          }
        }
      }
    }
    return collection;
  }
  function remove(elem, selector, keepData) {
    var node,
      nodes = selector ? jQuery.filter(selector, elem) : elem,
      i = 0;
    for (; (node = nodes[i]) != null; i++) {
      if (!keepData && node.nodeType === 1) {
        jQuery.cleanData(getAll(node));
      }
      if (node.parentNode) {
        if (keepData && jQuery.contains(node.ownerDocument, node)) {
          setGlobalEval(getAll(node, "script"));
        }
        node.parentNode.removeChild(node);
      }
    }
    return elem;
  }
  jQuery.extend({
    htmlPrefilter: function (html) {
      return html.replace(rxhtmlTag, "<$1></$2>");
    },
    clone: function (elem, dataAndEvents, deepDataAndEvents) {
      var i,
        l,
        srcElements,
        destElements,
        clone = elem.cloneNode(true),
        inPage = jQuery.contains(elem.ownerDocument, elem);
      if (
        !support.noCloneChecked &&
        (elem.nodeType === 1 || elem.nodeType === 11) &&
        !jQuery.isXMLDoc(elem)
      ) {
        destElements = getAll(clone);
        srcElements = getAll(elem);
        for (i = 0, l = srcElements.length; i < l; i++) {
          fixInput(srcElements[i], destElements[i]);
        }
      }
      if (dataAndEvents) {
        if (deepDataAndEvents) {
          srcElements = srcElements || getAll(elem);
          destElements = destElements || getAll(clone);
          for (i = 0, l = srcElements.length; i < l; i++) {
            cloneCopyEvent(srcElements[i], destElements[i]);
          }
        } else {
          cloneCopyEvent(elem, clone);
        }
      }
      destElements = getAll(clone, "script");
      if (destElements.length > 0) {
        setGlobalEval(destElements, !inPage && getAll(elem, "script"));
      }
      return clone;
    },
    cleanData: function (elems) {
      var data,
        elem,
        type,
        special = jQuery.event.special,
        i = 0;
      for (; (elem = elems[i]) !== undefined; i++) {
        if (acceptData(elem)) {
          if ((data = elem[dataPriv.expando])) {
            if (data.events) {
              for (type in data.events) {
                if (special[type]) {
                  jQuery.event.remove(elem, type);
                } else {
                  jQuery.removeEvent(elem, type, data.handle);
                }
              }
            }
            elem[dataPriv.expando] = undefined;
          }
          if (elem[dataUser.expando]) {
            elem[dataUser.expando] = undefined;
          }
        }
      }
    },
  });
  jQuery.fn.extend({
    domManip: domManip,
    detach: function (selector) {
      return remove(this, selector, true);
    },
    remove: function (selector) {
      return remove(this, selector);
    },
    text: function (value) {
      return access(
        this,
        function (value) {
          return value === undefined
            ? jQuery.text(this)
            : this.empty().each(function () {
                if (
                  this.nodeType === 1 ||
                  this.nodeType === 11 ||
                  this.nodeType === 9
                ) {
                  this.textContent = value;
                }
              });
        },
        null,
        value,
        arguments.length
      );
    },
    append: function () {
      return domManip(this, arguments, function (elem) {
        if (
          this.nodeType === 1 ||
          this.nodeType === 11 ||
          this.nodeType === 9
        ) {
          var target = manipulationTarget(this, elem);
          target.appendChild(elem);
        }
      });
    },
    prepend: function () {
      return domManip(this, arguments, function (elem) {
        if (
          this.nodeType === 1 ||
          this.nodeType === 11 ||
          this.nodeType === 9
        ) {
          var target = manipulationTarget(this, elem);
          target.insertBefore(elem, target.firstChild);
        }
      });
    },
    before: function () {
      return domManip(this, arguments, function (elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this);
        }
      });
    },
    after: function () {
      return domManip(this, arguments, function (elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this.nextSibling);
        }
      });
    },
    empty: function () {
      var elem,
        i = 0;
      for (; (elem = this[i]) != null; i++) {
        if (elem.nodeType === 1) {
          jQuery.cleanData(getAll(elem, false));
          elem.textContent = "";
        }
      }
      return this;
    },
    clone: function (dataAndEvents, deepDataAndEvents) {
      dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
      deepDataAndEvents =
        deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
      return this.map(function () {
        return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
      });
    },
    html: function (value) {
      return access(
        this,
        function (value) {
          var elem = this[0] || {},
            i = 0,
            l = this.length;
          if (value === undefined && elem.nodeType === 1) {
            return elem.innerHTML;
          }
          if (
            typeof value === "string" &&
            !rnoInnerhtml.test(value) &&
            !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]
          ) {
            value = jQuery.htmlPrefilter(value);
            try {
              for (; i < l; i++) {
                elem = this[i] || {};
                if (elem.nodeType === 1) {
                  jQuery.cleanData(getAll(elem, false));
                  elem.innerHTML = value;
                }
              }
              elem = 0;
            } catch (e) {}
          }
          if (elem) {
            this.empty().append(value);
          }
        },
        null,
        value,
        arguments.length
      );
    },
    replaceWith: function () {
      var ignored = [];
      return domManip(
        this,
        arguments,
        function (elem) {
          var parent = this.parentNode;
          if (jQuery.inArray(this, ignored) < 0) {
            jQuery.cleanData(getAll(this));
            if (parent) {
              parent.replaceChild(elem, this);
            }
          }
        },
        ignored
      );
    },
  });
  jQuery.each(
    {
      appendTo: "append",
      prependTo: "prepend",
      insertBefore: "before",
      insertAfter: "after",
      replaceAll: "replaceWith",
    },
    function (name, original) {
      jQuery.fn[name] = function (selector) {
        var elems,
          ret = [],
          insert = jQuery(selector),
          last = insert.length - 1,
          i = 0;
        for (; i <= last; i++) {
          elems = i === last ? this : this.clone(true);
          jQuery(insert[i])[original](elems);
          push.apply(ret, elems.get());
        }
        return this.pushStack(ret);
      };
    }
  );
  var iframe,
    elemdisplay = { HTML: "block", BODY: "block" };
  function actualDisplay(name, doc) {
    var elem = jQuery(doc.createElement(name)).appendTo(doc.body),
      display = jQuery.css(elem[0], "display");
    elem.detach();
    return display;
  }
  function defaultDisplay(nodeName) {
    var doc = document,
      display = elemdisplay[nodeName];
    if (!display) {
      display = actualDisplay(nodeName, doc);
      if (display === "none" || !display) {
        iframe = (
          iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")
        ).appendTo(doc.documentElement);
        doc = iframe[0].contentDocument;
        doc.write();
        doc.close();
        display = actualDisplay(nodeName, doc);
        iframe.detach();
      }
      elemdisplay[nodeName] = display;
    }
    return display;
  }
  var rmargin = /^margin/;
  var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
  var getStyles = function (elem) {
    var view = elem.ownerDocument.defaultView;
    if (!view || !view.opener) {
      view = window;
    }
    return view.getComputedStyle(elem);
  };
  var swap = function (elem, options, callback, args) {
    var ret,
      name,
      old = {};
    for (name in options) {
      old[name] = elem.style[name];
      elem.style[name] = options[name];
    }
    ret = callback.apply(elem, args || []);
    for (name in options) {
      elem.style[name] = old[name];
    }
    return ret;
  };
  var documentElement = document.documentElement;
  (function () {
    var pixelPositionVal,
      boxSizingReliableVal,
      pixelMarginRightVal,
      reliableMarginLeftVal,
      container = document.createElement("div"),
      div = document.createElement("div");
    if (!div.style) {
      return;
    }
    div.style.backgroundClip = "content-box";
    div.cloneNode(true).style.backgroundClip = "";
    support.clearCloneStyle = div.style.backgroundClip === "content-box";
    container.style.cssText =
      "border:0;width:8px;height:0;top:0;left:-9999px;" +
      "padding:0;margin-top:1px;position:absolute";
    container.appendChild(div);
    function computeStyleTests() {
      div.style.cssText =
        "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
        "position:relative;display:block;" +
        "margin:auto;border:1px;padding:1px;" +
        "top:1%;width:50%";
      div.innerHTML = "";
      documentElement.appendChild(container);
      var divStyle = window.getComputedStyle(div);
      pixelPositionVal = divStyle.top !== "1%";
      reliableMarginLeftVal = divStyle.marginLeft === "2px";
      boxSizingReliableVal = divStyle.width === "4px";
      div.style.marginRight = "50%";
      pixelMarginRightVal = divStyle.marginRight === "4px";
      documentElement.removeChild(container);
    }
    jQuery.extend(support, {
      pixelPosition: function () {
        computeStyleTests();
        return pixelPositionVal;
      },
      boxSizingReliable: function () {
        if (boxSizingReliableVal == null) {
          computeStyleTests();
        }
        return boxSizingReliableVal;
      },
      pixelMarginRight: function () {
        if (boxSizingReliableVal == null) {
          computeStyleTests();
        }
        return pixelMarginRightVal;
      },
      reliableMarginLeft: function () {
        if (boxSizingReliableVal == null) {
          computeStyleTests();
        }
        return reliableMarginLeftVal;
      },
      reliableMarginRight: function () {
        var ret,
          marginDiv = div.appendChild(document.createElement("div"));
        marginDiv.style.cssText = div.style.cssText =
          "-webkit-box-sizing:content-box;box-sizing:content-box;" +
          "display:block;margin:0;border:0;padding:0";
        marginDiv.style.marginRight = marginDiv.style.width = "0";
        div.style.width = "1px";
        documentElement.appendChild(container);
        ret = !parseFloat(window.getComputedStyle(marginDiv).marginRight);
        documentElement.removeChild(container);
        div.removeChild(marginDiv);
        return ret;
      },
    });
  })();
  function curCSS(elem, name, computed) {
    var width,
      minWidth,
      maxWidth,
      ret,
      style = elem.style;
    computed = computed || getStyles(elem);
    ret = computed
      ? computed.getPropertyValue(name) || computed[name]
      : undefined;
    if (
      (ret === "" || ret === undefined) &&
      !jQuery.contains(elem.ownerDocument, elem)
    ) {
      ret = jQuery.style(elem, name);
    }
    if (computed) {
      if (
        !support.pixelMarginRight() &&
        rnumnonpx.test(ret) &&
        rmargin.test(name)
      ) {
        width = style.width;
        minWidth = style.minWidth;
        maxWidth = style.maxWidth;
        style.minWidth = style.maxWidth = style.width = ret;
        ret = computed.width;
        style.width = width;
        style.minWidth = minWidth;
        style.maxWidth = maxWidth;
      }
    }
    return ret !== undefined ? ret + "" : ret;
  }
  function addGetHookIf(conditionFn, hookFn) {
    return {
      get: function () {
        if (conditionFn()) {
          delete this.get;
          return;
        }
        return (this.get = hookFn).apply(this, arguments);
      },
    };
  }
  var rdisplayswap = /^(none|table(?!-c[ea]).+)/,
    cssShow = { position: "absolute", visibility: "hidden", display: "block" },
    cssNormalTransform = { letterSpacing: "0", fontWeight: "400" },
    cssPrefixes = ["Webkit", "O", "Moz", "ms"],
    emptyStyle = document.createElement("div").style;
  function vendorPropName(name) {
    if (name in emptyStyle) {
      return name;
    }
    var capName = name[0].toUpperCase() + name.slice(1),
      i = cssPrefixes.length;
    while (i--) {
      name = cssPrefixes[i] + capName;
      if (name in emptyStyle) {
        return name;
      }
    }
  }
  function setPositiveNumber(elem, value, subtract) {
    var matches = rcssNum.exec(value);
    return matches
      ? Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px")
      : value;
  }
  function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
    var i =
        extra === (isBorderBox ? "border" : "content")
          ? 4
          : name === "width"
          ? 1
          : 0,
      val = 0;
    for (; i < 4; i += 2) {
      if (extra === "margin") {
        val += jQuery.css(elem, extra + cssExpand[i], true, styles);
      }
      if (isBorderBox) {
        if (extra === "content") {
          val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        }
        if (extra !== "margin") {
          val -= jQuery.css(
            elem,
            "border" + cssExpand[i] + "Width",
            true,
            styles
          );
        }
      } else {
        val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        if (extra !== "padding") {
          val += jQuery.css(
            elem,
            "border" + cssExpand[i] + "Width",
            true,
            styles
          );
        }
      }
    }
    return val;
  }
  function getWidthOrHeight(elem, name, extra) {
    var valueIsBorderBox = true,
      val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
      styles = getStyles(elem),
      isBorderBox =
        jQuery.css(elem, "boxSizing", false, styles) === "border-box";
    if (val <= 0 || val == null) {
      val = curCSS(elem, name, styles);
      if (val < 0 || val == null) {
        val = elem.style[name];
      }
      if (rnumnonpx.test(val)) {
        return val;
      }
      valueIsBorderBox =
        isBorderBox &&
        (support.boxSizingReliable() || val === elem.style[name]);
      val = parseFloat(val) || 0;
    }
    return (
      val +
      augmentWidthOrHeight(
        elem,
        name,
        extra || (isBorderBox ? "border" : "content"),
        valueIsBorderBox,
        styles
      ) +
      "px"
    );
  }
  function showHide(elements, show) {
    var display,
      elem,
      hidden,
      values = [],
      index = 0,
      length = elements.length;
    for (; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }
      values[index] = dataPriv.get(elem, "olddisplay");
      display = elem.style.display;
      if (show) {
        if (!values[index] && display === "none") {
          elem.style.display = "";
        }
        if (elem.style.display === "" && isHidden(elem)) {
          values[index] = dataPriv.access(
            elem,
            "olddisplay",
            defaultDisplay(elem.nodeName)
          );
        }
      } else {
        hidden = isHidden(elem);
        if (display !== "none" || !hidden) {
          dataPriv.set(
            elem,
            "olddisplay",
            hidden ? display : jQuery.css(elem, "display")
          );
        }
      }
    }
    for (index = 0; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }
      if (!show || elem.style.display === "none" || elem.style.display === "") {
        elem.style.display = show ? values[index] || "" : "none";
      }
    }
    return elements;
  }
  jQuery.extend({
    cssHooks: {
      opacity: {
        get: function (elem, computed) {
          if (computed) {
            var ret = curCSS(elem, "opacity");
            return ret === "" ? "1" : ret;
          }
        },
      },
    },
    cssNumber: {
      animationIterationCount: true,
      columnCount: true,
      fillOpacity: true,
      flexGrow: true,
      flexShrink: true,
      fontWeight: true,
      lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      widows: true,
      zIndex: true,
      zoom: true,
    },
    cssProps: { float: "cssFloat" },
    style: function (elem, name, value, extra) {
      if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
        return;
      }
      var ret,
        type,
        hooks,
        origName = jQuery.camelCase(name),
        style = elem.style;
      name =
        jQuery.cssProps[origName] ||
        (jQuery.cssProps[origName] = vendorPropName(origName) || origName);
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
      if (value !== undefined) {
        type = typeof value;
        if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
          value = adjustCSS(elem, name, ret);
          type = "number";
        }
        if (value == null || value !== value) {
          return;
        }
        if (type === "number") {
          value += (ret && ret[3]) || (jQuery.cssNumber[origName] ? "" : "px");
        }
        if (
          !support.clearCloneStyle &&
          value === "" &&
          name.indexOf("background") === 0
        ) {
          style[name] = "inherit";
        }
        if (
          !hooks ||
          !("set" in hooks) ||
          (value = hooks.set(elem, value, extra)) !== undefined
        ) {
          style[name] = value;
        }
      } else {
        if (
          hooks &&
          "get" in hooks &&
          (ret = hooks.get(elem, false, extra)) !== undefined
        ) {
          return ret;
        }
        return style[name];
      }
    },
    css: function (elem, name, extra, styles) {
      var val,
        num,
        hooks,
        origName = jQuery.camelCase(name);
      name =
        jQuery.cssProps[origName] ||
        (jQuery.cssProps[origName] = vendorPropName(origName) || origName);
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
      if (hooks && "get" in hooks) {
        val = hooks.get(elem, true, extra);
      }
      if (val === undefined) {
        val = curCSS(elem, name, styles);
      }
      if (val === "normal" && name in cssNormalTransform) {
        val = cssNormalTransform[name];
      }
      if (extra === "" || extra) {
        num = parseFloat(val);
        return extra === true || isFinite(num) ? num || 0 : val;
      }
      return val;
    },
  });
  jQuery.each(["height", "width"], function (i, name) {
    jQuery.cssHooks[name] = {
      get: function (elem, computed, extra) {
        if (computed) {
          return rdisplayswap.test(jQuery.css(elem, "display")) &&
            elem.offsetWidth === 0
            ? swap(elem, cssShow, function () {
                return getWidthOrHeight(elem, name, extra);
              })
            : getWidthOrHeight(elem, name, extra);
        }
      },
      set: function (elem, value, extra) {
        var matches,
          styles = extra && getStyles(elem),
          subtract =
            extra &&
            augmentWidthOrHeight(
              elem,
              name,
              extra,
              jQuery.css(elem, "boxSizing", false, styles) === "border-box",
              styles
            );
        if (
          subtract &&
          (matches = rcssNum.exec(value)) &&
          (matches[3] || "px") !== "px"
        ) {
          elem.style[name] = value;
          value = jQuery.css(elem, name);
        }
        return setPositiveNumber(elem, value, subtract);
      },
    };
  });
  jQuery.cssHooks.marginLeft = addGetHookIf(
    support.reliableMarginLeft,
    function (elem, computed) {
      if (computed) {
        return (
          (parseFloat(curCSS(elem, "marginLeft")) ||
            elem.getBoundingClientRect().left -
              swap(elem, { marginLeft: 0 }, function () {
                return elem.getBoundingClientRect().left;
              })) + "px"
        );
      }
    }
  );
  jQuery.cssHooks.marginRight = addGetHookIf(
    support.reliableMarginRight,
    function (elem, computed) {
      if (computed) {
        return swap(elem, { display: "inline-block" }, curCSS, [
          elem,
          "marginRight",
        ]);
      }
    }
  );
  jQuery.each(
    { margin: "", padding: "", border: "Width" },
    function (prefix, suffix) {
      jQuery.cssHooks[prefix + suffix] = {
        expand: function (value) {
          var i = 0,
            expanded = {},
            parts = typeof value === "string" ? value.split(" ") : [value];
          for (; i < 4; i++) {
            expanded[prefix + cssExpand[i] + suffix] =
              parts[i] || parts[i - 2] || parts[0];
          }
          return expanded;
        },
      };
      if (!rmargin.test(prefix)) {
        jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
      }
    }
  );
  jQuery.fn.extend({
    css: function (name, value) {
      return access(
        this,
        function (elem, name, value) {
          var styles,
            len,
            map = {},
            i = 0;
          if (jQuery.isArray(name)) {
            styles = getStyles(elem);
            len = name.length;
            for (; i < len; i++) {
              map[name[i]] = jQuery.css(elem, name[i], false, styles);
            }
            return map;
          }
          return value !== undefined
            ? jQuery.style(elem, name, value)
            : jQuery.css(elem, name);
        },
        name,
        value,
        arguments.length > 1
      );
    },
    show: function () {
      return showHide(this, true);
    },
    hide: function () {
      return showHide(this);
    },
    toggle: function (state) {
      if (typeof state === "boolean") {
        return state ? this.show() : this.hide();
      }
      return this.each(function () {
        if (isHidden(this)) {
          jQuery(this).show();
        } else {
          jQuery(this).hide();
        }
      });
    },
  });
  function Tween(elem, options, prop, end, easing) {
    return new Tween.prototype.init(elem, options, prop, end, easing);
  }
  jQuery.Tween = Tween;
  Tween.prototype = {
    constructor: Tween,
    init: function (elem, options, prop, end, easing, unit) {
      this.elem = elem;
      this.prop = prop;
      this.easing = easing || jQuery.easing._default;
      this.options = options;
      this.start = this.now = this.cur();
      this.end = end;
      this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
    },
    cur: function () {
      var hooks = Tween.propHooks[this.prop];
      return hooks && hooks.get
        ? hooks.get(this)
        : Tween.propHooks._default.get(this);
    },
    run: function (percent) {
      var eased,
        hooks = Tween.propHooks[this.prop];
      if (this.options.duration) {
        this.pos = eased = jQuery.easing[this.easing](
          percent,
          this.options.duration * percent,
          0,
          1,
          this.options.duration
        );
      } else {
        this.pos = eased = percent;
      }
      this.now = (this.end - this.start) * eased + this.start;
      if (this.options.step) {
        this.options.step.call(this.elem, this.now, this);
      }
      if (hooks && hooks.set) {
        hooks.set(this);
      } else {
        Tween.propHooks._default.set(this);
      }
      return this;
    },
  };
  Tween.prototype.init.prototype = Tween.prototype;
  Tween.propHooks = {
    _default: {
      get: function (tween) {
        var result;
        if (
          tween.elem.nodeType !== 1 ||
          (tween.elem[tween.prop] != null &&
            tween.elem.style[tween.prop] == null)
        ) {
          return tween.elem[tween.prop];
        }
        result = jQuery.css(tween.elem, tween.prop, "");
        return !result || result === "auto" ? 0 : result;
      },
      set: function (tween) {
        if (jQuery.fx.step[tween.prop]) {
          jQuery.fx.step[tween.prop](tween);
        } else if (
          tween.elem.nodeType === 1 &&
          (tween.elem.style[jQuery.cssProps[tween.prop]] != null ||
            jQuery.cssHooks[tween.prop])
        ) {
          jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
        } else {
          tween.elem[tween.prop] = tween.now;
        }
      },
    },
  };
  Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
    set: function (tween) {
      if (tween.elem.nodeType && tween.elem.parentNode) {
        tween.elem[tween.prop] = tween.now;
      }
    },
  };
  jQuery.easing = {
    linear: function (p) {
      return p;
    },
    swing: function (p) {
      return 0.5 - Math.cos(p * Math.PI) / 2;
    },
    _default: "swing",
  };
  jQuery.fx = Tween.prototype.init;
  jQuery.fx.step = {};
  var fxNow,
    timerId,
    rfxtypes = /^(?:toggle|show|hide)$/,
    rrun = /queueHooks$/;
  function createFxNow() {
    window.setTimeout(function () {
      fxNow = undefined;
    });
    return (fxNow = jQuery.now());
  }
  function genFx(type, includeWidth) {
    var which,
      i = 0,
      attrs = { height: type };
    includeWidth = includeWidth ? 1 : 0;
    for (; i < 4; i += 2 - includeWidth) {
      which = cssExpand[i];
      attrs["margin" + which] = attrs["padding" + which] = type;
    }
    if (includeWidth) {
      attrs.opacity = attrs.width = type;
    }
    return attrs;
  }
  function createTween(value, prop, animation) {
    var tween,
      collection = (Animation.tweeners[prop] || []).concat(
        Animation.tweeners["*"]
      ),
      index = 0,
      length = collection.length;
    for (; index < length; index++) {
      if ((tween = collection[index].call(animation, prop, value))) {
        return tween;
      }
    }
  }
  function defaultPrefilter(elem, props, opts) {
    var prop,
      value,
      toggle,
      tween,
      hooks,
      oldfire,
      display,
      checkDisplay,
      anim = this,
      orig = {},
      style = elem.style,
      hidden = elem.nodeType && isHidden(elem),
      dataShow = dataPriv.get(elem, "fxshow");
    if (!opts.queue) {
      hooks = jQuery._queueHooks(elem, "fx");
      if (hooks.unqueued == null) {
        hooks.unqueued = 0;
        oldfire = hooks.empty.fire;
        hooks.empty.fire = function () {
          if (!hooks.unqueued) {
            oldfire();
          }
        };
      }
      hooks.unqueued++;
      anim.always(function () {
        anim.always(function () {
          hooks.unqueued--;
          if (!jQuery.queue(elem, "fx").length) {
            hooks.empty.fire();
          }
        });
      });
    }
    if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
      opts.overflow = [style.overflow, style.overflowX, style.overflowY];
      display = jQuery.css(elem, "display");
      checkDisplay =
        display === "none"
          ? dataPriv.get(elem, "olddisplay") || defaultDisplay(elem.nodeName)
          : display;
      if (checkDisplay === "inline" && jQuery.css(elem, "float") === "none") {
        style.display = "inline-block";
      }
    }
    if (opts.overflow) {
      style.overflow = "hidden";
      anim.always(function () {
        style.overflow = opts.overflow[0];
        style.overflowX = opts.overflow[1];
        style.overflowY = opts.overflow[2];
      });
    }
    for (prop in props) {
      value = props[prop];
      if (rfxtypes.exec(value)) {
        delete props[prop];
        toggle = toggle || value === "toggle";
        if (value === (hidden ? "hide" : "show")) {
          if (value === "show" && dataShow && dataShow[prop] !== undefined) {
            hidden = true;
          } else {
            continue;
          }
        }
        orig[prop] = (dataShow && dataShow[prop]) || jQuery.style(elem, prop);
      } else {
        display = undefined;
      }
    }
    if (!jQuery.isEmptyObject(orig)) {
      if (dataShow) {
        if ("hidden" in dataShow) {
          hidden = dataShow.hidden;
        }
      } else {
        dataShow = dataPriv.access(elem, "fxshow", {});
      }
      if (toggle) {
        dataShow.hidden = !hidden;
      }
      if (hidden) {
        jQuery(elem).show();
      } else {
        anim.done(function () {
          jQuery(elem).hide();
        });
      }
      anim.done(function () {
        var prop;
        dataPriv.remove(elem, "fxshow");
        for (prop in orig) {
          jQuery.style(elem, prop, orig[prop]);
        }
      });
      for (prop in orig) {
        tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
        if (!(prop in dataShow)) {
          dataShow[prop] = tween.start;
          if (hidden) {
            tween.end = tween.start;
            tween.start = prop === "width" || prop === "height" ? 1 : 0;
          }
        }
      }
    } else if (
      (display === "none" ? defaultDisplay(elem.nodeName) : display) ===
      "inline"
    ) {
      style.display = display;
    }
  }
  function propFilter(props, specialEasing) {
    var index, name, easing, value, hooks;
    for (index in props) {
      name = jQuery.camelCase(index);
      easing = specialEasing[name];
      value = props[index];
      if (jQuery.isArray(value)) {
        easing = value[1];
        value = props[index] = value[0];
      }
      if (index !== name) {
        props[name] = value;
        delete props[index];
      }
      hooks = jQuery.cssHooks[name];
      if (hooks && "expand" in hooks) {
        value = hooks.expand(value);
        delete props[name];
        for (index in value) {
          if (!(index in props)) {
            props[index] = value[index];
            specialEasing[index] = easing;
          }
        }
      } else {
        specialEasing[name] = easing;
      }
    }
  }
  function Animation(elem, properties, options) {
    var result,
      stopped,
      index = 0,
      length = Animation.prefilters.length,
      deferred = jQuery.Deferred().always(function () {
        delete tick.elem;
      }),
      tick = function () {
        if (stopped) {
          return false;
        }
        var currentTime = fxNow || createFxNow(),
          remaining = Math.max(
            0,
            animation.startTime + animation.duration - currentTime
          ),
          temp = remaining / animation.duration || 0,
          percent = 1 - temp,
          index = 0,
          length = animation.tweens.length;
        for (; index < length; index++) {
          animation.tweens[index].run(percent);
        }
        deferred.notifyWith(elem, [animation, percent, remaining]);
        if (percent < 1 && length) {
          return remaining;
        } else {
          deferred.resolveWith(elem, [animation]);
          return false;
        }
      },
      animation = deferred.promise({
        elem: elem,
        props: jQuery.extend({}, properties),
        opts: jQuery.extend(
          true,
          { specialEasing: {}, easing: jQuery.easing._default },
          options
        ),
        originalProperties: properties,
        originalOptions: options,
        startTime: fxNow || createFxNow(),
        duration: options.duration,
        tweens: [],
        createTween: function (prop, end) {
          var tween = jQuery.Tween(
            elem,
            animation.opts,
            prop,
            end,
            animation.opts.specialEasing[prop] || animation.opts.easing
          );
          animation.tweens.push(tween);
          return tween;
        },
        stop: function (gotoEnd) {
          var index = 0,
            length = gotoEnd ? animation.tweens.length : 0;
          if (stopped) {
            return this;
          }
          stopped = true;
          for (; index < length; index++) {
            animation.tweens[index].run(1);
          }
          if (gotoEnd) {
            deferred.notifyWith(elem, [animation, 1, 0]);
            deferred.resolveWith(elem, [animation, gotoEnd]);
          } else {
            deferred.rejectWith(elem, [animation, gotoEnd]);
          }
          return this;
        },
      }),
      props = animation.props;
    propFilter(props, animation.opts.specialEasing);
    for (; index < length; index++) {
      result = Animation.prefilters[index].call(
        animation,
        elem,
        props,
        animation.opts
      );
      if (result) {
        if (jQuery.isFunction(result.stop)) {
          jQuery._queueHooks(animation.elem, animation.opts.queue).stop =
            jQuery.proxy(result.stop, result);
        }
        return result;
      }
    }
    jQuery.map(props, createTween, animation);
    if (jQuery.isFunction(animation.opts.start)) {
      animation.opts.start.call(elem, animation);
    }
    jQuery.fx.timer(
      jQuery.extend(tick, {
        elem: elem,
        anim: animation,
        queue: animation.opts.queue,
      })
    );
    return animation
      .progress(animation.opts.progress)
      .done(animation.opts.done, animation.opts.complete)
      .fail(animation.opts.fail)
      .always(animation.opts.always);
  }
  jQuery.Animation = jQuery.extend(Animation, {
    tweeners: {
      "*": [
        function (prop, value) {
          var tween = this.createTween(prop, value);
          adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
          return tween;
        },
      ],
    },
    tweener: function (props, callback) {
      if (jQuery.isFunction(props)) {
        callback = props;
        props = ["*"];
      } else {
        props = props.match(rnotwhite);
      }
      var prop,
        index = 0,
        length = props.length;
      for (; index < length; index++) {
        prop = props[index];
        Animation.tweeners[prop] = Animation.tweeners[prop] || [];
        Animation.tweeners[prop].unshift(callback);
      }
    },
    prefilters: [defaultPrefilter],
    prefilter: function (callback, prepend) {
      if (prepend) {
        Animation.prefilters.unshift(callback);
      } else {
        Animation.prefilters.push(callback);
      }
    },
  });
  jQuery.speed = function (speed, easing, fn) {
    var opt =
      speed && typeof speed === "object"
        ? jQuery.extend({}, speed)
        : {
            complete:
              fn || (!fn && easing) || (jQuery.isFunction(speed) && speed),
            duration: speed,
            easing:
              (fn && easing) ||
              (easing && !jQuery.isFunction(easing) && easing),
          };
    opt.duration = jQuery.fx.off
      ? 0
      : typeof opt.duration === "number"
      ? opt.duration
      : opt.duration in jQuery.fx.speeds
      ? jQuery.fx.speeds[opt.duration]
      : jQuery.fx.speeds._default;
    if (opt.queue == null || opt.queue === true) {
      opt.queue = "fx";
    }
    opt.old = opt.complete;
    opt.complete = function () {
      if (jQuery.isFunction(opt.old)) {
        opt.old.call(this);
      }
      if (opt.queue) {
        jQuery.dequeue(this, opt.queue);
      }
    };
    return opt;
  };
  jQuery.fn.extend({
    fadeTo: function (speed, to, easing, callback) {
      return this.filter(isHidden)
        .css("opacity", 0)
        .show()
        .end()
        .animate({ opacity: to }, speed, easing, callback);
    },
    animate: function (prop, speed, easing, callback) {
      var empty = jQuery.isEmptyObject(prop),
        optall = jQuery.speed(speed, easing, callback),
        doAnimation = function () {
          var anim = Animation(this, jQuery.extend({}, prop), optall);
          if (empty || dataPriv.get(this, "finish")) {
            anim.stop(true);
          }
        };
      doAnimation.finish = doAnimation;
      return empty || optall.queue === false
        ? this.each(doAnimation)
        : this.queue(optall.queue, doAnimation);
    },
    stop: function (type, clearQueue, gotoEnd) {
      var stopQueue = function (hooks) {
        var stop = hooks.stop;
        delete hooks.stop;
        stop(gotoEnd);
      };
      if (typeof type !== "string") {
        gotoEnd = clearQueue;
        clearQueue = type;
        type = undefined;
      }
      if (clearQueue && type !== false) {
        this.queue(type || "fx", []);
      }
      return this.each(function () {
        var dequeue = true,
          index = type != null && type + "queueHooks",
          timers = jQuery.timers,
          data = dataPriv.get(this);
        if (index) {
          if (data[index] && data[index].stop) {
            stopQueue(data[index]);
          }
        } else {
          for (index in data) {
            if (data[index] && data[index].stop && rrun.test(index)) {
              stopQueue(data[index]);
            }
          }
        }
        for (index = timers.length; index--; ) {
          if (
            timers[index].elem === this &&
            (type == null || timers[index].queue === type)
          ) {
            timers[index].anim.stop(gotoEnd);
            dequeue = false;
            timers.splice(index, 1);
          }
        }
        if (dequeue || !gotoEnd) {
          jQuery.dequeue(this, type);
        }
      });
    },
    finish: function (type) {
      if (type !== false) {
        type = type || "fx";
      }
      return this.each(function () {
        var index,
          data = dataPriv.get(this),
          queue = data[type + "queue"],
          hooks = data[type + "queueHooks"],
          timers = jQuery.timers,
          length = queue ? queue.length : 0;
        data.finish = true;
        jQuery.queue(this, type, []);
        if (hooks && hooks.stop) {
          hooks.stop.call(this, true);
        }
        for (index = timers.length; index--; ) {
          if (timers[index].elem === this && timers[index].queue === type) {
            timers[index].anim.stop(true);
            timers.splice(index, 1);
          }
        }
        for (index = 0; index < length; index++) {
          if (queue[index] && queue[index].finish) {
            queue[index].finish.call(this);
          }
        }
        delete data.finish;
      });
    },
  });
  jQuery.each(["toggle", "show", "hide"], function (i, name) {
    var cssFn = jQuery.fn[name];
    jQuery.fn[name] = function (speed, easing, callback) {
      return speed == null || typeof speed === "boolean"
        ? cssFn.apply(this, arguments)
        : this.animate(genFx(name, true), speed, easing, callback);
    };
  });
  jQuery.each(
    {
      slideDown: genFx("show"),
      slideUp: genFx("hide"),
      slideToggle: genFx("toggle"),
      fadeIn: { opacity: "show" },
      fadeOut: { opacity: "hide" },
      fadeToggle: { opacity: "toggle" },
    },
    function (name, props) {
      jQuery.fn[name] = function (speed, easing, callback) {
        return this.animate(props, speed, easing, callback);
      };
    }
  );
  jQuery.timers = [];
  jQuery.fx.tick = function () {
    var timer,
      i = 0,
      timers = jQuery.timers;
    fxNow = jQuery.now();
    for (; i < timers.length; i++) {
      timer = timers[i];
      if (!timer() && timers[i] === timer) {
        timers.splice(i--, 1);
      }
    }
    if (!timers.length) {
      jQuery.fx.stop();
    }
    fxNow = undefined;
  };
  jQuery.fx.timer = function (timer) {
    jQuery.timers.push(timer);
    if (timer()) {
      jQuery.fx.start();
    } else {
      jQuery.timers.pop();
    }
  };
  jQuery.fx.interval = 13;
  jQuery.fx.start = function () {
    if (!timerId) {
      timerId = window.setInterval(jQuery.fx.tick, jQuery.fx.interval);
    }
  };
  jQuery.fx.stop = function () {
    window.clearInterval(timerId);
    timerId = null;
  };
  jQuery.fx.speeds = { slow: 600, fast: 200, _default: 400 };
  jQuery.fn.delay = function (time, type) {
    time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
    type = type || "fx";
    return this.queue(type, function (next, hooks) {
      var timeout = window.setTimeout(next, time);
      hooks.stop = function () {
        window.clearTimeout(timeout);
      };
    });
  };
  (function () {
    var input = document.createElement("input"),
      select = document.createElement("select"),
      opt = select.appendChild(document.createElement("option"));
    input.type = "checkbox";
    support.checkOn = input.value !== "";
    support.optSelected = opt.selected;
    select.disabled = true;
    support.optDisabled = !opt.disabled;
    input = document.createElement("input");
    input.value = "t";
    input.type = "radio";
    support.radioValue = input.value === "t";
  })();
  var boolHook,
    attrHandle = jQuery.expr.attrHandle;
  jQuery.fn.extend({
    attr: function (name, value) {
      return access(this, jQuery.attr, name, value, arguments.length > 1);
    },
    removeAttr: function (name) {
      return this.each(function () {
        jQuery.removeAttr(this, name);
      });
    },
  });
  jQuery.extend({
    attr: function (elem, name, value) {
      var ret,
        hooks,
        nType = elem.nodeType;
      if (nType === 3 || nType === 8 || nType === 2) {
        return;
      }
      if (typeof elem.getAttribute === "undefined") {
        return jQuery.prop(elem, name, value);
      }
      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        name = name.toLowerCase();
        hooks =
          jQuery.attrHooks[name] ||
          (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
      }
      if (value !== undefined) {
        if (value === null) {
          jQuery.removeAttr(elem, name);
          return;
        }
        if (
          hooks &&
          "set" in hooks &&
          (ret = hooks.set(elem, value, name)) !== undefined
        ) {
          return ret;
        }
        elem.setAttribute(name, value + "");
        return value;
      }
      if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      }
      ret = jQuery.find.attr(elem, name);
      return ret == null ? undefined : ret;
    },
    attrHooks: {
      type: {
        set: function (elem, value) {
          if (
            !support.radioValue &&
            value === "radio" &&
            jQuery.nodeName(elem, "input")
          ) {
            var val = elem.value;
            elem.setAttribute("type", value);
            if (val) {
              elem.value = val;
            }
            return value;
          }
        },
      },
    },
    removeAttr: function (elem, value) {
      var name,
        propName,
        i = 0,
        attrNames = value && value.match(rnotwhite);
      if (attrNames && elem.nodeType === 1) {
        while ((name = attrNames[i++])) {
          propName = jQuery.propFix[name] || name;
          if (jQuery.expr.match.bool.test(name)) {
            elem[propName] = false;
          }
          elem.removeAttribute(name);
        }
      }
    },
  });
  boolHook = {
    set: function (elem, value, name) {
      if (value === false) {
        jQuery.removeAttr(elem, name);
      } else {
        elem.setAttribute(name, name);
      }
      return name;
    },
  };
  jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
    var getter = attrHandle[name] || jQuery.find.attr;
    attrHandle[name] = function (elem, name, isXML) {
      var ret, handle;
      if (!isXML) {
        handle = attrHandle[name];
        attrHandle[name] = ret;
        ret = getter(elem, name, isXML) != null ? name.toLowerCase() : null;
        attrHandle[name] = handle;
      }
      return ret;
    };
  });
  var rfocusable = /^(?:input|select|textarea|button)$/i,
    rclickable = /^(?:a|area)$/i;
  jQuery.fn.extend({
    prop: function (name, value) {
      return access(this, jQuery.prop, name, value, arguments.length > 1);
    },
    removeProp: function (name) {
      return this.each(function () {
        delete this[jQuery.propFix[name] || name];
      });
    },
  });
  jQuery.extend({
    prop: function (elem, name, value) {
      var ret,
        hooks,
        nType = elem.nodeType;
      if (nType === 3 || nType === 8 || nType === 2) {
        return;
      }
      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        name = jQuery.propFix[name] || name;
        hooks = jQuery.propHooks[name];
      }
      if (value !== undefined) {
        if (
          hooks &&
          "set" in hooks &&
          (ret = hooks.set(elem, value, name)) !== undefined
        ) {
          return ret;
        }
        return (elem[name] = value);
      }
      if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      }
      return elem[name];
    },
    propHooks: {
      tabIndex: {
        get: function (elem) {
          var tabindex = jQuery.find.attr(elem, "tabindex");
          return tabindex
            ? parseInt(tabindex, 10)
            : rfocusable.test(elem.nodeName) ||
              (rclickable.test(elem.nodeName) && elem.href)
            ? 0
            : -1;
        },
      },
    },
    propFix: { for: "htmlFor", class: "className" },
  });
  if (!support.optSelected) {
    jQuery.propHooks.selected = {
      get: function (elem) {
        var parent = elem.parentNode;
        if (parent && parent.parentNode) {
          parent.parentNode.selectedIndex;
        }
        return null;
      },
      set: function (elem) {
        var parent = elem.parentNode;
        if (parent) {
          parent.selectedIndex;
          if (parent.parentNode) {
            parent.parentNode.selectedIndex;
          }
        }
      },
    };
  }
  jQuery.each(
    [
      "tabIndex",
      "readOnly",
      "maxLength",
      "cellSpacing",
      "cellPadding",
      "rowSpan",
      "colSpan",
      "useMap",
      "frameBorder",
      "contentEditable",
    ],
    function () {
      jQuery.propFix[this.toLowerCase()] = this;
    }
  );
  var rclass = /[\t\r\n\f]/g;
  function getClass(elem) {
    return (elem.getAttribute && elem.getAttribute("class")) || "";
  }
  jQuery.fn.extend({
    addClass: function (value) {
      var classes,
        elem,
        cur,
        curValue,
        clazz,
        j,
        finalValue,
        i = 0;
      if (jQuery.isFunction(value)) {
        return this.each(function (j) {
          jQuery(this).addClass(value.call(this, j, getClass(this)));
        });
      }
      if (typeof value === "string" && value) {
        classes = value.match(rnotwhite) || [];
        while ((elem = this[i++])) {
          curValue = getClass(elem);
          cur =
            elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");
          if (cur) {
            j = 0;
            while ((clazz = classes[j++])) {
              if (cur.indexOf(" " + clazz + " ") < 0) {
                cur += clazz + " ";
              }
            }
            finalValue = jQuery.trim(cur);
            if (curValue !== finalValue) {
              elem.setAttribute("class", finalValue);
            }
          }
        }
      }
      return this;
    },
    removeClass: function (value) {
      var classes,
        elem,
        cur,
        curValue,
        clazz,
        j,
        finalValue,
        i = 0;
      if (jQuery.isFunction(value)) {
        return this.each(function (j) {
          jQuery(this).removeClass(value.call(this, j, getClass(this)));
        });
      }
      if (!arguments.length) {
        return this.attr("class", "");
      }
      if (typeof value === "string" && value) {
        classes = value.match(rnotwhite) || [];
        while ((elem = this[i++])) {
          curValue = getClass(elem);
          cur =
            elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");
          if (cur) {
            j = 0;
            while ((clazz = classes[j++])) {
              while (cur.indexOf(" " + clazz + " ") > -1) {
                cur = cur.replace(" " + clazz + " ", " ");
              }
            }
            finalValue = jQuery.trim(cur);
            if (curValue !== finalValue) {
              elem.setAttribute("class", finalValue);
            }
          }
        }
      }
      return this;
    },
    toggleClass: function (value, stateVal) {
      var type = typeof value;
      if (typeof stateVal === "boolean" && type === "string") {
        return stateVal ? this.addClass(value) : this.removeClass(value);
      }
      if (jQuery.isFunction(value)) {
        return this.each(function (i) {
          jQuery(this).toggleClass(
            value.call(this, i, getClass(this), stateVal),
            stateVal
          );
        });
      }
      return this.each(function () {
        var className, i, self, classNames;
        if (type === "string") {
          i = 0;
          self = jQuery(this);
          classNames = value.match(rnotwhite) || [];
          while ((className = classNames[i++])) {
            if (self.hasClass(className)) {
              self.removeClass(className);
            } else {
              self.addClass(className);
            }
          }
        } else if (value === undefined || type === "boolean") {
          className = getClass(this);
          if (className) {
            dataPriv.set(this, "__className__", className);
          }
          if (this.setAttribute) {
            this.setAttribute(
              "class",
              className || value === false
                ? ""
                : dataPriv.get(this, "__className__") || ""
            );
          }
        }
      });
    },
    hasClass: function (selector) {
      var className,
        elem,
        i = 0;
      className = " " + selector + " ";
      while ((elem = this[i++])) {
        if (
          elem.nodeType === 1 &&
          (" " + getClass(elem) + " ").replace(rclass, " ").indexOf(className) >
            -1
        ) {
          return true;
        }
      }
      return false;
    },
  });
  var rreturn = /\r/g,
    rspaces = /[\x20\t\r\n\f]+/g;
  jQuery.fn.extend({
    val: function (value) {
      var hooks,
        ret,
        isFunction,
        elem = this[0];
      if (!arguments.length) {
        if (elem) {
          hooks =
            jQuery.valHooks[elem.type] ||
            jQuery.valHooks[elem.nodeName.toLowerCase()];
          if (
            hooks &&
            "get" in hooks &&
            (ret = hooks.get(elem, "value")) !== undefined
          ) {
            return ret;
          }
          ret = elem.value;
          return typeof ret === "string"
            ? ret.replace(rreturn, "")
            : ret == null
            ? ""
            : ret;
        }
        return;
      }
      isFunction = jQuery.isFunction(value);
      return this.each(function (i) {
        var val;
        if (this.nodeType !== 1) {
          return;
        }
        if (isFunction) {
          val = value.call(this, i, jQuery(this).val());
        } else {
          val = value;
        }
        if (val == null) {
          val = "";
        } else if (typeof val === "number") {
          val += "";
        } else if (jQuery.isArray(val)) {
          val = jQuery.map(val, function (value) {
            return value == null ? "" : value + "";
          });
        }
        hooks =
          jQuery.valHooks[this.type] ||
          jQuery.valHooks[this.nodeName.toLowerCase()];
        if (
          !hooks ||
          !("set" in hooks) ||
          hooks.set(this, val, "value") === undefined
        ) {
          this.value = val;
        }
      });
    },
  });
  jQuery.extend({
    valHooks: {
      option: {
        get: function (elem) {
          var val = jQuery.find.attr(elem, "value");
          return val != null
            ? val
            : jQuery.trim(jQuery.text(elem)).replace(rspaces, " ");
        },
      },
      select: {
        get: function (elem) {
          var value,
            option,
            options = elem.options,
            index = elem.selectedIndex,
            one = elem.type === "select-one" || index < 0,
            values = one ? null : [],
            max = one ? index + 1 : options.length,
            i = index < 0 ? max : one ? index : 0;
          for (; i < max; i++) {
            option = options[i];
            if (
              (option.selected || i === index) &&
              (support.optDisabled
                ? !option.disabled
                : option.getAttribute("disabled") === null) &&
              (!option.parentNode.disabled ||
                !jQuery.nodeName(option.parentNode, "optgroup"))
            ) {
              value = jQuery(option).val();
              if (one) {
                return value;
              }
              values.push(value);
            }
          }
          return values;
        },
        set: function (elem, value) {
          var optionSet,
            option,
            options = elem.options,
            values = jQuery.makeArray(value),
            i = options.length;
          while (i--) {
            option = options[i];
            if (
              (option.selected =
                jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1)
            ) {
              optionSet = true;
            }
          }
          if (!optionSet) {
            elem.selectedIndex = -1;
          }
          return values;
        },
      },
    },
  });
  jQuery.each(["radio", "checkbox"], function () {
    jQuery.valHooks[this] = {
      set: function (elem, value) {
        if (jQuery.isArray(value)) {
          return (elem.checked =
            jQuery.inArray(jQuery(elem).val(), value) > -1);
        }
      },
    };
    if (!support.checkOn) {
      jQuery.valHooks[this].get = function (elem) {
        return elem.getAttribute("value") === null ? "on" : elem.value;
      };
    }
  });
  var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
  jQuery.extend(jQuery.event, {
    trigger: function (event, data, elem, onlyHandlers) {
      var i,
        cur,
        tmp,
        bubbleType,
        ontype,
        handle,
        special,
        eventPath = [elem || document],
        type = hasOwn.call(event, "type") ? event.type : event,
        namespaces = hasOwn.call(event, "namespace")
          ? event.namespace.split(".")
          : [];
      cur = tmp = elem = elem || document;
      if (elem.nodeType === 3 || elem.nodeType === 8) {
        return;
      }
      if (rfocusMorph.test(type + jQuery.event.triggered)) {
        return;
      }
      if (type.indexOf(".") > -1) {
        namespaces = type.split(".");
        type = namespaces.shift();
        namespaces.sort();
      }
      ontype = type.indexOf(":") < 0 && "on" + type;
      event = event[jQuery.expando]
        ? event
        : new jQuery.Event(type, typeof event === "object" && event);
      event.isTrigger = onlyHandlers ? 2 : 3;
      event.namespace = namespaces.join(".");
      event.rnamespace = event.namespace
        ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)")
        : null;
      event.result = undefined;
      if (!event.target) {
        event.target = elem;
      }
      data = data == null ? [event] : jQuery.makeArray(data, [event]);
      special = jQuery.event.special[type] || {};
      if (
        !onlyHandlers &&
        special.trigger &&
        special.trigger.apply(elem, data) === false
      ) {
        return;
      }
      if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
        bubbleType = special.delegateType || type;
        if (!rfocusMorph.test(bubbleType + type)) {
          cur = cur.parentNode;
        }
        for (; cur; cur = cur.parentNode) {
          eventPath.push(cur);
          tmp = cur;
        }
        if (tmp === (elem.ownerDocument || document)) {
          eventPath.push(tmp.defaultView || tmp.parentWindow || window);
        }
      }
      i = 0;
      while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
        event.type = i > 1 ? bubbleType : special.bindType || type;
        handle =
          (dataPriv.get(cur, "events") || {})[event.type] &&
          dataPriv.get(cur, "handle");
        if (handle) {
          handle.apply(cur, data);
        }
        handle = ontype && cur[ontype];
        if (handle && handle.apply && acceptData(cur)) {
          event.result = handle.apply(cur, data);
          if (event.result === false) {
            event.preventDefault();
          }
        }
      }
      event.type = type;
      if (!onlyHandlers && !event.isDefaultPrevented()) {
        if (
          (!special._default ||
            special._default.apply(eventPath.pop(), data) === false) &&
          acceptData(elem)
        ) {
          if (
            ontype &&
            jQuery.isFunction(elem[type]) &&
            !jQuery.isWindow(elem)
          ) {
            tmp = elem[ontype];
            if (tmp) {
              elem[ontype] = null;
            }
            jQuery.event.triggered = type;
            elem[type]();
            jQuery.event.triggered = undefined;
            if (tmp) {
              elem[ontype] = tmp;
            }
          }
        }
      }
      return event.result;
    },
    simulate: function (type, elem, event) {
      var e = jQuery.extend(new jQuery.Event(), event, {
        type: type,
        isSimulated: true,
      });
      jQuery.event.trigger(e, null, elem);
    },
  });
  jQuery.fn.extend({
    trigger: function (type, data) {
      return this.each(function () {
        jQuery.event.trigger(type, data, this);
      });
    },
    triggerHandler: function (type, data) {
      var elem = this[0];
      if (elem) {
        return jQuery.event.trigger(type, data, elem, true);
      }
    },
  });
  jQuery.each(
    (
      "blur focus focusin focusout load resize scroll unload click dblclick " +
      "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
      "change select submit keydown keypress keyup error contextmenu"
    ).split(" "),
    function (i, name) {
      jQuery.fn[name] = function (data, fn) {
        return arguments.length > 0
          ? this.on(name, null, data, fn)
          : this.trigger(name);
      };
    }
  );
  jQuery.fn.extend({
    hover: function (fnOver, fnOut) {
      return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
    },
  });
  support.focusin = "onfocusin" in window;
  if (!support.focusin) {
    jQuery.each({ focus: "focusin", blur: "focusout" }, function (orig, fix) {
      var handler = function (event) {
        jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
      };
      jQuery.event.special[fix] = {
        setup: function () {
          var doc = this.ownerDocument || this,
            attaches = dataPriv.access(doc, fix);
          if (!attaches) {
            doc.addEventListener(orig, handler, true);
          }
          dataPriv.access(doc, fix, (attaches || 0) + 1);
        },
        teardown: function () {
          var doc = this.ownerDocument || this,
            attaches = dataPriv.access(doc, fix) - 1;
          if (!attaches) {
            doc.removeEventListener(orig, handler, true);
            dataPriv.remove(doc, fix);
          } else {
            dataPriv.access(doc, fix, attaches);
          }
        },
      };
    });
  }
  var location = window.location;
  var nonce = jQuery.now();
  var rquery = /\?/;
  jQuery.parseJSON = function (data) {
    return JSON.parse(data + "");
  };
  jQuery.parseXML = function (data) {
    var xml;
    if (!data || typeof data !== "string") {
      return null;
    }
    try {
      xml = new window.DOMParser().parseFromString(data, "text/xml");
    } catch (e) {
      xml = undefined;
    }
    if (!xml || xml.getElementsByTagName("parsererror").length) {
      jQuery.error("Invalid XML: " + data);
    }
    return xml;
  };
  var rhash = /#.*$/,
    rts = /([?&])_=[^&]*/,
    rheaders = /^(.*?):[ \t]*([^\r\n]*)$/gm,
    rlocalProtocol =
      /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    rnoContent = /^(?:GET|HEAD)$/,
    rprotocol = /^\/\//,
    prefilters = {},
    transports = {},
    allTypes = "*/".concat("*"),
    originAnchor = document.createElement("a");
  originAnchor.href = location.href;
  function addToPrefiltersOrTransports(structure) {
    return function (dataTypeExpression, func) {
      if (typeof dataTypeExpression !== "string") {
        func = dataTypeExpression;
        dataTypeExpression = "*";
      }
      var dataType,
        i = 0,
        dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
      if (jQuery.isFunction(func)) {
        while ((dataType = dataTypes[i++])) {
          if (dataType[0] === "+") {
            dataType = dataType.slice(1) || "*";
            (structure[dataType] = structure[dataType] || []).unshift(func);
          } else {
            (structure[dataType] = structure[dataType] || []).push(func);
          }
        }
      }
    };
  }
  function inspectPrefiltersOrTransports(
    structure,
    options,
    originalOptions,
    jqXHR
  ) {
    var inspected = {},
      seekingTransport = structure === transports;
    function inspect(dataType) {
      var selected;
      inspected[dataType] = true;
      jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
        var dataTypeOrTransport = prefilterOrFactory(
          options,
          originalOptions,
          jqXHR
        );
        if (
          typeof dataTypeOrTransport === "string" &&
          !seekingTransport &&
          !inspected[dataTypeOrTransport]
        ) {
          options.dataTypes.unshift(dataTypeOrTransport);
          inspect(dataTypeOrTransport);
          return false;
        } else if (seekingTransport) {
          return !(selected = dataTypeOrTransport);
        }
      });
      return selected;
    }
    return inspect(options.dataTypes[0]) || (!inspected["*"] && inspect("*"));
  }
  function ajaxExtend(target, src) {
    var key,
      deep,
      flatOptions = jQuery.ajaxSettings.flatOptions || {};
    for (key in src) {
      if (src[key] !== undefined) {
        (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
      }
    }
    if (deep) {
      jQuery.extend(true, target, deep);
    }
    return target;
  }
  function ajaxHandleResponses(s, jqXHR, responses) {
    var ct,
      type,
      finalDataType,
      firstDataType,
      contents = s.contents,
      dataTypes = s.dataTypes;
    while (dataTypes[0] === "*") {
      dataTypes.shift();
      if (ct === undefined) {
        ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
      }
    }
    if (ct) {
      for (type in contents) {
        if (contents[type] && contents[type].test(ct)) {
          dataTypes.unshift(type);
          break;
        }
      }
    }
    if (dataTypes[0] in responses) {
      finalDataType = dataTypes[0];
    } else {
      for (type in responses) {
        if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
          finalDataType = type;
          break;
        }
        if (!firstDataType) {
          firstDataType = type;
        }
      }
      finalDataType = finalDataType || firstDataType;
    }
    if (finalDataType) {
      if (finalDataType !== dataTypes[0]) {
        dataTypes.unshift(finalDataType);
      }
      return responses[finalDataType];
    }
  }
  function ajaxConvert(s, response, jqXHR, isSuccess) {
    var conv2,
      current,
      conv,
      tmp,
      prev,
      converters = {},
      dataTypes = s.dataTypes.slice();
    if (dataTypes[1]) {
      for (conv in s.converters) {
        converters[conv.toLowerCase()] = s.converters[conv];
      }
    }
    current = dataTypes.shift();
    while (current) {
      if (s.responseFields[current]) {
        jqXHR[s.responseFields[current]] = response;
      }
      if (!prev && isSuccess && s.dataFilter) {
        response = s.dataFilter(response, s.dataType);
      }
      prev = current;
      current = dataTypes.shift();
      if (current) {
        if (current === "*") {
          current = prev;
        } else if (prev !== "*" && prev !== current) {
          conv = converters[prev + " " + current] || converters["* " + current];
          if (!conv) {
            for (conv2 in converters) {
              tmp = conv2.split(" ");
              if (tmp[1] === current) {
                conv =
                  converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                if (conv) {
                  if (conv === true) {
                    conv = converters[conv2];
                  } else if (converters[conv2] !== true) {
                    current = tmp[0];
                    dataTypes.unshift(tmp[1]);
                  }
                  break;
                }
              }
            }
          }
          if (conv !== true) {
            if (conv && s.throws) {
              response = conv(response);
            } else {
              try {
                response = conv(response);
              } catch (e) {
                return {
                  state: "parsererror",
                  error: conv
                    ? e
                    : "No conversion from " + prev + " to " + current,
                };
              }
            }
          }
        }
      }
    }
    return { state: "success", data: response };
  }
  jQuery.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: location.href,
      type: "GET",
      isLocal: rlocalProtocol.test(location.protocol),
      global: true,
      processData: true,
      async: true,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": allTypes,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript",
      },
      contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON",
      },
      converters: {
        "* text": String,
        "text html": true,
        "text json": jQuery.parseJSON,
        "text xml": jQuery.parseXML,
      },
      flatOptions: { url: true, context: true },
    },
    ajaxSetup: function (target, settings) {
      return settings
        ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings)
        : ajaxExtend(jQuery.ajaxSettings, target);
    },
    ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
    ajaxTransport: addToPrefiltersOrTransports(transports),
    ajax: function (url, options) {
      if (typeof url === "object") {
        options = url;
        url = undefined;
      }
      options = options || {};
      var transport,
        cacheURL,
        responseHeadersString,
        responseHeaders,
        timeoutTimer,
        urlAnchor,
        fireGlobals,
        i,
        s = jQuery.ajaxSetup({}, options),
        callbackContext = s.context || s,
        globalEventContext =
          s.context && (callbackContext.nodeType || callbackContext.jquery)
            ? jQuery(callbackContext)
            : jQuery.event,
        deferred = jQuery.Deferred(),
        completeDeferred = jQuery.Callbacks("once memory"),
        statusCode = s.statusCode || {},
        requestHeaders = {},
        requestHeadersNames = {},
        state = 0,
        strAbort = "canceled",
        jqXHR = {
          readyState: 0,
          getResponseHeader: function (key) {
            var match;
            if (state === 2) {
              if (!responseHeaders) {
                responseHeaders = {};
                while ((match = rheaders.exec(responseHeadersString))) {
                  responseHeaders[match[1].toLowerCase()] = match[2];
                }
              }
              match = responseHeaders[key.toLowerCase()];
            }
            return match == null ? null : match;
          },
          getAllResponseHeaders: function () {
            return state === 2 ? responseHeadersString : null;
          },
          setRequestHeader: function (name, value) {
            var lname = name.toLowerCase();
            if (!state) {
              name = requestHeadersNames[lname] =
                requestHeadersNames[lname] || name;
              requestHeaders[name] = value;
            }
            return this;
          },
          overrideMimeType: function (type) {
            if (!state) {
              s.mimeType = type;
            }
            return this;
          },
          statusCode: function (map) {
            var code;
            if (map) {
              if (state < 2) {
                for (code in map) {
                  statusCode[code] = [statusCode[code], map[code]];
                }
              } else {
                jqXHR.always(map[jqXHR.status]);
              }
            }
            return this;
          },
          abort: function (statusText) {
            var finalText = statusText || strAbort;
            if (transport) {
              transport.abort(finalText);
            }
            done(0, finalText);
            return this;
          },
        };
      deferred.promise(jqXHR).complete = completeDeferred.add;
      jqXHR.success = jqXHR.done;
      jqXHR.error = jqXHR.fail;
      s.url = ((url || s.url || location.href) + "")
        .replace(rhash, "")
        .replace(rprotocol, location.protocol + "//");
      s.type = options.method || options.type || s.method || s.type;
      s.dataTypes = jQuery
        .trim(s.dataType || "*")
        .toLowerCase()
        .match(rnotwhite) || [""];
      if (s.crossDomain == null) {
        urlAnchor = document.createElement("a");
        try {
          urlAnchor.href = s.url;
          urlAnchor.href = urlAnchor.href;
          s.crossDomain =
            originAnchor.protocol + "//" + originAnchor.host !==
            urlAnchor.protocol + "//" + urlAnchor.host;
        } catch (e) {
          s.crossDomain = true;
        }
      }
      if (s.data && s.processData && typeof s.data !== "string") {
        s.data = jQuery.param(s.data, s.traditional);
      }
      inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
      if (state === 2) {
        return jqXHR;
      }
      fireGlobals = jQuery.event && s.global;
      if (fireGlobals && jQuery.active++ === 0) {
        jQuery.event.trigger("ajaxStart");
      }
      s.type = s.type.toUpperCase();
      s.hasContent = !rnoContent.test(s.type);
      cacheURL = s.url;
      if (!s.hasContent) {
        if (s.data) {
          cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data;
          delete s.data;
        }
        if (s.cache === false) {
          s.url = rts.test(cacheURL)
            ? cacheURL.replace(rts, "$1_=" + nonce++)
            : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
        }
      }
      if (s.ifModified) {
        if (jQuery.lastModified[cacheURL]) {
          jqXHR.setRequestHeader(
            "If-Modified-Since",
            jQuery.lastModified[cacheURL]
          );
        }
        if (jQuery.etag[cacheURL]) {
          jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
        }
      }
      if (
        (s.data && s.hasContent && s.contentType !== false) ||
        options.contentType
      ) {
        jqXHR.setRequestHeader("Content-Type", s.contentType);
      }
      jqXHR.setRequestHeader(
        "Accept",
        s.dataTypes[0] && s.accepts[s.dataTypes[0]]
          ? s.accepts[s.dataTypes[0]] +
              (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "")
          : s.accepts["*"]
      );
      for (i in s.headers) {
        jqXHR.setRequestHeader(i, s.headers[i]);
      }
      if (
        s.beforeSend &&
        (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)
      ) {
        return jqXHR.abort();
      }
      strAbort = "abort";
      for (i in { success: 1, error: 1, complete: 1 }) {
        jqXHR[i](s[i]);
      }
      transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
      if (!transport) {
        done(-1, "No Transport");
      } else {
        jqXHR.readyState = 1;
        if (fireGlobals) {
          globalEventContext.trigger("ajaxSend", [jqXHR, s]);
        }
        if (state === 2) {
          return jqXHR;
        }
        if (s.async && s.timeout > 0) {
          timeoutTimer = window.setTimeout(function () {
            jqXHR.abort("timeout");
          }, s.timeout);
        }
        try {
          state = 1;
          transport.send(requestHeaders, done);
        } catch (e) {
          if (state < 2) {
            done(-1, e);
          } else {
            throw e;
          }
        }
      }
      function done(status, nativeStatusText, responses, headers) {
        var isSuccess,
          success,
          error,
          response,
          modified,
          statusText = nativeStatusText;
        if (state === 2) {
          return;
        }
        state = 2;
        if (timeoutTimer) {
          window.clearTimeout(timeoutTimer);
        }
        transport = undefined;
        responseHeadersString = headers || "";
        jqXHR.readyState = status > 0 ? 4 : 0;
        isSuccess = (status >= 200 && status < 300) || status === 304;
        if (responses) {
          response = ajaxHandleResponses(s, jqXHR, responses);
        }
        response = ajaxConvert(s, response, jqXHR, isSuccess);
        if (isSuccess) {
          if (s.ifModified) {
            modified = jqXHR.getResponseHeader("Last-Modified");
            if (modified) {
              jQuery.lastModified[cacheURL] = modified;
            }
            modified = jqXHR.getResponseHeader("etag");
            if (modified) {
              jQuery.etag[cacheURL] = modified;
            }
          }
          if (status === 204 || s.type === "HEAD") {
            statusText = "nocontent";
          } else if (status === 304) {
            statusText = "notmodified";
          } else {
            statusText = response.state;
            success = response.data;
            error = response.error;
            isSuccess = !error;
          }
        } else {
          error = statusText;
          if (status || !statusText) {
            statusText = "error";
            if (status < 0) {
              status = 0;
            }
          }
        }
        jqXHR.status = status;
        jqXHR.statusText = (nativeStatusText || statusText) + "";
        if (isSuccess) {
          deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
        } else {
          deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
        }
        jqXHR.statusCode(statusCode);
        statusCode = undefined;
        if (fireGlobals) {
          globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [
            jqXHR,
            s,
            isSuccess ? success : error,
          ]);
        }
        completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
        if (fireGlobals) {
          globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
          if (!--jQuery.active) {
            jQuery.event.trigger("ajaxStop");
          }
        }
      }
      return jqXHR;
    },
    getJSON: function (url, data, callback) {
      return jQuery.get(url, data, callback, "json");
    },
    getScript: function (url, callback) {
      return jQuery.get(url, undefined, callback, "script");
    },
  });
  jQuery.each(["get", "post"], function (i, method) {
    jQuery[method] = function (url, data, callback, type) {
      if (jQuery.isFunction(data)) {
        type = type || callback;
        callback = data;
        data = undefined;
      }
      return jQuery.ajax(
        jQuery.extend(
          {
            url: url,
            type: method,
            dataType: type,
            data: data,
            success: callback,
          },
          jQuery.isPlainObject(url) && url
        )
      );
    };
  });
  jQuery._evalUrl = function (url) {
    return jQuery.ajax({
      url: url,
      type: "GET",
      dataType: "script",
      async: false,
      global: false,
      throws: true,
    });
  };
  jQuery.fn.extend({
    wrapAll: function (html) {
      var wrap;
      if (jQuery.isFunction(html)) {
        return this.each(function (i) {
          jQuery(this).wrapAll(html.call(this, i));
        });
      }
      if (this[0]) {
        wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
        if (this[0].parentNode) {
          wrap.insertBefore(this[0]);
        }
        wrap
          .map(function () {
            var elem = this;
            while (elem.firstElementChild) {
              elem = elem.firstElementChild;
            }
            return elem;
          })
          .append(this);
      }
      return this;
    },
    wrapInner: function (html) {
      if (jQuery.isFunction(html)) {
        return this.each(function (i) {
          jQuery(this).wrapInner(html.call(this, i));
        });
      }
      return this.each(function () {
        var self = jQuery(this),
          contents = self.contents();
        if (contents.length) {
          contents.wrapAll(html);
        } else {
          self.append(html);
        }
      });
    },
    wrap: function (html) {
      var isFunction = jQuery.isFunction(html);
      return this.each(function (i) {
        jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
      });
    },
    unwrap: function () {
      return this.parent()
        .each(function () {
          if (!jQuery.nodeName(this, "body")) {
            jQuery(this).replaceWith(this.childNodes);
          }
        })
        .end();
    },
  });
  jQuery.expr.filters.hidden = function (elem) {
    return !jQuery.expr.filters.visible(elem);
  };
  jQuery.expr.filters.visible = function (elem) {
    return (
      elem.offsetWidth > 0 ||
      elem.offsetHeight > 0 ||
      elem.getClientRects().length > 0
    );
  };
  var r20 = /%20/g,
    rbracket = /\[\]$/,
    rCRLF = /\r?\n/g,
    rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
    rsubmittable = /^(?:input|select|textarea|keygen)/i;
  function buildParams(prefix, obj, traditional, add) {
    var name;
    if (jQuery.isArray(obj)) {
      jQuery.each(obj, function (i, v) {
        if (traditional || rbracket.test(prefix)) {
          add(prefix, v);
        } else {
          buildParams(
            prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]",
            v,
            traditional,
            add
          );
        }
      });
    } else if (!traditional && jQuery.type(obj) === "object") {
      for (name in obj) {
        buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
      }
    } else {
      add(prefix, obj);
    }
  }
  jQuery.param = function (a, traditional) {
    var prefix,
      s = [],
      add = function (key, value) {
        value = jQuery.isFunction(value) ? value() : value == null ? "" : value;
        s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
      };
    if (traditional === undefined) {
      traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
    }
    if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
      jQuery.each(a, function () {
        add(this.name, this.value);
      });
    } else {
      for (prefix in a) {
        buildParams(prefix, a[prefix], traditional, add);
      }
    }
    return s.join("&").replace(r20, "+");
  };
  jQuery.fn.extend({
    serialize: function () {
      return jQuery.param(this.serializeArray());
    },
    serializeArray: function () {
      return this.map(function () {
        var elements = jQuery.prop(this, "elements");
        return elements ? jQuery.makeArray(elements) : this;
      })
        .filter(function () {
          var type = this.type;
          return (
            this.name &&
            !jQuery(this).is(":disabled") &&
            rsubmittable.test(this.nodeName) &&
            !rsubmitterTypes.test(type) &&
            (this.checked || !rcheckableType.test(type))
          );
        })
        .map(function (i, elem) {
          var val = jQuery(this).val();
          return val == null
            ? null
            : jQuery.isArray(val)
            ? jQuery.map(val, function (val) {
                return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
              })
            : { name: elem.name, value: val.replace(rCRLF, "\r\n") };
        })
        .get();
    },
  });
  jQuery.ajaxSettings.xhr = function () {
    try {
      return new window.XMLHttpRequest();
    } catch (e) {}
  };
  var xhrSuccessStatus = { 0: 200, 1223: 204 },
    xhrSupported = jQuery.ajaxSettings.xhr();
  support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
  support.ajax = xhrSupported = !!xhrSupported;
  jQuery.ajaxTransport(function (options) {
    var callback, errorCallback;
    if (support.cors || (xhrSupported && !options.crossDomain)) {
      return {
        send: function (headers, complete) {
          var i,
            xhr = options.xhr();
          xhr.open(
            options.type,
            options.url,
            options.async,
            options.username,
            options.password
          );
          if (options.xhrFields) {
            for (i in options.xhrFields) {
              xhr[i] = options.xhrFields[i];
            }
          }
          if (options.mimeType && xhr.overrideMimeType) {
            xhr.overrideMimeType(options.mimeType);
          }
          if (!options.crossDomain && !headers["X-Requested-With"]) {
            headers["X-Requested-With"] = "XMLHttpRequest";
          }
          for (i in headers) {
            xhr.setRequestHeader(i, headers[i]);
          }
          callback = function (type) {
            return function () {
              if (callback) {
                callback =
                  errorCallback =
                  xhr.onload =
                  xhr.onerror =
                  xhr.onabort =
                  xhr.onreadystatechange =
                    null;
                if (type === "abort") {
                  xhr.abort();
                } else if (type === "error") {
                  if (typeof xhr.status !== "number") {
                    complete(0, "error");
                  } else {
                    complete(xhr.status, xhr.statusText);
                  }
                } else {
                  complete(
                    xhrSuccessStatus[xhr.status] || xhr.status,
                    xhr.statusText,
                    (xhr.responseType || "text") !== "text" ||
                      typeof xhr.responseText !== "string"
                      ? { binary: xhr.response }
                      : { text: xhr.responseText },
                    xhr.getAllResponseHeaders()
                  );
                }
              }
            };
          };
          xhr.onload = callback();
          errorCallback = xhr.onerror = callback("error");
          if (xhr.onabort !== undefined) {
            xhr.onabort = errorCallback;
          } else {
            xhr.onreadystatechange = function () {
              if (xhr.readyState === 4) {
                window.setTimeout(function () {
                  if (callback) {
                    errorCallback();
                  }
                });
              }
            };
          }
          callback = callback("abort");
          try {
            xhr.send((options.hasContent && options.data) || null);
          } catch (e) {
            if (callback) {
              throw e;
            }
          }
        },
        abort: function () {
          if (callback) {
            callback();
          }
        },
      };
    }
  });
  jQuery.ajaxSetup({
    accepts: {
      script:
        "text/javascript, application/javascript, " +
        "application/ecmascript, application/x-ecmascript",
    },
    contents: { script: /\b(?:java|ecma)script\b/ },
    converters: {
      "text script": function (text) {
        jQuery.globalEval(text);
        return text;
      },
    },
  });
  jQuery.ajaxPrefilter("script", function (s) {
    if (s.cache === undefined) {
      s.cache = false;
    }
    if (s.crossDomain) {
      s.type = "GET";
    }
  });
  jQuery.ajaxTransport("script", function (s) {
    if (s.crossDomain) {
      var script, callback;
      return {
        send: function (_, complete) {
          script = jQuery("<script>")
            .prop({ charset: s.scriptCharset, src: s.url })
            .on(
              "load error",
              (callback = function (evt) {
                script.remove();
                callback = null;
                if (evt) {
                  complete(evt.type === "error" ? 404 : 200, evt.type);
                }
              })
            );
          document.head.appendChild(script[0]);
        },
        abort: function () {
          if (callback) {
            callback();
          }
        },
      };
    }
  });
  var oldCallbacks = [],
    rjsonp = /(=)\?(?=&|$)|\?\?/;
  jQuery.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function () {
      var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
      this[callback] = true;
      return callback;
    },
  });
  jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {
    var callbackName,
      overwritten,
      responseContainer,
      jsonProp =
        s.jsonp !== false &&
        (rjsonp.test(s.url)
          ? "url"
          : typeof s.data === "string" &&
            (s.contentType || "").indexOf(
              "application/x-www-form-urlencoded"
            ) === 0 &&
            rjsonp.test(s.data) &&
            "data");
    if (jsonProp || s.dataTypes[0] === "jsonp") {
      callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback)
        ? s.jsonpCallback()
        : s.jsonpCallback;
      if (jsonProp) {
        s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
      } else if (s.jsonp !== false) {
        s.url +=
          (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
      }
      s.converters["script json"] = function () {
        if (!responseContainer) {
          jQuery.error(callbackName + " was not called");
        }
        return responseContainer[0];
      };
      s.dataTypes[0] = "json";
      overwritten = window[callbackName];
      window[callbackName] = function () {
        responseContainer = arguments;
      };
      jqXHR.always(function () {
        if (overwritten === undefined) {
          jQuery(window).removeProp(callbackName);
        } else {
          window[callbackName] = overwritten;
        }
        if (s[callbackName]) {
          s.jsonpCallback = originalSettings.jsonpCallback;
          oldCallbacks.push(callbackName);
        }
        if (responseContainer && jQuery.isFunction(overwritten)) {
          overwritten(responseContainer[0]);
        }
        responseContainer = overwritten = undefined;
      });
      return "script";
    }
  });
  jQuery.parseHTML = function (data, context, keepScripts) {
    if (!data || typeof data !== "string") {
      return null;
    }
    if (typeof context === "boolean") {
      keepScripts = context;
      context = false;
    }
    context = context || document;
    var parsed = rsingleTag.exec(data),
      scripts = !keepScripts && [];
    if (parsed) {
      return [context.createElement(parsed[1])];
    }
    parsed = buildFragment([data], context, scripts);
    if (scripts && scripts.length) {
      jQuery(scripts).remove();
    }
    return jQuery.merge([], parsed.childNodes);
  };
  var _load = jQuery.fn.load;
  jQuery.fn.load = function (url, params, callback) {
    if (typeof url !== "string" && _load) {
      return _load.apply(this, arguments);
    }
    var selector,
      type,
      response,
      self = this,
      off = url.indexOf(" ");
    if (off > -1) {
      selector = jQuery.trim(url.slice(off));
      url = url.slice(0, off);
    }
    if (jQuery.isFunction(params)) {
      callback = params;
      params = undefined;
    } else if (params && typeof params === "object") {
      type = "POST";
    }
    if (self.length > 0) {
      jQuery
        .ajax({ url: url, type: type || "GET", dataType: "html", data: params })
        .done(function (responseText) {
          response = arguments;
          self.html(
            selector
              ? jQuery("<div>")
                  .append(jQuery.parseHTML(responseText))
                  .find(selector)
              : responseText
          );
        })
        .always(
          callback &&
            function (jqXHR, status) {
              self.each(function () {
                callback.apply(
                  this,
                  response || [jqXHR.responseText, status, jqXHR]
                );
              });
            }
        );
    }
    return this;
  };
  jQuery.each(
    [
      "ajaxStart",
      "ajaxStop",
      "ajaxComplete",
      "ajaxError",
      "ajaxSuccess",
      "ajaxSend",
    ],
    function (i, type) {
      jQuery.fn[type] = function (fn) {
        return this.on(type, fn);
      };
    }
  );
  jQuery.expr.filters.animated = function (elem) {
    return jQuery.grep(jQuery.timers, function (fn) {
      return elem === fn.elem;
    }).length;
  };
  function getWindow(elem) {
    return jQuery.isWindow(elem)
      ? elem
      : elem.nodeType === 9 && elem.defaultView;
  }
  jQuery.offset = {
    setOffset: function (elem, options, i) {
      var curPosition,
        curLeft,
        curCSSTop,
        curTop,
        curOffset,
        curCSSLeft,
        calculatePosition,
        position = jQuery.css(elem, "position"),
        curElem = jQuery(elem),
        props = {};
      if (position === "static") {
        elem.style.position = "relative";
      }
      curOffset = curElem.offset();
      curCSSTop = jQuery.css(elem, "top");
      curCSSLeft = jQuery.css(elem, "left");
      calculatePosition =
        (position === "absolute" || position === "fixed") &&
        (curCSSTop + curCSSLeft).indexOf("auto") > -1;
      if (calculatePosition) {
        curPosition = curElem.position();
        curTop = curPosition.top;
        curLeft = curPosition.left;
      } else {
        curTop = parseFloat(curCSSTop) || 0;
        curLeft = parseFloat(curCSSLeft) || 0;
      }
      if (jQuery.isFunction(options)) {
        options = options.call(elem, i, jQuery.extend({}, curOffset));
      }
      if (options.top != null) {
        props.top = options.top - curOffset.top + curTop;
      }
      if (options.left != null) {
        props.left = options.left - curOffset.left + curLeft;
      }
      if ("using" in options) {
        options.using.call(elem, props);
      } else {
        curElem.css(props);
      }
    },
  };
  jQuery.fn.extend({
    offset: function (options) {
      if (arguments.length) {
        return options === undefined
          ? this
          : this.each(function (i) {
              jQuery.offset.setOffset(this, options, i);
            });
      }
      var docElem,
        win,
        elem = this[0],
        box = { top: 0, left: 0 },
        doc = elem && elem.ownerDocument;
      if (!doc) {
        return;
      }
      docElem = doc.documentElement;
      if (!jQuery.contains(docElem, elem)) {
        return box;
      }
      box = elem.getBoundingClientRect();
      win = getWindow(doc);
      return {
        top: box.top + win.pageYOffset - docElem.clientTop,
        left: box.left + win.pageXOffset - docElem.clientLeft,
      };
    },
    position: function () {
      if (!this[0]) {
        return;
      }
      var offsetParent,
        offset,
        elem = this[0],
        parentOffset = { top: 0, left: 0 };
      if (jQuery.css(elem, "position") === "fixed") {
        offset = elem.getBoundingClientRect();
      } else {
        offsetParent = this.offsetParent();
        offset = this.offset();
        if (!jQuery.nodeName(offsetParent[0], "html")) {
          parentOffset = offsetParent.offset();
        }
        parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
        parentOffset.left += jQuery.css(
          offsetParent[0],
          "borderLeftWidth",
          true
        );
      }
      return {
        top:
          offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
        left:
          offset.left -
          parentOffset.left -
          jQuery.css(elem, "marginLeft", true),
      };
    },
    offsetParent: function () {
      return this.map(function () {
        var offsetParent = this.offsetParent;
        while (
          offsetParent &&
          jQuery.css(offsetParent, "position") === "static"
        ) {
          offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || documentElement;
      });
    },
  });
  jQuery.each(
    { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
    function (method, prop) {
      var top = "pageYOffset" === prop;
      jQuery.fn[method] = function (val) {
        return access(
          this,
          function (elem, method, val) {
            var win = getWindow(elem);
            if (val === undefined) {
              return win ? win[prop] : elem[method];
            }
            if (win) {
              win.scrollTo(
                !top ? val : win.pageXOffset,
                top ? val : win.pageYOffset
              );
            } else {
              elem[method] = val;
            }
          },
          method,
          val,
          arguments.length
        );
      };
    }
  );
  jQuery.each(["top", "left"], function (i, prop) {
    jQuery.cssHooks[prop] = addGetHookIf(
      support.pixelPosition,
      function (elem, computed) {
        if (computed) {
          computed = curCSS(elem, prop);
          return rnumnonpx.test(computed)
            ? jQuery(elem).position()[prop] + "px"
            : computed;
        }
      }
    );
  });
  jQuery.each({ Height: "height", Width: "width" }, function (name, type) {
    jQuery.each(
      { padding: "inner" + name, content: type, "": "outer" + name },
      function (defaultExtra, funcName) {
        jQuery.fn[funcName] = function (margin, value) {
          var chainable =
              arguments.length && (defaultExtra || typeof margin !== "boolean"),
            extra =
              defaultExtra ||
              (margin === true || value === true ? "margin" : "border");
          return access(
            this,
            function (elem, type, value) {
              var doc;
              if (jQuery.isWindow(elem)) {
                return elem.document.documentElement["client" + name];
              }
              if (elem.nodeType === 9) {
                doc = elem.documentElement;
                return Math.max(
                  elem.body["scroll" + name],
                  doc["scroll" + name],
                  elem.body["offset" + name],
                  doc["offset" + name],
                  doc["client" + name]
                );
              }
              return value === undefined
                ? jQuery.css(elem, type, extra)
                : jQuery.style(elem, type, value, extra);
            },
            type,
            chainable ? margin : undefined,
            chainable,
            null
          );
        };
      }
    );
  });
  jQuery.fn.extend({
    bind: function (types, data, fn) {
      return this.on(types, null, data, fn);
    },
    unbind: function (types, fn) {
      return this.off(types, null, fn);
    },
    delegate: function (selector, types, data, fn) {
      return this.on(types, selector, data, fn);
    },
    undelegate: function (selector, types, fn) {
      return arguments.length === 1
        ? this.off(selector, "**")
        : this.off(types, selector || "**", fn);
    },
    size: function () {
      return this.length;
    },
  });
  jQuery.fn.andSelf = jQuery.fn.addBack;
  if (typeof define === "function" && define.amd) {
    define("jquery", [], function () {
      return jQuery;
    });
  }
  var _jQuery = window.jQuery,
    _$ = window.$;
  jQuery.noConflict = function (deep) {
    if (window.$ === jQuery) {
      window.$ = _$;
    }
    if (deep && window.jQuery === jQuery) {
      window.jQuery = _jQuery;
    }
    return jQuery;
  };
  if (!noGlobal) {
    window.jQuery = window.$ = jQuery;
  }
  return jQuery;
});
window.yii = (function ($) {
  var pub = {
    reloadableScripts: [],
    clickableSelector:
      'a, button, input[type="submit"], input[type="button"], input[type="reset"], ' +
      'input[type="image"]',
    changeableSelector: "select, input, textarea",
    getCsrfParam: function () {
      return $("meta[name=csrf-param]").attr("content");
    },
    getCsrfToken: function () {
      return $("meta[name=csrf-token]").attr("content");
    },
    setCsrfToken: function (name, value) {
      $("meta[name=csrf-param]").attr("content", name);
      $("meta[name=csrf-token]").attr("content", value);
    },
    refreshCsrfToken: function () {
      var token = pub.getCsrfToken();
      if (token) {
        $('form input[name="' + pub.getCsrfParam() + '"]').val(token);
      }
    },
    confirm: function (message, ok, cancel) {
      if (window.confirm(message)) {
        !ok || ok();
      } else {
        !cancel || cancel();
      }
    },
    handleAction: function ($e, event) {
      var $form = $e.attr("data-form")
          ? $("#" + $e.attr("data-form"))
          : $e.closest("form"),
        method =
          !$e.data("method") && $form
            ? $form.attr("method")
            : $e.data("method"),
        action = $e.attr("href"),
        isValidAction = action && action !== "#",
        params = $e.data("params"),
        areValidParams = params && $.isPlainObject(params),
        pjax = $e.data("pjax"),
        usePjax = pjax !== undefined && pjax !== 0 && $.support.pjax,
        pjaxContainer,
        pjaxOptions = {};
      if (usePjax) {
        pjaxContainer =
          $e.data("pjax-container") || $e.closest("[data-pjax-container]");
        if (!pjaxContainer.length) {
          pjaxContainer = $("body");
        }
        pjaxOptions = {
          container: pjaxContainer,
          push: !!$e.data("pjax-push-state"),
          replace: !!$e.data("pjax-replace-state"),
          scrollTo: $e.data("pjax-scrollto"),
          pushRedirect: $e.data("pjax-push-redirect"),
          replaceRedirect: $e.data("pjax-replace-redirect"),
          skipOuterContainers: $e.data("pjax-skip-outer-containers"),
          timeout: $e.data("pjax-timeout"),
          originalEvent: event,
          originalTarget: $e,
        };
      }
      if (method === undefined) {
        if (isValidAction) {
          usePjax
            ? $.pjax.click(event, pjaxOptions)
            : window.location.assign(action);
        } else if ($e.is(":submit") && $form.length) {
          if (usePjax) {
            $form.on("submit", function (e) {
              $.pjax.submit(e, pjaxOptions);
            });
          }
          $form.trigger("submit");
        }
        return;
      }
      var oldMethod,
        oldAction,
        newForm = !$form.length;
      if (!newForm) {
        oldMethod = $form.attr("method");
        $form.attr("method", method);
        if (isValidAction) {
          oldAction = $form.attr("action");
          $form.attr("action", action);
        }
      } else {
        if (!isValidAction) {
          action = pub.getCurrentUrl();
        }
        $form = $("<form/>", { method: method, action: action });
        var target = $e.attr("target");
        if (target) {
          $form.attr("target", target);
        }
        if (!/(get|post)/i.test(method)) {
          $form.append(
            $("<input/>", { name: "_method", value: method, type: "hidden" })
          );
          method = "post";
          $form.attr("method", method);
        }
        if (/post/i.test(method)) {
          var csrfParam = pub.getCsrfParam();
          if (csrfParam) {
            $form.append(
              $("<input/>", {
                name: csrfParam,
                value: pub.getCsrfToken(),
                type: "hidden",
              })
            );
          }
        }
        $form.hide().appendTo("body");
      }
      var activeFormData = $form.data("yiiActiveForm");
      if (activeFormData) {
        activeFormData.submitObject = $e;
      }
      if (areValidParams) {
        $.each(params, function (name, value) {
          $form.append(
            $("<input/>").attr({ name: name, value: value, type: "hidden" })
          );
        });
      }
      if (usePjax) {
        $form.on("submit", function (e) {
          $.pjax.submit(e, pjaxOptions);
        });
      }
      $form.trigger("submit");
      $.when($form.data("yiiSubmitFinalizePromise")).then(function () {
        if (newForm) {
          $form.remove();
          return;
        }
        if (oldAction !== undefined) {
          $form.attr("action", oldAction);
        }
        $form.attr("method", oldMethod);
        if (areValidParams) {
          $.each(params, function (name) {
            $('input[name="' + name + '"]', $form).remove();
          });
        }
      });
    },
    getQueryParams: function (url) {
      var pos = url.indexOf("?");
      if (pos < 0) {
        return {};
      }
      var pairs = $.grep(
        url
          .substring(pos + 1)
          .split("#")[0]
          .split("&"),
        function (value) {
          return value !== "";
        }
      );
      var params = {};
      for (var i = 0, len = pairs.length; i < len; i++) {
        var pair = pairs[i].split("=");
        var name = decodeURIComponent(pair[0].replace(/\+/g, "%20"));
        var value = decodeURIComponent(pair[1].replace(/\+/g, "%20"));
        if (!name.length) {
          continue;
        }
        if (params[name] === undefined) {
          params[name] = value || "";
        } else {
          if (!$.isArray(params[name])) {
            params[name] = [params[name]];
          }
          params[name].push(value || "");
        }
      }
      return params;
    },
    initModule: function (module) {
      if (module.isActive !== undefined && !module.isActive) {
        return;
      }
      if ($.isFunction(module.init)) {
        module.init();
      }
      $.each(module, function () {
        if ($.isPlainObject(this)) {
          pub.initModule(this);
        }
      });
    },
    init: function () {
      initCsrfHandler();
      initRedirectHandler();
      initAssetFilters();
      initDataMethods();
    },
    getBaseCurrentUrl: function () {
      return window.location.protocol + "//" + window.location.host;
    },
    getCurrentUrl: function () {
      return window.location.href;
    },
  };
  function initCsrfHandler() {
    $.ajaxPrefilter(function (options, originalOptions, xhr) {
      if (!options.crossDomain && pub.getCsrfParam()) {
        xhr.setRequestHeader("X-CSRF-Token", pub.getCsrfToken());
      }
    });
    pub.refreshCsrfToken();
  }
  function initRedirectHandler() {
    $(document).ajaxComplete(function (event, xhr) {
      var url = xhr && xhr.getResponseHeader("X-Redirect");
      if (url) {
        window.location.assign(url);
      }
    });
  }
  function initAssetFilters() {
    var loadedScripts = {};
    $("script[src]").each(function () {
      var url = getAbsoluteUrl(this.src);
      loadedScripts[url] = true;
    });
    $.ajaxPrefilter("script", function (options, originalOptions, xhr) {
      if (options.dataType == "jsonp") {
        return;
      }
      var url = getAbsoluteUrl(options.url),
        forbiddenRepeatedLoad =
          loadedScripts[url] === true && !isReloadableAsset(url),
        cleanupRunning =
          loadedScripts[url] !== undefined &&
          loadedScripts[url]["xhrDone"] === true;
      if (forbiddenRepeatedLoad || cleanupRunning) {
        xhr.abort();
        return;
      }
      if (loadedScripts[url] === undefined || loadedScripts[url] === true) {
        loadedScripts[url] = { xhrList: [], xhrDone: false };
      }
      xhr
        .done(function (data, textStatus, jqXHR) {
          if (loadedScripts[jqXHR.yiiUrl]["xhrDone"] === true) {
            return;
          }
          loadedScripts[jqXHR.yiiUrl]["xhrDone"] = true;
          for (
            var i = 0, len = loadedScripts[jqXHR.yiiUrl]["xhrList"].length;
            i < len;
            i++
          ) {
            var singleXhr = loadedScripts[jqXHR.yiiUrl]["xhrList"][i];
            if (singleXhr && singleXhr.readyState !== XMLHttpRequest.DONE) {
              singleXhr.abort();
            }
          }
          loadedScripts[jqXHR.yiiUrl] = true;
        })
        .fail(function (jqXHR, textStatus) {
          if (textStatus === "abort") {
            return;
          }
          delete loadedScripts[jqXHR.yiiUrl]["xhrList"][jqXHR.yiiIndex];
          var allFailed = true;
          for (
            var i = 0, len = loadedScripts[jqXHR.yiiUrl]["xhrList"].length;
            i < len;
            i++
          ) {
            if (loadedScripts[jqXHR.yiiUrl]["xhrList"][i]) {
              allFailed = false;
            }
          }
          if (allFailed) {
            delete loadedScripts[jqXHR.yiiUrl];
          }
        });
      xhr.yiiIndex = loadedScripts[url]["xhrList"].length;
      xhr.yiiUrl = url;
      loadedScripts[url]["xhrList"][xhr.yiiIndex] = xhr;
    });
    $(document).ajaxComplete(function () {
      var styleSheets = [];
      $("link[rel=stylesheet]").each(function () {
        var url = getAbsoluteUrl(this.href);
        if (isReloadableAsset(url)) {
          return;
        }
        $.inArray(url, styleSheets) === -1
          ? styleSheets.push(url)
          : $(this).remove();
      });
    });
  }
  function initDataMethods() {
    var handler = function (event) {
      var $this = $(this),
        method = $this.data("method"),
        message = $this.data("confirm"),
        form = $this.data("form");
      if (method === undefined && message === undefined && form === undefined) {
        return true;
      }
      if (message !== undefined) {
        $.proxy(pub.confirm, this)(message, function () {
          pub.handleAction($this, event);
        });
      } else {
        pub.handleAction($this, event);
      }
      event.stopImmediatePropagation();
      return false;
    };
    $(document)
      .on("click.yii", pub.clickableSelector, handler)
      .on("change.yii", pub.changeableSelector, handler);
  }
  function isReloadableAsset(url) {
    for (var i = 0; i < pub.reloadableScripts.length; i++) {
      var rule = getAbsoluteUrl(pub.reloadableScripts[i]);
      var match = new RegExp(
        "^" + escapeRegExp(rule).split("\\*").join(".+") + "$"
      ).test(url);
      if (match === true) {
        return true;
      }
    }
    return false;
  }
  function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  }
  function getAbsoluteUrl(url) {
    return url.charAt(0) === "/" ? pub.getBaseCurrentUrl() + url : url;
  }
  return pub;
})(window.jQuery);
window.jQuery(function () {
  window.yii.initModule(window.yii);
});
/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */
if (typeof jQuery === "undefined") {
  throw new Error("Bootstrap's JavaScript requires jQuery");
}
+(function ($) {
  "use strict";
  var version = $.fn.jquery.split(" ")[0].split(".");
  if (
    (version[0] < 2 && version[1] < 9) ||
    (version[0] == 1 && version[1] == 9 && version[2] < 1) ||
    version[0] > 3
  ) {
    throw new Error(
      "Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4"
    );
  }
})(jQuery);
+(function ($) {
  "use strict";
  function transitionEnd() {
    var el = document.createElement("bootstrap");
    var transEndEventNames = {
      WebkitTransition: "webkitTransitionEnd",
      MozTransition: "transitionend",
      OTransition: "oTransitionEnd otransitionend",
      transition: "transitionend",
    };
    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] };
      }
    }
    return false;
  }
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false;
    var $el = this;
    $(this).one("bsTransitionEnd", function () {
      called = true;
    });
    var callback = function () {
      if (!called) $($el).trigger($.support.transition.end);
    };
    setTimeout(callback, duration);
    return this;
  };
  $(function () {
    $.support.transition = transitionEnd();
    if (!$.support.transition) return;
    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this))
          return e.handleObj.handler.apply(this, arguments);
      },
    };
  });
})(jQuery);
+(function ($) {
  "use strict";
  var dismiss = '[data-dismiss="alert"]';
  var Alert = function (el) {
    $(el).on("click", dismiss, this.close);
  };
  Alert.VERSION = "3.3.7";
  Alert.TRANSITION_DURATION = 150;
  Alert.prototype.close = function (e) {
    var $this = $(this);
    var selector = $this.attr("data-target");
    if (!selector) {
      selector = $this.attr("href");
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "");
    }
    var $parent = $(selector === "#" ? [] : selector);
    if (e) e.preventDefault();
    if (!$parent.length) {
      $parent = $this.closest(".alert");
    }
    $parent.trigger((e = $.Event("close.bs.alert")));
    if (e.isDefaultPrevented()) return;
    $parent.removeClass("in");
    function removeElement() {
      $parent.detach().trigger("closed.bs.alert").remove();
    }
    $.support.transition && $parent.hasClass("fade")
      ? $parent
          .one("bsTransitionEnd", removeElement)
          .emulateTransitionEnd(Alert.TRANSITION_DURATION)
      : removeElement();
  };
  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data("bs.alert");
      if (!data) $this.data("bs.alert", (data = new Alert(this)));
      if (typeof option == "string") data[option].call($this);
    });
  }
  var old = $.fn.alert;
  $.fn.alert = Plugin;
  $.fn.alert.Constructor = Alert;
  $.fn.alert.noConflict = function () {
    $.fn.alert = old;
    return this;
  };
  $(document).on("click.bs.alert.data-api", dismiss, Alert.prototype.close);
})(jQuery);
+(function ($) {
  "use strict";
  var Button = function (element, options) {
    this.$element = $(element);
    this.options = $.extend({}, Button.DEFAULTS, options);
    this.isLoading = false;
  };
  Button.VERSION = "3.3.7";
  Button.DEFAULTS = { loadingText: "loading..." };
  Button.prototype.setState = function (state) {
    var d = "disabled";
    var $el = this.$element;
    var val = $el.is("input") ? "val" : "html";
    var data = $el.data();
    state += "Text";
    if (data.resetText == null) $el.data("resetText", $el[val]());
    setTimeout(
      $.proxy(function () {
        $el[val](data[state] == null ? this.options[state] : data[state]);
        if (state == "loadingText") {
          this.isLoading = true;
          $el.addClass(d).attr(d, d).prop(d, true);
        } else if (this.isLoading) {
          this.isLoading = false;
          $el.removeClass(d).removeAttr(d).prop(d, false);
        }
      }, this),
      0
    );
  };
  Button.prototype.toggle = function () {
    var changed = true;
    var $parent = this.$element.closest('[data-toggle="buttons"]');
    if ($parent.length) {
      var $input = this.$element.find("input");
      if ($input.prop("type") == "radio") {
        if ($input.prop("checked")) changed = false;
        $parent.find(".active").removeClass("active");
        this.$element.addClass("active");
      } else if ($input.prop("type") == "checkbox") {
        if ($input.prop("checked") !== this.$element.hasClass("active"))
          changed = false;
        this.$element.toggleClass("active");
      }
      $input.prop("checked", this.$element.hasClass("active"));
      if (changed) $input.trigger("change");
    } else {
      this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
      this.$element.toggleClass("active");
    }
  };
  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data("bs.button");
      var options = typeof option == "object" && option;
      if (!data) $this.data("bs.button", (data = new Button(this, options)));
      if (option == "toggle") data.toggle();
      else if (option) data.setState(option);
    });
  }
  var old = $.fn.button;
  $.fn.button = Plugin;
  $.fn.button.Constructor = Button;
  $.fn.button.noConflict = function () {
    $.fn.button = old;
    return this;
  };
  $(document)
    .on("click.bs.button.data-api", '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest(".btn");
      Plugin.call($btn, "toggle");
      if (!$(e.target).is('input[type="radio"], input[type="checkbox"]')) {
        e.preventDefault();
        if ($btn.is("input,button")) $btn.trigger("focus");
        else $btn.find("input:visible,button:visible").first().trigger("focus");
      }
    })
    .on(
      "focus.bs.button.data-api blur.bs.button.data-api",
      '[data-toggle^="button"]',
      function (e) {
        $(e.target)
          .closest(".btn")
          .toggleClass("focus", /^focus(in)?$/.test(e.type));
      }
    );
})(jQuery);
+(function ($) {
  "use strict";
  var Carousel = function (element, options) {
    this.$element = $(element);
    this.$indicators = this.$element.find(".carousel-indicators");
    this.options = options;
    this.paused = null;
    this.sliding = null;
    this.interval = null;
    this.$active = null;
    this.$items = null;
    this.options.keyboard &&
      this.$element.on("keydown.bs.carousel", $.proxy(this.keydown, this));
    this.options.pause == "hover" &&
      !("ontouchstart" in document.documentElement) &&
      this.$element
        .on("mouseenter.bs.carousel", $.proxy(this.pause, this))
        .on("mouseleave.bs.carousel", $.proxy(this.cycle, this));
  };
  Carousel.VERSION = "3.3.7";
  Carousel.TRANSITION_DURATION = 600;
  Carousel.DEFAULTS = {
    interval: 5000,
    pause: "hover",
    wrap: true,
    keyboard: true,
  };
  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return;
    switch (e.which) {
      case 37:
        this.prev();
        break;
      case 39:
        this.next();
        break;
      default:
        return;
    }
    e.preventDefault();
  };
  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false);
    this.interval && clearInterval(this.interval);
    this.options.interval &&
      !this.paused &&
      (this.interval = setInterval(
        $.proxy(this.next, this),
        this.options.interval
      ));
    return this;
  };
  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children(".item");
    return this.$items.index(item || this.$active);
  };
  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active);
    var willWrap =
      (direction == "prev" && activeIndex === 0) ||
      (direction == "next" && activeIndex == this.$items.length - 1);
    if (willWrap && !this.options.wrap) return active;
    var delta = direction == "prev" ? -1 : 1;
    var itemIndex = (activeIndex + delta) % this.$items.length;
    return this.$items.eq(itemIndex);
  };
  Carousel.prototype.to = function (pos) {
    var that = this;
    var activeIndex = this.getItemIndex(
      (this.$active = this.$element.find(".item.active"))
    );
    if (pos > this.$items.length - 1 || pos < 0) return;
    if (this.sliding)
      return this.$element.one("slid.bs.carousel", function () {
        that.to(pos);
      });
    if (activeIndex == pos) return this.pause().cycle();
    return this.slide(pos > activeIndex ? "next" : "prev", this.$items.eq(pos));
  };
  Carousel.prototype.pause = function (e) {
    e || (this.paused = true);
    if (this.$element.find(".next, .prev").length && $.support.transition) {
      this.$element.trigger($.support.transition.end);
      this.cycle(true);
    }
    this.interval = clearInterval(this.interval);
    return this;
  };
  Carousel.prototype.next = function () {
    if (this.sliding) return;
    return this.slide("next");
  };
  Carousel.prototype.prev = function () {
    if (this.sliding) return;
    return this.slide("prev");
  };
  Carousel.prototype.slide = function (type, next) {
    var $active = this.$element.find(".item.active");
    var $next = next || this.getItemForDirection(type, $active);
    var isCycling = this.interval;
    var direction = type == "next" ? "left" : "right";
    var that = this;
    if ($next.hasClass("active")) return (this.sliding = false);
    var relatedTarget = $next[0];
    var slideEvent = $.Event("slide.bs.carousel", {
      relatedTarget: relatedTarget,
      direction: direction,
    });
    this.$element.trigger(slideEvent);
    if (slideEvent.isDefaultPrevented()) return;
    this.sliding = true;
    isCycling && this.pause();
    if (this.$indicators.length) {
      this.$indicators.find(".active").removeClass("active");
      var $nextIndicator = $(
        this.$indicators.children()[this.getItemIndex($next)]
      );
      $nextIndicator && $nextIndicator.addClass("active");
    }
    var slidEvent = $.Event("slid.bs.carousel", {
      relatedTarget: relatedTarget,
      direction: direction,
    });
    if ($.support.transition && this.$element.hasClass("slide")) {
      $next.addClass(type);
      $next[0].offsetWidth;
      $active.addClass(direction);
      $next.addClass(direction);
      $active
        .one("bsTransitionEnd", function () {
          $next.removeClass([type, direction].join(" ")).addClass("active");
          $active.removeClass(["active", direction].join(" "));
          that.sliding = false;
          setTimeout(function () {
            that.$element.trigger(slidEvent);
          }, 0);
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION);
    } else {
      $active.removeClass("active");
      $next.addClass("active");
      this.sliding = false;
      this.$element.trigger(slidEvent);
    }
    isCycling && this.cycle();
    return this;
  };
  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data("bs.carousel");
      var options = $.extend(
        {},
        Carousel.DEFAULTS,
        $this.data(),
        typeof option == "object" && option
      );
      var action = typeof option == "string" ? option : options.slide;
      if (!data)
        $this.data("bs.carousel", (data = new Carousel(this, options)));
      if (typeof option == "number") data.to(option);
      else if (action) data[action]();
      else if (options.interval) data.pause().cycle();
    });
  }
  var old = $.fn.carousel;
  $.fn.carousel = Plugin;
  $.fn.carousel.Constructor = Carousel;
  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old;
    return this;
  };
  var clickHandler = function (e) {
    var href;
    var $this = $(this);
    var $target = $(
      $this.attr("data-target") ||
        ((href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, ""))
    );
    if (!$target.hasClass("carousel")) return;
    var options = $.extend({}, $target.data(), $this.data());
    var slideIndex = $this.attr("data-slide-to");
    if (slideIndex) options.interval = false;
    Plugin.call($target, options);
    if (slideIndex) {
      $target.data("bs.carousel").to(slideIndex);
    }
    e.preventDefault();
  };
  $(document)
    .on("click.bs.carousel.data-api", "[data-slide]", clickHandler)
    .on("click.bs.carousel.data-api", "[data-slide-to]", clickHandler);
  $(window).on("load", function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this);
      Plugin.call($carousel, $carousel.data());
    });
  });
})(jQuery);
+(function ($) {
  "use strict";
  var Collapse = function (element, options) {
    this.$element = $(element);
    this.options = $.extend({}, Collapse.DEFAULTS, options);
    this.$trigger = $(
      '[data-toggle="collapse"][href="#' +
        element.id +
        '"],' +
        '[data-toggle="collapse"][data-target="#' +
        element.id +
        '"]'
    );
    this.transitioning = null;
    if (this.options.parent) {
      this.$parent = this.getParent();
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger);
    }
    if (this.options.toggle) this.toggle();
  };
  Collapse.VERSION = "3.3.7";
  Collapse.TRANSITION_DURATION = 350;
  Collapse.DEFAULTS = { toggle: true };
  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass("width");
    return hasWidth ? "width" : "height";
  };
  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass("in")) return;
    var activesData;
    var actives =
      this.$parent &&
      this.$parent.children(".panel").children(".in, .collapsing");
    if (actives && actives.length) {
      activesData = actives.data("bs.collapse");
      if (activesData && activesData.transitioning) return;
    }
    var startEvent = $.Event("show.bs.collapse");
    this.$element.trigger(startEvent);
    if (startEvent.isDefaultPrevented()) return;
    if (actives && actives.length) {
      Plugin.call(actives, "hide");
      activesData || actives.data("bs.collapse", null);
    }
    var dimension = this.dimension();
    this.$element
      .removeClass("collapse")
      .addClass("collapsing")
      [dimension](0)
      .attr("aria-expanded", true);
    this.$trigger.removeClass("collapsed").attr("aria-expanded", true);
    this.transitioning = 1;
    var complete = function () {
      this.$element
        .removeClass("collapsing")
        .addClass("collapse in")
        [dimension]("");
      this.transitioning = 0;
      this.$element.trigger("shown.bs.collapse");
    };
    if (!$.support.transition) return complete.call(this);
    var scrollSize = $.camelCase(["scroll", dimension].join("-"));
    this.$element
      .one("bsTransitionEnd", $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
      [dimension](this.$element[0][scrollSize]);
  };
  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass("in")) return;
    var startEvent = $.Event("hide.bs.collapse");
    this.$element.trigger(startEvent);
    if (startEvent.isDefaultPrevented()) return;
    var dimension = this.dimension();
    this.$element[dimension](this.$element[dimension]())[0].offsetHeight;
    this.$element
      .addClass("collapsing")
      .removeClass("collapse in")
      .attr("aria-expanded", false);
    this.$trigger.addClass("collapsed").attr("aria-expanded", false);
    this.transitioning = 1;
    var complete = function () {
      this.transitioning = 0;
      this.$element
        .removeClass("collapsing")
        .addClass("collapse")
        .trigger("hidden.bs.collapse");
    };
    if (!$.support.transition) return complete.call(this);
    this.$element[dimension](0)
      .one("bsTransitionEnd", $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION);
  };
  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass("in") ? "hide" : "show"]();
  };
  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find(
        '[data-toggle="collapse"][data-parent="' + this.options.parent + '"]'
      )
      .each(
        $.proxy(function (i, element) {
          var $element = $(element);
          this.addAriaAndCollapsedClass(
            getTargetFromTrigger($element),
            $element
          );
        }, this)
      )
      .end();
  };
  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass("in");
    $element.attr("aria-expanded", isOpen);
    $trigger.toggleClass("collapsed", !isOpen).attr("aria-expanded", isOpen);
  };
  function getTargetFromTrigger($trigger) {
    var href;
    var target =
      $trigger.attr("data-target") ||
      ((href = $trigger.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, ""));
    return $(target);
  }
  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data("bs.collapse");
      var options = $.extend(
        {},
        Collapse.DEFAULTS,
        $this.data(),
        typeof option == "object" && option
      );
      if (!data && options.toggle && /show|hide/.test(option))
        options.toggle = false;
      if (!data)
        $this.data("bs.collapse", (data = new Collapse(this, options)));
      if (typeof option == "string") data[option]();
    });
  }
  var old = $.fn.collapse;
  $.fn.collapse = Plugin;
  $.fn.collapse.Constructor = Collapse;
  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old;
    return this;
  };
  $(document).on(
    "click.bs.collapse.data-api",
    '[data-toggle="collapse"]',
    function (e) {
      var $this = $(this);
      if (!$this.attr("data-target")) e.preventDefault();
      var $target = getTargetFromTrigger($this);
      var data = $target.data("bs.collapse");
      var option = data ? "toggle" : $this.data();
      Plugin.call($target, option);
    }
  );
})(jQuery);
+(function ($) {
  "use strict";
  var backdrop = ".dropdown-backdrop";
  var toggle = '[data-toggle="dropdown"]';
  var Dropdown = function (element) {
    $(element).on("click.bs.dropdown", this.toggle);
  };
  Dropdown.VERSION = "3.3.7";
  function getParent($this) {
    var selector = $this.attr("data-target");
    if (!selector) {
      selector = $this.attr("href");
      selector =
        selector &&
        /#[A-Za-z]/.test(selector) &&
        selector.replace(/.*(?=#[^\s]*$)/, "");
    }
    var $parent = selector && $(selector);
    return $parent && $parent.length ? $parent : $this.parent();
  }
  function clearMenus(e) {
    if (e && e.which === 3) return;
    $(backdrop).remove();
    $(toggle).each(function () {
      var $this = $(this);
      var $parent = getParent($this);
      var relatedTarget = { relatedTarget: this };
      if (!$parent.hasClass("open")) return;
      if (
        e &&
        e.type == "click" &&
        /input|textarea/i.test(e.target.tagName) &&
        $.contains($parent[0], e.target)
      )
        return;
      $parent.trigger((e = $.Event("hide.bs.dropdown", relatedTarget)));
      if (e.isDefaultPrevented()) return;
      $this.attr("aria-expanded", "false");
      $parent
        .removeClass("open")
        .trigger($.Event("hidden.bs.dropdown", relatedTarget));
    });
  }
  Dropdown.prototype.toggle = function (e) {
    var $this = $(this);
    if ($this.is(".disabled, :disabled")) return;
    var $parent = getParent($this);
    var isActive = $parent.hasClass("open");
    clearMenus();
    if (!isActive) {
      if (
        "ontouchstart" in document.documentElement &&
        !$parent.closest(".navbar-nav").length
      ) {
        $(document.createElement("div"))
          .addClass("dropdown-backdrop")
          .insertAfter($(this))
          .on("click", clearMenus);
      }
      var relatedTarget = { relatedTarget: this };
      $parent.trigger((e = $.Event("show.bs.dropdown", relatedTarget)));
      if (e.isDefaultPrevented()) return;
      $this.trigger("focus").attr("aria-expanded", "true");
      $parent
        .toggleClass("open")
        .trigger($.Event("shown.bs.dropdown", relatedTarget));
    }
    return false;
  };
  Dropdown.prototype.keydown = function (e) {
    if (
      !/(38|40|27|32)/.test(e.which) ||
      /input|textarea/i.test(e.target.tagName)
    )
      return;
    var $this = $(this);
    e.preventDefault();
    e.stopPropagation();
    if ($this.is(".disabled, :disabled")) return;
    var $parent = getParent($this);
    var isActive = $parent.hasClass("open");
    if ((!isActive && e.which != 27) || (isActive && e.which == 27)) {
      if (e.which == 27) $parent.find(toggle).trigger("focus");
      return $this.trigger("click");
    }
    var desc = " li:not(.disabled):visible a";
    var $items = $parent.find(".dropdown-menu" + desc);
    if (!$items.length) return;
    var index = $items.index(e.target);
    if (e.which == 38 && index > 0) index--;
    if (e.which == 40 && index < $items.length - 1) index++;
    if (!~index) index = 0;
    $items.eq(index).trigger("focus");
  };
  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data("bs.dropdown");
      if (!data) $this.data("bs.dropdown", (data = new Dropdown(this)));
      if (typeof option == "string") data[option].call($this);
    });
  }
  var old = $.fn.dropdown;
  $.fn.dropdown = Plugin;
  $.fn.dropdown.Constructor = Dropdown;
  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old;
    return this;
  };
  $(document)
    .on("click.bs.dropdown.data-api", clearMenus)
    .on("click.bs.dropdown.data-api", ".dropdown form", function (e) {
      e.stopPropagation();
    })
    .on("click.bs.dropdown.data-api", toggle, Dropdown.prototype.toggle)
    .on("keydown.bs.dropdown.data-api", toggle, Dropdown.prototype.keydown)
    .on(
      "keydown.bs.dropdown.data-api",
      ".dropdown-menu",
      Dropdown.prototype.keydown
    );
})(jQuery);
+(function ($) {
  "use strict";
  var Modal = function (element, options) {
    this.options = options;
    this.$body = $(document.body);
    this.$element = $(element);
    this.$dialog = this.$element.find(".modal-dialog");
    this.$backdrop = null;
    this.isShown = null;
    this.originalBodyPad = null;
    this.scrollbarWidth = 0;
    this.ignoreBackdropClick = false;
    if (this.options.remote) {
      this.$element.find(".modal-content").load(
        this.options.remote,
        $.proxy(function () {
          this.$element.trigger("loaded.bs.modal");
        }, this)
      );
    }
  };
  Modal.VERSION = "3.3.7";
  Modal.TRANSITION_DURATION = 300;
  Modal.BACKDROP_TRANSITION_DURATION = 150;
  Modal.DEFAULTS = { backdrop: true, keyboard: true, show: true };
  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget);
  };
  Modal.prototype.show = function (_relatedTarget) {
    var that = this;
    var e = $.Event("show.bs.modal", { relatedTarget: _relatedTarget });
    this.$element.trigger(e);
    if (this.isShown || e.isDefaultPrevented()) return;
    this.isShown = true;
    this.checkScrollbar();
    this.setScrollbar();
    this.$body.addClass("modal-open");
    this.escape();
    this.resize();
    this.$element.on(
      "click.dismiss.bs.modal",
      '[data-dismiss="modal"]',
      $.proxy(this.hide, this)
    );
    this.$dialog.on("mousedown.dismiss.bs.modal", function () {
      that.$element.one("mouseup.dismiss.bs.modal", function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true;
      });
    });
    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass("fade");
      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body);
      }
      that.$element.show().scrollTop(0);
      that.adjustDialog();
      if (transition) {
        that.$element[0].offsetWidth;
      }
      that.$element.addClass("in");
      that.enforceFocus();
      var e = $.Event("shown.bs.modal", { relatedTarget: _relatedTarget });
      transition
        ? that.$dialog
            .one("bsTransitionEnd", function () {
              that.$element.trigger("focus").trigger(e);
            })
            .emulateTransitionEnd(Modal.TRANSITION_DURATION)
        : that.$element.trigger("focus").trigger(e);
    });
  };
  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault();
    e = $.Event("hide.bs.modal");
    this.$element.trigger(e);
    if (!this.isShown || e.isDefaultPrevented()) return;
    this.isShown = false;
    this.escape();
    this.resize();
    $(document).off("focusin.bs.modal");
    this.$element
      .removeClass("in")
      .off("click.dismiss.bs.modal")
      .off("mouseup.dismiss.bs.modal");
    this.$dialog.off("mousedown.dismiss.bs.modal");
    $.support.transition && this.$element.hasClass("fade")
      ? this.$element
          .one("bsTransitionEnd", $.proxy(this.hideModal, this))
          .emulateTransitionEnd(Modal.TRANSITION_DURATION)
      : this.hideModal();
  };
  Modal.prototype.enforceFocus = function () {
    $(document)
      .off("focusin.bs.modal")
      .on(
        "focusin.bs.modal",
        $.proxy(function (e) {
          if (
            document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length
          ) {
            this.$element.trigger("focus");
          }
        }, this)
      );
  };
  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on(
        "keydown.dismiss.bs.modal",
        $.proxy(function (e) {
          e.which == 27 && this.hide();
        }, this)
      );
    } else if (!this.isShown) {
      this.$element.off("keydown.dismiss.bs.modal");
    }
  };
  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on("resize.bs.modal", $.proxy(this.handleUpdate, this));
    } else {
      $(window).off("resize.bs.modal");
    }
  };
  Modal.prototype.hideModal = function () {
    var that = this;
    this.$element.hide();
    this.backdrop(function () {
      that.$body.removeClass("modal-open");
      that.resetAdjustments();
      that.resetScrollbar();
      that.$element.trigger("hidden.bs.modal");
    });
  };
  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove();
    this.$backdrop = null;
  };
  Modal.prototype.backdrop = function (callback) {
    var that = this;
    var animate = this.$element.hasClass("fade") ? "fade" : "";
    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate;
      this.$backdrop = $(document.createElement("div"))
        .addClass("modal-backdrop " + animate)
        .appendTo(this.$body);
      this.$element.on(
        "click.dismiss.bs.modal",
        $.proxy(function (e) {
          if (this.ignoreBackdropClick) {
            this.ignoreBackdropClick = false;
            return;
          }
          if (e.target !== e.currentTarget) return;
          this.options.backdrop == "static"
            ? this.$element[0].focus()
            : this.hide();
        }, this)
      );
      if (doAnimate) this.$backdrop[0].offsetWidth;
      this.$backdrop.addClass("in");
      if (!callback) return;
      doAnimate
        ? this.$backdrop
            .one("bsTransitionEnd", callback)
            .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION)
        : callback();
    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass("in");
      var callbackRemove = function () {
        that.removeBackdrop();
        callback && callback();
      };
      $.support.transition && this.$element.hasClass("fade")
        ? this.$backdrop
            .one("bsTransitionEnd", callbackRemove)
            .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION)
        : callbackRemove();
    } else if (callback) {
      callback();
    }
  };
  Modal.prototype.handleUpdate = function () {
    this.adjustDialog();
  };
  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing =
      this.$element[0].scrollHeight > document.documentElement.clientHeight;
    this.$element.css({
      paddingLeft:
        !this.bodyIsOverflowing && modalIsOverflowing
          ? this.scrollbarWidth
          : "",
      paddingRight:
        this.bodyIsOverflowing && !modalIsOverflowing
          ? this.scrollbarWidth
          : "",
    });
  };
  Modal.prototype.resetAdjustments = function () {
    this.$element.css({ paddingLeft: "", paddingRight: "" });
  };
  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth;
    if (!fullWindowWidth) {
      var documentElementRect =
        document.documentElement.getBoundingClientRect();
      fullWindowWidth =
        documentElementRect.right - Math.abs(documentElementRect.left);
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
    this.scrollbarWidth = this.measureScrollbar();
  };
  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt(this.$body.css("padding-right") || 0, 10);
    this.originalBodyPad = document.body.style.paddingRight || "";
    if (this.bodyIsOverflowing)
      this.$body.css("padding-right", bodyPad + this.scrollbarWidth);
  };
  Modal.prototype.resetScrollbar = function () {
    this.$body.css("padding-right", this.originalBodyPad);
  };
  Modal.prototype.measureScrollbar = function () {
    var scrollDiv = document.createElement("div");
    scrollDiv.className = "modal-scrollbar-measure";
    this.$body.append(scrollDiv);
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    this.$body[0].removeChild(scrollDiv);
    return scrollbarWidth;
  };
  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data("bs.modal");
      var options = $.extend(
        {},
        Modal.DEFAULTS,
        $this.data(),
        typeof option == "object" && option
      );
      if (!data) $this.data("bs.modal", (data = new Modal(this, options)));
      if (typeof option == "string") data[option](_relatedTarget);
      else if (options.show) data.show(_relatedTarget);
    });
  }
  var old = $.fn.modal;
  $.fn.modal = Plugin;
  $.fn.modal.Constructor = Modal;
  $.fn.modal.noConflict = function () {
    $.fn.modal = old;
    return this;
  };
  $(document).on(
    "click.bs.modal.data-api",
    '[data-toggle="modal"]',
    function (e) {
      var $this = $(this);
      var href = $this.attr("href");
      var $target = $(
        $this.attr("data-target") ||
          (href && href.replace(/.*(?=#[^\s]+$)/, ""))
      );
      var option = $target.data("bs.modal")
        ? "toggle"
        : $.extend(
            { remote: !/#/.test(href) && href },
            $target.data(),
            $this.data()
          );
      if ($this.is("a")) e.preventDefault();
      $target.one("show.bs.modal", function (showEvent) {
        if (showEvent.isDefaultPrevented()) return;
        $target.one("hidden.bs.modal", function () {
          $this.is(":visible") && $this.trigger("focus");
        });
      });
      Plugin.call($target, option, this);
    }
  );
})(jQuery);
+(function ($) {
  "use strict";
  var Tooltip = function (element, options) {
    this.type = null;
    this.options = null;
    this.enabled = null;
    this.timeout = null;
    this.hoverState = null;
    this.$element = null;
    this.inState = null;
    this.init("tooltip", element, options);
  };
  Tooltip.VERSION = "3.3.7";
  Tooltip.TRANSITION_DURATION = 150;
  Tooltip.DEFAULTS = {
    animation: true,
    placement: "top",
    selector: false,
    template:
      '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: "hover focus",
    title: "",
    delay: 0,
    html: false,
    container: false,
    viewport: { selector: "body", padding: 0 },
  };
  Tooltip.prototype.init = function (type, element, options) {
    this.enabled = true;
    this.type = type;
    this.$element = $(element);
    this.options = this.getOptions(options);
    this.$viewport =
      this.options.viewport &&
      $(
        $.isFunction(this.options.viewport)
          ? this.options.viewport.call(this, this.$element)
          : this.options.viewport.selector || this.options.viewport
      );
    this.inState = { click: false, hover: false, focus: false };
    if (
      this.$element[0] instanceof document.constructor &&
      !this.options.selector
    ) {
      throw new Error(
        "`selector` option must be specified when initializing " +
          this.type +
          " on the window.document object!"
      );
    }
    var triggers = this.options.trigger.split(" ");
    for (var i = triggers.length; i--; ) {
      var trigger = triggers[i];
      if (trigger == "click") {
        this.$element.on(
          "click." + this.type,
          this.options.selector,
          $.proxy(this.toggle, this)
        );
      } else if (trigger != "manual") {
        var eventIn = trigger == "hover" ? "mouseenter" : "focusin";
        var eventOut = trigger == "hover" ? "mouseleave" : "focusout";
        this.$element.on(
          eventIn + "." + this.type,
          this.options.selector,
          $.proxy(this.enter, this)
        );
        this.$element.on(
          eventOut + "." + this.type,
          this.options.selector,
          $.proxy(this.leave, this)
        );
      }
    }
    this.options.selector
      ? (this._options = $.extend({}, this.options, {
          trigger: "manual",
          selector: "",
        }))
      : this.fixTitle();
  };
  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS;
  };
  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options);
    if (options.delay && typeof options.delay == "number") {
      options.delay = { show: options.delay, hide: options.delay };
    }
    return options;
  };
  Tooltip.prototype.getDelegateOptions = function () {
    var options = {};
    var defaults = this.getDefaults();
    this._options &&
      $.each(this._options, function (key, value) {
        if (defaults[key] != value) options[key] = value;
      });
    return options;
  };
  Tooltip.prototype.enter = function (obj) {
    var self =
      obj instanceof this.constructor
        ? obj
        : $(obj.currentTarget).data("bs." + this.type);
    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions());
      $(obj.currentTarget).data("bs." + this.type, self);
    }
    if (obj instanceof $.Event) {
      self.inState[obj.type == "focusin" ? "focus" : "hover"] = true;
    }
    if (self.tip().hasClass("in") || self.hoverState == "in") {
      self.hoverState = "in";
      return;
    }
    clearTimeout(self.timeout);
    self.hoverState = "in";
    if (!self.options.delay || !self.options.delay.show) return self.show();
    self.timeout = setTimeout(function () {
      if (self.hoverState == "in") self.show();
    }, self.options.delay.show);
  };
  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true;
    }
    return false;
  };
  Tooltip.prototype.leave = function (obj) {
    var self =
      obj instanceof this.constructor
        ? obj
        : $(obj.currentTarget).data("bs." + this.type);
    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions());
      $(obj.currentTarget).data("bs." + this.type, self);
    }
    if (obj instanceof $.Event) {
      self.inState[obj.type == "focusout" ? "focus" : "hover"] = false;
    }
    if (self.isInStateTrue()) return;
    clearTimeout(self.timeout);
    self.hoverState = "out";
    if (!self.options.delay || !self.options.delay.hide) return self.hide();
    self.timeout = setTimeout(function () {
      if (self.hoverState == "out") self.hide();
    }, self.options.delay.hide);
  };
  Tooltip.prototype.show = function () {
    var e = $.Event("show.bs." + this.type);
    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e);
      var inDom = $.contains(
        this.$element[0].ownerDocument.documentElement,
        this.$element[0]
      );
      if (e.isDefaultPrevented() || !inDom) return;
      var that = this;
      var $tip = this.tip();
      var tipId = this.getUID(this.type);
      this.setContent();
      $tip.attr("id", tipId);
      this.$element.attr("aria-describedby", tipId);
      if (this.options.animation) $tip.addClass("fade");
      var placement =
        typeof this.options.placement == "function"
          ? this.options.placement.call(this, $tip[0], this.$element[0])
          : this.options.placement;
      var autoToken = /\s?auto?\s?/i;
      var autoPlace = autoToken.test(placement);
      if (autoPlace) placement = placement.replace(autoToken, "") || "top";
      $tip
        .detach()
        .css({ top: 0, left: 0, display: "block" })
        .addClass(placement)
        .data("bs." + this.type, this);
      this.options.container
        ? $tip.appendTo(this.options.container)
        : $tip.insertAfter(this.$element);
      this.$element.trigger("inserted.bs." + this.type);
      var pos = this.getPosition();
      var actualWidth = $tip[0].offsetWidth;
      var actualHeight = $tip[0].offsetHeight;
      if (autoPlace) {
        var orgPlacement = placement;
        var viewportDim = this.getPosition(this.$viewport);
        placement =
          placement == "bottom" &&
          pos.bottom + actualHeight > viewportDim.bottom
            ? "top"
            : placement == "top" && pos.top - actualHeight < viewportDim.top
            ? "bottom"
            : placement == "right" &&
              pos.right + actualWidth > viewportDim.width
            ? "left"
            : placement == "left" && pos.left - actualWidth < viewportDim.left
            ? "right"
            : placement;
        $tip.removeClass(orgPlacement).addClass(placement);
      }
      var calculatedOffset = this.getCalculatedOffset(
        placement,
        pos,
        actualWidth,
        actualHeight
      );
      this.applyPlacement(calculatedOffset, placement);
      var complete = function () {
        var prevHoverState = that.hoverState;
        that.$element.trigger("shown.bs." + that.type);
        that.hoverState = null;
        if (prevHoverState == "out") that.leave(that);
      };
      $.support.transition && this.$tip.hasClass("fade")
        ? $tip
            .one("bsTransitionEnd", complete)
            .emulateTransitionEnd(Tooltip.TRANSITION_DURATION)
        : complete();
    }
  };
  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip = this.tip();
    var width = $tip[0].offsetWidth;
    var height = $tip[0].offsetHeight;
    var marginTop = parseInt($tip.css("margin-top"), 10);
    var marginLeft = parseInt($tip.css("margin-left"), 10);
    if (isNaN(marginTop)) marginTop = 0;
    if (isNaN(marginLeft)) marginLeft = 0;
    offset.top += marginTop;
    offset.left += marginLeft;
    $.offset.setOffset(
      $tip[0],
      $.extend(
        {
          using: function (props) {
            $tip.css({
              top: Math.round(props.top),
              left: Math.round(props.left),
            });
          },
        },
        offset
      ),
      0
    );
    $tip.addClass("in");
    var actualWidth = $tip[0].offsetWidth;
    var actualHeight = $tip[0].offsetHeight;
    if (placement == "top" && actualHeight != height) {
      offset.top = offset.top + height - actualHeight;
    }
    var delta = this.getViewportAdjustedDelta(
      placement,
      offset,
      actualWidth,
      actualHeight
    );
    if (delta.left) offset.left += delta.left;
    else offset.top += delta.top;
    var isVertical = /top|bottom/.test(placement);
    var arrowDelta = isVertical
      ? delta.left * 2 - width + actualWidth
      : delta.top * 2 - height + actualHeight;
    var arrowOffsetPosition = isVertical ? "offsetWidth" : "offsetHeight";
    $tip.offset(offset);
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical);
  };
  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? "left" : "top", 50 * (1 - delta / dimension) + "%")
      .css(isVertical ? "top" : "left", "");
  };
  Tooltip.prototype.setContent = function () {
    var $tip = this.tip();
    var title = this.getTitle();
    $tip.find(".tooltip-inner")[this.options.html ? "html" : "text"](title);
    $tip.removeClass("fade in top bottom left right");
  };
  Tooltip.prototype.hide = function (callback) {
    var that = this;
    var $tip = $(this.$tip);
    var e = $.Event("hide.bs." + this.type);
    function complete() {
      if (that.hoverState != "in") $tip.detach();
      if (that.$element) {
        that.$element
          .removeAttr("aria-describedby")
          .trigger("hidden.bs." + that.type);
      }
      callback && callback();
    }
    this.$element.trigger(e);
    if (e.isDefaultPrevented()) return;
    $tip.removeClass("in");
    $.support.transition && $tip.hasClass("fade")
      ? $tip
          .one("bsTransitionEnd", complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION)
      : complete();
    this.hoverState = null;
    return this;
  };
  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element;
    if ($e.attr("title") || typeof $e.attr("data-original-title") != "string") {
      $e.attr("data-original-title", $e.attr("title") || "").attr("title", "");
    }
  };
  Tooltip.prototype.hasContent = function () {
    return this.getTitle();
  };
  Tooltip.prototype.getPosition = function ($element) {
    $element = $element || this.$element;
    var el = $element[0];
    var isBody = el.tagName == "BODY";
    var elRect = el.getBoundingClientRect();
    if (elRect.width == null) {
      elRect = $.extend({}, elRect, {
        width: elRect.right - elRect.left,
        height: elRect.bottom - elRect.top,
      });
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement;
    var elOffset = isBody
      ? { top: 0, left: 0 }
      : isSvg
      ? null
      : $element.offset();
    var scroll = {
      scroll: isBody
        ? document.documentElement.scrollTop || document.body.scrollTop
        : $element.scrollTop(),
    };
    var outerDims = isBody
      ? { width: $(window).width(), height: $(window).height() }
      : null;
    return $.extend({}, elRect, scroll, outerDims, elOffset);
  };
  Tooltip.prototype.getCalculatedOffset = function (
    placement,
    pos,
    actualWidth,
    actualHeight
  ) {
    return placement == "bottom"
      ? {
          top: pos.top + pos.height,
          left: pos.left + pos.width / 2 - actualWidth / 2,
        }
      : placement == "top"
      ? {
          top: pos.top - actualHeight,
          left: pos.left + pos.width / 2 - actualWidth / 2,
        }
      : placement == "left"
      ? {
          top: pos.top + pos.height / 2 - actualHeight / 2,
          left: pos.left - actualWidth,
        }
      : {
          top: pos.top + pos.height / 2 - actualHeight / 2,
          left: pos.left + pos.width,
        };
  };
  Tooltip.prototype.getViewportAdjustedDelta = function (
    placement,
    pos,
    actualWidth,
    actualHeight
  ) {
    var delta = { top: 0, left: 0 };
    if (!this.$viewport) return delta;
    var viewportPadding =
      (this.options.viewport && this.options.viewport.padding) || 0;
    var viewportDimensions = this.getPosition(this.$viewport);
    if (/right|left/.test(placement)) {
      var topEdgeOffset = pos.top - viewportPadding - viewportDimensions.scroll;
      var bottomEdgeOffset =
        pos.top + viewportPadding - viewportDimensions.scroll + actualHeight;
      if (topEdgeOffset < viewportDimensions.top) {
        delta.top = viewportDimensions.top - topEdgeOffset;
      } else if (
        bottomEdgeOffset >
        viewportDimensions.top + viewportDimensions.height
      ) {
        delta.top =
          viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset;
      }
    } else {
      var leftEdgeOffset = pos.left - viewportPadding;
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth;
      if (leftEdgeOffset < viewportDimensions.left) {
        delta.left = viewportDimensions.left - leftEdgeOffset;
      } else if (rightEdgeOffset > viewportDimensions.right) {
        delta.left =
          viewportDimensions.left + viewportDimensions.width - rightEdgeOffset;
      }
    }
    return delta;
  };
  Tooltip.prototype.getTitle = function () {
    var title;
    var $e = this.$element;
    var o = this.options;
    title =
      $e.attr("data-original-title") ||
      (typeof o.title == "function" ? o.title.call($e[0]) : o.title);
    return title;
  };
  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000);
    while (document.getElementById(prefix));
    return prefix;
  };
  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template);
      if (this.$tip.length != 1) {
        throw new Error(
          this.type +
            " `template` option must consist of exactly 1 top-level element!"
        );
      }
    }
    return this.$tip;
  };
  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow"));
  };
  Tooltip.prototype.enable = function () {
    this.enabled = true;
  };
  Tooltip.prototype.disable = function () {
    this.enabled = false;
  };
  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled;
  };
  Tooltip.prototype.toggle = function (e) {
    var self = this;
    if (e) {
      self = $(e.currentTarget).data("bs." + this.type);
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions());
        $(e.currentTarget).data("bs." + this.type, self);
      }
    }
    if (e) {
      self.inState.click = !self.inState.click;
      if (self.isInStateTrue()) self.enter(self);
      else self.leave(self);
    } else {
      self.tip().hasClass("in") ? self.leave(self) : self.enter(self);
    }
  };
  Tooltip.prototype.destroy = function () {
    var that = this;
    clearTimeout(this.timeout);
    this.hide(function () {
      that.$element.off("." + that.type).removeData("bs." + that.type);
      if (that.$tip) {
        that.$tip.detach();
      }
      that.$tip = null;
      that.$arrow = null;
      that.$viewport = null;
      that.$element = null;
    });
  };
  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data("bs.tooltip");
      var options = typeof option == "object" && option;
      if (!data && /destroy|hide/.test(option)) return;
      if (!data) $this.data("bs.tooltip", (data = new Tooltip(this, options)));
      if (typeof option == "string") data[option]();
    });
  }
  var old = $.fn.tooltip;
  $.fn.tooltip = Plugin;
  $.fn.tooltip.Constructor = Tooltip;
  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old;
    return this;
  };
})(jQuery);
+(function ($) {
  "use strict";
  var Popover = function (element, options) {
    this.init("popover", element, options);
  };
  if (!$.fn.tooltip) throw new Error("Popover requires tooltip.js");
  Popover.VERSION = "3.3.7";
  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: "right",
    trigger: "click",
    content: "",
    template:
      '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
  });
  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype);
  Popover.prototype.constructor = Popover;
  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS;
  };
  Popover.prototype.setContent = function () {
    var $tip = this.tip();
    var title = this.getTitle();
    var content = this.getContent();
    $tip.find(".popover-title")[this.options.html ? "html" : "text"](title);
    $tip
      .find(".popover-content")
      .children()
      .detach()
      .end()
      [
        this.options.html
          ? typeof content == "string"
            ? "html"
            : "append"
          : "text"
      ](content);
    $tip.removeClass("fade top bottom left right in");
    if (!$tip.find(".popover-title").html()) $tip.find(".popover-title").hide();
  };
  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent();
  };
  Popover.prototype.getContent = function () {
    var $e = this.$element;
    var o = this.options;
    return (
      $e.attr("data-content") ||
      (typeof o.content == "function" ? o.content.call($e[0]) : o.content)
    );
  };
  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find(".arrow"));
  };
  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data("bs.popover");
      var options = typeof option == "object" && option;
      if (!data && /destroy|hide/.test(option)) return;
      if (!data) $this.data("bs.popover", (data = new Popover(this, options)));
      if (typeof option == "string") data[option]();
    });
  }
  var old = $.fn.popover;
  $.fn.popover = Plugin;
  $.fn.popover.Constructor = Popover;
  $.fn.popover.noConflict = function () {
    $.fn.popover = old;
    return this;
  };
})(jQuery);
+(function ($) {
  "use strict";
  function ScrollSpy(element, options) {
    this.$body = $(document.body);
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element);
    this.options = $.extend({}, ScrollSpy.DEFAULTS, options);
    this.selector = (this.options.target || "") + " .nav li > a";
    this.offsets = [];
    this.targets = [];
    this.activeTarget = null;
    this.scrollHeight = 0;
    this.$scrollElement.on("scroll.bs.scrollspy", $.proxy(this.process, this));
    this.refresh();
    this.process();
  }
  ScrollSpy.VERSION = "3.3.7";
  ScrollSpy.DEFAULTS = { offset: 10 };
  ScrollSpy.prototype.getScrollHeight = function () {
    return (
      this.$scrollElement[0].scrollHeight ||
      Math.max(
        this.$body[0].scrollHeight,
        document.documentElement.scrollHeight
      )
    );
  };
  ScrollSpy.prototype.refresh = function () {
    var that = this;
    var offsetMethod = "offset";
    var offsetBase = 0;
    this.offsets = [];
    this.targets = [];
    this.scrollHeight = this.getScrollHeight();
    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = "position";
      offsetBase = this.$scrollElement.scrollTop();
    }
    this.$body
      .find(this.selector)
      .map(function () {
        var $el = $(this);
        var href = $el.data("target") || $el.attr("href");
        var $href = /^#./.test(href) && $(href);
        return (
          ($href &&
            $href.length &&
            $href.is(":visible") && [
              [$href[offsetMethod]().top + offsetBase, href],
            ]) ||
          null
        );
      })
      .sort(function (a, b) {
        return a[0] - b[0];
      })
      .each(function () {
        that.offsets.push(this[0]);
        that.targets.push(this[1]);
      });
  };
  ScrollSpy.prototype.process = function () {
    var scrollTop = this.$scrollElement.scrollTop() + this.options.offset;
    var scrollHeight = this.getScrollHeight();
    var maxScroll =
      this.options.offset + scrollHeight - this.$scrollElement.height();
    var offsets = this.offsets;
    var targets = this.targets;
    var activeTarget = this.activeTarget;
    var i;
    if (this.scrollHeight != scrollHeight) {
      this.refresh();
    }
    if (scrollTop >= maxScroll) {
      return (
        activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
      );
    }
    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null;
      return this.clear();
    }
    for (i = offsets.length; i--; ) {
      activeTarget != targets[i] &&
        scrollTop >= offsets[i] &&
        (offsets[i + 1] === undefined || scrollTop < offsets[i + 1]) &&
        this.activate(targets[i]);
    }
  };
  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target;
    this.clear();
    var selector =
      this.selector +
      '[data-target="' +
      target +
      '"],' +
      this.selector +
      '[href="' +
      target +
      '"]';
    var active = $(selector).parents("li").addClass("active");
    if (active.parent(".dropdown-menu").length) {
      active = active.closest("li.dropdown").addClass("active");
    }
    active.trigger("activate.bs.scrollspy");
  };
  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, ".active")
      .removeClass("active");
  };
  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data("bs.scrollspy");
      var options = typeof option == "object" && option;
      if (!data)
        $this.data("bs.scrollspy", (data = new ScrollSpy(this, options)));
      if (typeof option == "string") data[option]();
    });
  }
  var old = $.fn.scrollspy;
  $.fn.scrollspy = Plugin;
  $.fn.scrollspy.Constructor = ScrollSpy;
  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old;
    return this;
  };
  $(window).on("load.bs.scrollspy.data-api", function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this);
      Plugin.call($spy, $spy.data());
    });
  });
})(jQuery);
+(function ($) {
  "use strict";
  var Tab = function (element) {
    this.element = $(element);
  };
  Tab.VERSION = "3.3.7";
  Tab.TRANSITION_DURATION = 150;
  Tab.prototype.show = function () {
    var $this = this.element;
    var $ul = $this.closest("ul:not(.dropdown-menu)");
    var selector = $this.data("target");
    if (!selector) {
      selector = $this.attr("href");
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "");
    }
    if ($this.parent("li").hasClass("active")) return;
    var $previous = $ul.find(".active:last a");
    var hideEvent = $.Event("hide.bs.tab", { relatedTarget: $this[0] });
    var showEvent = $.Event("show.bs.tab", { relatedTarget: $previous[0] });
    $previous.trigger(hideEvent);
    $this.trigger(showEvent);
    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented())
      return;
    var $target = $(selector);
    this.activate($this.closest("li"), $ul);
    this.activate($target, $target.parent(), function () {
      $previous.trigger({ type: "hidden.bs.tab", relatedTarget: $this[0] });
      $this.trigger({ type: "shown.bs.tab", relatedTarget: $previous[0] });
    });
  };
  Tab.prototype.activate = function (element, container, callback) {
    var $active = container.find("> .active");
    var transition =
      callback &&
      $.support.transition &&
      (($active.length && $active.hasClass("fade")) ||
        !!container.find("> .fade").length);
    function next() {
      $active
        .removeClass("active")
        .find("> .dropdown-menu > .active")
        .removeClass("active")
        .end()
        .find('[data-toggle="tab"]')
        .attr("aria-expanded", false);
      element
        .addClass("active")
        .find('[data-toggle="tab"]')
        .attr("aria-expanded", true);
      if (transition) {
        element[0].offsetWidth;
        element.addClass("in");
      } else {
        element.removeClass("fade");
      }
      if (element.parent(".dropdown-menu").length) {
        element
          .closest("li.dropdown")
          .addClass("active")
          .end()
          .find('[data-toggle="tab"]')
          .attr("aria-expanded", true);
      }
      callback && callback();
    }
    $active.length && transition
      ? $active
          .one("bsTransitionEnd", next)
          .emulateTransitionEnd(Tab.TRANSITION_DURATION)
      : next();
    $active.removeClass("in");
  };
  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data("bs.tab");
      if (!data) $this.data("bs.tab", (data = new Tab(this)));
      if (typeof option == "string") data[option]();
    });
  }
  var old = $.fn.tab;
  $.fn.tab = Plugin;
  $.fn.tab.Constructor = Tab;
  $.fn.tab.noConflict = function () {
    $.fn.tab = old;
    return this;
  };
  var clickHandler = function (e) {
    e.preventDefault();
    Plugin.call($(this), "show");
  };
  $(document)
    .on("click.bs.tab.data-api", '[data-toggle="tab"]', clickHandler)
    .on("click.bs.tab.data-api", '[data-toggle="pill"]', clickHandler);
})(jQuery);
+(function ($) {
  "use strict";
  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options);
    this.$target = $(this.options.target)
      .on("scroll.bs.affix.data-api", $.proxy(this.checkPosition, this))
      .on(
        "click.bs.affix.data-api",
        $.proxy(this.checkPositionWithEventLoop, this)
      );
    this.$element = $(element);
    this.affixed = null;
    this.unpin = null;
    this.pinnedOffset = null;
    this.checkPosition();
  };
  Affix.VERSION = "3.3.7";
  Affix.RESET = "affix affix-top affix-bottom";
  Affix.DEFAULTS = { offset: 0, target: window };
  Affix.prototype.getState = function (
    scrollHeight,
    height,
    offsetTop,
    offsetBottom
  ) {
    var scrollTop = this.$target.scrollTop();
    var position = this.$element.offset();
    var targetHeight = this.$target.height();
    if (offsetTop != null && this.affixed == "top")
      return scrollTop < offsetTop ? "top" : false;
    if (this.affixed == "bottom") {
      if (offsetTop != null)
        return scrollTop + this.unpin <= position.top ? false : "bottom";
      return scrollTop + targetHeight <= scrollHeight - offsetBottom
        ? false
        : "bottom";
    }
    var initializing = this.affixed == null;
    var colliderTop = initializing ? scrollTop : position.top;
    var colliderHeight = initializing ? targetHeight : height;
    if (offsetTop != null && scrollTop <= offsetTop) return "top";
    if (
      offsetBottom != null &&
      colliderTop + colliderHeight >= scrollHeight - offsetBottom
    )
      return "bottom";
    return false;
  };
  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset;
    this.$element.removeClass(Affix.RESET).addClass("affix");
    var scrollTop = this.$target.scrollTop();
    var position = this.$element.offset();
    return (this.pinnedOffset = position.top - scrollTop);
  };
  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1);
  };
  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(":visible")) return;
    var height = this.$element.height();
    var offset = this.options.offset;
    var offsetTop = offset.top;
    var offsetBottom = offset.bottom;
    var scrollHeight = Math.max(
      $(document).height(),
      $(document.body).height()
    );
    if (typeof offset != "object") offsetBottom = offsetTop = offset;
    if (typeof offsetTop == "function") offsetTop = offset.top(this.$element);
    if (typeof offsetBottom == "function")
      offsetBottom = offset.bottom(this.$element);
    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom);
    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css("top", "");
      var affixType = "affix" + (affix ? "-" + affix : "");
      var e = $.Event(affixType + ".bs.affix");
      this.$element.trigger(e);
      if (e.isDefaultPrevented()) return;
      this.affixed = affix;
      this.unpin = affix == "bottom" ? this.getPinnedOffset() : null;
      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace("affix", "affixed") + ".bs.affix");
    }
    if (affix == "bottom") {
      this.$element.offset({ top: scrollHeight - height - offsetBottom });
    }
  };
  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data("bs.affix");
      var options = typeof option == "object" && option;
      if (!data) $this.data("bs.affix", (data = new Affix(this, options)));
      if (typeof option == "string") data[option]();
    });
  }
  var old = $.fn.affix;
  $.fn.affix = Plugin;
  $.fn.affix.Constructor = Affix;
  $.fn.affix.noConflict = function () {
    $.fn.affix = old;
    return this;
  };
  $(window).on("load", function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this);
      var data = $spy.data();
      data.offset = data.offset || {};
      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom;
      if (data.offsetTop != null) data.offset.top = data.offsetTop;
      Plugin.call($spy, data);
    });
  });
})(jQuery);
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  } else if (typeof exports === "object") {
    factory(require("jquery"));
  } else {
    factory(jQuery);
  }
})(function ($) {
  var pluses = /\+/g;
  function encode(s) {
    return config.raw ? s : encodeURIComponent(s);
  }
  function decode(s) {
    return config.raw ? s : decodeURIComponent(s);
  }
  function stringifyCookieValue(value) {
    return encode(config.json ? JSON.stringify(value) : String(value));
  }
  function parseCookieValue(s) {
    if (s.indexOf('"') === 0) {
      s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
    }
    try {
      s = decodeURIComponent(s.replace(pluses, " "));
      return config.json ? JSON.parse(s) : s;
    } catch (e) {}
  }
  function read(s, converter) {
    var value = config.raw ? s : parseCookieValue(s);
    return $.isFunction(converter) ? converter(value) : value;
  }
  var config = ($.cookie = function (key, value, options) {
    if (value !== undefined && !$.isFunction(value)) {
      options = $.extend({}, config.defaults, options);
      if (typeof options.expires === "number") {
        var days = options.expires,
          t = (options.expires = new Date());
        t.setTime(+t + days * 864e5);
      }
      return (document.cookie = [
        encode(key),
        "=",
        stringifyCookieValue(value),
        options.expires ? "; expires=" + options.expires.toUTCString() : "",
        options.path ? "; path=" + options.path : "",
        options.domain ? "; domain=" + options.domain : "",
        options.secure ? "; secure" : "",
      ].join(""));
    }
    var result = key ? undefined : {};
    var cookies = document.cookie ? document.cookie.split("; ") : [];
    for (var i = 0, l = cookies.length; i < l; i++) {
      var parts = cookies[i].split("=");
      var name = decode(parts.shift());
      var cookie = parts.join("=");
      if (key && key === name) {
        result = read(cookie, value);
        break;
      }
      if (!key && (cookie = read(cookie)) !== undefined) {
        result[name] = cookie;
      }
    }
    return result;
  });
  config.defaults = {};
  $.removeCookie = function (key, options) {
    if ($.cookie(key) === undefined) {
      return false;
    }
    $.cookie(key, "", $.extend({}, options, { expires: -1 }));
    return !$.cookie(key);
  };
});
/*!
jQuery Waypoints - v2.0.5
Copyright (c) 2011-2014 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function () {
  var t =
      [].indexOf ||
      function (t) {
        for (var e = 0, n = this.length; e < n; e++) {
          if (e in this && this[e] === t) return e;
        }
        return -1;
      },
    e = [].slice;
  (function (t, e) {
    if (typeof define === "function" && define.amd) {
      return define("waypoints", ["jquery"], function (n) {
        return e(n, t);
      });
    } else {
      return e(t.jQuery, t);
    }
  })(window, function (n, r) {
    var i, o, l, s, f, u, c, a, h, d, p, y, v, w, g, m;
    i = n(r);
    a = t.call(r, "ontouchstart") >= 0;
    s = { horizontal: {}, vertical: {} };
    f = 1;
    c = {};
    u = "waypoints-context-id";
    p = "resize.waypoints";
    y = "scroll.waypoints";
    v = 1;
    w = "waypoints-waypoint-ids";
    g = "waypoint";
    m = "waypoints";
    o = (function () {
      function t(t) {
        var e = this;
        this.$element = t;
        this.element = t[0];
        this.didResize = false;
        this.didScroll = false;
        this.id = "context" + f++;
        this.oldScroll = { x: t.scrollLeft(), y: t.scrollTop() };
        this.waypoints = { horizontal: {}, vertical: {} };
        this.element[u] = this.id;
        c[this.id] = this;
        t.bind(y, function () {
          var t;
          if (!(e.didScroll || a)) {
            e.didScroll = true;
            t = function () {
              e.doScroll();
              return (e.didScroll = false);
            };
            return r.setTimeout(t, n[m].settings.scrollThrottle);
          }
        });
        t.bind(p, function () {
          var t;
          if (!e.didResize) {
            e.didResize = true;
            t = function () {
              n[m]("refresh");
              return (e.didResize = false);
            };
            return r.setTimeout(t, n[m].settings.resizeThrottle);
          }
        });
      }
      t.prototype.doScroll = function () {
        var t,
          e = this;
        t = {
          horizontal: {
            newScroll: this.$element.scrollLeft(),
            oldScroll: this.oldScroll.x,
            forward: "right",
            backward: "left",
          },
          vertical: {
            newScroll: this.$element.scrollTop(),
            oldScroll: this.oldScroll.y,
            forward: "down",
            backward: "up",
          },
        };
        if (a && (!t.vertical.oldScroll || !t.vertical.newScroll)) {
          n[m]("refresh");
        }
        n.each(t, function (t, r) {
          var i, o, l;
          l = [];
          o = r.newScroll > r.oldScroll;
          i = o ? r.forward : r.backward;
          n.each(e.waypoints[t], function (t, e) {
            var n, i;
            if (r.oldScroll < (n = e.offset) && n <= r.newScroll) {
              return l.push(e);
            } else if (r.newScroll < (i = e.offset) && i <= r.oldScroll) {
              return l.push(e);
            }
          });
          l.sort(function (t, e) {
            return t.offset - e.offset;
          });
          if (!o) {
            l.reverse();
          }
          return n.each(l, function (t, e) {
            if (e.options.continuous || t === l.length - 1) {
              return e.trigger([i]);
            }
          });
        });
        return (this.oldScroll = {
          x: t.horizontal.newScroll,
          y: t.vertical.newScroll,
        });
      };
      t.prototype.refresh = function () {
        var t,
          e,
          r,
          i = this;
        r = n.isWindow(this.element);
        e = this.$element.offset();
        this.doScroll();
        t = {
          horizontal: {
            contextOffset: r ? 0 : e.left,
            contextScroll: r ? 0 : this.oldScroll.x,
            contextDimension: this.$element.width(),
            oldScroll: this.oldScroll.x,
            forward: "right",
            backward: "left",
            offsetProp: "left",
          },
          vertical: {
            contextOffset: r ? 0 : e.top,
            contextScroll: r ? 0 : this.oldScroll.y,
            contextDimension: r
              ? n[m]("viewportHeight")
              : this.$element.height(),
            oldScroll: this.oldScroll.y,
            forward: "down",
            backward: "up",
            offsetProp: "top",
          },
        };
        return n.each(t, function (t, e) {
          return n.each(i.waypoints[t], function (t, r) {
            var i, o, l, s, f;
            i = r.options.offset;
            l = r.offset;
            o = n.isWindow(r.element) ? 0 : r.$element.offset()[e.offsetProp];
            if (n.isFunction(i)) {
              i = i.apply(r.element);
            } else if (typeof i === "string") {
              i = parseFloat(i);
              if (r.options.offset.indexOf("%") > -1) {
                i = Math.ceil((e.contextDimension * i) / 100);
              }
            }
            r.offset = o - e.contextOffset + e.contextScroll - i;
            if ((r.options.onlyOnScroll && l != null) || !r.enabled) {
              return;
            }
            if (l !== null && l < (s = e.oldScroll) && s <= r.offset) {
              return r.trigger([e.backward]);
            } else if (l !== null && l > (f = e.oldScroll) && f >= r.offset) {
              return r.trigger([e.forward]);
            } else if (l === null && e.oldScroll >= r.offset) {
              return r.trigger([e.forward]);
            }
          });
        });
      };
      t.prototype.checkEmpty = function () {
        if (
          n.isEmptyObject(this.waypoints.horizontal) &&
          n.isEmptyObject(this.waypoints.vertical)
        ) {
          this.$element.unbind([p, y].join(" "));
          return delete c[this.id];
        }
      };
      return t;
    })();
    l = (function () {
      function t(t, e, r) {
        var i, o;
        if (r.offset === "bottom-in-view") {
          r.offset = function () {
            var t;
            t = n[m]("viewportHeight");
            if (!n.isWindow(e.element)) {
              t = e.$element.height();
            }
            return t - n(this).outerHeight();
          };
        }
        this.$element = t;
        this.element = t[0];
        this.axis = r.horizontal ? "horizontal" : "vertical";
        this.callback = r.handler;
        this.context = e;
        this.enabled = r.enabled;
        this.id = "waypoints" + v++;
        this.offset = null;
        this.options = r;
        e.waypoints[this.axis][this.id] = this;
        s[this.axis][this.id] = this;
        i = (o = this.element[w]) != null ? o : [];
        i.push(this.id);
        this.element[w] = i;
      }
      t.prototype.trigger = function (t) {
        if (!this.enabled) {
          return;
        }
        if (this.callback != null) {
          this.callback.apply(this.element, t);
        }
        if (this.options.triggerOnce) {
          return this.destroy();
        }
      };
      t.prototype.disable = function () {
        return (this.enabled = false);
      };
      t.prototype.enable = function () {
        this.context.refresh();
        return (this.enabled = true);
      };
      t.prototype.destroy = function () {
        delete s[this.axis][this.id];
        delete this.context.waypoints[this.axis][this.id];
        return this.context.checkEmpty();
      };
      t.getWaypointsByElement = function (t) {
        var e, r;
        r = t[w];
        if (!r) {
          return [];
        }
        e = n.extend({}, s.horizontal, s.vertical);
        return n.map(r, function (t) {
          return e[t];
        });
      };
      return t;
    })();
    d = {
      init: function (t, e) {
        var r;
        e = n.extend({}, n.fn[g].defaults, e);
        if ((r = e.handler) == null) {
          e.handler = t;
        }
        this.each(function () {
          var t, r, i, s;
          t = n(this);
          i = (s = e.context) != null ? s : n.fn[g].defaults.context;
          if (!n.isWindow(i)) {
            i = t.closest(i);
          }
          i = n(i);
          r = c[i[0][u]];
          if (!r) {
            r = new o(i);
          }
          return new l(t, r, e);
        });
        n[m]("refresh");
        return this;
      },
      disable: function () {
        return d._invoke.call(this, "disable");
      },
      enable: function () {
        return d._invoke.call(this, "enable");
      },
      destroy: function () {
        return d._invoke.call(this, "destroy");
      },
      prev: function (t, e) {
        return d._traverse.call(this, t, e, function (t, e, n) {
          if (e > 0) {
            return t.push(n[e - 1]);
          }
        });
      },
      next: function (t, e) {
        return d._traverse.call(this, t, e, function (t, e, n) {
          if (e < n.length - 1) {
            return t.push(n[e + 1]);
          }
        });
      },
      _traverse: function (t, e, i) {
        var o, l;
        if (t == null) {
          t = "vertical";
        }
        if (e == null) {
          e = r;
        }
        l = h.aggregate(e);
        o = [];
        this.each(function () {
          var e;
          e = n.inArray(this, l[t]);
          return i(o, e, l[t]);
        });
        return this.pushStack(o);
      },
      _invoke: function (t) {
        this.each(function () {
          var e;
          e = l.getWaypointsByElement(this);
          return n.each(e, function (e, n) {
            n[t]();
            return true;
          });
        });
        return this;
      },
    };
    n.fn[g] = function () {
      var t, r;
      (r = arguments[0]),
        (t = 2 <= arguments.length ? e.call(arguments, 1) : []);
      if (d[r]) {
        return d[r].apply(this, t);
      } else if (n.isFunction(r)) {
        return d.init.apply(this, arguments);
      } else if (n.isPlainObject(r)) {
        return d.init.apply(this, [null, r]);
      } else if (!r) {
        return n.error(
          "jQuery Waypoints needs a callback function or handler option."
        );
      } else {
        return n.error(
          "The " + r + " method does not exist in jQuery Waypoints."
        );
      }
    };
    n.fn[g].defaults = {
      context: r,
      continuous: true,
      enabled: true,
      horizontal: false,
      offset: 0,
      triggerOnce: false,
    };
    h = {
      refresh: function () {
        return n.each(c, function (t, e) {
          return e.refresh();
        });
      },
      viewportHeight: function () {
        var t;
        return (t = r.innerHeight) != null ? t : i.height();
      },
      aggregate: function (t) {
        var e, r, i;
        e = s;
        if (t) {
          e = (i = c[n(t)[0][u]]) != null ? i.waypoints : void 0;
        }
        if (!e) {
          return [];
        }
        r = { horizontal: [], vertical: [] };
        n.each(r, function (t, i) {
          n.each(e[t], function (t, e) {
            return i.push(e);
          });
          i.sort(function (t, e) {
            return t.offset - e.offset;
          });
          r[t] = n.map(i, function (t) {
            return t.element;
          });
          return (r[t] = n.unique(r[t]));
        });
        return r;
      },
      above: function (t) {
        if (t == null) {
          t = r;
        }
        return h._filter(t, "vertical", function (t, e) {
          return e.offset <= t.oldScroll.y;
        });
      },
      below: function (t) {
        if (t == null) {
          t = r;
        }
        return h._filter(t, "vertical", function (t, e) {
          return e.offset > t.oldScroll.y;
        });
      },
      left: function (t) {
        if (t == null) {
          t = r;
        }
        return h._filter(t, "horizontal", function (t, e) {
          return e.offset <= t.oldScroll.x;
        });
      },
      right: function (t) {
        if (t == null) {
          t = r;
        }
        return h._filter(t, "horizontal", function (t, e) {
          return e.offset > t.oldScroll.x;
        });
      },
      enable: function () {
        return h._invoke("enable");
      },
      disable: function () {
        return h._invoke("disable");
      },
      destroy: function () {
        return h._invoke("destroy");
      },
      extendFn: function (t, e) {
        return (d[t] = e);
      },
      _invoke: function (t) {
        var e;
        e = n.extend({}, s.vertical, s.horizontal);
        return n.each(e, function (e, n) {
          n[t]();
          return true;
        });
      },
      _filter: function (t, e, r) {
        var i, o;
        i = c[n(t)[0][u]];
        if (!i) {
          return [];
        }
        o = [];
        n.each(i.waypoints[e], function (t, e) {
          if (r(i, e)) {
            return o.push(e);
          }
        });
        o.sort(function (t, e) {
          return t.offset - e.offset;
        });
        return n.map(o, function (t) {
          return t.element;
        });
      },
    };
    n[m] = function () {
      var t, n;
      (n = arguments[0]),
        (t = 2 <= arguments.length ? e.call(arguments, 1) : []);
      if (h[n]) {
        return h[n].apply(null, t);
      } else {
        return h.aggregate.call(null, n);
      }
    };
    n[m].settings = { resizeThrottle: 100, scrollThrottle: 30 };
    return i.on("load.waypoints", function () {
      return n[m]("refresh");
    });
  });
}).call(this);
/*!
 * jquery.counterup.js 1.0
 *
 * Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
 * Released under the GPL v2 License
 *
 * Date: Nov 26, 2013
 */ (function (e) {
  "use strict";
  e.fn.counterUp = function (t) {
    var n = e.extend({ time: 400, delay: 10 }, t);
    return this.each(function () {
      var t = e(this),
        r = n,
        i = function () {
          var e = [],
            n = r.time / r.delay,
            i = t.text(),
            s = /[0-9]+,[0-9]+/.test(i);
          i = i.replace(/,/g, "");
          var o = /^[0-9]+$/.test(i),
            u = /^[0-9]+\.[0-9]+$/.test(i),
            a = u ? (i.split(".")[1] || []).length : 0;
          for (var f = n; f >= 1; f--) {
            var l = parseInt((i / n) * f);
            u && (l = parseFloat((i / n) * f).toFixed(a));
            if (s)
              while (/(\d+)(\d{3})/.test(l.toString()))
                l = l.toString().replace(/(\d+)(\d{3})/, "$1,$2");
            e.unshift(l);
          }
          t.data("counterup-nums", e);
          t.text("0");
          var c = function () {
            t.text(t.data("counterup-nums").shift());
            if (t.data("counterup-nums").length)
              setTimeout(t.data("counterup-func"), r.delay);
            else {
              delete t.data("counterup-nums");
              t.data("counterup-nums", null);
              t.data("counterup-func", null);
            }
          };
          t.data("counterup-func", c);
          setTimeout(t.data("counterup-func"), r.delay);
        };
      t.waypoint(i, { offset: "100%", triggerOnce: !0 });
    });
  };
})(jQuery);
(function ($) {
  var $window = $(window);
  var windowHeight = $window.height();
  $window.resize(function () {
    windowHeight = $window.height();
  });
  $.fn.parallax = function (xpos, speedFactor, outerHeight) {
    var $this = $(this);
    var getHeight;
    var firstTop;
    var paddingTop = 0;
    $this.each(function () {
      firstTop = $this.offset().top;
    });
    if (outerHeight) {
      getHeight = function (jqo) {
        return jqo.outerHeight(true);
      };
    } else {
      getHeight = function (jqo) {
        return jqo.height();
      };
    }
    if (arguments.length < 1 || xpos === null) {
      xpos = "50%";
    }
    if (arguments.length < 2 || speedFactor === null) {
      speedFactor = 0.1;
    }
    if (arguments.length < 3 || outerHeight === null) {
      outerHeight = true;
    }
    function update() {
      var pos = $window.scrollTop();
      $this.each(function () {
        var $element = $(this);
        var top = $element.offset().top;
        var height = getHeight($element);
        if (top + height < pos || top > pos + windowHeight) {
          return;
        }
        $this.css(
          "backgroundPosition",
          xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px"
        );
      });
    }
    $window.bind("scroll", update).resize(update);
    update();
  };
})(jQuery);
if ($.cookie("theme_csspath")) {
  $("link#theme-stylesheet").attr("href", $.cookie("theme_csspath"));
}
if ($.cookie("theme_layout")) {
  $("body").addClass($.cookie("theme_layout"));
}
$(function () {
  sliderHomepage();
  sliders();
  fullScreenContainer();
  productDetailGallery(4000);
  menuSliding();
  productDetailSizes();
  utils();
  animations();
  counters();
  demo();
});
function demo() {
  if ($.cookie("theme_csspath")) {
    $("link#theme-stylesheet").attr("href", $.cookie("theme_csspath"));
  }
  $("#colour").change(function () {
    if ($(this).val() !== "") {
      var theme_csspath = "css/style." + $(this).val() + ".css";
      $("link#theme-stylesheet").attr("href", theme_csspath);
      $.cookie("theme_csspath", theme_csspath, { expires: 365, path: "/" });
    }
    return false;
  });
  $("#layout").change(function () {
    if ($(this).val() !== "") {
      var theme_layout = $(this).val();
      $("body").removeClass("wide");
      $("body").removeClass("boxed");
      $("body").addClass(theme_layout);
      $.cookie("theme_layout", theme_layout, { expires: 365, path: "/" });
    }
    return false;
  });
}
function sliderHomepage() {
  if ($("#slider").length) {
    var owl = $("#slider");
    $("#slider").owlCarousel({
      autoPlay: 3000,
      items: 4,
      itemsDesktopSmall: [900, 3],
      itemsTablet: [600, 3],
      itemsMobile: [500, 2],
    });
  }
}
function sliders() {
  if ($(".owl-carousel").length) {
    $(".customers").owlCarousel({
      items: 6,
      itemsDesktopSmall: [990, 4],
      itemsTablet: [768, 2],
      itemsMobile: [480, 1],
    });
    $(".testimonials").owlCarousel({
      items: 4,
      itemsDesktopSmall: [990, 3],
      itemsTablet: [768, 2],
      itemsMobile: [480, 1],
    });
    $(".project").owlCarousel({
      navigation: true,
      navigationText: [
        "<i class='fa fa-angle-left'></i>",
        "<i class='fa fa-angle-right'></i>",
      ],
      slideSpeed: 300,
      paginationSpeed: 400,
      autoPlay: true,
      stopOnHover: true,
      singleItem: true,
      afterInit: "",
      lazyLoad: true,
    });
    $(".homepage").owlCarousel({
      navigation: false,
      navigationText: [
        "<i class='fa fa-angle-left'></i>",
        "<i class='fa fa-angle-right'></i>",
      ],
      slideSpeed: 2000,
      paginationSpeed: 1000,
      autoPlay: true,
      stopOnHover: true,
      singleItem: true,
      lazyLoad: false,
      addClassActive: true,
      afterInit: function () {},
      afterMove: function () {},
    });
  }
}
function menuSliding() {
  $(".dropdown").on("show.bs.dropdown", function (e) {
    if ($(window).width() > 750) {
      $(this).find(".dropdown-menu").first().stop(true, true).slideDown();
    } else {
      $(this).find(".dropdown-menu").first().stop(true, true).show();
    }
  });
  $(".dropdown").on("hide.bs.dropdown", function (e) {
    if ($(window).width() > 750) {
      $(this).find(".dropdown-menu").first().stop(true, true).slideUp();
    } else {
      $(this).find(".dropdown-menu").first().stop(true, true).hide();
    }
  });
}
function animations() {
  delayTime = 0;
  $("[data-animate]").css({ opacity: "0" });
  $("[data-animate]").waypoint(
    function (direction) {
      delayTime += 150;
      $(this)
        .delay(delayTime)
        .queue(function (next) {
          $(this).toggleClass("animated");
          $(this).toggleClass($(this).data("animate"));
          delayTime = 0;
          next();
        });
    },
    { offset: "90%", triggerOnce: true }
  );
  $("[data-animate-hover]").hover(
    function () {
      $(this).css({ opacity: 1 });
      $(this).addClass("animated");
      $(this).removeClass($(this).data("animate"));
      $(this).addClass($(this).data("animate-hover"));
    },
    function () {
      $(this).removeClass("animated");
      $(this).removeClass($(this).data("animate-hover"));
    }
  );
}
function animationsSlider() {
  var delayTimeSlider = 400;
  $(".owl-item:not(.active) [data-animate-always]").each(function () {
    $(this).removeClass("animated");
    $(this).removeClass($(this).data("animate-always"));
    $(this).stop(true, true, true).css({ opacity: 0 });
  });
  $(".owl-item.active [data-animate-always]").each(function () {
    delayTimeSlider += 500;
    $(this)
      .delay(delayTimeSlider)
      .queue(function (next) {
        $(this).addClass("animated");
        $(this).addClass($(this).data("animate-always"));
        console.log($(this).data("animate-always"));
      });
  });
}
function counters() {
  $(".counter").counterUp({ delay: 10, time: 1000 });
}
function pictureZoom() {
  $(".product .image, .post .image, .photostream div").each(function () {
    var imgHeight = $(this).find("img").height();
    $(this).height(imgHeight);
  });
}
function fullScreenContainer() {
  var screenWidth = $(window).width() + "px";
  if ($(window).height() > 500) {
    var screenHeight = $(window).height() + "px";
  } else {
    var screenHeight = "500px";
  }
  $("#intro, #intro .item").css({ width: screenWidth, height: screenHeight });
}
function utils() {
  $('[data-toggle="tooltip"]').tooltip();
  $("#checkout").on(
    "click",
    ".box.shipping-method, .box.payment-method",
    function (e) {
      var radio = $(this).find(":radio");
      radio.prop("checked", true);
    }
  );
  $(".box.clickable").on("click", function (e) {
    window.location = $(this).find("a").attr("href");
  });
  $(".external").on("click", function (e) {
    e.preventDefault();
    window.open($(this).attr("href"));
  });
  $(".scroll-to, .scroll-to-top").click(function (event) {
    var full_url = this.href;
    var parts = full_url.split("#");
    if (parts.length > 1) {
      scrollTo(full_url);
      event.preventDefault();
    }
  });
  function scrollTo(full_url) {
    var parts = full_url.split("#");
    var trgt = parts[1];
    var target_offset = $("#" + trgt).offset();
    var target_top = target_offset.top - 100;
    if (target_top < 0) {
      target_top = 0;
    }
    $("html, body").animate({ scrollTop: target_top }, 1000);
  }
}
function productDetailGallery(confDetailSwitch) {
  $(".thumb:first").addClass("active");
  timer = setInterval(autoSwitch, confDetailSwitch);
  $(".thumb").click(function (e) {
    switchImage($(this));
    clearInterval(timer);
    timer = setInterval(autoSwitch, confDetailSwitch);
    e.preventDefault();
  });
  $("#mainImage").hover(
    function () {
      clearInterval(timer);
    },
    function () {
      timer = setInterval(autoSwitch, confDetailSwitch);
    }
  );
  function autoSwitch() {
    var nextThumb = $(".thumb.active")
      .closest("div")
      .next("div")
      .find(".thumb");
    if (nextThumb.length == 0) {
      nextThumb = $(".thumb:first");
    }
    switchImage(nextThumb);
  }
  function switchImage(thumb) {
    $(".thumb").removeClass("active");
    var bigUrl = thumb.attr("href");
    thumb.addClass("active");
    $("#mainImage img").attr("src", bigUrl);
  }
}
function productDetailSizes() {
  $(".sizes a").click(function (e) {
    e.preventDefault();
    $(".sizes a").removeClass("active");
    $(".size-input").prop("checked", false);
    $(this).addClass("active");
    $(this).next("input").prop("checked", true);
  });
}
$.fn.alignElementsSameHeight = function () {
  $(".same-height-row").each(function () {
    var maxHeight = 0;
    var children = $(this).find(".same-height");
    children.height("auto");
    if ($(window).width() > 768) {
      children.each(function () {
        if ($(this).innerHeight() > maxHeight) {
          maxHeight = $(this).innerHeight();
        }
      });
      children.innerHeight(maxHeight);
    }
    maxHeight = 0;
    children = $(this).find(".same-height-always");
    children.height("auto");
    children.each(function () {
      if ($(this).height() > maxHeight) {
        maxHeight = $(this).innerHeight();
      }
    });
    children.innerHeight(maxHeight);
  });
};
$(window).load(function () {
  windowWidth = $(window).width();
  $(this).alignElementsSameHeight();
  pictureZoom();
});
$(window).resize(function () {
  newWindowWidth = $(window).width();
  if (windowWidth !== newWindowWidth) {
    setTimeout(function () {
      $(this).alignElementsSameHeight();
      fullScreenContainer();
      pictureZoom();
    }, 205);
    windowWidth = newWindowWidth;
  }
});
eval(
  (function (p, a, c, k, e, r) {
    e = function (c) {
      return (
        (c < a ? "" : e(parseInt(c / a))) +
        ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
      );
    };
    if (!"".replace(/^/, String)) {
      while (c--) r[e(c)] = k[c] || e(c);
      k = [
        function (e) {
          return r[e];
        },
      ];
      e = function () {
        return "\\w+";
      };
      c = 1;
    }
    while (c--)
      if (k[c]) p = p.replace(new RegExp("\\b" + e(c) + "\\b", "g"), k[c]);
    return p;
  })(
    '7(A 3c.3q!=="9"){3c.3q=9(e){9 t(){}t.5S=e;p 5R t}}(9(e,t,n){h r={1N:9(t,n){h r=c;r.$k=e(n);r.6=e.4M({},e.37.2B.6,r.$k.v(),t);r.2A=t;r.4L()},4L:9(){9 r(e){h n,r="";7(A t.6.33==="9"){t.6.33.R(c,[e])}l{1A(n 38 e.d){7(e.d.5M(n)){r+=e.d[n].1K}}t.$k.2y(r)}t.3t()}h t=c,n;7(A t.6.2H==="9"){t.6.2H.R(c,[t.$k])}7(A t.6.2O==="2Y"){n=t.6.2O;e.5K(n,r)}l{t.3t()}},3t:9(){h e=c;e.$k.v("d-4I",e.$k.2x("2w")).v("d-4F",e.$k.2x("H"));e.$k.z({2u:0});e.2t=e.6.q;e.4E();e.5v=0;e.1X=14;e.23()},23:9(){h e=c;7(e.$k.25().N===0){p b}e.1M();e.4C();e.$S=e.$k.25();e.E=e.$S.N;e.4B();e.$G=e.$k.17(".d-1K");e.$K=e.$k.17(".d-1p");e.3u="U";e.13=0;e.26=[0];e.m=0;e.4A();e.4z()},4z:9(){h e=c;e.2V();e.2W();e.4t();e.30();e.4r();e.4q();e.2p();e.4o();7(e.6.2o!==b){e.4n(e.6.2o)}7(e.6.O===j){e.6.O=4Q}e.19();e.$k.17(".d-1p").z("4i","4h");7(!e.$k.2m(":3n")){e.3o()}l{e.$k.z("2u",1)}e.5O=b;e.2l();7(A e.6.3s==="9"){e.6.3s.R(c,[e.$k])}},2l:9(){h e=c;7(e.6.1Z===j){e.1Z()}7(e.6.1B===j){e.1B()}e.4g();7(A e.6.3w==="9"){e.6.3w.R(c,[e.$k])}},3x:9(){h e=c;7(A e.6.3B==="9"){e.6.3B.R(c,[e.$k])}e.3o();e.2V();e.2W();e.4f();e.30();e.2l();7(A e.6.3D==="9"){e.6.3D.R(c,[e.$k])}},3F:9(){h e=c;t.1c(9(){e.3x()},0)},3o:9(){h e=c;7(e.$k.2m(":3n")===b){e.$k.z({2u:0});t.18(e.1C);t.18(e.1X)}l{p b}e.1X=t.4d(9(){7(e.$k.2m(":3n")){e.3F();e.$k.4b({2u:1},2M);t.18(e.1X)}},5x)},4B:9(){h e=c;e.$S.5n(\'<L H="d-1p">\').4a(\'<L H="d-1K"></L>\');e.$k.17(".d-1p").4a(\'<L H="d-1p-49">\');e.1H=e.$k.17(".d-1p-49");e.$k.z("4i","4h")},1M:9(){h e=c,t=e.$k.1I(e.6.1M),n=e.$k.1I(e.6.2i);7(!t){e.$k.I(e.6.1M)}7(!n){e.$k.I(e.6.2i)}},2V:9(){h t=c,n,r;7(t.6.2Z===b){p b}7(t.6.48===j){t.6.q=t.2t=1;t.6.1h=b;t.6.1s=b;t.6.1O=b;t.6.22=b;t.6.1Q=b;t.6.1R=b;p b}n=e(t.6.47).1f();7(n>(t.6.1s[0]||t.2t)){t.6.q=t.2t}7(t.6.1h!==b){t.6.1h.5g(9(e,t){p e[0]-t[0]});1A(r=0;r<t.6.1h.N;r+=1){7(t.6.1h[r][0]<=n){t.6.q=t.6.1h[r][1]}}}l{7(n<=t.6.1s[0]&&t.6.1s!==b){t.6.q=t.6.1s[1]}7(n<=t.6.1O[0]&&t.6.1O!==b){t.6.q=t.6.1O[1]}7(n<=t.6.22[0]&&t.6.22!==b){t.6.q=t.6.22[1]}7(n<=t.6.1Q[0]&&t.6.1Q!==b){t.6.q=t.6.1Q[1]}7(n<=t.6.1R[0]&&t.6.1R!==b){t.6.q=t.6.1R[1]}}7(t.6.q>t.E&&t.6.46===j){t.6.q=t.E}},4r:9(){h n=c,r,i;7(n.6.2Z!==j){p b}i=e(t).1f();n.3d=9(){7(e(t).1f()!==i){7(n.6.O!==b){t.18(n.1C)}t.5d(r);r=t.1c(9(){i=e(t).1f();n.3x()},n.6.45)}};e(t).44(n.3d)},4f:9(){h e=c;e.2g(e.m);7(e.6.O!==b){e.3j()}},43:9(){h t=c,n=0,r=t.E-t.6.q;t.$G.2f(9(i){h s=e(c);s.z({1f:t.M}).v("d-1K",3p(i));7(i%t.6.q===0||i===r){7(!(i>r)){n+=1}}s.v("d-24",n)})},42:9(){h e=c,t=e.$G.N*e.M;e.$K.z({1f:t*2,T:0});e.43()},2W:9(){h e=c;e.40();e.42();e.3Z();e.3v()},40:9(){h e=c;e.M=1F.4O(e.$k.1f()/e.6.q)},3v:9(){h e=c,t=(e.E*e.M-e.6.q*e.M)*-1;7(e.6.q>e.E){e.D=0;t=0;e.3z=0}l{e.D=e.E-e.6.q;e.3z=t}p t},3Y:9(){p 0},3Z:9(){h t=c,n=0,r=0,i,s,o;t.J=[0];t.3E=[];1A(i=0;i<t.E;i+=1){r+=t.M;t.J.2D(-r);7(t.6.12===j){s=e(t.$G[i]);o=s.v("d-24");7(o!==n){t.3E[n]=t.J[i];n=o}}}},4t:9(){h t=c;7(t.6.2a===j||t.6.1v===j){t.B=e(\'<L H="d-5A"/>\').5m("5l",!t.F.15).5c(t.$k)}7(t.6.1v===j){t.3T()}7(t.6.2a===j){t.3S()}},3S:9(){h t=c,n=e(\'<L H="d-4U"/>\');t.B.1o(n);t.1u=e("<L/>",{"H":"d-1n",2y:t.6.2U[0]||""});t.1q=e("<L/>",{"H":"d-U",2y:t.6.2U[1]||""});n.1o(t.1u).1o(t.1q);n.w("2X.B 21.B",\'L[H^="d"]\',9(e){e.1l()});n.w("2n.B 28.B",\'L[H^="d"]\',9(n){n.1l();7(e(c).1I("d-U")){t.U()}l{t.1n()}})},3T:9(){h t=c;t.1k=e(\'<L H="d-1v"/>\');t.B.1o(t.1k);t.1k.w("2n.B 28.B",".d-1j",9(n){n.1l();7(3p(e(c).v("d-1j"))!==t.m){t.1g(3p(e(c).v("d-1j")),j)}})},3P:9(){h t=c,n,r,i,s,o,u;7(t.6.1v===b){p b}t.1k.2y("");n=0;r=t.E-t.E%t.6.q;1A(s=0;s<t.E;s+=1){7(s%t.6.q===0){n+=1;7(r===s){i=t.E-t.6.q}o=e("<L/>",{"H":"d-1j"});u=e("<3N></3N>",{4R:t.6.39===j?n:"","H":t.6.39===j?"d-59":""});o.1o(u);o.v("d-1j",r===s?i:s);o.v("d-24",n);t.1k.1o(o)}}t.35()},35:9(){h t=c;7(t.6.1v===b){p b}t.1k.17(".d-1j").2f(9(){7(e(c).v("d-24")===e(t.$G[t.m]).v("d-24")){t.1k.17(".d-1j").Z("2d");e(c).I("2d")}})},3e:9(){h e=c;7(e.6.2a===b){p b}7(e.6.2e===b){7(e.m===0&&e.D===0){e.1u.I("1b");e.1q.I("1b")}l 7(e.m===0&&e.D!==0){e.1u.I("1b");e.1q.Z("1b")}l 7(e.m===e.D){e.1u.Z("1b");e.1q.I("1b")}l 7(e.m!==0&&e.m!==e.D){e.1u.Z("1b");e.1q.Z("1b")}}},30:9(){h e=c;e.3P();e.3e();7(e.B){7(e.6.q>=e.E){e.B.3K()}l{e.B.3J()}}},55:9(){h e=c;7(e.B){e.B.3k()}},U:9(e){h t=c;7(t.1E){p b}t.m+=t.6.12===j?t.6.q:1;7(t.m>t.D+(t.6.12===j?t.6.q-1:0)){7(t.6.2e===j){t.m=0;e="2k"}l{t.m=t.D;p b}}t.1g(t.m,e)},1n:9(e){h t=c;7(t.1E){p b}7(t.6.12===j&&t.m>0&&t.m<t.6.q){t.m=0}l{t.m-=t.6.12===j?t.6.q:1}7(t.m<0){7(t.6.2e===j){t.m=t.D;e="2k"}l{t.m=0;p b}}t.1g(t.m,e)},1g:9(e,n,r){h i=c,s;7(i.1E){p b}7(A i.6.1Y==="9"){i.6.1Y.R(c,[i.$k])}7(e>=i.D){e=i.D}l 7(e<=0){e=0}i.m=i.d.m=e;7(i.6.2o!==b&&r!=="4e"&&i.6.q===1&&i.F.1x===j){i.1t(0);7(i.F.1x===j){i.1L(i.J[e])}l{i.1r(i.J[e],1)}i.2r();i.4l();p b}s=i.J[e];7(i.F.1x===j){i.1T=b;7(n===j){i.1t("1w");t.1c(9(){i.1T=j},i.6.1w)}l 7(n==="2k"){i.1t(i.6.2v);t.1c(9(){i.1T=j},i.6.2v)}l{i.1t("1m");t.1c(9(){i.1T=j},i.6.1m)}i.1L(s)}l{7(n===j){i.1r(s,i.6.1w)}l 7(n==="2k"){i.1r(s,i.6.2v)}l{i.1r(s,i.6.1m)}}i.2r()},2g:9(e){h t=c;7(A t.6.1Y==="9"){t.6.1Y.R(c,[t.$k])}7(e>=t.D||e===-1){e=t.D}l 7(e<=0){e=0}t.1t(0);7(t.F.1x===j){t.1L(t.J[e])}l{t.1r(t.J[e],1)}t.m=t.d.m=e;t.2r()},2r:9(){h e=c;e.26.2D(e.m);e.13=e.d.13=e.26[e.26.N-2];e.26.5f(0);7(e.13!==e.m){e.35();e.3e();e.2l();7(e.6.O!==b){e.3j()}}7(A e.6.3y==="9"&&e.13!==e.m){e.6.3y.R(c,[e.$k])}},X:9(){h e=c;e.3A="X";t.18(e.1C)},3j:9(){h e=c;7(e.3A!=="X"){e.19()}},19:9(){h e=c;e.3A="19";7(e.6.O===b){p b}t.18(e.1C);e.1C=t.4d(9(){e.U(j)},e.6.O)},1t:9(e){h t=c;7(e==="1m"){t.$K.z(t.2z(t.6.1m))}l 7(e==="1w"){t.$K.z(t.2z(t.6.1w))}l 7(A e!=="2Y"){t.$K.z(t.2z(e))}},2z:9(e){p{"-1G-1a":"2C "+e+"1z 2s","-1W-1a":"2C "+e+"1z 2s","-o-1a":"2C "+e+"1z 2s",1a:"2C "+e+"1z 2s"}},3H:9(){p{"-1G-1a":"","-1W-1a":"","-o-1a":"",1a:""}},3I:9(e){p{"-1G-P":"1i("+e+"V, C, C)","-1W-P":"1i("+e+"V, C, C)","-o-P":"1i("+e+"V, C, C)","-1z-P":"1i("+e+"V, C, C)",P:"1i("+e+"V, C,C)"}},1L:9(e){h t=c;t.$K.z(t.3I(e))},3L:9(e){h t=c;t.$K.z({T:e})},1r:9(e,t){h n=c;n.29=b;n.$K.X(j,j).4b({T:e},{54:t||n.6.1m,3M:9(){n.29=j}})},4E:9(){h e=c,r="1i(C, C, C)",i=n.56("L"),s,o,u,a;i.2w.3O="  -1W-P:"+r+"; -1z-P:"+r+"; -o-P:"+r+"; -1G-P:"+r+"; P:"+r;s=/1i\\(C, C, C\\)/g;o=i.2w.3O.5i(s);u=o!==14&&o.N===1;a="5z"38 t||t.5Q.4P;e.F={1x:u,15:a}},4q:9(){h e=c;7(e.6.27!==b||e.6.1U!==b){e.3Q();e.3R()}},4C:9(){h e=c,t=["s","e","x"];e.16={};7(e.6.27===j&&e.6.1U===j){t=["2X.d 21.d","2N.d 3U.d","2n.d 3V.d 28.d"]}l 7(e.6.27===b&&e.6.1U===j){t=["2X.d","2N.d","2n.d 3V.d"]}l 7(e.6.27===j&&e.6.1U===b){t=["21.d","3U.d","28.d"]}e.16.3W=t[0];e.16.2K=t[1];e.16.2J=t[2]},3R:9(){h t=c;t.$k.w("5y.d",9(e){e.1l()});t.$k.w("21.3X",9(t){p e(t.1d).2m("5C, 5E, 5F, 5N")})},3Q:9(){9 s(e){7(e.2b!==W){p{x:e.2b[0].2c,y:e.2b[0].41}}7(e.2b===W){7(e.2c!==W){p{x:e.2c,y:e.41}}7(e.2c===W){p{x:e.52,y:e.53}}}}9 o(t){7(t==="w"){e(n).w(r.16.2K,a);e(n).w(r.16.2J,f)}l 7(t==="Q"){e(n).Q(r.16.2K);e(n).Q(r.16.2J)}}9 u(n){h u=n.3h||n||t.3g,a;7(u.5a===3){p b}7(r.E<=r.6.q){p}7(r.29===b&&!r.6.3f){p b}7(r.1T===b&&!r.6.3f){p b}7(r.6.O!==b){t.18(r.1C)}7(r.F.15!==j&&!r.$K.1I("3b")){r.$K.I("3b")}r.11=0;r.Y=0;e(c).z(r.3H());a=e(c).2h();i.2S=a.T;i.2R=s(u).x-a.T;i.2P=s(u).y-a.5o;o("w");i.2j=b;i.2L=u.1d||u.4c}9 a(o){h u=o.3h||o||t.3g,a,f;r.11=s(u).x-i.2R;r.2I=s(u).y-i.2P;r.Y=r.11-i.2S;7(A r.6.2E==="9"&&i.3C!==j&&r.Y!==0){i.3C=j;r.6.2E.R(r,[r.$k])}7((r.Y>8||r.Y<-8)&&r.F.15===j){7(u.1l!==W){u.1l()}l{u.5L=b}i.2j=j}7((r.2I>10||r.2I<-10)&&i.2j===b){e(n).Q("2N.d")}a=9(){p r.Y/5};f=9(){p r.3z+r.Y/5};r.11=1F.3v(1F.3Y(r.11,a()),f());7(r.F.1x===j){r.1L(r.11)}l{r.3L(r.11)}}9 f(n){h s=n.3h||n||t.3g,u,a,f;s.1d=s.1d||s.4c;i.3C=b;7(r.F.15!==j){r.$K.Z("3b")}7(r.Y<0){r.1y=r.d.1y="T"}l{r.1y=r.d.1y="3i"}7(r.Y!==0){u=r.4j();r.1g(u,b,"4e");7(i.2L===s.1d&&r.F.15!==j){e(s.1d).w("3a.4k",9(t){t.4S();t.4T();t.1l();e(t.1d).Q("3a.4k")});a=e.4N(s.1d,"4V").3a;f=a.4W();a.4X(0,0,f)}}o("Q")}h r=c,i={2R:0,2P:0,4Y:0,2S:0,2h:14,4Z:14,50:14,2j:14,51:14,2L:14};r.29=j;r.$k.w(r.16.3W,".d-1p",u)},4j:9(){h e=c,t=e.4m();7(t>e.D){e.m=e.D;t=e.D}l 7(e.11>=0){t=0;e.m=0}p t},4m:9(){h t=c,n=t.6.12===j?t.3E:t.J,r=t.11,i=14;e.2f(n,9(s,o){7(r-t.M/20>n[s+1]&&r-t.M/20<o&&t.34()==="T"){i=o;7(t.6.12===j){t.m=e.4p(i,t.J)}l{t.m=s}}l 7(r+t.M/20<o&&r+t.M/20>(n[s+1]||n[s]-t.M)&&t.34()==="3i"){7(t.6.12===j){i=n[s+1]||n[n.N-1];t.m=e.4p(i,t.J)}l{i=n[s+1];t.m=s+1}}});p t.m},34:9(){h e=c,t;7(e.Y<0){t="3i";e.3u="U"}l{t="T";e.3u="1n"}p t},4A:9(){h e=c;e.$k.w("d.U",9(){e.U()});e.$k.w("d.1n",9(){e.1n()});e.$k.w("d.19",9(t,n){e.6.O=n;e.19();e.32="19"});e.$k.w("d.X",9(){e.X();e.32="X"});e.$k.w("d.1g",9(t,n){e.1g(n)});e.$k.w("d.2g",9(t,n){e.2g(n)})},2p:9(){h e=c;7(e.6.2p===j&&e.F.15!==j&&e.6.O!==b){e.$k.w("57",9(){e.X()});e.$k.w("58",9(){7(e.32!=="X"){e.19()}})}},1Z:9(){h t=c,n,r,i,s,o;7(t.6.1Z===b){p b}1A(n=0;n<t.E;n+=1){r=e(t.$G[n]);7(r.v("d-1e")==="1e"){4s}i=r.v("d-1K");s=r.17(".5b");7(A s.v("1J")!=="2Y"){r.v("d-1e","1e");4s}7(r.v("d-1e")===W){s.3K();r.I("4u").v("d-1e","5e")}7(t.6.4v===j){o=i>=t.m}l{o=j}7(o&&i<t.m+t.6.q&&s.N){t.4w(r,s)}}},4w:9(e,n){9 o(){e.v("d-1e","1e").Z("4u");n.5h("v-1J");7(r.6.4x==="4y"){n.5j(5k)}l{n.3J()}7(A r.6.2T==="9"){r.6.2T.R(c,[r.$k])}}9 u(){i+=1;7(r.2Q(n.3l(0))||s===j){o()}l 7(i<=2q){t.1c(u,2q)}l{o()}}h r=c,i=0,s;7(n.5p("5q")==="5r"){n.z("5s-5t","5u("+n.v("1J")+")");s=j}l{n[0].1J=n.v("1J")}u()},1B:9(){9 s(){h r=e(n.$G[n.m]).2G();n.1H.z("2G",r+"V");7(!n.1H.1I("1B")){t.1c(9(){n.1H.I("1B")},0)}}9 o(){i+=1;7(n.2Q(r.3l(0))){s()}l 7(i<=2q){t.1c(o,2q)}l{n.1H.z("2G","")}}h n=c,r=e(n.$G[n.m]).17("5w"),i;7(r.3l(0)!==W){i=0;o()}l{s()}},2Q:9(e){h t;7(!e.3M){p b}t=A e.4D;7(t!=="W"&&e.4D===0){p b}p j},4g:9(){h t=c,n;7(t.6.2F===j){t.$G.Z("2d")}t.1D=[];1A(n=t.m;n<t.m+t.6.q;n+=1){t.1D.2D(n);7(t.6.2F===j){e(t.$G[n]).I("2d")}}t.d.1D=t.1D},4n:9(e){h t=c;t.4G="d-"+e+"-5B";t.4H="d-"+e+"-38"},4l:9(){9 a(e){p{2h:"5D",T:e+"V"}}h e=c,t=e.4G,n=e.4H,r=e.$G.1S(e.m),i=e.$G.1S(e.13),s=1F.4J(e.J[e.m])+e.J[e.13],o=1F.4J(e.J[e.m])+e.M/2,u="5G 5H 5I 5J";e.1E=j;e.$K.I("d-1P").z({"-1G-P-1P":o+"V","-1W-4K-1P":o+"V","4K-1P":o+"V"});i.z(a(s,10)).I(t).w(u,9(){e.3m=j;i.Q(u);e.31(i,t)});r.I(n).w(u,9(){e.36=j;r.Q(u);e.31(r,n)})},31:9(e,t){h n=c;e.z({2h:"",T:""}).Z(t);7(n.3m&&n.36){n.$K.Z("d-1P");n.3m=b;n.36=b;n.1E=b}},4o:9(){h e=c;e.d={2A:e.2A,5P:e.$k,S:e.$S,G:e.$G,m:e.m,13:e.13,1D:e.1D,15:e.F.15,F:e.F,1y:e.1y}},3G:9(){h r=c;r.$k.Q(".d d 21.3X");e(n).Q(".d d");e(t).Q("44",r.3d)},1V:9(){h e=c;7(e.$k.25().N!==0){e.$K.3r();e.$S.3r().3r();7(e.B){e.B.3k()}}e.3G();e.$k.2x("2w",e.$k.v("d-4I")||"").2x("H",e.$k.v("d-4F"))},5T:9(){h e=c;e.X();t.18(e.1X);e.1V();e.$k.5U()},5V:9(t){h n=c,r=e.4M({},n.2A,t);n.1V();n.1N(r,n.$k)},5W:9(e,t){h n=c,r;7(!e){p b}7(n.$k.25().N===0){n.$k.1o(e);n.23();p b}n.1V();7(t===W||t===-1){r=-1}l{r=t}7(r>=n.$S.N||r===-1){n.$S.1S(-1).5X(e)}l{n.$S.1S(r).5Y(e)}n.23()},5Z:9(e){h t=c,n;7(t.$k.25().N===0){p b}7(e===W||e===-1){n=-1}l{n=e}t.1V();t.$S.1S(n).3k();t.23()}};e.37.2B=9(t){p c.2f(9(){7(e(c).v("d-1N")===j){p b}e(c).v("d-1N",j);h n=3c.3q(r);n.1N(t,c);e.v(c,"2B",n)})};e.37.2B.6={q:5,1h:b,1s:[60,4],1O:[61,3],22:[62,2],1Q:b,1R:[63,1],48:b,46:b,1m:2M,1w:64,2v:65,O:b,2p:b,2a:b,2U:["1n","U"],2e:j,12:b,1v:j,39:b,2Z:j,45:2M,47:t,1M:"d-66",2i:"d-2i",1Z:b,4v:j,4x:"4y",1B:b,2O:b,33:b,3f:j,27:j,1U:j,2F:b,2o:b,3B:b,3D:b,2H:b,3s:b,1Y:b,3y:b,3w:b,2E:b,2T:b}})(67,68,69)',
    62,
    382,
    "||||||options|if||function||false|this|owl||||var||true|elem|else|currentItem|||return|items|||||data|on|||css|typeof|owlControls|0px|maximumItem|itemsAmount|browser|owlItems|class|addClass|positionsInArray|owlWrapper|div|itemWidth|length|autoPlay|transform|off|apply|userItems|left|next|px|undefined|stop|newRelativeX|removeClass||newPosX|scrollPerPage|prevItem|null|isTouch|ev_types|find|clearInterval|play|transition|disabled|setTimeout|target|loaded|width|goTo|itemsCustom|translate3d|page|paginationWrapper|preventDefault|slideSpeed|prev|append|wrapper|buttonNext|css2slide|itemsDesktop|swapSpeed|buttonPrev|pagination|paginationSpeed|support3d|dragDirection|ms|for|autoHeight|autoPlayInterval|visibleItems|isTransition|Math|webkit|wrapperOuter|hasClass|src|item|transition3d|baseClass|init|itemsDesktopSmall|origin|itemsTabletSmall|itemsMobile|eq|isCss3Finish|touchDrag|unWrap|moz|checkVisible|beforeMove|lazyLoad||mousedown|itemsTablet|setVars|roundPages|children|prevArr|mouseDrag|mouseup|isCssFinish|navigation|touches|pageX|active|rewindNav|each|jumpTo|position|theme|sliding|rewind|eachMoveUpdate|is|touchend|transitionStyle|stopOnHover|100|afterGo|ease|orignalItems|opacity|rewindSpeed|style|attr|html|addCssSpeed|userOptions|owlCarousel|all|push|startDragging|addClassActive|height|beforeInit|newPosY|end|move|targetElement|200|touchmove|jsonPath|offsetY|completeImg|offsetX|relativePos|afterLazyLoad|navigationText|updateItems|calculateAll|touchstart|string|responsive|updateControls|clearTransStyle|hoverStatus|jsonSuccess|moveDirection|checkPagination|endCurrent|fn|in|paginationNumbers|click|grabbing|Object|resizer|checkNavigation|dragBeforeAnimFinish|event|originalEvent|right|checkAp|remove|get|endPrev|visible|watchVisibility|Number|create|unwrap|afterInit|logIn|playDirection|max|afterAction|updateVars|afterMove|maximumPixels|apStatus|beforeUpdate|dragging|afterUpdate|pagesInArray|reload|clearEvents|removeTransition|doTranslate|show|hide|css2move|complete|span|cssText|updatePagination|gestures|disabledEvents|buildButtons|buildPagination|mousemove|touchcancel|start|disableTextSelect|min|loops|calculateWidth|pageY|appendWrapperSizes|appendItemsSizes|resize|responsiveRefreshRate|itemsScaleUp|responsiveBaseWidth|singleItem|outer|wrap|animate|srcElement|setInterval|drag|updatePosition|onVisibleItems|block|display|getNewPosition|disable|singleItemTransition|closestItem|transitionTypes|owlStatus|inArray|moveEvents|response|continue|buildControls|loading|lazyFollow|lazyPreload|lazyEffect|fade|onStartup|customEvents|wrapItems|eventTypes|naturalWidth|checkBrowser|originalClasses|outClass|inClass|originalStyles|abs|perspective|loadContent|extend|_data|round|msMaxTouchPoints|5e3|text|stopImmediatePropagation|stopPropagation|buttons|events|pop|splice|baseElWidth|minSwipe|maxSwipe|dargging|clientX|clientY|duration|destroyControls|createElement|mouseover|mouseout|numbers|which|lazyOwl|appendTo|clearTimeout|checked|shift|sort|removeAttr|match|fadeIn|400|clickable|toggleClass|wrapAll|top|prop|tagName|DIV|background|image|url|wrapperWidth|img|500|dragstart|ontouchstart|controls|out|input|relative|textarea|select|webkitAnimationEnd|oAnimationEnd|MSAnimationEnd|animationend|getJSON|returnValue|hasOwnProperty|option|onstartup|baseElement|navigator|new|prototype|destroy|removeData|reinit|addItem|after|before|removeItem|1199|979|768|479|800|1e3|carousel|jQuery|window|document".split(
      "|"
    ),
    0,
    {}
  )
);
$(function () {
  phoneMask('input[name="Feedback[phone]"]');
  $(document)
    .on(
      "beforeSubmit",
      "#calculate-form, #feedback-form, #legal-form",
      function (e) {
        var f = this;
        var form = $(this);
        var formData = form.serialize();
        $.ajax({
          url: form.attr("action"),
          type: form.attr("method"),
          data: formData,
          success: function (data) {
            f.reset();
            $("#feedback-modal,#calculate-modal").modal("hide");
            form.data("yiiActiveForm").validated = false;
            $("#success-modal").modal("show");
          },
          error: function () {
            $("#feedback-modal").modal("hide");
          },
        });
      }
    )
    .on("submit", "#calculate-form, #feedback-form, #legal-form", function (e) {
      e.preventDefault();
    });
  $(document)
    .on("beforeSubmit", "#contact-form", function (e) {
      var f = this;
      var form = $(this);
      var formData = form.serialize();
      $.ajax({
        url: form.attr("action"),
        type: form.attr("method"),
        data: formData,
        success: function (data) {
          f.reset();
          form.replaceWith(data.alert);
        },
        error: function () {},
      });
    })
    .on("submit", "#contact-form", function (e) {
      e.preventDefault();
    });
  if ($("#back-to-top").length) {
    var scrollTrigger = 100,
      backToTop = function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > scrollTrigger) {
          $("#back-to-top").addClass("show");
        } else {
          $("#back-to-top").removeClass("show");
        }
      };
    backToTop();
    $(window).on("scroll", function () {
      backToTop();
    });
    $("#back-to-top").on("click", function (e) {
      e.preventDefault();
      $("html,body").animate({ scrollTop: 0 }, 700);
    });
  }
  $(".active a").on("click", function () {
    $("#back-to-top").click();
    return false;
  });
  $(".press-consultation").on("click", function () {
    gtagEventSender.setState("consultation");
  });
  $(".press-specialist").on("click", function () {
    gtagEventSender.setState("specialist");
  });
  $(".press-calculate").on("click", function () {
    gtagEventSender.setState("calculate");
  });
  $(".press-order").on("click", function () {
    gtagEventSender.setState("order");
  });
  $(".press-call").on("click", function () {
    gtagEventSender.setState("call");
  });
  $(".press-callback").on("click", function () {
    gtagEventSender.setState("callback");
  });
  $(document).on("click", ".send-form", function () {
    gtagEventSender.pushEvent();
  });
  function phoneMask(maskCssSelector) {
    var phoneInput = maskCssSelector;
    if ($("body").find(phoneInput).length > 0) {
      $(phoneInput).mask("+38(000)000-00-00", {
        placeholder: "+38(000)000-00-00",
      });
      $(phoneInput).focus(function () {
        if ($(this).val() == "") {
          $(this).val("+38(0");
        }
      });
      $(phoneInput).focusout(function () {
        var phoneVal = $(this).val();
        if (phoneVal.length < 17) {
          $(this).val("");
        }
      });
    }
  }
  $("body").on("click", ".cokeis-close", function () {
    $(".cookie-modal").addClass("hide-bl");
    var date = new Date(new Date().getTime() + 48 * 60 * 60 * 1000);
    document.cookie = "sowCookieModal=1; path=/; expires=" + date.toUTCString();
  });
  if ($(".home-text-wr").length) {
    $(".home-text-wr").mCustomScrollbar({ theme: "minimal" });
  }
  var gtagEventSender = { state: "" };
  gtagEventSender.setState = function (newState) {
    this.state = newState;
  };
  gtagEventSender.pushEvent = function () {
    gtag("event", "send", { event_category: this.state });
    console.log(this.state);
  };
});
(function (b) {
  "function" === typeof define && define.amd
    ? define(["jquery"], b)
    : "object" === typeof exports
    ? (module.exports = b(require("jquery")))
    : b(jQuery || Zepto);
})(function (b) {
  var y = function (a, e, d) {
    var c = {
      invalid: [],
      getCaret: function () {
        try {
          var r,
            b = 0,
            e = a.get(0),
            d = document.selection,
            f = e.selectionStart;
          if (d && -1 === navigator.appVersion.indexOf("MSIE 10"))
            (r = d.createRange()),
              r.moveStart("character", -c.val().length),
              (b = r.text.length);
          else if (f || "0" === f) b = f;
          return b;
        } catch (g) {}
      },
      setCaret: function (r) {
        try {
          if (a.is(":focus")) {
            var c,
              b = a.get(0);
            b.setSelectionRange
              ? (b.focus(), b.setSelectionRange(r, r))
              : ((c = b.createTextRange()),
                c.collapse(!0),
                c.moveEnd("character", r),
                c.moveStart("character", r),
                c.select());
          }
        } catch (e) {}
      },
      events: function () {
        a.on("keydown.mask", function (c) {
          a.data("mask-keycode", c.keyCode || c.which);
        })
          .on(
            b.jMaskGlobals.useInput ? "input.mask" : "keyup.mask",
            c.behaviour
          )
          .on("paste.mask drop.mask", function () {
            setTimeout(function () {
              a.keydown().keyup();
            }, 100);
          })
          .on("change.mask", function () {
            a.data("changed", !0);
          })
          .on("blur.mask", function () {
            n === c.val() || a.data("changed") || a.trigger("change");
            a.data("changed", !1);
          })
          .on("blur.mask", function () {
            n = c.val();
          })
          .on("focus.mask", function (a) {
            !0 === d.selectOnFocus && b(a.target).select();
          })
          .on("focusout.mask", function () {
            d.clearIfNotMatch && !p.test(c.val()) && c.val("");
          });
      },
      getRegexMask: function () {
        for (var a = [], c, b, d, f, l = 0; l < e.length; l++)
          (c = g.translation[e.charAt(l)])
            ? ((b = c.pattern.toString().replace(/.{1}$|^.{1}/g, "")),
              (d = c.optional),
              (c = c.recursive)
                ? (a.push(e.charAt(l)),
                  (f = { digit: e.charAt(l), pattern: b }))
                : a.push(d || c ? b + "?" : b))
            : a.push(e.charAt(l).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
        a = a.join("");
        f &&
          (a = a
            .replace(
              new RegExp("(" + f.digit + "(.*" + f.digit + ")?)"),
              "($1)?"
            )
            .replace(new RegExp(f.digit, "g"), f.pattern));
        return new RegExp(a);
      },
      destroyEvents: function () {
        a.off(
          "input keydown keyup paste drop blur focusout "
            .split(" ")
            .join(".mask ")
        );
      },
      val: function (c) {
        var b = a.is("input") ? "val" : "text";
        if (0 < arguments.length) {
          if (a[b]() !== c) a[b](c);
          b = a;
        } else b = a[b]();
        return b;
      },
      getMCharsBeforeCount: function (a, c) {
        for (var b = 0, d = 0, f = e.length; d < f && d < a; d++)
          g.translation[e.charAt(d)] || ((a = c ? a + 1 : a), b++);
        return b;
      },
      caretPos: function (a, b, d, h) {
        return g.translation[e.charAt(Math.min(a - 1, e.length - 1))]
          ? Math.min(a + d - b - h, d)
          : c.caretPos(a + 1, b, d, h);
      },
      behaviour: function (d) {
        d = d || window.event;
        c.invalid = [];
        var e = a.data("mask-keycode");
        if (-1 === b.inArray(e, g.byPassKeys)) {
          var m = c.getCaret(),
            h = c.val().length,
            f = c.getMasked(),
            l = f.length,
            k = c.getMCharsBeforeCount(l - 1) - c.getMCharsBeforeCount(h - 1),
            n = m < h;
          c.val(f);
          n &&
            (8 !== e && 46 !== e && (m = c.caretPos(m, h, l, k)),
            c.setCaret(m));
          return c.callbacks(d);
        }
      },
      getMasked: function (a, b) {
        var m = [],
          h = void 0 === b ? c.val() : b + "",
          f = 0,
          l = e.length,
          k = 0,
          n = h.length,
          q = 1,
          p = "push",
          u = -1,
          t,
          w;
        d.reverse
          ? ((p = "unshift"),
            (q = -1),
            (t = 0),
            (f = l - 1),
            (k = n - 1),
            (w = function () {
              return -1 < f && -1 < k;
            }))
          : ((t = l - 1),
            (w = function () {
              return f < l && k < n;
            }));
        for (; w(); ) {
          var x = e.charAt(f),
            v = h.charAt(k),
            s = g.translation[x];
          if (s)
            v.match(s.pattern)
              ? (m[p](v),
                s.recursive &&
                  (-1 === u ? (u = f) : f === t && (f = u - q),
                  t === u && (f -= q)),
                (f += q))
              : s.optional
              ? ((f += q), (k -= q))
              : s.fallback
              ? (m[p](s.fallback), (f += q), (k -= q))
              : c.invalid.push({ p: k, v: v, e: s.pattern }),
              (k += q);
          else {
            if (!a) m[p](x);
            v === x && (k += q);
            f += q;
          }
        }
        h = e.charAt(t);
        l !== n + 1 || g.translation[h] || m.push(h);
        return m.join("");
      },
      callbacks: function (b) {
        var g = c.val(),
          m = g !== n,
          h = [g, b, a, d],
          f = function (a, b, c) {
            "function" === typeof d[a] && b && d[a].apply(this, c);
          };
        f("onChange", !0 === m, h);
        f("onKeyPress", !0 === m, h);
        f("onComplete", g.length === e.length, h);
        f("onInvalid", 0 < c.invalid.length, [g, b, a, c.invalid, d]);
      },
    };
    a = b(a);
    var g = this,
      n = c.val(),
      p;
    e = "function" === typeof e ? e(c.val(), void 0, a, d) : e;
    g.mask = e;
    g.options = d;
    g.remove = function () {
      var b = c.getCaret();
      c.destroyEvents();
      c.val(g.getCleanVal());
      c.setCaret(b - c.getMCharsBeforeCount(b));
      return a;
    };
    g.getCleanVal = function () {
      return c.getMasked(!0);
    };
    g.getMaskedVal = function (a) {
      return c.getMasked(!1, a);
    };
    g.init = function (e) {
      e = e || !1;
      d = d || {};
      g.clearIfNotMatch = b.jMaskGlobals.clearIfNotMatch;
      g.byPassKeys = b.jMaskGlobals.byPassKeys;
      g.translation = b.extend({}, b.jMaskGlobals.translation, d.translation);
      g = b.extend(!0, {}, g, d);
      p = c.getRegexMask();
      !1 === e
        ? (d.placeholder && a.attr("placeholder", d.placeholder),
          a.data("mask") && a.attr("autocomplete", "off"),
          c.destroyEvents(),
          c.events(),
          (e = c.getCaret()),
          c.val(c.getMasked()),
          c.setCaret(e + c.getMCharsBeforeCount(e, !0)))
        : (c.events(), c.val(c.getMasked()));
    };
    g.init(!a.is("input"));
  };
  b.maskWatchers = {};
  var A = function () {
      var a = b(this),
        e = {},
        d = a.attr("data-mask");
      a.attr("data-mask-reverse") && (e.reverse = !0);
      a.attr("data-mask-clearifnotmatch") && (e.clearIfNotMatch = !0);
      "true" === a.attr("data-mask-selectonfocus") && (e.selectOnFocus = !0);
      if (z(a, d, e)) return a.data("mask", new y(this, d, e));
    },
    z = function (a, e, d) {
      d = d || {};
      var c = b(a).data("mask"),
        g = JSON.stringify;
      a = b(a).val() || b(a).text();
      try {
        return (
          "function" === typeof e && (e = e(a)),
          "object" !== typeof c || g(c.options) !== g(d) || c.mask !== e
        );
      } catch (n) {}
    };
  b.fn.mask = function (a, e) {
    e = e || {};
    var d = this.selector,
      c = b.jMaskGlobals,
      g = c.watchInterval,
      c = e.watchInputs || c.watchInputs,
      n = function () {
        if (z(this, a, e)) return b(this).data("mask", new y(this, a, e));
      };
    b(this).each(n);
    d &&
      "" !== d &&
      c &&
      (clearInterval(b.maskWatchers[d]),
      (b.maskWatchers[d] = setInterval(function () {
        b(document).find(d).each(n);
      }, g)));
    return this;
  };
  b.fn.masked = function (a) {
    return this.data("mask").getMaskedVal(a);
  };
  b.fn.unmask = function () {
    clearInterval(b.maskWatchers[this.selector]);
    delete b.maskWatchers[this.selector];
    return this.each(function () {
      var a = b(this).data("mask");
      a && a.remove().removeData("mask");
    });
  };
  b.fn.cleanVal = function () {
    return this.data("mask").getCleanVal();
  };
  b.applyDataMask = function (a) {
    a = a || b.jMaskGlobals.maskElements;
    (a instanceof b ? a : b(a)).filter(b.jMaskGlobals.dataMaskAttr).each(A);
  };
  var p = {
    maskElements: "input,td,span,div",
    dataMaskAttr: "*[data-mask]",
    dataMask: !0,
    watchInterval: 300,
    watchInputs: !0,
    useInput: (function (a) {
      var b = document.createElement("div"),
        d;
      a = "on" + a;
      d = a in b;
      d || (b.setAttribute(a, "return;"), (d = "function" === typeof b[a]));
      return d;
    })("input"),
    watchDataMask: !1,
    byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
    translation: {
      0: { pattern: /\d/ },
      9: { pattern: /\d/, optional: !0 },
      "#": { pattern: /\d/, recursive: !0 },
      A: { pattern: /[a-zA-Z0-9]/ },
      S: { pattern: /[a-zA-Z]/ },
    },
  };
  b.jMaskGlobals = b.jMaskGlobals || {};
  p = b.jMaskGlobals = b.extend(!0, {}, p, b.jMaskGlobals);
  p.dataMask && b.applyDataMask();
  setInterval(function () {
    b.jMaskGlobals.watchDataMask && b.applyDataMask();
  }, p.watchInterval);
});
!(function (a) {
  "function" == typeof define && define.amd
    ? define(["jquery"], a)
    : "object" == typeof exports
    ? (module.exports = a)
    : a(jQuery);
})(function (a) {
  function b(b) {
    var g = b || window.event,
      h = i.call(arguments, 1),
      j = 0,
      l = 0,
      m = 0,
      n = 0,
      o = 0,
      p = 0;
    if (
      ((b = a.event.fix(g)),
      (b.type = "mousewheel"),
      "detail" in g && (m = -1 * g.detail),
      "wheelDelta" in g && (m = g.wheelDelta),
      "wheelDeltaY" in g && (m = g.wheelDeltaY),
      "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX),
      "axis" in g && g.axis === g.HORIZONTAL_AXIS && ((l = -1 * m), (m = 0)),
      (j = 0 === m ? l : m),
      "deltaY" in g && ((m = -1 * g.deltaY), (j = m)),
      "deltaX" in g && ((l = g.deltaX), 0 === m && (j = -1 * l)),
      0 !== m || 0 !== l)
    ) {
      if (1 === g.deltaMode) {
        var q = a.data(this, "mousewheel-line-height");
        (j *= q), (m *= q), (l *= q);
      } else if (2 === g.deltaMode) {
        var r = a.data(this, "mousewheel-page-height");
        (j *= r), (m *= r), (l *= r);
      }
      if (
        ((n = Math.max(Math.abs(m), Math.abs(l))),
        (!f || f > n) && ((f = n), d(g, n) && (f /= 40)),
        d(g, n) && ((j /= 40), (l /= 40), (m /= 40)),
        (j = Math[j >= 1 ? "floor" : "ceil"](j / f)),
        (l = Math[l >= 1 ? "floor" : "ceil"](l / f)),
        (m = Math[m >= 1 ? "floor" : "ceil"](m / f)),
        k.settings.normalizeOffset && this.getBoundingClientRect)
      ) {
        var s = this.getBoundingClientRect();
        (o = b.clientX - s.left), (p = b.clientY - s.top);
      }
      return (
        (b.deltaX = l),
        (b.deltaY = m),
        (b.deltaFactor = f),
        (b.offsetX = o),
        (b.offsetY = p),
        (b.deltaMode = 0),
        h.unshift(b, j, l, m),
        e && clearTimeout(e),
        (e = setTimeout(c, 200)),
        (a.event.dispatch || a.event.handle).apply(this, h)
      );
    }
  }
  function c() {
    f = null;
  }
  function d(a, b) {
    return (
      k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0
    );
  }
  var e,
    f,
    g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
    h =
      "onwheel" in document || document.documentMode >= 9
        ? ["wheel"]
        : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
    i = Array.prototype.slice;
  if (a.event.fixHooks)
    for (var j = g.length; j; ) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
  var k = (a.event.special.mousewheel = {
    version: "3.1.12",
    setup: function () {
      if (this.addEventListener)
        for (var c = h.length; c; ) this.addEventListener(h[--c], b, !1);
      else this.onmousewheel = b;
      a.data(this, "mousewheel-line-height", k.getLineHeight(this)),
        a.data(this, "mousewheel-page-height", k.getPageHeight(this));
    },
    teardown: function () {
      if (this.removeEventListener)
        for (var c = h.length; c; ) this.removeEventListener(h[--c], b, !1);
      else this.onmousewheel = null;
      a.removeData(this, "mousewheel-line-height"),
        a.removeData(this, "mousewheel-page-height");
    },
    getLineHeight: function (b) {
      var c = a(b),
        d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();
      return (
        d.length || (d = a("body")),
        parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16
      );
    },
    getPageHeight: function (b) {
      return a(b).height();
    },
    settings: { adjustOldDeltas: !0, normalizeOffset: !0 },
  });
  a.fn.extend({
    mousewheel: function (a) {
      return a ? this.bind("mousewheel", a) : this.trigger("mousewheel");
    },
    unmousewheel: function (a) {
      return this.unbind("mousewheel", a);
    },
  });
});
!(function (e) {
  "undefined" != typeof module && module.exports
    ? (module.exports = e)
    : e(jQuery, window, document);
})(function (e) {
  !(function (t) {
    var o = "function" == typeof define && define.amd,
      a = "undefined" != typeof module && module.exports,
      n = "https:" == document.location.protocol ? "https:" : "http:",
      i =
        "cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.12/jquery.mousewheel.min.js";
    o ||
      (a
        ? require("jquery-mousewheel")(e)
        : e.event.special.mousewheel ||
          e("head").append(
            decodeURI("%3Cscript src=" + n + "//" + i + "%3E%3C/script%3E")
          )),
      t();
  })(function () {
    var t,
      o = "mCustomScrollbar",
      a = "mCS",
      n = ".mCustomScrollbar",
      i = {
        setTop: 0,
        setLeft: 0,
        axis: "y",
        scrollbarPosition: "inside",
        scrollInertia: 950,
        autoDraggerLength: !0,
        alwaysShowScrollbar: 0,
        snapOffset: 0,
        mouseWheel: {
          enable: !0,
          scrollAmount: "auto",
          axis: "y",
          deltaFactor: "auto",
          disableOver: ["select", "option", "keygen", "datalist", "textarea"],
        },
        scrollButtons: { scrollType: "stepless", scrollAmount: "auto" },
        keyboard: { enable: !0, scrollType: "stepless", scrollAmount: "auto" },
        contentTouchScroll: 25,
        advanced: {
          autoScrollOnFocus:
            "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
          updateOnContentResize: !0,
          updateOnImageLoad: !0,
          autoUpdateTimeout: 60,
        },
        theme: "light",
        callbacks: {
          onTotalScrollOffset: 0,
          onTotalScrollBackOffset: 0,
          alwaysTriggerOffsets: !0,
        },
      },
      r = 0,
      l = {},
      s = window.attachEvent && !window.addEventListener ? 1 : 0,
      c = !1,
      d = [
        "mCSB_dragger_onDrag",
        "mCSB_scrollTools_onDrag",
        "mCS_img_loaded",
        "mCS_disabled",
        "mCS_destroyed",
        "mCS_no_scrollbar",
        "mCS-autoHide",
        "mCS-dir-rtl",
        "mCS_no_scrollbar_y",
        "mCS_no_scrollbar_x",
        "mCS_y_hidden",
        "mCS_x_hidden",
        "mCSB_draggerContainer",
        "mCSB_buttonUp",
        "mCSB_buttonDown",
        "mCSB_buttonLeft",
        "mCSB_buttonRight",
      ],
      u = {
        init: function (t) {
          var t = e.extend(!0, {}, i, t),
            o = f.call(this);
          if (t.live) {
            var s = t.liveSelector || this.selector || n,
              c = e(s);
            if ("off" === t.live) return void m(s);
            l[s] = setTimeout(function () {
              c.mCustomScrollbar(t), "once" === t.live && c.length && m(s);
            }, 500);
          } else m(s);
          return (
            (t.setWidth = t.set_width ? t.set_width : t.setWidth),
            (t.setHeight = t.set_height ? t.set_height : t.setHeight),
            (t.axis = t.horizontalScroll ? "x" : p(t.axis)),
            (t.scrollInertia =
              t.scrollInertia > 0 && t.scrollInertia < 17
                ? 17
                : t.scrollInertia),
            "object" != typeof t.mouseWheel &&
              1 == t.mouseWheel &&
              (t.mouseWheel = {
                enable: !0,
                scrollAmount: "auto",
                axis: "y",
                preventDefault: !1,
                deltaFactor: "auto",
                normalizeDelta: !1,
                invert: !1,
              }),
            (t.mouseWheel.scrollAmount = t.mouseWheelPixels
              ? t.mouseWheelPixels
              : t.mouseWheel.scrollAmount),
            (t.mouseWheel.normalizeDelta = t.advanced.normalizeMouseWheelDelta
              ? t.advanced.normalizeMouseWheelDelta
              : t.mouseWheel.normalizeDelta),
            (t.scrollButtons.scrollType = g(t.scrollButtons.scrollType)),
            h(t),
            e(o).each(function () {
              var o = e(this);
              if (!o.data(a)) {
                o.data(a, {
                  idx: ++r,
                  opt: t,
                  scrollRatio: { y: null, x: null },
                  overflowed: null,
                  contentReset: { y: null, x: null },
                  bindEvents: !1,
                  tweenRunning: !1,
                  sequential: {},
                  langDir: o.css("direction"),
                  cbOffsets: null,
                  trigger: null,
                });
                var n = o.data(a),
                  i = n.opt,
                  l = o.data("mcs-axis"),
                  s = o.data("mcs-scrollbar-position"),
                  c = o.data("mcs-theme");
                l && (i.axis = l),
                  s && (i.scrollbarPosition = s),
                  c && ((i.theme = c), h(i)),
                  v.call(this),
                  e(
                    "#mCSB_" + n.idx + "_container img:not(." + d[2] + ")"
                  ).addClass(d[2]),
                  u.update.call(null, o);
              }
            })
          );
        },
        update: function (t, o) {
          var n = t || f.call(this);
          return e(n).each(function () {
            var t = e(this);
            if (t.data(a)) {
              var n = t.data(a),
                i = n.opt,
                r = e("#mCSB_" + n.idx + "_container"),
                l = [
                  e("#mCSB_" + n.idx + "_dragger_vertical"),
                  e("#mCSB_" + n.idx + "_dragger_horizontal"),
                ];
              if (!r.length) return;
              n.tweenRunning && V(t),
                t.hasClass(d[3]) && t.removeClass(d[3]),
                t.hasClass(d[4]) && t.removeClass(d[4]),
                S.call(this),
                _.call(this),
                "y" === i.axis ||
                  i.advanced.autoExpandHorizontalScroll ||
                  r.css("width", x(r.children())),
                (n.overflowed = B.call(this)),
                O.call(this),
                i.autoDraggerLength && b.call(this),
                C.call(this),
                k.call(this);
              var s = [Math.abs(r[0].offsetTop), Math.abs(r[0].offsetLeft)];
              "x" !== i.axis &&
                (n.overflowed[0]
                  ? l[0].height() > l[0].parent().height()
                    ? T.call(this)
                    : (Q(t, s[0].toString(), {
                        dir: "y",
                        dur: 0,
                        overwrite: "none",
                      }),
                      (n.contentReset.y = null))
                  : (T.call(this),
                    "y" === i.axis
                      ? M.call(this)
                      : "yx" === i.axis &&
                        n.overflowed[1] &&
                        Q(t, s[1].toString(), {
                          dir: "x",
                          dur: 0,
                          overwrite: "none",
                        }))),
                "y" !== i.axis &&
                  (n.overflowed[1]
                    ? l[1].width() > l[1].parent().width()
                      ? T.call(this)
                      : (Q(t, s[1].toString(), {
                          dir: "x",
                          dur: 0,
                          overwrite: "none",
                        }),
                        (n.contentReset.x = null))
                    : (T.call(this),
                      "x" === i.axis
                        ? M.call(this)
                        : "yx" === i.axis &&
                          n.overflowed[0] &&
                          Q(t, s[0].toString(), {
                            dir: "y",
                            dur: 0,
                            overwrite: "none",
                          }))),
                o &&
                  n &&
                  (2 === o &&
                  i.callbacks.onImageLoad &&
                  "function" == typeof i.callbacks.onImageLoad
                    ? i.callbacks.onImageLoad.call(this)
                    : 3 === o &&
                      i.callbacks.onSelectorChange &&
                      "function" == typeof i.callbacks.onSelectorChange
                    ? i.callbacks.onSelectorChange.call(this)
                    : i.callbacks.onUpdate &&
                      "function" == typeof i.callbacks.onUpdate &&
                      i.callbacks.onUpdate.call(this)),
                X.call(this);
            }
          });
        },
        scrollTo: function (t, o) {
          if ("undefined" != typeof t && null != t) {
            var n = f.call(this);
            return e(n).each(function () {
              var n = e(this);
              if (n.data(a)) {
                var i = n.data(a),
                  r = i.opt,
                  l = {
                    trigger: "external",
                    scrollInertia: r.scrollInertia,
                    scrollEasing: "mcsEaseInOut",
                    moveDragger: !1,
                    timeout: 60,
                    callbacks: !0,
                    onStart: !0,
                    onUpdate: !0,
                    onComplete: !0,
                  },
                  s = e.extend(!0, {}, l, o),
                  c = Y.call(this, t),
                  d =
                    s.scrollInertia > 0 && s.scrollInertia < 17
                      ? 17
                      : s.scrollInertia;
                (c[0] = j.call(this, c[0], "y")),
                  (c[1] = j.call(this, c[1], "x")),
                  s.moveDragger &&
                    ((c[0] *= i.scrollRatio.y), (c[1] *= i.scrollRatio.x)),
                  (s.dur = d),
                  setTimeout(function () {
                    null !== c[0] &&
                      "undefined" != typeof c[0] &&
                      "x" !== r.axis &&
                      i.overflowed[0] &&
                      ((s.dir = "y"),
                      (s.overwrite = "all"),
                      Q(n, c[0].toString(), s)),
                      null !== c[1] &&
                        "undefined" != typeof c[1] &&
                        "y" !== r.axis &&
                        i.overflowed[1] &&
                        ((s.dir = "x"),
                        (s.overwrite = "none"),
                        Q(n, c[1].toString(), s));
                  }, s.timeout);
              }
            });
          }
        },
        stop: function () {
          var t = f.call(this);
          return e(t).each(function () {
            var t = e(this);
            t.data(a) && V(t);
          });
        },
        disable: function (t) {
          var o = f.call(this);
          return e(o).each(function () {
            var o = e(this);
            if (o.data(a)) {
              {
                o.data(a);
              }
              X.call(this, "remove"),
                M.call(this),
                t && T.call(this),
                O.call(this, !0),
                o.addClass(d[3]);
            }
          });
        },
        destroy: function () {
          var t = f.call(this);
          return e(t).each(function () {
            var n = e(this);
            if (n.data(a)) {
              var i = n.data(a),
                r = i.opt,
                l = e("#mCSB_" + i.idx),
                s = e("#mCSB_" + i.idx + "_container"),
                c = e(".mCSB_" + i.idx + "_scrollbar");
              r.live && m(r.liveSelector || e(t).selector),
                X.call(this, "remove"),
                M.call(this),
                T.call(this),
                n.removeData(a),
                Z(this, "mcs"),
                c.remove(),
                s.find("img." + d[2]).removeClass(d[2]),
                l.replaceWith(s.contents()),
                n
                  .removeClass(
                    o +
                      " _" +
                      a +
                      "_" +
                      i.idx +
                      " " +
                      d[6] +
                      " " +
                      d[7] +
                      " " +
                      d[5] +
                      " " +
                      d[3]
                  )
                  .addClass(d[4]);
            }
          });
        },
      },
      f = function () {
        return "object" != typeof e(this) || e(this).length < 1 ? n : this;
      },
      h = function (t) {
        var o = [
            "rounded",
            "rounded-dark",
            "rounded-dots",
            "rounded-dots-dark",
          ],
          a = [
            "rounded-dots",
            "rounded-dots-dark",
            "3d",
            "3d-dark",
            "3d-thick",
            "3d-thick-dark",
            "inset",
            "inset-dark",
            "inset-2",
            "inset-2-dark",
            "inset-3",
            "inset-3-dark",
          ],
          n = ["minimal", "minimal-dark"],
          i = ["minimal", "minimal-dark"],
          r = ["minimal", "minimal-dark"];
        (t.autoDraggerLength =
          e.inArray(t.theme, o) > -1 ? !1 : t.autoDraggerLength),
          (t.autoExpandScrollbar =
            e.inArray(t.theme, a) > -1 ? !1 : t.autoExpandScrollbar),
          (t.scrollButtons.enable =
            e.inArray(t.theme, n) > -1 ? !1 : t.scrollButtons.enable),
          (t.autoHideScrollbar =
            e.inArray(t.theme, i) > -1 ? !0 : t.autoHideScrollbar),
          (t.scrollbarPosition =
            e.inArray(t.theme, r) > -1 ? "outside" : t.scrollbarPosition);
      },
      m = function (e) {
        l[e] && (clearTimeout(l[e]), Z(l, e));
      },
      p = function (e) {
        return "yx" === e || "xy" === e || "auto" === e
          ? "yx"
          : "x" === e || "horizontal" === e
          ? "x"
          : "y";
      },
      g = function (e) {
        return "stepped" === e ||
          "pixels" === e ||
          "step" === e ||
          "click" === e
          ? "stepped"
          : "stepless";
      },
      v = function () {
        var t = e(this),
          n = t.data(a),
          i = n.opt,
          r = i.autoExpandScrollbar ? " " + d[1] + "_expand" : "",
          l = [
            "<div id='mCSB_" +
              n.idx +
              "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" +
              n.idx +
              "_scrollbar mCS-" +
              i.theme +
              " mCSB_scrollTools_vertical" +
              r +
              "'><div class='" +
              d[12] +
              "'><div id='mCSB_" +
              n.idx +
              "_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>",
            "<div id='mCSB_" +
              n.idx +
              "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" +
              n.idx +
              "_scrollbar mCS-" +
              i.theme +
              " mCSB_scrollTools_horizontal" +
              r +
              "'><div class='" +
              d[12] +
              "'><div id='mCSB_" +
              n.idx +
              "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>",
          ],
          s =
            "yx" === i.axis
              ? "mCSB_vertical_horizontal"
              : "x" === i.axis
              ? "mCSB_horizontal"
              : "mCSB_vertical",
          c = "yx" === i.axis ? l[0] + l[1] : "x" === i.axis ? l[1] : l[0],
          u =
            "yx" === i.axis
              ? "<div id='mCSB_" +
                n.idx +
                "_container_wrapper' class='mCSB_container_wrapper' />"
              : "",
          f = i.autoHideScrollbar ? " " + d[6] : "",
          h = "x" !== i.axis && "rtl" === n.langDir ? " " + d[7] : "";
        i.setWidth && t.css("width", i.setWidth),
          i.setHeight && t.css("height", i.setHeight),
          (i.setLeft =
            "y" !== i.axis && "rtl" === n.langDir ? "989999px" : i.setLeft),
          t
            .addClass(o + " _" + a + "_" + n.idx + f + h)
            .wrapInner(
              "<div id='mCSB_" +
                n.idx +
                "' class='mCustomScrollBox mCS-" +
                i.theme +
                " " +
                s +
                "'><div id='mCSB_" +
                n.idx +
                "_container' class='mCSB_container' style='position:relative; top:" +
                i.setTop +
                "; left:" +
                i.setLeft +
                ";' dir=" +
                n.langDir +
                " /></div>"
            );
        var m = e("#mCSB_" + n.idx),
          p = e("#mCSB_" + n.idx + "_container");
        "y" === i.axis ||
          i.advanced.autoExpandHorizontalScroll ||
          p.css("width", x(p.children())),
          "outside" === i.scrollbarPosition
            ? ("static" === t.css("position") && t.css("position", "relative"),
              t.css("overflow", "visible"),
              m.addClass("mCSB_outside").after(c))
            : (m.addClass("mCSB_inside").append(c), p.wrap(u)),
          w.call(this);
        var g = [
          e("#mCSB_" + n.idx + "_dragger_vertical"),
          e("#mCSB_" + n.idx + "_dragger_horizontal"),
        ];
        g[0].css("min-height", g[0].height()),
          g[1].css("min-width", g[1].width());
      },
      x = function (t) {
        return Math.max.apply(
          Math,
          t
            .map(function () {
              return e(this).outerWidth(!0);
            })
            .get()
        );
      },
      _ = function () {
        var t = e(this),
          o = t.data(a),
          n = o.opt,
          i = e("#mCSB_" + o.idx + "_container");
        n.advanced.autoExpandHorizontalScroll &&
          "y" !== n.axis &&
          i
            .css({ position: "absolute", width: "auto" })
            .wrap(
              "<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />"
            )
            .css({
              width:
                Math.ceil(i[0].getBoundingClientRect().right + 0.4) -
                Math.floor(i[0].getBoundingClientRect().left),
              position: "relative",
            })
            .unwrap();
      },
      w = function () {
        var t = e(this),
          o = t.data(a),
          n = o.opt,
          i = e(".mCSB_" + o.idx + "_scrollbar:first"),
          r = te(n.scrollButtons.tabindex)
            ? "tabindex='" + n.scrollButtons.tabindex + "'"
            : "",
          l = [
            "<a href='#' class='" +
              d[13] +
              "' oncontextmenu='return false;' " +
              r +
              " />",
            "<a href='#' class='" +
              d[14] +
              "' oncontextmenu='return false;' " +
              r +
              " />",
            "<a href='#' class='" +
              d[15] +
              "' oncontextmenu='return false;' " +
              r +
              " />",
            "<a href='#' class='" +
              d[16] +
              "' oncontextmenu='return false;' " +
              r +
              " />",
          ],
          s = [
            "x" === n.axis ? l[2] : l[0],
            "x" === n.axis ? l[3] : l[1],
            l[2],
            l[3],
          ];
        n.scrollButtons.enable &&
          i
            .prepend(s[0])
            .append(s[1])
            .next(".mCSB_scrollTools")
            .prepend(s[2])
            .append(s[3]);
      },
      S = function () {
        var t = e(this),
          o = t.data(a),
          n = e("#mCSB_" + o.idx),
          i = t.css("max-height") || "none",
          r = -1 !== i.indexOf("%"),
          l = t.css("box-sizing");
        if ("none" !== i) {
          var s = r ? (t.parent().height() * parseInt(i)) / 100 : parseInt(i);
          "border-box" === l &&
            (s -=
              t.innerHeight() -
              t.height() +
              (t.outerHeight() - t.innerHeight())),
            n.css("max-height", Math.round(s));
        }
      },
      b = function () {
        var t = e(this),
          o = t.data(a),
          n = e("#mCSB_" + o.idx),
          i = e("#mCSB_" + o.idx + "_container"),
          r = [
            e("#mCSB_" + o.idx + "_dragger_vertical"),
            e("#mCSB_" + o.idx + "_dragger_horizontal"),
          ],
          l = [n.height() / i.outerHeight(!1), n.width() / i.outerWidth(!1)],
          c = [
            parseInt(r[0].css("min-height")),
            Math.round(l[0] * r[0].parent().height()),
            parseInt(r[1].css("min-width")),
            Math.round(l[1] * r[1].parent().width()),
          ],
          d = s && c[1] < c[0] ? c[0] : c[1],
          u = s && c[3] < c[2] ? c[2] : c[3];
        r[0]
          .css({ height: d, "max-height": r[0].parent().height() - 10 })
          .find(".mCSB_dragger_bar")
          .css({ "line-height": c[0] + "px" }),
          r[1].css({ width: u, "max-width": r[1].parent().width() - 10 });
      },
      C = function () {
        var t = e(this),
          o = t.data(a),
          n = e("#mCSB_" + o.idx),
          i = e("#mCSB_" + o.idx + "_container"),
          r = [
            e("#mCSB_" + o.idx + "_dragger_vertical"),
            e("#mCSB_" + o.idx + "_dragger_horizontal"),
          ],
          l = [i.outerHeight(!1) - n.height(), i.outerWidth(!1) - n.width()],
          s = [
            l[0] / (r[0].parent().height() - r[0].height()),
            l[1] / (r[1].parent().width() - r[1].width()),
          ];
        o.scrollRatio = { y: s[0], x: s[1] };
      },
      y = function (e, t, o) {
        var a = o ? d[0] + "_expanded" : "",
          n = e.closest(".mCSB_scrollTools");
        "active" === t
          ? (e.toggleClass(d[0] + " " + a),
            n.toggleClass(d[1]),
            (e[0]._draggable = e[0]._draggable ? 0 : 1))
          : e[0]._draggable ||
            ("hide" === t
              ? (e.removeClass(d[0]), n.removeClass(d[1]))
              : (e.addClass(d[0]), n.addClass(d[1])));
      },
      B = function () {
        var t = e(this),
          o = t.data(a),
          n = e("#mCSB_" + o.idx),
          i = e("#mCSB_" + o.idx + "_container"),
          r = null == o.overflowed ? i.height() : i.outerHeight(!1),
          l = null == o.overflowed ? i.width() : i.outerWidth(!1);
        return [r > n.height(), l > n.width()];
      },
      T = function () {
        var t = e(this),
          o = t.data(a),
          n = o.opt,
          i = e("#mCSB_" + o.idx),
          r = e("#mCSB_" + o.idx + "_container"),
          l = [
            e("#mCSB_" + o.idx + "_dragger_vertical"),
            e("#mCSB_" + o.idx + "_dragger_horizontal"),
          ];
        if (
          (V(t),
          (("x" !== n.axis && !o.overflowed[0]) ||
            ("y" === n.axis && o.overflowed[0])) &&
            (l[0].add(r).css("top", 0), Q(t, "_resetY")),
          ("y" !== n.axis && !o.overflowed[1]) ||
            ("x" === n.axis && o.overflowed[1]))
        ) {
          var s = (dx = 0);
          "rtl" === o.langDir &&
            ((s = i.width() - r.outerWidth(!1)),
            (dx = Math.abs(s / o.scrollRatio.x))),
            r.css("left", s),
            l[1].css("left", dx),
            Q(t, "_resetX");
        }
      },
      k = function () {
        function t() {
          r = setTimeout(function () {
            e.event.special.mousewheel ? (clearTimeout(r), W.call(o[0])) : t();
          }, 100);
        }
        var o = e(this),
          n = o.data(a),
          i = n.opt;
        if (!n.bindEvents) {
          if (
            (R.call(this),
            i.contentTouchScroll && D.call(this),
            E.call(this),
            i.mouseWheel.enable)
          ) {
            var r;
            t();
          }
          P.call(this),
            H.call(this),
            i.advanced.autoScrollOnFocus && z.call(this),
            i.scrollButtons.enable && U.call(this),
            i.keyboard.enable && F.call(this),
            (n.bindEvents = !0);
        }
      },
      M = function () {
        var t = e(this),
          o = t.data(a),
          n = o.opt,
          i = a + "_" + o.idx,
          r = ".mCSB_" + o.idx + "_scrollbar",
          l = e(
            "#mCSB_" +
              o.idx +
              ",#mCSB_" +
              o.idx +
              "_container,#mCSB_" +
              o.idx +
              "_container_wrapper," +
              r +
              " ." +
              d[12] +
              ",#mCSB_" +
              o.idx +
              "_dragger_vertical,#mCSB_" +
              o.idx +
              "_dragger_horizontal," +
              r +
              ">a"
          ),
          s = e("#mCSB_" + o.idx + "_container");
        n.advanced.releaseDraggableSelectors &&
          l.add(e(n.advanced.releaseDraggableSelectors)),
          o.bindEvents &&
            (e(document).unbind("." + i),
            l.each(function () {
              e(this).unbind("." + i);
            }),
            clearTimeout(t[0]._focusTimeout),
            Z(t[0], "_focusTimeout"),
            clearTimeout(o.sequential.step),
            Z(o.sequential, "step"),
            clearTimeout(s[0].onCompleteTimeout),
            Z(s[0], "onCompleteTimeout"),
            (o.bindEvents = !1));
      },
      O = function (t) {
        var o = e(this),
          n = o.data(a),
          i = n.opt,
          r = e("#mCSB_" + n.idx + "_container_wrapper"),
          l = r.length ? r : e("#mCSB_" + n.idx + "_container"),
          s = [
            e("#mCSB_" + n.idx + "_scrollbar_vertical"),
            e("#mCSB_" + n.idx + "_scrollbar_horizontal"),
          ],
          c = [s[0].find(".mCSB_dragger"), s[1].find(".mCSB_dragger")];
        "x" !== i.axis &&
          (n.overflowed[0] && !t
            ? (s[0].add(c[0]).add(s[0].children("a")).css("display", "block"),
              l.removeClass(d[8] + " " + d[10]))
            : (i.alwaysShowScrollbar
                ? (2 !== i.alwaysShowScrollbar && c[0].css("display", "none"),
                  l.removeClass(d[10]))
                : (s[0].css("display", "none"), l.addClass(d[10])),
              l.addClass(d[8]))),
          "y" !== i.axis &&
            (n.overflowed[1] && !t
              ? (s[1].add(c[1]).add(s[1].children("a")).css("display", "block"),
                l.removeClass(d[9] + " " + d[11]))
              : (i.alwaysShowScrollbar
                  ? (2 !== i.alwaysShowScrollbar && c[1].css("display", "none"),
                    l.removeClass(d[11]))
                  : (s[1].css("display", "none"), l.addClass(d[11])),
                l.addClass(d[9]))),
          n.overflowed[0] || n.overflowed[1]
            ? o.removeClass(d[5])
            : o.addClass(d[5]);
      },
      I = function (e) {
        var t = e.type;
        switch (t) {
          case "pointerdown":
          case "MSPointerDown":
          case "pointermove":
          case "MSPointerMove":
          case "pointerup":
          case "MSPointerUp":
            return e.target.ownerDocument !== document
              ? [e.originalEvent.screenY, e.originalEvent.screenX, !1]
              : [e.originalEvent.pageY, e.originalEvent.pageX, !1];
          case "touchstart":
          case "touchmove":
          case "touchend":
            var o =
                e.originalEvent.touches[0] || e.originalEvent.changedTouches[0],
              a =
                e.originalEvent.touches.length ||
                e.originalEvent.changedTouches.length;
            return e.target.ownerDocument !== document
              ? [o.screenY, o.screenX, a > 1]
              : [o.pageY, o.pageX, a > 1];
          default:
            return [e.pageY, e.pageX, !1];
        }
      },
      R = function () {
        function t(e) {
          var t = m.find("iframe");
          if (t.length) {
            var o = e ? "auto" : "none";
            t.css("pointer-events", o);
          }
        }
        function o(e, t, o, a) {
          if (
            ((m[0].idleTimer = u.scrollInertia < 233 ? 250 : 0),
            n.attr("id") === h[1])
          )
            var i = "x",
              r = (n[0].offsetLeft - t + a) * d.scrollRatio.x;
          else
            var i = "y",
              r = (n[0].offsetTop - e + o) * d.scrollRatio.y;
          Q(l, r.toString(), { dir: i, drag: !0 });
        }
        var n,
          i,
          r,
          l = e(this),
          d = l.data(a),
          u = d.opt,
          f = a + "_" + d.idx,
          h = [
            "mCSB_" + d.idx + "_dragger_vertical",
            "mCSB_" + d.idx + "_dragger_horizontal",
          ],
          m = e("#mCSB_" + d.idx + "_container"),
          p = e("#" + h[0] + ",#" + h[1]),
          g = u.advanced.releaseDraggableSelectors
            ? p.add(e(u.advanced.releaseDraggableSelectors))
            : p;
        p
          .bind(
            "mousedown." +
              f +
              " touchstart." +
              f +
              " pointerdown." +
              f +
              " MSPointerDown." +
              f,
            function (o) {
              if ((o.stopImmediatePropagation(), o.preventDefault(), $(o))) {
                (c = !0),
                  s &&
                    (document.onselectstart = function () {
                      return !1;
                    }),
                  t(!1),
                  V(l),
                  (n = e(this));
                var a = n.offset(),
                  d = I(o)[0] - a.top,
                  f = I(o)[1] - a.left,
                  h = n.height() + a.top,
                  m = n.width() + a.left;
                h > d && d > 0 && m > f && f > 0 && ((i = d), (r = f)),
                  y(n, "active", u.autoExpandScrollbar);
              }
            }
          )
          .bind("touchmove." + f, function (e) {
            e.stopImmediatePropagation(), e.preventDefault();
            var t = n.offset(),
              a = I(e)[0] - t.top,
              l = I(e)[1] - t.left;
            o(i, r, a, l);
          }),
          e(document)
            .bind(
              "mousemove." + f + " pointermove." + f + " MSPointerMove." + f,
              function (e) {
                if (n) {
                  var t = n.offset(),
                    a = I(e)[0] - t.top,
                    l = I(e)[1] - t.left;
                  if (i === a) return;
                  o(i, r, a, l);
                }
              }
            )
            .add(g)
            .bind(
              "mouseup." +
                f +
                " touchend." +
                f +
                " pointerup." +
                f +
                " MSPointerUp." +
                f,
              function (e) {
                n && (y(n, "active", u.autoExpandScrollbar), (n = null)),
                  (c = !1),
                  s && (document.onselectstart = null),
                  t(!0);
              }
            );
      },
      D = function () {
        function o(e) {
          if (!ee(e) || c || I(e)[2]) return void (t = 0);
          (t = 1), (S = 0), (b = 0), C.removeClass("mCS_touch_action");
          var o = M.offset();
          (d = I(e)[0] - o.top),
            (u = I(e)[1] - o.left),
            (A = [I(e)[0], I(e)[1]]);
        }
        function n(e) {
          if (
            ee(e) &&
            !c &&
            !I(e)[2] &&
            (e.stopImmediatePropagation(), !b || S)
          ) {
            p = J();
            var t = k.offset(),
              o = I(e)[0] - t.top,
              a = I(e)[1] - t.left,
              n = "mcsLinearOut";
            if (
              (R.push(o),
              D.push(a),
              (A[2] = Math.abs(I(e)[0] - A[0])),
              (A[3] = Math.abs(I(e)[1] - A[1])),
              y.overflowed[0])
            )
              var i = O[0].parent().height() - O[0].height(),
                r =
                  d - o > 0 &&
                  o - d > -(i * y.scrollRatio.y) &&
                  (2 * A[3] < A[2] || "yx" === B.axis);
            if (y.overflowed[1])
              var l = O[1].parent().width() - O[1].width(),
                f =
                  u - a > 0 &&
                  a - u > -(l * y.scrollRatio.x) &&
                  (2 * A[2] < A[3] || "yx" === B.axis);
            r || f
              ? (e.preventDefault(), (S = 1))
              : ((b = 1), C.addClass("mCS_touch_action")),
              (_ =
                "yx" === B.axis
                  ? [d - o, u - a]
                  : "x" === B.axis
                  ? [null, u - a]
                  : [d - o, null]),
              (M[0].idleTimer = 250),
              y.overflowed[0] && s(_[0], E, n, "y", "all", !0),
              y.overflowed[1] && s(_[1], E, n, "x", W, !0);
          }
        }
        function i(e) {
          if (!ee(e) || c || I(e)[2]) return void (t = 0);
          (t = 1), e.stopImmediatePropagation(), V(C), (m = J());
          var o = k.offset();
          (f = I(e)[0] - o.top), (h = I(e)[1] - o.left), (R = []), (D = []);
        }
        function r(e) {
          if (ee(e) && !c && !I(e)[2]) {
            e.stopImmediatePropagation(), (S = 0), (b = 0), (g = J());
            var t = k.offset(),
              o = I(e)[0] - t.top,
              a = I(e)[1] - t.left;
            if (!(g - p > 30)) {
              x = 1e3 / (g - m);
              var n = "mcsEaseOut",
                i = 2.5 > x,
                r = i ? [R[R.length - 2], D[D.length - 2]] : [0, 0];
              v = i ? [o - r[0], a - r[1]] : [o - f, a - h];
              var d = [Math.abs(v[0]), Math.abs(v[1])];
              x = i ? [Math.abs(v[0] / 4), Math.abs(v[1] / 4)] : [x, x];
              var u = [
                Math.abs(M[0].offsetTop) - v[0] * l(d[0] / x[0], x[0]),
                Math.abs(M[0].offsetLeft) - v[1] * l(d[1] / x[1], x[1]),
              ];
              (_ =
                "yx" === B.axis
                  ? [u[0], u[1]]
                  : "x" === B.axis
                  ? [null, u[1]]
                  : [u[0], null]),
                (w = [4 * d[0] + B.scrollInertia, 4 * d[1] + B.scrollInertia]);
              var C = parseInt(B.contentTouchScroll) || 0;
              (_[0] = d[0] > C ? _[0] : 0),
                (_[1] = d[1] > C ? _[1] : 0),
                y.overflowed[0] && s(_[0], w[0], n, "y", W, !1),
                y.overflowed[1] && s(_[1], w[1], n, "x", W, !1);
            }
          }
        }
        function l(e, t) {
          var o = [1.5 * t, 2 * t, t / 1.5, t / 2];
          return e > 90
            ? t > 4
              ? o[0]
              : o[3]
            : e > 60
            ? t > 3
              ? o[3]
              : o[2]
            : e > 30
            ? t > 8
              ? o[1]
              : t > 6
              ? o[0]
              : t > 4
              ? t
              : o[2]
            : t > 8
            ? t
            : o[3];
        }
        function s(e, t, o, a, n, i) {
          e &&
            Q(C, e.toString(), {
              dur: t,
              scrollEasing: o,
              dir: a,
              overwrite: n,
              drag: i,
            });
        }
        var d,
          u,
          f,
          h,
          m,
          p,
          g,
          v,
          x,
          _,
          w,
          S,
          b,
          C = e(this),
          y = C.data(a),
          B = y.opt,
          T = a + "_" + y.idx,
          k = e("#mCSB_" + y.idx),
          M = e("#mCSB_" + y.idx + "_container"),
          O = [
            e("#mCSB_" + y.idx + "_dragger_vertical"),
            e("#mCSB_" + y.idx + "_dragger_horizontal"),
          ],
          R = [],
          D = [],
          E = 0,
          W = "yx" === B.axis ? "none" : "all",
          A = [],
          P = M.find("iframe"),
          z = [
            "touchstart." + T + " pointerdown." + T + " MSPointerDown." + T,
            "touchmove." + T + " pointermove." + T + " MSPointerMove." + T,
            "touchend." + T + " pointerup." + T + " MSPointerUp." + T,
          ];
        M.bind(z[0], function (e) {
          o(e);
        }).bind(z[1], function (e) {
          n(e);
        }),
          k
            .bind(z[0], function (e) {
              i(e);
            })
            .bind(z[2], function (e) {
              r(e);
            }),
          P.length &&
            P.each(function () {
              e(this).load(function () {
                L(this) &&
                  e(this.contentDocument || this.contentWindow.document)
                    .bind(z[0], function (e) {
                      o(e), i(e);
                    })
                    .bind(z[1], function (e) {
                      n(e);
                    })
                    .bind(z[2], function (e) {
                      r(e);
                    });
              });
            });
      },
      E = function () {
        function o() {
          return window.getSelection
            ? window.getSelection().toString()
            : document.selection && "Control" != document.selection.type
            ? document.selection.createRange().text
            : 0;
        }
        function n(e, t, o) {
          (d.type = o && i ? "stepped" : "stepless"),
            (d.scrollAmount = 10),
            q(r, e, t, "mcsLinearOut", o ? 60 : null);
        }
        var i,
          r = e(this),
          l = r.data(a),
          s = l.opt,
          d = l.sequential,
          u = a + "_" + l.idx,
          f = e("#mCSB_" + l.idx + "_container"),
          h = f.parent();
        f.bind("mousedown." + u, function (e) {
          t || i || ((i = 1), (c = !0));
        })
          .add(document)
          .bind("mousemove." + u, function (e) {
            if (!t && i && o()) {
              var a = f.offset(),
                r = I(e)[0] - a.top + f[0].offsetTop,
                c = I(e)[1] - a.left + f[0].offsetLeft;
              r > 0 && r < h.height() && c > 0 && c < h.width()
                ? d.step && n("off", null, "stepped")
                : ("x" !== s.axis &&
                    l.overflowed[0] &&
                    (0 > r ? n("on", 38) : r > h.height() && n("on", 40)),
                  "y" !== s.axis &&
                    l.overflowed[1] &&
                    (0 > c ? n("on", 37) : c > h.width() && n("on", 39)));
            }
          })
          .bind("mouseup." + u, function (e) {
            t || (i && ((i = 0), n("off", null)), (c = !1));
          });
      },
      W = function () {
        function t(t, a) {
          if ((V(o), !A(o, t.target))) {
            var r =
              "auto" !== i.mouseWheel.deltaFactor
                ? parseInt(i.mouseWheel.deltaFactor)
                : s && t.deltaFactor < 100
                ? 100
                : t.deltaFactor || 100;
            if ("x" === i.axis || "x" === i.mouseWheel.axis)
              var d = "x",
                u = [
                  Math.round(r * n.scrollRatio.x),
                  parseInt(i.mouseWheel.scrollAmount),
                ],
                f =
                  "auto" !== i.mouseWheel.scrollAmount
                    ? u[1]
                    : u[0] >= l.width()
                    ? 0.9 * l.width()
                    : u[0],
                h = Math.abs(e("#mCSB_" + n.idx + "_container")[0].offsetLeft),
                m = c[1][0].offsetLeft,
                p = c[1].parent().width() - c[1].width(),
                g = t.deltaX || t.deltaY || a;
            else
              var d = "y",
                u = [
                  Math.round(r * n.scrollRatio.y),
                  parseInt(i.mouseWheel.scrollAmount),
                ],
                f =
                  "auto" !== i.mouseWheel.scrollAmount
                    ? u[1]
                    : u[0] >= l.height()
                    ? 0.9 * l.height()
                    : u[0],
                h = Math.abs(e("#mCSB_" + n.idx + "_container")[0].offsetTop),
                m = c[0][0].offsetTop,
                p = c[0].parent().height() - c[0].height(),
                g = t.deltaY || a;
            ("y" === d && !n.overflowed[0]) ||
              ("x" === d && !n.overflowed[1]) ||
              ((i.mouseWheel.invert || t.webkitDirectionInvertedFromDevice) &&
                (g = -g),
              i.mouseWheel.normalizeDelta && (g = 0 > g ? -1 : 1),
              ((g > 0 && 0 !== m) ||
                (0 > g && m !== p) ||
                i.mouseWheel.preventDefault) &&
                (t.stopImmediatePropagation(), t.preventDefault()),
              Q(o, (h - g * f).toString(), { dir: d }));
          }
        }
        if (e(this).data(a)) {
          var o = e(this),
            n = o.data(a),
            i = n.opt,
            r = a + "_" + n.idx,
            l = e("#mCSB_" + n.idx),
            c = [
              e("#mCSB_" + n.idx + "_dragger_vertical"),
              e("#mCSB_" + n.idx + "_dragger_horizontal"),
            ],
            d = e("#mCSB_" + n.idx + "_container").find("iframe");
          d.length &&
            d.each(function () {
              e(this).load(function () {
                L(this) &&
                  e(this.contentDocument || this.contentWindow.document).bind(
                    "mousewheel." + r,
                    function (e, o) {
                      t(e, o);
                    }
                  );
              });
            }),
            l.bind("mousewheel." + r, function (e, o) {
              t(e, o);
            });
        }
      },
      L = function (e) {
        var t = null;
        try {
          var o = e.contentDocument || e.contentWindow.document;
          t = o.body.innerHTML;
        } catch (a) {}
        return null !== t;
      },
      A = function (t, o) {
        var n = o.nodeName.toLowerCase(),
          i = t.data(a).opt.mouseWheel.disableOver,
          r = ["select", "textarea"];
        return (
          e.inArray(n, i) > -1 && !(e.inArray(n, r) > -1 && !e(o).is(":focus"))
        );
      },
      P = function () {
        var t = e(this),
          o = t.data(a),
          n = a + "_" + o.idx,
          i = e("#mCSB_" + o.idx + "_container"),
          r = i.parent(),
          l = e(".mCSB_" + o.idx + "_scrollbar ." + d[12]);
        l.bind(
          "touchstart." + n + " pointerdown." + n + " MSPointerDown." + n,
          function (e) {
            c = !0;
          }
        )
          .bind(
            "touchend." + n + " pointerup." + n + " MSPointerUp." + n,
            function (e) {
              c = !1;
            }
          )
          .bind("click." + n, function (a) {
            if (
              e(a.target).hasClass(d[12]) ||
              e(a.target).hasClass("mCSB_draggerRail")
            ) {
              V(t);
              var n = e(this),
                l = n.find(".mCSB_dragger");
              if (n.parent(".mCSB_scrollTools_horizontal").length > 0) {
                if (!o.overflowed[1]) return;
                var s = "x",
                  c = a.pageX > l.offset().left ? -1 : 1,
                  u = Math.abs(i[0].offsetLeft) - 0.9 * c * r.width();
              } else {
                if (!o.overflowed[0]) return;
                var s = "y",
                  c = a.pageY > l.offset().top ? -1 : 1,
                  u = Math.abs(i[0].offsetTop) - 0.9 * c * r.height();
              }
              Q(t, u.toString(), { dir: s, scrollEasing: "mcsEaseInOut" });
            }
          });
      },
      z = function () {
        var t = e(this),
          o = t.data(a),
          n = o.opt,
          i = a + "_" + o.idx,
          r = e("#mCSB_" + o.idx + "_container"),
          l = r.parent();
        r.bind("focusin." + i, function (o) {
          var a = e(document.activeElement),
            i = r.find(".mCustomScrollBox").length,
            s = 0;
          a.is(n.advanced.autoScrollOnFocus) &&
            (V(t),
            clearTimeout(t[0]._focusTimeout),
            (t[0]._focusTimer = i ? (s + 17) * i : 0),
            (t[0]._focusTimeout = setTimeout(function () {
              var e = [oe(a)[0], oe(a)[1]],
                o = [r[0].offsetTop, r[0].offsetLeft],
                i = [
                  o[0] + e[0] >= 0 &&
                    o[0] + e[0] < l.height() - a.outerHeight(!1),
                  o[1] + e[1] >= 0 &&
                    o[0] + e[1] < l.width() - a.outerWidth(!1),
                ],
                c = "yx" !== n.axis || i[0] || i[1] ? "all" : "none";
              "x" === n.axis ||
                i[0] ||
                Q(t, e[0].toString(), {
                  dir: "y",
                  scrollEasing: "mcsEaseInOut",
                  overwrite: c,
                  dur: s,
                }),
                "y" === n.axis ||
                  i[1] ||
                  Q(t, e[1].toString(), {
                    dir: "x",
                    scrollEasing: "mcsEaseInOut",
                    overwrite: c,
                    dur: s,
                  });
            }, t[0]._focusTimer)));
        });
      },
      H = function () {
        var t = e(this),
          o = t.data(a),
          n = a + "_" + o.idx,
          i = e("#mCSB_" + o.idx + "_container").parent();
        i.bind("scroll." + n, function (t) {
          (0 !== i.scrollTop() || 0 !== i.scrollLeft()) &&
            e(".mCSB_" + o.idx + "_scrollbar").css("visibility", "hidden");
        });
      },
      U = function () {
        var t = e(this),
          o = t.data(a),
          n = o.opt,
          i = o.sequential,
          r = a + "_" + o.idx,
          l = ".mCSB_" + o.idx + "_scrollbar",
          s = e(l + ">a");
        s.bind(
          "mousedown." +
            r +
            " touchstart." +
            r +
            " pointerdown." +
            r +
            " MSPointerDown." +
            r +
            " mouseup." +
            r +
            " touchend." +
            r +
            " pointerup." +
            r +
            " MSPointerUp." +
            r +
            " mouseout." +
            r +
            " pointerout." +
            r +
            " MSPointerOut." +
            r +
            " click." +
            r,
          function (a) {
            function r(e, o) {
              (i.scrollAmount = n.snapAmount || n.scrollButtons.scrollAmount),
                q(t, e, o);
            }
            if ((a.preventDefault(), $(a))) {
              var l = e(this).attr("class");
              switch (((i.type = n.scrollButtons.scrollType), a.type)) {
                case "mousedown":
                case "touchstart":
                case "pointerdown":
                case "MSPointerDown":
                  if ("stepped" === i.type) return;
                  (c = !0), (o.tweenRunning = !1), r("on", l);
                  break;
                case "mouseup":
                case "touchend":
                case "pointerup":
                case "MSPointerUp":
                case "mouseout":
                case "pointerout":
                case "MSPointerOut":
                  if ("stepped" === i.type) return;
                  (c = !1), i.dir && r("off", l);
                  break;
                case "click":
                  if ("stepped" !== i.type || o.tweenRunning) return;
                  r("on", l);
              }
            }
          }
        );
      },
      F = function () {
        function t(t) {
          function a(e, t) {
            (r.type = i.keyboard.scrollType),
              (r.scrollAmount = i.snapAmount || i.keyboard.scrollAmount),
              ("stepped" === r.type && n.tweenRunning) || q(o, e, t);
          }
          switch (t.type) {
            case "blur":
              n.tweenRunning && r.dir && a("off", null);
              break;
            case "keydown":
            case "keyup":
              var l = t.keyCode ? t.keyCode : t.which,
                s = "on";
              if (
                ("x" !== i.axis && (38 === l || 40 === l)) ||
                ("y" !== i.axis && (37 === l || 39 === l))
              ) {
                if (
                  ((38 === l || 40 === l) && !n.overflowed[0]) ||
                  ((37 === l || 39 === l) && !n.overflowed[1])
                )
                  return;
                "keyup" === t.type && (s = "off"),
                  e(document.activeElement).is(u) ||
                    (t.preventDefault(), t.stopImmediatePropagation(), a(s, l));
              } else if (33 === l || 34 === l) {
                if (
                  ((n.overflowed[0] || n.overflowed[1]) &&
                    (t.preventDefault(), t.stopImmediatePropagation()),
                  "keyup" === t.type)
                ) {
                  V(o);
                  var f = 34 === l ? -1 : 1;
                  if (
                    "x" === i.axis ||
                    ("yx" === i.axis && n.overflowed[1] && !n.overflowed[0])
                  )
                    var h = "x",
                      m = Math.abs(c[0].offsetLeft) - 0.9 * f * d.width();
                  else
                    var h = "y",
                      m = Math.abs(c[0].offsetTop) - 0.9 * f * d.height();
                  Q(o, m.toString(), { dir: h, scrollEasing: "mcsEaseInOut" });
                }
              } else if (
                (35 === l || 36 === l) &&
                !e(document.activeElement).is(u) &&
                ((n.overflowed[0] || n.overflowed[1]) &&
                  (t.preventDefault(), t.stopImmediatePropagation()),
                "keyup" === t.type)
              ) {
                if (
                  "x" === i.axis ||
                  ("yx" === i.axis && n.overflowed[1] && !n.overflowed[0])
                )
                  var h = "x",
                    m = 35 === l ? Math.abs(d.width() - c.outerWidth(!1)) : 0;
                else
                  var h = "y",
                    m = 35 === l ? Math.abs(d.height() - c.outerHeight(!1)) : 0;
                Q(o, m.toString(), { dir: h, scrollEasing: "mcsEaseInOut" });
              }
          }
        }
        var o = e(this),
          n = o.data(a),
          i = n.opt,
          r = n.sequential,
          l = a + "_" + n.idx,
          s = e("#mCSB_" + n.idx),
          c = e("#mCSB_" + n.idx + "_container"),
          d = c.parent(),
          u = "input,textarea,select,datalist,keygen,[contenteditable='true']",
          f = c.find("iframe"),
          h = ["blur." + l + " keydown." + l + " keyup." + l];
        f.length &&
          f.each(function () {
            e(this).load(function () {
              L(this) &&
                e(this.contentDocument || this.contentWindow.document).bind(
                  h[0],
                  function (e) {
                    t(e);
                  }
                );
            });
          }),
          s.attr("tabindex", "0").bind(h[0], function (e) {
            t(e);
          });
      },
      q = function (t, o, n, i, r) {
        function l(e) {
          var o = "stepped" !== f.type,
            a = r ? r : e ? (o ? p / 1.5 : g) : 1e3 / 60,
            n = e ? (o ? 7.5 : 40) : 2.5,
            s = [Math.abs(h[0].offsetTop), Math.abs(h[0].offsetLeft)],
            d = [
              c.scrollRatio.y > 10 ? 10 : c.scrollRatio.y,
              c.scrollRatio.x > 10 ? 10 : c.scrollRatio.x,
            ],
            u =
              "x" === f.dir[0]
                ? s[1] + f.dir[1] * d[1] * n
                : s[0] + f.dir[1] * d[0] * n,
            m =
              "x" === f.dir[0]
                ? s[1] + f.dir[1] * parseInt(f.scrollAmount)
                : s[0] + f.dir[1] * parseInt(f.scrollAmount),
            v = "auto" !== f.scrollAmount ? m : u,
            x = i ? i : e ? (o ? "mcsLinearOut" : "mcsEaseInOut") : "mcsLinear",
            _ = e ? !0 : !1;
          return (
            e && 17 > a && (v = "x" === f.dir[0] ? s[1] : s[0]),
            Q(t, v.toString(), {
              dir: f.dir[0],
              scrollEasing: x,
              dur: a,
              onComplete: _,
            }),
            e
              ? void (f.dir = !1)
              : (clearTimeout(f.step),
                void (f.step = setTimeout(function () {
                  l();
                }, a)))
          );
        }
        function s() {
          clearTimeout(f.step), Z(f, "step"), V(t);
        }
        var c = t.data(a),
          u = c.opt,
          f = c.sequential,
          h = e("#mCSB_" + c.idx + "_container"),
          m = "stepped" === f.type ? !0 : !1,
          p = u.scrollInertia < 26 ? 26 : u.scrollInertia,
          g = u.scrollInertia < 1 ? 17 : u.scrollInertia;
        switch (o) {
          case "on":
            if (
              ((f.dir = [
                n === d[16] || n === d[15] || 39 === n || 37 === n ? "x" : "y",
                n === d[13] || n === d[15] || 38 === n || 37 === n ? -1 : 1,
              ]),
              V(t),
              te(n) && "stepped" === f.type)
            )
              return;
            l(m);
            break;
          case "off":
            s(), (m || (c.tweenRunning && f.dir)) && l(!0);
        }
      },
      Y = function (t) {
        var o = e(this).data(a).opt,
          n = [];
        return (
          "function" == typeof t && (t = t()),
          t instanceof Array
            ? (n =
                t.length > 1
                  ? [t[0], t[1]]
                  : "x" === o.axis
                  ? [null, t[0]]
                  : [t[0], null])
            : ((n[0] = t.y ? t.y : t.x || "x" === o.axis ? null : t),
              (n[1] = t.x ? t.x : t.y || "y" === o.axis ? null : t)),
          "function" == typeof n[0] && (n[0] = n[0]()),
          "function" == typeof n[1] && (n[1] = n[1]()),
          n
        );
      },
      j = function (t, o) {
        if (null != t && "undefined" != typeof t) {
          var n = e(this),
            i = n.data(a),
            r = i.opt,
            l = e("#mCSB_" + i.idx + "_container"),
            s = l.parent(),
            c = typeof t;
          o || (o = "x" === r.axis ? "x" : "y");
          var d = "x" === o ? l.outerWidth(!1) : l.outerHeight(!1),
            f = "x" === o ? l[0].offsetLeft : l[0].offsetTop,
            h = "x" === o ? "left" : "top";
          switch (c) {
            case "function":
              return t();
            case "object":
              var m = t.jquery ? t : e(t);
              if (!m.length) return;
              return "x" === o ? oe(m)[1] : oe(m)[0];
            case "string":
            case "number":
              if (te(t)) return Math.abs(t);
              if (-1 !== t.indexOf("%"))
                return Math.abs((d * parseInt(t)) / 100);
              if (-1 !== t.indexOf("-="))
                return Math.abs(f - parseInt(t.split("-=")[1]));
              if (-1 !== t.indexOf("+=")) {
                var p = f + parseInt(t.split("+=")[1]);
                return p >= 0 ? 0 : Math.abs(p);
              }
              if (-1 !== t.indexOf("px") && te(t.split("px")[0]))
                return Math.abs(t.split("px")[0]);
              if ("top" === t || "left" === t) return 0;
              if ("bottom" === t)
                return Math.abs(s.height() - l.outerHeight(!1));
              if ("right" === t) return Math.abs(s.width() - l.outerWidth(!1));
              if ("first" === t || "last" === t) {
                var m = l.find(":" + t);
                return "x" === o ? oe(m)[1] : oe(m)[0];
              }
              return e(t).length
                ? "x" === o
                  ? oe(e(t))[1]
                  : oe(e(t))[0]
                : (l.css(h, t), void u.update.call(null, n[0]));
          }
        }
      },
      X = function (t) {
        function o() {
          return (
            clearTimeout(h[0].autoUpdate),
            0 === s.parents("html").length
              ? void (s = null)
              : void (h[0].autoUpdate = setTimeout(function () {
                  return f.advanced.updateOnSelectorChange &&
                    ((m = r()), m !== w)
                    ? (l(3), void (w = m))
                    : (f.advanced.updateOnContentResize &&
                        ((p = [
                          h.outerHeight(!1),
                          h.outerWidth(!1),
                          v.height(),
                          v.width(),
                          _()[0],
                          _()[1],
                        ]),
                        (p[0] !== S[0] ||
                          p[1] !== S[1] ||
                          p[2] !== S[2] ||
                          p[3] !== S[3] ||
                          p[4] !== S[4] ||
                          p[5] !== S[5]) &&
                          (l(p[0] !== S[0] || p[1] !== S[1]), (S = p))),
                      f.advanced.updateOnImageLoad &&
                        ((g = n()),
                        g !== b &&
                          (h.find("img").each(function () {
                            i(this);
                          }),
                          (b = g))),
                      void (
                        (f.advanced.updateOnSelectorChange ||
                          f.advanced.updateOnContentResize ||
                          f.advanced.updateOnImageLoad) &&
                        o()
                      ));
                }, f.advanced.autoUpdateTimeout))
          );
        }
        function n() {
          var e = 0;
          return f.advanced.updateOnImageLoad && (e = h.find("img").length), e;
        }
        function i(t) {
          function o(e, t) {
            return function () {
              return t.apply(e, arguments);
            };
          }
          function a() {
            (this.onload = null), e(t).addClass(d[2]), l(2);
          }
          if (e(t).hasClass(d[2])) return void l();
          var n = new Image();
          (n.onload = o(n, a)), (n.src = t.src);
        }
        function r() {
          f.advanced.updateOnSelectorChange === !0 &&
            (f.advanced.updateOnSelectorChange = "*");
          var t = 0,
            o = h.find(f.advanced.updateOnSelectorChange);
          return (
            f.advanced.updateOnSelectorChange &&
              o.length > 0 &&
              o.each(function () {
                t += e(this).height() + e(this).width();
              }),
            t
          );
        }
        function l(e) {
          clearTimeout(h[0].autoUpdate), u.update.call(null, s[0], e);
        }
        var s = e(this),
          c = s.data(a),
          f = c.opt,
          h = e("#mCSB_" + c.idx + "_container");
        if (t) return clearTimeout(h[0].autoUpdate), void Z(h[0], "autoUpdate");
        var m,
          p,
          g,
          v = h.parent(),
          x = [
            e("#mCSB_" + c.idx + "_scrollbar_vertical"),
            e("#mCSB_" + c.idx + "_scrollbar_horizontal"),
          ],
          _ = function () {
            return [
              x[0].is(":visible") ? x[0].outerHeight(!0) : 0,
              x[1].is(":visible") ? x[1].outerWidth(!0) : 0,
            ];
          },
          w = r(),
          S = [
            h.outerHeight(!1),
            h.outerWidth(!1),
            v.height(),
            v.width(),
            _()[0],
            _()[1],
          ],
          b = n();
        o();
      },
      N = function (e, t, o) {
        return Math.round(e / t) * t - o;
      },
      V = function (t) {
        var o = t.data(a),
          n = e(
            "#mCSB_" +
              o.idx +
              "_container,#mCSB_" +
              o.idx +
              "_container_wrapper,#mCSB_" +
              o.idx +
              "_dragger_vertical,#mCSB_" +
              o.idx +
              "_dragger_horizontal"
          );
        n.each(function () {
          K.call(this);
        });
      },
      Q = function (t, o, n) {
        function i(e) {
          return s && c.callbacks[e] && "function" == typeof c.callbacks[e];
        }
        function r() {
          return [
            c.callbacks.alwaysTriggerOffsets || _ >= w[0] + b,
            c.callbacks.alwaysTriggerOffsets || -C >= _,
          ];
        }
        function l() {
          var e = [h[0].offsetTop, h[0].offsetLeft],
            o = [v[0].offsetTop, v[0].offsetLeft],
            a = [h.outerHeight(!1), h.outerWidth(!1)],
            i = [f.height(), f.width()];
          t[0].mcs = {
            content: h,
            top: e[0],
            left: e[1],
            draggerTop: o[0],
            draggerLeft: o[1],
            topPct: Math.round(
              (100 * Math.abs(e[0])) / (Math.abs(a[0]) - i[0])
            ),
            leftPct: Math.round(
              (100 * Math.abs(e[1])) / (Math.abs(a[1]) - i[1])
            ),
            direction: n.dir,
          };
        }
        var s = t.data(a),
          c = s.opt,
          d = {
            trigger: "internal",
            dir: "y",
            scrollEasing: "mcsEaseOut",
            drag: !1,
            dur: c.scrollInertia,
            overwrite: "all",
            callbacks: !0,
            onStart: !0,
            onUpdate: !0,
            onComplete: !0,
          },
          n = e.extend(d, n),
          u = [n.dur, n.drag ? 0 : n.dur],
          f = e("#mCSB_" + s.idx),
          h = e("#mCSB_" + s.idx + "_container"),
          m = h.parent(),
          p = c.callbacks.onTotalScrollOffset
            ? Y.call(t, c.callbacks.onTotalScrollOffset)
            : [0, 0],
          g = c.callbacks.onTotalScrollBackOffset
            ? Y.call(t, c.callbacks.onTotalScrollBackOffset)
            : [0, 0];
        if (
          ((s.trigger = n.trigger),
          (0 !== m.scrollTop() || 0 !== m.scrollLeft()) &&
            (e(".mCSB_" + s.idx + "_scrollbar").css("visibility", "visible"),
            m.scrollTop(0).scrollLeft(0)),
          "_resetY" !== o ||
            s.contentReset.y ||
            (i("onOverflowYNone") && c.callbacks.onOverflowYNone.call(t[0]),
            (s.contentReset.y = 1)),
          "_resetX" !== o ||
            s.contentReset.x ||
            (i("onOverflowXNone") && c.callbacks.onOverflowXNone.call(t[0]),
            (s.contentReset.x = 1)),
          "_resetY" !== o && "_resetX" !== o)
        ) {
          switch (
            ((!s.contentReset.y && t[0].mcs) ||
              !s.overflowed[0] ||
              (i("onOverflowY") && c.callbacks.onOverflowY.call(t[0]),
              (s.contentReset.x = null)),
            (!s.contentReset.x && t[0].mcs) ||
              !s.overflowed[1] ||
              (i("onOverflowX") && c.callbacks.onOverflowX.call(t[0]),
              (s.contentReset.x = null)),
            c.snapAmount && (o = N(o, c.snapAmount, c.snapOffset)),
            n.dir)
          ) {
            case "x":
              var v = e("#mCSB_" + s.idx + "_dragger_horizontal"),
                x = "left",
                _ = h[0].offsetLeft,
                w = [
                  f.width() - h.outerWidth(!1),
                  v.parent().width() - v.width(),
                ],
                S = [o, 0 === o ? 0 : o / s.scrollRatio.x],
                b = p[1],
                C = g[1],
                B = b > 0 ? b / s.scrollRatio.x : 0,
                T = C > 0 ? C / s.scrollRatio.x : 0;
              break;
            case "y":
              var v = e("#mCSB_" + s.idx + "_dragger_vertical"),
                x = "top",
                _ = h[0].offsetTop,
                w = [
                  f.height() - h.outerHeight(!1),
                  v.parent().height() - v.height(),
                ],
                S = [o, 0 === o ? 0 : o / s.scrollRatio.y],
                b = p[0],
                C = g[0],
                B = b > 0 ? b / s.scrollRatio.y : 0,
                T = C > 0 ? C / s.scrollRatio.y : 0;
          }
          S[1] < 0 || (0 === S[0] && 0 === S[1])
            ? (S = [0, 0])
            : S[1] >= w[1]
            ? (S = [w[0], w[1]])
            : (S[0] = -S[0]),
            t[0].mcs || (l(), i("onInit") && c.callbacks.onInit.call(t[0])),
            clearTimeout(h[0].onCompleteTimeout),
            (s.tweenRunning ||
              !((0 === _ && S[0] >= 0) || (_ === w[0] && S[0] <= w[0]))) &&
              (G(v[0], x, Math.round(S[1]), u[1], n.scrollEasing),
              G(h[0], x, Math.round(S[0]), u[0], n.scrollEasing, n.overwrite, {
                onStart: function () {
                  n.callbacks &&
                    n.onStart &&
                    !s.tweenRunning &&
                    (i("onScrollStart") &&
                      (l(), c.callbacks.onScrollStart.call(t[0])),
                    (s.tweenRunning = !0),
                    y(v),
                    (s.cbOffsets = r()));
                },
                onUpdate: function () {
                  n.callbacks &&
                    n.onUpdate &&
                    i("whileScrolling") &&
                    (l(), c.callbacks.whileScrolling.call(t[0]));
                },
                onComplete: function () {
                  if (n.callbacks && n.onComplete) {
                    "yx" === c.axis && clearTimeout(h[0].onCompleteTimeout);
                    var e = h[0].idleTimer || 0;
                    h[0].onCompleteTimeout = setTimeout(function () {
                      i("onScroll") && (l(), c.callbacks.onScroll.call(t[0])),
                        i("onTotalScroll") &&
                          S[1] >= w[1] - B &&
                          s.cbOffsets[0] &&
                          (l(), c.callbacks.onTotalScroll.call(t[0])),
                        i("onTotalScrollBack") &&
                          S[1] <= T &&
                          s.cbOffsets[1] &&
                          (l(), c.callbacks.onTotalScrollBack.call(t[0])),
                        (s.tweenRunning = !1),
                        (h[0].idleTimer = 0),
                        y(v, "hide");
                    }, e);
                  }
                },
              }));
        }
      },
      G = function (e, t, o, a, n, i, r) {
        function l() {
          S.stop ||
            (x || m.call(),
            (x = J() - v),
            s(),
            x >= S.time &&
              ((S.time = x > S.time ? x + f - (x - S.time) : x + f - 1),
              S.time < x + 1 && (S.time = x + 1)),
            S.time < a ? (S.id = h(l)) : g.call());
        }
        function s() {
          a > 0
            ? ((S.currVal = u(S.time, _, b, a, n)),
              (w[t] = Math.round(S.currVal) + "px"))
            : (w[t] = o + "px"),
            p.call();
        }
        function c() {
          (f = 1e3 / 60),
            (S.time = x + f),
            (h = window.requestAnimationFrame
              ? window.requestAnimationFrame
              : function (e) {
                  return s(), setTimeout(e, 0.01);
                }),
            (S.id = h(l));
        }
        function d() {
          null != S.id &&
            (window.requestAnimationFrame
              ? window.cancelAnimationFrame(S.id)
              : clearTimeout(S.id),
            (S.id = null));
        }
        function u(e, t, o, a, n) {
          switch (n) {
            case "linear":
            case "mcsLinear":
              return (o * e) / a + t;
            case "mcsLinearOut":
              return (e /= a), e--, o * Math.sqrt(1 - e * e) + t;
            case "easeInOutSmooth":
              return (
                (e /= a / 2),
                1 > e
                  ? (o / 2) * e * e + t
                  : (e--, (-o / 2) * (e * (e - 2) - 1) + t)
              );
            case "easeInOutStrong":
              return (
                (e /= a / 2),
                1 > e
                  ? (o / 2) * Math.pow(2, 10 * (e - 1)) + t
                  : (e--, (o / 2) * (-Math.pow(2, -10 * e) + 2) + t)
              );
            case "easeInOut":
            case "mcsEaseInOut":
              return (
                (e /= a / 2),
                1 > e
                  ? (o / 2) * e * e * e + t
                  : ((e -= 2), (o / 2) * (e * e * e + 2) + t)
              );
            case "easeOutSmooth":
              return (e /= a), e--, -o * (e * e * e * e - 1) + t;
            case "easeOutStrong":
              return o * (-Math.pow(2, (-10 * e) / a) + 1) + t;
            case "easeOut":
            case "mcsEaseOut":
            default:
              var i = (e /= a) * e,
                r = i * e;
              return (
                t +
                o *
                  (0.499999999999997 * r * i +
                    -2.5 * i * i +
                    5.5 * r +
                    -6.5 * i +
                    4 * e)
              );
          }
        }
        e._mTween || (e._mTween = { top: {}, left: {} });
        var f,
          h,
          r = r || {},
          m = r.onStart || function () {},
          p = r.onUpdate || function () {},
          g = r.onComplete || function () {},
          v = J(),
          x = 0,
          _ = e.offsetTop,
          w = e.style,
          S = e._mTween[t];
        "left" === t && (_ = e.offsetLeft);
        var b = o - _;
        (S.stop = 0), "none" !== i && d(), c();
      },
      J = function () {
        return window.performance && window.performance.now
          ? window.performance.now()
          : window.performance && window.performance.webkitNow
          ? window.performance.webkitNow()
          : Date.now
          ? Date.now()
          : new Date().getTime();
      },
      K = function () {
        var e = this;
        e._mTween || (e._mTween = { top: {}, left: {} });
        for (var t = ["top", "left"], o = 0; o < t.length; o++) {
          var a = t[o];
          e._mTween[a].id &&
            (window.requestAnimationFrame
              ? window.cancelAnimationFrame(e._mTween[a].id)
              : clearTimeout(e._mTween[a].id),
            (e._mTween[a].id = null),
            (e._mTween[a].stop = 1));
        }
      },
      Z = function (e, t) {
        try {
          delete e[t];
        } catch (o) {
          e[t] = null;
        }
      },
      $ = function (e) {
        return !(e.which && 1 !== e.which);
      },
      ee = function (e) {
        var t = e.originalEvent.pointerType;
        return !(t && "touch" !== t && 2 !== t);
      },
      te = function (e) {
        return !isNaN(parseFloat(e)) && isFinite(e);
      },
      oe = function (e) {
        var t = e.parents(".mCSB_container");
        return [
          e.offset().top - t.offset().top,
          e.offset().left - t.offset().left,
        ];
      };
    (e.fn[o] = function (t) {
      return u[t]
        ? u[t].apply(this, Array.prototype.slice.call(arguments, 1))
        : "object" != typeof t && t
        ? void e.error("Method " + t + " does not exist")
        : u.init.apply(this, arguments);
    }),
      (e[o] = function (t) {
        return u[t]
          ? u[t].apply(this, Array.prototype.slice.call(arguments, 1))
          : "object" != typeof t && t
          ? void e.error("Method " + t + " does not exist")
          : u.init.apply(this, arguments);
      }),
      (e[o].defaults = i),
      (window[o] = !0),
      e(window).load(function () {
        e(n)[o](),
          e.extend(e.expr[":"], {
            mcsInView:
              e.expr[":"].mcsInView ||
              function (t) {
                var o,
                  a,
                  n = e(t),
                  i = n.parents(".mCSB_container");
                if (i.length)
                  return (
                    (o = i.parent()),
                    (a = [i[0].offsetTop, i[0].offsetLeft]),
                    a[0] + oe(n)[0] >= 0 &&
                      a[0] + oe(n)[0] < o.height() - n.outerHeight(!1) &&
                      a[1] + oe(n)[1] >= 0 &&
                      a[1] + oe(n)[1] < o.width() - n.outerWidth(!1)
                  );
              },
            mcsOverflow:
              e.expr[":"].mcsOverflow ||
              function (t) {
                var o = e(t).data(a);
                if (o) return o.overflowed[0] || o.overflowed[1];
              },
          });
      });
  });
});
$(function () {
  function initMap() {
    var myLatLng = { lat: parseFloat(window.lat), lng: parseFloat(window.lon) };
    var map = new google.maps.Map(document.getElementById("map"), {
      center: myLatLng,
      scrollwheel: false,
      zoom: 14,
    });
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: "Hello World!",
    });
  }
  window.initMap = initMap;
});
yii.validation = (function ($) {
  var pub = {
    isEmpty: function (value) {
      return (
        value === null ||
        value === undefined ||
        ($.isArray(value) && value.length === 0) ||
        value === ""
      );
    },
    addMessage: function (messages, message, value) {
      messages.push(message.replace(/\{value\}/g, value));
    },
    required: function (value, messages, options) {
      var valid = false;
      if (options.requiredValue === undefined) {
        var isString = typeof value == "string" || value instanceof String;
        if (
          (options.strict && value !== undefined) ||
          (!options.strict && !pub.isEmpty(isString ? $.trim(value) : value))
        ) {
          valid = true;
        }
      } else if (
        (!options.strict && value == options.requiredValue) ||
        (options.strict && value === options.requiredValue)
      ) {
        valid = true;
      }
      if (!valid) {
        pub.addMessage(messages, options.message, value);
      }
    },
    boolean: function (value, messages, options) {
      if (options.skipOnEmpty && pub.isEmpty(value)) {
        return;
      }
      var valid =
        (!options.strict &&
          (value == options.trueValue || value == options.falseValue)) ||
        (options.strict &&
          (value === options.trueValue || value === options.falseValue));
      if (!valid) {
        pub.addMessage(messages, options.message, value);
      }
    },
    string: function (value, messages, options) {
      if (options.skipOnEmpty && pub.isEmpty(value)) {
        return;
      }
      if (typeof value !== "string") {
        pub.addMessage(messages, options.message, value);
        return;
      }
      if (options.is !== undefined && value.length != options.is) {
        pub.addMessage(messages, options.notEqual, value);
        return;
      }
      if (options.min !== undefined && value.length < options.min) {
        pub.addMessage(messages, options.tooShort, value);
      }
      if (options.max !== undefined && value.length > options.max) {
        pub.addMessage(messages, options.tooLong, value);
      }
    },
    file: function (attribute, messages, options) {
      var files = getUploadedFiles(attribute, messages, options);
      $.each(files, function (i, file) {
        validateFile(file, messages, options);
      });
    },
    image: function (attribute, messages, options, deferredList) {
      var files = getUploadedFiles(attribute, messages, options);
      $.each(files, function (i, file) {
        validateFile(file, messages, options);
        if (typeof FileReader === "undefined") {
          return;
        }
        var deferred = $.Deferred();
        pub.validateImage(
          file,
          messages,
          options,
          deferred,
          new FileReader(),
          new Image()
        );
        deferredList.push(deferred);
      });
    },
    validateImage: function (
      file,
      messages,
      options,
      deferred,
      fileReader,
      image
    ) {
      image.onload = function () {
        validateImageSize(file, image, messages, options);
        deferred.resolve();
      };
      image.onerror = function () {
        messages.push(options.notImage.replace(/\{file\}/g, file.name));
        deferred.resolve();
      };
      fileReader.onload = function () {
        image.src = this.result;
      };
      fileReader.onerror = function () {
        deferred.resolve();
      };
      fileReader.readAsDataURL(file);
    },
    number: function (value, messages, options) {
      if (options.skipOnEmpty && pub.isEmpty(value)) {
        return;
      }
      if (typeof value === "string" && !options.pattern.test(value)) {
        pub.addMessage(messages, options.message, value);
        return;
      }
      if (options.min !== undefined && value < options.min) {
        pub.addMessage(messages, options.tooSmall, value);
      }
      if (options.max !== undefined && value > options.max) {
        pub.addMessage(messages, options.tooBig, value);
      }
    },
    range: function (value, messages, options) {
      if (options.skipOnEmpty && pub.isEmpty(value)) {
        return;
      }
      if (!options.allowArray && $.isArray(value)) {
        pub.addMessage(messages, options.message, value);
        return;
      }
      var inArray = true;
      $.each($.isArray(value) ? value : [value], function (i, v) {
        if ($.inArray(v, options.range) == -1) {
          inArray = false;
          return false;
        } else {
          return true;
        }
      });
      if (options.not === undefined) {
        options.not = false;
      }
      if (options.not === inArray) {
        pub.addMessage(messages, options.message, value);
      }
    },
    regularExpression: function (value, messages, options) {
      if (options.skipOnEmpty && pub.isEmpty(value)) {
        return;
      }
      if (
        (!options.not && !options.pattern.test(value)) ||
        (options.not && options.pattern.test(value))
      ) {
        pub.addMessage(messages, options.message, value);
      }
    },
    email: function (value, messages, options) {
      if (options.skipOnEmpty && pub.isEmpty(value)) {
        return;
      }
      var valid = true,
        regexp = /^((?:"?([^"]*)"?\s)?)(?:\s+)?(?:(<?)((.+)@([^>]+))(>?))$/,
        matches = regexp.exec(value);
      if (matches === null) {
        valid = false;
      } else {
        var localPart = matches[5],
          domain = matches[6];
        if (options.enableIDN) {
          localPart = punycode.toASCII(localPart);
          domain = punycode.toASCII(domain);
          value =
            matches[1] + matches[3] + localPart + "@" + domain + matches[7];
        }
        if (localPart.length > 64) {
          valid = false;
        } else if ((localPart + "@" + domain).length > 254) {
          valid = false;
        } else {
          valid =
            options.pattern.test(value) ||
            (options.allowName && options.fullPattern.test(value));
        }
      }
      if (!valid) {
        pub.addMessage(messages, options.message, value);
      }
    },
    url: function (value, messages, options) {
      if (options.skipOnEmpty && pub.isEmpty(value)) {
        return;
      }
      if (options.defaultScheme && !/:\/\//.test(value)) {
        value = options.defaultScheme + "://" + value;
      }
      var valid = true;
      if (options.enableIDN) {
        var matches = /^([^:]+):\/\/([^\/]+)(.*)$/.exec(value);
        if (matches === null) {
          valid = false;
        } else {
          value =
            matches[1] + "://" + punycode.toASCII(matches[2]) + matches[3];
        }
      }
      if (!valid || !options.pattern.test(value)) {
        pub.addMessage(messages, options.message, value);
      }
    },
    trim: function ($form, attribute, options) {
      var $input = $form.find(attribute.input);
      var value = $input.val();
      if (!options.skipOnEmpty || !pub.isEmpty(value)) {
        value = $.trim(value);
        $input.val(value);
      }
      return value;
    },
    captcha: function (value, messages, options) {
      if (options.skipOnEmpty && pub.isEmpty(value)) {
        return;
      }
      var hash = $("body").data(options.hashKey);
      hash = hash == null ? options.hash : hash[options.caseSensitive ? 0 : 1];
      var v = options.caseSensitive ? value : value.toLowerCase();
      for (var i = v.length - 1, h = 0; i >= 0; --i) {
        h += v.charCodeAt(i);
      }
      if (h != hash) {
        pub.addMessage(messages, options.message, value);
      }
    },
    compare: function (value, messages, options) {
      if (options.skipOnEmpty && pub.isEmpty(value)) {
        return;
      }
      var compareValue,
        valid = true;
      if (options.compareAttribute === undefined) {
        compareValue = options.compareValue;
      } else {
        compareValue = $("#" + options.compareAttribute).val();
      }
      if (options.type === "number") {
        value = parseFloat(value);
        compareValue = parseFloat(compareValue);
      }
      switch (options.operator) {
        case "==":
          valid = value == compareValue;
          break;
        case "===":
          valid = value === compareValue;
          break;
        case "!=":
          valid = value != compareValue;
          break;
        case "!==":
          valid = value !== compareValue;
          break;
        case ">":
          valid = value > compareValue;
          break;
        case ">=":
          valid = value >= compareValue;
          break;
        case "<":
          valid = value < compareValue;
          break;
        case "<=":
          valid = value <= compareValue;
          break;
        default:
          valid = false;
          break;
      }
      if (!valid) {
        pub.addMessage(messages, options.message, value);
      }
    },
    ip: function (value, messages, options) {
      if (options.skipOnEmpty && pub.isEmpty(value)) {
        return;
      }
      var negation = null,
        cidr = null,
        matches = new RegExp(options.ipParsePattern).exec(value);
      if (matches) {
        negation = matches[1] || null;
        value = matches[2];
        cidr = matches[4] || null;
      }
      if (options.subnet === true && cidr === null) {
        pub.addMessage(messages, options.messages.noSubnet, value);
        return;
      }
      if (options.subnet === false && cidr !== null) {
        pub.addMessage(messages, options.messages.hasSubnet, value);
        return;
      }
      if (options.negation === false && negation !== null) {
        pub.addMessage(messages, options.messages.message, value);
        return;
      }
      var ipVersion = value.indexOf(":") === -1 ? 4 : 6;
      if (ipVersion == 6) {
        if (!new RegExp(options.ipv6Pattern).test(value)) {
          pub.addMessage(messages, options.messages.message, value);
        }
        if (!options.ipv6) {
          pub.addMessage(messages, options.messages.ipv6NotAllowed, value);
        }
      } else {
        if (!new RegExp(options.ipv4Pattern).test(value)) {
          pub.addMessage(messages, options.messages.message, value);
        }
        if (!options.ipv4) {
          pub.addMessage(messages, options.messages.ipv4NotAllowed, value);
        }
      }
    },
  };
  function getUploadedFiles(attribute, messages, options) {
    if (typeof File === "undefined") {
      return [];
    }
    var files = $(attribute.input, attribute.$form).get(0).files;
    if (!files) {
      messages.push(options.message);
      return [];
    }
    if (files.length === 0) {
      if (!options.skipOnEmpty) {
        messages.push(options.uploadRequired);
      }
      return [];
    }
    if (options.maxFiles && options.maxFiles < files.length) {
      messages.push(options.tooMany);
      return [];
    }
    return files;
  }
  function validateFile(file, messages, options) {
    if (options.extensions && options.extensions.length > 0) {
      var index = file.name.lastIndexOf(".");
      var ext = !~index
        ? ""
        : file.name.substr(index + 1, file.name.length).toLowerCase();
      if (!~options.extensions.indexOf(ext)) {
        messages.push(options.wrongExtension.replace(/\{file\}/g, file.name));
      }
    }
    if (options.mimeTypes && options.mimeTypes.length > 0) {
      if (!validateMimeType(options.mimeTypes, file.type)) {
        messages.push(options.wrongMimeType.replace(/\{file\}/g, file.name));
      }
    }
    if (options.maxSize && options.maxSize < file.size) {
      messages.push(options.tooBig.replace(/\{file\}/g, file.name));
    }
    if (options.minSize && options.minSize > file.size) {
      messages.push(options.tooSmall.replace(/\{file\}/g, file.name));
    }
  }
  function validateMimeType(mimeTypes, fileType) {
    for (var i = 0, len = mimeTypes.length; i < len; i++) {
      if (new RegExp(mimeTypes[i]).test(fileType)) {
        return true;
      }
    }
    return false;
  }
  function validateImageSize(file, image, messages, options) {
    if (options.minWidth && image.width < options.minWidth) {
      messages.push(options.underWidth.replace(/\{file\}/g, file.name));
    }
    if (options.maxWidth && image.width > options.maxWidth) {
      messages.push(options.overWidth.replace(/\{file\}/g, file.name));
    }
    if (options.minHeight && image.height < options.minHeight) {
      messages.push(options.underHeight.replace(/\{file\}/g, file.name));
    }
    if (options.maxHeight && image.height > options.maxHeight) {
      messages.push(options.overHeight.replace(/\{file\}/g, file.name));
    }
  }
  return pub;
})(jQuery);
(function ($) {
  $.fn.yiiActiveForm = function (method) {
    if (methods[method]) {
      return methods[method].apply(
        this,
        Array.prototype.slice.call(arguments, 1)
      );
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error("Method " + method + " does not exist on jQuery.yiiActiveForm");
      return false;
    }
  };
  var events = {
    beforeValidate: "beforeValidate",
    afterValidate: "afterValidate",
    beforeValidateAttribute: "beforeValidateAttribute",
    afterValidateAttribute: "afterValidateAttribute",
    beforeSubmit: "beforeSubmit",
    ajaxBeforeSend: "ajaxBeforeSend",
    ajaxComplete: "ajaxComplete",
    afterInit: "afterInit",
  };
  var defaults = {
    encodeErrorSummary: true,
    errorSummary: ".error-summary",
    validateOnSubmit: true,
    errorCssClass: "has-error",
    successCssClass: "has-success",
    validatingCssClass: "validating",
    ajaxParam: "ajax",
    ajaxDataType: "json",
    validationUrl: undefined,
    scrollToError: true,
    scrollToErrorOffset: 0,
  };
  var attributeDefaults = {
    id: undefined,
    name: undefined,
    container: undefined,
    input: undefined,
    error: ".help-block",
    encodeError: true,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnType: false,
    validationDelay: 500,
    enableAjaxValidation: false,
    validate: undefined,
    status: 0,
    cancelled: false,
    value: undefined,
    updateAriaInvalid: true,
  };
  var submitDefer;
  var setSubmitFinalizeDefer = function ($form) {
    submitDefer = $.Deferred();
    $form.data("yiiSubmitFinalizePromise", submitDefer.promise());
  };
  var submitFinalize = function ($form) {
    if (submitDefer) {
      submitDefer.resolve();
      submitDefer = undefined;
      $form.removeData("yiiSubmitFinalizePromise");
    }
  };
  var methods = {
    init: function (attributes, options) {
      return this.each(function () {
        var $form = $(this);
        if ($form.data("yiiActiveForm")) {
          return;
        }
        var settings = $.extend({}, defaults, options || {});
        if (settings.validationUrl === undefined) {
          settings.validationUrl = $form.attr("action");
        }
        $.each(attributes, function (i) {
          attributes[i] = $.extend(
            { value: getValue($form, this) },
            attributeDefaults,
            this
          );
          watchAttribute($form, attributes[i]);
        });
        $form.data("yiiActiveForm", {
          settings: settings,
          attributes: attributes,
          submitting: false,
          validated: false,
          options: getFormOptions($form),
        });
        $form.bind("reset.yiiActiveForm", methods.resetForm);
        if (settings.validateOnSubmit) {
          $form.on(
            "mouseup.yiiActiveForm keyup.yiiActiveForm",
            ":submit",
            function () {
              $form.data("yiiActiveForm").submitObject = $(this);
            }
          );
          $form.on("submit.yiiActiveForm", methods.submitForm);
        }
        var event = $.Event(events.afterInit);
        $form.trigger(event);
      });
    },
    add: function (attribute) {
      var $form = $(this);
      attribute = $.extend(
        { value: getValue($form, attribute) },
        attributeDefaults,
        attribute
      );
      $form.data("yiiActiveForm").attributes.push(attribute);
      watchAttribute($form, attribute);
    },
    remove: function (id) {
      var $form = $(this),
        attributes = $form.data("yiiActiveForm").attributes,
        index = -1,
        attribute = undefined;
      $.each(attributes, function (i) {
        if (attributes[i]["id"] == id) {
          index = i;
          attribute = attributes[i];
          return false;
        }
      });
      if (index >= 0) {
        attributes.splice(index, 1);
        unwatchAttribute($form, attribute);
      }
      return attribute;
    },
    validateAttribute: function (id) {
      var attribute = methods.find.call(this, id);
      if (attribute != undefined) {
        validateAttribute($(this), attribute, true);
      }
    },
    find: function (id) {
      var attributes = $(this).data("yiiActiveForm").attributes,
        result = undefined;
      $.each(attributes, function (i) {
        if (attributes[i]["id"] == id) {
          result = attributes[i];
          return false;
        }
      });
      return result;
    },
    destroy: function () {
      return this.each(function () {
        $(this).unbind(".yiiActiveForm");
        $(this).removeData("yiiActiveForm");
      });
    },
    data: function () {
      return this.data("yiiActiveForm");
    },
    validate: function (forceValidate) {
      if (forceValidate) {
        $(this).data("yiiActiveForm").submitting = true;
      }
      var $form = $(this),
        data = $form.data("yiiActiveForm"),
        needAjaxValidation = false,
        messages = {},
        deferreds = deferredArray(),
        submitting = data.submitting && !forceValidate;
      if (data.submitting) {
        var event = $.Event(events.beforeValidate);
        $form.trigger(event, [messages, deferreds]);
        if (event.result === false) {
          data.submitting = false;
          submitFinalize($form);
          return;
        }
      }
      $.each(data.attributes, function () {
        this.$form = $form;
        if (!$(this.input).is(":disabled")) {
          this.cancelled = false;
          if (data.submitting || this.status === 2 || this.status === 3) {
            var msg = messages[this.id];
            if (msg === undefined) {
              msg = [];
              messages[this.id] = msg;
            }
            var event = $.Event(events.beforeValidateAttribute);
            $form.trigger(event, [this, msg, deferreds]);
            if (event.result !== false) {
              if (this.validate) {
                this.validate(
                  this,
                  getValue($form, this),
                  msg,
                  deferreds,
                  $form
                );
              }
              if (this.enableAjaxValidation) {
                needAjaxValidation = true;
              }
            } else {
              this.cancelled = true;
            }
          }
        }
      });
      $.when.apply(this, deferreds).always(function () {
        for (var i in messages) {
          if (0 === messages[i].length) {
            delete messages[i];
          }
        }
        if (
          needAjaxValidation &&
          ($.isEmptyObject(messages) || data.submitting)
        ) {
          var $button = data.submitObject,
            extData = "&" + data.settings.ajaxParam + "=" + $form.attr("id");
          if ($button && $button.length && $button.attr("name")) {
            extData += "&" + $button.attr("name") + "=" + $button.attr("value");
          }
          $.ajax({
            url: data.settings.validationUrl,
            type: $form.attr("method"),
            data: $form.serialize() + extData,
            dataType: data.settings.ajaxDataType,
            complete: function (jqXHR, textStatus) {
              $form.trigger(events.ajaxComplete, [jqXHR, textStatus]);
            },
            beforeSend: function (jqXHR, settings) {
              $form.trigger(events.ajaxBeforeSend, [jqXHR, settings]);
            },
            success: function (msgs) {
              if (msgs !== null && typeof msgs === "object") {
                $.each(data.attributes, function () {
                  if (!this.enableAjaxValidation || this.cancelled) {
                    delete msgs[this.id];
                  }
                });
                updateInputs($form, $.extend(messages, msgs), submitting);
              } else {
                updateInputs($form, messages, submitting);
              }
            },
            error: function () {
              data.submitting = false;
              submitFinalize($form);
            },
          });
        } else if (data.submitting) {
          setTimeout(function () {
            updateInputs($form, messages, submitting);
          }, 200);
        } else {
          updateInputs($form, messages, submitting);
        }
      });
    },
    submitForm: function () {
      var $form = $(this),
        data = $form.data("yiiActiveForm");
      if (data.validated) {
        data.submitting = false;
        var event = $.Event(events.beforeSubmit);
        $form.trigger(event);
        if (event.result === false) {
          data.validated = false;
          submitFinalize($form);
          return false;
        }
        updateHiddenButton($form);
        return true;
      } else {
        setSubmitFinalizeDefer($form);
        if (data.settings.timer !== undefined) {
          clearTimeout(data.settings.timer);
        }
        data.submitting = true;
        methods.validate.call($form);
        return false;
      }
    },
    resetForm: function () {
      var $form = $(this);
      var data = $form.data("yiiActiveForm");
      setTimeout(function () {
        $.each(data.attributes, function () {
          this.value = getValue($form, this);
          this.status = 0;
          var $container = $form.find(this.container);
          $container.removeClass(
            data.settings.validatingCssClass +
              " " +
              data.settings.errorCssClass +
              " " +
              data.settings.successCssClass
          );
          $container.find(this.error).html("");
        });
        $form.find(data.settings.errorSummary).hide().find("ul").html("");
      }, 1);
    },
    updateMessages: function (messages, summary) {
      var $form = $(this);
      var data = $form.data("yiiActiveForm");
      $.each(data.attributes, function () {
        updateInput($form, this, messages);
      });
      if (summary) {
        updateSummary($form, messages);
      }
    },
    updateAttribute: function (id, messages) {
      var attribute = methods.find.call(this, id);
      if (attribute != undefined) {
        var msg = {};
        msg[id] = messages;
        updateInput($(this), attribute, msg);
      }
    },
  };
  var watchAttribute = function ($form, attribute) {
    var $input = findInput($form, attribute);
    if (attribute.validateOnChange) {
      $input.on("change.yiiActiveForm", function () {
        validateAttribute($form, attribute, false);
      });
    }
    if (attribute.validateOnBlur) {
      $input.on("blur.yiiActiveForm", function () {
        if (attribute.status == 0 || attribute.status == 1) {
          validateAttribute($form, attribute, true);
        }
      });
    }
    if (attribute.validateOnType) {
      $input.on("keyup.yiiActiveForm", function (e) {
        if ($.inArray(e.which, [16, 17, 18, 37, 38, 39, 40]) !== -1) {
          return;
        }
        if (attribute.value !== getValue($form, attribute)) {
          validateAttribute($form, attribute, false, attribute.validationDelay);
        }
      });
    }
  };
  var unwatchAttribute = function ($form, attribute) {
    findInput($form, attribute).off(".yiiActiveForm");
  };
  var validateAttribute = function (
    $form,
    attribute,
    forceValidate,
    validationDelay
  ) {
    var data = $form.data("yiiActiveForm");
    if (forceValidate) {
      attribute.status = 2;
    }
    $.each(data.attributes, function () {
      if (this.value !== getValue($form, this)) {
        this.status = 2;
        forceValidate = true;
      }
    });
    if (!forceValidate) {
      return;
    }
    if (data.settings.timer !== undefined) {
      clearTimeout(data.settings.timer);
    }
    data.settings.timer = setTimeout(
      function () {
        if (data.submitting || $form.is(":hidden")) {
          return;
        }
        $.each(data.attributes, function () {
          if (this.status === 2) {
            this.status = 3;
            $form
              .find(this.container)
              .addClass(data.settings.validatingCssClass);
          }
        });
        methods.validate.call($form);
      },
      validationDelay ? validationDelay : 200
    );
  };
  var deferredArray = function () {
    var array = [];
    array.add = function (callback) {
      this.push(new $.Deferred(callback));
    };
    return array;
  };
  var buttonOptions = ["action", "target", "method", "enctype"];
  var getFormOptions = function ($form) {
    var attributes = {};
    for (var i = 0; i < buttonOptions.length; i++) {
      attributes[buttonOptions[i]] = $form.attr(buttonOptions[i]);
    }
    return attributes;
  };
  var applyButtonOptions = function ($form, $button) {
    for (var i = 0; i < buttonOptions.length; i++) {
      var value = $button.attr("form" + buttonOptions[i]);
      if (value) {
        $form.attr(buttonOptions[i], value);
      }
    }
  };
  var restoreButtonOptions = function ($form) {
    var data = $form.data("yiiActiveForm");
    for (var i = 0; i < buttonOptions.length; i++) {
      $form.attr(buttonOptions[i], data.options[buttonOptions[i]] || null);
    }
  };
  var updateInputs = function ($form, messages, submitting) {
    var data = $form.data("yiiActiveForm");
    if (data === undefined) {
      return false;
    }
    if (submitting) {
      var errorAttributes = [];
      $.each(data.attributes, function () {
        if (
          !$(this.input).is(":disabled") &&
          !this.cancelled &&
          updateInput($form, this, messages)
        ) {
          errorAttributes.push(this);
        }
      });
      $form.trigger(events.afterValidate, [messages, errorAttributes]);
      updateSummary($form, messages);
      if (errorAttributes.length) {
        if (data.settings.scrollToError) {
          var top =
            $form
              .find(
                $.map(errorAttributes, function (attribute) {
                  return attribute.input;
                }).join(",")
              )
              .first()
              .closest(":visible")
              .offset().top - data.settings.scrollToErrorOffset;
          if (top < 0) {
            top = 0;
          } else if (top > $(document).height()) {
            top = $(document).height();
          }
          var wtop = $(window).scrollTop();
          if (top < wtop || top > wtop + $(window).height()) {
            $(window).scrollTop(top);
          }
        }
        data.submitting = false;
      } else {
        data.validated = true;
        if (data.submitObject) {
          applyButtonOptions($form, data.submitObject);
        }
        $form.submit();
        if (data.submitObject) {
          restoreButtonOptions($form);
        }
      }
    } else {
      $.each(data.attributes, function () {
        if (!this.cancelled && (this.status === 2 || this.status === 3)) {
          updateInput($form, this, messages);
        }
      });
    }
    submitFinalize($form);
  };
  var updateHiddenButton = function ($form) {
    var data = $form.data("yiiActiveForm");
    var $button = data.submitObject || $form.find(":submit:first");
    if (
      $button.length &&
      $button.attr("type") == "submit" &&
      $button.attr("name")
    ) {
      var $hiddenButton = $(
        'input[type="hidden"][name="' + $button.attr("name") + '"]',
        $form
      );
      if (!$hiddenButton.length) {
        $("<input>")
          .attr({
            type: "hidden",
            name: $button.attr("name"),
            value: $button.attr("value"),
          })
          .appendTo($form);
      } else {
        $hiddenButton.attr("value", $button.attr("value"));
      }
    }
  };
  var updateInput = function ($form, attribute, messages) {
    var data = $form.data("yiiActiveForm"),
      $input = findInput($form, attribute),
      hasError = false;
    if (!$.isArray(messages[attribute.id])) {
      messages[attribute.id] = [];
    }
    $form.trigger(events.afterValidateAttribute, [
      attribute,
      messages[attribute.id],
    ]);
    attribute.status = 1;
    if ($input.length) {
      hasError = messages[attribute.id].length > 0;
      var $container = $form.find(attribute.container);
      var $error = $container.find(attribute.error);
      updateAriaInvalid($form, attribute, hasError);
      if (hasError) {
        if (attribute.encodeError) {
          $error.text(messages[attribute.id][0]);
        } else {
          $error.html(messages[attribute.id][0]);
        }
        $container
          .removeClass(
            data.settings.validatingCssClass +
              " " +
              data.settings.successCssClass
          )
          .addClass(data.settings.errorCssClass);
      } else {
        $error.empty();
        $container
          .removeClass(
            data.settings.validatingCssClass +
              " " +
              data.settings.errorCssClass +
              " "
          )
          .addClass(data.settings.successCssClass);
      }
      attribute.value = getValue($form, attribute);
    }
    return hasError;
  };
  var updateSummary = function ($form, messages) {
    var data = $form.data("yiiActiveForm"),
      $summary = $form.find(data.settings.errorSummary),
      $ul = $summary.find("ul").empty();
    if ($summary.length && messages) {
      $.each(data.attributes, function () {
        if ($.isArray(messages[this.id]) && messages[this.id].length) {
          var error = $("<li/>");
          if (data.settings.encodeErrorSummary) {
            error.text(messages[this.id][0]);
          } else {
            error.html(messages[this.id][0]);
          }
          $ul.append(error);
        }
      });
      $summary.toggle($ul.find("li").length > 0);
    }
  };
  var getValue = function ($form, attribute) {
    var $input = findInput($form, attribute);
    var type = $input.attr("type");
    if (type === "checkbox" || type === "radio") {
      var $realInput = $input.filter(":checked");
      if (!$realInput.length) {
        $realInput = $form.find(
          'input[type=hidden][name="' + $input.attr("name") + '"]'
        );
      }
      return $realInput.val();
    } else {
      return $input.val();
    }
  };
  var findInput = function ($form, attribute) {
    var $input = $form.find(attribute.input);
    if ($input.length && $input[0].tagName.toLowerCase() === "div") {
      return $input.find("input");
    } else {
      return $input;
    }
  };
  var updateAriaInvalid = function ($form, attribute, hasError) {
    if (attribute.updateAriaInvalid) {
      $form
        .find(attribute.input)
        .attr("aria-invalid", hasError ? "true" : "false");
    }
  };
})(window.jQuery);
