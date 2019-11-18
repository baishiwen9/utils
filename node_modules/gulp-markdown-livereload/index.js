'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var marked = require('marked');

module.exports = function (options) {
	/**
	 * 获得livescript脚本
	 */
	function get_livereload_snippet(opt){
	  var opt = opt || {};
	  var port = opt.port || 35729;
	  var src = opt.src || "' + (location.protocol || 'http:') + '//' + (location.hostname || 'localhost') + ':" + port + "/livereload.js?snipver=1";
	  var snippet = "\n<script type=\"text/javascript\">//<![CDATA[\ndocument.write('<script src=\"" + src + "\" type=\"text/javascript\"><\\/script>')\n//]]></script>\n";
		return snippet;
	}
	
	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new gutil.PluginError('gulp-markdown', 'Streaming not supported'));
			return;
		}
		
		var livereload_script = '';
		if (true) {
			livereload_script = get_livereload_snippet(options);	
		}

		marked(file.contents.toString(), options, function (err, data) {
			if (err) {
				cb(new gutil.PluginError('gulp-markdown', err, {fileName: file.path}));
				return;
			}
			
			data = data + get_livereload_snippet(options);

			file.contents = new Buffer(data);
			file.path = gutil.replaceExtension(file.path, '.html');

			cb(null, file);
		});
	});
};
