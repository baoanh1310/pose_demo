(function () {
    /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
    "use strict";
    var C;
    function da(a) {
        var c = 0;
        return function () {
            return c < a.length ? { done: !1, value: a[c++] } : { done: !0 };
        };
    }
    var E =
        "function" == typeof Object.defineProperties
            ? Object.defineProperty
            : function (a, c, b) {
                  if (a == Array.prototype || a == Object.prototype) return a;
                  a[c] = b.value;
                  return a;
              };
    function ea(a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var c = 0; c < a.length; ++c) {
            var b = a[c];
            if (b && b.Math == Math) return b;
        }
        throw Error("Cannot find global object");
    }
    var G = ea(this);
    function H(a, c) {
        if (c)
            a: {
                var b = G;
                a = a.split(".");
                for (var d = 0; d < a.length - 1; d++) {
                    var f = a[d];
                    if (!(f in b)) break a;
                    b = b[f];
                }
                a = a[a.length - 1];
                d = b[a];
                c = c(d);
                c != d && null != c && E(b, a, { configurable: !0, writable: !0, value: c });
            }
    }
    H("Symbol", function (a) {
        function c(k) {
            if (this instanceof c) throw new TypeError("Symbol is not a constructor");
            return new b(d + (k || "") + "_" + f++, k);
        }
        function b(k, e) {
            this.g = k;
            E(this, "description", { configurable: !0, writable: !0, value: e });
        }
        if (a) return a;
        b.prototype.toString = function () {
            return this.g;
        };
        var d = "jscomp_symbol_" + ((1e9 * Math.random()) >>> 0) + "_",
            f = 0;
        return c;
    });
    H("Symbol.iterator", function (a) {
        if (a) return a;
        a = Symbol("Symbol.iterator");
        for (var c = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), b = 0; b < c.length; b++) {
            var d = G[c[b]];
            "function" === typeof d &&
                "function" != typeof d.prototype[a] &&
                E(d.prototype, a, {
                    configurable: !0,
                    writable: !0,
                    value: function () {
                        return fa(da(this));
                    },
                });
        }
        return a;
    });
    function fa(a) {
        a = { next: a };
        a[Symbol.iterator] = function () {
            return this;
        };
        return a;
    }
    function J(a) {
        var c = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
        return c ? c.call(a) : { next: da(a) };
    }
    function ha(a) {
        if (!(a instanceof Array)) {
            a = J(a);
            for (var c, b = []; !(c = a.next()).done; ) b.push(c.value);
            a = b;
        }
        return a;
    }
    var K;
    if ("function" == typeof Object.setPrototypeOf) K = Object.setPrototypeOf;
    else {
        var L;
        a: {
            var ia = { a: !0 },
                ja = {};
            try {
                ja.__proto__ = ia;
                L = ja.a;
                break a;
            } catch (a) {}
            L = !1;
        }
        K = L
            ? function (a, c) {
                  a.__proto__ = c;
                  if (a.__proto__ !== c) throw new TypeError(a + " is not extensible");
                  return a;
              }
            : null;
    }
    var ka = K;
    function N() {
        this.l = !1;
        this.h = null;
        this.i = void 0;
        this.g = 1;
        this.s = this.m = 0;
        this.j = null;
    }
    function O(a) {
        if (a.l) throw new TypeError("Generator is already running");
        a.l = !0;
    }
    N.prototype.o = function (a) {
        this.i = a;
    };
    function P(a, c) {
        a.j = { O: c, P: !0 };
        a.g = a.m || a.s;
    }
    N.prototype.return = function (a) {
        this.j = { return: a };
        this.g = this.s;
    };
    function Q(a, c, b) {
        a.g = b;
        return { value: c };
    }
    function la(a) {
        this.g = new N();
        this.h = a;
    }
    function oa(a, c) {
        O(a.g);
        var b = a.g.h;
        if (b)
            return R(
                a,
                "return" in b
                    ? b["return"]
                    : function (d) {
                          return { value: d, done: !0 };
                      },
                c,
                a.g.return
            );
        a.g.return(c);
        return S(a);
    }
    function R(a, c, b, d) {
        try {
            var f = c.call(a.g.h, b);
            if (!(f instanceof Object)) throw new TypeError("Iterator result " + f + " is not an object");
            if (!f.done) return (a.g.l = !1), f;
            var k = f.value;
        } catch (e) {
            return (a.g.h = null), P(a.g, e), S(a);
        }
        a.g.h = null;
        d.call(a.g, k);
        return S(a);
    }
    function S(a) {
        for (; a.g.g; )
            try {
                var c = a.h(a.g);
                if (c) return (a.g.l = !1), { value: c.value, done: !1 };
            } catch (b) {
                (a.g.i = void 0), P(a.g, b);
            }
        a.g.l = !1;
        if (a.g.j) {
            c = a.g.j;
            a.g.j = null;
            if (c.P) throw c.O;
            return { value: c.return, done: !0 };
        }
        return { value: void 0, done: !0 };
    }
    function pa(a) {
        this.next = function (c) {
            O(a.g);
            a.g.h ? (c = R(a, a.g.h.next, c, a.g.o)) : (a.g.o(c), (c = S(a)));
            return c;
        };
        this.throw = function (c) {
            O(a.g);
            a.g.h ? (c = R(a, a.g.h["throw"], c, a.g.o)) : (P(a.g, c), (c = S(a)));
            return c;
        };
        this.return = function (c) {
            return oa(a, c);
        };
        this[Symbol.iterator] = function () {
            return this;
        };
    }
    function T(a, c) {
        c = new pa(new la(c));
        ka && a.prototype && ka(c, a.prototype);
        return c;
    }
    var qa =
        "function" == typeof Object.assign
            ? Object.assign
            : function (a, c) {
                  for (var b = 1; b < arguments.length; b++) {
                      var d = arguments[b];
                      if (d) for (var f in d) Object.prototype.hasOwnProperty.call(d, f) && (a[f] = d[f]);
                  }
                  return a;
              };
    H("Object.assign", function (a) {
        return a || qa;
    });
    H("Promise", function (a) {
        function c(e) {
            this.h = 0;
            this.i = void 0;
            this.g = [];
            this.o = !1;
            var g = this.j();
            try {
                e(g.resolve, g.reject);
            } catch (h) {
                g.reject(h);
            }
        }
        function b() {
            this.g = null;
        }
        function d(e) {
            return e instanceof c
                ? e
                : new c(function (g) {
                      g(e);
                  });
        }
        if (a) return a;
        b.prototype.h = function (e) {
            if (null == this.g) {
                this.g = [];
                var g = this;
                this.i(function () {
                    g.l();
                });
            }
            this.g.push(e);
        };
        var f = G.setTimeout;
        b.prototype.i = function (e) {
            f(e, 0);
        };
        b.prototype.l = function () {
            for (; this.g && this.g.length; ) {
                var e = this.g;
                this.g = [];
                for (var g = 0; g < e.length; ++g) {
                    var h = e[g];
                    e[g] = null;
                    try {
                        h();
                    } catch (m) {
                        this.j(m);
                    }
                }
            }
            this.g = null;
        };
        b.prototype.j = function (e) {
            this.i(function () {
                throw e;
            });
        };
        c.prototype.j = function () {
            function e(m) {
                return function (q) {
                    h || ((h = !0), m.call(g, q));
                };
            }
            var g = this,
                h = !1;
            return { resolve: e(this.v), reject: e(this.l) };
        };
        c.prototype.v = function (e) {
            if (e === this) this.l(new TypeError("A Promise cannot resolve to itself"));
            else if (e instanceof c) this.G(e);
            else {
                a: switch (typeof e) {
                    case "object":
                        var g = null != e;
                        break a;
                    case "function":
                        g = !0;
                        break a;
                    default:
                        g = !1;
                }
                g ? this.u(e) : this.m(e);
            }
        };
        c.prototype.u = function (e) {
            var g = void 0;
            try {
                g = e.then;
            } catch (h) {
                this.l(h);
                return;
            }
            "function" == typeof g ? this.H(g, e) : this.m(e);
        };
        c.prototype.l = function (e) {
            this.s(2, e);
        };
        c.prototype.m = function (e) {
            this.s(1, e);
        };
        c.prototype.s = function (e, g) {
            if (0 != this.h) throw Error("Cannot settle(" + e + ", " + g + "): Promise already settled in state" + this.h);
            this.h = e;
            this.i = g;
            2 === this.h && this.A();
            this.D();
        };
        c.prototype.A = function () {
            var e = this;
            f(function () {
                if (e.F()) {
                    var g = G.console;
                    "undefined" !== typeof g && g.error(e.i);
                }
            }, 1);
        };
        c.prototype.F = function () {
            if (this.o) return !1;
            var e = G.CustomEvent,
                g = G.Event,
                h = G.dispatchEvent;
            if ("undefined" === typeof h) return !0;
            "function" === typeof e
                ? (e = new e("unhandledrejection", { cancelable: !0 }))
                : "function" === typeof g
                ? (e = new g("unhandledrejection", { cancelable: !0 }))
                : ((e = G.document.createEvent("CustomEvent")), e.initCustomEvent("unhandledrejection", !1, !0, e));
            e.promise = this;
            e.reason = this.i;
            return h(e);
        };
        c.prototype.D = function () {
            if (null != this.g) {
                for (var e = 0; e < this.g.length; ++e) k.h(this.g[e]);
                this.g = null;
            }
        };
        var k = new b();
        c.prototype.G = function (e) {
            var g = this.j();
            e.I(g.resolve, g.reject);
        };
        c.prototype.H = function (e, g) {
            var h = this.j();
            try {
                e.call(g, h.resolve, h.reject);
            } catch (m) {
                h.reject(m);
            }
        };
        c.prototype.then = function (e, g) {
            function h(r, z) {
                return "function" == typeof r
                    ? function (F) {
                          try {
                              m(r(F));
                          } catch (p) {
                              q(p);
                          }
                      }
                    : z;
            }
            var m,
                q,
                A = new c(function (r, z) {
                    m = r;
                    q = z;
                });
            this.I(h(e, m), h(g, q));
            return A;
        };
        c.prototype.catch = function (e) {
            return this.then(void 0, e);
        };
        c.prototype.I = function (e, g) {
            function h() {
                switch (m.h) {
                    case 1:
                        e(m.i);
                        break;
                    case 2:
                        g(m.i);
                        break;
                    default:
                        throw Error("Unexpected state: " + m.h);
                }
            }
            var m = this;
            null == this.g ? k.h(h) : this.g.push(h);
            this.o = !0;
        };
        c.resolve = d;
        c.reject = function (e) {
            return new c(function (g, h) {
                h(e);
            });
        };
        c.race = function (e) {
            return new c(function (g, h) {
                for (var m = J(e), q = m.next(); !q.done; q = m.next()) d(q.value).I(g, h);
            });
        };
        c.all = function (e) {
            var g = J(e),
                h = g.next();
            return h.done
                ? d([])
                : new c(function (m, q) {
                      function A(F) {
                          return function (p) {
                              r[F] = p;
                              z--;
                              0 == z && m(r);
                          };
                      }
                      var r = [],
                          z = 0;
                      do r.push(void 0), z++, d(h.value).I(A(r.length - 1), q), (h = g.next());
                      while (!h.done);
                  });
        };
        return c;
    });
    function ra(a, c) {
        a instanceof String && (a += "");
        var b = 0,
            d = !1,
            f = {
                next: function () {
                    if (!d && b < a.length) {
                        var k = b++;
                        return { value: c(k, a[k]), done: !1 };
                    }
                    d = !0;
                    return { done: !0, value: void 0 };
                },
            };
        f[Symbol.iterator] = function () {
            return f;
        };
        return f;
    }
    H("Array.prototype.keys", function (a) {
        return a
            ? a
            : function () {
                  return ra(this, function (c) {
                      return c;
                  });
              };
    });
    var sa = this || self;
    function U(a, c) {
        a = a.split(".");
        var b = sa;
        a[0] in b || "undefined" == typeof b.execScript || b.execScript("var " + a[0]);
        for (var d; a.length && (d = a.shift()); ) a.length || void 0 === c ? (b[d] && b[d] !== Object.prototype[d] ? (b = b[d]) : (b = b[d] = {})) : (b[d] = c);
    }
    function V(a, c) {
        var b = void 0;
        return new (b || (b = Promise))(function (d, f) {
            function k(h) {
                try {
                    g(c.next(h));
                } catch (m) {
                    f(m);
                }
            }
            function e(h) {
                try {
                    g(c["throw"](h));
                } catch (m) {
                    f(m);
                }
            }
            function g(h) {
                h.done
                    ? d(h.value)
                    : new b(function (m) {
                          m(h.value);
                      }).then(k, e);
            }
            g((c = c.apply(a, void 0)).next());
        });
    }
    function ta(a, c, b) {
        b = a.createShader(0 === b ? a.VERTEX_SHADER : a.FRAGMENT_SHADER);
        a.shaderSource(b, c);
        a.compileShader(b);
        if (!a.getShaderParameter(b, a.COMPILE_STATUS)) throw Error("Could not compile WebGL shader.\n\n" + a.getShaderInfoLog(b));
        return b;
    }
    function W(a, c) {
        this.g = a;
        this.i = c;
        this.j = 0;
    }
    function ua(a, c) {
        var b = a.i;
        if (void 0 === a.l) {
            var d = ta(b, "\n  attribute vec2 aVertex;\n  attribute vec2 aTex;\n  varying vec2 vTex;\n  void main(void) {\n    gl_Position = vec4(aVertex, 0.0, 1.0);\n    vTex = aTex;\n  }", 0),
                f = ta(b, "\n  precision highp float;\n  varying vec2 vTex;\n  uniform sampler2D sampler0;\n  void main(){\n    gl_FragColor = texture2D(sampler0, vTex);\n  }", 1),
                k = b.createProgram();
            b.attachShader(k, d);
            b.attachShader(k, f);
            b.linkProgram(k);
            if (!b.getProgramParameter(k, b.LINK_STATUS)) throw Error("Could not compile WebGL program.\n\n" + b.getProgramInfoLog(k));
            d = a.l = k;
            b.useProgram(d);
            f = b.getUniformLocation(d, "sampler0");
            a.h = { C: b.getAttribLocation(d, "aVertex"), B: b.getAttribLocation(d, "aTex"), S: f };
            a.o = b.createBuffer();
            b.bindBuffer(b.ARRAY_BUFFER, a.o);
            b.enableVertexAttribArray(a.h.C);
            b.vertexAttribPointer(a.h.C, 2, b.FLOAT, !1, 0, 0);
            b.bufferData(b.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), b.STATIC_DRAW);
            b.bindBuffer(b.ARRAY_BUFFER, null);
            a.m = b.createBuffer();
            b.bindBuffer(b.ARRAY_BUFFER, a.m);
            b.enableVertexAttribArray(a.h.B);
            b.vertexAttribPointer(a.h.B, 2, b.FLOAT, !1, 0, 0);
            b.bufferData(b.ARRAY_BUFFER, new Float32Array([0, 1, 0, 0, 1, 0, 1, 1]), b.STATIC_DRAW);
            b.bindBuffer(b.ARRAY_BUFFER, null);
            b.uniform1i(f, 0);
        }
        d = a.h;
        b.useProgram(a.l);
        b.canvas.width = c.width;
        b.canvas.height = c.height;
        b.viewport(0, 0, c.width, c.height);
        b.activeTexture(b.TEXTURE0);
        a.g.bindTexture2d(c.glName);
        b.enableVertexAttribArray(d.C);
        b.bindBuffer(b.ARRAY_BUFFER, a.o);
        b.vertexAttribPointer(d.C, 2, b.FLOAT, !1, 0, 0);
        b.enableVertexAttribArray(d.B);
        b.bindBuffer(b.ARRAY_BUFFER, a.m);
        b.vertexAttribPointer(d.B, 2, b.FLOAT, !1, 0, 0);
        b.bindFramebuffer(b.DRAW_FRAMEBUFFER ? b.DRAW_FRAMEBUFFER : b.FRAMEBUFFER, null);
        b.drawArrays(b.TRIANGLE_FAN, 0, 4);
        b.disableVertexAttribArray(d.C);
        b.disableVertexAttribArray(d.B);
        b.bindBuffer(b.ARRAY_BUFFER, null);
        a.g.bindTexture2d(0);
    }
    function va(a) {
        this.g = a;
    }
    var wa = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 9, 1, 7, 0, 65, 0, 253, 15, 26, 11]);
    function xa(a, c) {
        return c + a;
    }
    function ya(a, c) {
        window[a] = c;
    }
    function za(a) {
        var c = document.createElement("script");
        c.setAttribute("src", a);
        c.setAttribute("crossorigin", "anonymous");
        document.body.appendChild(c);
        return new Promise(function (b) {
            c.addEventListener(
                "load",
                function () {
                    b();
                },
                !1
            );
        });
    }
    function X(a) {
        for (var c = [], b = a.size(), d = 0; d < b; ++d) {
            var f = a.get(d);
            c.push({ x: f.x, y: f.y, z: f.z, visibility: f.hasVisibility ? f.visibility : void 0 });
        }
        return c;
    }
    function Aa(a) {
        for (var c = [], b = a.size(), d = 0; d < b; ++d) {
            var f = a.get(d);
            c.push({ index: f.index, score: f.score, label: f.hasLabel ? f.label : void 0, displayName: f.hasDisplayName ? f.displayName : void 0 });
        }
        return c;
    }
    function Ba() {
        return V(this, function c() {
            return T(c, function (b) {
                switch (b.g) {
                    case 1:
                        return (b.m = 2), Q(b, WebAssembly.instantiate(wa), 4);
                    case 4:
                        b.g = 3;
                        b.m = 0;
                        break;
                    case 2:
                        return (b.m = 0), (b.j = null), b.return(!1);
                    case 3:
                        return b.return(!0);
                }
            });
        });
    }
    function Y(a) {
        this.g = a;
        this.listeners = {};
        this.o = {};
        this.F = {};
        this.l = {};
        this.m = {};
        this.s = this.G = !0;
        this.A = Promise.resolve();
        this.locateFile = (a && a.locateFile) || xa;
        if ("object" === typeof window) a = window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf("/")) + "/";
        else if ("undefined" !== typeof location) a = location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf("/")) + "/";
        else throw Error("solutions can only be loaded on a web page or in a web worker");
        this.H = a;
    }
    C = Y.prototype;
    C.close = function () {
        this.i && this.i.delete();
        return Promise.resolve();
    };
    function Ca(a, c) {
        return void 0 === a.g.files ? [] : "function" === typeof a.g.files ? a.g.files(c) : a.g.files;
    }
    function Da(a) {
        return V(a, function b() {
            var d = this,
                f,
                k,
                e,
                g,
                h,
                m,
                q,
                A,
                r,
                z,
                F,
                p,
                y,
                u;
            return T(b, function (l) {
                switch (l.g) {
                    case 1:
                        f = d;
                        if (!d.G) return l.return();
                        k = Ca(d, d.o);
                        return Q(l, Ba(), 2);
                    case 2:
                        e = l.i;
                        if ("object" === typeof window)
                            return (
                                ya("createMediapipeSolutionsWasm", { locateFile: d.locateFile }),
                                ya("createMediapipeSolutionsPackedAssets", { locateFile: d.locateFile }),
                                (m = k.filter(function (x) {
                                    return void 0 !== x.data;
                                })),
                                (q = k.filter(function (x) {
                                    return void 0 === x.data;
                                })),
                                (A = Promise.all(
                                    m.map(function (x) {
                                        return V(f, function w() {
                                            var v = this;
                                            return T(w, function (n) {
                                                return Q(n, Z(v, x.url), 0);
                                            });
                                        });
                                    })
                                )),
                                (r = Promise.all(
                                    q.map(function (x) {
                                        return void 0 === x.simd || (x.simd && e) || (!x.simd && !e) ? za(f.locateFile(x.url, f.H)) : Promise.resolve();
                                    })
                                ).then(function () {
                                    return V(f, function t() {
                                        var w,
                                            v,
                                            n = this;
                                        return T(t, function (B) {
                                            if (1 == B.g) return (w = window.createMediapipeSolutionsWasm), (v = window.createMediapipeSolutionsPackedAssets), Q(B, w(v), 2);
                                            n.h = B.i;
                                            B.g = 0;
                                        });
                                    });
                                })),
                                (z = (function () {
                                    return V(f, function t() {
                                        var w = this;
                                        return T(t, function (v) {
                                            w.g.graph && w.g.graph.url ? (v = Q(v, Z(w, w.g.graph.url), 0)) : ((v.g = 0), (v = void 0));
                                            return v;
                                        });
                                    });
                                })()),
                                Q(l, Promise.all([r, A, z]), 7)
                            );
                        if ("function" !== typeof importScripts) throw Error("solutions can only be loaded on a web page or in a web worker");
                        g = k
                            .filter(function (x) {
                                return void 0 === x.simd || (x.simd && e) || (!x.simd && !e);
                            })
                            .map(function (x) {
                                return f.locateFile(x.url, f.H);
                            });
                        importScripts.apply(null, ha(g));
                        return Q(l, createMediapipeSolutionsWasm(Module), 6);
                    case 6:
                        d.h = l.i;
                        d.j = new OffscreenCanvas(1, 1);
                        d.h.canvas = d.j;
                        h = d.h.GL.createContext(d.j, { antialias: !1, alpha: !1, R: "undefined" !== typeof WebGL2RenderingContext ? 2 : 1 });
                        d.h.GL.makeContextCurrent(h);
                        l.g = 4;
                        break;
                    case 7:
                        (d.j = document.createElement("canvas")), (d.h.canvas = d.j), d.h.createContext(d.j, !0, !0, {});
                    case 4:
                        d.i = new d.h.SolutionWasm();
                        if (!d.g.graph || !d.g.graph.url) {
                            l.g = 8;
                            break;
                        }
                        return Q(l, Z(d, d.g.graph.url), 9);
                    case 9:
                        (F = l.i), d.i.loadGraph(F);
                    case 8:
                        if (d.g.listeners) for (p = J(d.g.listeners), y = p.next(); !y.done; y = p.next()) (u = y.value), Ea(d, u);
                        d.G = !1;
                        l.g = 0;
                }
            });
        });
    }
    C.reset = function () {
        return V(this, function c() {
            var b = this;
            return T(c, function (d) {
                b.i && (b.i.reset(), (b.l = {}), (b.m = {}));
                d.g = 0;
            });
        });
    };
    C.setOptions = function (a) {
        var c = this;
        if (this.g.options) {
            for (var b = [], d = [], f = {}, k = J(Object.keys(a)), e = k.next(); !e.done; f = { J: f.J, K: f.K }, e = k.next()) {
                var g = e.value;
                !(g in this.o && this.o[g] === a[g]) &&
                    ((this.o[g] = a[g]), (e = this.g.options[g])) &&
                    (e.onChange &&
                        ((f.J = e.onChange),
                        (f.K = a[g]),
                        b.push(
                            (function (h) {
                                return function () {
                                    return V(c, function q() {
                                        var A,
                                            r = this;
                                        return T(q, function (z) {
                                            if (1 == z.g) return Q(z, h.J(h.K), 2);
                                            A = z.i;
                                            !0 === A && (r.s = !0);
                                            z.g = 0;
                                        });
                                    });
                                };
                            })(f)
                        )),
                    e.graphOptionXref &&
                        ((g = { valueNumber: 0 === e.type ? a[g] : 0, valueBoolean: 1 === e.type ? a[g] : !1 }),
                        (e = Object.assign(Object.assign(Object.assign({}, { calculatorName: "", calculatorIndex: 0 }), e.graphOptionXref), g)),
                        d.push(e)));
            }
            if (0 !== b.length || 0 !== d.length) (this.s = !0), (this.u = d), (this.v = b);
        }
    };
    function Fa(a) {
        return V(a, function b() {
            var d = this,
                f,
                k,
                e,
                g,
                h,
                m,
                q,
                A;
            return T(b, function (r) {
                switch (r.g) {
                    case 1:
                        if (!d.s) return r.return();
                        f = d.j.getContext("webgl2");
                        if (!f && ((f = d.j.getContext("webgl")), !f)) return alert("Failed to create WebGL canvas context when passing video frame."), r.return();
                        d.D = f;
                        if (!d.v) {
                            r.g = 2;
                            break;
                        }
                        k = J(d.v);
                        e = k.next();
                    case 3:
                        if (e.done) {
                            r.g = 5;
                            break;
                        }
                        g = e.value;
                        return Q(r, g(), 4);
                    case 4:
                        e = k.next();
                        r.g = 3;
                        break;
                    case 5:
                        d.v = void 0;
                    case 2:
                        if (d.u) {
                            h = new d.h.GraphOptionChangeRequestList();
                            m = J(d.u);
                            for (q = m.next(); !q.done; q = m.next()) (A = q.value), h.push_back(A);
                            d.i.changeOptions(h);
                            h.delete();
                            d.u = void 0;
                        }
                        d.s = !1;
                        r.g = 0;
                }
            });
        });
    }
    C.initialize = function () {
        return V(this, function c() {
            var b = this;
            return T(c, function (d) {
                return 1 == d.g ? Q(d, Da(b), 2) : Q(d, Fa(b), 0);
            });
        });
    };
    function Z(a, c) {
        return V(a, function d() {
            var f = this,
                k,
                e;
            return T(d, function (g) {
                if (c in f.F) return g.return(f.F[c]);
                k = f.locateFile(c, "");
                e = fetch(k).then(function (h) {
                    return h.arrayBuffer();
                });
                f.F[c] = e;
                return g.return(e);
            });
        });
    }
    C.overrideFile = function (a, c) {
        this.i.overrideFile(a, c);
    };
    C.clearOverriddenFiles = function () {
        this.i.clearOverriddenFiles();
    };
    C.send = function (a, c) {
        return V(this, function d() {
            var f = this,
                k,
                e,
                g,
                h,
                m,
                q,
                A,
                r,
                z;
            return T(d, function (F) {
                if (1 == F.g) {
                    if (!f.g.inputs) return F.return();
                    k = 1e3 * (void 0 === c || null === c ? performance.now() : c);
                    return Q(F, f.A, 2);
                }
                if (3 != F.g) return Q(F, f.initialize(), 3);
                e = new f.h.PacketDataList();
                g = J(Object.keys(a));
                for (h = g.next(); !h.done; h = g.next())
                    if (((m = h.value), (q = f.g.inputs[m]))) {
                        a: {
                            var p = f;
                            var y = a[m];
                            switch (q.type) {
                                case "video":
                                    var u = p.l[q.stream];
                                    u || ((u = new W(p.h, p.D)), (p.l[q.stream] = u));
                                    p = u;
                                    0 === p.j && (p.j = p.g.createTexture());
                                    if ("undefined" !== typeof HTMLVideoElement && y instanceof HTMLVideoElement) {
                                        var l = y.videoWidth;
                                        u = y.videoHeight;
                                    } else "undefined" !== typeof HTMLImageElement && y instanceof HTMLImageElement ? ((l = y.naturalWidth), (u = y.naturalHeight)) : ((l = y.width), (u = y.height));
                                    u = { glName: p.j, width: l, height: u };
                                    l = p.i;
                                    l.canvas.width = u.width;
                                    l.canvas.height = u.height;
                                    l.activeTexture(l.TEXTURE0);
                                    p.g.bindTexture2d(p.j);
                                    l.texImage2D(l.TEXTURE_2D, 0, l.RGBA, l.RGBA, l.UNSIGNED_BYTE, y);
                                    p.g.bindTexture2d(0);
                                    p = u;
                                    break a;
                                case "detections":
                                    u = p.l[q.stream];
                                    u || ((u = new va(p.h)), (p.l[q.stream] = u));
                                    p = u;
                                    p.data || (p.data = new p.g.DetectionListData());
                                    p.data.reset(y.length);
                                    for (u = 0; u < y.length; ++u) {
                                        l = y[u];
                                        p.data.setBoundingBox(u, l.N);
                                        if (l.M)
                                            for (var x = 0; x < l.M.length; ++x) {
                                                var t = l.M[x],
                                                    w = t.visibility ? !0 : !1;
                                                p.data.addNormalizedLandmark(u, Object.assign(Object.assign({}, t), { hasVisibility: w, visibility: w ? t.visibility : 0 }));
                                            }
                                        if (l.L)
                                            for (x = 0; x < l.L.length; ++x) {
                                                t = l.L[x];
                                                w = t.index ? !0 : !1;
                                                var v = t.label ? !0 : !1,
                                                    n = t.displayName ? !0 : !1;
                                                p.data.addClassification(u, { score: t.score, hasIndex: w, index: w ? t.index : -1, hasLabel: v, label: v ? t.label : "", hasDisplayName: n, displayName: n ? t.displayName : "" });
                                            }
                                    }
                                    p = p.data;
                                    break a;
                                default:
                                    p = {};
                            }
                        }
                        A = p;
                        r = q.stream;
                        switch (q.type) {
                            case "video":
                                e.pushTexture2d(Object.assign(Object.assign({}, A), { stream: r, timestamp: k }));
                                break;
                            case "detections":
                                z = A;
                                z.stream = r;
                                z.timestamp = k;
                                e.pushDetectionList(z);
                                break;
                            default:
                                throw Error("Unknown input config type: '" + q.type + "'");
                        }
                    }
                f.i.send(e);
                e.delete();
                F.g = 0;
            });
        });
    };
    function Ga(a, c, b) {
        if (b.isNumber()) return b.getNumber();
        if (b.isRect()) return b.getRect();
        if (b.isLandmarks()) return b.getLandmarks();
        if (b.isLandmarksList()) return b.getLandmarksList();
        if (b.isClassificationsList()) return b.getClassificationsList();
        if (b.isObjectDetectionList()) return b.getObjectDetectionList();
        if (b.isTexture2d()) {
            var d = a.m[c];
            d || ((d = new W(a.h, a.D)), (a.m[c] = d));
            a = d;
            b = b.getTexture2d();
            ua(a, b);
            return a.i.canvas;
        }
    }
    function Ea(a, c) {
        for (var b = c.name || "$", d = [].concat(ha(c.wants)), f = new a.h.StringList(), k = J(c.wants), e = k.next(); !e.done; e = k.next()) f.push_back(e.value);
        k = a.h.PacketListener.implement({
            onResults: function (g) {
                return V(a, function m() {
                    var q,
                        A,
                        r = this,
                        z,
                        F,
                        p;
                    return T(m, function (y) {
                        if (1 == y.g) {
                            q = {};
                            for (A = 0; A < c.wants.length; ++A) q[d[A]] = g.get(A);
                            var u;
                            if ((u = c.outs)) {
                                for (var l = {}, x = J(Object.keys(u)), t = x.next(); !t.done; t = x.next()) {
                                    t = t.value;
                                    var w = u[t];
                                    if ("string" === typeof w) l[t] = Ga(r, t, q[w]);
                                    else {
                                        var v = q[w.stream];
                                        if (void 0 !== v) {
                                            if ("detection_list" === w.type) {
                                                var n = v.getRectList(),
                                                    B = v.getLandmarksList();
                                                v = v.getClassificationsList();
                                                var D = [];
                                                if (n)
                                                    for (var I = 0; I < n.size(); ++I) {
                                                        var aa = { N: n.get(I), M: X(B.get(I)), L: Aa(v.get(I)) };
                                                        D.push(aa);
                                                    }
                                                l[t] = D;
                                            } else if ("landmarks" === w.type) (n = v.getLandmarks()), (l[t] = n ? X(n) : void 0);
                                            else if ("landmarks_list" === w.type) {
                                                if ((n = v.getLandmarksList())) {
                                                    B = [];
                                                    v = n.size();
                                                    for (D = 0; D < v; ++D) (I = n.get(D)), B.push(X(I));
                                                    n = B;
                                                } else n = void 0;
                                                l[t] = n;
                                            } else if ("rect_list" === w.type) {
                                                if ((n = v.getRectList())) {
                                                    B = [];
                                                    v = n.size();
                                                    for (D = 0; D < v; ++D) (I = n.get(D)), B.push(I);
                                                    n = B;
                                                } else n = void 0;
                                                l[t] = n;
                                            } else if ("classifications_list" === w.type) {
                                                if ((n = v.getClassificationsList())) {
                                                    B = [];
                                                    v = n.size();
                                                    for (D = 0; D < v; ++D) (I = n.get(D)), B.push(Aa(I));
                                                    n = B;
                                                } else n = void 0;
                                                l[t] = n;
                                            } else if ("object_detection_list" === w.type) {
                                                if ((n = v.getObjectDetectionList())) {
                                                    B = [];
                                                    v = n.size();
                                                    for (D = 0; D < v; ++D) {
                                                        var ba = n.get(D);
                                                        I = B;
                                                        aa = I.push;
                                                        for (var Ja = ba.id, ma = ba.keypoints, na = [], Ka = ma.size(), ca = 0; ca < Ka; ++ca) {
                                                            var M = ma.get(ca);
                                                            na.push({ id: M.id, point3d: { x: M.point3d.x, y: M.point3d.y, z: M.point3d.z }, point2d: { x: M.point2d.x, y: M.point2d.y, depth: M.point2d.depth } });
                                                        }
                                                        aa.call(I, { id: Ja, keypoints: na, visibility: ba.visibility });
                                                    }
                                                    n = B;
                                                } else n = void 0;
                                                l[t] = n;
                                            } else if ("texture" === w.type) (n = r.m[t]), n || ((n = new W(r.h, r.D)), (r.m[t] = n)), (B = v.getTexture2d()), ua(n, B), (l[t] = n.i.canvas);
                                            else throw Error("Unknown output config type: '" + w.type + "'");
                                            w.transform && l[t] && (l[t] = w.transform(l[t]));
                                        }
                                    }
                                }
                                u = l;
                            } else u = q;
                            z = u;
                            (F = r.listeners[b]) ? (y = Q(y, r.A, 3)) : ((y.g = 0), (y = void 0));
                            return y;
                        }
                        if ((p = F(z))) return (r.A = p), y.return(p);
                        y.g = 0;
                    });
                });
            },
        });
        a.i.attachMultiListener(f, k);
        f.delete();
    }
    C.onResults = function (a, c) {
        this.listeners[c || "$"] = a;
    };
    U("Solution", Y);
    U("OptionType", { NUMBER: 0, BOOL: 1, 0: "NUMBER", 1: "BOOL" });
    function Ha(a) {
        void 0 === a && (a = 0);
        switch (a) {
            case 1:
                return "pose_landmark_full.tflite";
            case 2:
                return "pose_landmark_heavy.tflite";
            default:
                return "pose_landmark_lite.tflite";
        }
    }
    function Ia(a) {
        var c = this;
        a = a || {};
        this.g = new Y({
            locateFile: a.locateFile,
            files: function (b) {
                return [{ url: "pose_solution_packed_assets_loader.js" }, { simd: !1, url: "pose_solution_wasm_bin.js" }, { simd: !0, url: "pose_solution_simd_wasm_bin.js" }, { data: !0, url: Ha(b.modelComplexity) }];
            },
            graph: { url: "pose_web.binarypb" },
            listeners: [{ wants: ["pose_landmarks", "image_transformed"], outs: { image: "image_transformed", poseLandmarks: { type: "landmarks", stream: "pose_landmarks" } } }],
            inputs: { image: { type: "video", stream: "input_frames_gpu" } },
            options: {
                selfieMode: { type: 1, graphOptionXref: { calculatorType: "GlScalerCalculator", calculatorIndex: 1, fieldName: "flip_horizontal" } },
                modelComplexity: {
                    type: 0,
                    graphOptionXref: { calculatorType: "ConstantSidePacketCalculator", calculatorName: "ConstantSidePacketCalculatorModelComplexity", fieldName: "int_value" },
                    onChange: function (b) {
                        return V(c, function f() {
                            var k,
                                e,
                                g = this,
                                h;
                            return T(f, function (m) {
                                if (1 == m.g) return (k = Ha(b)), (e = "third_party/mediapipe/modules/pose_landmark/" + k), Q(m, Z(g.g, k), 2);
                                h = m.i;
                                g.g.overrideFile(e, h);
                                return m.return(!0);
                            });
                        });
                    },
                },
                smoothLandmarks: { type: 1, graphOptionXref: { calculatorType: "ConstantSidePacketCalculator", calculatorName: "ConstantSidePacketCalculatorSmoothLandmarks", fieldName: "bool_value" } },
                minDetectionConfidence: { type: 0, graphOptionXref: { calculatorType: "TensorsToDetectionsCalculator", calculatorName: "poselandmarkgpu__posedetectiongpu__TensorsToDetectionsCalculator", fieldName: "min_score_thresh" } },
                minTrackingConfidence: { type: 0, graphOptionXref: { calculatorType: "ThresholdingCalculator", calculatorName: "poselandmarkgpu__poselandmarkbyroigpu__ThresholdingCalculator", fieldName: "threshold" } },
            },
        });
    }
    C = Ia.prototype;
    C.reset = function () {
        this.g.reset();
    };
    C.close = function () {
        this.g.close();
        return Promise.resolve();
    };
    C.onResults = function (a) {
        this.g.onResults(a);
    };
    C.initialize = function () {
        return V(this, function c() {
            var b = this;
            return T(c, function (d) {
                return Q(d, b.g.initialize(), 0);
            });
        });
    };
    C.send = function (a, c) {
        return V(this, function d() {
            var f = this;
            return T(d, function (k) {
                return Q(k, f.g.send(a, c), 0);
            });
        });
    };
    C.setOptions = function (a) {
        this.g.setOptions(a);
    };
    U("Pose", Ia);
    U("POSE_CONNECTIONS", [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 7],
        [0, 4],
        [4, 5],
        [5, 6],
        [6, 8],
        [9, 10],
        [11, 12],
        [11, 13],
        [13, 15],
        [15, 17],
        [15, 19],
        [15, 21],
        [17, 19],
        [12, 14],
        [14, 16],
        [16, 18],
        [16, 20],
        [16, 22],
        [18, 20],
        [11, 23],
        [12, 24],
        [23, 24],
        [23, 25],
        [24, 26],
        [25, 27],
        [26, 28],
        [27, 29],
        [28, 30],
        [29, 31],
        [30, 32],
        [27, 31],
        [28, 32],
    ]);
    U("POSE_LANDMARKS", {
        NOSE: 0,
        LEFT_EYE_INNER: 1,
        LEFT_EYE: 2,
        LEFT_EYE_OUTER: 3,
        RIGHT_EYE_INNER: 4,
        RIGHT_EYE: 5,
        RIGHT_EYE_OUTER: 6,
        LEFT_EAR: 7,
        RIGHT_EAR: 8,
        LEFT_RIGHT: 9,
        RIGHT_LEFT: 10,
        LEFT_SHOULDER: 11,
        RIGHT_SHOULDER: 12,
        LEFT_ELBOW: 13,
        RIGHT_ELBOW: 14,
        LEFT_WRIST: 15,
        RIGHT_WRIST: 16,
        LEFT_PINKY: 17,
        RIGHT_PINKY: 18,
        LEFT_INDEX: 19,
        RIGHT_INDEX: 20,
        LEFT_THUMB: 21,
        RIGHT_THUMB: 22,
        LEFT_HIP: 23,
        RIGHT_HIP: 24,
        LEFT_KNEE: 25,
        RIGHT_KNEE: 26,
        LEFT_ANKLE: 27,
        RIGHT_ANKLE: 28,
        LEFT_HEEL: 29,
        RIGHT_HEEL: 30,
        LEFT_FOOT_INDEX: 31,
        RIGHT_FOOT_INDEX: 32,
    });
    U("POSE_LANDMARKS_LEFT", {
        LEFT_EYE_INNER: 1,
        LEFT_EYE: 2,
        LEFT_EYE_OUTER: 3,
        LEFT_EAR: 7,
        LEFT_RIGHT: 9,
        LEFT_SHOULDER: 11,
        LEFT_ELBOW: 13,
        LEFT_WRIST: 15,
        LEFT_PINKY: 17,
        LEFT_INDEX: 19,
        LEFT_THUMB: 21,
        LEFT_HIP: 23,
        LEFT_KNEE: 25,
        LEFT_ANKLE: 27,
        LEFT_HEEL: 29,
        LEFT_FOOT_INDEX: 31,
    });
    U("POSE_LANDMARKS_RIGHT", {
        RIGHT_EYE_INNER: 4,
        RIGHT_EYE: 5,
        RIGHT_EYE_OUTER: 6,
        RIGHT_EAR: 8,
        RIGHT_LEFT: 10,
        RIGHT_SHOULDER: 12,
        RIGHT_ELBOW: 14,
        RIGHT_WRIST: 16,
        RIGHT_PINKY: 18,
        RIGHT_INDEX: 20,
        RIGHT_THUMB: 22,
        RIGHT_HIP: 24,
        RIGHT_KNEE: 26,
        RIGHT_ANKLE: 28,
        RIGHT_HEEL: 30,
        RIGHT_FOOT_INDEX: 32,
    });
    U("POSE_LANDMARKS_NEUTRAL", { NOSE: 0 });
}.call(this));
