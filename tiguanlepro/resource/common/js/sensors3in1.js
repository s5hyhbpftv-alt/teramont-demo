
(function(a, e, f, g, b, c, d) {a.ClickiTrackerName = b;
    a[b] = a[b] || function() {(a[b].queue = a[b].queue || []).push(arguments)};
    a[b].start = +new Date; c = e.createElement(f); d = e.getElementsByTagName(f)[0];
    c.async = 1; c.src = g; d.parentNode.insertBefore(c, d)
    })(window, document, 'script', '//stm-cdn.cn.miaozhen.com/clicki.min.js?v='+Math.round(new Date().getTime()/1000/300), 'stm_clicki');
    stm_clicki('create', 'dc-2750', 'auto');
    stm_clicki('set','dimension1', '大众官网');
    stm_clicki('send', 'pageview');
    stm_clicki('require','heatmap', '//stm-cdn.cn.miaozhen.com/plugins/heatmap.js?v='+Math.round(new Date().getTime()/1000/1800));
    stm_clicki('heatmap:on',5);
////////////////////////////////////////////////////////////////////////
var ua = navigator.userAgent.toLowerCase();
if(ua.indexOf('micromessenger') != -1) {
	var server_url =location.href.indexOf('m.svw')>-1?'https://appdc.mos.csvw.com/sa?project=dianshang':'https://appdc-uat.mos.csvw.com/sa?project=dianshang'
}else if(ua.toLowerCase().indexOf('svw'.toLowerCase()) != -1){
	var server_url =location.href.indexOf('m.svw')>-1?'https://appdc.mos.csvw.com/sa?project=App':'https://appdc-uat.mos.csvw.com/sa?project=App'
} else {
	var server_url =location.href.indexOf('m.svw')>-1?'https://appdc.mos.csvw.com/sa?project=dianshang':'https://appdc-uat.mos.csvw.com/sa?project=dianshang'
}
(function(para) {
	var p = para.sdk_url, n = para.name, w = window, d = document, s = 'script',x = null,y = null;
	if(typeof(w['sensorsDataAnalytic201505']) !== 'undefined') {
    	return false;
  	}
	w['sensorsDataAnalytic201505'] = n;
	w[n] = w[n] || function(a) {return function() {(w[n]._q = w[n]._q || []).push([a, arguments]);}};
	var ifs = ['track','quick','register','registerPage','registerOnce','clearAllRegister','trackSignup', 'trackAbtest', 'setProfile','setOnceProfile','appendProfile', 'incrementProfile', 'deleteProfile', 'unsetProfile','identify','login','logout','trackLink'];
	for (var i = 0; i < ifs.length; i++) {
		w[n][ifs[i]] = w[n].call(null, ifs[i]);
	}
	if (!w[n]._t) {
		x = d.createElement(s), y = d.getElementsByTagName(s)[0];
		x.async = 1;
		x.src = p;
		x.setAttribute('charset','UTF-8');
		w[n].para = para;
		y.parentNode.insertBefore(x, y);
	}
})({
	sdk_url: '/resource/common/js/sensorsdata.min_v1.26.2.js',
	name: 'sensors',
    // server_url:'https://appdc.mos.csvw.com/sa?project=App',
    server_url:server_url,
	heatmap_url:'/resource/common/js/heatmap.min_v1.26.2.js',
    cross_subdomain: true,
    show_log: false,
    // show_log: true,
	heatmap: {
        clickmap: 'default'
    },
    cross_subdomain: true //子域名跨域
});

if(ua.indexOf('micromessenger') != -1) {
	sensors.registerPage({
		platform_type: '小程序',
		platformType_var: '品牌官网小程序',
		is_login: window.localStorage.getItem('svw_tk')?true:false
}); 
		// console.log("微信里面");
}else if(ua.toLowerCase().indexOf('svw'.toLowerCase()) != -1){
	sensors.registerPage({
		platform_type: 'APP',
		platformType_var: '品牌官网oneapp',
		is_login: window.localStorage.getItem('svw_tk')?true:false,
		dianshang_type : "H5"
}); 
		// console.log("app里面");
} else {
	sensors.registerPage({
		platform_type: 'MOB',
		platformType_var: '品牌官网mob',
		is_login: window.localStorage.getItem('svw_tk')?true:false
}); 
		// console.log("默认h5");
}

sensors.registerPage({
    $url:window.location.href,
    $url_path:window.location.pathname,
    $url_host:window.location.host,    
    is_ad:(GetQueryString('mz_ca') || svwGetCookie('mz_ca'))?1:0,
	is_visited:false
});

let presetProperties = {}
sensors.quick('isReady',function(){
	presetProperties = sensors.getPresetProperties();
	// console.log(presetProperties._distinct_id)
	sensors.registerPage({
		cookieId_var: presetProperties._distinct_id
	});
});

function GetQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    let r = window.location.search.substr(1).match(reg);
    if (r!=null) return (r[2]); return null;
}
function svwGetCookie(key) {
    var prefix = "svw_"+key + "="
    var start = document.cookie.indexOf(prefix)
    
    if (start == -1) {
        return null;
    }
    
    var end = document.cookie.indexOf(";", start + prefix.length)
    if (end == -1) {
        end = document.cookie.length;
    }
    
    var value = document.cookie.substring(start + prefix.length, end)
    return unescape(value);
}
