(function () {
    /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
    "use strict";
    function g(a) {
        var c = 0;
        return function () {
            return c < a.length ? { done: !1, value: a[c++] } : { done: !0 };
        };
    }
    var k =
        "function" == typeof Object.defineProperties
            ? Object.defineProperty
            : function (a, c, b) {
                  if (a == Array.prototype || a == Object.prototype) return a;
                  a[c] = b.value;
                  return a;
              };
    function l(a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var c = 0; c < a.length; ++c) {
            var b = a[c];
            if (b && b.Math == Math) return b;
        }
        throw Error("Cannot find global object");
    }
    var m = l(this);
    function n(a, c) {
        if (c)
            a: {
                var b = m;
                a = a.split(".");
                for (var d = 0; d < a.length - 1; d++) {
                    var f = a[d];
                    if (!(f in b)) break a;
                    b = b[f];
                }
                a = a[a.length - 1];
                d = b[a];
                c = c(d);
                c != d && null != c && k(b, a, { configurable: !0, writable: !0, value: c });
            }
    }
    function p(a) {
        var c = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
        return c ? c.call(a) : { next: g(a) };
    }
    n("Array.from", function (a) {
        return a
            ? a
            : function (c, b, d) {
                  b =
                      null != b
                          ? b
                          : function (A) {
                                return A;
                            };
                  var f = [],
                      e = "undefined" != typeof Symbol && Symbol.iterator && c[Symbol.iterator];
                  if ("function" == typeof e) {
                      c = e.call(c);
                      for (var h = 0; !(e = c.next()).done; ) f.push(b.call(d, e.value, h++));
                  } else for (e = c.length, h = 0; h < e; h++) f.push(b.call(d, c[h], h));
                  return f;
              };
    });
    n("Array.prototype.fill", function (a) {
        return a
            ? a
            : function (c, b, d) {
                  var f = this.length || 0;
                  0 > b && (b = Math.max(0, f + b));
                  if (null == d || d > f) d = f;
                  d = Number(d);
                  0 > d && (d = Math.max(0, f + d));
                  for (b = Number(b || 0); b < d; b++) this[b] = c;
                  return this;
              };
    });
    function q(a) {
        return a ? a : Array.prototype.fill;
    }
    n("Int8Array.prototype.fill", q);
    n("Uint8Array.prototype.fill", q);
    n("Uint8ClampedArray.prototype.fill", q);
    n("Int16Array.prototype.fill", q);
    n("Uint16Array.prototype.fill", q);
    n("Int32Array.prototype.fill", q);
    n("Uint32Array.prototype.fill", q);
    n("Float32Array.prototype.fill", q);
    n("Float64Array.prototype.fill", q);
    var r = this || self;
    function t(a, c) {
        a = a.split(".");
        var b = r;
        a[0] in b || "undefined" == typeof b.execScript || b.execScript("var " + a[0]);
        for (var d; a.length && (d = a.shift()); ) a.length || void 0 === c ? (b[d] && b[d] !== Object.prototype[d] ? (b = b[d]) : (b = b[d] = {})) : (b[d] = c);
    }
    function u() {
        this.i = this.counter = 0;
        this.g = Array.from({ length: 10 }).fill(0);
    }
    u.prototype.create = function (a, c, b) {
        c = b.appendChild(document.createElement("div"));
        c.classList.add("control-panel-entry");
        c.classList.add("control-panel-fps");
        a = c.appendChild(document.createElement("canvas"));
        this.h = c.appendChild(document.createElement("div"));
        this.h.classList.add("fps-text");
        b = c.appendChild(document.createElement("div"));
        b.classList.add("fps-30");
        b.textContent = "30";
        c = c.appendChild(document.createElement("div"));
        c.classList.add("fps-60");
        c.textContent = "60";
        a.width = 100;
        a.height = 100;
        this.j = a.getContext("2d");
        v(this, 0);
    };
    u.prototype.update = function () {};
    u.prototype.tick = function () {
        var a = Math.floor(performance.now() / 1e3);
        1 <= a - this.i && (v(this, this.counter), (this.i = a), (this.counter = 0));
        ++this.counter;
    };
    function v(a, c) {
        a.g.shift();
        a.g.push(c);
        var b = a.j;
        b.fillStyle = "green";
        b.clearRect(0, 0, b.canvas.width, b.canvas.height);
        for (var d = 0; 10 > d; ++d) {
            var f = Math.min(100, Math.max(0, a.g[d]));
            b.fillRect(10 * d + 1, 100 - f + 1, 8, f);
        }
        b.setLineDash([2, 2]);
        b.strokeStyle = "#a0a0a0a0";
        b.lineWidth = 2;
        b.beginPath();
        b.moveTo(0, 30);
        b.lineTo(100, 30);
        b.stroke();
        b.beginPath();
        b.moveTo(0, 60);
        b.lineTo(100, 60);
        b.stroke();
        a.h.textContent = c.toFixed(0) + " fps";
    }
    function w(a) {
        this.g = a;
    }
    w.prototype.create = function (a, c, b) {
        var d = this;
        this.h = c;
        c = this.g;
        b = b.appendChild(document.createElement("div"));
        b.classList.add("control-panel-entry");
        b.classList.add("control-panel-slider");
        var f = b.appendChild(document.createElement("span"));
        f.classList.add("label");
        (this.i = b.appendChild(document.createElement("span"))).classList.add("callout");
        var e = (this.j = b.appendChild(document.createElement("input")));
        e.classList.add("value");
        e.type = "range";
        c.range ? ((e.min = "" + c.range[0]), (e.max = "" + c.range[1]), (e.step = void 0 === c.step ? "any" : "" + c.step)) : c.discrete && ((e.min = "0"), (e.max = "" + (c.discrete.length - 1)), (e.step = "1"));
        e.oninput = function () {
            var h = Number(e.value);
            d.i.textContent = "" + (d.g.discrete ? d.g.discrete[h] : h);
        };
        e.onchange = function () {
            d.h[d.g.field] = Number(e.value);
            a();
        };
        f.textContent = c.title;
    };
    w.prototype.update = function () {
        var a = this.h[this.g.field];
        this.j.value = "" + a;
        this.i.textContent = "" + (this.g.discrete ? this.g.discrete[a] : a);
    };
    function x(a) {
        this.g = a;
    }
    x.prototype.create = function (a, c, b) {
        a = b.appendChild(document.createElement("div"));
        a.classList.add("control-panel-entry");
        a.classList.add("control-panel-text");
        a.textContent = this.g.title;
    };
    x.prototype.update = function () {};
    function y(a) {
        this.h = a;
    }
    y.prototype.create = function (a, c, b) {
        var d = this;
        this.j = a;
        this.i = c;
        this.g = b.appendChild(document.createElement("div"));
        this.g.classList.add("control-panel-entry");
        this.g.classList.add("control-panel-toggle");
        this.g.onclick = function () {
            d.i[d.h.field] = !d.i[d.h.field];
            d.j();
        };
        a = this.g.appendChild(document.createElement("span"));
        a.classList.add("label");
        this.value = this.g.appendChild(document.createElement("span"));
        this.value.classList.add("value");
        a.textContent = this.h.title;
    };
    y.prototype.update = function () {
        this.i[this.h.field] ? ((this.value.textContent = "Yes"), this.g.classList.add("yes"), this.g.classList.remove("no")) : ((this.value.textContent = "No"), this.g.classList.add("no"), this.g.classList.remove("yes"));
    };
    function z(a, c) {
        this.l = a;
        this.j = c;
        this.g = [];
        this.h = this.l.appendChild(document.createElement("div"));
        this.h.classList.add("control-panel");
    }
    z.prototype.add = function (a) {
        var c = this;
        a = p(a);
        for (var b = a.next(); !b.done; b = a.next())
            (b = b.value),
                this.g.push(b),
                b.create(
                    function () {
                        B(c);
                    },
                    this.j,
                    this.h
                );
        B(this);
        return this;
    };
    z.prototype.on = function (a) {
        this.i = a;
        B(this);
        return this;
    };
    function B(a) {
        for (var c = p(a.g), b = c.next(); !b.done; b = c.next()) b.value.update();
        a.i && a.i(a.j);
    }
    t("ControlPanel", z);
    t("Slider", w);
    t("StaticText", x);
    t("Toggle", y);
    t("FPS", u);
}.call(this));
