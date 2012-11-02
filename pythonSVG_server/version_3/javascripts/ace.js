(function () {
    if (window.require) require.packaged = !0;
    else {
        var a = function (b, c, d) {
            typeof b !== "string" ? a.original ? a.original.apply(window, arguments) : (console.error("dropping module because define wasn't a string."), console.trace()) : (arguments.length == 2 && (d = c), define.modules || (define.modules = {}), define.modules[b] = d)
        };
        window.define && (a.original = window.define),
        window.define = a;
        var b = function (a, d) {
            if (Object.prototype.toString.call(a) === "[object Array]") {
                var e = [];
                for (var f = 0, g = a.length; f < g; ++f) {
                    var h = c(a[f]);
                    if (!h && b.original) return b.original.apply(window, arguments);
                    e.push(h)
                }
                d && d.apply(null, e)
            } else {
                if (typeof a === "string") {
                    var i = c(a);
                    if (!i && b.original) return b.original.apply(window, arguments);
                    d && d();
                    return i
                }
                if (b.original) return b.original.apply(window, arguments)
            }
        };
        window.require && (b.original = window.require),
        window.require = b,
        require.packaged = !0;
        var c = function (a) {
            var b = define.modules[a];
            if (b == null) {
                console.error("Missing module: " + a);
                return null
            }
            if (typeof b === "function") {
                var c = {};
                b(require, c, {
                    id: a,
                    uri: ""
                }),
                define.modules[a] = c;
                return c
            }
            return b
        }
    }
})(),
define("pilot/fixoldbrowsers", ["require", "exports", "module"], function (a, b, c) {
    if (!Function.prototype.bind) {
        var d = Array.prototype.slice;
        Function.prototype.bind = function e(a) {
            var b = this;
            if (typeof b.apply !== "function" || typeof b.call !== "function") return new TypeError;
            var c = d.call(arguments),
                e = function e() {
                if (this instanceof e) {
                    var a = Object.create(b.prototype);
                    b.apply(a, c.concat(d.call(arguments)));
                    return a
                }
                return b.call.apply(b, c.concat(d.call(arguments)))
            };
            e.length = typeof b === "function" ? Math.max(b.length - c.length, 0) : 0;
            return e
        }
    }
    var f = Function.prototype.call,
        g = Array.prototype,
        h = Object.prototype,
        i = f.bind(h.hasOwnProperty),
        j, k, l, m, n;
    if (n = i(h, "__defineGetter__")) j = f.bind(h.__defineGetter__),
    k = f.bind(h.__defineSetter__),
    l = f.bind(h.__lookupGetter__),
    m = f.bind(h.__lookupSetter__);
    Array.isArray || (Array.isArray = function o(a) {
        return Object.prototype.toString.call(a) === "[object Array]"
    }),
    Array.prototype.forEach || (Array.prototype.forEach = function p(a, b) {
        var c = +this.length;
        for (var d = 0; d < c; d++) d in this && a.call(b, this[d], d, this)
    }),
    Array.prototype.map || (Array.prototype.map = function q(a) {
        var b = +this.length;
        if (typeof a !== "function") throw new TypeError;
        var c = Array(b),
            d = arguments[1];
        for (var e = 0; e < b; e++) e in this && (c[e] = a.call(d, this[e], e, this));
        return c
    }),
    Array.prototype.filter || (Array.prototype.filter = function r(a) {
        var b = [],
            c = arguments[1];
        for (var d = 0; d < this.length; d++) a.call(c, this[d]) && b.push(this[d]);
        return b
    }),
    Array.prototype.every || (Array.prototype.every = function s(a) {
        var b = arguments[1];
        for (var c = 0; c < this.length; c++) if (!a.call(b, this[c])) return !1;
        return !0
    }),
    Array.prototype.some || (Array.prototype.some = function t(a) {
        var b = arguments[1];
        for (var c = 0; c < this.length; c++) if (a.call(b, this[c])) return !0;
        return !1
    }),
    Array.prototype.reduce || (Array.prototype.reduce = function u(a) {
        var b = +this.length;
        if (typeof a !== "function") throw new TypeError;
        if (b === 0 && arguments.length === 1) throw new TypeError;
        var c = 0;
        if (arguments.length < 2) {
            do {
                if (c in this) {
                    d = this[c++];
                    break
                }
                if (++c >= b) throw new TypeError
            } while (!0)
        } else var d = arguments[1];
        for (; c < b; c++) c in this && (d = a.call(null, d, this[c], c, this));
        return d
    }),
    Array.prototype.reduceRight || (Array.prototype.reduceRight = function v(a) {
        var b = +this.length;
        if (typeof a !== "function") throw new TypeError;
        if (b === 0 && arguments.length === 1) throw new TypeError;
        var c = b - 1;
        if (arguments.length < 2) {
            do {
                if (c in this) {
                    d = this[c--];
                    break
                }
                if (--c < 0) throw new TypeError
            } while (!0)
        } else var d = arguments[1];
        for (; c >= 0; c--) c in this && (d = a.call(null, d, this[c], c, this));
        return d
    }),
    Array.prototype.indexOf || (Array.prototype.indexOf = function w(a) {
        var b = this.length;
        if (!b) return -1;
        var c = arguments[1] || 0;
        if (c >= b) return -1;
        c < 0 && (c += b);
        for (; c < b; c++) {
            if (!i(this, c)) continue;
            if (a === this[c]) return c
        }
        return -1
    }),
    Array.prototype.lastIndexOf || (Array.prototype.lastIndexOf = function x(a) {
        var b = this.length;
        if (!b) return -1;
        var c = arguments[1] || b;
        c < 0 && (c += b),
        c = Math.min(c, b - 1);
        for (; c >= 0; c--) {
            if (!i(this, c)) continue;
            if (a === this[c]) return c
        }
        return -1
    }),
    Object.getPrototypeOf || (Object.getPrototypeOf = function y(a) {
        return a.__proto__ || a.constructor.prototype
    });
    if (!Object.getOwnPropertyDescriptor) {
        var z = "Object.getOwnPropertyDescriptor called on a non-object: ";
        Object.getOwnPropertyDescriptor = function A(a, b) {
            if (typeof a !== "object" && typeof a !== "function" || a === null) throw new TypeError(z + a);
            if (!i(a, b)) return undefined;
            var c, d, e;
            c = {
                enumerable: !0,
                configurable: !0
            };
            if (n) {
                var f = a.__proto__;
                a.__proto__ = h;
                var d = l(a, b),
                    e = m(a, b);
                a.__proto__ = f;
                if (d || e) {
                    d && (descriptor.get = d),
                    e && (descriptor.set = e);
                    return descriptor
                }
            }
            descriptor.value = a[b];
            return descriptor
        }
    }
    Object.getOwnPropertyNames || (Object.getOwnPropertyNames = function B(a) {
        return Object.keys(a)
    }),
    Object.create || (Object.create = function C(a, b) {
        var c;
        if (a === null) c = {
            "__proto__": null
        };
        else {
            if (typeof a !== "object") throw new TypeError("typeof prototype[" + typeof a + "] != 'object'");
            var d = function () {};
            d.prototype = a,
            c = new d,
            c.__proto__ = a
        }
        typeof b !== "undefined" && Object.defineProperties(c, b);
        return c
    });
    if (!Object.defineProperty) {
        var D = "Property description must be an object: ",
            E = "Object.defineProperty called on non-object: ",
            F = "getters & setters can not be defined on this javascript engine";
        Object.defineProperty = function G(a, b, c) {
            if (typeof a !== "object" && typeof a !== "function") throw new TypeError(E + a);
            if (typeof a !== "object" || a === null) throw new TypeError(D + c);
            if (i(c, "value")) if (n && (l(a, b) || m(a, b))) {
                var d = a.__proto__;
                a.__proto__ = h,
                delete a[b],
                a[b] = c.value,
                a.prototype
            } else a[b] = c.value;
            else {
                if (!n) throw new TypeError(F);
                i(c, "get") && j(a, b, c.get),
                i(c, "set") && k(a, b, c.set)
            }
            return a
        }
    }
    Object.defineProperties || (Object.defineProperties = function H(a, b) {
        for (var c in b) i(b, c) && Object.defineProperty(a, c, b[c]);
        return a
    }),
    Object.seal || (Object.seal = function I(a) {
        return a
    }),
    Object.freeze || (Object.freeze = function J(a) {
        return a
    });
    try {
        Object.freeze(function () {})
    } catch(K) {
        Object.freeze = function J(a) {
            return function b(b) {
                return typeof b === "function" ? b : a(b)
            }
        } (Object.freeze)
    }
    Object.preventExtensions || (Object.preventExtensions = function L(a) {
        return a
    }),
    Object.isSealed || (Object.isSealed = function M(a) {
        return !1
    }),
    Object.isFrozen || (Object.isFrozen = function N(a) {
        return !1
    }),
    Object.isExtensible || (Object.isExtensible = function O(a) {
        return !0
    });
    if (!Object.keys) {
        var P = !0,
            Q = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
            R = Q.length;
        for (var S in {
            toString: null
        }) P = !1;
        Object.keys = function T(a) {
            if (typeof a !== "object" && typeof a !== "function" || a === null) throw new TypeError("Object.keys called on a non-object");
            var b = [];
            for (var c in a) i(a, c) && b.push(c);
            if (P) for (var d = 0, e = R; d < e; d++) {
                var f = Q[d];
                i(a, f) && b.push(f)
            }
            return b
        }
    }
    Date.prototype.toISOString || (Date.prototype.toISOString = function U() {
        return this.getUTCFullYear() + "-" + (this.getUTCMonth() + 1) + "-" + this.getUTCDate() + "T" + this.getUTCHours() + ":" + this.getUTCMinutes() + ":" + this.getUTCSeconds() + "Z"
    }),
    Date.now || (Date.now = function V() {
        return (new Date).getTime()
    }),
    Date.prototype.toJSON || (Date.prototype.toJSON = function W(a) {
        if (typeof this.toISOString !== "function") throw new TypeError;
        return this.toISOString()
    }),
    isNaN(Date.parse("T00:00")) && (Date = function (a) {
        var b = function (c, d, e, f, g, h, i) {
            var j = arguments.length;
            if (this instanceof a) {
                var k = j === 1 && String(c) === c ? new a(b.parse(c)) : j >= 7 ? new a(c, d, e, f, g, h, i) : j >= 6 ? new a(c, d, e, f, g, h) : j >= 5 ? new a(c, d, e, f, g) : j >= 4 ? new a(c, d, e, f) : j >= 3 ? new a(c, d, e) : j >= 2 ? new a(c, d) : j >= 1 ? new a(c) : new a;
                k.constructor = b;
                return k
            }
            return a.apply(this, arguments)
        },
            c = new RegExp("^(?:((?:[+-]\\d\\d)?\\d\\d\\d\\d)(?:-(\\d\\d)(?:-(\\d\\d))?)?)?(?:T(\\d\\d):(\\d\\d)(?::(\\d\\d)(?:\\.(\\d\\d\\d))?)?)?(?:Z|([+-])(\\d\\d):(\\d\\d))?$");
        for (var d in a) b[d] = a[d];
        b.now = a.now,
        b.UTC = a.UTC,
        b.prototype = a.prototype,
        b.prototype.constructor = b,
        b.parse = function e(b) {
            var d = c.exec(b);
            if (d) {
                d.shift();
                var e = d[0] === undefined;
                for (var f = 0; f < 10; f++) {
                    if (f === 7) continue;
                    d[f] = +(d[f] || (f < 3 ? 1 : 0)),
                    f === 1 && d[f]--
                }
                if (e) return ((d[3] * 60 + d[4]) * 60 + d[5]) * 1e3 + d[6];
                var g = (d[8] * 60 + d[9]) * 60 * 1e3;
                d[6] === "-" && (g = -g);
                return a.UTC.apply(this, d.slice(0, 7)) + g
            }
            return a.parse.apply(this, arguments)
        };
        return b
    } (Date));
    if (!String.prototype.trim) {
        var X = /^\s\s*/,
            Y = /\s\s*$/;
        String.prototype.trim = function Z() {
            return String(this).replace(X, "").replace(Y, "")
        }
    }
}),
define("pilot/index", ["require", "exports", "module", "pilot/fixoldbrowsers", "pilot/types/basic", "pilot/types/command", "pilot/types/settings", "pilot/commands/settings", "pilot/commands/basic", "pilot/settings/canon", "pilot/canon"], function (a, b, c) {
    b.startup = function (b, c) {
        a("pilot/fixoldbrowsers"),
        a("pilot/types/basic").startup(b, c),
        a("pilot/types/command").startup(b, c),
        a("pilot/types/settings").startup(b, c),
        a("pilot/commands/settings").startup(b, c),
        a("pilot/commands/basic").startup(b, c),
        a("pilot/settings/canon").startup(b, c),
        a("pilot/canon").startup(b, c)
    },
    b.shutdown = function (b, c) {
        a("pilot/types/basic").shutdown(b, c),
        a("pilot/types/command").shutdown(b, c),
        a("pilot/types/settings").shutdown(b, c),
        a("pilot/commands/settings").shutdown(b, c),
        a("pilot/commands/basic").shutdown(b, c),
        a("pilot/settings/canon").shutdown(b, c),
        a("pilot/canon").shutdown(b, c)
    }
}),
define("pilot/types/basic", ["require", "exports", "module", "pilot/types"], function (a, b, c) {
    function m(a) {
        if (a instanceof e) this.subtype = a;
        else {
            if (typeof a !== "string") throw new Error("Can' handle array subtype");
            this.subtype = d.getType(a);
            if (this.subtype == null) throw new Error("Unknown array subtype: " + a)
        }
    }

    function l(a) {
        if (typeof a.defer !== "function") throw new Error("Instances of DeferredType need typeSpec.defer to be a function that returns a type");
        Object.keys(a).forEach(function (b) {
            this[b] = a[b]
        },
        this)
    }

    function j(a) {
        if (!Array.isArray(a.data) && typeof a.data !== "function") throw new Error("instances of SelectionType need typeSpec.data to be an array or function that returns an array:" + JSON.stringify(a));
        Object.keys(a).forEach(function (b) {
            this[b] = a[b]
        },
        this)
    }
    var d = a("pilot/types"),
        e = d.Type,
        f = d.Conversion,
        g = d.Status,
        h = new e;
    h.stringify = function (a) {
        return a
    },
    h.parse = function (a) {
        if (typeof a != "string") throw new Error("non-string passed to text.parse()");
        return new f(a)
    },
    h.name = "text";
    var i = new e;
    i.stringify = function (a) {
        if (!a) return null;
        return "" + a
    },
    i.parse = function (a) {
        if (typeof a != "string") throw new Error("non-string passed to number.parse()");
        if (a.replace(/\s/g, "").length === 0) return new f(null, g.INCOMPLETE, "");
        var b = new f(parseInt(a, 10));
        isNaN(b.value) && (b.status = g.INVALID, b.message = "Can't convert \"" + a + '" to a number.');
        return b
    },
    i.decrement = function (a) {
        return a - 1
    },
    i.increment = function (a) {
        return a + 1
    },
    i.name = "number",
    j.prototype = new e,
    j.prototype.stringify = function (a) {
        return a
    },
    j.prototype.parse = function (a) {
        if (typeof a != "string") throw new Error("non-string passed to parse()");
        if (!this.data) throw new Error("Missing data on selection type extension.");
        var b = typeof this.data === "function" ? this.data() : this.data,
        c = !1,
        d,
        e = [];
        b.forEach(function (b) {
            a == b ? (d = this.fromString(b), c = !0) : b.indexOf(a) === 0 && e.push(this.fromString(b))
        },
        this);
        if (c) return new f(d);
        this.noMatch && this.noMatch();
        if (e.length > 0) {
            var h = "Possibilities" + (a.length === 0 ? "" : " for '" + a + "'");
            return new f(null, g.INCOMPLETE, h, e)
        }
        var h = "Can't use '" + a + "'.";
        return new f(null, g.INVALID, h, e)
    },
    j.prototype.fromString = function (a) {
        return a
    },
    j.prototype.decrement = function (a) {
        var b = typeof this.data === "function" ? this.data() : this.data,
        c;
        if (a == null) c = b.length - 1;
        else {
            var d = this.stringify(a),
                c = b.indexOf(d);
            c = c === 0 ? b.length - 1 : c - 1
        }
        return this.fromString(b[c])
    },
    j.prototype.increment = function (a) {
        var b = typeof this.data === "function" ? this.data() : this.data,
        c;
        if (a == null) c = 0;
        else {
            var d = this.stringify(a),
                c = b.indexOf(d);
            c = c === b.length - 1 ? 0 : c + 1
        }
        return this.fromString(b[c])
    },
    j.prototype.name = "selection",
    b.SelectionType = j;
    var k = new j({
        name: "bool",
        data: ["true", "false"],
        stringify: function (a) {
            return "" + a
        },
        fromString: function (a) {
            return a === "true" ? !0 : !1
        }
    });
    l.prototype = new e,
    l.prototype.stringify = function (a) {
        return this.defer().stringify(a)
    },
    l.prototype.parse = function (a) {
        return this.defer().parse(a)
    },
    l.prototype.decrement = function (a) {
        var b = this.defer();
        return b.decrement ? b.decrement(a) : undefined
    },
    l.prototype.increment = function (a) {
        var b = this.defer();
        return b.increment ? b.increment(a) : undefined
    },
    l.prototype.name = "deferred",
    b.DeferredType = l,
    m.prototype = new e,
    m.prototype.stringify = function (a) {
        return a.join(" ")
    },
    m.prototype.parse = function (a) {
        return this.defer().parse(a)
    },
    m.prototype.name = "array";
    var n = !1;
    b.startup = function () {
        n || (n = !0, d.registerType(h), d.registerType(i), d.registerType(k), d.registerType(j), d.registerType(l), d.registerType(m))
    },
    b.shutdown = function () {
        n = !1,
        d.unregisterType(h),
        d.unregisterType(i),
        d.unregisterType(k),
        d.unregisterType(j),
        d.unregisterType(l),
        d.unregisterType(m)
    }
}),
define("pilot/types", ["require", "exports", "module"], function (a, b, c) {
    function i(a, b) {
        if (a.substr(-2) === "[]") {
            var c = a.slice(0, -2);
            return new g.array(c)
        }
        var d = g[a];
        typeof d === "function" && (d = new d(b));
        return d
    }

    function f() {}

    function e(a, b, c, e) {
        this.value = a,
        this.status = b || d.VALID,
        this.message = c,
        this.predictions = e || []
    }
    var d = {
        VALID: {
            toString: function () {
                return "VALID"
            },
            valueOf: function () {
                return 0
            }
        },
        INCOMPLETE: {
            toString: function () {
                return "INCOMPLETE"
            },
            valueOf: function () {
                return 1
            }
        },
        INVALID: {
            toString: function () {
                return "INVALID"
            },
            valueOf: function () {
                return 2
            }
        },
        combine: function (a) {
            var b = d.VALID;
            for (var c = 0; c < a.length; c++) a[c].valueOf() > b.valueOf() && (b = a[c]);
            return b
        }
    };
    b.Status = d,
    b.Conversion = e,
    f.prototype = {
        stringify: function (a) {
            throw new Error("not implemented")
        },
        parse: function (a) {
            throw new Error("not implemented")
        },
        name: undefined,
        increment: function (a) {
            return undefined
        },
        decrement: function (a) {
            return undefined
        },
        getDefault: function () {
            return this.parse("")
        }
    },
    b.Type = f;
    var g = {};
    b.registerType = function (a) {
        if (typeof a === "object") {
            if (! (a instanceof f)) throw new Error("Can't registerType using: " + a);
            if (!a.name) throw new Error("All registered types must have a name");
            g[a.name] = a
        } else {
            if (typeof a !== "function") throw new Error("Unknown type: " + a);
            if (!a.prototype.name) throw new Error("All registered types must have a name");
            g[a.prototype.name] = a
        }
    },
    b.registerTypes = function h(a) {
        Object.keys(a).forEach(function (c) {
            var d = a[c];
            d.name = c,
            b.registerType(d)
        })
    },
    b.deregisterType = function (a) {
        delete g[a.name]
    },
    b.getType = function (a) {
        if (typeof a === "string") return i(a);
        if (typeof a === "object") {
            if (!a.name) throw new Error("Missing 'name' member to typeSpec");
            return i(a.name, a)
        }
        throw new Error("Can't extract type from " + a)
    }
}),
define("pilot/types/command", ["require", "exports", "module", "pilot/canon", "pilot/types/basic", "pilot/types"], function (a, b, c) {
    var d = a("pilot/canon"),
        e = a("pilot/types/basic").SelectionType,
        f = a("pilot/types"),
        g = new e({
        name: "command",
        data: function () {
            return d.getCommandNames()
        },
        stringify: function (a) {
            return a.name
        },
        fromString: function (a) {
            return d.getCommand(a)
        }
    });
    b.startup = function () {
        f.registerType(g)
    },
    b.shutdown = function () {
        f.unregisterType(g)
    }
}),
define("pilot/canon", ["require", "exports", "module", "pilot/console", "pilot/stacktrace", "pilot/oop", "pilot/useragent", "pilot/keys", "pilot/event_emitter", "pilot/typecheck", "pilot/catalog", "pilot/types", "pilot/lang"], function (a, b, c) {
    function J(a) {
        a = a || {},
        this.command = a.command,
        this.args = a.args,
        this.typed = a.typed,
        this._begunOutput = !1,
        this.start = new Date,
        this.end = null,
        this.completed = !1,
        this.error = !1
    }

    function G(a, b, c, e, f) {
        function h() {
            a.exec(b, g.args, g),
            !g.isAsync && !g.isDone && g.done()
        }
        typeof a === "string" && (a = q[a]);
        if (!a) return !1;
        var g = new J({
            sender: c,
            command: a,
            args: e || {},
            typed: f
        });
        if (g.getStatus() == l.INVALID) {
            d.error("Canon.exec: Invalid parameter(s) passed to " + a.name);
            return !1
        }
        if (g.getStatus() == l.INCOMPLETE) {
            var i, j = b[c];
            if (!j || !j.getArgsProvider || !(i = j.getArgsProvider())) i = F;
            i(g, function () {
                g.getStatus() == l.VALID && h()
            });
            return !0
        }
        h();
        return !0
    }

    function F(a, b) {
        var c = a.args,
            d = a.command.params;
        for (var e = 0; e < d.length; e++) {
            var f = d[e];
            if (a.getParamStatus(f) != l.VALID || f.defaultValue === null) {
                var g = f.description;
                f.defaultValue === null && (g += " (optional)");
                var h = prompt(g, f.defaultValue || "");
                if (h) c[f.name] = h;
                else {
                    b();
                    return
                }
            }
        }
        b()
    }

    function E() {
        return z
    }

    function D(a) {
        return q[a]
    }

    function C(a) {
        var b = typeof a === "string" ? a : a.name;
        delete q[b],
        n.arrayRemove(z, b)
    }

    function B(a, b) {
        var c = b.type;
        b.type = m.getType(c);
        if (b.type == null) throw new Error("In " + a + "/" + b.name + ": can't find type for: " + JSON.stringify(c))
    }

    function A(a) {
        if (!a.name) throw new Error("All registered commands must have a name");
        a.params == null && (a.params = []);
        if (!Array.isArray(a.params)) throw new Error("command.params must be an array in " + a.name);
        a.params.forEach(function (b) {
            if (!b.name) throw new Error("In " + a.name + ": all params must have a name");
            B(a.name, b)
        },
        this),
        q[a.name] = a,
        a.bindKey && w(a),
        z.push(a.name),
        z.sort()
    }

    function y(a, b, c, d) {
        var e = x(a, b, c, d);
        return e ? G(e, a, b, {}) : !1
    }

    function x(a, b, c, d) {
        j.isNumber(d) && (d = h.keyCodeToString(d));
        var e = (s[c] || {})[d] || [];
        for (var f = 0; f < e.length; f++) if (e[f].sender(a, b, c, d)) return e[f].command;
        var g = r[b];
        return g && g[c] && g[c][d]
    }

    function w(a) {
        var b = a.bindKey,
            c = b[v],
            d = r,
            e = s;
        if (!b.sender) throw new Error("All key bindings must have a sender");
        if (!b.mac && b.mac !== null) throw new Error("All key bindings must have a mac key binding");
        if (!b.win && b.win !== null) throw new Error("All key bindings must have a windows key binding");
        if (b[v]) if (typeof b.sender == "string") {
            var f = t(b.sender, "\\|", null, !0);
            f.forEach(function (b) {
                d[b] || (d[b] = {}),
                c.split("|").forEach(function (c) {
                    u(c, a, d[b])
                })
            })
        } else {
            if (!j.isFunction(b.sender)) throw new Error("Key binding must have a sender that is a string or function");
            var g = {
                command: a,
                sender: b.sender
            };
            keyData = u(c),
            e[keyData.hashId] || (e[keyData.hashId] = {}),
            e[keyData.hashId][keyData.key] ? e[keyData.hashId][keyData.key].push(g) : e[keyData.hashId][keyData.key] = [g]
        }
    }

    function u(a, b, c) {
        var d, e = 0,
            f = t(a, "\\-", null, !0),
            g = 0,
            i = f.length;
        for (; g < i; ++g) h.KEY_MODS[f[g]] ? e = e | h.KEY_MODS[f[g]] : d = f[g] || "-";
        if (c == null) return {
            key: d,
            hashId: e
        };
        (c[e] || (c[e] = {}))[d] = b
    }

    function t(a, b, c, d) {
        return (d && a.toLowerCase() || a).replace(/(?:^\s+|\n|\s+$)/g, "").split(new RegExp("[\\s ]*" + b + "[\\s ]*", "g"), c || 999)
    }
    var d = a("pilot/console"),
        e = a("pilot/stacktrace").Trace,
        f = a("pilot/oop"),
        g = a("pilot/useragent"),
        h = a("pilot/keys"),
        i = a("pilot/event_emitter").EventEmitter,
        j = a("pilot/typecheck"),
        k = a("pilot/catalog"),
        l = a("pilot/types").Status,
        m = a("pilot/types"),
        n = a("pilot/lang"),
        o = {
        name: "command",
        description: "A command is a bit of functionality with optional typed arguments which can do something small like moving the cursor around the screen, or large like cloning a project from VCS.",
        indexOn: "name"
    };
    b.startup = function (a, b) {
        k.addExtensionSpec(o)
    },
    b.shutdown = function (a, b) {
        k.removeExtensionSpec(o)
    };
    var p = {
        name: "thing",
        description: "thing is an example command",
        params: [{
            name: "param1",
            description: "an example parameter",
            type: "text",
            defaultValue: null
        }],
        exec: function (a, b, c) {
            thing()
        }
    },
        q = {},
        r = {},
        s = {},
        v = g.isMac ? "mac" : "win",
    z = [];
    b.removeCommand = C,
    b.addCommand = A,
    b.getCommand = D,
    b.getCommandNames = E,
    b.findKeyCommand = x,
    b.exec = G,
    b.execKeyCommand = y,
    b.upgradeType = B,
    f.implement(b, i);
    var H = [],
        I = 100;
    f.implement(J.prototype, i),
    J.prototype.getParamStatus = function (a) {
        var b = this.args || {};
        if (a.name in b) {
            if (b[a.name] == null) return a.defaultValue === null ? l.VALID : l.INCOMPLETE;
            var c, d = b[a.name].toString();
            try {
                c = a.type.parse(d)
            } catch(e) {
                return l.INVALID
            }
            if (c.status != l.VALID) return c.status
        } else if (a.defaultValue === undefined) return l.INCOMPLETE;
        return l.VALID
    },
    J.prototype.getParamNameStatus = function (a) {
        var b = this.command.params || [];
        for (var c = 0; c < b.length; c++) if (b[c].name == a) return this.getParamStatus(b[c]);
        throw "Parameter '" + a + "' not defined on command '" + this.command.name + "'"
    },
    J.prototype.getStatus = function () {
        var a = this.args || {},
            b = this.command.params;
        if (!b || b.length == 0) return l.VALID;
        var c = [];
        for (var d = 0; d < b.length; d++) c.push(this.getParamStatus(b[d]));
        return l.combine(c)
    },
    J.prototype._beginOutput = function () {
        this._begunOutput = !0,
        this.outputs = [],
        H.push(this);
        while (H.length > I) H.shiftObject();
        b._dispatchEvent("output", {
            requests: H,
            request: this
        })
    },
    J.prototype.doneWithError = function (a) {
        this.error = !0,
        this.done(a)
    },
    J.prototype.async = function () {
        this.isAsync = !0,
        this._begunOutput || this._beginOutput()
    },
    J.prototype.output = function (a) {
        this._begunOutput || this._beginOutput(),
        typeof a !== "string" && !(a instanceof Node) && (a = a.toString()),
        this.outputs.push(a),
        this.isDone = !0,
        this._dispatchEvent("output", {});
        return this
    },
    J.prototype.done = function (a) {
        this.completed = !0,
        this.end = new Date,
        this.duration = this.end.getTime() - this.start.getTime(),
        a && this.output(a),
        this.isDone || (this.isDone = !0, this._dispatchEvent("output", {}))
    },
    b.Request = J
}),
define("pilot/console", ["require", "exports", "module"], function (a, b, c) {
    var d = function () {},
        e = ["assert", "count", "debug", "dir", "dirxml", "error", "group", "groupEnd", "info", "log", "profile", "profileEnd", "time", "timeEnd", "trace", "warn"];
    typeof window === "undefined" ? e.forEach(function (a) {
        b[a] = function () {
            var b = Array.prototype.slice.call(arguments),
                c = {
                op: "log",
                method: a,
                args: b
            };
            postMessage(JSON.stringify(c))
        }
    }) : e.forEach(function (a) {
        window.console && window.console[a] ? b[a] = Function.prototype.bind.call(window.console[a], window.console) : b[a] = d
    })
}),
define("pilot/stacktrace", ["require", "exports", "module", "pilot/useragent", "pilot/console"], function (a, b, c) {
    function i() {}

    function g(a) {
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            typeof c == "object" ? a[b] = "#object" : typeof c == "function" ? a[b] = "#function" : typeof c == "string" && (a[b] = '"' + c + '"')
        }
        return a.join(",")
    }
    var d = a("pilot/useragent"),
        e = a("pilot/console"),
        f = function () {
        return d.isGecko ? "firefox" : d.isOpera ? "opera" : "other"
    } (),
        h = {
        chrome: function (a) {
            var b = a.stack;
            if (!b) {
                e.log(a);
                return []
            }
            return b.replace(/^.*?\n/, "").replace(/^.*?\n/, "").replace(/^.*?\n/, "").replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@").split("\n")
        },
        firefox: function (a) {
            var b = a.stack;
            if (!b) {
                e.log(a);
                return []
            }
            b = b.replace(/(?:\n@:0)?\s+$/m, ""),
            b = b.replace(/^\(/gm, "{anonymous}(");
            return b.split("\n")
        },
        opera: function (a) {
            var b = a.message.split("\n"),
                c = "{anonymous}",
                d = /Line\s+(\d+).*?script\s+(http\S+)(?:.*?in\s+function\s+(\S+))?/i,
                e, f, g;
            for (e = 4, f = 0, g = b.length; e < g; e += 2) d.test(b[e]) && (b[f++] = (RegExp.$3 ? RegExp.$3 + "()@" + RegExp.$2 + RegExp.$1 : c + "()@" + RegExp.$2 + ":" + RegExp.$1) + " -- " + b[e + 1].replace(/^\s+/, ""));
            b.splice(f, b.length - f);
            return b
        },
        other: function (a) {
            var b = "{anonymous}",
                c = /function\s*([\w\-$]+)?\s*\(/i,
                d = [],
                e = 0,
                f, h, i = 10;
            while (a && d.length < i) {
                f = c.test(a.toString()) ? RegExp.$1 || b : b,
                h = Array.prototype.slice.call(a.arguments),
                d[e++] = f + "(" + g(h) + ")";
                if (a === a.caller && window.opera) break;
                a = a.caller
            }
            return d
        }
    };
    i.prototype = {
        sourceCache: {},
        ajax: function (a) {
            var b = this.createXMLHTTPObject();
            if (b) {
                b.open("GET", a, !1),
                b.setRequestHeader("User-Agent", "XMLHTTP/1.0"),
                b.send("");
                return b.responseText
            }
        },
        createXMLHTTPObject: function () {
            var a, b = [function () {
                return new XMLHttpRequest
            },
            function () {
                return new ActiveXObject("Msxml2.XMLHTTP")
            },
            function () {
                return new ActiveXObject("Msxml3.XMLHTTP")
            },
            function () {
                return new ActiveXObject("Microsoft.XMLHTTP")
            }];
            for (var c = 0; c < b.length; c++) try {
                a = b[c](),
                this.createXMLHTTPObject = b[c];
                return a
            } catch(d) {}
        },
        getSource: function (a) {
            a in this.sourceCache || (this.sourceCache[a] = this.ajax(a).split("\n"));
            return this.sourceCache[a]
        },
        guessFunctions: function (a) {
            for (var b = 0; b < a.length; ++b) {
                var c = /{anonymous}\(.*\)@(\w+:\/\/([-\w\.]+)+(:\d+)?[^:]+):(\d+):?(\d+)?/,
                    d = a[b],
                    e = c.exec(d);
                if (e) {
                    var f = e[1],
                        g = e[4];
                    if (f && g) {
                        var h = this.guessFunctionName(f, g);
                        a[b] = d.replace("{anonymous}", h)
                    }
                }
            }
            return a
        },
        guessFunctionName: function (a, b) {
            try {
                return this.guessFunctionNameFromLines(b, this.getSource(a))
            } catch(c) {
                return "getSource failed with url: " + a + ", exception: " + c.toString()
            }
        },
        guessFunctionNameFromLines: function (a, b) {
            var c = /function ([^(]*)\(([^)]*)\)/,
                d = /['"]?([0-9A-Za-z_]+)['"]?\s*[:=]\s*(function|eval|new Function)/,
                e = "",
                f = 10;
            for (var g = 0; g < f; ++g) {
                e = b[a - g] + e;
                if (e !== undefined) {
                    var h = d.exec(e);
                    if (h) return h[1];
                    h = c.exec(e);
                    if (h && h[1]) return h[1]
                }
            }
            return "(?)"
        }
    };
    var j = new i,
        k = [/http:\/\/localhost:4020\/sproutcore.js:/];
    b.ignoreFramesMatching = function (a) {
        k.push(a)
    },
    b.Trace = function l(a, b) {
        this._ex = a,
        this._stack = h[f](a),
        b && (this._stack = j.guessFunctions(this._stack))
    },
    b.Trace.prototype.log = function (a) {
        a <= 0 && (a = 999999999);
        var b = 0;
        for (var c = 0; c < this._stack.length && b < a; c++) {
            var d = this._stack[c],
                f = !0;
            k.forEach(function (a) {
                a.test(d) && (f = !1)
            }),
            f && (e.debug(d), b++)
        }
    }
}),
define("pilot/useragent", ["require", "exports", "module"], function (a, b, c) {
    var d = (navigator.platform.match(/mac|win|linux/i) || ["other"])[0].toLowerCase(),
        e = navigator.userAgent,
        f = navigator.appVersion;
    b.isWin = d == "win",
    b.isMac = d == "mac",
    b.isLinux = d == "linux",
    b.isIE = !+"1",
    b.isGecko = b.isMozilla = window.controllers && window.navigator.product === "Gecko",
    b.isOldGecko = b.isGecko && /rv\:1/.test(navigator.userAgent),
    b.isOpera = window.opera && Object.prototype.toString.call(window.opera) == "[object Opera]",
    b.isWebKit = parseFloat(e.split("WebKit/")[1]) || undefined,
    b.isAIR = e.indexOf("AdobeAIR") >= 0,
    b.isIPad = e.indexOf("iPad") >= 0,
    b.OS = {
        LINUX: "LINUX",
        MAC: "MAC",
        WINDOWS: "WINDOWS"
    },
    b.getOS = function () {
        return b.isMac ? b.OS.MAC : b.isLinux ? b.OS.LINUX : b.OS.WINDOWS
    }
}),
define("pilot/oop", ["require", "exports", "module"], function (a, b, c) {
    b.inherits = function () {
        var a = function () {};
        return function (b, c) {
            a.prototype = c.prototype,
            b.super_ = c.prototype,
            b.prototype = new a,
            b.prototype.constructor = b
        }
    } (),
    b.mixin = function (a, b) {
        for (var c in b) a[c] = b[c]
    },
    b.implement = function (a, c) {
        b.mixin(a, c)
    }
}),
define("pilot/keys", ["require", "exports", "module", "pilot/oop"], function (a, b, c) {
    var d = a("pilot/oop"),
        e = function () {
        var a = {
            MODIFIER_KEYS: {
                16: "Shift",
                17: "Ctrl",
                18: "Alt",
                224: "Meta"
            },
            KEY_MODS: {
                ctrl: 1,
                alt: 2,
                option: 2,
                shift: 4,
                meta: 8,
                command: 8
            },
            FUNCTION_KEYS: {
                8: "Backspace",
                9: "Tab",
                13: "Return",
                19: "Pause",
                27: "Esc",
                32: "Space",
                33: "PageUp",
                34: "PageDown",
                35: "End",
                36: "Home",
                37: "Left",
                38: "Up",
                39: "Right",
                40: "Down",
                44: "Print",
                45: "Insert",
                46: "Delete",
                112: "F1",
                113: "F2",
                114: "F3",
                115: "F4",
                116: "F5",
                117: "F6",
                118: "F7",
                119: "F8",
                120: "F9",
                121: "F10",
                122: "F11",
                123: "F12",
                144: "Numlock",
                145: "Scrolllock"
            },
            PRINTABLE_KEYS: {
                32: " ",
                48: "0",
                49: "1",
                50: "2",
                51: "3",
                52: "4",
                53: "5",
                54: "6",
                55: "7",
                56: "8",
                57: "9",
                59: ";",
                61: "=",
                65: "a",
                66: "b",
                67: "c",
                68: "d",
                69: "e",
                70: "f",
                71: "g",
                72: "h",
                73: "i",
                74: "j",
                75: "k",
                76: "l",
                77: "m",
                78: "n",
                79: "o",
                80: "p",
                81: "q",
                82: "r",
                83: "s",
                84: "t",
                85: "u",
                86: "v",
                87: "w",
                88: "x",
                89: "y",
                90: "z",
                107: "+",
                109: "-",
                110: ".",
                188: ",",
                190: ".",
                191: "/",
                192: "`",
                219: "[",
                220: "\\",
                221: "]",
                222: '"'
            }
        };
        for (i in a.FUNCTION_KEYS) {
            var b = a.FUNCTION_KEYS[i].toUpperCase();
            a[b] = parseInt(i, 10)
        }
        d.mixin(a, a.MODIFIER_KEYS),
        d.mixin(a, a.PRINTABLE_KEYS),
        d.mixin(a, a.FUNCTION_KEYS);
        return a
    } ();
    d.mixin(b, e),
    b.keyCodeToString = function (a) {
        return (e[a] || String.fromCharCode(a)).toLowerCase()
    }
}),
define("pilot/event_emitter", ["require", "exports", "module"], function (a, b, c) {
    var d = {};
    d._emit = d._dispatchEvent = function (a, b) {
        this._eventRegistry = this._eventRegistry || {};
        var c = this._eventRegistry[a];
        if (c && c.length) {
            var b = b || {};
            b.type = a;
            for (var d = 0; d < c.length; d++) c[d](b)
        }
    },
    d.on = d.addEventListener = function (a, b) {
        this._eventRegistry = this._eventRegistry || {};
        var c = this._eventRegistry[a];
        if (!c) var c = this._eventRegistry[a] = [];
        c.indexOf(b) == -1 && c.push(b)
    },
    d.removeListener = d.removeEventListener = function (a, b) {
        this._eventRegistry = this._eventRegistry || {};
        var c = this._eventRegistry[a];
        if (c) {
            var d = c.indexOf(b);
            d !== -1 && c.splice(d, 1)
        }
    },
    d.removeAllListeners = function (a) {
        this._eventRegistry && (this._eventRegistry[a] = [])
    },
    b.EventEmitter = d
}),
define("pilot/typecheck", ["require", "exports", "module"], function (a, b, c) {
    var d = Object.prototype.toString;
    b.isString = function (a) {
        return a && d.call(a) === "[object String]"
    },
    b.isBoolean = function (a) {
        return a && d.call(a) === "[object Boolean]"
    },
    b.isNumber = function (a) {
        return a && d.call(a) === "[object Number]" && isFinite(a)
    },
    b.isObject = function (a) {
        return a !== undefined && (a === null || typeof a == "object" || Array.isArray(a) || b.isFunction(a))
    },
    b.isFunction = function (a) {
        return a && d.call(a) === "[object Function]"
    }
}),
define("pilot/catalog", ["require", "exports", "module"], function (a, b, c) {
    var d = {};
    b.addExtensionSpec = function (a) {
        d[a.name] = a
    },
    b.removeExtensionSpec = function (a) {
        typeof a === "string" ? delete d[a] : delete d[a.name]
    },
    b.getExtensionSpec = function (a) {
        return d[a]
    },
    b.getExtensionSpecs = function () {
        return Object.keys(d)
    }
}),
define("pilot/lang", ["require", "exports", "module"], function (a, b, c) {
    b.stringReverse = function (a) {
        return a.split("").reverse().join("")
    },
    b.stringRepeat = function (a, b) {
        return Array(b + 1).join(a)
    };
    var d = /^\s\s*/,
        e = /\s\s*$/;
    b.stringTrimLeft = function (a) {
        return a.replace(d, "")
    },
    b.stringTrimRight = function (a) {
        return a.replace(e, "")
    },
    b.copyObject = function (a) {
        var b = {};
        for (var c in a) b[c] = a[c];
        return b
    },
    b.arrayToMap = function (a) {
        var b = {};
        for (var c = 0; c < a.length; c++) b[a[c]] = 1;
        return b
    },
    b.arrayRemove = function (a, b) {
        for (var c = 0; c <= a.length; c++) b === a[c] && a.splice(c, 1)
    },
    b.escapeRegExp = function (a) {
        return a.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1")
    },
    b.deferredCall = function (a) {
        var b = null,
            c = function () {
            b = null,
            a()
        },
            d = function (a) {
            b || (b = setTimeout(c, a || 0));
            return d
        };
        d.schedule = d,
        d.call = function () {
            this.cancel(),
            a();
            return d
        },
        d.cancel = function () {
            clearTimeout(b),
            b = null;
            return d
        };
        return d
    }
}),
define("pilot/types/settings", ["require", "exports", "module", "pilot/types/basic", "pilot/types", "pilot/settings"], function (a, b, c) {
    var d = a("pilot/types/basic").SelectionType,
        e = a("pilot/types/basic").DeferredType,
        f = a("pilot/types"),
        g = a("pilot/settings").settings,
        h, i = new d({
        name: "setting",
        data: function () {
            return k.settings.getSettingNames()
        },
        stringify: function (a) {
            h = a;
            return a.name
        },
        fromString: function (a) {
            h = g.getSetting(a);
            return h
        },
        noMatch: function () {
            h = null
        }
    }),
        j = new e({
        name: "settingValue",
        defer: function () {
            return h ? h.type : f.getType("text")
        },
        getDefault: function () {
            var a = this.parse("");
            if (h) {
                var b = h.get();
                if (a.predictions.length === 0) a.predictions.push(b);
                else {
                    var c = !1;
                    while (!0) {
                        var d = a.predictions.indexOf(b);
                        if (d === -1) break;
                        a.predictions.splice(d, 1),
                        c = !0
                    }
                    c && a.predictions.push(b)
                }
            }
            return a
        }
    }),
        k;
    b.startup = function (a, b) {
        k = a.env,
        f.registerType(i),
        f.registerType(j)
    },
    b.shutdown = function (a, b) {
        f.unregisterType(i),
        f.unregisterType(j)
    }
}),
define("pilot/settings", ["require", "exports", "module", "pilot/console", "pilot/oop", "pilot/types", "pilot/event_emitter", "pilot/catalog"], function (a, b, c) {
    function n() {}

    function k(a) {
        this._deactivated = {},
        this._settings = {},
        this._settingNames = [],
        a && this.setPersister(a)
    }

    function j(a, b) {
        this._settings = b,
        Object.keys(a).forEach(function (b) {
            this[b] = a[b]
        },
        this),
        this.type = f.getType(this.type);
        if (this.type == null) throw new Error("In " + this.name + ": can't find type for: " + JSON.stringify(a.type));
        if (!this.name) throw new Error("Setting.name == undefined. Ignoring.", this);
        if (!this.defaultValue === undefined) throw new Error("Setting.defaultValue == undefined", this);
        this.onChange && this.on("change", this.onChange.bind(this)),
        this.set(this.defaultValue)
    }
    var d = a("pilot/console"),
        e = a("pilot/oop"),
        f = a("pilot/types"),
        g = a("pilot/event_emitter").EventEmitter,
        h = a("pilot/catalog"),
        i = {
        name: "setting",
        description: "A setting is something that the application offers as a way to customize how it works",
        register: "env.settings.addSetting",
        indexOn: "name"
    };
    b.startup = function (a, b) {
        h.addExtensionSpec(i)
    },
    b.shutdown = function (a, b) {
        h.removeExtensionSpec(i)
    },
    j.prototype = {
        get: function () {
            return this.value
        },
        set: function (a) {
            this.value !== a && (this.value = a, this._settings.persister && this._settings.persister.persistValue(this._settings, this.name, a), this._dispatchEvent("change", {
                setting: this,
                value: a
            }))
        },
        resetValue: function () {
            this.set(this.defaultValue)
        }
    },
    e.implement(j.prototype, g),
    k.prototype = {
        addSetting: function (a) {
            var b = new j(a, this);
            this._settings[b.name] = b,
            this._settingNames.push(b.name),
            this._settingNames.sort()
        },
        addSettings: function l(a) {
            Object.keys(a).forEach(function (b) {
                var c = a[b];
                "name" in c || (c.name = b),
                this.addSetting(c)
            },
            this)
        },
        removeSetting: function (a) {
            var b = typeof a === "string" ? a : a.name;
            a = this._settings[b],
            delete this._settings[b],
            util.arrayRemove(this._settingNames, b),
            settings.removeAllListeners("change")
        },
        removeSettings: function m(a) {
            Object.keys(a).forEach(function (b) {
                var c = a[b];
                "name" in c || (c.name = b),
                this.removeSettings(c)
            },
            this)
        },
        getSettingNames: function () {
            return this._settingNames
        },
        getSetting: function (a) {
            return this._settings[a]
        },
        setPersister: function (a) {
            this._persister = a,
            a && a.loadInitialValues(this)
        },
        resetAll: function () {
            this.getSettingNames().forEach(function (a) {
                this.resetValue(a)
            },
            this)
        },
        _list: function () {
            var a = [];
            this.getSettingNames().forEach(function (b) {
                a.push({
                    key: b,
                    value: this.getSetting(b).get()
                })
            },
            this);
            return a
        },
        _loadDefaultValues: function () {
            this._loadFromObject(this._getDefaultValues())
        },
        _loadFromObject: function (a) {
            for (var b in a) if (a.hasOwnProperty(b)) {
                var c = this._settings[b];
                if (c) {
                    var d = c.type.parse(a[b]);
                    this.set(b, d)
                } else this.set(b, a[b])
            }
        },
        _saveToObject: function () {
            return this.getSettingNames().map(function (a) {
                return this._settings[a].type.stringify(this.get(a))
            }.bind(this))
        },
        _getDefaultValues: function () {
            return this.getSettingNames().map(function (a) {
                return this._settings[a].spec.defaultValue
            }.bind(this))
        }
    },
    b.settings = new k,
    n.prototype = {
        loadInitialValues: function (a) {
            a._loadDefaultValues();
            var b = cookie.get("settings");
            a._loadFromObject(JSON.parse(b))
        },
        persistValue: function (a, b, c) {
            try {
                var e = JSON.stringify(a._saveToObject());
                cookie.set("settings", e)
            } catch(f) {
                d.error("Unable to JSONify the settings! " + f);
                return
            }
        }
    },
    b.CookiePersister = n
}),
define("pilot/commands/settings", ["require", "exports", "module", "pilot/canon"], function (a, b, c) {
    var d = {
        name: "set",
        params: [{
            name: "setting",
            type: "setting",
            description: "The name of the setting to display or alter",
            defaultValue: null
        },
        {
            name: "value",
            type: "settingValue",
            description: "The new value for the chosen setting",
            defaultValue: null
        }],
        description: "define and show settings",
        exec: function (a, b, c) {
            var d;
            if (b.setting) b.value === undefined ? d = "<strong>" + setting.name + "</strong> = " + setting.get() : (b.setting.set(b.value), d = "Setting: <strong>" + b.setting.name + "</strong> = " + b.setting.get());
            else {
                var e = a.settings.getSettingNames();
                d = "",
                e.sort(function (a, b) {
                    return a.localeCompare(b)
                }),
                e.forEach(function (b) {
                    var c = a.settings.getSetting(b),
                        e = "https://wiki.mozilla.org/Labs/Skywriter/Settings#" + c.name;
                    d += '<a class="setting" href="' + e + '" title="View external documentation on setting: ' + c.name + '" target="_blank">' + c.name + "</a> = " + c.value + "<br/>"
                })
            }
            c.done(d)
        }
    },
        e = {
        name: "unset",
        params: [{
            name: "setting",
            type: "setting",
            description: "The name of the setting to return to defaults"
        }],
        description: "unset a setting entirely",
        exec: function (a, b, c) {
            var d = a.settings.get(b.setting);
            d ? (d.reset(), c.done("Reset " + d.name + " to default: " + a.settings.get(b.setting))) : c.doneWithError("No setting with the name <strong>" + b.setting + "</strong>.")
        }
    },
        f = a("pilot/canon");
    b.startup = function (a, b) {
        f.addCommand(d),
        f.addCommand(e)
    },
    b.shutdown = function (a, b) {
        f.removeCommand(d),
        f.removeCommand(e)
    }
}),
define("pilot/commands/basic", ["require", "exports", "module", "pilot/typecheck", "pilot/canon"], function (require, exports, module) {
    var checks = require("pilot/typecheck"),
        canon = require("pilot/canon"),
        helpMessages = {
        plainPrefix: '<h2>Welcome to Skywriter - Code in the Cloud</h2><ul><li><a href="http://labs.mozilla.com/projects/skywriter" target="_blank">Home Page</a></li><li><a href="https://wiki.mozilla.org/Labs/Skywriter" target="_blank">Wiki</a></li><li><a href="https://wiki.mozilla.org/Labs/Skywriter/UserGuide" target="_blank">User Guide</a></li><li><a href="https://wiki.mozilla.org/Labs/Skywriter/Tips" target="_blank">Tips and Tricks</a></li><li><a href="https://wiki.mozilla.org/Labs/Skywriter/FAQ" target="_blank">FAQ</a></li><li><a href="https://wiki.mozilla.org/Labs/Skywriter/DeveloperGuide" target="_blank">Developers Guide</a></li></ul>',
        plainSuffix: 'For more information, see the <a href="https://wiki.mozilla.org/Labs/Skywriter">Skywriter Wiki</a>.'
    },
        helpCommandSpec = {
        name: "help",
        params: [{
            name: "search",
            type: "text",
            description: "Search string to narrow the output.",
            defaultValue: null
        }],
        description: "Get help on the available commands.",
        exec: function (a, b, c) {
            var d = [],
                e = canon.getCommand(b.search);
            if (e && e.exec) d.push(e.description ? e.description : "No description for " + b.search);
            else {
                var f = !1; ! b.search && helpMessages.plainPrefix && d.push(helpMessages.plainPrefix),
                e ? (d.push("<h2>Sub-Commands of " + e.name + "</h2>"), d.push("<p>" + e.description + "</p>")) : b.search ? (b.search == "hidden" && (b.search = "", f = !0), d.push("<h2>Commands starting with '" + b.search + "':</h2>")) : d.push("<h2>Available Commands:</h2>");
                var g = canon.getCommandNames();
                g.sort(),
                d.push("<table>");
                for (var h = 0; h < g.length; h++) {
                    e = canon.getCommand(g[h]);
                    if (!f && e.hidden) continue;
                    if (e.description === undefined) continue;
                    if (b.search && e.name.indexOf(b.search) !== 0) continue;
                    if (!b.search && e.name.indexOf(" ") != -1) continue;
                    if (e && e.name == b.search) continue;
                    d.push("<tr>"),
                    d.push('<th class="right">' + e.name + "</th>"),
                    d.push("<td>" + e.description + "</td>"),
                    d.push("</tr>")
                }
                d.push("</table>"),
                !b.search && helpMessages.plainSuffix && d.push(helpMessages.plainSuffix)
            }
            c.done(d.join(""))
        }
    },
        evalCommandSpec = {
        name: "eval",
        params: [{
            name: "javascript",
            type: "text",
            description: "The JavaScript to evaluate"
        }],
        description: "evals given js code and show the result",
        hidden: !0,
        exec: function (env, args, request) {
            var result, javascript = args.javascript;
            try {
                result = eval(javascript)
            } catch(e) {
                result = "<b>Error: " + e.message + "</b>"
            }
            var msg = "",
                type = "",
                x;
            if (checks.isFunction(result)) msg = (result + "").replace(/\n/g, "<br>").replace(/ /g, "&#160"),
            type = "function";
            else if (checks.isObject(result)) {
                Array.isArray(result) ? type = "array" : type = "object";
                var items = [],
                    value;
                for (x in result) result.hasOwnProperty(x) && (checks.isFunction(result[x]) ? value = "[function]" : checks.isObject(result[x]) ? value = "[object]" : value = result[x], items.push({
                    name: x,
                    value: value
                }));
                items.sort(function (a, b) {
                    return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
                });
                for (x = 0; x < items.length; x++) msg += "<b>" + items[x].name + "</b>: " + items[x].value + "<br>"
            } else msg = result,
            type = typeof result;
            request.done("Result for eval <b>'" + javascript + "'</b> (type: " + type + "): <br><br>" + msg)
        }
    },
        versionCommandSpec = {
        name: "version",
        description: "show the Skywriter version",
        hidden: !0,
        exec: function (a, b, c) {
            var d = "Skywriter " + skywriter.versionNumber + " (" + skywriter.versionCodename + ")";
            c.done(d)
        }
    },
        skywriterCommandSpec = {
        name: "skywriter",
        hidden: !0,
        exec: function (a, b, c) {
            var d = Math.floor(Math.random() * messages.length);
            c.done("Skywriter " + messages[d])
        }
    },
        messages = ["really wants you to trick it out in some way.", "is your Web editor.", "would love to be like Emacs on the Web.", "is written on the Web platform, so you can tweak it."],
        canon = require("pilot/canon");
    exports.startup = function (a, b) {
        canon.addCommand(helpCommandSpec),
        canon.addCommand(evalCommandSpec),
        canon.addCommand(skywriterCommandSpec)
    },
    exports.shutdown = function (a, b) {
        canon.removeCommand(helpCommandSpec),
        canon.removeCommand(evalCommandSpec),
        canon.removeCommand(skywriterCommandSpec)
    }
}),
define("pilot/settings/canon", ["require", "exports", "module"], function (a, b, c) {
    var d = {
        name: "historyLength",
        description: "How many typed commands do we recall for reference?",
        type: "number",
        defaultValue: 50
    };
    b.startup = function (a, b) {
        a.env.settings.addSetting(d)
    },
    b.shutdown = function (a, b) {
        a.env.settings.removeSetting(d)
    }
}),
define("pilot/plugin_manager", ["require", "exports", "module", "pilot/promise"], function (a, b, c) {
    var d = a("pilot/promise").Promise;
    b.REASONS = {
        APP_STARTUP: 1,
        APP_SHUTDOWN: 2,
        PLUGIN_ENABLE: 3,
        PLUGIN_DISABLE: 4,
        PLUGIN_INSTALL: 5,
        PLUGIN_UNINSTALL: 6,
        PLUGIN_UPGRADE: 7,
        PLUGIN_DOWNGRADE: 8
    },
    b.Plugin = function (a) {
        this.name = a,
        this.status = this.INSTALLED
    },
    b.Plugin.prototype = {
        NEW: 0,
        INSTALLED: 1,
        REGISTERED: 2,
        STARTED: 3,
        UNREGISTERED: 4,
        SHUTDOWN: 5,
        install: function (b, c) {
            var e = new d;
            if (this.status > this.NEW) {
                e.resolve(this);
                return e
            }
            a([this.name], function (a) {
                a.install && a.install(b, c),
                this.status = this.INSTALLED,
                e.resolve(this)
            }.bind(this));
            return e
        },
        register: function (b, c) {
            var e = new d;
            if (this.status != this.INSTALLED) {
                e.resolve(this);
                return e
            }
            a([this.name], function (a) {
                a.register && a.register(b, c),
                this.status = this.REGISTERED,
                e.resolve(this)
            }.bind(this));
            return e
        },
        startup: function (c, e) {
            e = e || b.REASONS.APP_STARTUP;
            var f = new d;
            if (this.status != this.REGISTERED) {
                f.resolve(this);
                return f
            }
            a([this.name], function (a) {
                a.startup && a.startup(c, e),
                this.status = this.STARTED,
                f.resolve(this)
            }.bind(this));
            return f
        },
        shutdown: function (b, c) {
            this.status == this.STARTED && (pluginModule = a(this.name), pluginModule.shutdown && pluginModule.shutdown(b, c))
        }
    },
    b.PluginCatalog = function () {
        this.plugins = {}
    },
    b.PluginCatalog.prototype = {
        registerPlugins: function (a, c, e) {
            var f = [];
            a.forEach(function (a) {
                var d = this.plugins[a];
                d === undefined && (d = new b.Plugin(a), this.plugins[a] = d, f.push(d.register(c, e)))
            }.bind(this));
            return d.group(f)
        },
        startupPlugins: function (a, b) {
            var c = [];
            for (var e in this.plugins) {
                var f = this.plugins[e];
                c.push(f.startup(a, b))
            }
            return d.group(c)
        }
    },
    b.catalog = new b.PluginCatalog
}),
define("pilot/promise", ["require", "exports", "module", "pilot/console", "pilot/stacktrace"], function (a, b, c) {
    var d = a("pilot/console"),
        e = a("pilot/stacktrace").Trace,
        f = -1,
        g = 0,
        h = 1,
        i = 0,
        j = !1,
        k = [],
        l = [];
    Promise = function () {
        this._status = g,
        this._value = undefined,
        this._onSuccessHandlers = [],
        this._onErrorHandlers = [],
        this._id = i++,
        k[this._id] = this
    },
    Promise.prototype.isPromise = !0,
    Promise.prototype.isComplete = function () {
        return this._status != g
    },
    Promise.prototype.isResolved = function () {
        return this._status == h
    },
    Promise.prototype.isRejected = function () {
        return this._status == f
    },
    Promise.prototype.then = function (a, b) {
        typeof a === "function" && (this._status === h ? a.call(null, this._value) : this._status === g && this._onSuccessHandlers.push(a)),
        typeof b === "function" && (this._status === f ? b.call(null, this._value) : this._status === g && this._onErrorHandlers.push(b));
        return this
    },
    Promise.prototype.chainPromise = function (a) {
        var b = new Promise;
        b._chainedFrom = this,
        this.then(function (c) {
            try {
                b.resolve(a(c))
            } catch(d) {
                b.reject(d)
            }
        },
        function (a) {
            b.reject(a)
        });
        return b
    },
    Promise.prototype.resolve = function (a) {
        return this._complete(this._onSuccessHandlers, h, a, "resolve")
    },
    Promise.prototype.reject = function (a) {
        return this._complete(this._onErrorHandlers, f, a, "reject")
    },
    Promise.prototype._complete = function (a, b, c, f) {
        if (this._status != g) {
            d.group("Promise already closed"),
            d.error("Attempted " + f + "() with ", c),
            d.error("Previous status = ", this._status, ", previous value = ", this._value),
            d.trace(),
            this._completeTrace && (d.error("Trace of previous completion:"), this._completeTrace.log(5)),
            d.groupEnd();
            return this
        }
        j && (this._completeTrace = new e(new Error)),
        this._status = b,
        this._value = c,
        a.forEach(function (a) {
            a.call(null, this._value)
        },
        this),
        this._onSuccessHandlers.length = 0,
        this._onErrorHandlers.length = 0,
        delete k[this._id],
        l.push(this);
        while (l.length > 20) l.shift();
        return this
    },
    Promise.group = function (a) {
        a instanceof Array || (a = Array.prototype.slice.call(arguments));
        if (a.length === 0) return (new Promise).resolve([]);
        var b = new Promise,
            c = [],
            d = 0,
            e = function (e) {
            return function (g) {
                c[e] = g,
                d++,
                b._status !== f && (d === a.length && b.resolve(c))
            }
        };
        a.forEach(function (a, c) {
            var d = e(c),
                f = b.reject.bind(b);
            a.then(d, f)
        });
        return b
    },
    b.Promise = Promise,
    b._outstanding = k,
    b._recent = l
}),
define("pilot/environment", ["require", "exports", "module", "pilot/settings"], function (a, b, c) {
    function e() {
        return {
            settings: d
        }
    }
    var d = a("pilot/settings").settings;
    b.create = e
}),
define("ace/editor", ["require", "exports", "module", "pilot/fixoldbrowsers", "pilot/oop", "pilot/event", "pilot/lang", "pilot/useragent", "ace/keyboard/textinput", "ace/mouse_handler", "ace/keyboard/keybinding", "ace/edit_session", "ace/search", "ace/background_tokenizer", "ace/range", "pilot/event_emitter"], function (a, b, c) {
    a("pilot/fixoldbrowsers");
    var d = a("pilot/oop"),
        e = a("pilot/event"),
        f = a("pilot/lang"),
        g = a("pilot/useragent"),
        h = a("ace/keyboard/textinput").TextInput,
        i = a("ace/mouse_handler").MouseHandler,
        j = a("ace/keyboard/keybinding").KeyBinding,
        k = a("ace/edit_session").EditSession,
        l = a("ace/search").Search,
        m = a("ace/background_tokenizer").BackgroundTokenizer,
        n = a("ace/range").Range,
        o = a("pilot/event_emitter").EventEmitter,
        p = function (a, b) {
        var c = a.getContainerElement();
        this.container = c,
        this.renderer = a,
        this.textInput = new h(a.getTextAreaContainer(), this),
        this.keyBinding = new j(this),
        g.isIPad || (this.$mouseHandler = new i(this)),
        this.$blockScrolling = 0,
        this.$search = (new l).set({
            wrap: !0
        }),
        this.setSession(b || new k(""))
    };
    (function () {
        d.implement(this, o),
        this.$forwardEvents = {
            gutterclick: 1,
            gutterdblclick: 1
        },
        this.$originalAddEventListener = this.addEventListener,
        this.$originalRemoveEventListener = this.removeEventListener,
        this.addEventListener = function (a, b) {
            return this.$forwardEvents[a] ? this.renderer.addEventListener(a, b) : this.$originalAddEventListener(a, b)
        },
        this.removeEventListener = function (a, b) {
            return this.$forwardEvents[a] ? this.renderer.removeEventListener(a, b) : this.$originalRemoveEventListener(a, b)
        },
        this.setKeyboardHandler = function (a) {
            this.keyBinding.setKeyboardHandler(a)
        },
        this.getKeyboardHandler = function () {
            return this.keyBinding.getKeyboardHandler()
        },
        this.setSession = function (a) {
            if (this.session != a) {
                if (this.session) {
                    var b = this.session;
                    this.session.removeEventListener("change", this.$onDocumentChange),
                    this.session.removeEventListener("changeMode", this.$onChangeMode),
                    this.session.removeEventListener("changeTabSize", this.$onChangeTabSize),
                    this.session.removeEventListener("changeWrapLimit", this.$onChangeWrapLimit),
                    this.session.removeEventListener("changeWrapMode", this.$onChangeWrapMode),
                    this.session.removeEventListener("changeFrontMarker", this.$onChangeFrontMarker),
                    this.session.removeEventListener("changeBackMarker", this.$onChangeBackMarker),
                    this.session.removeEventListener("changeBreakpoint", this.$onChangeBreakpoint),
                    this.session.removeEventListener("changeAnnotation", this.$onChangeAnnotation),
                    this.session.removeEventListener("changeOverwrite", this.$onCursorChange);
                    var c = this.session.getSelection();
                    c.removeEventListener("changeCursor", this.$onCursorChange),
                    c.removeEventListener("changeSelection", this.$onSelectionChange),
                    this.session.setScrollTopRow(this.renderer.getScrollTopRow())
                }
                this.session = a,
                this.$onDocumentChange = this.onDocumentChange.bind(this),
                a.addEventListener("change", this.$onDocumentChange),
                this.renderer.setSession(a),
                this.$onChangeMode = this.onChangeMode.bind(this),
                a.addEventListener("changeMode", this.$onChangeMode),
                this.$onChangeTabSize = this.renderer.updateText.bind(this.renderer),
                a.addEventListener("changeTabSize", this.$onChangeTabSize),
                this.$onChangeWrapLimit = this.onChangeWrapLimit.bind(this),
                a.addEventListener("changeWrapLimit", this.$onChangeWrapLimit),
                this.$onChangeWrapMode = this.onChangeWrapMode.bind(this),
                a.addEventListener("changeWrapMode", this.$onChangeWrapMode),
                this.$onChangeFrontMarker = this.onChangeFrontMarker.bind(this),
                this.session.addEventListener("changeFrontMarker", this.$onChangeFrontMarker),
                this.$onChangeBackMarker = this.onChangeBackMarker.bind(this),
                this.session.addEventListener("changeBackMarker", this.$onChangeBackMarker),
                this.$onChangeBreakpoint = this.onChangeBreakpoint.bind(this),
                this.session.addEventListener("changeBreakpoint", this.$onChangeBreakpoint),
                this.$onChangeAnnotation = this.onChangeAnnotation.bind(this),
                this.session.addEventListener("changeAnnotation", this.$onChangeAnnotation),
                this.$onCursorChange = this.onCursorChange.bind(this),
                this.session.addEventListener("changeOverwrite", this.$onCursorChange),
                this.selection = a.getSelection(),
                this.selection.addEventListener("changeCursor", this.$onCursorChange),
                this.$onSelectionChange = this.onSelectionChange.bind(this),
                this.selection.addEventListener("changeSelection", this.$onSelectionChange),
                this.onChangeMode(),
                this.bgTokenizer.setDocument(a.getDocument()),
                this.bgTokenizer.start(0),
                this.onCursorChange(),
                this.onSelectionChange(),
                this.onChangeFrontMarker(),
                this.onChangeBackMarker(),
                this.onChangeBreakpoint(),
                this.onChangeAnnotation(),
                this.renderer.scrollToRow(a.getScrollTopRow()),
                this.renderer.updateFull(),
                this._dispatchEvent("changeSession", {
                    session: a,
                    oldSession: b
                })
            }
        },
        this.getSession = function () {
            return this.session
        },
        this.getSelection = function () {
            return this.selection
        },
        this.resize = function () {
            this.renderer.onResize()
        },
        this.setTheme = function (a) {
            this.renderer.setTheme(a)
        },
        this.setStyle = function (a) {
            this.renderer.setStyle(a)
        },
        this.unsetStyle = function (a) {
            this.renderer.unsetStyle(a)
        },
        this.$highlightBrackets = function () {
            this.session.$bracketHighlight && (this.session.removeMarker(this.session.$bracketHighlight), this.session.$bracketHighlight = null);
            if (!this.$highlightPending) {
                var a = this;
                this.$highlightPending = !0,
                setTimeout(function () {
                    a.$highlightPending = !1;
                    var b = a.session.findMatchingBracket(a.getCursorPosition());
                    if (b) {
                        var c = new n(b.row, b.column, b.row, b.column + 1);
                        a.session.$bracketHighlight = a.session.addMarker(c, "ace_bracket")
                    }
                },
                10)
            }
        },
        this.focus = function () {
            var a = this;
            g.isIE || setTimeout(function () {
                a.textInput.focus()
            }),
            this.textInput.focus()
        },
        this.blur = function () {
            this.textInput.blur()
        },
        this.onFocus = function () {
            this.renderer.showCursor(),
            this.renderer.visualizeFocus(),
            this._dispatchEvent("focus")
        },
        this.onBlur = function () {
            this.renderer.hideCursor(),
            this.renderer.visualizeBlur(),
            this._dispatchEvent("blur")
        },
        this.onDocumentChange = function (a) {
            var b = a.data,
                c = b.range;
            this.bgTokenizer.start(c.start.row);
            if (c.start.row == c.end.row && b.action != "insertLines" && b.action != "removeLines") var d = c.end.row;
            else d = Infinity;
            this.renderer.updateLines(c.start.row, d),
            this.renderer.updateCursor()
        },
        this.onTokenizerUpdate = function (a) {
            var b = a.data;
            this.renderer.updateLines(b.first, b.last)
        },
        this.onCursorChange = function (a) {
            this.renderer.updateCursor(),
            this.$blockScrolling || this.renderer.scrollCursorIntoView(),
            this.renderer.moveTextAreaToCursor(this.textInput.getElement()),
            this.$highlightBrackets(),
            this.$updateHighlightActiveLine(),
						this.$suggestionBoxUpdate()
        },
				this.$suggestionBoxUpdate = function () {
						var a = this.getSession();
						var b = this.getCursorPosition();
						/* Siyavula Code */
						document.getElementById("suggestion_box").value = "";
						var dict = {		'dot':'dot([center_x,center_y], type, label, position, angle)', 
														'arrowhead':'arrowhead([x1,y1],[x2,y2])',
														'text':'text([x,y],string,position,angle)',
														'axes':'axes(dx, dy,"labels" || [xpos,xneg,ypos,yneg,zeropos],gdx,gdy,[xunits,yunits])',
														'grid':'grid(dx,dy)',
														'rect':'rect([x1,y1],[x2,y2],radius_corner_x,radius_corner_y)',
														'path':'path(list)',
														'plot':'plot(func,xmin,xmax,points)',
														'curve':'curve(list)',
														'bunnyhop':'bunnyhop(list)',
														'smoothcurve':'smoothcurve(list)',
														'petal':'petal([x,y],[xdir,ydir])',
														'heart':'heart([x,y],size)',
														'slopefield':'slopefield(func,dx,dy)',
														'line':'line([x1,y1],[x2,y2])',
														'ellipse':'ellipse(center,xradius,yradius)',
														'circle':'circle(center,radius)',
														'arc':'arc(start,end,radius)',
														'setBorder':'setBorder(size, color)',
														'initPicture':'initPicture(xmin,xmax,ymin,ymax)',
														'start_group':'start_group([center_x,center_y], rotate_angle, [scale_x,scale_y], [translate_x,translate_y])',
														'angle_arc':'angle_arc([center_x,center_y], radius, start_deg, stop_deg)',
														'stop_group':'stop_group()'
											};
						var line;
						line = this.session.getLine(b.row);
						for (keys in dict)
						{
							if (line.indexOf(keys) > -1)
							{
								document.getElementById("suggestion_box").value = dict[keys];
							}
						}
				},
        this.$updateHighlightActiveLine = function () {
            var a = this.getSession();
            a.$highlightLineMarker && a.removeMarker(a.$highlightLineMarker),
            a.$highlightLineMarker = null;
            if (this.getHighlightActiveLine() && (this.getSelectionStyle() != "line" || !this.selection.isMultiLine())) {
                var b = this.getCursorPosition(),
                    c = new n(b.row, 0, b.row + 1, 0);
                a.$highlightLineMarker = a.addMarker(c, "ace_active_line", "line")
            }
        },
        this.onSelectionChange = function (a) {
            var b = this.getSession();
            b.$selectionMarker && b.removeMarker(b.$selectionMarker),
            b.$selectionMarker = null;
            if (!this.selection.isEmpty()) {
                var c = this.selection.getRange(),
                    d = this.getSelectionStyle();
                b.$selectionMarker = b.addMarker(c, "ace_selection", d)
            }
            this.onCursorChange(a),
            this.$highlightSelectedWord && this.mode.highlightSelection(this)
        },
        this.onChangeFrontMarker = function () {
            this.renderer.updateFrontMarkers()
        },
        this.onChangeBackMarker = function () {
            this.renderer.updateBackMarkers()
        },
        this.onChangeBreakpoint = function () {
            this.renderer.setBreakpoints(this.session.getBreakpoints())
        },
        this.onChangeAnnotation = function () {
            this.renderer.setAnnotations(this.session.getAnnotations())
        },
        this.onChangeMode = function () {
            var a = this.session.getMode();
            if (this.mode != a) {
                this.mode = a;
                var b = a.getTokenizer();
                if (this.bgTokenizer) this.bgTokenizer.setTokenizer(b);
                else {
                    var c = this.onTokenizerUpdate.bind(this);
                    this.bgTokenizer = new m(b, this),
                    this.bgTokenizer.addEventListener("update", c)
                }
                this.renderer.setTokenizer(this.bgTokenizer)
            }
        },
        this.onChangeWrapLimit = function () {
            this.renderer.updateFull()
        },
        this.onChangeWrapMode = function () {
            this.renderer.onResize(!0)
        },
        this.getCopyText = function () {
            return this.selection.isEmpty() ? "" : this.session.getTextRange(this.getSelectionRange())
        },
        this.onCut = function () {
            this.$readOnly || (this.selection.isEmpty() || (this.session.remove(this.getSelectionRange()), this.clearSelection()))
        },
        this.insert = function (a) {
            if (!this.$readOnly) {
                var b = this.getCursorPosition();
                a = a.replace("\t", this.session.getTabString());
                if (this.selection.isEmpty()) {
                    if (this.session.getOverwrite()) {
                        var c = new n.fromPoints(b, b);
                        c.end.column += a.length,
                        this.session.remove(c)
                    }
                } else {
                    var b = this.session.remove(this.getSelectionRange());
                    this.clearSelection()
                }
                this.clearSelection();
                var d = this.bgTokenizer.getState(b.row),
                    e = this.mode.checkOutdent(d, this.session.getLine(b.row), a),
                    f = this.session.getLine(b.row),
                    g = this.mode.getNextLineIndent(d, f.slice(0, b.column), this.session.getTabString()),
                    h = this.session.insert(b, a),
                    d = this.bgTokenizer.getState(b.row);
                if (this.session.getDocument().isNewLine(a)) {
                    this.moveCursorTo(b.row + 1, 0);
                    var i = this.session.getTabSize(),
                        j = Number.MAX_VALUE;
                    for (var k = b.row + 1; k <= h.row; ++k) {
                        var l = 0;
                        f = this.session.getLine(k);
                        for (var m = 0; m < f.length; ++m) if (f.charAt(m) == "\t") l += i;
                        else if (f.charAt(m) == " ") l += 1;
                        else break;
                        /[^\s]/.test(f) && (j = Math.min(l, j))
                    }
                    for (var k = b.row + 1; k <= h.row; ++k) {
                        var o = j;
                        f = this.session.getLine(k);
                        for (var m = 0; m < f.length && o > 0; ++m) f.charAt(m) == "\t" ? o -= i : f.charAt(m) == " " && (o -= 1);
                        this.session.remove(new n(k, 0, k, m))
                    }
                    this.session.indentRows(b.row + 1, h.row, g)
                } else e && this.mode.autoOutdent(d, this.session, b.row)
            }
        },
        this.onTextInput = function (a) {
            this.keyBinding.onTextInput(a)
        },
        this.onCommandKey = function (a, b, c) {
            this.keyBinding.onCommandKey(a, b, c)
        },
        this.setOverwrite = function (a) {
            this.session.setOverwrite()
        },
        this.getOverwrite = function () {
            return this.session.getOverwrite()
        },
        this.toggleOverwrite = function () {
            this.session.toggleOverwrite()
        },
        this.setScrollSpeed = function (a) {
            this.$mouseHandler.setScrollSpeed(a)
        },
        this.getScrollSpeed = function () {
            return this.$mouseHandler.getScrollSpeed()
        },
        this.$selectionStyle = "line",
        this.setSelectionStyle = function (a) {
            this.$selectionStyle != a && (this.$selectionStyle = a, this.onSelectionChange(), this._dispatchEvent("changeSelectionStyle", {
                data: a
            }))
        },
        this.getSelectionStyle = function () {
            return this.$selectionStyle
        },
        this.$highlightActiveLine = !0,
        this.setHighlightActiveLine = function (a) {
            this.$highlightActiveLine != a && (this.$highlightActiveLine = a, this.$updateHighlightActiveLine())
        },
        this.getHighlightActiveLine = function () {
            return this.$highlightActiveLine
        },
        this.$highlightSelectedWord = !0,
        this.setHighlightSelectedWord = function (a) {
            this.$highlightSelectedWord != a && (this.$highlightSelectedWord = a, a ? this.mode.highlightSelection(this) : this.mode.clearSelectionHighlight(this))
        },
        this.getHighlightSelectedWord = function () {
            return this.$highlightSelectedWord
        },
        this.setShowInvisibles = function (a) {
            this.getShowInvisibles() != a && this.renderer.setShowInvisibles(a)
        },
        this.getShowInvisibles = function () {
            return this.renderer.getShowInvisibles()
        },
        this.setShowPrintMargin = function (a) {
            this.renderer.setShowPrintMargin(a)
        },
        this.getShowPrintMargin = function () {
            return this.renderer.getShowPrintMargin()
        },
        this.setPrintMarginColumn = function (a) {
            this.renderer.setPrintMarginColumn(a)
        },
        this.getPrintMarginColumn = function () {
            return this.renderer.getPrintMarginColumn()
        },
        this.$readOnly = !1,
        this.setReadOnly = function (a) {
            this.$readOnly = a
        },
        this.getReadOnly = function () {
            return this.$readOnly
        },
        this.removeRight = function () {
            this.$readOnly || (this.selection.isEmpty() && this.selection.selectRight(), this.session.remove(this.getSelectionRange()), this.clearSelection())
        },
        this.removeLeft = function () {
            this.$readOnly || (this.selection.isEmpty() && this.selection.selectLeft(), this.session.remove(this.getSelectionRange()), this.clearSelection())
        },
        this.removeWordRight = function () {
            this.$readOnly || (this.selection.isEmpty() && this.selection.selectWordRight(), this.session.remove(this.getSelectionRange()), this.clearSelection())
        },
        this.removeWordLeft = function () {
            this.$readOnly || (this.selection.isEmpty() && this.selection.selectWordLeft(), this.session.remove(this.getSelectionRange()), this.clearSelection())
        },
        this.removeToLineStart = function () {
            this.$readOnly || (this.selection.isEmpty() && this.selection.selectLineStart(), this.session.remove(this.getSelectionRange()), this.clearSelection())
        },
        this.removeToLineEnd = function () {
            this.$readOnly || (this.selection.isEmpty() && this.selection.selectLineEnd(), this.session.remove(this.getSelectionRange()), this.clearSelection())
        },
        this.splitLine = function () {
            if (!this.$readOnly) {
                this.selection.isEmpty() || (this.session.remove(this.getSelectionRange()), this.clearSelection());
                var a = this.getCursorPosition();
                this.insert("\n"),
                this.moveCursorToPosition(a)
            }
        },
        this.transposeLetters = function () {
            if (!this.$readOnly) {
                if (!this.selection.isEmpty()) return;
                var a = this.getCursorPosition(),
                    b = a.column;
                if (b == 0) return;
                var c = this.session.getLine(a.row);
                if (b < c.length) var d = c.charAt(b) + c.charAt(b - 1),
                    e = new n(a.row, b - 1, a.row, b + 1);
                else var d = c.charAt(b - 1) + c.charAt(b - 2),
                    e = new n(a.row, b - 2, a.row, b);
                this.session.replace(e, d)
            }
        },
        this.indent = function () {
            if (!this.$readOnly) {
                var a = this.session,
                    b = this.getSelectionRange();
                if (b.start.row >= b.end.row && b.start.column >= b.end.column) {
                    var d;
                    if (this.session.getUseSoftTabs()) {
                        var e = a.getTabSize(),
                            g = this.getCursorPosition(),
                            h = a.documentToScreenColumn(g.row, g.column),
                            i = e - h % e;
                        d = f.stringRepeat(" ", i)
                    } else d = "\t";
                    return this.onTextInput(d)
                }
                var c = this.$getSelectedRows();
                a.indentRows(c.first, c.last, "\t")
            }
        },
        this.blockOutdent = function () {
            if (!this.$readOnly) {
                var a = this.session.getSelection();
                this.session.outdentRows(a.getRange())
            }
        },
        this.toggleCommentLines = function () {
            if (!this.$readOnly) {
                var a = this.bgTokenizer.getState(this.getCursorPosition().row),
                    b = this.$getSelectedRows();
                this.mode.toggleCommentLines(a, this.session, b.first, b.last)
            }
        },
        this.removeLines = function () {
            if (!this.$readOnly) {
                var a = this.$getSelectedRows();
                this.session.remove(new n(a.first, 0, a.last + 1, 0)),
                this.clearSelection()
            }
        },
        this.moveLinesDown = function () {
            this.$readOnly || this.$moveLines(function (a, b) {
                return this.session.moveLinesDown(a, b)
            })
        },
        this.moveLinesUp = function () {
            this.$readOnly || this.$moveLines(function (a, b) {
                return this.session.moveLinesUp(a, b)
            })
        },
        this.moveText = function (a, b) {
            if (this.$readOnly) return null;
            return this.session.moveText(a, b)
        },
        this.copyLinesUp = function () {
            this.$readOnly || this.$moveLines(function (a, b) {
                this.session.duplicateLines(a, b);
                return 0
            })
        },
        this.copyLinesDown = function () {
            this.$readOnly || this.$moveLines(function (a, b) {
                return this.session.duplicateLines(a, b)
            })
        },
        this.$moveLines = function (a) {
            var b = this.$getSelectedRows(),
                c = a.call(this, b.first, b.last),
                d = this.selection;
            d.setSelectionAnchor(b.last + c + 1, 0),
            d.$moveSelection(function () {
                d.moveCursorTo(b.first + c, 0)
            })
        },
        this.$getSelectedRows = function () {
            var a = this.getSelectionRange().collapseRows();
            return {
                first: a.start.row,
                last: a.end.row
            }
        },
        this.onCompositionStart = function (a) {
            this.renderer.showComposition(this.getCursorPosition())
        },
        this.onCompositionUpdate = function (a) {
            this.renderer.setCompositionText(a)
        },
        this.onCompositionEnd = function () {
            this.renderer.hideComposition()
        },
        this.getFirstVisibleRow = function () {
            return this.renderer.getFirstVisibleRow()
        },
        this.getLastVisibleRow = function () {
            return this.renderer.getLastVisibleRow()
        },
        this.isRowVisible = function (a) {
            return a >= this.getFirstVisibleRow() && a <= this.getLastVisibleRow()
        },
        this.$getVisibleRowCount = function () {
            return this.renderer.getScrollBottomRow() - this.renderer.getScrollTopRow() + 1
        },
        this.$getPageDownRow = function () {
            return this.renderer.getScrollBottomRow()
        },
        this.$getPageUpRow = function () {
            var a = this.renderer.getScrollTopRow(),
                b = this.renderer.getScrollBottomRow();
            return a - (b - a)
        },
        this.selectPageDown = function () {
            var a = this.$getPageDownRow() + Math.floor(this.$getVisibleRowCount() / 2);
            this.scrollPageDown();
            var b = this.getSelection(),
                c = this.session.documentToScreenPosition(b.getSelectionLead()),
                d = this.session.screenToDocumentPosition(a, c.column);
            b.selectTo(d.row, d.column)
        },
        this.selectPageUp = function () {
            var a = this.renderer.getScrollTopRow() - this.renderer.getScrollBottomRow(),
                b = this.$getPageUpRow() + Math.round(a / 2);
            this.scrollPageUp();
            var c = this.getSelection(),
                d = this.session.documentToScreenPosition(c.getSelectionLead()),
                e = this.session.screenToDocumentPosition(b, d.column);
            c.selectTo(e.row, e.column)
        },
        this.gotoPageDown = function () {
            var a = this.$getPageDownRow(),
                b = this.getCursorPositionScreen().column;
            this.scrollToRow(a),
            this.getSelection().moveCursorToScreen(a, b)
        },
        this.gotoPageUp = function () {
            var a = this.$getPageUpRow(),
                b = this.getCursorPositionScreen().column;
            this.scrollToRow(a),
            this.getSelection().moveCursorToScreen(a, b)
        },
        this.scrollPageDown = function () {
            this.scrollToRow(this.$getPageDownRow())
        },
        this.scrollPageUp = function () {
            this.renderer.scrollToRow(this.$getPageUpRow())
        },
        this.scrollToRow = function (a) {
            this.renderer.scrollToRow(a)
        },
        this.scrollToLine = function (a, b) {
            this.renderer.scrollToLine(a, b)
        },
        this.centerSelection = function () {
            var a = this.getSelectionRange(),
                b = Math.floor(a.start.row + (a.end.row - a.start.row) / 2);
            this.renderer.scrollToLine(b, !0)
        },
        this.getCursorPosition = function () {
            return this.selection.getCursor()
        },
        this.getCursorPositionScreen = function () {
            return this.session.documentToScreenPosition(this.getCursorPosition())
        },
        this.getSelectionRange = function () {
            return this.selection.getRange()
        },
        this.selectAll = function () {
            this.$blockScrolling += 1,
            this.selection.selectAll(),
            this.$blockScrolling -= 1
        },
        this.clearSelection = function () {
            this.selection.clearSelection()
        },
        this.moveCursorTo = function (a, b) {
            this.selection.moveCursorTo(a, b)
        },
        this.moveCursorToPosition = function (a) {
            this.selection.moveCursorToPosition(a)
        },
        this.gotoLine = function (a, b) {
            this.selection.clearSelection(),
            this.$blockScrolling += 1,
            this.moveCursorTo(a - 1, b || 0),
            this.$blockScrolling -= 1,
            this.isRowVisible(this.getCursorPosition().row) || this.scrollToLine(a, !0)
        },
        this.navigateTo = function (a, b) {
            this.clearSelection(),
            this.moveCursorTo(a, b)
        },
        this.navigateUp = function (a) {
            this.selection.clearSelection(),
            a = a || 1,
            this.selection.moveCursorBy(-a, 0)
        },
        this.navigateDown = function (a) {
            this.selection.clearSelection(),
            a = a || 1,
            this.selection.moveCursorBy(a, 0)
        },
        this.navigateLeft = function (a) {
            if (this.selection.isEmpty()) {
                a = a || 1;
                while (a--) this.selection.moveCursorLeft()
            } else {
                var b = this.getSelectionRange().start;
                this.moveCursorToPosition(b)
            }
            this.clearSelection()
        },
        this.navigateRight = function (a) {
            if (this.selection.isEmpty()) {
                a = a || 1;
                while (a--) this.selection.moveCursorRight()
            } else {
                var b = this.getSelectionRange().end;
                this.moveCursorToPosition(b)
            }
            this.clearSelection()
        },
        this.navigateLineStart = function () {
            this.selection.moveCursorLineStart(),
            this.clearSelection()
        },
        this.navigateLineEnd = function () {
            this.selection.moveCursorLineEnd(),
            this.clearSelection()
        },
        this.navigateFileEnd = function () {
            this.selection.moveCursorFileEnd(),
            this.clearSelection()
        },
        this.navigateFileStart = function () {
            this.selection.moveCursorFileStart(),
            this.clearSelection()
        },
        this.navigateWordRight = function () {
            this.selection.moveCursorWordRight(),
            this.clearSelection()
        },
        this.navigateWordLeft = function () {
            this.selection.moveCursorWordLeft(),
            this.clearSelection()
        },
        this.replace = function (a, b) {
            b && this.$search.set(b);
            var c = this.$search.find(this.session);
            this.$tryReplace(c, a),
            c !== null && this.selection.setSelectionRange(c)
        },
        this.replaceAll = function (a, b) {
            b && this.$search.set(b);
            var c = this.$search.findAll(this.session);
            if (c.length) {
                var d = this.getSelectionRange();
                this.clearSelection(),
                this.selection.moveCursorTo(0, 0),
                this.$blockScrolling += 1;
                for (var e = c.length - 1; e >= 0; --e) this.$tryReplace(c[e], a);
                this.selection.setSelectionRange(d),
                this.$blockScrolling -= 1
            }
        },
        this.$tryReplace = function (a, b) {
            var c = this.session.getTextRange(a),
                b = this.$search.replace(c, b);
            if (b !== null) {
                a.end = this.session.replace(a, b);
                return a
            }
            return null
        },
        this.getLastSearchOptions = function () {
            return this.$search.getOptions()
        },
        this.find = function (a, b) {
            this.clearSelection(),
            b = b || {},
            b.needle = a,
            this.$search.set(b),
            this.$find()
        },
        this.findNext = function (a) {
            a = a || {},
            typeof a.backwards == "undefined" && (a.backwards = !1),
            this.$search.set(a),
            this.$find()
        },
        this.findPrevious = function (a) {
            a = a || {},
            typeof a.backwards == "undefined" && (a.backwards = !0),
            this.$search.set(a),
            this.$find()
        },
        this.$find = function (a) {
            this.selection.isEmpty() || this.$search.set({
                needle: this.session.getTextRange(this.getSelectionRange())
            }),
            typeof a != "undefined" && this.$search.set({
                backwards: a
            });
            var b = this.$search.find(this.session);
            b && (this.gotoLine(b.end.row + 1, b.end.column), this.selection.setSelectionRange(b))
        },
        this.undo = function () {
            this.session.getUndoManager().undo()
        },
        this.redo = function () {
            this.session.getUndoManager().redo()
        }
    }).call(p.prototype),
    b.Editor = p
}),
define("pilot/event", ["require", "exports", "module", "pilot/keys", "pilot/useragent", "pilot/dom"], function (a, b, c) {
    function g(a, b, c) {
        var f = 0;
        e.isOpera && e.isMac ? f = 0 | (b.metaKey ? 1 : 0) | (b.altKey ? 2 : 0) | (b.shiftKey ? 4 : 0) | (b.ctrlKey ? 8 : 0) : f = 0 | (b.ctrlKey ? 1 : 0) | (b.altKey ? 2 : 0) | (b.shiftKey ? 4 : 0) | (b.metaKey ? 8 : 0);
        if (c in d.MODIFIER_KEYS) {
            switch (d.MODIFIER_KEYS[c]) {
            case "Alt":
                f = 2;
                break;
            case "Shift":
                f = 4;
                break;
            case "Ctrl":
                f = 1;
                break;
            default:
                f = 8
            }
            c = 0
        }
        f & 8 && (c == 91 || c == 93) && (c = 0);
        if (f == 0 && !(c in d.FUNCTION_KEYS)) return !1;
        return a(b, f, c)
    }
    var d = a("pilot/keys"),
        e = a("pilot/useragent"),
        f = a("pilot/dom");
    b.addListener = function (a, b, c) {
        if (a.addEventListener) return a.addEventListener(b, c, !1);
        if (a.attachEvent) {
            var d = function () {
                c(window.event)
            };
            c._wrapper = d,
            a.attachEvent("on" + b, d)
        }
    },
    b.removeListener = function (a, b, c) {
        if (a.removeEventListener) return a.removeEventListener(b, c, !1);
        a.detachEvent && a.detachEvent("on" + b, c._wrapper || c)
    },
    b.stopEvent = function (a) {
        b.stopPropagation(a),
        b.preventDefault(a);
        return !1
    },
    b.stopPropagation = function (a) {
        a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
    },
    b.preventDefault = function (a) {
        a.preventDefault ? a.preventDefault() : a.returnValue = !1
    },
    b.getDocumentX = function (a) {
        return a.clientX ? a.clientX + f.getPageScrollLeft() : a.pageX
    },
    b.getDocumentY = function (a) {
        return a.clientY ? a.clientY + f.getPageScrollTop() : a.pageY
    },
    b.getButton = function (a) {
        if (a.type == "dblclick") return 0;
        if (a.type == "contextmenu") return 2;
        return a.preventDefault ? a.button : ({
            1: 0,
            2: 2,
            4: 1
        })[a.button]
    },
    document.documentElement.setCapture ? b.capture = function (a, c, d) {
        function f(e) {
            c && c(e),
            d && d(),
            b.removeListener(a, "mousemove", c),
            b.removeListener(a, "mouseup", f),
            b.removeListener(a, "losecapture", f),
            a.releaseCapture()
        }

        function e(a) {
            c(a);
            return b.stopPropagation(a)
        }
        b.addListener(a, "mousemove", c),
        b.addListener(a, "mouseup", f),
        b.addListener(a, "losecapture", f),
        a.setCapture()
    } : b.capture = function (a, b, c) {
        function e(a) {
            b && b(a),
            c && c(),
            document.removeEventListener("mousemove", d, !0),
            document.removeEventListener("mouseup", e, !0),
            a.stopPropagation()
        }

        function d(a) {
            b(a),
            a.stopPropagation()
        }
        document.addEventListener("mousemove", d, !0),
        document.addEventListener("mouseup", e, !0)
    },
    b.addMouseWheelListener = function (a, c) {
        var d = function (a) {
            a.wheelDelta !== undefined ? a.wheelDeltaX !== undefined ? (a.wheelX = -a.wheelDeltaX / 8, a.wheelY = -a.wheelDeltaY / 8) : (a.wheelX = 0, a.wheelY = -a.wheelDelta / 8) : a.axis && a.axis == a.HORIZONTAL_AXIS ? (a.wheelX = (a.detail || 0) * 5, a.wheelY = 0) : (a.wheelX = 0, a.wheelY = (a.detail || 0) * 5),
            c(a)
        };
        b.addListener(a, "DOMMouseScroll", d),
        b.addListener(a, "mousewheel", d)
    },
    b.addMultiMouseDownListener = function (a, c, d, f, g) {
        var h = 0,
            i, j, k = function (a) {
            h += 1,
            h == 1 && (i = a.clientX, j = a.clientY, setTimeout(function () {
                h = 0
            },
            f || 600));
            if (b.getButton(a) != c || Math.abs(a.clientX - i) > 5 || Math.abs(a.clientY - j) > 5) h = 0;
            h == d && (h = 0, g(a));
            return b.preventDefault(a)
        };
        b.addListener(a, "mousedown", k),
        e.isIE && b.addListener(a, "dblclick", k)
    },
    b.addCommandKeyListener = function (a, c) {
        var d = b.addListener;
        if (e.isOldGecko) {
            var f = null;
            d(a, "keydown", function (a) {
                f = a.keyCode
            }),
            d(a, "keypress", function (a) {
                return g(c, a, f)
            })
        } else {
            var h = null;
            d(a, "keydown", function (a) {
                h = a.keyIdentifier || a.keyCode;
                return g(c, a, a.keyCode)
            }),
            e.isMac && e.isOpera && d(a, "keypress", function (a) {
                var b = a.keyIdentifier || a.keyCode;
                if (h !== b) return g(c, a, a.keyCode);
                h = null
            })
        }
    }
}),
define("pilot/dom", ["require", "exports", "module"], function (a, b, c) {
    var d = "http://www.w3.org/1999/xhtml";
    b.createElement = function (a, b) {
        return document.createElementNS ? document.createElementNS(b || d, a) : document.createElement(a)
    },
    b.setText = function (a, b) {
        a.innerText !== undefined && (a.innerText = b),
        a.textContent !== undefined && (a.textContent = b)
    },
    document.documentElement.classList ? (b.hasCssClass = function (a, b) {
        return a.classList.contains(b)
    },
    b.addCssClass = function (a, b) {
        a.classList.add(b)
    },
    b.removeCssClass = function (a, b) {
        a.classList.remove(b)
    },
    b.toggleCssClass = function (a, b) {
        return a.classList.toggle(b)
    }) : (b.hasCssClass = function (a, b) {
        var c = a.className.split(/\s+/g);
        return c.indexOf(b) !== -1
    },
    b.addCssClass = function (a, c) {
        b.hasCssClass(a, c) || (a.className += " " + c)
    },
    b.removeCssClass = function (a, b) {
        var c = a.className.split(/\s+/g);
        while (!0) {
            var d = c.indexOf(b);
            if (d == -1) break;
            c.splice(d, 1)
        }
        a.className = c.join(" ")
    },
    b.toggleCssClass = function (a, b) {
        var c = a.className.split(/\s+/g),
            d = !0;
        while (!0) {
            var e = c.indexOf(b);
            if (e == -1) break;
            d = !1,
            c.splice(e, 1)
        }
        d && c.push(b),
        a.className = c.join(" ");
        return d
    }),
    b.setCssClass = function (a, c, d) {
        d ? b.addCssClass(a, c) : b.removeCssClass(a, c)
    },
    b.importCssString = function (a, b) {
        b = b || document;
        if (b.createStyleSheet) {
            var c = b.createStyleSheet();
            c.cssText = a
        } else {
            var e = b.createElementNS ? b.createElementNS(d, "style") : b.createElement("style");
            e.appendChild(b.createTextNode(a));
            var f = b.getElementsByTagName("head")[0] || b.documentElement;
            f.appendChild(e)
        }
    },
    b.getInnerWidth = function (a) {
        return parseInt(b.computedStyle(a, "paddingLeft")) + parseInt(b.computedStyle(a, "paddingRight")) + a.clientWidth
    },
    b.getInnerHeight = function (a) {
        return parseInt(b.computedStyle(a, "paddingTop")) + parseInt(b.computedStyle(a, "paddingBottom")) + a.clientHeight
    },
    window.pageYOffset !== undefined ? (b.getPageScrollTop = function () {
        return window.pageYOffset
    },
    b.getPageScrollLeft = function () {
        return window.pageXOffset
    }) : (b.getPageScrollTop = function () {
        return document.body.scrollTop
    },
    b.getPageScrollLeft = function () {
        return document.body.scrollLeft
    }),
    b.computedStyle = function (a, b) {
        return window.getComputedStyle ? (window.getComputedStyle(a, "") || {})[b] || "" : a.currentStyle[b]
    },
    b.scrollbarWidth = function () {
        var a = b.createElement("p");
        a.style.width = "100%",
        a.style.height = "200px";
        var c = b.createElement("div"),
            d = c.style;
        d.position = "absolute",
        d.left = "-10000px",
        d.overflow = "hidden",
        d.width = "200px",
        d.height = "150px",
        c.appendChild(a);
        var e = document.body || document.documentElement;
        e.appendChild(c);
        var f = a.offsetWidth;
        d.overflow = "scroll";
        var g = a.offsetWidth;
        f == g && (g = c.clientWidth),
        e.removeChild(c);
        return f - g
    },
    b.setInnerHtml = function (a, b) {
        var c = a.cloneNode(!1);
        c.innerHTML = b,
        a.parentNode.replaceChild(c, a);
        return c
    },
    b.setInnerText = function (a, b) {
        document.body && "textContent" in document.body ? a.textContent = b : a.innerText = b
    },
    b.getInnerText = function (a) {
        return document.body && "textContent" in document.body ? a.textContent : a.innerText || a.textContent || ""
    },
    b.getParentWindow = function (a) {
        return a.defaultView || a.parentWindow
    },
    b.getSelectionStart = function (a) {
        var b;
        try {
            b = a.selectionStart || 0
        } catch(c) {
            b = 0
        }
        return b
    },
    b.setSelectionStart = function (a, b) {
        return a.selectionStart = b
    },
    b.getSelectionEnd = function (a) {
        var b;
        try {
            b = a.selectionEnd || 0
        } catch(c) {
            b = 0
        }
        return b
    },
    b.setSelectionEnd = function (a, b) {
        return a.selectionEnd = b
    }
}),
define("ace/keyboard/textinput", ["require", "exports", "module", "pilot/event", "pilot/useragent", "pilot/dom"], function (a, b, c) {
    var d = a("pilot/event"),
        e = a("pilot/useragent"),
        f = a("pilot/dom"),
        g = function (a, b) {
        function k(a) {
            if (!i) {
                var d = a || c.value;
                d && (d.charCodeAt(d.length - 1) == g.charCodeAt(0) ? (d = d.slice(0, -1), d && b.onTextInput(d)) : b.onTextInput(d))
            }
            i = !1,
            c.value = g,
            c.select()
        }
        var c = f.createElement("textarea");
        c.style.left = "-10000px",
        a.appendChild(c);
        var g = String.fromCharCode(0);
        k();
        var h = !1,
            i = !1,
            j = "",
            l = function (a) {
            (!e.isIE || c.value.charCodeAt(0) <= 128) && setTimeout(function () {
                h || k()
            },
            0)
        },
            m = function (a) {
            h = !0,
            e.isIE || (k(), c.value = ""),
            b.onCompositionStart(),
            e.isGecko || setTimeout(n, 0)
        },
            n = function () {
            h && b.onCompositionUpdate(c.value)
        },
            o = function () {
            h = !1,
            b.onCompositionEnd(),
            setTimeout(function () {
                k()
            },
            0)
        },
            p = function (a) {
            i = !0;
            var d = b.getCopyText();
            d ? c.value = d : a.preventDefault(),
            c.select(),
            setTimeout(function () {
                k()
            },
            0)
        },
            q = function (a) {
            i = !0;
            var d = b.getCopyText();
            d ? (c.value = d, b.onCut()) : a.preventDefault(),
            c.select(),
            setTimeout(function () {
                k()
            },
            0)
        };
        d.addCommandKeyListener(c, b.onCommandKey.bind(b)),
        d.addListener(c, "keypress", l);
        if (e.isIE) {
            var r = {
                13: 1,
                27: 1
            };
            d.addListener(c, "keyup", function (a) {
                h && (!c.value || r[a.keyCode]) && setTimeout(o, 0);
                (c.value.charCodeAt(0) | 0) >= 129 && (h ? n() : m())
            })
        }
        d.addListener(c, "textInput", l),
        d.addListener(c, "paste", function (a) {
            a.clipboardData && a.clipboardData.getData ? (k(a.clipboardData.getData("text/plain")), a.preventDefault()) : l()
        }),
        e.isIE || d.addListener(c, "propertychange", l),
        e.isIE ? (d.addListener(c, "beforecopy", function (a) {
            var c = b.getCopyText();
            c ? clipboardData.setData("Text", c) : a.preventDefault()
        }), d.addListener(a, "keydown", function (a) {
            if (a.ctrlKey && a.keyCode == 88) {
                var c = b.getCopyText();
                c && (clipboardData.setData("Text", c), b.onCut()),
                d.preventDefault(a)
            }
        })) : (d.addListener(c, "copy", p), d.addListener(c, "cut", q)),
        d.addListener(c, "compositionstart", m),
        e.isGecko && d.addListener(c, "text", n),
        e.isWebKit && d.addListener(c, "keyup", n),
        d.addListener(c, "compositionend", o),
        d.addListener(c, "blur", function () {
            b.onBlur()
        }),
        d.addListener(c, "focus", function () {
            b.onFocus(),
            c.select()
        }),
        this.focus = function () {
            b.onFocus(),
            c.select(),
            c.focus()
        },
        this.blur = function () {
            c.blur()
        },
        this.getElement = function () {
            return c
        },
        this.onContextMenu = function (a, b) {
            a && (j || (j = c.style.cssText), c.style.cssText = "position:fixed; z-index:1000;left:" + (a.x - 2) + "px; top:" + (a.y - 2) + "px;"),
            b && (c.value = "")
        },
        this.onContextMenuClose = function () {
            setTimeout(function () {
                j && (c.style.cssText = j, j = ""),
                k()
            },
            0)
        }
    };
    b.TextInput = g
}),
define("ace/mouse_handler", ["require", "exports", "module", "pilot/event", "pilot/dom"], function (a, b, c) {
    var d = a("pilot/event"),
        e = a("pilot/dom"),
        f = 0,
        g = 1,
        h = 2,
        i = 250,
        j = 5,
        k = function (a) {
        this.editor = a,
        d.addListener(a.container, "mousedown", function (b) {
            a.focus();
            return d.preventDefault(b)
        }),
        d.addListener(a.container, "selectstart", function (a) {
            return d.preventDefault(a)
        });
        var b = a.renderer.getMouseEventTarget();
        d.addListener(b, "mousedown", this.onMouseDown.bind(this)),
        d.addMultiMouseDownListener(b, 0, 2, 500, this.onMouseDoubleClick.bind(this)),
        d.addMultiMouseDownListener(b, 0, 3, 600, this.onMouseTripleClick.bind(this)),
        d.addMultiMouseDownListener(b, 0, 4, 600, this.onMouseQuadClick.bind(this)),
        d.addMouseWheelListener(b, this.onMouseWheel.bind(this))
    };
    (function () {
        this.$scrollSpeed = 1,
        this.setScrollSpeed = function (a) {
            this.$scrollSpeed = a
        },
        this.getScrollSpeed = function () {
            return this.$scrollSpeed
        },
        this.$getEventPosition = function (a) {
            var b = d.getDocumentX(a),
                c = d.getDocumentY(a),
                e = this.editor.renderer.screenToTextCoordinates(b, c);
            e.row = Math.max(0, Math.min(e.row, this.editor.session.getLength() - 1));
            return e
        },
        this.$distance = function (a, b, c, d) {
            return Math.sqrt(Math.pow(c - a, 2) + Math.pow(d - b, 2))
        },
        this.onMouseDown = function (a) {
            function C(b) {
                a.shiftKey ? l.selection.selectToPosition(b) : m.$clickSelection || (l.moveCursorToPosition(b), l.selection.clearSelection(b.row, b.column)),
                p = g
            }
            var b = d.getDocumentX(a),
                c = d.getDocumentY(a),
                k = this.$getEventPosition(a),
                l = this.editor,
                m = this,
                n = l.getSelectionRange(),
                o = n.isEmpty(),
                p = f,
                q = !1,
                r = d.getButton(a);
            if (r !== 0) o && l.moveCursorToPosition(k),
            r == 2 && (l.textInput.onContextMenu({
                x: b,
                y: c
            },
            o), d.capture(l.container, function () {},
            l.textInput.onContextMenuClose));
            else {
                q = !l.getReadOnly() && !o && n.contains(k.row, k.column),
                q || C(k),
                l.renderer.scrollCursorIntoView();
                var s, t, u = l.getOverwrite(),
                    v = (new Date).getTime(),
                    w, x, y = function (a) {
                    s = d.getDocumentX(a),
                    t = d.getDocumentY(a)
                },
                    z = function () {
                    clearInterval(F),
                    p == f ? C(k) : p == h && A(),
                    m.$clickSelection = null,
                    p = f
                },
                    A = function () {
                    e.removeCssClass(l.container, "ace_dragging"),
                    l.session.removeMarker(dragSelectionMarker),
                    m.$clickSelection || (w || (l.moveCursorToPosition(k), l.selection.clearSelection(k.row, k.column)));
                    if (w) {
                        if (x.contains(w.row, w.column)) {
                            w = null;
                            return
                        }
                        l.clearSelection();
                        var a = l.moveText(x, w);
                        if (!a) {
                            w = null;
                            return
                        }
                        l.selection.setSelectionRange(a)
                    }
                },
                    B = function () {
                    if (s !== undefined && t !== undefined) {
                        if (p == f) {
                            var a = m.$distance(b, c, s, t),
                                d = (new Date).getTime();
                            if (a > j) {
                                p = g;
                                var k = l.renderer.screenToTextCoordinates(s, t);
                                k.row = Math.max(0, Math.min(k.row, l.session.getLength() - 1)),
                                C(k)
                            } else if (d - v > i) {
                                p = h,
                                x = l.getSelectionRange();
                                var n = l.getSelectionStyle();
                                dragSelectionMarker = l.session.addMarker(x, "ace_selection", n),
                                l.clearSelection(),
                                e.addCssClass(l.container, "ace_dragging")
                            }
                        }
                        p == h ? E() : p == g && D()
                    }
                },
                    D = function () {
                    var a = l.renderer.screenToTextCoordinates(s, t);
                    a.row = Math.max(0, Math.min(a.row, l.session.getLength() - 1));
                    if (m.$clickSelection) if (m.$clickSelection.contains(a.row, a.column)) l.selection.setSelectionRange(m.$clickSelection);
                    else {
                        if (m.$clickSelection.compare(a.row, a.column) == -1) var b = m.$clickSelection.end;
                        else var b = m.$clickSelection.start;
                        l.selection.setSelectionAnchor(b.row, b.column),
                        l.selection.selectToPosition(a)
                    } else l.selection.selectToPosition(a);
                    l.renderer.scrollCursorIntoView()
                },
                    E = function () {
                    w = l.renderer.screenToTextCoordinates(s, t),
                    w.row = Math.max(0, Math.min(w.row, l.session.getLength() - 1)),
                    l.moveCursorToPosition(w)
                };
                d.capture(l.container, y, z);
                var F = setInterval(B, 20);
                return d.preventDefault(a)
            }
        },
        this.onMouseDoubleClick = function (a) {
            var b = this.$getEventPosition(a);
            this.editor.moveCursorToPosition(b),
            this.editor.selection.selectWord(),
            this.$clickSelection = this.editor.getSelectionRange()
        },
        this.onMouseTripleClick = function (a) {
            var b = this.$getEventPosition(a);
            this.editor.moveCursorToPosition(b),
            this.editor.selection.selectLine(),
            this.$clickSelection = this.editor.getSelectionRange()
        },
        this.onMouseQuadClick = function (a) {
            this.editor.selectAll(),
            this.$clickSelection = this.editor.getSelectionRange()
        },
        this.onMouseWheel = function (a) {
            var b = this.$scrollSpeed * 2;
            this.editor.renderer.scrollBy(a.wheelX * b, a.wheelY * b);
            return d.preventDefault(a)
        }
    }).call(k.prototype),
    b.MouseHandler = k
}),
define("ace/keyboard/keybinding", ["require", "exports", "module", "pilot/useragent", "pilot/keys", "pilot/event", "pilot/settings", "pilot/canon", "ace/commands/default_commands"], function (a, b, c) {
    var d = a("pilot/useragent"),
        e = a("pilot/keys"),
        f = a("pilot/event"),
        g = a("pilot/settings").settings,
        h = a("pilot/canon");
    a("ace/commands/default_commands");
    var i = function (a) {
        this.$editor = a,
        this.$data = {},
        this.$keyboardHandler = null
    };
    (function () {
        this.setKeyboardHandler = function (a) {
            this.$keyboardHandler != a && (this.$data = {},
            this.$keyboardHandler = a)
        },
        this.getKeyboardHandler = function () {
            return this.$keyboardHandler
        },
        this.$callKeyboardHandler = function (a, b, c, d) {
            var e = {
                editor: this.$editor
            },
                g;
            this.$keyboardHandler && (g = this.$keyboardHandler.handleKeyboard(this.$data, b, c, d, a));
            if (!g || !g.command) b != 0 || d != 0 ? g = {
                command: h.findKeyCommand(e, "editor", b, c)
            } : g = {
                command: "inserttext",
                args: {
                    text: c
                }
            };
            if (g) {
                var i = h.exec(g.command, e, "editor", g.args);
                if (i) return f.stopEvent(a)
            }
        },
        this.onCommandKey = function (a, b, c) {
            var d = e.keyCodeToString(c);
            this.$callKeyboardHandler(a, b, d, c)
        },
        this.onTextInput = function (a) {
            this.$callKeyboardHandler({},
            0, a, 0)
        }
    }).call(i.prototype),
    b.KeyBinding = i
}),
define("ace/commands/default_commands", ["require", "exports", "module", "pilot/lang", "pilot/canon"], function (a, b, c) {
    function f(a, b) {
        return {
            win: a,
            mac: b,
            sender: "editor"
        }
    }
    var d = a("pilot/lang"),
        e = a("pilot/canon");
    e.addCommand({
        name: "null",
        exec: function (a, b, c) {}
    }),
    e.addCommand({
        name: "selectall",
        bindKey: f("Ctrl-A", "Command-A"),
        exec: function (a, b, c) {
            a.editor.selectAll()
        }
    }),
    e.addCommand({
        name: "removeline",
        bindKey: f("Ctrl-D", "Command-D"),
        exec: function (a, b, c) {
            a.editor.removeLines()
        }
    }),
    e.addCommand({
        name: "gotoline",
        bindKey: f("Ctrl-L", "Command-L"),
        exec: function (a, b, c) {
            var d = parseInt(prompt("Enter line number:"));
            isNaN(d) || a.editor.gotoLine(d)
        }
    }),
    e.addCommand({
        name: "togglecomment",
        bindKey: f("Ctrl-7", "Command-7"),
        exec: function (a, b, c) {
            a.editor.toggleCommentLines()
        }
    }),
    e.addCommand({
        name: "findnext",
        bindKey: f("Ctrl-K", "Command-G"),
        exec: function (a, b, c) {
            a.editor.findNext()
        }
    }),
    e.addCommand({
        name: "findprevious",
        bindKey: f("Ctrl-Shift-K", "Command-Shift-G"),
        exec: function (a, b, c) {
            a.editor.findPrevious()
        }
    }),
    e.addCommand({
        name: "find",
        bindKey: f("Ctrl-F", "Command-F"),
        exec: function (a, b, c) {
            var d = prompt("Find:");
            a.editor.find(d)
        }
    }),
    e.addCommand({
        name: "replace",
        bindKey: f("Ctrl-R", "Command-Option-F"),
        exec: function (a, b, c) {
            var d = prompt("Find:");
            if (d) {
                var e = prompt("Replacement:");
                if (!e) return;
                a.editor.replace(e, {
                    needle: d
                })
            }
        }
    }),
    e.addCommand({
        name: "replaceall",
        bindKey: f("Ctrl-Shift-R", "Command-Shift-Option-F"),
        exec: function (a, b, c) {
            var d = prompt("Find:");
            if (d) {
                var e = prompt("Replacement:");
                if (!e) return;
                a.editor.replaceAll(e, {
                    needle: d
                })
            }
        }
    }),
    e.addCommand({
        name: "undo",
        bindKey: f("Ctrl-Z", "Command-Z"),
        exec: function (a, b, c) {
            a.editor.undo()
        }
    }),
    e.addCommand({
        name: "redo",
        bindKey: f("Ctrl-Shift-Z|Ctrl-Y", "Command-Shift-Z|Command-Y"),
        exec: function (a, b, c) {
            a.editor.redo()
        }
    }),
    e.addCommand({
        name: "overwrite",
        bindKey: f("Insert", "Insert"),
        exec: function (a, b, c) {
            a.editor.toggleOverwrite()
        }
    }),
    e.addCommand({
        name: "copylinesup",
        bindKey: f("Ctrl-Alt-Up", "Command-Option-Up"),
        exec: function (a, b, c) {
            a.editor.copyLinesUp()
        }
    }),
    e.addCommand({
        name: "movelinesup",
        bindKey: f("Alt-Up", "Option-Up"),
        exec: function (a, b, c) {
            a.editor.moveLinesUp()
        }
    }),
    e.addCommand({
        name: "selecttostart",
        bindKey: f("Alt-Shift-Up", "Command-Shift-Up"),
        exec: function (a, b, c) {
            a.editor.getSelection().selectFileStart()
        }
    }),
    e.addCommand({
        name: "gotostart",
        bindKey: f("Ctrl-Home|Ctrl-Up", "Command-Home|Command-Up"),
        exec: function (a, b, c) {
            a.editor.navigateFileStart()
        }
    }),
    e.addCommand({
        name: "selectup",
        bindKey: f("Shift-Up", "Shift-Up"),
        exec: function (a, b, c) {
            a.editor.getSelection().selectUp()
        }
    }),
    e.addCommand({
        name: "golineup",
        bindKey: f("Up", "Up|Ctrl-P"),
        exec: function (a, b, c) {
            a.editor.navigateUp(b.times)
        }
    }),
    e.addCommand({
        name: "copylinesdown",
        bindKey: f("Ctrl-Alt-Down", "Command-Option-Down"),
        exec: function (a, b, c) {
            a.editor.copyLinesDown()
        }
    }),
    e.addCommand({
        name: "movelinesdown",
        bindKey: f("Alt-Down", "Option-Down"),
        exec: function (a, b, c) {
            a.editor.moveLinesDown()
        }
    }),
    e.addCommand({
        name: "selecttoend",
        bindKey: f("Alt-Shift-Down", "Command-Shift-Down"),
        exec: function (a, b, c) {
            a.editor.getSelection().selectFileEnd()
        }
    }),
    e.addCommand({
        name: "gotoend",
        bindKey: f("Ctrl-End|Ctrl-Down", "Command-End|Command-Down"),
        exec: function (a, b, c) {
            a.editor.navigateFileEnd()
        }
    }),
    e.addCommand({
        name: "selectdown",
        bindKey: f("Shift-Down", "Shift-Down"),
        exec: function (a, b, c) {
            a.editor.getSelection().selectDown()
        }
    }),
    e.addCommand({
        name: "golinedown",
        bindKey: f("Down", "Down|Ctrl-N"),
        exec: function (a, b, c) {
            a.editor.navigateDown(b.times)
        }
    }),
    e.addCommand({
        name: "selectwordleft",
        bindKey: f("Ctrl-Shift-Left", "Option-Shift-Left"),
        exec: function (a, b, c) {
            a.editor.getSelection().selectWordLeft()
        }
    }),
    e.addCommand({
        name: "gotowordleft",
        bindKey: f("Ctrl-Left", "Option-Left"),
        exec: function (a, b, c) {
            a.editor.navigateWordLeft()
        }
    }),
    e.addCommand({
        name: "selecttolinestart",
        bindKey: f("Alt-Shift-Left", "Command-Shift-Left"),
        exec: function (a, b, c) {
            a.editor.getSelection().selectLineStart()
        }
    }),
    e.addCommand({
        name: "gotolinestart",
        bindKey: f("Alt-Left|Home", "Command-Left|Home|Ctrl-A"),
        exec: function (a, b, c) {
            a.editor.navigateLineStart()
        }
    }),
    e.addCommand({
        name: "selectleft",
        bindKey: f("Shift-Left", "Shift-Left"),
        exec: function (a, b, c) {
            a.editor.getSelection().selectLeft()
        }
    }),
    e.addCommand({
        name: "gotoleft",
        bindKey: f("Left", "Left|Ctrl-B"),
        exec: function (a, b, c) {
            a.editor.navigateLeft(b.times)
        }
    }),
    e.addCommand({
        name: "selectwordright",
        bindKey: f("Ctrl-Shift-Right", "Option-Shift-Right"),
        exec: function (a, b, c) {
            a.editor.getSelection().selectWordRight()
        }
    }),
    e.addCommand({
        name: "gotowordright",
        bindKey: f("Ctrl-Right", "Option-Right"),
        exec: function (a, b, c) {
            a.editor.navigateWordRight()
        }
    }),
    e.addCommand({
        name: "selecttolineend",
        bindKey: f("Alt-Shift-Right", "Command-Shift-Right"),
        exec: function (a, b, c) {
            a.editor.getSelection().selectLineEnd()
        }
    }),
    e.addCommand({
        name: "gotolineend",
        bindKey: f("Alt-Right|End", "Command-Right|End|Ctrl-E"),
        exec: function (a, b, c) {
            a.editor.navigateLineEnd()
        }
    }),
    e.addCommand({
        name: "selectright",
        bindKey: f("Shift-Right", "Shift-Right"),
        exec: function (a, b, c) {
            a.editor.getSelection().selectRight()
        }
    }),
    e.addCommand({
        name: "gotoright",
        bindKey: f("Right", "Right|Ctrl-F"),
        exec: function (a, b, c) {
            a.editor.navigateRight(b.times)
        }
    }),
    e.addCommand({
        name: "selectpagedown",
        bindKey: f("Shift-PageDown", "Shift-PageDown"),
        exec: function (a, b, c) {
            a.editor.selectPageDown()
        }
    }),
    e.addCommand({
        name: "pagedown",
        bindKey: f(null, "PageDown"),
        exec: function (a, b, c) {
            a.editor.scrollPageDown()
        }
    }),
    e.addCommand({
        name: "gotopagedown",
        bindKey: f("PageDown", "Option-PageDown|Ctrl-V"),
        exec: function (a, b, c) {
            a.editor.gotoPageDown()
        }
    }),
    e.addCommand({
        name: "selectpageup",
        bindKey: f("Shift-PageUp", "Shift-PageUp"),
        exec: function (a, b, c) {
            a.editor.selectPageUp()
        }
    }),
    e.addCommand({
        name: "pageup",
        bindKey: f(null, "PageUp"),
        exec: function (a, b, c) {
            a.editor.scrollPageUp()
        }
    }),
    e.addCommand({
        name: "gotopageup",
        bindKey: f("PageUp", "Option-PageUp"),
        exec: function (a, b, c) {
            a.editor.gotoPageUp()
        }
    }),
    e.addCommand({
        name: "selectlinestart",
        bindKey: f("Shift-Home", "Shift-Home"),
        exec: function (a, b, c) {
            a.editor.getSelection().selectLineStart()
        }
    }),
    e.addCommand({
        name: "selectlineend",
        bindKey: f("Shift-End", "Shift-End"),
        exec: function (a, b, c) {
            a.editor.getSelection().selectLineEnd()
        }
    }),
    e.addCommand({
        name: "del",
        bindKey: f("Delete", "Delete|Ctrl-D"),
        exec: function (a, b, c) {
            a.editor.removeRight()
        }
    }),
    e.addCommand({
        name: "backspace",
        bindKey: f("Ctrl-Backspace|Command-Backspace|Option-Backspace|Shift-Backspace|Backspace", "Ctrl-Backspace|Command-Backspace|Shift-Backspace|Backspace|Ctrl-H"),
        exec: function (a, b, c) {
            a.editor.removeLeft()
        }
    }),
    e.addCommand({
        name: "removetolinestart",
        bindKey: f(null, "Option-Backspace"),
        exec: function (a, b, c) {
            a.editor.removeToLineStart()
        }
    }),
    e.addCommand({
        name: "removetolineend",
        bindKey: f(null, "Ctrl-K"),
        exec: function (a, b, c) {
            a.editor.removeToLineEnd()
        }
    }),
    e.addCommand({
        name: "removewordleft",
        bindKey: f(null, "Alt-Backspace|Ctrl-Alt-Backspace"),
        exec: function (a, b, c) {
            a.editor.removeWordLeft()
        }
    }),
    e.addCommand({
        name: "removewordright",
        bindKey: f(null, "Alt-Delete"),
        exec: function (a, b, c) {
            a.editor.removeWordRight()
        }
    }),
    e.addCommand({
        name: "outdent",
        bindKey: f("Shift-Tab", "Shift-Tab"),
        exec: function (a, b, c) {
            a.editor.blockOutdent()
        }
    }),
    e.addCommand({
        name: "indent",
        bindKey: f("Tab", "Tab"),
        exec: function (a, b, c) {
            a.editor.indent()
        }
    }),
    e.addCommand({
        name: "inserttext",
        exec: function (a, b, c) {
            a.editor.insert(d.stringRepeat(b.text || "", b.times || 1))
        }
    }),
    e.addCommand({
        name: "centerselection",
        bindKey: f(null, "Ctrl-L"),
        exec: function (a, b, c) {
            a.editor.centerSelection()
        }
    }),
    e.addCommand({
        name: "splitline",
        bindKey: f(null, "Ctrl-O"),
        exec: function (a, b, c) {
            a.editor.splitLine()
        }
    }),
    e.addCommand({
        name: "transposeletters",
        bindKey: f("Ctrl-T", "Ctrl-T"),
        exec: function (a, b, c) {
            a.editor.transposeLetters()
        }
    })
}),
define("ace/edit_session", ["require", "exports", "module", "pilot/oop", "pilot/lang", "pilot/event_emitter", "ace/selection", "ace/mode/text", "ace/range", "ace/document"], function (a, b, c) {
    var d = a("pilot/oop"),
        e = a("pilot/lang"),
        f = a("pilot/event_emitter").EventEmitter,
        g = a("ace/selection").Selection,
        h = a("ace/mode/text").Mode,
        j = a("ace/range").Range,
        k = a("ace/document").Document,
        l = function (a, b) {
        this.$modified = !0,
        this.$breakpoints = [],
        this.$frontMarkers = {},
        this.$backMarkers = {},
        this.$markerId = 1,
        this.$wrapData = [],
        a instanceof k ? this.setDocument(a) : this.setDocument(new k(a)),
        this.selection = new g(this),
        b && this.setMode(b)
    };
    (function () {
        function m(a) {
            return a >= 4352 && a <= 4447 || a >= 4515 && a <= 4519 || a >= 4602 && a <= 4607 || a >= 9001 && a <= 9002 || a >= 11904 && a <= 11929 || a >= 11931 && a <= 12019 || a >= 12032 && a <= 12245 || a >= 12272 && a <= 12283 || a >= 12288 && a <= 12350 || a >= 12353 && a <= 12438 || a >= 12441 && a <= 12543 || a >= 12549 && a <= 12589 || a >= 12593 && a <= 12686 || a >= 12688 && a <= 12730 || a >= 12736 && a <= 12771 || a >= 12784 && a <= 12830 || a >= 12832 && a <= 12871 || a >= 12880 && a <= 13054 || a >= 13056 && a <= 19903 || a >= 19968 && a <= 42124 || a >= 42128 && a <= 42182 || a >= 43360 && a <= 43388 || a >= 44032 && a <= 55203 || a >= 55216 && a <= 55238 || a >= 55243 && a <= 55291 || a >= 63744 && a <= 64255 || a >= 65040 && a <= 65049 || a >= 65072 && a <= 65106 || a >= 65108 && a <= 65126 || a >= 65128 && a <= 65131 || a >= 65281 && a <= 65376 || a >= 65504 && a <= 65510
        }
        d.implement(this, f),
        this.setDocument = function (a) {
            if (this.doc) throw new Error("Document is already set");
            this.doc = a,
            a.on("change", this.onChange.bind(this))
        },
        this.getDocument = function () {
            return this.doc
        },
        this.onChange = function (a) {
            var b = a.data;
            this.$modified = !0,
            !this.$fromUndo && this.$undoManager && !b.ignore && (this.$deltas.push(b), this.$informUndoManager.schedule()),
            this.$updateWrapDataOnChange(a),
            this._dispatchEvent("change", a)
        },
        this.setValue = function (a) {
            this.doc.setValue(a),
            this.$deltas = [],
            this.getUndoManager().reset()
        },
        this.getValue = this.toString = function () {
            return this.doc.getValue()
        },
        this.getSelection = function () {
            return this.selection
        },
        this.setUndoManager = function (a) {
            this.$undoManager = a,
            this.$deltas = [],
            this.$informUndoManager && this.$informUndoManager.cancel();
            if (a) {
                var b = this;
                this.$informUndoManager = e.deferredCall(function () {
                    b.$deltas.length > 0 && a.execute({
                        action: "aceupdate",
                        args: [b.$deltas, b]
                    }),
                    b.$deltas = []
                })
            }
        },
        this.$defaultUndoManager = {
            undo: function () {},
            redo: function () {},
            reset: function () {}
        },
        this.getUndoManager = function () {
            return this.$undoManager || this.$defaultUndoManager
        },
        this.getTabString = function () {
            return this.getUseSoftTabs() ? e.stringRepeat(" ", this.getTabSize()) : "\t"
        },
        this.$useSoftTabs = !0,
        this.setUseSoftTabs = function (a) {
            this.$useSoftTabs !== a && (this.$useSoftTabs = a)
        },
        this.getUseSoftTabs = function () {
            return this.$useSoftTabs
        },
        this.$tabSize = 4,
        this.setTabSize = function (a) { ! isNaN(a) && this.$tabSize !== a && (this.$modified = !0, this.$tabSize = a, this._dispatchEvent("changeTabSize"))
        },
        this.getTabSize = function () {
            return this.$tabSize
        },
        this.isTabStop = function (a) {
            return this.$useSoftTabs && a.column % this.$tabSize == 0
        },
        this.$overwrite = !1,
        this.setOverwrite = function (a) {
            this.$overwrite != a && (this.$overwrite = a, this._dispatchEvent("changeOverwrite"))
        },
        this.getOverwrite = function () {
            return this.$overwrite
        },
        this.toggleOverwrite = function () {
            this.setOverwrite(!this.$overwrite)
        },
        this.getBreakpoints = function () {
            return this.$breakpoints
        },
        this.setBreakpoints = function (a) {
            this.$breakpoints = [];
            for (var b = 0; b < a.length; b++) this.$breakpoints[a[b]] = !0;
            this._dispatchEvent("changeBreakpoint", {})
        },
        this.clearBreakpoints = function () {
            this.$breakpoints = [],
            this._dispatchEvent("changeBreakpoint", {})
        },
        this.setBreakpoint = function (a) {
            this.$breakpoints[a] = !0,
            this._dispatchEvent("changeBreakpoint", {})
        },
        this.clearBreakpoint = function (a) {
            delete this.$breakpoints[a],
            this._dispatchEvent("changeBreakpoint", {})
        },
        this.getBreakpoints = function () {
            return this.$breakpoints
        },
        this.addMarker = function (a, b, c, d) {
            var e = this.$markerId++,
                f = {
                range: a,
                type: c || "line",
                renderer: typeof c == "function" ? c : null,
                clazz: b,
                inFront: !!d
            };
            d ? (this.$frontMarkers[e] = f, this._dispatchEvent("changeFrontMarker")) : (this.$backMarkers[e] = f, this._dispatchEvent("changeBackMarker"));
            return e
        },
        this.removeMarker = function (a) {
            var b = this.$frontMarkers[a] || this.$backMarkers[a];
            if (b) {
                var c = b.inFront ? this.$frontMarkers : this.$backMarkers;
                b && (delete c[a], this._dispatchEvent(b.inFront ? "changeFrontMarker" : "changeBackMarker"))
            }
        },
        this.getMarkers = function (a) {
            return a ? this.$frontMarkers : this.$backMarkers
        },
        this.setAnnotations = function (a) {
            this.$annotations = {};
            for (var b = 0; b < a.length; b++) {
                var c = a[b],
                    d = c.row;
                this.$annotations[d] ? this.$annotations[d].push(c) : this.$annotations[d] = [c]
            }
            this._dispatchEvent("changeAnnotation", {})
        },
        this.getAnnotations = function () {
            return this.$annotations
        },
        this.clearAnnotations = function () {
            this.$annotations = {},
            this._dispatchEvent("changeAnnotation", {})
        },
        this.$detectNewLine = function (a) {
            var b = a.match(/^.*?(\r?\n)/m);
            b ? this.$autoNewLine = b[1] : this.$autoNewLine = "\n"
        },
        this.tokenRe = /^[\w\d]+/g,
        this.nonTokenRe = /^(?:[^\w\d]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\u4E00-\u9FFF\uF900-\uFAFF\u3400-\u4DBF])+/g,
        this.getWordRange = function (a, b) {
            var c = this.getLine(a),
                d = !1;
            b > 0 && (d = !!c.charAt(b - 1).match(this.tokenRe)),
            d || (d = !!c.charAt(b).match(this.tokenRe));
            var e = d ? this.tokenRe : this.nonTokenRe,
            f = b;
            if (f > 0) {
                do f--;
                while (f >= 0 && c.charAt(f).match(e));
                f++
            }
            var g = b;
            while (g < c.length && c.charAt(g).match(e)) g++;
            return new j(a, f, a, g)
        },
        this.setNewLineMode = function (a) {
            this.doc.setNewLineMode(a)
        },
        this.getNewLineMode = function () {
            return this.doc.getNewLineMode()
        },
        this.$useWorker = !0,
        this.setUseWorker = function (a) {
            this.$useWorker != a && (a && !this.$worker && window.Worker && (this.$worker = mode.createWorker(this)), !a && this.$worker && (this.$worker.terminate(), this.$worker = null))
        },
        this.getUseWorker = function () {
            return this.$useWorker
        },
        this.$mode = null,
        this.setMode = function (b) {
            this.$mode !== b && (this.$worker && this.$worker.terminate(), this.$useWorker && window.Worker && !a.noWorker ? this.$worker = b.createWorker(this) : this.$worker = null, this.$mode = b, this._dispatchEvent("changeMode"))
        },
        this.getMode = function () {
            this.$mode || (this.$mode = new h);
            return this.$mode
        },
        this.$scrollTop = 0,
        this.setScrollTopRow = function (a) {
            this.$scrollTop !== a && (this.$scrollTop = a, this._dispatchEvent("changeScrollTop"))
        },
        this.getScrollTopRow = function () {
            return this.$scrollTop
        },
        this.getWidth = function () {
            this.$computeWidth();
            return this.width
        },
        this.getScreenWidth = function () {
            this.$computeWidth();
            return this.screenWidth
        },
        this.$computeWidth = function (a) {
            if (this.$modified || a) {
                this.$modified = !1;
                var b = this.doc.getAllLines(),
                    c = 0,
                    d = 0;
                for (var e = 0; e < b.length; e++) {
                    var f = b[e],
                        g = f.length,
                        h = this.$getStringScreenWidth(f);
                    c = Math.max(c, g),
                    d = Math.max(d, h)
                }
                this.width = c,
                this.$useWrapMode ? this.screenWidth = this.$wrapLimit : this.screenWidth = d
            }
        },
        this.getLine = function (a) {
            return this.doc.getLine(a)
        },
        this.getLines = function (a, b) {
            return this.doc.getLines(a, b)
        },
        this.getLength = function () {
            return this.doc.getLength()
        },
        this.getTextRange = function (a) {
            return this.doc.getTextRange(a)
        },
        this.findMatchingBracket = function (a) {
            if (a.column == 0) return null;
            var b = this.getLine(a.row).charAt(a.column - 1);
            if (b == "") return null;
            var c = b.match(/([\(\[\{])|([\)\]\}])/);
            if (!c) return null;
            return c[1] ? this.$findClosingBracket(c[1], a) : this.$findOpeningBracket(c[2], a)
        },
        this.$brackets = {
            ")": "(",
            "(": ")",
            "]": "[",
            "[": "]",
            "{": "}",
            "}": "{"
        },
        this.$findOpeningBracket = function (a, b) {
            var c = this.$brackets[a],
                d = b.column - 2,
                e = b.row,
                f = 1,
                g = this.getLine(e);
            while (!0) {
                while (d >= 0) {
                    var h = g.charAt(d);
                    if (h == c) {
                        f -= 1;
                        if (f == 0) return {
                            row: e,
                            column: d
                        }
                    } else h == a && (f += 1);
                    d -= 1
                }
                e -= 1;
                if (e < 0) break;
                var g = this.getLine(e),
                    d = g.length - 1
            }
            return null
        },
        this.$findClosingBracket = function (a, b) {
            var c = this.$brackets[a],
                d = b.column,
                e = b.row,
                f = 1,
                g = this.getLine(e),
                h = this.getLength();
            while (!0) {
                while (d < g.length) {
                    var i = g.charAt(d);
                    if (i == c) {
                        f -= 1;
                        if (f == 0) return {
                            row: e,
                            column: d
                        }
                    } else i == a && (f += 1);
                    d += 1
                }
                e += 1;
                if (e >= h) break;
                var g = this.getLine(e),
                    d = 0
            }
            return null
        },
        this.insert = function (a, b) {
            return this.doc.insert(a, b)
        },
        this.remove = function (a) {
            return this.doc.remove(a)
        },
        this.undoChanges = function (a) {
            a.length && (this.$fromUndo = !0, this.doc.revertDeltas(a), this.$fromUndo = !1, this.$setUndoSelection(a, !0))
        },
        this.redoChanges = function (a) {
            a.length && (this.$fromUndo = !0, this.doc.applyDeltas(a), this.$fromUndo = !1, this.$setUndoSelection(a, !1))
        },
        this.$setUndoSelection = function (a, b) {
            b && (a = a.map(function (a) {
                var b = {
                    range: a.range
                };
                a.action == "insertText" || a.action == "insertLines" ? b.action = "removeText" : b.action = "insertText";
                return b
            }).reverse());
            var c = [{}];
            for (var d = 0; d < a.length; d++) {
                var e = a[d],
                    f = e.action == "insertText" || e.action == "insertLines",
                    g = c[c.length - 1];
                g.isInsert !== f ? c.push({
                    isInsert: f,
                    start: f ? e.range.start : e.range.end,
                    end: f ? e.range.end : e.range.start
                }) : f ? g.end = e.range.end : g.start = e.range.start
            }
            this.selection.clearSelection();
            var g = c[c.length - 1];
            g.isInsert ? this.selection.setSelectionRange(j.fromPoints(g.start, g.end)) : this.selection.moveCursorToPosition(g.end)
        },
        this.replace = function (a, b) {
            return this.doc.replace(a, b)
        },
        this.moveText = function (a, b) {
            var c = this.getTextRange(a);
            this.remove(a);
            var d = b.row,
                e = b.column; ! a.isMultiLine() && a.start.row == d && a.end.column < e && (e -= c.length);
            if (a.isMultiLine() && a.end.row < d) {
                var f = this.doc.$split(c);
                d -= f.length - 1
            }
            var g = d + a.end.row - a.start.row,
                h = a.isMultiLine() ? a.end.column : e + a.end.column - a.start.column,
            i = new j(d, e, g, h);
            this.insert(i.start, c);
            return i
        },
        this.indentRows = function (a, b, c) {
            c = c.replace(/\t/g, this.getTabString());
            for (var d = a; d <= b; d++) this.insert({
                row: d,
                column: 0
            },
            c)
        },
        this.outdentRows = function (a) {
            var b = a.collapseRows(),
                c = new j(0, 0, 0, 0),
                d = this.getTabSize();
            for (var e = b.start.row; e <= b.end.row; ++e) {
                var f = this.getLine(e);
                c.start.row = e,
                c.end.row = e;
                for (var g = 0; g < d; ++g) if (f.charAt(g) != " ") break;
                g < d && f.charAt(g) == "\t" ? (c.start.column = g, c.end.column = g + 1) : (c.start.column = 0, c.end.column = g),
                this.remove(c)
            }
        },
        this.moveLinesUp = function (a, b) {
            if (a <= 0) return 0;
            var c = this.doc.removeLines(a, b);
            this.doc.insertLines(a - 1, c);
            return -1
        },
        this.moveLinesDown = function (a, b) {
            if (b >= this.doc.getLength() - 1) return 0;
            var c = this.doc.removeLines(a, b);
            this.doc.insertLines(a + 1, c);
            return 1
        },
        this.duplicateLines = function (a, b) {
            var a = this.$clipRowToDocument(a),
                b = this.$clipRowToDocument(b),
                c = this.getLines(a, b);
            this.doc.insertLines(a, c);
            var d = b - a + 1;
            return d
        },
        this.$clipRowToDocument = function (a) {
            return Math.max(0, Math.min(a, this.doc.getLength() - 1))
        },
        this.$wrapLimit = 80,
        this.$useWrapMode = !1,
        this.$wrapLimitRange = {
            min: null,
            max: null
        },
        this.setUseWrapMode = function (a) {
            if (a != this.$useWrapMode) {
                this.$useWrapMode = a,
                this.$modified = !0;
                if (a) {
                    var b = this.getLength();
                    this.$wrapData = [];
                    for (i = 0; i < b; i++) this.$wrapData.push([]);
                    this.$updateWrapData(0, b - 1)
                }
                this._dispatchEvent("changeWrapMode")
            }
        },
        this.getUseWrapMode = function () {
            return this.$useWrapMode
        },
        this.setWrapLimitRange = function (a, b) {
            if (this.$wrapLimitRange.min !== a || this.$wrapLimitRange.max !== b) this.$wrapLimitRange.min = a,
            this.$wrapLimitRange.max = b,
            this.$modified = !0,
            this._dispatchEvent("changeWrapMode")
        },
        this.adjustWrapLimit = function (a) {
            var b = this.$constrainWrapLimit(a);
            if (b != this.$wrapLimit && b > 0) {
                this.$wrapLimit = b,
                this.$modified = !0,
                this.$useWrapMode && (this.$updateWrapData(0, this.getLength() - 1), this._dispatchEvent("changeWrapLimit"));
                return !0
            }
            return !1
        },
        this.$constrainWrapLimit = function (a) {
            var b = this.$wrapLimitRange.min;
            b && (a = Math.max(b, a));
            var c = this.$wrapLimitRange.max;
            c && (a = Math.min(c, a));
            return Math.max(1, a)
        },
        this.getWrapLimit = function () {
            return this.$wrapLimit
        },
        this.getWrapLimitRange = function () {
            return {
                min: this.$wrapLimitRange.min,
                max: this.$wrapLimitRange.max
            }
        },
        this.$updateWrapDataOnChange = function (a) {
            if (this.$useWrapMode) {
                var b, c = a.data.action,
                    d = a.data.range.start.row,
                    e = a.data.range.end.row;
                c.indexOf("Lines") != -1 ? (c == "insertLines" ? e = d + a.data.lines.length : e = d, b = a.data.lines.length) : b = e - d;
                if (b != 0) if (c.indexOf("remove") != -1) this.$wrapData.splice(d, b),
                e = d;
                else {
                    var f = [d, 0];
                    for (var g = 0; g < b; g++) f.push([]);
                    this.$wrapData.splice.apply(this.$wrapData, f)
                }
                this.$wrapData.length != this.doc.$lines.length && console.error("The length of doc.$lines and $wrapData have to be the same!"),
                this.$updateWrapData(d, e)
            }
        },
        this.$updateWrapData = function (a, b) {
            var c = this.doc.getAllLines(),
                d = this.getTabSize(),
                e = this.$wrapData,
                f = this.$wrapLimit;
            for (var g = a; g <= b; g++) e[g] = this.$computeWrapSplits(c[g], f, d)
        };
        var b = 1,
            c = 2,
            g = 3,
            k = 4,
            l = 5;
        this.$computeWrapSplits = function (a, b, c) {
            function k(a) {
                var b = f.slice(i, a),
                    c = b.length;
                b.join("").replace(/5/g, function (a) {
                    c -= 1
                }).replace(/2/g, function (a) {
                    c -= 1
                }),
                j += c,
                d.push(j),
                i = a
            }
            a = e.stringTrimRight(a);
            if (a.length == 0) return [];
            var c = this.getTabSize(),
                d = [],
                f = this.$getDisplayTokens(a),
                h = f.length,
                i = 0,
                j = 0;
            while (h - i > b) {
                var l = i + b;
                if (f[l] < g) {
                    for (l; l != i - 1; l--) if (f[l] >= g) {
                        l++;
                        break
                    }
                    l > i ? k(l) : k(i + b)
                } else {
                    while (f[l] >= g) l++;
                    k(l)
                }
            }
            return d
        },
        this.$getDisplayTokens = function (a) {
            var d = [],
                e;
            for (var f = 0; f < a.length; f++) {
                var h = a.charCodeAt(f);
                if (h == 9) {
                    e = this.getScreenTabSize(d.length),
                    d.push(k);
                    for (var i = 1; i < e; i++) d.push(l)
                } else h == 32 ? d.push(g) : m(h) ? d.push(b, c) : d.push(b)
            }
            return d
        },
        this.$getStringScreenWidth = function (a) {
            var b = 0,
                c = this.getTabSize();
            for (var d = 0; d < a.length; d++) {
                var e = a.charCodeAt(d);
                e == 9 ? b += this.getScreenTabSize(b) : m(e) ? b += 2 : b += 1
            }
            return b
        },
        this.getRowHeight = function (a, b) {
            var c;
            this.$useWrapMode && this.$wrapData[b] ? c = this.$wrapData[b].length + 1 : c = 1;
            return c * a.lineHeight
        },
        this.getScreenLastRowColumn = function (a, b) {
            if (!this.$useWrapMode) return this.$getStringScreenWidth(this.getLine(a));
            var c = this.$screenToDocumentRow(a),
                d = c[0],
                e = c[1],
                f, g;
            this.$wrapData[d][e] ? (f = this.$wrapData[d][e - 1] || 0, g = this.$wrapData[d][e], b && g--) : (g = this.getLine(d).length, f = this.$wrapData[d][e - 1] || 0);
            return b ? g : this.$getStringScreenWidth(this.getLine(d).substring(f, g))
        },
        this.getDocumentLastRowColumn = function (a, b) {
            if (!this.$useWrapMode) return this.getLine(a).length;
            var c = this.documentToScreenRow(a, b);
            return this.getScreenLastRowColumn(c, !0)
        },
        this.getScreenFirstRowColumn = function (a) {
            if (!this.$useWrapMode) return 0;
            var b = this.$screenToDocumentRow(a),
                c = b[0],
                d = b[1];
            return this.$wrapData[c][d - 1] || 0
        },
        this.getRowSplitData = function (a) {
            return this.$useWrapMode ? this.$wrapData[a] : undefined
        },
        this.$screenToDocumentRow = function (a) {
            if (!this.$useWrapMode) return [a, 0];
            var b = this.$wrapData,
                c = this.getLength(),
                d = 0;
            while (d < c && a >= b[d].length + 1) a -= b[d].length + 1,
            d++;
            return [d, a]
        },
        this.screenToDocumentRow = function (a) {
            return this.$screenToDocumentRow(a)[0]
        },
        this.screenToDocumentColumn = function (a, b) {
            return this.screenToDocumentPosition(a, b).column
        },
        this.getScreenTabSize = function (a) {
            return this.$tabSize - a % this.$tabSize
        },
        this.screenToDocumentPosition = function (a, b) {
            var c, d, e, f = b,
                g = this.getLength();
            if (this.$useWrapMode) {
                var h = this.$wrapData,
                    d = 0;
                while (d < g && a >= h[d].length + 1) a -= h[d].length + 1,
                d++;
                d >= g && (d = g - 1, a = h[d].length),
                e = h[d][a - 1] || 0,
                c = this.getLine(d).substring(e)
            } else d = a >= g ? g - 1 : a < 0 ? 0 : a,
            a = 0,
            e = 0,
            c = this.getLine(d);
            var i, j = 0;
            for (var k = 0; k < c.length; k++) {
                var l = c.charCodeAt(k);
                if (f > 0) e += 1,
                l == 9 ? (i = this.getScreenTabSize(j), f < i ? (f = 0, e -= 1) : (f -= i, j += i)) : m(l) ? f < 2 ? (f = 0, e -= 1) : f -= 2 : (j += 1, f -= 1);
                else break
            }
            this.$useWrapMode ? (b = h[d][a], e >= b && (e = b - 1)) : c && (e = Math.min(e, c.length));
            return {
                row: d,
                column: e
            }
        },
        this.documentToScreenColumn = function (a, b) {
            return this.documentToScreenPosition(a, b).column
        },
        this.$documentToScreenRow = function (a, b) {
            if (!this.$useWrapMode) return [a, 0];
            var c = this.$wrapData,
                d = 0;
            if (a > c.length - 1) return [this.getScreenLength(), c.length == 0 ? 0 : c[c.length - 1].length - 1];
            for (var e = 0; e < a; e++) d += c[e].length + 1;
            var f = 0;
            while (b >= c[a][f]) d++,
            f++;
            return [d, f]
        },
        this.documentToScreenRow = function (a, b) {
            return this.$documentToScreenRow(a, b)[0]
        },
        this.documentToScreenPosition = function (a, b) {
            var c, d = this.getTabSize(),
                e;
            b != null ? e = a : (e = a.row, b = a.column);
            if (!this.$useWrapMode) {
                c = this.getLine(e).substring(0, b),
                b = this.$getStringScreenWidth(c);
                return {
                    row: e,
                    column: b
                }
            }
            var f = this.$documentToScreenRow(e, b),
                g = f[0];
            if (e >= this.getLength()) return {
                row: g,
                column: 0
            };
            var h, i = this.$wrapData[e],
                j, k = f[1];
            c = this.getLine(e).substring(i[k - 1] || 0, b),
            j = this.$getStringScreenWidth(c);
            return {
                row: g,
                column: j
            }
        },
        this.getScreenLength = function () {
            if (!this.$useWrapMode) return this.getLength();
            var a = 0;
            for (var b = 0; b < this.$wrapData.length; b++) a += this.$wrapData[b].length + 1;
            return a
        }
    }).call(l.prototype),
    b.EditSession = l
}),
define("ace/selection", ["require", "exports", "module", "pilot/oop", "pilot/lang", "pilot/event_emitter", "ace/range"], function (a, b, c) {
    var d = a("pilot/oop"),
        e = a("pilot/lang"),
        f = a("pilot/event_emitter").EventEmitter,
        g = a("ace/range").Range,
        h = function (a) {
        this.session = a,
        this.doc = a.getDocument(),
        this.clearSelection(),
        this.selectionLead = this.doc.createAnchor(0, 0),
        this.selectionAnchor = this.doc.createAnchor(0, 0);
        var b = this;
        this.selectionLead.on("change", function (a) {
            b._dispatchEvent("changeCursor"),
            b.$isEmpty || b._dispatchEvent("changeSelection"),
            a.old.row == a.value.row && b.$updateDesiredColumn()
        }),
        this.selectionAnchor.on("change", function () {
            b.$isEmpty || b._dispatchEvent("changeSelection")
        })
    };
    (function () {
        d.implement(this, f),
        this.isEmpty = function () {
            return this.$isEmpty || this.selectionAnchor.row == this.selectionLead.row && this.selectionAnchor.column == this.selectionLead.column
        },
        this.isMultiLine = function () {
            if (this.isEmpty()) return !1;
            return this.getRange().isMultiLine()
        },
        this.getCursor = function () {
            return this.selectionLead.getPosition()
        },
        this.setSelectionAnchor = function (a, b) {
            this.selectionAnchor.setPosition(a, b),
            this.$isEmpty && (this.$isEmpty = !1, this._dispatchEvent("changeSelection"))
        },
        this.getSelectionAnchor = function () {
            return this.$isEmpty ? this.getSelectionLead() : this.selectionAnchor.getPosition()
        },
        this.getSelectionLead = function () {
            return this.selectionLead.getPosition()
        },
        this.shiftSelection = function (a) {
            if (this.$isEmpty) this.moveCursorTo(this.selectionLead.row, this.selectionLead.column + a);
            else {
                var b = this.getSelectionAnchor(),
                    c = this.getSelectionLead(),
                    d = this.isBackwards();
                (!d || b.column !== 0) && this.setSelectionAnchor(b.row, b.column + a),
                (d || c.column !== 0) && this.$moveSelection(function () {
                    this.moveCursorTo(c.row, c.column + a)
                })
            }
        },
        this.isBackwards = function () {
            var a = this.selectionAnchor,
                b = this.selectionLead;
            return a.row > b.row || a.row == b.row && a.column > b.column
        },
        this.getRange = function () {
            var a = this.selectionAnchor,
                b = this.selectionLead;
            if (this.isEmpty()) return g.fromPoints(b, b);
            return this.isBackwards() ? g.fromPoints(b, a) : g.fromPoints(a, b)
        },
        this.clearSelection = function () {
            this.$isEmpty || (this.$isEmpty = !0, this._dispatchEvent("changeSelection"))
        },
        this.selectAll = function () {
            var a = this.doc.getLength() - 1;
            this.setSelectionAnchor(a, this.doc.getLine(a).length),
            this.moveCursorTo(0, 0)
        },
        this.setSelectionRange = function (a, b) {
            b ? (this.setSelectionAnchor(a.end.row, a.end.column), this.selectTo(a.start.row, a.start.column)) : (this.setSelectionAnchor(a.start.row, a.start.column), this.selectTo(a.end.row, a.end.column)),
            this.$updateDesiredColumn()
        },
        this.$updateDesiredColumn = function () {
            var a = this.getCursor();
            this.$desiredColumn = this.session.documentToScreenColumn(a.row, a.column)
        },
        this.$moveSelection = function (a) {
            var b = this.selectionLead;
            this.$isEmpty && this.setSelectionAnchor(b.row, b.column),
            a.call(this)
        },
        this.selectTo = function (a, b) {
            this.$moveSelection(function () {
                this.moveCursorTo(a, b)
            })
        },
        this.selectToPosition = function (a) {
            this.$moveSelection(function () {
                this.moveCursorToPosition(a)
            })
        },
        this.selectUp = function () {
            this.$moveSelection(this.moveCursorUp)
        },
        this.selectDown = function () {
            this.$moveSelection(this.moveCursorDown)
        },
        this.selectRight = function () {
            this.$moveSelection(this.moveCursorRight)
        },
        this.selectLeft = function () {
            this.$moveSelection(this.moveCursorLeft)
        },
        this.selectLineStart = function () {
            this.$moveSelection(this.moveCursorLineStart)
        },
        this.selectLineEnd = function () {
            this.$moveSelection(this.moveCursorLineEnd)
        },
        this.selectFileEnd = function () {
            this.$moveSelection(this.moveCursorFileEnd)
        },
        this.selectFileStart = function () {
            this.$moveSelection(this.moveCursorFileStart)
        },
        this.selectWordRight = function () {
            this.$moveSelection(this.moveCursorWordRight)
        },
        this.selectWordLeft = function () {
            this.$moveSelection(this.moveCursorWordLeft)
        },
        this.selectWord = function () {
            var a = this.getCursor(),
                b = this.session.getWordRange(a.row, a.column);
            this.setSelectionRange(b)
        },
        this.selectLine = function () {
            this.setSelectionAnchor(this.selectionLead.row, 0),
            this.$moveSelection(function () {
                this.moveCursorTo(this.selectionLead.row + 1, 0)
            })
        },
        this.moveCursorUp = function () {
            this.moveCursorBy(-1, 0)
        },
        this.moveCursorDown = function () {
            this.moveCursorBy(1, 0)
        },
        this.moveCursorLeft = function () {
            var a = this.selectionLead.getPosition();
            if (a.column == 0) a.row > 0 && this.moveCursorTo(a.row - 1, this.doc.getLine(a.row - 1).length);
            else {
                var b = this.session.getTabSize();
                this.session.isTabStop(a) && this.doc.getLine(a.row).slice(a.column - b, a.column).split(" ").length - 1 == b ? this.moveCursorBy(0, -b) : this.moveCursorBy(0, -1)
            }
        },
        this.moveCursorRight = function () {
            if (this.selectionLead.column == this.doc.getLine(this.selectionLead.row).length) this.selectionLead.row < this.doc.getLength() - 1 && this.moveCursorTo(this.selectionLead.row + 1, 0);
            else {
                var a = this.session.getTabSize(),
                    b = this.selectionLead;
                this.session.isTabStop(b) && this.doc.getLine(b.row).slice(b.column, b.column + a).split(" ").length - 1 == a ? this.moveCursorBy(0, a) : this.moveCursorBy(0, 1)
            }
        },
        this.moveCursorLineStart = function () {
            var a = this.selectionLead.row,
                b = this.selectionLead.column,
                c = this.session.documentToScreenRow(a, b),
                d = this.session.getScreenFirstRowColumn(c),
                e = this.doc.getLine(a).slice(d, b),
                f = e.match(/^\s*/);
            if (f[0].length == 0) {
                var g = this.session.getDocumentLastRowColumn(a, b);
                f = this.doc.getLine(a).substring(d, g).match(/^\s*/),
                this.moveCursorTo(a, d + f[0].length)
            } else f[0].length < b ? this.moveCursorTo(a, d + f[0].length) : this.moveCursorTo(a, d)
        },
        this.moveCursorLineEnd = function () {
            var a = this.selectionLead;
            this.moveCursorTo(a.row, this.session.getDocumentLastRowColumn(a.row, a.column))
        },
        this.moveCursorFileEnd = function () {
            var a = this.doc.getLength() - 1,
                b = this.doc.getLine(a).length;
            this.moveCursorTo(a, b)
        },
        this.moveCursorFileStart = function () {
            this.moveCursorTo(0, 0)
        },
        this.moveCursorWordRight = function () {
            var a = this.selectionLead.row,
                b = this.selectionLead.column,
                c = this.doc.getLine(a),
                d = c.substring(b),
                e;
            this.session.nonTokenRe.lastIndex = 0,
            this.session.tokenRe.lastIndex = 0;
            if (b == c.length) this.moveCursorRight();
            else {
                if (e = this.session.nonTokenRe.exec(d)) b += this.session.nonTokenRe.lastIndex,
                this.session.nonTokenRe.lastIndex = 0;
                else if (e = this.session.tokenRe.exec(d)) b += this.session.tokenRe.lastIndex,
                this.session.tokenRe.lastIndex = 0;
                this.moveCursorTo(a, b)
            }
        },
        this.moveCursorWordLeft = function () {
            var a = this.selectionLead.row,
                b = this.selectionLead.column,
                c = this.doc.getLine(a),
                d = e.stringReverse(c.substring(0, b)),
                f;
            this.session.nonTokenRe.lastIndex = 0,
            this.session.tokenRe.lastIndex = 0;
            if (b == 0) this.moveCursorLeft();
            else {
                if (f = this.session.nonTokenRe.exec(d)) b -= this.session.nonTokenRe.lastIndex,
                this.session.nonTokenRe.lastIndex = 0;
                else if (f = this.session.tokenRe.exec(d)) b -= this.session.tokenRe.lastIndex,
                this.session.tokenRe.lastIndex = 0;
                this.moveCursorTo(a, b)
            }
        },
        this.moveCursorBy = function (a, b) {
            var c = this.session.documentToScreenPosition(this.selectionLead.row, this.selectionLead.column),
                d = b == 0 && this.$desiredColumn || c.column,
                e = this.session.screenToDocumentPosition(c.row + a, d);
            this.moveCursorTo(e.row, e.column + b, b == 0)
        },
        this.moveCursorToPosition = function (a) {
            this.moveCursorTo(a.row, a.column)
        },
        this.moveCursorTo = function (a, b, c) {
            this.selectionLead.setPosition(a, b),
            c || this.$updateDesiredColumn(this.selectionLead.column)
        },
        this.moveCursorToScreen = function (a, b, c) {
            var d = this.session.screenToDocumentPosition(a, b);
            a = d.row,
            b = d.column,
            this.moveCursorTo(a, b, c)
        }
    }).call(h.prototype),
    b.Selection = h
}),
define("ace/range", ["require", "exports", "module"], function (a, b, c) {
    var d = function (a, b, c, d) {
        this.start = {
            row: a,
            column: b
        },
        this.end = {
            row: c,
            column: d
        }
    };
    (function () {
        this.toString = function () {
            return "Range: [" + this.start.row + "/" + this.start.column + "] -> [" + this.end.row + "/" + this.end.column + "]"
        },
        this.contains = function (a, b) {
            return this.compare(a, b) == 0
        },
        this.compare = function (a, b) {
            if (!this.isMultiLine()) if (a === this.start.row) return b < this.start.column ? -1 : b > this.end.column ? 1 : 0;
            if (a < this.start.row) return -1;
            if (a > this.end.row) return 1;
            if (this.start.row === a) return b >= this.start.column ? 0 : -1;
            if (this.end.row === a) return b <= this.end.column ? 0 : 1;
            return 0
        },
        this.clipRows = function (a, b) {
            if (this.end.row > b) var c = {
                row: b + 1,
                column: 0
            };
            if (this.start.row > b) var e = {
                row: b + 1,
                column: 0
            };
            if (this.start.row < a) var e = {
                row: a,
                column: 0
            };
            if (this.end.row < a) var c = {
                row: a,
                column: 0
            };
            return d.fromPoints(e || this.start, c || this.end)
        },
        this.extend = function (a, b) {
            var c = this.compare(a, b);
            if (c == 0) return this;
            if (c == -1) var e = {
                row: a,
                column: b
            };
            else var f = {
                row: a,
                column: b
            };
            return d.fromPoints(e || this.start, f || this.end)
        },
        this.isEmpty = function () {
            return this.start.row == this.end.row && this.start.column == this.end.column
        },
        this.isMultiLine = function () {
            return this.start.row !== this.end.row
        },
        this.clone = function () {
            return d.fromPoints(this.start, this.end)
        },
        this.collapseRows = function () {
            return this.end.column == 0 ? new d(this.start.row, 0, Math.max(this.start.row, this.end.row - 1), 0) : new d(this.start.row, 0, this.end.row, 0)
        },
        this.toScreenRange = function (a) {
            var b = a.documentToScreenPosition(this.start),
                c = a.documentToScreenPosition(this.end);
            return new d(b.row, b.column, c.row, c.column)
        }
    }).call(d.prototype),
    d.fromPoints = function (a, b) {
        return new d(a.row, a.column, b.row, b.column)
    },
    b.Range = d
}),
define("ace/mode/text", ["require", "exports", "module", "ace/tokenizer", "ace/mode/text_highlight_rules"], function (a, b, c) {
    var d = a("ace/tokenizer").Tokenizer,
        e = a("ace/mode/text_highlight_rules").TextHighlightRules,
        f = function () {
        this.$tokenizer = new d((new e).getRules())
    };
    (function () {
        this.getTokenizer = function () {
            return this.$tokenizer
        },
        this.toggleCommentLines = function (a, b, c, d) {},
        this.getNextLineIndent = function (a, b, c) {
            return ""
        },
        this.checkOutdent = function (a, b, c) {
            return !1
        },
        this.autoOutdent = function (a, b, c) {},
        this.$getIndent = function (a) {
            var b = a.match(/^(\s+)/);
            if (b) return b[1];
            return ""
        },
        this.createWorker = function (a) {
            return null
        },
        this.highlightSelection = function (a) {
            var b = a.session;
            b.$selectionOccurrences || (b.$selectionOccurrences = []),
            b.$selectionOccurrences.length && this.clearSelectionHighlight(a);
            var c = a.getSelectionRange();
            if (!c.isEmpty() && !c.isMultiLine()) {
                var d = c.start.column - 1,
                    e = c.end.column + 1,
                    f = b.getLine(c.start.row),
                    g = f.length,
                    h = f.substring(Math.max(d, 0), Math.min(e, g));
                if (d >= 0 && /^[\w\d]/.test(h) || e <= g && /[\w\d]$/.test(h)) return;
                h = f.substring(c.start.column, c.end.column);
                if (!/^[\w\d]+$/.test(h)) return;
                var i = a.getCursorPosition(),
                    j = {
                    wrap: !0,
                    wholeWord: !0,
                    caseSensitive: !0,
                    needle: h
                },
                    k = a.$search.getOptions();
                a.$search.set(j);
                var l = a.$search.findAll(b);
                l.forEach(function (a) {
                    if (!a.contains(i.row, i.column)) {
                        var c = b.addMarker(a, "ace_selected_word");
                        b.$selectionOccurrences.push(c)
                    }
                }),
                a.$search.set(k)
            }
        },
        this.clearSelectionHighlight = function (a) {
            a.session.$selectionOccurrences && (a.session.$selectionOccurrences.forEach(function (b) {
                a.session.removeMarker(b)
            }), a.session.$selectionOccurrences = [])
        }
    }).call(f.prototype),
    b.Mode = f
}),
define("ace/tokenizer", ["require", "exports", "module"], function (a, b, c) {
    var d = function (a) {
        this.rules = a,
        this.regExps = {};
        for (var b in this.rules) {
            var c = this.rules[b],
                d = c,
                e = [];
            for (var f = 0; f < d.length; f++) e.push(d[f].regex);
            this.regExps[b] = new RegExp("(?:(" + e.join(")|(") + ")|(.))", "g")
        }
    };
    (function () {
        this.getLineTokens = function (a, b) {
            var c = b,
                d = this.rules[c],
                e = this.regExps[c];
            e.lastIndex = 0;
            var f, g = [],
                h = 0,
                i = {
                type: null,
                value: ""
            };
            while (f = e.exec(a)) {
                var j = "text",
                    k = f[0];
                for (var l = 0; l < d.length; l++) if (f[l + 1]) {
                    var m = d[l];
                    typeof m.token == "function" ? j = m.token(f[0]) : j = m.token,
                    m.next && m.next !== c && (c = m.next, d = this.rules[c], h = e.lastIndex, e = this.regExps[c], e.lastIndex = h);
                    break
                }
                i.type !== j ? (i.type && g.push(i), i = {
                    type: j,
                    value: k
                }) : i.value += k;
                if (h == a.length) break;
                h = e.lastIndex
            }
            i.type && g.push(i);
            return {
                tokens: g,
                state: c
            }
        }
    }).call(d.prototype),
    b.Tokenizer = d
}),
define("ace/mode/text_highlight_rules", ["require", "exports", "module"], function (a, b, c) {
    var d = function () {
        this.$rules = {
            start: [{
                token: "empty_line",
                regex: "^$"
            },
            {
                token: "text",
                regex: ".+"
            }]
        }
    };
    (function () {
        this.addRules = function (a, b) {
            for (var c in a) {
                var d = a[c];
                for (var e = 0; e < d.length; e++) {
                    var f = d[e];
                    f.next ? f.next = b + f.next : f.next = b + c
                }
                this.$rules[b + c] = d
            }
        },
        this.getRules = function () {
            return this.$rules
        }
    }).call(d.prototype),
    b.TextHighlightRules = d
}),
define("ace/document", ["require", "exports", "module", "pilot/oop", "pilot/event_emitter", "ace/range", "ace/anchor"], function (a, b, c) {
    var d = a("pilot/oop"),
        e = a("pilot/event_emitter").EventEmitter,
        f = a("ace/range").Range,
        g = a("ace/anchor").Anchor,
        h = function (a) {
        this.$lines = [],
        Array.isArray(a) ? this.insertLines(0, a) : a.length == 0 ? this.$lines = [""] : this.insert({
            row: 0,
            column: 0
        },
        a)
    };
    (function () {
        d.implement(this, e),
        this.setValue = function (a) {
            var b = this.getLength();
            this.remove(new f(0, 0, b, this.getLine(b - 1).length)),
            this.insert({
                row: 0,
                column: 0
            },
            a)
        },
        this.getValue = function () {
            return this.getAllLines().join(this.getNewLineCharacter())
        },
        this.createAnchor = function (a, b) {
            return new g(this, a, b)
        },
        "aaa".split(/a/).length == 0 ? this.$split = function (a) {
            return a.replace(/\r\n|\r/g, "\n").split("\n")
        } : this.$split = function (a) {
            return a.split(/\r\n|\r|\n/)
        },
        this.$detectNewLine = function (a) {
            var b = a.match(/^.*?(\r?\n)/m);
            b ? this.$autoNewLine = b[1] : this.$autoNewLine = "\n"
        },
        this.getNewLineCharacter = function () {
            switch (this.$newLineMode) {
            case "windows":
                return "\r\n";
            case "unix":
                return "\n";
            case "auto":
                return this.$autoNewLine
            }
        },
        this.$autoNewLine = "\n",
        this.$newLineMode = "auto",
        this.setNewLineMode = function (a) {
            this.$newLineMode !== a && (this.$newLineMode = a)
        },
        this.getNewLineMode = function () {
            return this.$newLineMode
        },
        this.isNewLine = function (a) {
            return a == "\r\n" || a == "\r" || a == "\n"
        },
        this.getLine = function (a) {
            return this.getLines(a, a + 1)[0] || ""
        },
        this.getLines = function (a, b) {
            return this.$lines.slice(a, b + 1)
        },
        this.getAllLines = function () {
            return this.getLines(0, this.getLength())
        },
        this.getLength = function () {
            return this.$lines.length
        },
        this.getTextRange = function (a) {
            if (a.start.row == a.end.row) return this.$lines[a.start.row].substring(a.start.column, a.end.column);
            var b = [];
            b.push(this.$lines[a.start.row].substring(a.start.column)),
            b.push.apply(b, this.getLines(a.start.row + 1, a.end.row - 1)),
            b.push(this.$lines[a.end.row].substring(0, a.end.column));
            return b.join(this.getNewLineCharacter())
        },
        this.$clipPosition = function (a) {
            var b = this.getLength();
            a.row >= b && (a.row = Math.max(0, b - 1), a.column = this.getLine(b - 1).length);
            return a
        },
        this.insert = function (a, b) {
            if (b.length == 0) return a;
            a = this.$clipPosition(a),
            this.getLength() <= 1 && this.$detectNewLine(b);
            var c = this.$split(b),
                d = c.splice(0, 1)[0],
                e = c.length == 0 ? null : c.splice(c.length - 1, 1)[0];
            a = this.insertInLine(a, d),
            e !== null && (a = this.insertNewLine(a), a = this.insertLines(a.row, c), a = this.insertInLine(a, e || ""));
            return a
        },
        this.insertLines = function (a, b) {
            if (b.length == 0) return {
                row: a,
                column: 0
            };
            var c = [a, 0];
            c.push.apply(c, b),
            this.$lines.splice.apply(this.$lines, c);
            var d = new f(a, 0, a + b.length, 0),
                e = {
                action: "insertLines",
                range: d,
                lines: b
            };
            this._dispatchEvent("change", {
                data: e
            });
            return d.end
        },
        this.insertNewLine = function (a) {
            a = this.$clipPosition(a);
            var b = this.$lines[a.row] || "";
            this.$lines[a.row] = b.substring(0, a.column),
            this.$lines.splice(a.row + 1, 0, b.substring(a.column, b.length));
            var c = {
                row: a.row + 1,
                column: 0
            },
                d = {
                action: "insertText",
                range: f.fromPoints(a, c),
                text: this.getNewLineCharacter()
            };
            this._dispatchEvent("change", {
                data: d
            });
            return c
        },
        this.insertInLine = function (a, b) {
            if (b.length == 0) return a;
            var c = this.$lines[a.row] || "";
            this.$lines[a.row] = c.substring(0, a.column) + b + c.substring(a.column);
            var d = {
                row: a.row,
                column: a.column + b.length
            },
                e = {
                action: "insertText",
                range: f.fromPoints(a, d),
                text: b
            };
            this._dispatchEvent("change", {
                data: e
            });
            return d
        },
        this.remove = function (a) {
            a.start = this.$clipPosition(a.start),
            a.end = this.$clipPosition(a.end);
            if (a.isEmpty()) return a.start;
            var b = a.start.row,
                c = a.end.row;
            if (a.isMultiLine()) {
                var d = a.start.column == 0 ? b : b + 1,
                e = c - 1;
                a.end.column > 0 && this.removeInLine(c, 0, a.end.column),
                e >= d && this.removeLines(d, e),
                d != b && (this.removeInLine(b, a.start.column, this.getLine(b).length), this.removeNewLine(a.start.row))
            } else this.removeInLine(b, a.start.column, a.end.column);
            return a.start
        },
        this.removeInLine = function (a, b, c) {
            if (b != c) {
                var d = new f(a, b, a, c),
                    e = this.getLine(a),
                    g = e.substring(b, c),
                    h = e.substring(0, b) + e.substring(c, e.length);
                this.$lines.splice(a, 1, h);
                var i = {
                    action: "removeText",
                    range: d,
                    text: g
                };
                this._dispatchEvent("change", {
                    data: i
                });
                return d.start
            }
        },
        this.removeLines = function (a, b) {
            var c = new f(a, 0, b + 1, 0),
                d = this.$lines.splice(a, b - a + 1),
                e = {
                action: "removeLines",
                range: c,
                nl: this.getNewLineCharacter(),
                lines: d
            };
            this._dispatchEvent("change", {
                data: e
            });
            return d
        },
        this.removeNewLine = function (a) {
            var b = this.getLine(a),
                c = this.getLine(a + 1),
                d = new f(a, b.length, a + 1, 0),
                e = b + c;
            this.$lines.splice(a, 2, e);
            var g = {
                action: "removeText",
                range: d,
                text: this.getNewLineCharacter()
            };
            this._dispatchEvent("change", {
                data: g
            })
        },
        this.replace = function (a, b) {
            if (b.length == 0 && a.isEmpty()) return a.start;
            if (b == this.getTextRange(a)) return a.end;
            this.remove(a);
            if (b) var c = this.insert(a.start, b);
            else c = a.start;
            return c
        },
        this.applyDeltas = function (a) {
            for (var b = 0; b < a.length; b++) {
                var c = a[b],
                    d = f.fromPoints(c.range.start, c.range.end);
                c.action == "insertLines" ? this.insertLines(d.start.row, c.lines) : c.action == "insertText" ? this.insert(d.start, c.text) : c.action == "removeLines" ? this.removeLines(d.start.row, d.end.row - 1) : c.action == "removeText" && this.remove(d)
            }
        },
        this.revertDeltas = function (a) {
            for (var b = a.length - 1; b >= 0; b--) {
                var c = a[b],
                    d = f.fromPoints(c.range.start, c.range.end);
                c.action == "insertLines" ? this.removeLines(d.start.row, d.end.row - 1) : c.action == "insertText" ? this.remove(d) : c.action == "removeLines" ? this.insertLines(d.start.row, c.lines) : c.action == "removeText" && this.insert(d.start, c.text)
            }
        }
    }).call(h.prototype),
    b.Document = h
}),
define("ace/anchor", ["require", "exports", "module", "pilot/oop", "pilot/event_emitter"], function (a, b, c) {
    var d = a("pilot/oop"),
        e = a("pilot/event_emitter").EventEmitter,
        f = b.Anchor = function (a, b, c) {
        this.document = a,
        typeof c == "undefined" ? this.setPosition(b.row, b.column) : this.setPosition(b, c),
        this.$onChange = this.onChange.bind(this),
        a.on("change", this.$onChange)
    };
    (function () {
        d.implement(this, e),
        this.getPosition = function () {
            return this.$clipPositionToDocument(this.row, this.column)
        },
        this.getDocument = function () {
            return this.document
        },
        this.onChange = function (a) {
            var b = a.data,
                c = b.range;
            if (c.start.row != c.end.row || c.start.row == this.row) {
                if (c.start.row > this.row) return;
                if (c.start.row == this.row && c.start.column > this.column) return;
                var d = this.row,
                    e = this.column;
                b.action === "insertText" ? c.start.row !== d || c.start.column > e ? c.start.row !== c.end.row && c.start.row < d && (d += c.end.row - c.start.row) : c.start.row === c.end.row ? e += c.end.column - c.start.column : (e -= c.start.column, d += c.end.row - c.start.row) : b.action === "insertLines" ? c.start.row <= d && (d += c.end.row - c.start.row) : b.action == "removeText" ? c.start.row == d && c.start.column < e ? c.end.column < e ? e = Math.max(0, e - (c.end.column - c.start.column)) : e = c.start.column : c.start.row !== c.end.row && c.start.row < d ? (c.end.row == d && (e = Math.max(0, e - c.end.column) + c.start.column), d -= c.end.row - c.start.row) : c.end.row == d && (d -= c.end.row - c.start.row, e = Math.max(0, e - c.end.column) + c.start.column) : b.action == "removeLines" && (c.start.row <= d && (c.end.row > d ? (d = c.start.row, e = 0) : d -= c.end.row - c.start.row)),
                this.setPosition(d, e, !0)
            }
        },
        this.setPosition = function (a, b, c) {
            c ? pos = {
                row: a,
                column: b
            } : pos = this.$clipPositionToDocument(a, b);
            if (this.row != pos.row || this.column != pos.column) {
                var d = {
                    row: this.row,
                    column: this.column
                };
                this.row = pos.row,
                this.column = pos.column,
                this._dispatchEvent("change", {
                    old: d,
                    value: pos
                })
            }
        },
        this.detach = function () {
            this.document.removeEventListener("change", this.$onChange)
        },
        this.$clipPositionToDocument = function (a, b) {
            var c = {};
            a < this.document.getLength() ? a < 0 ? (c.row = 0, c.column = 0) : (c.row = a, c.column = Math.min(this.document.getLine(c.row).length, Math.max(0, b))) : (c.row = Math.max(0, this.document.getLength() - 1), c.column = this.document.getLine(c.row).length),
            b < 0 && (c.column = 0);
            return c
        }
    }).call(f.prototype)
}),
define("ace/search", ["require", "exports", "module", "pilot/lang", "pilot/oop", "ace/range"], function (a, b, c) {
    var d = a("pilot/lang"),
        e = a("pilot/oop"),
        f = a("ace/range").Range,
        g = function () {
        this.$options = {
            needle: "",
            backwards: !1,
            wrap: !1,
            caseSensitive: !1,
            wholeWord: !1,
            scope: g.ALL,
            regExp: !1
        }
    };
    g.ALL = 1,
    g.SELECTION = 2,
    function () {
        this.set = function (a) {
            e.mixin(this.$options, a);
            return this
        },
        this.getOptions = function () {
            return d.copyObject(this.$options)
        },
        this.find = function (a) {
            if (!this.$options.needle) return null;
            if (this.$options.backwards) var b = this.$backwardMatchIterator(a);
            else b = this.$forwardMatchIterator(a);
            var c = null;
            b.forEach(function (a) {
                c = a;
                return !0
            });
            return c
        },
        this.findAll = function (a) {
            if (!this.$options.needle) return [];
            if (this.$options.backwards) var b = this.$backwardMatchIterator(a);
            else b = this.$forwardMatchIterator(a);
            var c = [];
            b.forEach(function (a) {
                c.push(a)
            });
            return c
        },
        this.replace = function (a, b) {
            var c = this.$assembleRegExp(),
                d = c.exec(a);
            return d && d[0].length == a.length ? this.$options.regExp ? a.replace(c, b) : b : null
        },
        this.$forwardMatchIterator = function (a) {
            var b = this.$assembleRegExp(),
                c = this;
            return {
                forEach: function (d) {
                    c.$forwardLineIterator(a).forEach(function (a, e, f) {
                        e && (a = a.substring(e));
                        var g = [];
                        a.replace(b, function (a) {
                            var b = arguments[arguments.length - 2];
                            g.push({
                                str: a,
                                offset: e + b
                            });
                            return a
                        });
                        for (var h = 0; h < g.length; h++) {
                            var i = g[h],
                                j = c.$rangeFromMatch(f, i.offset, i.str.length);
                            if (d(j)) return !0
                        }
                    })
                }
            }
        },
        this.$backwardMatchIterator = function (a) {
            var b = this.$assembleRegExp(),
                c = this;
            return {
                forEach: function (d) {
                    c.$backwardLineIterator(a).forEach(function (a, e, f) {
                        e && (a = a.substring(e));
                        var g = [];
                        a.replace(b, function (a, b) {
                            g.push({
                                str: a,
                                offset: e + b
                            });
                            return a
                        });
                        for (var h = g.length - 1; h >= 0; h--) {
                            var i = g[h],
                                j = c.$rangeFromMatch(f, i.offset, i.str.length);
                            if (d(j)) return !0
                        }
                    })
                }
            }
        },
        this.$rangeFromMatch = function (a, b, c) {
            return new f(a, b, a, b + c)
        },
        this.$assembleRegExp = function () {
            if (this.$options.regExp) var a = this.$options.needle;
            else a = d.escapeRegExp(this.$options.needle);
            this.$options.wholeWord && (a = "\\b" + a + "\\b");
            var b = "g";
            this.$options.caseSensitive || (b += "i");
            var c = new RegExp(a, b);
            return c
        },
        this.$forwardLineIterator = function (a) {
            function k(e) {
                var f = a.getLine(e);
                b && e == c.end.row && (f = f.substring(0, c.end.column)),
                j && e == d.row && (f = f.substring(0, d.column));
                return f
            }
            var b = this.$options.scope == g.SELECTION,
                c = a.getSelection().getRange(),
                d = a.getSelection().getCursor(),
                e = b ? c.start.row : 0,
            f = b ? c.start.column : 0,
            h = b ? c.end.row : a.getLength() - 1,
            i = this.$options.wrap,
            j = !1;
            return {
                forEach: function (a) {
                    var b = d.row,
                        c = k(b),
                        g = d.column,
                        l = !1;
                    j = !1;
                    while (!a(c, g, b)) {
                        if (l) return;
                        b++,
                        g = 0;
                        if (b > h) if (i) b = e,
                        g = f,
                        j = !0;
                        else return;
                        b == d.row && (l = !0),
                        c = k(b)
                    }
                }
            }
        },
        this.$backwardLineIterator = function (a) {
            var b = this.$options.scope == g.SELECTION,
                c = a.getSelection().getRange(),
                d = b ? c.end : c.start,
            e = b ? c.start.row : 0,
            f = b ? c.start.column : 0,
            h = b ? c.end.row : a.getLength() - 1,
            i = this.$options.wrap;
            return {
                forEach: function (g) {
                    var j = d.row,
                        k = a.getLine(j).substring(0, d.column),
                        l = 0,
                        m = !1,
                        n = !1;
                    while (!g(k, l, j)) {
                        if (m) return;
                        j--,
                        l = 0;
                        if (j < e) if (i) j = h,
                        n = !0;
                        else return;
                        j == d.row && (m = !0),
                        k = a.getLine(j),
                        b && (j == e ? l = f : j == h && (k = k.substring(0, c.end.column))),
                        n && j == d.row && (l = d.column)
                    }
                }
            }
        }
    }.call(g.prototype),
    b.Search = g
}),
define("ace/background_tokenizer", ["require", "exports", "module", "pilot/oop", "pilot/event_emitter"], function (a, b, c) {
    var d = a("pilot/oop"),
        e = a("pilot/event_emitter").EventEmitter,
        f = function (a, b) {
        this.running = !1,
        this.lines = [],
        this.currentLine = 0,
        this.tokenizer = a;
        var c = this;
        this.$worker = function () {
            if (c.running) {
                var a = new Date,
                    d = c.currentLine,
                    e = c.doc,
                    f = 0,
                    g = b.getLastVisibleRow(),
                    h = e.getLength();
                while (c.currentLine < h) {
                    c.lines[c.currentLine] = c.$tokenizeRows(c.currentLine, c.currentLine)[0],
                    c.currentLine++,
                    f += 1;
                    if (f % 5 == 0 && new Date - a > 20) {
                        c.fireUpdateEvent(d, c.currentLine - 1);
                        var i = c.currentLine < g ? 20 : 100;
                        c.running = setTimeout(c.$worker, i);
                        return
                    }
                }
                c.running = !1,
                c.fireUpdateEvent(d, h - 1)
            }
        }
    };
    (function () {
        d.implement(this, e),
        this.setTokenizer = function (a) {
            this.tokenizer = a,
            this.lines = [],
            this.start(0)
        },
        this.setDocument = function (a) {
            this.doc = a,
            this.lines = [],
            this.stop()
        },
        this.fireUpdateEvent = function (a, b) {
            var c = {
                first: a,
                last: b
            };
            this._dispatchEvent("update", {
                data: c
            })
        },
        this.start = function (a) {
            this.currentLine = Math.min(a || 0, this.currentLine, this.doc.getLength()),
            this.lines.splice(this.currentLine, this.lines.length),
            this.stop(),
            this.running = setTimeout(this.$worker, 700)
        },
        this.stop = function () {
            this.running && clearTimeout(this.running),
            this.running = !1
        },
        this.getTokens = function (a, b) {
            return this.$tokenizeRows(a, b)
        },
        this.getState = function (a) {
            return this.$tokenizeRows(a, a)[0].state
        },
        this.$tokenizeRows = function (a, b) {
            if (!this.doc) return [];
            var c = [],
                d = "start",
                e = !1;
            a > 0 && this.lines[a - 1] && (d = this.lines[a - 1].state, e = !0);
            var f = this.doc.getLines(a, b);
            for (var g = a; g <= b; g++) if (this.lines[g]) {
                var h = this.lines[g];
                d = h.state,
                c.push(h)
            } else {
                var h = this.tokenizer.getLineTokens(f[g - a] || "", d),
                    d = h.state;
                c.push(h),
                e && (this.lines[g] = h)
            }
            return c
        }
    }).call(f.prototype),
    b.BackgroundTokenizer = f
}),
define("ace/undomanager", ["require", "exports", "module"], function (a, b, c) {
    var d = function () {
        this.reset()
    };
    (function () {
        this.execute = function (a) {
            var b = a.args[0];
            this.$doc = a.args[1],
            this.$undoStack.push(b)
        },
        this.undo = function () {
            var a = this.$undoStack.pop();
            a && (this.$doc.undoChanges(a), this.$redoStack.push(a))
        },
        this.redo = function () {
            var a = this.$redoStack.pop();
            a && (this.$doc.redoChanges(a), this.$undoStack.push(a))
        },
        this.reset = function () {
            this.$undoStack = [],
            this.$redoStack = []
        },
        this.hasUndo = function () {
            return this.$undoStack.length > 0
        },
        this.hasRedo = function () {
            return this.$redoStack.length > 0
        }
    }).call(d.prototype),
    b.UndoManager = d
}),
define("ace/theme/textmate", ["require", "exports", "module", "pilot/dom"], function (a, b, c) {
    var d = a("pilot/dom"),
        e = ".ace-tm .ace_editor {\n  border: 2px solid rgb(159, 159, 159);\n}\n\n.ace-tm .ace_editor.ace_focus {\n  border: 2px solid #327fbd;\n}\n\n.ace-tm .ace_gutter {\n  width: 50px;\n  background: #e8e8e8;\n  color: #333;\n  overflow : hidden;\n}\n\n.ace-tm .ace_gutter-layer {\n  width: 100%;\n  text-align: right;\n}\n\n.ace-tm .ace_gutter-layer .ace_gutter-cell {\n  padding-right: 6px;\n}\n\n.ace-tm .ace_print_margin {\n  width: 1px;\n  background: #e8e8e8;\n}\n\n.ace-tm .ace_text-layer {\n  cursor: text;\n}\n\n.ace-tm .ace_cursor {\n  border-left: 2px solid black;\n}\n\n.ace-tm .ace_cursor.ace_overwrite {\n  border-left: 0px;\n  border-bottom: 1px solid black;\n}\n        \n.ace-tm .ace_line .ace_invisible {\n  color: rgb(191, 191, 191);\n}\n\n.ace-tm .ace_line .ace_keyword {\n  color: blue;\n}\n\n.ace-tm .ace_line .ace_constant.ace_buildin {\n  color: rgb(88, 72, 246);\n}\n\n.ace-tm .ace_line .ace_constant.ace_language {\n  color: rgb(88, 92, 246);\n}\n\n.ace-tm .ace_line .ace_constant.ace_library {\n  color: rgb(6, 150, 14);\n}\n\n.ace-tm .ace_line .ace_invalid {\n  background-color: rgb(153, 0, 0);\n  color: white;\n}\n\n.ace-tm .ace_line .ace_support.ace_function {\n  color: rgb(60, 76, 114);\n}\n\n.ace-tm .ace_line .ace_support.ace_constant {\n  color: rgb(6, 150, 14);\n}\n\n.ace-tm .ace_line .ace_support.ace_type,\n.ace-tm .ace_line .ace_support.ace_class {\n  color: rgb(109, 121, 222);\n}\n\n.ace-tm .ace_line .ace_keyword.ace_operator {\n  color: rgb(104, 118, 135);\n}\n\n.ace-tm .ace_line .ace_string {\n  color: rgb(3, 106, 7);\n}\n\n.ace-tm .ace_line .ace_comment {\n  color: rgb(76, 136, 107);\n}\n\n.ace-tm .ace_line .ace_comment.ace_doc {\n  color: rgb(0, 102, 255);\n}\n\n.ace-tm .ace_line .ace_comment.ace_doc.ace_tag {\n  color: rgb(128, 159, 191);\n}\n\n.ace-tm .ace_line .ace_constant.ace_numeric {\n  color: rgb(0, 0, 205);\n}\n\n.ace-tm .ace_line .ace_variable {\n  color: rgb(49, 132, 149);\n}\n\n.ace-tm .ace_line .ace_xml_pe {\n  color: rgb(104, 104, 91);\n}\n\n.ace-tm .ace_marker-layer .ace_selection {\n  background: rgb(181, 213, 255);\n}\n\n.ace-tm .ace_marker-layer .ace_step {\n  background: rgb(252, 255, 0);\n}\n\n.ace-tm .ace_marker-layer .ace_stack {\n  background: rgb(164, 229, 101);\n}\n\n.ace-tm .ace_marker-layer .ace_bracket {\n  margin: -1px 0 0 -1px;\n  border: 1px solid rgb(192, 192, 192);\n}\n\n.ace-tm .ace_marker-layer .ace_active_line {\n  background: rgb(232, 242, 254);\n}\n\n.ace-tm .ace_marker-layer .ace_selected_word {\n  background: rgb(250, 250, 255);\n  border: 1px solid rgb(200, 200, 250);\n}\n\n.ace-tm .ace_string.ace_regex {\n  color: rgb(255, 0, 0)\n}";
    d.importCssString(e),
    b.cssClass = "ace-tm"
}),
define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function (a, b, c) {
    var d = a("ace/range").Range,
        e = function () {};
    (function () {
        this.checkOutdent = function (a, b) {
            if (!/^\s+$/.test(a)) return !1;
            return /^\s*\}/.test(b)
        },
        this.autoOutdent = function (a, b) {
            var c = a.getLine(b),
                e = c.match(/^(\s*\})/);
            if (!e) return 0;
            var f = e[1].length,
                g = a.findMatchingBracket({
                row: b,
                column: f
            });
            if (!g || g.row == b) return 0;
            var h = this.$getIndent(a.getLine(g.row));
            a.replace(new d(b, 0, b, f - 1), h)
        },
        this.$getIndent = function (a) {
            var b = a.match(/^(\s+)/);
            if (b) return b[1];
            return ""
        }
    }).call(e.prototype),
    b.MatchingBraceOutdent = e
}),
define("ace/virtual_renderer", ["require", "exports", "module", "pilot/oop", "pilot/dom", "pilot/event", "pilot/useragent", "ace/layer/gutter", "ace/layer/marker", "ace/layer/text", "ace/layer/cursor", "ace/scrollbar", "ace/renderloop", "pilot/event_emitter", "text/ace/css/editor.css"], function (a, b, c) {
    var d = a("pilot/oop"),
        e = a("pilot/dom"),
        f = a("pilot/event"),
        g = a("pilot/useragent"),
        h = a("ace/layer/gutter").Gutter,
        i = a("ace/layer/marker").Marker,
        j = a("ace/layer/text").Text,
        k = a("ace/layer/cursor").Cursor,
        l = a("ace/scrollbar").ScrollBar,
        m = a("ace/renderloop").RenderLoop,
        n = a("pilot/event_emitter").EventEmitter,
        o = a("text/ace/css/editor.css");
    e.importCssString(o);
    var p = function (a, b) {
        this.container = a,
        e.addCssClass(this.container, "ace_editor"),
        this.setTheme(b),
        this.$gutter = e.createElement("div"),
        this.$gutter.className = "ace_gutter",
        this.container.appendChild(this.$gutter),
        this.scroller = e.createElement("div"),
        this.scroller.className = "ace_scroller",
        this.container.appendChild(this.scroller),
        this.content = e.createElement("div"),
        this.content.className = "ace_content",
        this.scroller.appendChild(this.content),
        this.$gutterLayer = new h(this.$gutter),
        this.$markerBack = new i(this.content);
        var c = this.$textLayer = new j(this.content);
        this.canvas = c.element,
        this.$markerFront = new i(this.content),
        this.characterWidth = c.getCharacterWidth(),
        this.lineHeight = c.getLineHeight(),
        this.$cursorLayer = new k(this.content),
        this.$cursorPadding = 8,
        this.$horizScroll = !0,
        this.$horizScrollAlwaysVisible = !0,
        this.scrollBar = new l(a),
        this.scrollBar.addEventListener("scroll", this.onScroll.bind(this)),
        this.scrollTop = 0,
        this.cursorPos = {
            row: 0,
            column: 0
        };
        var d = this;
        this.$textLayer.addEventListener("changeCharaterSize", function () {
            d.characterWidth = c.getCharacterWidth(),
            d.lineHeight = c.getLineHeight(),
            d.$updatePrintMargin(),
            d.onResize(!0),
            d.$loop.schedule(d.CHANGE_FULL)
        }),
        f.addListener(this.$gutter, "click", this.$onGutterClick.bind(this)),
        f.addListener(this.$gutter, "dblclick", this.$onGutterClick.bind(this)),
        this.$size = {
            width: 0,
            height: 0,
            scrollerHeight: 0,
            scrollerWidth: 0
        },
        this.$loop = new m(this.$renderChanges.bind(this)),
        this.$loop.schedule(this.CHANGE_FULL),
        this.setPadding(4),
        this.$updatePrintMargin()
    };
    (function () {
        this.showGutter = !0,
        this.CHANGE_CURSOR = 1,
        this.CHANGE_MARKER = 2,
        this.CHANGE_GUTTER = 4,
        this.CHANGE_SCROLL = 8,
        this.CHANGE_LINES = 16,
        this.CHANGE_TEXT = 32,
        this.CHANGE_SIZE = 64,
        this.CHANGE_MARKER_BACK = 128,
        this.CHANGE_MARKER_FRONT = 256,
        this.CHANGE_FULL = 512,
        d.implement(this, n),
        this.setSession = function (a) {
            this.session = a,
            this.$cursorLayer.setSession(a),
            this.$markerBack.setSession(a),
            this.$markerFront.setSession(a),
            this.$gutterLayer.setSession(a),
            this.$textLayer.setSession(a),
            this.$loop.schedule(this.CHANGE_FULL)
        },
        this.updateLines = function (a, b) {
            b === undefined && (b = Infinity),
            this.$changedLines ? (this.$changedLines.firstRow > a && (this.$changedLines.firstRow = a), this.$changedLines.lastRow < b && (this.$changedLines.lastRow = b)) : this.$changedLines = {
                firstRow: a,
                lastRow: b
            },
            this.$loop.schedule(this.CHANGE_LINES)
        },
        this.updateText = function () {
            this.$loop.schedule(this.CHANGE_TEXT)
        },
        this.updateFull = function () {
            this.$loop.schedule(this.CHANGE_FULL)
        },
        this.updateFontSize = function () {
            this.$textLayer.checkForSizeChanges()
        },
        this.onResize = function (a) {
            var b = this.CHANGE_SIZE,
                c = e.getInnerHeight(this.container);
            if (a || this.$size.height != c) this.$size.height = c,
            this.scroller.style.height = c + "px",
            this.scrollBar.setHeight(this.scroller.clientHeight),
            this.session && (this.scrollToY(this.getScrollTop()), b = b | this.CHANGE_FULL);
            var d = e.getInnerWidth(this.container);
            if (a || this.$size.width != d) {
                this.$size.width = d;
                var f = this.showGutter ? this.$gutter.offsetWidth : 0;
                this.scroller.style.left = f + "px",
                this.scroller.style.width = Math.max(0, d - f - this.scrollBar.getWidth()) + "px";
                if (this.session.getUseWrapMode()) {
                    var g = this.scroller.clientWidth - this.$padding * 2,
                        h = Math.floor(g / this.characterWidth) - 1;
                    if (this.session.adjustWrapLimit(h) || a) b = b | this.CHANGE_FULL
                }
            }
            this.$size.scrollerWidth = this.scroller.clientWidth,
            this.$size.scrollerHeight = this.scroller.clientHeight,
            this.$loop.schedule(b)
        },
        this.setTokenizer = function (a) {
            this.$tokenizer = a,
            this.$textLayer.setTokenizer(a),
            this.$loop.schedule(this.CHANGE_TEXT)
        },
        this.$onGutterClick = function (a) {
            var b = f.getDocumentX(a),
                c = f.getDocumentY(a);
            this._dispatchEvent("gutter" + a.type, {
                row: this.screenToTextCoordinates(b, c).row,
                htmlEvent: a
            })
        },
        this.setShowInvisibles = function (a) {
            this.$textLayer.setShowInvisibles(a) && this.$loop.schedule(this.CHANGE_TEXT)
        },
        this.getShowInvisibles = function () {
            return this.$textLayer.showInvisibles
        },
        this.$showPrintMargin = !0,
        this.setShowPrintMargin = function (a) {
            this.$showPrintMargin = a,
            this.$updatePrintMargin()
        },
        this.getShowPrintMargin = function () {
            return this.$showPrintMargin
        },
        this.$printMarginColumn = 80,
        this.setPrintMarginColumn = function (a) {
            this.$printMarginColumn = a,
            this.$updatePrintMargin()
        },
        this.getPrintMarginColumn = function () {
            return this.$printMarginColumn
        },
        this.getShowGutter = function () {
            return this.showGutter
        },
        this.setShowGutter = function (a) {
            this.showGutter !== a && (this.$gutter.style.display = a ? "block" : "none", this.showGutter = a, this.onResize(!0))
        },
        this.$updatePrintMargin = function () {
            var a;
            if (this.$showPrintMargin || this.$printMarginEl) {
                this.$printMarginEl || (a = e.createElement("div"), a.className = "ace_print_margin_layer", this.$printMarginEl = e.createElement("div"), this.$printMarginEl.className = "ace_print_margin", a.appendChild(this.$printMarginEl), this.content.insertBefore(a, this.$textLayer.element));
                var b = this.$printMarginEl.style;
                b.left = this.characterWidth * this.$printMarginColumn + this.$padding * 2 + "px",
                b.visibility = this.$showPrintMargin ? "visible" : "hidden"
            }
        },
        this.getContainerElement = function () {
            return this.container
        },
        this.getMouseEventTarget = function () {
            return this.content
        },
        this.getTextAreaContainer = function () {
            return this.container
        },
        this.moveTextAreaToCursor = function (a) {
            if (!g.isIE) {
                var b = this.$cursorLayer.getPixelPosition();
                if (!b) return;
                var c = this.content.getBoundingClientRect(),
                    d = this.layerConfig && this.layerConfig.offset || 0;
                a.style.left = c.left + b.left + this.$padding + "px",
                a.style.top = c.top + b.top - this.scrollTop + d + "px"
            }
        },
        this.getFirstVisibleRow = function () {
            return (this.layerConfig || {}).firstRow || 0
        },
        this.getFirstFullyVisibleRow = function () {
            if (!this.layerConfig) return 0;
            return this.layerConfig.firstRow + (this.layerConfig.offset == 0 ? 0 : 1)
        },
        this.getLastFullyVisibleRow = function () {
            if (!this.layerConfig) return 0;
            var a = Math.floor((this.layerConfig.height + this.layerConfig.offset) / this.layerConfig.lineHeight);
            return this.layerConfig.firstRow - 1 + a
        },
        this.getLastVisibleRow = function () {
            return (this.layerConfig || {}).lastRow || 0
        },
        this.$padding = null,
        this.setPadding = function (a) {
            this.$padding = a,
            this.content.style.padding = "0 " + a + "px",
            this.$loop.schedule(this.CHANGE_FULL),
            this.$updatePrintMargin()
        },
        this.getHScrollBarAlwaysVisible = function () {
            return this.$horizScrollAlwaysVisible
        },
        this.setHScrollBarAlwaysVisible = function (a) {
            this.$horizScrollAlwaysVisible != a && (this.$horizScrollAlwaysVisible = a, (!this.$horizScrollAlwaysVisible || !this.$horizScroll) && this.$loop.schedule(this.CHANGE_SCROLL))
        },
        this.onScroll = function (a) {
            this.scrollToY(a.data)
        },
        this.$updateScrollBar = function () {
            this.scrollBar.setInnerHeight(this.session.getScreenLength() * this.lineHeight),
            this.scrollBar.setScrollTop(this.scrollTop)
        },
        this.$renderChanges = function (a) {
            if (a && this.session && this.$tokenizer) {
                (!this.layerConfig || a & this.CHANGE_FULL || a & this.CHANGE_SIZE || a & this.CHANGE_TEXT || a & this.CHANGE_LINES || a & this.CHANGE_SCROLL) && this.$computeLayerConfig();
                if (a & this.CHANGE_FULL) {
                    this.$textLayer.update(this.layerConfig),
                    this.showGutter && this.$gutterLayer.update(this.layerConfig),
                    this.$markerBack.update(this.layerConfig),
                    this.$markerFront.update(this.layerConfig),
                    this.$cursorLayer.update(this.layerConfig),
                    this.$updateScrollBar(),
                    this.scrollCursorIntoView();
                    return
                }
                if (a & this.CHANGE_SCROLL) {
                    a & this.CHANGE_TEXT || a & this.CHANGE_LINES ? this.$textLayer.update(this.layerConfig) : this.$textLayer.scrollLines(this.layerConfig),
                    this.showGutter && this.$gutterLayer.update(this.layerConfig),
                    this.$markerBack.update(this.layerConfig),
                    this.$markerFront.update(this.layerConfig),
                    this.$cursorLayer.update(this.layerConfig),
                    this.$updateScrollBar();
                    return
                }
                a & this.CHANGE_TEXT ? (this.$textLayer.update(this.layerConfig), this.showGutter && this.$gutterLayer.update(this.layerConfig)) : a & this.CHANGE_LINES ? (this.$updateLines(), this.$updateScrollBar(), this.showGutter && this.$gutterLayer.update(this.layerConfig)) : a & this.CHANGE_GUTTER && (this.showGutter && this.$gutterLayer.update(this.layerConfig)),
                a & this.CHANGE_CURSOR && this.$cursorLayer.update(this.layerConfig),
                a & (this.CHANGE_MARKER | this.CHANGE_MARKER_FRONT) && this.$markerFront.update(this.layerConfig),
                a & (this.CHANGE_MARKER | this.CHANGE_MARKER_BACK) && this.$markerBack.update(this.layerConfig),
                a & this.CHANGE_SIZE && this.$updateScrollBar()
            }
        },
        this.$computeLayerConfig = function () {
            var a = this.session,
                b = this.scrollTop % this.lineHeight,
                c = this.$size.scrollerHeight + this.lineHeight,
                d = this.$getLongestLine(),
                e = this.layerConfig ? this.layerConfig.width != d : !0,
            f = this.$horizScrollAlwaysVisible || this.$size.scrollerWidth - d < 0,
            g = this.$horizScroll !== f;
            this.$horizScroll = f,
            g && (this.scroller.style.overflowX = f ? "scroll" : "hidden");
            var h = Math.ceil(c / this.lineHeight) - 1,
                i = Math.max(0, Math.round((this.scrollTop - b) / this.lineHeight)),
                j = i + h,
                k, l, m = {
                lineHeight: this.lineHeight
            };
            i = a.screenToDocumentRow(i),
            k = a.documentToScreenRow(i),
            l = a.getRowHeight(m, i),
            j = Math.min(a.screenToDocumentRow(j), a.getLength() - 1),
            c = this.$size.scrollerHeight + a.getRowHeight(m, j) + l,
            b = this.scrollTop - k * this.lineHeight;
            var n = this.layerConfig = {
                width: d,
                padding: this.$padding,
                firstRow: i,
                firstRowScreen: k,
                lastRow: j,
                lineHeight: this.lineHeight,
                characterWidth: this.characterWidth,
                minHeight: c,
                offset: b,
                height: this.$size.scrollerHeight
            };
            this.$gutterLayer.element.style.marginTop = -b + "px",
            this.content.style.marginTop = -b + "px",
            this.content.style.width = d + "px",
            this.content.style.height = c + "px",
            g && this.onResize(!0)
        },
        this.$updateLines = function () {
            var a = this.$changedLines.firstRow,
                b = this.$changedLines.lastRow;
            this.$changedLines = null;
            var c = this.layerConfig;
            if (c.width != this.$getLongestLine()) return this.$textLayer.update(c);
            if (a <= c.lastRow + 1) {
                if (b < c.firstRow) return;
                if (b === Infinity) {
                    this.showGutter && this.$gutterLayer.update(c),
                    this.$textLayer.update(c);
                    return
                }
                this.$textLayer.updateLines(c, a, b)
            }
        },
        this.$getLongestLine = function () {
            var a = this.session.getScreenWidth() + 1;
            this.$textLayer.showInvisibles && (a += 1);
            return Math.max(this.$size.scrollerWidth - this.$padding * 2, Math.round(a * this.characterWidth))
        },
        this.updateFrontMarkers = function () {
            this.$markerFront.setMarkers(this.session.getMarkers(!0)),
            this.$loop.schedule(this.CHANGE_MARKER_FRONT)
        },
        this.updateBackMarkers = function () {
            this.$markerBack.setMarkers(this.session.getMarkers()),
            this.$loop.schedule(this.CHANGE_MARKER_BACK)
        },
        this.addGutterDecoration = function (a, b) {
            this.$gutterLayer.addGutterDecoration(a, b),
            this.$loop.schedule(this.CHANGE_GUTTER)
        },
        this.removeGutterDecoration = function (a, b) {
            this.$gutterLayer.removeGutterDecoration(a, b),
            this.$loop.schedule(this.CHANGE_GUTTER)
        },
        this.setBreakpoints = function (a) {
            this.$gutterLayer.setBreakpoints(a),
            this.$loop.schedule(this.CHANGE_GUTTER)
        },
        this.setAnnotations = function (a) {
            this.$gutterLayer.setAnnotations(a),
            this.$loop.schedule(this.CHANGE_GUTTER)
        },
        this.updateCursor = function () {
            this.$loop.schedule(this.CHANGE_CURSOR)
        },
        this.hideCursor = function () {
            this.$cursorLayer.hideCursor()
        },
        this.showCursor = function () {
            this.$cursorLayer.showCursor()
        },
        this.scrollCursorIntoView = function () {
            if (this.$size.scrollerHeight !== 0) {
                var a = this.$cursorLayer.getPixelPosition(),
                    b = a.left + this.$padding,
                    c = a.top;
                this.getScrollTop() > c && this.scrollToY(c),
                this.getScrollTop() + this.$size.scrollerHeight < c + this.lineHeight && this.scrollToY(c + this.lineHeight - this.$size.scrollerHeight),
                this.scroller.scrollLeft > b && this.scrollToX(b),
                this.scroller.scrollLeft + this.$size.scrollerWidth < b + this.characterWidth && (b + this.characterWidth > this.scroller.scrollWidth && this.$renderChanges(this.CHANGE_SIZE), this.scrollToX(Math.round(b + this.characterWidth - this.$size.scrollerWidth)))
            }
        },
        this.getScrollTop = function () {
            return this.scrollTop
        },
        this.getScrollLeft = function () {
            return this.scroller.scrollLeft
        },
        this.getScrollTopRow = function () {
            return this.scrollTop / this.lineHeight
        },
        this.getScrollBottomRow = function () {
            return Math.max(0, Math.floor((this.scrollTop + this.$size.scrollerHeight) / this.lineHeight) - 1)
        },
        this.scrollToRow = function (a) {
            this.scrollToY(a * this.lineHeight)
        },
        this.scrollToLine = function (a, b) {
            var c = {
                lineHeight: this.lineHeight
            },
                d = 0;
            for (var e = 1; e < a; e++) d += this.session.getRowHeight(c, e - 1);
            b && (d -= this.$size.scrollerHeight / 2),
            this.scrollToY(d)
        },
        this.scrollToY = function (a) {
            var b = this.session.getScreenLength() * this.lineHeight - this.$size.scrollerHeight,
                a = Math.max(0, Math.min(b, a));
            this.scrollTop !== a && (this.scrollTop = a, this.$loop.schedule(this.CHANGE_SCROLL))
        },
        this.scrollToX = function (a) {
            a <= this.$padding && (a = 0),
            this.scroller.scrollLeft = a
        },
        this.scrollBy = function (a, b) {
            b && this.scrollToY(this.scrollTop + b),
            a && this.scrollToX(this.scroller.scrollLeft + a)
        },
        this.screenToTextCoordinates = function (a, b) {
            var c = this.scroller.getBoundingClientRect(),
                d = Math.round((a + this.scroller.scrollLeft - c.left - this.$padding - e.getPageScrollLeft()) / this.characterWidth),
                f = Math.floor((b + this.scrollTop - c.top - e.getPageScrollTop()) / this.lineHeight);
            return this.session.screenToDocumentPosition(f, Math.max(d, 0))
        },
        this.textToScreenCoordinates = function (a, b) {
            var c = this.scroller.getBoundingClientRect(),
                d = this.session.documentToScreenPosition(a, b),
                e = this.$padding + Math.round(d.column * this.characterWidth),
                f = d.row * this.lineHeight;
            return {
                pageX: c.left + e - this.getScrollLeft(),
                pageY: c.top + f - this.getScrollTop()
            }
        },
        this.visualizeFocus = function () {
            e.addCssClass(this.container, "ace_focus")
        },
        this.visualizeBlur = function () {
            e.removeCssClass(this.container, "ace_focus")
        },
        this.showComposition = function (a) {
            this.$composition || (this.$composition = e.createElement("div"), this.$composition.className = "ace_composition", this.content.appendChild(this.$composition)),
            this.$composition.innerHTML = "&#160;";
            var b = this.$cursorLayer.getPixelPosition(),
                c = this.$composition.style;
            c.top = b.top + "px",
            c.left = b.left + this.$padding + "px",
            c.height = this.lineHeight + "px",
            this.hideCursor()
        },
        this.setCompositionText = function (a) {
            e.setInnerText(this.$composition, a)
        },
        this.hideComposition = function () {
            this.showCursor();
            if (this.$composition) {
                var a = this.$composition.style;
                a.top = "-10000px",
                a.left = "-10000px"
            }
        },
        this.setTheme = function (b) {
            function d(a) {
                c.$theme && e.removeCssClass(c.container, c.$theme),
                c.$theme = a ? a.cssClass : null,
                c.$theme && e.addCssClass(c.container, c.$theme),
                c.$size && (c.$size.width = 0, c.onResize())
            }
            var c = this;
            b && typeof b != "string" ? d(b) : (b = b || "ace/theme/textmate", a([b], function (a) {
                d(a)
            }));
            var c = this
        },
        this.setStyle = function b(a) {
            e.addCssClass(this.container, a)
        },
        this.unsetStyle = function c(a) {
            e.removeCssClass(this.container, a)
        }
    }).call(p.prototype),
    b.VirtualRenderer = p
}),
define("ace/layer/gutter", ["require", "exports", "module", "pilot/dom"], function (a, b, c) {
    var d = a("pilot/dom"),
        e = function (a) {
        this.element = d.createElement("div"),
        this.element.className = "ace_layer ace_gutter-layer",
        a.appendChild(this.element),
        this.$breakpoints = [],
        this.$annotations = [],
        this.$decorations = []
    };
    (function () {
        this.setSession = function (a) {
            this.session = a
        },
        this.addGutterDecoration = function (a, b) {
            this.$decorations[a] || (this.$decorations[a] = ""),
            this.$decorations[a] += " ace_" + b
        },
        this.removeGutterDecoration = function (a, b) {
            this.$decorations[a] = this.$decorations[a].replace(" ace_" + b, "")
        },
        this.setBreakpoints = function (a) {
            this.$breakpoints = a.concat()
        },
        this.setAnnotations = function (a) {
            this.$annotations = [];
            for (var b in a) if (a.hasOwnProperty(b)) {
                var c = a[b];
                if (!c) continue;
                var d = this.$annotations[b] = {
                    text: []
                };
                for (var e = 0; e < c.length; e++) {
                    var f = c[e];
                    d.text.push(f.text.replace(/"/g, "&quot;").replace(/'/g, "&#8217;").replace(/</, "&lt;"));
                    var g = f.type;
                    g == "error" ? d.className = "ace_error" : g == "warning" && d.className != "ace_error" ? d.className = "ace_warning" : g == "info" && !d.className && (d.className = "ace_info")
                }
            }
        },
        this.update = function (a) {
            this.$config = a;
            var b = [];
            for (var c = a.firstRow; c <= a.lastRow; c++) {
                var e = this.$annotations[c] || {
                    className: "",
                    text: []
                };
                b.push("<div class='ace_gutter-cell", this.$decorations[c] || "", this.$breakpoints[c] ? " ace_breakpoint " : " ", e.className, "' title='", e.text.join("\n"), "' style='height:", this.session.getRowHeight(a, c), "px;'>", c + 1, "</div>")
            }
            this.element = d.setInnerHtml(this.element, b.join("")),
            this.element.style.height = a.minHeight + "px"
        }
    }).call(e.prototype),
    b.Gutter = e
}),
define("ace/layer/marker", ["require", "exports", "module", "ace/range", "pilot/dom"], function (a, b, c) {
    var d = a("ace/range").Range,
        e = a("pilot/dom"),
        f = function (a) {
        this.element = e.createElement("div"),
        this.element.className = "ace_layer ace_marker-layer",
        a.appendChild(this.element)
    };
    (function () {
        this.setSession = function (a) {
            this.session = a
        },
        this.setMarkers = function (a) {
            this.markers = a
        },
        this.update = function (a) {
            var a = a || this.config;
            if (a) {
                this.config = a;
                var b = [];
                for (var c in this.markers) {
                    var d = this.markers[c],
                        f = d.range.clipRows(a.firstRow, a.lastRow);
                    if (f.isEmpty()) continue;
                    f = f.toScreenRange(this.session);
                    if (d.renderer) {
                        var g = this.$getTop(f.start.row, a),
                            h = Math.round(f.start.column * a.characterWidth);
                        d.renderer(b, f, h, g, a)
                    } else f.isMultiLine() ? d.type == "text" ? this.drawTextMarker(b, f, d.clazz, a) : this.drawMultiLineMarker(b, f, d.clazz, a) : this.drawSingleLineMarker(b, f, d.clazz, a)
                }
                this.element = e.setInnerHtml(this.element, b.join(""))
            }
        },
        this.$getTop = function (a, b) {
            return (a - b.firstRowScreen) * b.lineHeight
        },
        this.drawTextMarker = function (a, b, c, e) {
            var f = b.start.row,
                g = new d(f, b.start.column, f, this.session.getScreenLastRowColumn(f));
            this.drawSingleLineMarker(a, g, c, e, 1);
            var f = b.end.row,
                g = new d(f, 0, f, b.end.column);
            this.drawSingleLineMarker(a, g, c, e);
            for (var f = b.start.row + 1; f < b.end.row; f++) g.start.row = f,
            g.end.row = f,
            g.end.column = this.session.getScreenLastRowColumn(f),
            this.drawSingleLineMarker(a, g, c, e, 1)
        },
        this.drawMultiLineMarker = function (a, b, c, d) {
            var e = d.lineHeight,
                f = Math.round(d.width - b.start.column * d.characterWidth),
                g = this.$getTop(b.start.row, d),
                h = Math.round(b.start.column * d.characterWidth);
            a.push("<div class='", c, "' style='", "height:", e, "px;", "width:", f, "px;", "top:", g, "px;", "left:", h, "px;'></div>");
            var g = this.$getTop(b.end.row, d),
                f = Math.round(b.end.column * d.characterWidth);
            a.push("<div class='", c, "' style='", "height:", e, "px;", "top:", g, "px;", "width:", f, "px;'></div>");
            var e = (b.end.row - b.start.row - 1) * d.lineHeight;
            if (e >= 0) {
                var g = this.$getTop(b.start.row + 1, d);
                a.push("<div class='", c, "' style='", "height:", e, "px;", "width:", d.width, "px;", "top:", g, "px;'></div>")
            }
        },
        this.drawSingleLineMarker = function (a, b, c, d, e) {
            var f = d.lineHeight,
                g = Math.round((b.end.column + (e || 0) - b.start.column) * d.characterWidth),
                h = this.$getTop(b.start.row, d),
                i = Math.round(b.start.column * d.characterWidth);
            a.push("<div class='", c, "' style='", "height:", f, "px;", "width:", g, "px;", "top:", h, "px;", "left:", i, "px;'></div>")
        }
    }).call(f.prototype),
    b.Marker = f
}),
define("ace/layer/text", ["require", "exports", "module", "pilot/oop", "pilot/dom", "pilot/lang", "pilot/event_emitter"], function (a, b, c) {
    var d = a("pilot/oop"),
        e = a("pilot/dom"),
        f = a("pilot/lang"),
        g = a("pilot/event_emitter").EventEmitter,
        h = function (a) {
        this.element = e.createElement("div"),
        this.element.className = "ace_layer ace_text-layer",
        a.appendChild(this.element),
        this.$characterSize = this.$measureSizes() || {
            width: 0,
            height: 0
        },
        this.$pollSizeChanges()
    };
    (function () {
        d.implement(this, g),
        this.EOF_CHAR = "&para;",
        this.EOL_CHAR = "&not;",
        this.TAB_CHAR = "&rarr;",
        this.SPACE_CHAR = "&middot;",
        this.setTokenizer = function (a) {
            this.tokenizer = a
        },
        this.getLineHeight = function () {
            return this.$characterSize.height || 1
        },
        this.getCharacterWidth = function () {
            return this.$characterSize.width || 1
        },
        this.checkForSizeChanges = function () {
            var a = this.$measureSizes();
            a && (this.$characterSize.width !== a.width || this.$characterSize.height !== a.height) && (this.$characterSize = a, this._dispatchEvent("changeCharaterSize", {
                data: a
            }))
        },
        this.$pollSizeChanges = function () {
            var a = this;
            setInterval(function () {
                a.checkForSizeChanges()
            },
            500)
        },
        this.$fontStyles = {
            fontFamily: 1,
            fontSize: 1,
            fontWeight: 1,
            fontStyle: 1,
            lineHeight: 1
        },
        this.$measureSizes = function () {
            var a = 1e3;
            if (!this.$measureNode) {
                var b = this.$measureNode = e.createElement("div"),
                    c = b.style;
                c.width = c.height = "auto",
                c.left = c.top = -a * 40 + "px",
                c.visibility = "hidden",
                c.position = "absolute",
                c.overflow = "visible",
                c.whiteSpace = "nowrap",
                b.innerHTML = f.stringRepeat("Xy", a);
                if (document.body) document.body.appendChild(b);
                else {
                    var d = this.element.parentNode;
                    while (!e.hasCssClass(d, "ace_editor")) d = d.parentNode;
                    d.appendChild(b)
                }
            }
            var c = this.$measureNode.style;
            for (var g in this.$fontStyles) {
                var h = e.computedStyle(this.element, g);
                c[g] = h
            }
            var i = {
                height: this.$measureNode.offsetHeight,
                width: this.$measureNode.offsetWidth / (a * 2)
            };
            if (i.width == 0 && i.height == 0) return null;
            return i
        },
        this.setSession = function (a) {
            this.session = a
        },
        this.showInvisibles = !1,
        this.setShowInvisibles = function (a) {
            if (this.showInvisibles == a) return !1;
            this.showInvisibles = a;
            return !0
        },
        this.$tabStrings = [],
        this.$computeTabString = function () {
            var a = this.session.getTabSize(),
                b = this.$tabStrings = [0];
            for (var c = 1; c < a + 1; c++) this.showInvisibles ? b.push("<span class='ace_invisible'>" + this.TAB_CHAR + Array(c).join("&#160;") + "</span>") : b.push(Array(c + 1).join("&#160;"))
        },
        this.updateLines = function (a, b, c) {
            this.$computeTabString(),
            (this.config.lastRow != a.lastRow || this.config.firstRow != a.firstRow) && this.scrollLines(a),
            this.config = a;
            var d = Math.max(b, a.firstRow),
                f = Math.min(c, a.lastRow),
                g = this.element.childNodes,
                h = this.tokenizer.getTokens(d, f);
            for (var i = d; i <= f; i++) {
                var j = g[i - a.firstRow];
                if (!j) continue;
                var k = [];
                this.$renderLine(k, i, h[i - d].tokens),
                j = e.setInnerHtml(j, k.join("")),
                j.style.height = this.session.getRowHeight(a, i) + "px"
            }
        },
        this.scrollLines = function (a) {
            this.$computeTabString();
            var b = this.config;
            this.config = a;
            if (!b || b.lastRow < a.firstRow) return this.update(a);
            if (a.lastRow < b.firstRow) return this.update(a);
            var c = this.element;
            if (b.firstRow < a.firstRow) for (var d = b.firstRow; d < a.firstRow; d++) c.removeChild(c.firstChild);
            if (b.lastRow > a.lastRow) for (var d = a.lastRow + 1; d <= b.lastRow; d++) c.removeChild(c.lastChild);
            if (a.firstRow < b.firstRow) {
                var e = this.$renderLinesFragment(a, a.firstRow, b.firstRow - 1);
                c.firstChild ? c.insertBefore(e, c.firstChild) : c.appendChild(e)
            }
            if (a.lastRow > b.lastRow) {
                var e = this.$renderLinesFragment(a, b.lastRow + 1, a.lastRow);
                c.appendChild(e)
            }
        },
        this.$renderLinesFragment = function (a, b, c) {
            var d = document.createDocumentFragment(),
                f = this.tokenizer.getTokens(b, c);
            for (var g = b; g <= c; g++) {
                var h = e.createElement("div");
                h.className = "ace_line";
                var i = h.style;
                i.height = this.session.getRowHeight(a, g) + "px",
                i.width = a.width + "px";
                var j = [];
                f.length > g - b && this.$renderLine(j, g, f[g - b].tokens),
                h.innerHTML = j.join(""),
                d.appendChild(h)
            }
            return d
        },
        this.update = function (a) {
            this.$computeTabString(),
            this.config = a;
            var b = [],
                c = this.tokenizer.getTokens(a.firstRow, a.lastRow),
                d = this.$renderLinesFragment(a, a.firstRow, a.lastRow);
            this.element.innerHTML = "",
            this.element.appendChild(d)
        },
        this.$textToken = {
            text: !0,
            rparen: !0,
            lparen: !0
        },
        this.$renderLine = function (a, b, c) {
            function g(b, c) {
                var g = c.replace(/\t|&|<|( +)|([\v\f \u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000])|[\u1100-\u115F]|[\u11A3-\u11A7]|[\u11FA-\u11FF]|[\u2329-\u232A]|[\u2E80-\u2E99]|[\u2E9B-\u2EF3]|[\u2F00-\u2FD5]|[\u2FF0-\u2FFB]|[\u3000-\u303E]|[\u3041-\u3096]|[\u3099-\u30FF]|[\u3105-\u312D]|[\u3131-\u318E]|[\u3190-\u31BA]|[\u31C0-\u31E3]|[\u31F0-\u321E]|[\u3220-\u3247]|[\u3250-\u32FE]|[\u3300-\u4DBF]|[\u4E00-\uA48C]|[\uA490-\uA4C6]|[\uA960-\uA97C]|[\uAC00-\uD7A3]|[\uD7B0-\uD7C6]|[\uD7CB-\uD7FB]|[\uF900-\uFAFF]|[\uFE10-\uFE19]|[\uFE30-\uFE52]|[\uFE54-\uFE66]|[\uFE68-\uFE6B]|[\uFF01-\uFF60]|[\uFFE0-\uFFE6]/g, function (a, b, c, g, h) {
                    if (a.charCodeAt(0) == 32) return Array(a.length + 1).join("&#160;");
                    if (a == "\t") {
                        var i = d.session.getScreenTabSize(f + g);
                        f += i - 1;
                        return d.$tabStrings[i]
                    }
                    if (a == "&") return "&amp";
                    if (a == "<") return "&lt;";
                    if (a.match(/[\v\f \u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]/)) {
                        if (this.showInvisibles) {
                            var j = Array(a.length + 1).join(self.SPACE_CHAR);
                            return "<span class='ace_invisible'>" + j + "</span>"
                        }
                        return "&#160;"
                    }
                    f += 1;
                    return "<span class='ace_cjk' style='width:" + e * 2 + "px'>" + a + "</span>"
                });
                f += c.length;
                if (d.$textToken[b.type]) a.push(g);
                else {
                    var h = "ace_" + b.type.replace(/\./g, " ace_");
                    a.push("<span class='", h, "'>", g, "</span>")
                }
            }
            var d = this,
                e = this.config.characterWidth,
                f = 0,
                h = this.session.getRowSplitData(b),
                i = 0,
                j = 0,
                k;
            h && h.length != 0 ? k = h[0] : k = Number.MAX_VALUE,
            a.push("<div style='height:", this.config.lineHeight, "px", "'>");
            for (var l = 0; l < c.length; l++) {
                var m = c[l],
                    n = m.value;
                if (i + n.length < k) g(m, n),
                i += n.length;
                else {
                    while (i + n.length >= k) g(m, n.substring(0, k - i)),
                    n = n.substring(k - i),
                    i = k,
                    a.push("</div>", "<div style='height:", this.config.lineHeight, "px", "'>"),
                    j++,
                    f = 0,
                    k = h[j] || Number.MAX_VALUE;
                    n.length != 0 && (i += n.length, g(m, n))
                }
            }
            this.showInvisibles && (b !== this.session.getLength() - 1 ? a.push("<span class='ace_invisible'>" + this.EOL_CHAR + "</span>") : a.push("<span class='ace_invisible'>" + this.EOF_CHAR + "</span>")),
            a.push("</div>")
        }
    }).call(h.prototype),
    b.Text = h
}),
define("ace/layer/cursor", ["require", "exports", "module", "pilot/dom"], function (a, b, c) {
    var d = a("pilot/dom"),
        e = function (a) {
        this.element = d.createElement("div"),
        this.element.className = "ace_layer ace_cursor-layer",
        a.appendChild(this.element),
        this.cursor = d.createElement("div"),
        this.cursor.className = "ace_cursor",
        this.isVisible = !1
    };
    (function () {
        this.setSession = function (a) {
            this.session = a
        },
        this.hideCursor = function () {
            this.isVisible = !1,
            this.cursor.parentNode && this.cursor.parentNode.removeChild(this.cursor),
            clearInterval(this.blinkId)
        },
        this.showCursor = function () {
            this.isVisible = !0,
            this.element.appendChild(this.cursor);
            var a = this.cursor;
            a.style.visibility = "visible",
            this.restartTimer()
        },
        this.restartTimer = function () {
            clearInterval(this.blinkId);
            if (this.isVisible) {
                var a = this.cursor;
                this.blinkId = setInterval(function () {
                    a.style.visibility = "hidden",
                    setTimeout(function () {
                        a.style.visibility = "visible"
                    },
                    400)
                },
                1e3)
            }
        },
        this.getPixelPosition = function (a) {
            if (!this.config || !this.session) return {
                left: 0,
                top: 0
            };
            var b = this.session.selection.getCursor(),
                c = this.session.documentToScreenPosition(b),
                d = Math.round(c.column * this.config.characterWidth),
                e = (c.row - (a ? this.config.firstRowScreen : 0)) * this.config.lineHeight;
            return {
                left: d,
                top: e
            }
        },
        this.update = function (a) {
            this.config = a,
            this.pixelPos = this.getPixelPosition(!0),
            this.cursor.style.left = this.pixelPos.left + "px",
            this.cursor.style.top = this.pixelPos.top + "px",
            this.cursor.style.width = a.characterWidth + "px",
            this.cursor.style.height = a.lineHeight + "px",
            this.isVisible && this.element.appendChild(this.cursor),
            this.session.getOverwrite() ? d.addCssClass(this.cursor, "ace_overwrite") : d.removeCssClass(this.cursor, "ace_overwrite"),
            this.restartTimer()
        }
    }).call(e.prototype),
    b.Cursor = e
}),
define("ace/scrollbar", ["require", "exports", "module", "pilot/oop", "pilot/dom", "pilot/event", "pilot/event_emitter"], function (a, b, c) {
    var d = a("pilot/oop"),
        e = a("pilot/dom"),
        f = a("pilot/event"),
        g = a("pilot/event_emitter").EventEmitter,
        h = function (a) {
        this.element = e.createElement("div"),
        this.element.className = "ace_sb",
        this.inner = e.createElement("div"),
        this.element.appendChild(this.inner),
        a.appendChild(this.element),
        this.width = e.scrollbarWidth(),
        this.element.style.width = this.width + "px",
        f.addListener(this.element, "scroll", this.onScroll.bind(this))
    };
    (function () {
        d.implement(this, g),
        this.onScroll = function () {
            this._dispatchEvent("scroll", {
                data: this.element.scrollTop
            })
        },
        this.getWidth = function () {
            return this.width
        },
        this.setHeight = function (a) {
            this.element.style.height = a + "px"
        },
        this.setInnerHeight = function (a) {
            this.inner.style.height = a + "px"
        },
        this.setScrollTop = function (a) {
            this.element.scrollTop = a
        }
    }).call(h.prototype),
    b.ScrollBar = h
}),
define("ace/renderloop", ["require", "exports", "module", "pilot/event"], function (a, b, c) {
    var d = a("pilot/event"),
        e = function (a) {
        this.onRender = a,
        this.pending = !1,
        this.changes = 0
    };
    (function () {
        this.schedule = function (a) {
            this.changes = this.changes | a;
            if (!this.pending) {
                this.pending = !0;
                var b = this;
                this.setTimeoutZero(function () {
                    b.pending = !1;
                    var a = b.changes;
                    b.changes = 0,
                    b.onRender(a)
                })
            }
        },
        window.postMessage ? (this.messageName = "zero-timeout-message", this.setTimeoutZero = function (a) {
            if (!this.attached) {
                var b = this;
                d.addListener(window, "message", function (a) {
                    b.callback && a.data == b.messageName && (d.stopPropagation(a), b.callback())
                }),
                this.attached = !0
            }
            this.callback = a,
            window.postMessage(this.messageName, "*")
        }) : this.setTimeoutZero = function (a) {
            setTimeout(a, 0)
        }
    }).call(e.prototype),
    b.RenderLoop = e
}),
define("text/ace/css/editor.css", [], '.ace_editor {    position: absolute;    overflow: hidden;    font-family: "Menlo", "Monaco", "Courier New", monospace;    font-size: 12px;  }.ace_scroller {    position: absolute;    overflow-x: scroll;    overflow-y: hidden;     }.ace_content {    position: absolute;    box-sizing: border-box;    -moz-box-sizing: border-box;    -webkit-box-sizing: border-box;}.ace_composition {    position: absolute;    background: #555;    color: #DDD;    z-index: 4;}.ace_gutter {    position: absolute;    overflow-x: hidden;    overflow-y: hidden;    height: 100%;}.ace_gutter-cell.ace_error {    background-image: url("data:image/gif,GIF89a%10%00%10%00%D5%00%00%F5or%F5%87%88%F5nr%F4ns%EBmq%F5z%7F%DDJT%DEKS%DFOW%F1Yc%F2ah%CE(7%CE)8%D18E%DD%40M%F2KZ%EBU%60%F4%60m%DCir%C8%16(%C8%19*%CE%255%F1%3FR%F1%3FS%E6%AB%B5%CA%5DI%CEn%5E%F7%A2%9A%C9G%3E%E0a%5B%F7%89%85%F5yy%F6%82%80%ED%82%80%FF%BF%BF%E3%C4%C4%FF%FF%FF%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%25%00%2C%00%00%00%00%10%00%10%00%00%06p%C0%92pH%2C%1A%8F%C8%D2H%93%E1d4%23%E4%88%D3%09mB%1DN%B48%F5%90%40%60%92G%5B%94%20%3E%22%D2%87%24%FA%20%24%C5%06A%00%20%B1%07%02B%A38%89X.v%17%82%11%13q%10%0Fi%24%0F%8B%10%7BD%12%0Ei%09%92%09%0EpD%18%15%24%0A%9Ci%05%0C%18F%18%0B%07%04%01%04%06%A0H%18%12%0D%14%0D%12%A1I%B3%B4%B5IA%00%3B");    background-repeat: no-repeat;    background-position: 4px center;}.ace_gutter-cell.ace_warning {    background-image: url("data:image/gif,GIF89a%10%00%10%00%D5%00%00%FF%DBr%FF%DE%81%FF%E2%8D%FF%E2%8F%FF%E4%96%FF%E3%97%FF%E5%9D%FF%E6%9E%FF%EE%C1%FF%C8Z%FF%CDk%FF%D0s%FF%D4%81%FF%D5%82%FF%D5%83%FF%DC%97%FF%DE%9D%FF%E7%B8%FF%CCl%7BQ%13%80U%15%82W%16%81U%16%89%5B%18%87%5B%18%8C%5E%1A%94d%1D%C5%83-%C9%87%2F%C6%84.%C6%85.%CD%8B2%C9%871%CB%8A3%CD%8B5%DC%98%3F%DF%9BB%E0%9CC%E1%A5U%CB%871%CF%8B5%D1%8D6%DB%97%40%DF%9AB%DD%99B%E3%B0p%E7%CC%AE%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%2F%00%2C%00%00%00%00%10%00%10%00%00%06a%C0%97pH%2C%1A%8FH%A1%ABTr%25%87%2B%04%82%F4%7C%B9X%91%08%CB%99%1C!%26%13%84*iJ9(%15G%CA%84%14%01%1A%97%0C%03%80%3A%9A%3E%81%84%3E%11%08%B1%8B%20%02%12%0F%18%1A%0F%0A%03\'F%1C%04%0B%10%16%18%10%0B%05%1CF%1D-%06%07%9A%9A-%1EG%1B%A0%A1%A0U%A4%A5%A6BA%00%3B");    background-repeat: no-repeat;    background-position: 4px center;}.ace_editor .ace_sb {    position: absolute;    overflow-x: hidden;    overflow-y: scroll;    right: 0;}.ace_editor .ace_sb div {    position: absolute;    width: 1px;    left: 0;}.ace_editor .ace_print_margin_layer {    z-index: 0;    position: absolute;    overflow: hidden;    margin: 0;    left: 0;    height: 100%;    width: 100%;}.ace_editor .ace_print_margin {    position: absolute;    height: 100%;}.ace_editor textarea {    position: fixed;    z-index: -1;    width: 10px;    height: 30px;    opacity: 0;    background: transparent;    appearance: none;    border: none;    resize: none;    outline: none;    overflow: hidden;}.ace_layer {    z-index: 1;    position: absolute;    overflow: hidden;      white-space: nowrap;    height: 100%;    width: 100%;}.ace_text-layer {    font-family: Monaco, "Courier New", monospace;    color: black;}.ace_cjk {    display: inline-block;    text-align: center;}.ace_cursor-layer {    z-index: 4;    cursor: text;    pointer-events: none;}.ace_cursor {    z-index: 4;    position: absolute;}.ace_line {    white-space: nowrap;}.ace_marker-layer {    cursor: text;}.ace_marker-layer .ace_step {    position: absolute;    z-index: 3;}.ace_marker-layer .ace_selection {    position: absolute;    z-index: 4;}.ace_marker-layer .ace_bracket {    position: absolute;    z-index: 5;}.ace_marker-layer .ace_active_line {    position: absolute;    z-index: 2;}.ace_marker-layer .ace_selected_word {    position: absolute;    z-index: 6;    box-sizing: border-box;    -moz-box-sizing: border-box;    -webkit-box-sizing: border-box;}.ace_dragging .ace_marker-layer, .ace_dragging .ace_text-layer {  cursor: move;}'),
define("text/styles.css", [], "html {    height: 100%;    overflow: hidden;}body {    overflow: hidden;    margin: 0;    padding: 0;    height: 100%;    width: 100%;    font-family: Arial, Helvetica, sans-serif, Tahoma, Verdana, sans-serif;    font-size: 12px;    background: rgb(14, 98, 165);    color: white;}#editor {    position: absolute;    top: 60px;    left: 0px;    background: white;}#controls {    width: 100%;}#cockpitInput {    position: absolute;    width: 100%;    bottom: 0;    border: none; outline: none;    font-family: consolas, courier, monospace;    font-size: 120%;}#cockpitOutput {    padding: 10px;    margin: 0 15px;    border: 1px solid #AAA;    -moz-border-radius-topleft: 10px;    -moz-border-radius-topright: 10px;    border-top-left-radius: 4px; border-top-right-radius: 4px;    background: #DDD; color: #000;}");
var deps = ["pilot/fixoldbrowsers", "pilot/index", "pilot/plugin_manager", "pilot/environment", "ace/editor", "ace/edit_session", "ace/virtual_renderer", "ace/undomanager", "ace/theme/textmate"];
require(deps, function () {
    var a = require("pilot/plugin_manager").catalog;
    a.registerPlugins(["pilot/index"]);
    var b = require("pilot/dom"),
        c = require("pilot/event"),
        d = require("ace/editor").Editor,
        e = require("ace/edit_session").EditSession,
        f = require("ace/undomanager").UndoManager,
        g = require("ace/virtual_renderer").VirtualRenderer;
    window.ace = {
        edit: function (h) {
            typeof h == "string" && (h = document.getElementById(h));
            var i = new e(b.getInnerText(h));
            i.setUndoManager(new f),
            h.innerHTML = "";
            var j = new d(new g(h, "ace/theme/textmate"));
            j.setSession(i);
            var k = require("pilot/environment").create();
            a.startupPlugins({
                env: k
            }).then(function () {
                k.document = i,
                k.editor = j,
                j.resize(),
                c.addListener(window, "resize", function () {
                    j.resize()
                }),
                h.env = k
            }),
            j.env = k;
            return j
        }
    }
})
