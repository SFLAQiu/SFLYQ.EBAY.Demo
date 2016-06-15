window.shfn_callback = function(res) {
    var h;
    var c = parseFloat(res['cost']);
    if (isNaN(c)) {
        c = 0;
    }
    var rcs = ['country', 'zip', 'city', 'state', 'name', 'moneysign', 'desc', 'cost', 'eta'];
    res['moneysign'] = (c <= 0 ? '': '$');
    if (res['na']) {
        h = unescape('N%2FA');
    } else if (c <= 0) {
        h = unescape('FREE');
    } else {
        h = unescape('%5Bname%5D - %24%5Bcost%5D %3Cbr%3E%0D%0A                %5Bdesc%5D');
    }
    var p = 0;
    while (p < h.length) {
        var st = h.indexOf('[', p);
        if (st < 0) {
            p = h.length;
        } else {
            if (st < p) {
                st += p;
            }
            var ed = h.indexOf(']', st);
            if (st < 0) {
                p = h.length;
            } else {
                var k = h.substr(st + 1, ed - (st + 1));
                if (ed < st) {
                    ed += st;
                }
                p = ed;
                if (typeof(res[k]) != 'undefined') {
                    var v = '' + unescape(res[k]);
                    h = h.substr(0, st) + unescape(res[k]) + h.substr(ed + 1);
                    p += (v.length - k.length);
                }
                p++;
            }
        }
    }
    var cl = document.getElementById('ship_cost');
    if (cl) {
        cl.innerHTML = (h);
    }
    var ld = document.getElementById('ship_loading');
    if (ld) {
        ld.style.display = 'none';
    }
};
var shfn = function(z, c, q, x, y, p) {
    if (typeof(c) == 'undefined') {
        c = 'AU';
    }
    if (typeof(z) == 'undefined') {
        z = '';
    }
    if (typeof(x) == 'undefined') {
        x = '';
    }
    if (typeof(y) == 'undefined') {
        y = '';
    }
    if (typeof(q) == 'undefined') {
        q = 1;
    }
    if (typeof(p) == 'undefined') {
        p = '';
    }
    var okay = true;
    if (typeof(okay) == 'undefined' || okay === true) {
        var zo = document.getElementById('ship_zip');
        if (zo) {
            var tn = zo.tagName;
            if (tn) {
                tn = tn.toUpperCase();
            } else {
                tn = '';
            }
            if (tn == 'SELECT') {
                z = zo.options[zo.selectedIndex].value;
            } else if (tn == 'INPUT') {
                z = zo.value;
            }
        }
        var ld = document.getElementById('ship_loading');
        if (ld) {
            ld.style.display = '';
        }
        var qs = [];
        qs.push('ajfn' + '=getshcost');
        qs.push('ship_zip' + '=' + escape(z));
        qs.push('ship_country' + '=' + escape(c));
        qs.push('ship_city' + '=' + escape(x));
        qs.push('ship_state' + '=' + escape(y));
        qs.push('ship_qty' + '=' + escape(q));
        qs.push('sku' + '=' + 'TRAMPOLINE_12FT');
        qs.push('ebtmpl_id' + '=' + '2');
        qs.push('callback' + '=' + 'shfn_callback');
        var cl = document.getElementById('ship_cost');
        if (cl) {
            var nst = document.createElement('scr' + 'ipt');
            nst.type = 'text' + '/' + 'j' + 'ava' + 'scr' + 'ipt';
            nst.src = 'https://www.superandcheaper.com.au/do/WS/eBayJS.js?' + qs.join('&');
            cl.appendChild(nst);
        }
    }
};
shfn();